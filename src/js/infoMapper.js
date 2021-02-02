function mapInfo(mainForecast, cityName) {
    const {sunrise: sunriseSecs, sunset: sunsetSecs} = mainForecast.city;
    const sunrise=sunriseSunset(sunriseSecs);
    const sunset=sunriseSunset(sunsetSecs);
    const sunriseTime=sunrise.hours + ':' + sunrise.minutes;
    const sunsetTime=sunset.hours + ':' + sunset.minutes;
    const weatherInfo=mainForecast.list;
    const mainInfo = weatherInfo.map(timeLapse=>{ 
        const dateTime=timeLapse.dt_txt.split(' ');
        const date=dateTime[0];
        const time=dateTime[1].split(':');
        const windSpeed=timeLapse.wind.speed;
        return {
            date: new Date(date).toDateString(),
            feels_like: timeLapse.main.feels_like.toFixed(1) + '°',
            humidity: timeLapse.main.humidity + '%',
            temperature: timeLapse.main.temp.toFixed(1) + '°',
            description: timeLapse.weather[0].description,
            iconUrl: 'http://openweathermap.org/img/w/' + timeLapse.weather[0].icon + '.png',
            windMph: (windSpeed * 2.237).toFixed(1) + 'Mph/',
            windKmPerHour: (windSpeed * 3.6).toFixed(1) + 'KmPerHour',
            time: time[0] + ':' + time[1]
        }
    })
    const weatherInformation={city: cityName, mainInfo, sunrise: sunriseTime, sunset: sunsetTime};
    return weatherInformation;
}

function sunriseSunset(secs) {
    const date=new Date(secs*1000);
    return getTimeFromDate(date);
}

function getTimeFromDate(date) {
    const minutes=zeroFill(date.getMinutes());
    const hours=zeroFill(date.getHours());
    return {hours, minutes}
}

function zeroFill(number) {
    return number.toString().padStart(2, '0');
}

export default {
    mapInfo
}