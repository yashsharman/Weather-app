let weather = {
  apiKey: "8a460a8c9214b42078d94889f317f004",
  fetchWeather: function (city) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.showWeather(data));
  },
  showWeather: function (data) {
    const { name } = data;
    const { temp, temp_min, temp_max, humidity } = data.main;
    const { icon, description } = data.weather[0];
    const { speed } = data.wind;

    document.querySelector(".city").innerHTML = name;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".max").innerHTML =
      `<i class="fa fa-long-arrow-up"></i>` + " " + temp_max + "°C";
    document.querySelector(".min").innerHTML =
      `<i class="fa fa-long-arrow-down"></i>` + " " + temp_min + "°C";
    document.querySelector(".humidity").innerHTML =
      "Humidity " + humidity + "%";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".wind").innerHTML =
      "Wind Speed " + speed + " " + "km/h";
    document.querySelector(".description").innerHTML = description;
  },
  search: function () {
    this.fetchWeather(document.querySelector("input").value);
  },
};
document.querySelector(".btn").addEventListener("click", function () {
  weather.search();
});
document.querySelector("input").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
  localStorage.setItem("previousSearch", document.querySelector("input").value);
});


let lastSearch = localStorage.getItem("previousSearch");

weather.fetchWeather(lastSearch);
