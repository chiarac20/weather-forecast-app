import {byId} from './domManager';
import infoMapper from './weatherInfoMapper';
import apiRequestManager from './apiRequest';
import todayInfo from './todayInfo';
import localStorageManager from './manageLocalStorage';
import dailyInfo from './dailyInfoMapper';
import nextDays from './nextDaysInfo';

function showInfo() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude}=position.coords;
            const getWeatherInfo = apiRequestManager.getLocalisationWeatherInfo(latitude, longitude)
                .then(data=>{
                    const cityNameDom=byId('city-name');
                    const mappedInfo = infoMapper.mapInfo(data);
                    const mainCityInfo={id: data.city.id, city: data.city.name};
                    cityNameDom.innerText=data.city.name;
                    localStorageManager.storeObj('weatherInfo', mappedInfo);
                    localStorageManager.storeObj('mainCityInfo', mainCityInfo);
                    todayInfo.showWeather(mappedInfo);
                })
            const getDailyInfo = apiRequestManager.getLocalisationDailyInfo(latitude, longitude)
                .then(data=>{
                    const minMax=data.list[0].temp;
                    const min=Math.round(minMax.min);
                    const max=Math.round(minMax.max); 
                    const sec=data.list[0].dt;
                    const date=new Date(sec*1000).toDateString();
                    const id=data.city.id;
                    const minMaxInfo={id, date, min, max};
                    const nextDaysInfo=dailyInfo.mapInfo(data)
                    localStorageManager.storeObj('minMaxInfo', minMaxInfo);
                    todayInfo.showMinMax(minMaxInfo);
                    localStorageManager.storeObj('nextDaysInfo', nextDaysInfo);
                    nextDays.showNextDays(nextDaysInfo);
                })
            Promise.all([getWeatherInfo, getDailyInfo]).then(resolve, reject);
        }, reject);  
    })
}


export default {
    showInfo
}