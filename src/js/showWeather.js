import {byId} from './domManager';
import cityInfoManager from './cityInfo';
import apiRequestManager from './apiRequest';
import infoMapper from './infoMapper';
import localStorageManager from './manageLocalStorage';
import sunRotationManager from './sunRotation'; 

const currentTimeDom=byId('current-time');
const minMaxDom=byId('min-max-today');
const currentDateDom=byId('current-date');
const sunInfoDom=byId('sun-info');
const sunsetDom=byId('sunset-time');
const sunriseDom=byId('sunrise-time');
const currentTempDom=byId('current-temperature');
const feelsLikeDom=byId('feels-like');
const descriptionDom=byId('description');
const windSpeedDom=byId('wind-speed');
const humidityDom=byId('humidity');
const iconDom=byId('main-weather-icon');
const windDirectionDom=byId('wind-direction');


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
    getWeatherInfo(cityInfo).then(weatherInfo => showTodayWeather(weatherInfo));
    getMinMax(cityInfo.id).then(minMaxInfo=>showMinMax(minMaxInfo))
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

function showTodayWeather(weatherInfo) {
    const allDaysInfo=weatherInfo;
    const todayInfo=allDaysInfo.mainInfo[0];
    currentDateDom.innerText='date: '+ todayInfo.date;
    currentTempDom.innerText='current temp: '+ todayInfo.temperature;
    feelsLikeDom.innerText='feels like: ' + todayInfo.feels_like;
    humidityDom.innerText='humidity: ' + todayInfo.humidity;
    descriptionDom.innerText='description: ' + todayInfo.description;
    windSpeedDom.innerText='wind speed: ' + todayInfo.windMph + ' ' + todayInfo.windKmPerHour;
    windDirectionDom.innerText='wind direction: ' + todayInfo.windDirection;
    sunriseDom.innerText='sunrise: ' + allDaysInfo.sunrise; 
    sunsetDom.innerText='sunset: ' + allDaysInfo.sunset;
    iconDom.src=todayInfo.iconUrl;
    setUpTimeUpdate(); 
    rotateSun(allDaysInfo);
}

function rotateSun (allDaysInfo) {
    const date= new Date();
    const now=date.getTime();
    const angleDegree=sunRotationManager.getAngleDegree(allDaysInfo.sunriseMillisecs, allDaysInfo.sunsetMillisecs, now);
    sunInfoDom.style.transform=`rotate(${angleDegree}deg)`;
}

function showMinMax(minMaxInfo) {
    minMaxDom.innerText='min/max: '+ minMaxInfo.min + '°/' + minMaxInfo.max + '°';
}

function getMinMax(id) {
    const todayDate=new Date();
    const minMaxInfo=localStorageManager.getStoredObj('minMaxInfo');
    const storedDate= new Date(minMaxInfo.date);
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
    showWeather,
    showTodayWeather,
    showMinMax
}