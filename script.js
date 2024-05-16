const apiKey = "08ae10625529a4e6e8b72cc16762f13f";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function checkWeather(city) {
  city = city.toLowerCase();

  fetch(apiURL + city + `&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = data.main.temp + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      const weatherMain = data.weather[0].main;
      switch (weatherMain) {
        case "Clear":
          weatherIcon.innerHTML = '<span class="material-symbols-outlined size-200"> clear_day </span>';
          break;
        case "Clouds":
          weatherIcon.innerHTML = '<span class="material-symbols-outlined size-200"> cloud </span>';
          break;
        case "Rain":
          weatherIcon.innerHTML = '<span class="material-symbols-outlined size-200"> rainy </span>';
          break;
        case "Drizzle":
          weatherIcon.innerHTML = '<span class="material-symbols-outlined size-200"> rainy_light </span>';
          break;
        case "Mist":
          weatherIcon.innerHTML = '<span class="material-symbols-outlined size-200"> partly_cloudy_day </span>';
          break;
        default:
          weatherIcon.innerHTML = ''; // Clear weather icon
          break;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error.message);
    });
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});


