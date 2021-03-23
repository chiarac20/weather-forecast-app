import sunRotationManager from './sunRotation'; 
import {byId} from './domManager';
import todayFutureSlots from './todayFutureSlots';
import nextDays from './nextDaysInfo';
import classNames from './classNames';

const currentTimeDom=byId('current-time');
const minMaxDom=byId('min-max-today');
const currentDateDom=byId('current-date');
const sunInfoDom=byId('sun-info');
const sunsetDom=byId('sunset-time');
const sunriseDom=byId('sunrise-time');
const currentTempDom=byId('current-temperature');
const feelsLikeDom=byId('feels-like');
const descriptionDom=byId('description');
const windSpeedKmDom=byId('wind-speed-km');
const windSpeedMphDom=byId('wind-speed-mph');
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
    directCurrentDateDom.innerText=new Date().toDateString();
    directSunriseDom.innerText=allDaysInfo.sunrise;
    directSunsetDom.innerText=allDaysInfo.sunset;
    currentDateDom.innerText=todayInfo.date;
    currentTempDom.innerText=todayInfo.temperature;
    feelsLikeDom.innerText=todayInfo.feels_like;
    humidityDom.innerText=todayInfo.humidity;
    descriptionDom.innerText=todayInfo.description;
    windSpeedKmDom.innerText=todayInfo.windKmPerHour;
    windSpeedMphDom.innerText=todayInfo.windMph;
    windDirectionDom.innerText=todayInfo.windDirection;
    sunriseDom.innerText=allDaysInfo.sunrise; 
    sunsetDom.innerText=allDaysInfo.sunset;
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
        bodyDom.classList.add(classNames.night);
        titlePageDom.classList.add(classNames.night);
        cityNameDom.classList.add(classNames.night);
        directWeatherInfoDom.classList.add(classNames.night);
        directInfoDom.classList.add(classNames.night);
        directSunriseSunsetDom.classList.add(classNames.night);
        moonPictureDom.classList.remove(classNames.hidden);
        directMainWeatherIconDom.classList.add(classNames.hidden);
    } else {
        bodyDom.classList.remove(classNames.night);
        titlePageDom.classList.remove(classNames.night);
        cityNameDom.classList.remove(classNames.night);
        directWeatherInfoDom.classList.remove(classNames.night);
        directInfoDom.classList.remove(classNames.night);
        directSunriseSunsetDom.classList.remove(classNames.night);
        moonPictureDom.classList.add(classNames.hidden);
        directMainWeatherIconDom.classList.remove(classNames.hidden);
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
    currentTimeDom.innerText=now;
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
    minMaxDom.innerText=minMax;
    directMinMaxDom.innerText=minMax;
}

export default  {
    showInfo,
    showMinMax,
    showWeather
}