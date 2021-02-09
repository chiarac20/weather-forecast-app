function mapInfo(mainForecast) {
    const {sunrise: sunriseSecs, sunset: sunsetSecs} = mainForecast.city;
    const sunriseMillisecs=sunriseSecs*1000;
    const sunsetMillisecs=sunsetSecs*1000;
    const sunrise=sunriseSunset(sunriseMillisecs);
    const sunset=sunriseSunset(sunsetMillisecs);
    const sunriseTime=sunrise.hours + ':' + sunrise.minutes;
    const sunsetTime=sunset.hours + ':' + sunset.minutes;
    const id=mainForecast.city.id;
    const weatherInfo=mainForecast.list;
    const mainInfo = weatherInfo.map(timeLapse=>{ 
        const dateTime=timeLapse.dt_txt.split(' ');
        const date=dateTime[0];
        const time=dateTime[1].split(':');
        const windSpeed=timeLapse.wind.speed;
        const windDirection= getWindDirection(timeLapse.wind.deg);
        return {
            date: new Date(date).toDateString(),
            time: time[0] + ':' + time[1],
            feels_like: timeLapse.main.feels_like.toFixed(1) + '°',
            humidity: timeLapse.main.humidity + '%',
            temperature: timeLapse.main.temp.toFixed(1) + '°',
            description: timeLapse.weather[0].description,
            iconUrl: 'http://openweathermap.org/img/w/' + timeLapse.weather[0].icon + '.png',
            windMph: (windSpeed * 2.237).toFixed(1) + 'Mph/',
            windKmPerHour: (windSpeed * 3.6).toFixed(1) + 'KmPerHour',
            windDirection
        }
    })
    const weatherInformation={id, mainInfo, sunriseMillisecs, sunrise: sunriseTime, sunsetMillisecs, sunset: sunsetTime};
    return weatherInformation;
}

function sunriseSunset(millisecs) {
    const date=new Date(millisecs);
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

function getWindDirection(degree) {
    if (degree < 22.50 || degree >= 22.50*15) {
        return 'North'; 
    }
    if (degree >= 22.50 && degree < 22.50*3) {
        return 'North-East'; 
    }
    if (degree >= 22.50*3 && degree < 22.50*5) {
        return 'East'; 
    }
    if (degree >= 22.50*5 && degree < 22.50*7) {
        return 'South-East'; 
    }
    if (degree >= 22.50*7 && degree < 22.50*9) {
        return 'South'; 
    }
    if (degree >= 22.50*9 && degree < 22.50*11) {
        return 'South-West'; 
    }
    if (degree >= 22.50*11 && degree < 22.50*13) {
        return 'West'; 
    }
    if (degree >= 22.50*13 && degree < 22.50*15) {
        return 'North-West'; 
    }
}

export default {
    mapInfo
}