let changeCity = document.querySelector('.weather__info_button')

let searchScript = document.querySelector('.search__city')
let weatherInfo = document.querySelector('.weather__info')
let searchInput = document.querySelector('.search__city_input')
let mistake = document.querySelector('.mistake')
let tryAgain = document.querySelector('.mistake__tryAgain')

let city = ''
let API = '0f229bddf16ed64444cf47fad115ac05'
let cod = 0
let cityTempreture = 0
let description = ''
let correctCityName = ''
let temp = document.querySelector('.weather__info_temperature')
let info = document.querySelector('.weather__info_location')
let icon = ''
let lat = null
let lon = null

let ifElseFunction = (data) => {
    if(data.cod === 200){
        createInformation(data)
        remakeInfoText()
    } else if(data.cod === '404'){
        weatherInfo.classList.toggle('info__script')
        mistake.classList.toggle('mistake__script')
    }
}

let createInformation = (data) => {
    icon = data.weather[0].icon
    let img = document.createElement('img')
    img.classList.add('weather__info_img')
    weatherInfo.appendChild(img)
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    img.alt = `weather picture`
    let tempretureInKel = data.main.temp
    cityTempreture = (tempretureInKel - 273.15).toFixed(1)
    description = data.weather[0].description
    correctCityName = data.name
}

async function getWeather(cityName){
    if(cityName !== '0'){
        const geo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}`)
        const data = await geo.json()
        ifElseFunction(data)
        
        return cityTempreture, description, correctCityName
    } else if(cityName === '0'){
        const geotime = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_i6rHVLjG83GMHtTUwy5VTe0xqAGnu&ipAddress=`)
        const datatime = await geotime.json()
        let CITY = datatime.location.region
        const geo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API}`)
        const data = await geo.json()
        ifElseFunction(data)
        
        return cityTempreture, description, correctCityName
    }
}

changeCity.addEventListener('click', () => {
    searchScript.classList.toggle('search__script')
    weatherInfo.classList.toggle('info__script')
    searchInput.value = ''
})

let mistakeWindow = ()  => {
    searchScript.classList.toggle('search__script')
    mistake.classList.toggle('mistake__script')
}

let remakeInfoText = () => { 
    info.textContent = `${description} in ${correctCityName}`
    temp.textContent = `${cityTempreture}℃`
}

let arr = []

let searchingTheWeather = (event) => {           // сам инпут поиска
    event.preventDefault()
    getWeather(searchInput.value)
    
    if(searchInput.value === ''){
        mistakeWindow()
        searchInput.value = ''
    } else if(cod === 404) {
        mistakeWindow()
    } else {
        weatherInfo.classList.toggle('info__script')
        searchScript.classList.toggle('search__script')
    }
}

let backToSearch = () => {                  //кнопка назад в поиск города
    mistake.classList.toggle('mistake__script')
    searchScript.classList.toggle('search__script')
    searchInput.value = ''
}

tryAgain.addEventListener('click', () => backToSearch())
searchScript.addEventListener('submit', () => searchingTheWeather(event))

async function getIp(){
    const geo = await fetch(`https://api.ipify.org?format=json`)
    const data = await geo.json()
    const geotime = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_i6rHVLjG83GMHtTUwy5VTe0xqAGnu&ipAddress=${data.ip}`)
    const datatime = await geotime.json()
    const geoAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${datatime.location.region}&appid=${API}`)
    const dataAPI = await geoAPI.json()

    createInformation(dataAPI)
    remakeInfoText()
    return cityTempreture, description, correctCityName
}

function receivedLoc(data){
    lat = data.coords.latitude
    lon = data.coords.longitude
    getWeather('0')
    return lat, lon
}
function notReceivedLoc(data){
    getIp()
}

navigator.geolocation.getCurrentPosition(receivedLoc, notReceivedLoc);