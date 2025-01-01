let changeCity = document.querySelector('.weather__info_button')

let searchScript = document.querySelector('.search__city')
let weatherInfo = document.querySelector('.weather__info')
let searchInput = document.querySelector('.search__city_input')
let mistake = document.querySelector('.mistake')
let tryAgain = document.querySelector('.mistake__tryAgain')

// let arr = ['Moscow', "Sochi"]
let city = ''
let API = '0f229bddf16ed64444cf47fad115ac05'
let cod = 0
let cityTempreture = 0
let description = ''
let correctCityName = ''

let temp = document.querySelector('.weather__info_temperature')

let info = document.querySelector('.weather__info_location')




async function getWeather(cityName){
    const geo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}`)
    const data = await geo.json()
    console.log(data);
    // console.log(data.cod);

    console.log(cod);
    console.log(data.cod);
    if(data.cod === 200){
        console.log('работает');
        
        let tempretureInKel = data.main.temp
        console.log(tempretureInKel);
        
        cityTempreture = (tempretureInKel - 273.15).toFixed(1)
        console.log(cityTempreture);
        description = data.weather[0].description
        console.log(description);
        correctCityName = data.name

        remakeInfoText()
    } else if(data.cod === '404'){
        console.log('ошибка');
        
        weatherInfo.classList.toggle('info__script')
        mistake.classList.toggle('mistake__script')
    }
    console.log('ты тут');
    

    cod = data.cod
    return cityTempreture, description, cod, correctCityName
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
    let check = false   
    console.log('рили');
    
    info.textContent = `${description} in ${correctCityName}`
    temp.textContent = `${cityTempreture}℃`
}

let arr = []

let searchingTheWeather = (event) => {           // сам инпут поиска
    event.preventDefault()
    getWeather(searchInput.value)
    // console.log(getWeather(searchInput.value));
    

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
