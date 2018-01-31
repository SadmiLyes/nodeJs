const request = require('request');
const axios = require('axios');
var getWeather = (lat,lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/91ebefbcd94efb466584e677e5823462/${lat},${lng}`,
        json:true
    },(error,response,body)=>{
        if(error){
            callback('Unable to connect to Forecast.io.');
        } else if (!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.');
        }
    })
};

module.exports.getWeather = getWeather;