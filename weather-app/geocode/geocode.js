const request = require('request');
const axios = require('axios');

var geocodeAdress = (adress, callback) => {
    request({
        url: `https://maps.google.com/maps/api/geocode/json?key=AIzaSyDmZwhhH9Tq9A42aPG4J93UOzD5WaoDNn0&address=${encodeURIComponent(adress)}`,
        json: true
    },(error, response, body)=>{
        if(error){
            callback('Unable to connect to Google servers.');
        }else if (body.status === "ZERO_RESULTS"){
            callback('Unable to find that adress.');
        }else if (body.status === 'OK'){
            callback(undefined, {
                address      : body.results[0].formatted_address,
                latitude    : body.results[0].geometry.location.lat,
                longitude   : body.results[0].geometry.location.lng
            })
        }
    })
};



module.exports = {
    geocodeAdress
}
