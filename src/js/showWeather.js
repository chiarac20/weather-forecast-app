import {byId} from './domManager';
import cityInfoManager from './cityInfo';
import apiRequestManager from './apiRequest';

const currentTimeDom=byId('current-time');
const minMaxDom=byId('min-max-today');

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
            showTodayWeather(info, cityInfo.id)
        });
}

function showMinMax(id) {
    return apiRequestManager.getMinMax(id)
        .then(info=>{
            const minMax=info.list[0].temp;
            const min=Math.round(minMax.min);
            const max=Math.round(minMax.max)
            minMaxDom.innerText='min/max: '+ min + '°/' + max + '°';
        })
}

function showTodayWeather(weatherInfo, id) {
    console.log(weatherInfo)
    const currentDateDom=byId('current-date');
    const sunsetDom=byId('sunset-time');
    const sunriseDom=byId('sunrise-time');
    const currentTempDom=byId('current-temperature');
    const todayDate=weatherInfo.list[0].dt_txt.split(' ')[0];
    const sunriseSecs=weatherInfo.city.sunrise;
    const sunsetSecs=weatherInfo.city.sunset;
    const currentTemp=weatherInfo.list[0].main.temp;
    const todayDateShort=new Date(todayDate);
    showMinMax(id);
    currentDateDom.innerText='date: '+ todayDateShort.toDateString();
    currentTempDom.innerText='current temp: '+ currentTemp.toFixed(1)+ '°C';
    sunriseDom.innerText='sunrise: ' + sunriseSunset(sunriseSecs).hours + ':' + sunriseSunset(sunriseSecs).minutes;
    sunsetDom.innerText='sunset: ' + sunriseSunset(sunsetSecs).hours + ':' + sunriseSunset(sunriseSecs).minutes;
    setUpTimeUpdate()
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

function sunriseSunset(secs) {
    const date=new Date(secs*1000);
    return getTimeFromDate(date);
}

export default {
    init,
    showWeather
}