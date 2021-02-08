import {byId} from './domManager';
import cityNameSelector from './cityNameSelector';
import showWeather from './showWeather';
import localStorageManager from './manageLocalStorage';
import apiRequestManager from './apiRequest';
import infoMapper from './infoMapper';

const mainInfoTodayDom=byId('main-info-today');
const cityInputDom=byId('city-name-input');
const citySelectionPageDom=byId('city-selection-page');
const localisationDom=byId('localisation');
const localisationYesCtaDom=byId('localisation-yes-cta');
const localisationNoCtaDom=byId('localisation-no-cta');


cityNameSelector.init(onCitySelected);

if (localStorage.mainCityInfo) {
    mainInfoTodayDom.classList.remove('hidden');
    const mainInfo=localStorageManager.getStoredObj('mainCityInfo'); 
    const cityName=mainInfo.city;
    showWeather.showWeather(cityName);  
} else {
    citySelectionPageDom.classList.remove('hidden');
    localisationDom.classList.remove('hidden');
}

localisationNoCtaDom.addEventListener('click', ()=>{
    localisationDom.classList.add('hidden');
})
localisationYesCtaDom.addEventListener('click', ()=>{
    citySelectionPageDom.classList.add('hidden');
    mainInfoTodayDom.classList.remove('hidden');
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
                showWeather.showTodayWeather(mappedInfo);
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
                showWeather.showMinMax(minMaxInfo)
            })
    })
})

showWeather.init(changeCityFn)

function onCitySelected(cityName) {
    citySelectionPageDom.classList.add('hidden'); 
    mainInfoTodayDom.classList.remove('hidden');
    showWeather.showWeather(cityName);
}

function changeCityFn(){
    mainInfoTodayDom.classList.add('hidden');
    citySelectionPageDom.classList.remove('hidden');
    cityInputDom.value='';
}
