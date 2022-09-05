const request = require("request");
const weather_access_key = "dd6fe64048f8e4d6cd127f9d64fecdd5";

const forecast = (lat, lon, callback) => {
  const WEATHER_API_URL = `http://api.weatherstack.com/current?access_key=${weather_access_key}&query=${lat},${lon}`;

  request({ url: WEATHER_API_URL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to servers!", undefined);
    } else if (response.body.error) {
      callback("Please enter a valid location!", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ", It is currently " +
          response.body.current.temperature +
          " degress out. And it feels like " +
          response.body.current.feelslike +
          "degrees out."
      );
    }
  });
};

module.exports = forecast;
