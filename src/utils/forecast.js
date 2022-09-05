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
       `Description: ${response.body.current.weather_descriptions[0]}   
         Temperature: ${response.body.current.temperature} °C  
         Feels like: ${response.body.current.feelslike}  ° C
         Precip: ${response.body.current.precip}
 `
          
      );
    }
  });
};

module.exports = forecast;
