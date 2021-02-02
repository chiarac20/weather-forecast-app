import {byId} from './domManager';
import cityNameSelector from './cityNameSelector';
import showWeather from './showWeather';

const mainInfoTodayDom=byId('main-info-today');
const cityInputDom=byId('city-name-input');
const citySelectionPageDom=byId('city-selection-page')


cityNameSelector.init(onCitySelected);
const infoStored=JSON.parse(localStorage.getItem('weatherInfo'));
if (infoStored) {
    const cityNameStored=infoStored.city;
    mainInfoTodayDom.classList.remove('hidden');
    showWeather.showWeather(cityNameStored);
    
} else {
    citySelectionPageDom.classList.remove('hidden');
}


showWeather.init(onGoBackFn)

function onCitySelected(cityName) {
    citySelectionPageDom.classList.add('hidden'); 
    mainInfoTodayDom.classList.remove('hidden');
    showWeather.showWeather(cityName);
}

function onGoBackFn(){
    mainInfoTodayDom.classList.add('hidden');
    citySelectionPageDom.classList.remove('hidden');
    cityInputDom.value='';
}