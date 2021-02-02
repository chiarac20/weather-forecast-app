import {byId} from './domManager';
import cityInfoManager from './cityInfo';
import apiRequestManager from './apiRequest';
import infoMapper from './infoMapper';
import localStorageManager from './manageLocalStorage'

const currentTimeDom=byId('current-time');
const minMaxDom=byId('min-max-today');
const currentDateDom=byId('current-date');
const sunsetDom=byId('sunset-time');
const sunriseDom=byId('sunrise-time');
const currentTempDom=byId('current-temperature');
const feelsLikeDom=byId('feels-like');
const descriptionDom=byId('description');
const windSpeedDom=byId('wind-speed');
const humidityDom=byId('humidity');
const iconDom=byId('main-weather-icon');


function init(onGoBackCta){
    const ctaDom=byId('go-back-cta')
    ctaDom.addEventListener('click', onGoBackCta);
}

function showWeather(cityName){
    const cityNameDom=byId('city-name');
    const cityInfo = cityInfoManager.getCityInfo(cityName);
    cityNameDom.innerText=cityInfo.name;
    getWeatherInfo(cityInfo).then(weatherInfo => showTodayWeather(weatherInfo, cityName, cityInfo.id));
}

function getWeatherInfo(cityInfo) {
    const infoStored=localStorageManager.getStoredObj('weatherInfo');
    if (infoStored && infoStored.city === cityInfo.name) {
        console.log('info from loc storage')
        return new Promise((resolve) => resolve(infoStored))
    } else {
        return apiRequestManager.getWeatherInfo(cityInfo.id)
            .then(info=>{
                const mappedInfo = infoMapper.mapInfo(info, cityInfo.name);
                localStorageManager.storeObj('weatherInfo', mappedInfo);
                return mappedInfo;
            });
    }
}

function showTodayWeather(weatherInfo, cityName, id) {
    const allDaysInfo=weatherInfo;
    const todayInfo=allDaysInfo.mainInfo[0];
    currentDateDom.innerText='date: '+ todayInfo.date;
    currentTempDom.innerText='current temp: '+ todayInfo.temperature;
    feelsLikeDom.innerText='feels like: ' + todayInfo.feels_like;
    humidityDom.innerText='humidity: ' + todayInfo.humidity;
    descriptionDom.innerText='description: ' + todayInfo.description;
    windSpeedDom.innerText='wind speed: ' + todayInfo.windMph + ' ' + todayInfo.windKmPerHour;
    sunriseDom.innerText='sunrise: ' + allDaysInfo.sunrise; 
    sunsetDom.innerText='sunset: ' + allDaysInfo.sunset;
    iconDom.src=todayInfo.iconUrl;
    showMinMax(id);
    setUpTimeUpdate(); 
}

function showMinMax(id) {
    return apiRequestManager.getMinMax(id)
        .then(info=>{
            const minMax=info.list[0].temp;
            const min=Math.round(minMax.min);
            const max=Math.round(minMax.max);
            minMaxDom.innerText='min/max: '+ min + '°/' + max + '°';
        })
}

function setUpTimeUpdate() {
    showTime();
    setInterval(showTime, 60000);
}

function showTime() { 
    const time=getTimeFromDate(new Date);
    currentTimeDom.innerText='current time: ' + time.hours + ':'+ time.minutes;
}

function getTimeFromDate(date) {
    const minutes=zeroFill(date.getMinutes());
    const hours=zeroFill(date.getHours());
    return {hours, minutes}
}

function zeroFill(number) {
    return number.toString().padStart(2, '0');
}
export default {
    init,
    showWeather
}