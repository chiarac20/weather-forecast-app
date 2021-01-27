import {byId} from './domManager';
import cityInfoManager from './cityInfo';
import apiRequestManager from './apiRequest';

const currentTimeDom=byId('current-time');

function init(onGoBackCta){
    const ctaDom=byId('go-back-cta')
    ctaDom.addEventListener('click', onGoBackCta);
}

function showWeather(cityName){
    const cityNameDom=byId('city-name');
    const cityInfo = cityInfoManager.getCityInfo(cityName);
    cityNameDom.innerText=cityInfo.name;
    apiRequestManager.getWeatherInfo(cityInfo.id)
        .then(info=>{
            showTodayWeather(info)
        });
}

function showTodayWeather(weatherInfo) {
    console.log(weatherInfo)
    const minMaxDom=byId('min-max-today');
    const currentDateDom=byId('current-date');
    const sunsetDom=byId('sunset-time');
    const sunriseDom=byId('sunrise-time');
    const currentTempDom=byId('current-temperature');
    const todayDate=weatherInfo.list[0].dt_txt.split(' ');
    const sunriseTime=weatherInfo.city.sunrise;
    const sunsetTime=weatherInfo.city.sunset;
    const currentTempKelvin=weatherInfo.list[0].main.temp;
    const currentTempCelsius=currentTempKelvin-273.15;
    const todayDateShort=new Date(todayDate);
    currentDateDom.innerText='date: '+ todayDateShort.toDateString();
    currentTempDom.innerText='current temp: '+ currentTempCelsius.toFixed(1)+ '°C';
    minMaxDom.innerText='min/max: ';
    sunriseDom.innerText='sunrise not ready: ' + sunriseTime;
    sunsetDom.innerText='sunset not ready: ' + sunsetTime;
    setUpTimeUpdate()
}

function setUpTimeUpdate() {
    showTime();
    setInterval(showTime, 60000);
}

function showTime() { 
    const currentDate=new Date();
    const currentMinutes=('0' + currentDate.getMinutes()).slice(-2);
    currentTimeDom.innerText='current time: ' + currentDate.getHours() + ':'+ currentMinutes;
}

export default {
    init,
    showWeather
}