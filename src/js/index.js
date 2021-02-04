import {byId} from './domManager';
import cityNameSelector from './cityNameSelector';
import showWeather from './showWeather';
import localStorageManager from './manageLocalStorage'

const mainInfoTodayDom=byId('main-info-today');
const cityInputDom=byId('city-name-input');
const citySelectionPageDom=byId('city-selection-page')

cityNameSelector.init(onCitySelected);

if (localStorage.mainCityInfo) {
    mainInfoTodayDom.classList.remove('hidden');
    const mainInfo=localStorageManager.getStoredObj('mainCityInfo'); 
    const cityName=mainInfo.city;
    showWeather.showWeather(cityName);  
} else {
    citySelectionPageDom.classList.remove('hidden');
}

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