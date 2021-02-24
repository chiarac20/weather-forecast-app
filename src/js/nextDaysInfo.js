import {byClass} from './domManager';
import {byId} from './domManager';

const nextDaysCtaDom=byClass('next-days-cta');
const nextDaysDateDom=byId('next-days-date');
const nextDaysMinMaxDom=byId('next-days-min-max');
const nextDaysSunriseDom=byId('next-days-sunrise');
const nextDaysSunsetDom=byId('next-days-sunset');
const nextDaysHumidityDom=byId('next-days-humidity');
const nextDaysMorningTempDom=byId('next-days-temperature-morning');
const nextDaysDayTempDom=byId('next-days-temperature-day');
const nextDaysEveTempDom=byId('next-days-temperature-evening');
const nextDaysNightTempDom=byId('next-days-temperature-night');
const nextDaysFeelsLikeMorningDom=byId('next-days-feels-like-morning');
const nextDaysFeelsLikeDayDom=byId('next-days-feels-like-day');
const nextDaysFeelsLikeEveDom=byId('next-days-feels-like-evening');
const nextDaysFeelsLikeNightDom=byId('next-days-feels-like-night');
const nextDaysDescriptionDom=byId('next-days-description');
const nextDaysIconDom=byId('next-days-weather-icon');
let daysWeatherInfo;

nextDaysCtaDom.forEach((cta, index)=>{
    cta.addEventListener('click', ()=>{
        showDailyInfo(daysWeatherInfo[index]);
    })
})

function showNextDays(info) {
    daysWeatherInfo=info;
    const dayDates=getDays();
    const days=splitDayDates(dayDates);
    nextDaysCtaDom.forEach((cta, index)=>{
        cta.innerText=days[index];
    })
}

function showDailyInfo(singleDayInfo) {
console.log(singleDayInfo)
nextDaysDateDom.innerText=singleDayInfo.date;
nextDaysMinMaxDom.innerText=`Min/Max: ${singleDayInfo.min}°/${singleDayInfo.max}°`;
nextDaysSunriseDom.innerText=`Sunrise: ${singleDayInfo.sunrise}`;
nextDaysSunsetDom.innerText=`Sunset: ${singleDayInfo.sunset}`;
nextDaysHumidityDom.innerText=`Humidity: ${singleDayInfo.humidity}%`;
nextDaysMorningTempDom.innerText=`Morning temp: ${singleDayInfo.tempMorn}°`;
nextDaysDayTempDom.innerText=`Day temp: ${singleDayInfo.tempDay}`;
nextDaysEveTempDom.innerText=`Evening temp: ${singleDayInfo.tempEve}`;
nextDaysNightTempDom.innerText=`Night temp: ${singleDayInfo.tempNight}`;
nextDaysFeelsLikeMorningDom.innerText=`Feels like (morning): ${singleDayInfo.feelsLikeMorn}`;
nextDaysFeelsLikeDayDom.innerText=`Feels like (day): ${singleDayInfo.feelsLikeDay}`;
nextDaysFeelsLikeEveDom.innerText=`Feels like (evening): ${singleDayInfo.feelsLikeEve}`;
nextDaysFeelsLikeNightDom.innerText=`Feels like (night): ${singleDayInfo.feelsLikeNight}`;
nextDaysDescriptionDom.innerText=singleDayInfo.description;
nextDaysIconDom.src=singleDayInfo.iconUrl;
}

function getDays() {
    const date=new Date();
    date.setDate(date.getDate()+1);
    const in1Day=date.toDateString();
    date.setDate(date.getDate()+1);
    const in2Days=date.toDateString();
    date.setDate(date.getDate()+1);
    const in3Days=date.toDateString();
    date.setDate(date.getDate()+1);
    const in4Days=date.toDateString();
    date.setDate(date.getDate()+1);
    const in5Days=date.toDateString();
    date.setDate(date.getDate()+1);
    const in6Days=date.toDateString();
    return [in1Day, in2Days, in3Days, in4Days, in5Days, in6Days];
}

function splitDayDates(daysDates) {
    return daysDates.map(daydate=>(daydate.split(' '))[0]);
}

export default {
    showNextDays
}

