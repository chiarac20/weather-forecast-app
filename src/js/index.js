import {byId} from './domManager';
import cityNameSelector from './cityNameSelector';
import showWeather from './showWeather';

const mainInfoTodayDom=byId('main-info-today');
const cityInputDom=byId('city-name-input');
const citySelectionPageDom=byId('city-selection-page')

cityNameSelector.init(onCitySelected);
let cityNameStored=localStorage.getItem('city-name');
if (cityNameStored) {
    mainInfoTodayDom.classList.remove('hidden');
    showWeather.showWeather(cityNameStored);
    
} else {
    citySelectionPageDom.classList.remove('hidden');
}


showWeather.init(onGoBackFn)

function onCitySelected(cityName) {
    citySelectionPageDom.classList.add('hidden'); 
    mainInfoTodayDom.classList.remove('hidden');
    localStorage.setItem('city-name', cityName);
    showWeather.showWeather(cityName);
}

function onGoBackFn(){
    mainInfoTodayDom.classList.add('hidden');
    citySelectionPageDom.classList.remove('hidden');
    localStorage.removeItem('city-name');
    cityInputDom.value='';
}