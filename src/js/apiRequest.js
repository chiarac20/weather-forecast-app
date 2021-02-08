function getWeatherInfo (id) {
    return fetch('https://api.openweathermap.org/data/2.5/forecast?appid=0304f1dac7d089b44dd307958cd9635a&units=metric&id=' + id)
        .then(res=>res.json())
        .catch(err=>alert("There's been a problem. Please try again"));
}

function getMinMax (id) {
    return fetch('http://api.openweathermap.org/data/2.5/forecast/daily?appid=0304f1dac7d089b44dd307958cd9635a&units=metric&id=' + id)
        .then(res=>res.json())
        .catch(err=>alert("There's been a problem. Please reload the page"))

}

function getLocalisationWeatherInfo(latitude, longitude) {
    return fetch ('https://api.openweathermap.org/data/2.5/forecast?appid=0304f1dac7d089b44dd307958cd9635a&units=metric&lat=' + latitude + '&lon=' + longitude)
        .then(data=>data.json())
        .catch(err=>alert("There's been a problem. Please try again"))
}

function getLocalisationMinMaxInfo(latitude, longitude) {
    return fetch('http://api.openweathermap.org/data/2.5/forecast/daily?appid=0304f1dac7d089b44dd307958cd9635a&units=metric&lat=' + latitude + '&lon=' + longitude)
        .then (data=>data.json())
        .catch(err=>alert("There's been a problem. Please try again"))
}

export default {
    getWeatherInfo,
    getMinMax,
    getLocalisationWeatherInfo,
    getLocalisationMinMaxInfo
}