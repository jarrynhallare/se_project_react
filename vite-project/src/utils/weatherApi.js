export const getWeatherData = ({ latitude, longitude }, APIkey) => {
   return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    });
};

export const filterWeatherData = (data) => {
    const result = {};
    result.city = data.name;
    result.temp = {F: data.main.temp};
    result.type = getWeatherType(result.temp.F);
    result.condition = mapWeatherCondition(data.weather[0].main);
    result.isDayTime = isDayTime(data);
    return result;
};

const mapWeatherCondition = (apiCondition) => {
    const condition = apiCondition.toLowerCase();
    
    if (condition === 'clear' || condition === 'sunny') {
        return 'clear';
    } else if (condition === 'clouds' || condition === 'cloudy') {
        return 'cloudy';
    } else if (condition === 'rain' || condition === 'drizzle') {
        return 'rain';
    } else if (condition === 'thunderstorm') {
        return 'storm';
    } else if (condition === 'snow') {
        return 'snow';
    }
    
    return 'cloudy';
};

const isDayTime = (data) => {
    const currentTime = new Date().getTime() / 1000;
    return currentTime >= data.sys.sunrise && currentTime < data.sys.sunset;
};

const getWeatherType = (temp) => {
    if (temp > 86) {
        return "hot";
    } else if (temp >= 66 && temp < 86) {
        return "warm";
    } else {
        return "cold";
    }
};