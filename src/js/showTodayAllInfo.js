import sunRotationManager from './sunRotation'; 
import {byId} from './domManager';

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
const mainWeatherInfoDom=byId('main-weather-info');
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

function showTodayAllInfo(weatherInfo, minMaxInfo) {
    showTodayWeather (weatherInfo);
    showMinMax(minMaxInfo);
}

function showTodayWeather(weatherInfo) {
    const allDaysInfo=weatherInfo;
    const todayInfo=allDaysInfo.mainInfo[0];
    directCurrentTempDom.innerText=todayInfo.temperature;
    directMainWeatherIconDom.src=todayInfo.iconUrl;
    directDescriptionDom.innerText=todayInfo.description;
    directCurrentDateDom.innerText=todayInfo.date;
    directSunriseDom.innerText=allDaysInfo.sunrise;
    directSunsetDom.innerText=allDaysInfo.sunset;
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
    showNightTime(allDaysInfo.sunsetMillisecs);
}

function showNightTime(sunsetMillisecs) {
    const date=new Date();
    const now=date.getTime();
    if (sunsetMillisecs<now) {
        mainWeatherInfoDom.classList.add('night-time');
        directInfoDom.classList.add('night-time');
        directSunriseSunsetDom.classList.add('night-time');
        moonPictureDom.classList.remove('hidden');
        directMainWeatherIconDom.classList.add('hidden');
    } else {
        mainWeatherInfoDom.classList.remove('night-time');
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
    currentTimeDom.innerText='current time: ' + now;
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
    minMaxDom.innerText='min/max: '+ minMax;
    directMinMaxDom.innerText=minMax;
}

export default  {
    showTodayAllInfo,
    showMinMax,
    showTodayWeather
}