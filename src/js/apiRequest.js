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

export default {
    getWeatherInfo,
    getMinMax
}