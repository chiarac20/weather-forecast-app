import cities from './cities.json';

function getCityInfo(cityName){
    return cities.find(city=>{
        return city.name.toLowerCase()===cityName.toLowerCase();
    })
}

export default {
    getCityInfo
}