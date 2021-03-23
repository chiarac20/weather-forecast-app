import {byClass} from './domManager';
import {byId} from './domManager';
import classNames from './classNames';

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
const nextDaysSectionDom=byId('next-days-section')
let daysWeatherInfo;

nextDaysCtaDom.forEach((cta, index)=>{
    cta.addEventListener('click', ()=>{
        hideNextDaysDetailsCtaDom.classList.remove(classNames.hidden);
        showDailyInfo(daysWeatherInfo[index]);
        nextDaysInfoDom.classList.remove(classNames.hidden);
        window.scrollTo(0, nextDaysSectionDom.offsetTop-10);
    })
})

hideNextDaysDetailsCtaDom.addEventListener('click', ()=>{
    nextDaysInfoDom.classList.add(classNames.hidden);
    hideNextDaysDetailsCtaDom.classList.add(classNames.hidden);
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
    nextDaysMinMaxDom.innerText=`${singleDayInfo.min}°/${singleDayInfo.max}°`;
    nextDaysSunriseDom.innerText=singleDayInfo.sunrise;
    nextDaysSunsetDom.innerText=singleDayInfo.sunset;
    nextDaysHumidityDom.innerText=singleDayInfo.humidity;
    nextDaysMorningTempDom.innerText=singleDayInfo.tempMorn;
    nextDaysDayTempDom.innerText=singleDayInfo.tempDay;
    nextDaysEveTempDom.innerText=singleDayInfo.tempEve;
    nextDaysNightTempDom.innerText=singleDayInfo.tempNight;
    nextDaysFeelsLikeMorningDom.innerText=singleDayInfo.feelsLikeMorn;
    nextDaysFeelsLikeDayDom.innerText=singleDayInfo.feelsLikeDay;
    nextDaysFeelsLikeEveDom.innerText=singleDayInfo.feelsLikeEve;
    nextDaysFeelsLikeNightDom.innerText=singleDayInfo.feelsLikeNight;
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

