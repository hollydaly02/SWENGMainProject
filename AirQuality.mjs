
// Get air quality for given lat/lon for an hour through unix time
import fetch from "node-fetch";
let inputLat = 10.2;
let inputLon = 20.1;
let startTime = 1668854358; //Saturday, November 19, 2022 10:39:18 AM
let endTime =  1668857958; //  Saturday, November 19, 2022 11:39:18 AM
// Use https://www.epochconverter.com to convert (for now)



let lat = 0.0;
let lon = 0.0;
let AQI = 0.0;
let CO = 0.0;
let NO = 0.0;
let NO2 = 0.0;
let OZONE = 0.0;
let SO2 = 0.0;
let PM25 = 0.0;
let PM10 = 0.0;
let NH3 = 0.0;


function airQualityForHourByLatLon(inputLat,inputLon,startTime,endTime) {
    let key = '725c1ea056aba9bb9f157aba9d00a3c2';

    fetch('https://api.openweathermap.org/data/2.5/air_pollution/history?lat='+inputLat+'&lon='+inputLon+'&start='+startTime+'&end='+endTime+'&appid='+key)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            let output = JSON.stringify(data)
            console.log(output);
            let array = output.split(",");
            for(let i = 0;i < array.length;i++){
                console.log(array[i]);
            }

            lon = parseFloat(array[0].replace('{"coord":{"lon":', ""));
            console.log(lon);
            lat = parseFloat(array[1].slice(0,-1).replace('"lat":', ""));
            console.log(lat);
            AQI = parseFloat(array[2].slice(0,-1).replace('"list":[{"main":{"aqi":', ""));
            console.log(AQI);
            CO = parseFloat(array[3].replace('"components":{"co":', ""));
            console.log(CO);
            NO = parseFloat(array[4].replace('"no":', ""));
            console.log(NO);
            NO2 = parseFloat(array[5].replace('"no2":', ""));
            console.log(NO2);
            OZONE = parseFloat(array[6].replace('"o3":', ""));
            console.log(OZONE);
            SO2 = parseFloat(array[7].replace('"so2":', ""));
            console.log(SO2);
            PM25 = parseFloat(array[8].replace('"pm2_5":', ""));
            console.log(PM25);
            PM10 = parseFloat(array[9].replace('"pm10":', ""));
            console.log(PM10);
            NH3 = parseFloat(array[10].replace('"nh3":', ""));
            console.log(NH3);


        })
        .catch(function() {
            // catch any errors
        });
}

airQualityForHourByLatLon(inputLat,inputLon,startTime,endTime);
