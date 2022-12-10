const API_KEY = "e4f60eea898203eec2e7f4aa925347c7"

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child")
            const city = document.querySelector("#weather span:last-child")
            city.textContent = data.name
            weather.textContent = `${data.weather[0].main} / ${data.main.temp}`
        })
}

function onGeoError() {
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)



const form = document.querySelector('#city-form');
form.onsubmit = getCityWeatherData;
let cityTitle = document.querySelector("#title");
let temperature = document.querySelector("#temperature");
let weatherSummary = document.querySelector("#weather-summary");
let weatherDescription = document.querySelector("#weather-description");
let weatherImage = document.querySelector("#weather-image");

function getCityWeatherData(event) {
  event.preventDefault();
  let inputedCity = document.querySelector("#city").value;
  const api = "https://api.openweathermap.org/data/2.5/weather?q=";
  const city = inputedCity;
  const apiKey = `&appid=${API_KEY}`;
  inputedCity = ''
  
  let apiURL = api + city + apiKey;
  
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      cityTitle.textContent = `City name: ${data.name}`;
      temperature.textContent = `Temperature here is: ${Math.round(
        data.main.temp - 273
      )} Degree Celsius`;
      weatherSummary.innerHTML = `<b>${data.weather[0].main}</b>;`;
      weatherDescription.textContent = `${data.weather[0].description}`;
      weatherImage.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    })
    .catch((error) => {
      cityTitle.textContent = `City does not exist`;
      temperature.textContent = "";
      weatherSummary.innerHTML = "";
      weatherDescription.textContent = "";
      weatherImage.setAttribute("src", "");
      alert("City does not exist");
    })
    .finally(() => {
      form.reset();
    });
}

