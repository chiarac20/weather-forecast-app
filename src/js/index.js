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
const bodyDom=document.querySelector('body');

cityNameSelector.init(onCitySelected);

if (localStorage.mainCityInfo) {
    bodyDom.classList.add('main-info-page');
    infoAll.classList.remove('hidden');
    const mainInfo=localStorageManager.getStoredObj('mainCityInfo'); 
    const cityName=mainInfo.city;
    weatherInfo.showWeather(cityName);  
} else {
    citySelectionPageDom.classList.remove('hidden');
    localisationCtaDom.classList.remove('hidden');
    bodyDom.classList.remove('main-info-page');
}
localisationCtaDom.addEventListener('click', ()=>{
    loaderSectionDom.classList.remove('hidden');
    localisationInfo.showInfo().then(()=>{
        loaderSectionDom.classList.add('hidden');
        bodyDom.classList.add('main-info-page');
        citySelectionPageDom.classList.add('hidden');
        infoAll.classList.remove('hidden');
    }, (err=>{alert('Please enter a valid UK city')})); 
})

weatherInfo.init(changeCityFn)

function onCitySelected(cityName) {
    loaderSectionDom.classList.remove('hidden');
    weatherInfo.showWeather(cityName).then(()=>{
        loaderSectionDom.classList.add('hidden');
        bodyDom.classList.add('main-info-page');
        citySelectionPageDom.classList.add('hidden'); 
        infoAll.classList.remove('hidden');
    });
}

function changeCityFn(){
    bodyDom.classList.remove('main-info-page');
    infoAll.classList.add('hidden');
    citySelectionPageDom.classList.remove('hidden');
    cityInputDom.value='';
    todayFutureSlotsDom.innerText='';
    cityInputDom.focus();
}
