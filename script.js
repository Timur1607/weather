let changeCity = document.querySelector('.weather__info_button')

let searchScript = document.querySelector('.search__city')
let weatherInfo = document.querySelector('.weather__info')
let searchInput = document.querySelector('.search__city_input')
let mistake = document.querySelector('.mistake')
let tryAgain = document.querySelector('.mistake__tryAgain')

let arr = ['Moscow', "Sochi"]
let city = ''

let info = document.querySelector('.weather__info_location')

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
    console.log(searchInput.value.toLowerCase());

    for(let el of arr){
        console.log(el.toLowerCase());
        
        if(el.toLowerCase() === searchInput.value.toLowerCase()){
            city = el
            console.log('yes');
            check = true
        }
    }

    if(check === false){
        mistake.classList.toggle('mistake__script')
        weatherInfo.classList.toggle('info__script')
    }
    info.textContent = `Windy in ${city}`
}

let searchingTheWeather = (event) => {           // сам инпут поиска
    event.preventDefault()
    
    if(searchInput.value === ''){
        mistakeWindow()
        searchInput.value = ''
    } else{
        weatherInfo.classList.toggle('info__script')
        searchScript.classList.toggle('search__script')
        remakeInfoText()
    }
    
}

let backToSearch = () => {                  //кнопка назад в поиск города
    mistake.classList.toggle('mistake__script')
    searchScript.classList.toggle('search__script')
    searchInput.value = ''
}


tryAgain.addEventListener('click', () => backToSearch())
searchScript.addEventListener('submit', () => searchingTheWeather(event))