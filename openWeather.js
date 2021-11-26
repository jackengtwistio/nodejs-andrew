const axios = require('axios')
const request = require('postman-request')
const location = process.argv.slice(2).join(' ')
const APIkey = `5b52f0c85b3b5e27028cc42c5b6788eb`


function geoCode(address, callback) {
    const mapboxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiamFja2VuZ3R3aXN0aW8iLCJhIjoiY2t3ZnEyYTk0MGd1YjJubXBqNjRsNWRpOCJ9.xUf2stJGj3YQ9tlV5tM_Xw&limit=1"
    request({url: mapboxURL,json:true},(error,response) => {
        if (error) {
            callback('can not request mapbox, maybe you are not connected to an internet ',undefined)
        }else if (response.body.features.length === 0){
            console.log(`mapbox is unable to find the address ${address}`)
        }else{
            callback(undefined, {
                coordinates: response.body.features[0].center,
                lat:response.body.features[0].center[0],
                lon:response.body.features[0].center[1],
                cityName:response.body.features[0].place_name 
            })
        }
    })
}

async function getWeather (lat,lon){
    const WeatherByCoordinatesURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5b52f0c85b3b5e27028cc42c5b6788eb`

    
        
    request({url: WeatherByCoordinatesURL, json: true},(e,r,b)=>{
        if (e) {
            callback('can not request open weather, maybe your internet is slow ',undefined)
        }else if (r.error){
            // console.log(`mapbox is unable to find the address ${address}`)
            console.log(`open weather is not working correctly,error: `+r.error)
        }else if (b){console.log(b)}
        else{console.log(`unknown error`)}
    })
}

geoCode(location,(error,response)=>{
    const { lat, lon } = response
    if(error){console.log(`error: ${error}`)}

    // console.log(`response: ${response.cityName} ${response.lat} ${response.lon}`)
    if(response){
        getWeather(lat,lon)
    }
})





// console.log(location)
// let geoCode = []
// function getGeoCode(err, res, body){
//     // console.log(err)
//     // console.log(res)
//     console.log(body.features[0].center)
//     return (body.features[0].center)
// }






// getSixteendaysWeather(geoCode)








// .then(data=>console.log(data))
// const sixteendaysWeather = request({url: openWeatherByCoordinatesURL, json: true},(e,r,b)=>console.log(r))








// request({mapboxURL, json: true}, function (error, response, body) {
//     console.log('error:', error); 
//     console.log('statusCode:', response && response.statusCode); 
//     console.log('body:', body)
// })




// axios.get("https://api.openweathermap.org/data/2.5/weather?q=London&appid=5b52f0c85b3b5e27028cc42c5b6788eb")
// .then(data=>console.log(data.data))