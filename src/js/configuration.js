const SERVER_PATH = 'https://api.openweathermap.org';
const iconUrlStart='https://openweathermap.org/img/w/';
const iconUrlEnd='.png';
const appId='0304f1dac7d089b44dd307958cd9635a';
const forecastApiUrl=`${SERVER_PATH}/data/2.5/forecast?appid=${appId}&units=metric&`;
const dailyApiUrl=`${SERVER_PATH}/data/2.5/forecast/daily?appid=${appId}&units=metric&`;

export default {
    iconUrlStart,
    iconUrlEnd,
    forecastApiUrl,
    dailyApiUrl
}