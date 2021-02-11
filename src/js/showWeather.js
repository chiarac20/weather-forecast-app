import {byId} from './domManager';
import cityInfoManager from './cityInfo';
import apiRequestManager from './apiRequest';
import infoMapper from './infoMapper';
import localStorageManager from './manageLocalStorage';
import showTodayAllInfo from './showTodayAllInfo';

function init(onGoBackCta){
    const ctaDom=byId('go-back-cta')
    ctaDom.addEventListener('click', onGoBackCta);
}

function showWeather(cityName){
    const cityNameDom=byId('city-name');
    const cityInfo = cityInfoManager.getCityInfo(cityName);
    cityNameDom.innerText=cityInfo.name;
    const mainCityInfo={id: cityInfo.id, city: cityInfo.name};
    localStorageManager.storeObj('mainCityInfo', mainCityInfo);
    Promise.all([
        getWeatherInfo(cityInfo),
        getMinMax(cityInfo.id)
    ]).then(info=> {
        const [weatherInfo, minMaxInfo]=info;
        showTodayAllInfo.showTodayAllInfo(weatherInfo, minMaxInfo);
    })
}

function getWeatherInfo(cityInfo) {
    const mainInfoStored=localStorageManager.getStoredObj('mainCityInfo');
    const weatherInfoStored=localStorageManager.getStoredObj('weatherInfo');
    const loggedDate= weatherInfoStored ?
        weatherInfoStored.mainInfo[0].date + ' ' +  weatherInfoStored.mainInfo[0].time:
        null;
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
    const storedDate=new Date(minMaxInfo.date);
    if (minMaxInfo.id===id && storedDate && storedDate.getDate()===todayDate.getDate() && storedDate.getMonth()===storedDate.getMonth()) {
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