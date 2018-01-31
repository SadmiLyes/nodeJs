const yargs = require('yargs');
const axios = require('axios');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .option({
    a : {
        demand: true,
        alias: 'address',
        describe: 'Adresse to fetch weather for',
        string: true
    }
})
    .help()
    .alias('help','h')
    .argv;

var geocodeUrl = `https://maps.google.com/maps/api/geocode/json?key=AIzaSyDmZwhhH9Tq9A42aPG4J93UOzD5WaoDNn0&address=${encodeURIComponent(argv.address)}`;
axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that adress.');
    }
    var lat = response.data.results[0].geometry.location.lat,
        lng = response.data.results[0].geometry.location.lng,
        weatherUrl = `https://api.darksky.net/forecast/91ebefbcd94efb466584e677e5823462/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.currently.temperature,
        apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`it's currently ${temperature}, It feels like ${apparentTemperature}`);
}).catch((e)=>{
    if(e.code === 'ECONNREFUSED'){
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
})