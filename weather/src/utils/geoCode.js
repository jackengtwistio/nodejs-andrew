const request = require("postman-request");
const { mapBoxKey } = require("../../../apikey/openWeatherApiKey");

function geoCode(address, callback) {
  const mapboxURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=" +
    mapBoxKey +
    "&limit=1";
  request({ url: mapboxURL, json: true }, async (error, response) => {
    if (error) {
      callback(
        "can not request mapbox, maybe you are not connected to an internet ",
        undefined
      );
    } else if (response.body.features.length === 0) {
      console.log(`mapbox is unable to find the address ${address}`);
    } else {
      let coordiObj = await callback(undefined, {
        coordinates: response.body.features[0].center,
        lat: response.body.features[0].center[0],
        lon: response.body.features[0].center[1],
        cityName: response.body.features[0].place_name,
      });
      return coordiObj;
    }
  });
}

module.exports = geoCode;
