import 'regenerator-runtime/runtime'
import { iconsArray } from './icon/icon'

async function getData () {
    const cityName = document.querySelector('#city_name')
    const temp = document.querySelector('#temp')
    const feelsLike = document.querySelector('#feels_like')
    const clouds = document.querySelector('#clouds')
    const currentDate = document.querySelector('#time')
    const humidity = document.querySelector('#humidity')
    const tempMax = document.querySelector('#temp_max')
    const tempMin = document.querySelector('#temp_min')
    let date = new Date();

    const request = await fetch('http://api.openweathermap.org/data/2.5/weather?id=524894&appid=4521c4a418ccf4bc0abe99633d66e242&units=metric')
    const data = await request.json()
    const cloudsInfo = data.clouds.all
    console.log(data.name)

    const getTemp = (value) => {
        let tempValue = Math.floor(value)
        return tempValue
    }

    const getIcon = (value) => {

        let cloudsIcon
        if(value < 30) {
            cloudsIcon = iconsArray.sun
        }else if(value > 30 && value < 75){
            cloudsIcon = iconsArray.littleSun
        }else if(value > 70){
            cloudsIcon = iconsArray.clouds
        }
        return cloudsIcon
    }


    const renderIcon = () => {
        clouds.innerHTML = getIcon(cloudsInfo)
    }

    const isDay = () => {
        let currentTime = date.getHours()
        let day = new Date(data.sys.sunrise * 1000)
        let night = new Date(data.sys.sunset * 1000)
        console.log(day,'fsdfsd', night)
        return (currentTime > day && currentTime < night)

    }

    const renderIsDay = (data) => {
        let attrName = isDay(data) ? 'day':'night';
        document.documentElement.setAttribute('data-theme', attrName);
    }

    const getCurrentDate = (value) => {
        let hours = value
        let minutes = value
        let hoursValue = hours < 10 ? `0${hours}`: hours
        let minutesValue = minutes < 10 ? `0${minutes}`: minutes
        return (hoursValue, minutesValue)

    }
    const renderApp = () => {
        currentDate.innerHTML = `${getCurrentDate(date.getHours())} : ${getCurrentDate(date.getMinutes())}`
        cityName.innerHTML = data.name.toUpperCase();
        temp.innerHTML =  `Temp: ${getTemp(data.main.temp)} C`;
        feelsLike.innerHTML = `(Feels like: ${getTemp(data.main.feels_like)} C)`;
        humidity.innerHTML = `Humidity: ${data.main.humidity} %`;
        tempMax.innerHTML = `Temp max: ${getTemp(data.main.temp_max)} C`;
        tempMin.innerHTML = `Temp min: ${getTemp(data.main.temp_min)} C`;
    }

    const render = () => {
        renderApp()
        renderIcon()
        renderIsDay()
    }
    render()
}

getData ()


