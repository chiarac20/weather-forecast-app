import {byId} from './domManager';
import infoMapper from './infoMapper';
import apiRequestManager from './apiRequest';
import showTodayAllInfo from './showTodayAllInfo';
import localStorageManager from './manageLocalStorage';

function getLocalisationAllInfo() {
    navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude}=position.coords;
        apiRequestManager.getLocalisationWeatherInfo(latitude, longitude)
            .then(data=>{
                const cityNameDom=byId('city-name');
                const mappedInfo = infoMapper.mapInfo(data);
                const mainCityInfo={id: data.city.id, city: data.city.name};
                cityNameDom.innerText=data.city.name;
                localStorageManager.storeObj('weatherInfo', mappedInfo);
                localStorageManager.storeObj('mainCityInfo', mainCityInfo);
                showTodayAllInfo.showTodayWeather(mappedInfo);
            })
        apiRequestManager.getLocalisationMinMaxInfo(latitude, longitude)
            .then(data=>{
                const minMax=data.list[0].temp;
                const min=Math.round(minMax.min);
                const max=Math.round(minMax.max); 
                const sec=data.list[0].dt;
                const date=new Date(sec*1000).toDateString();
                const id=data.city.id;
                const minMaxInfo={id, date, min, max};
                localStorageManager.storeObj('minMaxInfo', minMaxInfo);
                showTodayAllInfo.showMinMax(minMaxInfo);
            })
    })  
}


export default {
    getLocalisationAllInfo
}