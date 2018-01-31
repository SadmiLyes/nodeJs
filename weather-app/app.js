
const yargs = require('yargs');

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

geocode.geocodeAdress(argv.address,(errorMessage, result) => {
    if(errorMessage){
        console.log(errorMessage);
    }else{
        weather.getWeather(result.latitude,result.longitude,(errorMsg, weatherResutls)=>{
            if(errorMsg){
                console.log(errorMsg);
            } else {
                console.log(`--- \nAdress : ${result.address}\nTemperature : ${weatherResutls.temperature}\nApparent Temperature : ${weatherResutls.apparentTemperature} `)
            }
        })
    }
});

// https://api.darksky.net/forecast/d7bf6277e5374c23bb5815db1dec6b07/




