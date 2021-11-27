const request = require("postman-request");
const { openWeatherKey } = require("../../../apikey/openWeatherApiKey");

function getWeather(lat, lon, callback) {
  const WeatherByCoordinatesURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}`;

  request({ url: WeatherByCoordinatesURL, json: true }, (e, r, b) => {
    if (e) {
      console.log("can not request open weather, maybe your internet is slow ");
      callback(
        "can not request open weather, maybe your internet is slow ",
        undefined
      );
    } else if (b.cod === "400") {
      console.log(b);
      console.log(`error occured, maybe due to it can not find the location`);
      callback(
        `error occured, maybe due to it can not find the location`,
        undefined
      );
    } else if (b) {
      console.log(b);
      response = `it's ${b.weather[0].description},humidity is ${b.main.humidity}`;
      callback(undefined, response);
    } else {
      console.log(`unknown error`);
    }
  });
}

module.exports = getWeather;
