const SERVER_PATH = 'https://api.openweathermap.org';
const iconUrlStart='https://openweathermap.org/img/w/';
const iconUrlEnd='.png';
const forecastApiUrl=`${SERVER_PATH}/data/2.5/forecast?appid=0304f1dac7d089b44dd307958cd9635a&units=metric&`;
const dailyApiUrl=`${SERVER_PATH}/data/2.5/forecast/daily?appid=0304f1dac7d089b44dd307958cd9635a&units=metric&`;

export default {
    iconUrlStart,
    iconUrlEnd,
    forecastApiUrl,
    dailyApiUrl
}