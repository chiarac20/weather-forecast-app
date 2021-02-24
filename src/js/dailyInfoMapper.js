import weatherInfoMapper from './weatherInfoMapper';

function mapInfo(info) {
    const id=info.city.id;
    const nextDaysInfo=info.list.slice(1);
    return nextDaysInfo.map(day=>{
        const sunrise=weatherInfoMapper.sunriseSunset(day.sunrise*1000);
        const sunriseTime=`${sunrise.hours}:${sunrise.minutes}`;
        const sunset=weatherInfoMapper.sunriseSunset(day.sunset*1000);
        const sunsetTime=`${sunset.hours}:${sunset.minutes}`;
        return {
            id,
            date: new Date(day.dt*1000).toDateString(),
            min:day.temp.min,
            max:day.temp.max,
            sunrise: sunriseTime,
            sunset: sunsetTime,
            humidity: day.humidity,
            tempMorn: day.temp.morn,
            tempDay: day.temp.day,
            tempEve: day.temp.eve,
            tempNight: day.temp.night,
            feelsLikeMorn: day.feels_like.morn,
            feelsLikeDay: day.feels_like.day,
            feelsLikeEve: day.feels_like.eve,
            feelsLikeNight: day.feels_like.night,
            description: day.weather[0].description,
            iconUrl: `http://openweathermap.org/img/w/${day.weather[0].icon}.png`
        }
    })
}

export default{
    mapInfo
}