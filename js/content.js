import { directionOfWind, capitalizeFirstLetter } from "./helper.js";
// import { createWeekContainer } from "./week.js";

export const createContent = (data) => {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const inner = document.createElement('div');
    const iconBloc = document.createElement('img');
    const temperature = document.createElement('h2');
    const units = document.createElement('span');
    const description = document.createElement('p');
    const weatherInfo = document.createElement('div');
    const weatherInfoList = document.createElement('ul');
    const weatherInfoWind = document.createElement('li');
    const weatherInfoPressure = document.createElement('li');
    const weatherInfoHumidity = document.createElement('li');
    const weatherInfoClouds = document.createElement('li');

    section.classList.add('weather');
    container.classList.add('container', 'weather__container');
    inner.classList.add('weather__inner');
    iconBloc.classList.add('weather__icon');
    temperature.classList.add('weather__temperature');
    units.classList.add('weather__units');
    description.classList.add('weather__description');
    weatherInfo.classList.add('weather-info');
    weatherInfoList.classList.add('weather-info__list');
    weatherInfoWind.classList.add('weather-info__item');
    weatherInfoHumidity.classList.add('weather-info__item');
    weatherInfoPressure.classList.add('weather-info__item');
    weatherInfoClouds.classList.add('weather-info__item');

    temperature.textContent = Math.floor(data.main.temp);
    description.textContent = capitalizeFirstLetter(data.weather[0].description);
    iconBloc.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    units.textContent = 'o';

    const createWeatherItemTitle = (text) => {
        const span = document.createElement('span');
        span.textContent = text;

        return span;
    }
    const createWeatherItemContent = (text) => {
        const p = document.createElement('p');
        p.textContent = text;

        return p;
    }
    weatherInfoWind.append(
        createWeatherItemTitle('Ветер'),
        createWeatherItemContent(Math.floor(data.wind.speed) + ' м/с, ' + directionOfWind(data.wind.deg))
    );
    weatherInfoPressure.append(
        createWeatherItemTitle('Давление'),
        createWeatherItemContent(Math.floor(data.main.pressure) + ' мм рт. ст.')
    );
    weatherInfoHumidity.append(
        createWeatherItemTitle('Влажность'),
        createWeatherItemContent(Math.floor(data.main.humidity) + '%')
    );
    weatherInfoClouds.append(
        createWeatherItemTitle('Облачность'),
        createWeatherItemContent(Math.floor(data.clouds.all) + '%')
    );

    const createWeekContainer = (num) => {
        const weekContainer = document.createElement('div');
        weekContainer.classList.add('week__container');
        
        const today = new Date();
        let currentDay = today.getDate();
        const nameDay = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        let currentName = today.getDay();
        
        for(let i = 0; i < num; i++) {
            
            const dayData = document.createElement('div');
            dayData.classList.add('dayData');
            const dayOfWeek = document.createElement('div');
            const tempOfDay = document.createElement('span');
            const unitOfDay = document.createElement('span');
            const descriptionOfDay = document.createElement('span');
            
            tempOfDay.classList.add('tempOfDay');
            unitOfDay.classList.add('unitOfDay');
            descriptionOfDay.classList.add('descriptionOfDay');

            const tempBlock = document.createElement('div');
            tempBlock.classList.add('tempBlock');
            tempBlock.append(tempOfDay, unitOfDay);

            tempOfDay.textContent = Math.floor(data.main.temp);
            unitOfDay.textContent = 'o';
            descriptionOfDay.textContent = capitalizeFirstLetter(data.weather[0].description);

            dayOfWeek.classList.add('day__container');
            if(i === 0) {
                dayOfWeek.classList.add('currentDay__container');
                
            }
            dayData.append(currentDay + ' ', nameDay[currentName]);
            dayOfWeek.append(dayData, tempBlock, descriptionOfDay);
            currentName = (currentName + 1) % 7;
            currentDay++;
            weekContainer.append(dayOfWeek);
        }
        return weekContainer;
    }

    main.append(createWeekContainer(7), section);
    section.append(container);
    container.append(inner, description, weatherInfo);
    inner.append(iconBloc, temperature, units);
    weatherInfo.append(weatherInfoList);
    weatherInfoList.append(
        weatherInfoWind,
        weatherInfoPressure,
        weatherInfoHumidity,
        weatherInfoClouds
    );
    
    return main;
}