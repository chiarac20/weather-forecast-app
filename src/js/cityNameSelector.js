import {byId} from './domManager';
import cities from './cities.json';

const cityInputDom=byId('city-name-input');
const citiesListDom=byId('cities-list');

function init(onClick) {
    initInputSelector(onClick)
}

function initInputSelector(onClick) {
    cityInputDom.addEventListener('keyup', ()=>{
        citiesListDom.innerText='';
        const cityNameInitials=cityInputDom.value.toLowerCase();
        if (cityNameInitials.length>=3) {
            const suggestedCityNames=suggestCityNames(cityNameInitials);
            suggestedCityNames.forEach(city=>{
                showSuggestedCities(city, onClick);
            })
        }
    })
}

function suggestCityNames(initials){
    return cities.filter(city=>{
        return city.name.toLowerCase().startsWith(initials);
    })
}

function showSuggestedCities(city, onClick) {
    const cityLi=document.createElement('li');
    cityLi.classList.add('city-list-item');
    cityLi.innerText=city.name;
    citiesListDom.appendChild(cityLi);
    cityLi.addEventListener('click', ()=>{
        citiesListDom.innerText='';
        cityInputDom.value=city.name;
        onClick(city.name);
    })
}

export default {
    init,
    suggestCityNames
};

