import cities from './cities.json';

const cityInputDom=document.getElementById('city-name-input');
const cityNameFormDom=document.getElementById('city-name-form');
let cityName;
let cityNameStored=localStorage.getItem('city-name');

if (!cityNameStored) {
    cityNameFormDom.classList.remove('hidden');
}


cityNameFormDom.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    cityName=cityInputDom.value;
    localStorage.setItem('city-name', cityName);
    cityNameFormDom.classList.add('hidden');
})

