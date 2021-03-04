import sunRotationManager from './sunRotation'; 
import {byId} from './domManager';
import todayFutureSlots from './todayFutureSlots';
import nextDays from './nextDaysInfo';

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
const moonPictureDom=byId('moon-picture');
const directWeatherInfoDom=byId('direct-weather-info');
const directMinMaxDom=byId('direct-min-max');
const directCurrentTempDom=byId('direct-current-temperature');
const directMainWeatherIconDom=byId('direct-main-weather-icon');
const directCurrentTimeDom=byId('direct-current-time');
const directCurrentDateDom=byId('direct-current-date');
const directSunriseDom=byId('direct-sunrise');
const directSunsetDom=byId('direct-sunset');
const directSunriseSunsetDom=byId('direct-sunrise-sunset')
const directDescriptionDom=byId('direct-description');
const directInfoDom=byId('direct-info');
const bodyDom=document.querySelector('body');
const titlePageDom=document.querySelector('h1');
const cityNameDom=byId('city-name');

function showInfo(weatherInfo, minMaxInfo, nextDaysInfo) {
    showWeather (weatherInfo);
    showMinMax(minMaxInfo);
    nextDays.showNextDays(nextDaysInfo);
}

function showWeather(weatherInfo) {
    const allDaysInfo=weatherInfo;
    const mainInfo=allDaysInfo.mainInfo;
    const todayInfo=mainInfo[0];
    directCurrentTempDom.innerText=todayInfo.temperature;
    directMainWeatherIconDom.src=todayInfo.iconUrl;
    directDescriptionDom.innerText=todayInfo.description;
    directCurrentDateDom.innerText=todayInfo.date;
    directSunriseDom.innerText=allDaysInfo.sunrise;
    directSunsetDom.innerText=allDaysInfo.sunset;
    currentDateDom.innerText='Date: '+ todayInfo.date;
    currentTempDom.innerText='Current temp: '+ todayInfo.temperature;
    feelsLikeDom.innerText='Feels like: ' + todayInfo.feels_like;
    humidityDom.innerText='Humidity: ' + todayInfo.humidity;
    descriptionDom.innerText=todayInfo.description;
    windSpeedDom.innerText='Wind speed: ' + todayInfo.windMph + ' ' + todayInfo.windKmPerHour;
    windDirectionDom.innerText='Wind direction: ' + todayInfo.windDirection;
    sunriseDom.innerText='Sunrise: ' + allDaysInfo.sunrise; 
    sunsetDom.innerText='Sunset: ' + allDaysInfo.sunset;
    iconDom.src=todayInfo.iconUrl;
    setUpTimeUpdate(); 
    rotateSun(allDaysInfo);
    showNightTime(allDaysInfo.sunsetMillisecs);
    const mappedTodayTimeSlotsInfo=todayFutureSlots.mapInfo(mainInfo, todayInfo.date);
    todayFutureSlots.showInfo(mappedTodayTimeSlotsInfo);
}


function showNightTime(sunsetMillisecs) {
    const date=new Date();
    const now=date.getTime();
    if (sunsetMillisecs<now) {
        bodyDom.classList.add('night-time');
        titlePageDom.classList.add('night-time');
        cityNameDom.classList.add('night-time');
        directWeatherInfoDom.classList.add('night-time');
        directInfoDom.classList.add('night-time');
        directSunriseSunsetDom.classList.add('night-time');
        moonPictureDom.classList.remove('hidden');
        directMainWeatherIconDom.classList.add('hidden');
    } else {
        bodyDom.classList.remove('night-time');
        titlePageDom.classList.remove('night-time');
        cityNameDom.classList.remove('night-time');
        directWeatherInfoDom.classList.remove('night-time');
        directInfoDom.classList.remove('night-time');
        directSunriseSunsetDom.classList.remove('night-time');
        moonPictureDom.classList.add('hidden');
        directMainWeatherIconDom.classList.remove('hidden');
    }   
}

function rotateSun (allDaysInfo) {
    const date= new Date();
    const now=date.getTime();
    const angleDegree=sunRotationManager.getAngleDegree(allDaysInfo.sunriseMillisecs, allDaysInfo.sunsetMillisecs, now);
    sunInfoDom.style.transform=`rotate(${angleDegree}deg)`;
}

function setUpTimeUpdate() {
    showTime();
    setInterval(showTime, 60000);
}

function showTime() { 
    const time=getTimeFromDate(new Date);
    const now=time.hours + ':' + time.minutes;
    currentTimeDom.innerText='Current time: ' + now;
    directCurrentTimeDom.innerText=now;
}

function getTimeFromDate(date) {
    const minutes=zeroFill(date.getMinutes());
    const hours=zeroFill(date.getHours());
    return {hours, minutes}
}

function zeroFill(number) {
    return number.toString().padStart(2, '0');
}

function showMinMax(minMaxInfo) {
    const minMax=minMaxInfo.min + '°/' + minMaxInfo.max + '°';
    minMaxDom.innerText='Min/Max: '+ minMax;
    directMinMaxDom.innerText=minMax;
}

export default  {
    showInfo,
    showMinMax,
    showWeather
}