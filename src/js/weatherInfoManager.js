import {byId} from './domManager';
import cityInfoManager from './cityInfo';
import apiRequestManager from './apiRequest';
import infoMapper from './weatherInfoMapper';
import localStorageManager from './manageLocalStorage';
import todayInfo from './todayInfo';
import dailyInfo from './dailyInfoMapper';
import classNames from './classNames';

const showTodayDetailsCtaDom=byId('show-today-details-cta');
const hideTodayDetailsCtaDom=byId('hide-today-details-cta');
const todayDetailsDom=byId('today-details');
const todayDetailsSectionDom=byId('today-details-section');

function init(onGoBackCta){
    const ctaDom=byId('go-back-cta');
    ctaDom.addEventListener('click', onGoBackCta);
    showTodayDetailsCtaDom.addEventListener('click', showTodayDetails);
    hideTodayDetailsCtaDom.addEventListener('click', hideTodayDetails);
}

function showTodayDetails () {
    window.todayDetailsSectionDom = todayDetailsSectionDom;
    hideTodayDetailsCtaDom.classList.remove(classNames.hidden);
    showTodayDetailsCtaDom.classList.add(classNames.hidden);
    todayDetailsDom.classList.remove(classNames.hidden);
    window.scrollTo(0, todayDetailsSectionDom.offsetTop-10);
}

function hideTodayDetails () {
    hideTodayDetailsCtaDom.classList.add(classNames.hidden);
    showTodayDetailsCtaDom.classList.remove(classNames.hidden);
    todayDetailsDom.classList.add(classNames.hidden);
}


function showWeather(cityName){
    const cityNameDom=byId('city-name');
    const cityInfo = cityInfoManager.getCityInfo(cityName);
    cityNameDom.innerText=cityInfo.name;
    const mainCityInfo={id: cityInfo.id, city: cityInfo.name};
    localStorageManager.storeObj('mainCityInfo', mainCityInfo);
    return Promise.all([
        getWeatherInfo(cityInfo),
        getDailyInfo(cityInfo.id)
    ]).then(info=> {
        const [weatherInfo, dailyInfo]=info;
        const {minMaxInfo, nextDaysInfo}=dailyInfo;
        todayInfo.showInfo(weatherInfo, minMaxInfo, nextDaysInfo);
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

function getDailyInfo(id) {
    const todayDate=new Date();
    const minMaxInfo=localStorageManager.getStoredObj('minMaxInfo');
    const nextDaysInfo=localStorageManager.getStoredObj('nextDaysInfo');
    const storedDate=minMaxInfo && new Date(minMaxInfo.date);
    if (minMaxInfo && minMaxInfo.id===id && storedDate && storedDate.getDate()===todayDate.getDate() && storedDate.getMonth()===storedDate.getMonth()) {
        return Promise.resolve({minMaxInfo, nextDaysInfo});
    }
    return apiRequestManager.getDailyInfo(id)
        .then(info=>{
            const minMax=info.list[0].temp;
            const min=Math.round(minMax.min);
            const max=Math.round(minMax.max); 
            const sec=info.list[0].dt;
            const date=new Date(sec*1000).toDateString();
            const minMaxInfo={id, date, min, max};
            const nextDaysInfo=dailyInfo.mapInfo(info);
            localStorageManager.storeObj('minMaxInfo', minMaxInfo);
            localStorageManager.storeObj('nextDaysInfo', nextDaysInfo);
            return {minMaxInfo, nextDaysInfo};
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