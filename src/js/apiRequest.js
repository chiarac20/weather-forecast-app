import config from './configuration.js';

function getWeatherInfo (id) {
    return fetch(`${config.forecastApiUrl}id=${id}`)
        .then(res=>res.json())
        .catch(err=>alert("There's been a problem. Please try again"));
}

function getDailyInfo (id) {
    return fetch(`${config.dailyApiUrl}id=${id}`)
        .then(res=>res.json())
        .catch(err=>alert("There's been a problem. Please reload the page"))

}

function getLocalisationWeatherInfo(latitude, longitude) {
    return fetch(`${config.forecastApiUrl}lat=${latitude}&lon=${longitude}`)
        .then(data=>data.json())
        .catch(err=>alert("There's been a problem. Please try again"))
}

function getLocalisationDailyInfo(latitude, longitude) {
    return fetch (`${config.dailyApiUrl}lat=${latitude}&lon=${longitude}`)
        .then (data=>data.json())
        .catch(err=>alert("There's been a problem. Please try again"))
}

export default {
    getWeatherInfo,
    getDailyInfo,
    getLocalisationWeatherInfo,
    getLocalisationDailyInfo
}