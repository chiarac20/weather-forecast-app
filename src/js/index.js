import {byId} from './domManager';
import cityNameSelector from './cityNameSelector';
import weatherInfo from './weatherInfoManager';
import localStorageManager from './manageLocalStorage';
import localisationInfo from './localisationInfo';

const infoAll=byId('info-all');
const cityInputDom=byId('city-name-input');
const citySelectionPageDom=byId('city-selection-page');
const localisationCtaDom=byId('localisation-cta');
const todayFutureSlotsDom=byId("today-future-slots");
const loaderSectionDom=byId('loader-section');

cityNameSelector.init(onCitySelected);

if (localStorage.mainCityInfo) {
    infoAll.classList.remove('hidden');
    const mainInfo=localStorageManager.getStoredObj('mainCityInfo'); 
    const cityName=mainInfo.city;
    weatherInfo.showWeather(cityName);  
} else {
    citySelectionPageDom.classList.remove('hidden');
    localisationCtaDom.classList.remove('hidden');
}
localisationCtaDom.addEventListener('click', ()=>{
    loaderSectionDom.classList.remove('hidden');
    localisationInfo.showInfo().then(()=>{
        loaderSectionDom.classList.add('hidden');
        citySelectionPageDom.classList.add('hidden');
        infoAll.classList.remove('hidden');
    });  
})

weatherInfo.init(changeCityFn)

function onCitySelected(cityName) {
    loaderSectionDom.classList.remove('hidden');
    weatherInfo.showWeather(cityName).then(()=>{
        loaderSectionDom.classList.add('hidden');
        citySelectionPageDom.classList.add('hidden'); 
        infoAll.classList.remove('hidden');
    });
}

function changeCityFn(){
    infoAll.classList.add('hidden');
    citySelectionPageDom.classList.remove('hidden');
    cityInputDom.value='';
    todayFutureSlotsDom.innerText='';
    cityInputDom.focus();
}
