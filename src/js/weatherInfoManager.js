import {byId} from './domManager';
import cityInfoManager from './cityInfo';
import apiRequestManager from './apiRequest';
import infoMapper from './weatherInfoMapper';
import localStorageManager from './manageLocalStorage';
import todayInfo from './todayInfo';
import nextDays from './nextDaysInfo';
import dailyInfo from './dailyInfoMapper';

const showTodayDetailsCtaDom=byId('show-today-details-cta');
const hideTodayDetailsCtaDom=byId('hide-today-details-cta');
const todayWeatherDetailsDom=byId('today-weather-details');

function init(onGoBackCta){
    const ctaDom=byId('go-back-cta');
    ctaDom.addEventListener('click', onGoBackCta);
    showTodayDetailsCtaDom.addEventListener('click', showTodayDetails);
    hideTodayDetailsCtaDom.addEventListener('click', hideTodayDetails);
}

function showTodayDetails () {
    hideTodayDetailsCtaDom.classList.remove('hidden');
    showTodayDetailsCtaDom.classList.add('hidden');
    todayWeatherDetailsDom.classList.remove('hidden');
    window.scroll({
        top: 1000,
        behavior: 'smooth'
      });
}

function hideTodayDetails () {
    hideTodayDetailsCtaDom.classList.add('hidden');
    showTodayDetailsCtaDom.classList.remove('hidden');
    todayWeatherDetailsDom.classList.add('hidden');
}


function showWeather(cityName){
    const cityNameDom=byId('city-name');
    const cityInfo = cityInfoManager.getCityInfo(cityName);
    cityNameDom.innerText=cityInfo.name;
    const mainCityInfo={id: cityInfo.id, city: cityInfo.name};
    localStorageManager.storeObj('mainCityInfo', mainCityInfo);
    return Promise.all([
        getWeatherInfo(cityInfo),
        getMinMax(cityInfo.id)
    ]).then(info=> {
        const [weatherInfo, minMaxInfo]=info;
        todayInfo.showInfo(weatherInfo, minMaxInfo);
        nextDays.showDays([0, 1, 2, 3, 4]);
    });
}

function getWeatherInfo(cityInfo) {
    const mainInfoStored=localStorageManager.getStoredObj('mainCityInfo');
    const weatherInfoStored=localStorageManager.getStoredObj('weatherInfo');
    const loggedDate= weatherInfoStored && 
        (weatherInfoStored.mainInfo[0].date + ' ' +  weatherInfoStored.mainInfo[0].time);
    if (mainInfoStored && weatherInfoStored && weatherInfoStored.id === cityInfo.id && isInTheFuture(loggedDate)) {
        return Promise.resolve(weatherInfoStored);
    }
    return apiRequestManager.getWeatherInfo(cityInfo.id)
        .then(info=>{
            const mappedInfo = infoMapper.mapInfo(info);
            localStorageManager.storeObj('weatherInfo', mappedInfo);
            return mappedInfo;
        });
}

function getMinMax(id) {
    const todayDate=new Date();
    const minMaxInfo=localStorageManager.getStoredObj('minMaxInfo');
    const storedDate=minMaxInfo && new Date(minMaxInfo.date);
    if (minMaxInfo && minMaxInfo.id===id && storedDate && storedDate.getDate()===todayDate.getDate() && storedDate.getMonth()===storedDate.getMonth()) {
        return Promise.resolve(minMaxInfo);
    }
    return apiRequestManager.getMinMax(id)
        .then(info=>{
            const minMax=info.list[0].temp;
            const min=Math.round(minMax.min);
            const max=Math.round(minMax.max); 
            const sec=info.list[0].dt;
            const date=new Date(sec*1000).toDateString();
            const minMaxInfo={id, date, min, max};
            dailyInfo.mapInfo(info)
            localStorageManager.storeObj('minMaxInfo', minMaxInfo);
            return minMaxInfo;
        })
}

function isInTheFuture(date) {
    if (!date) return false;
    const passedDate=new Date(date);
    const now=new Date();
    return now<passedDate;
}

export default {
    init,
    showWeather
}