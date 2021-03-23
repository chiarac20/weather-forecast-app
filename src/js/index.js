import {byId} from './domManager';
import cityNameSelector from './cityNameSelector';
import weatherInfo from './weatherInfoManager';
import localStorageManager from './manageLocalStorage';
import localisationInfo from './localisationInfo';
import classNames from './classNames';

const infoAll=byId('info-all');
const cityInputDom=byId('city-name-input');
const citySelectionPageDom=byId('city-selection-page');
const localisationCtaDom=byId('localisation-cta');
const todayFutureSlotsDom=byId("today-future-slots");
const loaderSectionDom=byId('loader-section');
const bodyDom=document.querySelector('body');

cityNameSelector.init(onCitySelected);

if (localStorage.mainCityInfo) {
    bodyDom.classList.add(classNames.mainInfoPage);
    infoAll.classList.remove(classNames.hidden);
    const mainInfo=localStorageManager.getStoredObj('mainCityInfo'); 
    const cityName=mainInfo.city;
    weatherInfo.showWeather(cityName);  
} else {
    citySelectionPageDom.classList.remove(classNames.hidden);
    localisationCtaDom.classList.remove(classNames.hidden);
    bodyDom.classList.remove(classNames.mainInfoPage);
}
localisationCtaDom.addEventListener('click', ()=>{
    loaderSectionDom.classList.remove(classNames.hidden);
    localisationInfo.showInfo().then(()=>{
        loaderSectionDom.classList.add(classNames.hidden);
        bodyDom.classList.add(classNames.mainInfoPage);
        citySelectionPageDom.classList.add(classNames.hidden);
        infoAll.classList.remove(classNames.hidden);
    }); 
})

weatherInfo.init(changeCityFn)

function onCitySelected(cityName) {
    loaderSectionDom.classList.remove(classNames.hidden);
    weatherInfo.showWeather(cityName).then(()=>{
        loaderSectionDom.classList.add(classNames.hidden);
        bodyDom.classList.add(classNames.mainInfoPage);
        citySelectionPageDom.classList.add(classNames.hidden); 
        infoAll.classList.remove(classNames.hidden);
    });
}

function changeCityFn(){
    bodyDom.classList.remove(classNames.mainInfoPage);
    infoAll.classList.add(classNames.hidden);
    citySelectionPageDom.classList.remove(classNames.hidden);
    cityInputDom.value='';
    todayFutureSlotsDom.innerText='';
    cityInputDom.focus();
}
