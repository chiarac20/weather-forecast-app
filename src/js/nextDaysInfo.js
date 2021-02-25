import {byClass} from './domManager';
import {byId} from './domManager';

const nextDaysInfoDom=byId('next-days-info');
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
const hideNextDaysDetailsCtaDom=byId('hide-next-days-details-cta');
let daysWeatherInfo;

nextDaysCtaDom.forEach((cta, index)=>{
    cta.addEventListener('click', ()=>{
        hideNextDaysDetailsCtaDom.classList.remove('hidden');
        showDailyInfo(daysWeatherInfo[index]);
        nextDaysInfoDom.classList.remove('hidden');
        window.scroll({
            top: 1000,
            behavior: 'smooth'
        });
    })
})

hideNextDaysDetailsCtaDom.addEventListener('click', ()=>{
    nextDaysInfoDom.classList.add('hidden');
    hideNextDaysDetailsCtaDom.classList.add('hidden');
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
    nextDaysDateDom.innerText=singleDayInfo.date;
    nextDaysMinMaxDom.innerText=`Min/Max: ${singleDayInfo.min}°/${singleDayInfo.max}°`;
    nextDaysSunriseDom.innerText=`Sunrise: ${singleDayInfo.sunrise}`;
    nextDaysSunsetDom.innerText=`Sunset: ${singleDayInfo.sunset}`;
    nextDaysHumidityDom.innerText=`Humidity: ${singleDayInfo.humidity}%`;
    nextDaysMorningTempDom.innerText=`Morning: ${singleDayInfo.tempMorn}°`;
    nextDaysDayTempDom.innerText=`Day: ${singleDayInfo.tempDay}`;
    nextDaysEveTempDom.innerText=`Evening: ${singleDayInfo.tempEve}`;
    nextDaysNightTempDom.innerText=`Night: ${singleDayInfo.tempNight}`;
    nextDaysFeelsLikeMorningDom.innerText=`Morning: ${singleDayInfo.feelsLikeMorn}`;
    nextDaysFeelsLikeDayDom.innerText=`Day: ${singleDayInfo.feelsLikeDay}`;
    nextDaysFeelsLikeEveDom.innerText=`Evening: ${singleDayInfo.feelsLikeEve}`;
    nextDaysFeelsLikeNightDom.innerText=`Night: ${singleDayInfo.feelsLikeNight}`;
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

