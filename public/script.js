window.initMap = function(){
    const searchElem = document.querySelector('[data-location-search]');
    const searchBox = new google.maps.places.SearchBox(searchElem);
    searchBox.addListener('places_changed', () => {
        const place = searchBox.getPlaces()[0]
        if(place == null) return
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()
        //console.log(latitude, longitude) //works
        fetch('/weather', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({
                latitude: latitude, 
                longitude: longitude
            })
        })    
        .then((res) => res.json())
        .then(data => { 
            console.log(data)
            setWeatherData(data, place.formatted_address)
        })
    })
}

//TODO
//style input field

const selectedLocation = document.querySelector('[data-selected-location]');
const days = [...document.querySelectorAll('.day')];
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const icon = [...document.querySelectorAll('[data-icon]')]
const weekday = [...document.querySelectorAll('[data-weekday]')]
const date = [...document.querySelectorAll('[data-date]')]
const temperature = [...document.querySelectorAll('[data-temp]')]
const statusDesc = [...document.querySelectorAll('[data-status]')]
const wind = [...document.querySelectorAll('[data-wind]')]
const night = [...document.querySelectorAll('[data-night]')]
const feelsLike = [...document.querySelectorAll('[data-feels-like]')]
const sunrise = [...document.querySelectorAll('[data-sunrise]')]
const sunset= [...document.querySelectorAll('[data-sunset]')]

const todayFeelsLike = document.querySelector('[data-feels-like]')
const todayDay = document.querySelector('[data-today-temp]')
const todayWind = document.querySelector('[data-wind]')

function setWeatherData(data, place){
    selectedLocation.textContent = place;
    todayFeelsLike.textContent = `${(data.current.feels_like).toFixed(1)}°C`;
    todayDay.textContent = `${(data.daily[0].temp.day).toFixed(1)}°C`;
    todayWind.textContent = `${data.current.wind_speed} m/s`;
    for(let i = 0; i < 5; i++){
            icon[i].src = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
            let d = new Date(data.daily[i].dt * 1000)//.toLocaleDateString("en-DE")
            weekday[i].textContent = weekdays[d.getDay()];
            date[i].textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-DE");
            if(i == 0){
                temperature[i].textContent = `${(data.current.temp).toFixed(1)}°C`;
                night[i].textContent = `${(data.daily[i].temp.night).toFixed(1)} °C`;
            } else {
                temperature[i].textContent = `${(data.daily[i].temp.day).toFixed(0)}°C`;
                night[i].textContent = `${(data.daily[i].temp.night).toFixed(0)} °C`;
            }
            statusDesc[i].textContent = data.daily[i].weather[0].description;
            //wind[i].textContent = data.daily[i].wind_speed;
            //feelsLike[i].textContent = `${data.daily[i].feels_like.day}°C`
            sunrise[i].textContent = new Date(data.daily[i].sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})
            sunset[i].textContent = new Date(data.daily[i].sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})
    }
}

/*

const todayIcon = document.querySelector('[data-icon]')
const todayTemperature = document.querySelector('[data-temp]')
const todayStatus = document.querySelector('[data-status]')
const todayNight = document.querySelector('[data-night]')
const todayFeelsLike = document.querySelector('[data-feels-like]')
const todaySunrise = document.querySelector('[data-sunrise]')
const todaySunset= document.querySelector('[data-sunset]')

function setTodayData(data){
    todayIcon.src = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
    todayTemperature.textContent = `${data.current.temp}°C`;
    todayStatus.textContent = data.current.weather[0].description;
    todayFeelsLike.textContent = `${data.current.feels_like}°C`
    todaySunrise.textContent = new Date(data.current.sunrise * 1000).toLocaleTimeString("en-GB")
    todaySunset.textContent = new Date(data.current.sunset * 1000).toLocaleTimeString("en-GB")
}*/