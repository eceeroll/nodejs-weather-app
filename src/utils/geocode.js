const request = require("request");
const positions_access_key = "b02fe96fe0b1fb0fc2ae7b94b0442bc8";

const geocode = (address, callback) => {
    const POSITIONS_API_URL = `http://api.positionstack.com/v1/forward?access_key=${positions_access_key}&query=${encodeURIComponent(
        address
    )}&limit=1`;

    request({ url: POSITIONS_API_URL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to servers!", undefined);
        } else if (response.body.error) {
            callback("Please enter a valid location!", undefined);
        } else if (response.body.data.length === 0) {
            callback("Please enter a valid location name!");
        } else {
            callback(undefined, {
                lat: response.body.data[0].latitude,
                lon: response.body.data[0].longitude,
                name: response.body.data[0].name,
            });
        }
    });
}

module.exports = geocode;
