const http = require("https");
inputLat = 12.9889055;
inputLng = 77.574044;
inputDateFrom = "2020-07-13 00:00:00";
inputDateTo = "2020-07-14 00:00:00";
function latestByLatLng(inputLat,inputLng){
    const options = {
        "method": "GET",
        "hostname": "api.ambeedata.com",
        "port": null,
        "path": `/latest/by-lat-lng?lat=${inputLat}&lng=${inputLng}`,
        //"path": "/latest/by-lat-lng?lat=12.9889055&lng=77.574044",
        "headers": {
            "x-api-key": "5ab5633d25b8f8f48f14679fb0c78eeac59f0ee98b317f32122f091f782e1ac5",
            "Content-type": "application/json"
        }
    };
    let output = "";
    let COString = "";
    let CO = 0.0;
    let NO2 = 0.0;
    let OZONE = 0.0;
    let PM10 = 0.0;
    let PM25 = 0.0;
    let SO2 = 0.0;
    let city = "";
    let countryCode = "";
    let division = "";
    let lat = 0.0;
    let lng = 0.0;
    let placeName = "";
    let postalCode = "";
    let state = "";
    let updatedAt = "";
    let pollutant = "";
    let concentration = 0.0;
    let category = "";
    let AQI = 0.0;
    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {

            chunks.push(chunk);



        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            //console.log(body.toString());
            output = body.toString();
            newOutput = output.replace('{"message":"success","stations":[{',"");
            newOutput2 = newOutput.replace(']}',"");
            //newOutput = output.replace('}]',"");

            array = newOutput2.split(",");
            for(let i = 0;i < array.length;i++){
                console.log(array[i]);

            }

            CO = parseFloat(array[0].replace('"CO":', ""));
            console.log(CO);
            NO2 = parseFloat(array[1].replace('"NO2":', ""));
            console.log(NO2);
            OZONE = parseFloat(array[2].replace('"OZONE":', ""));
            console.log(OZONE);
            PM10 = parseFloat(array[3].replace('"PM10":', ""));
            console.log(PM10);
            PM25 = parseFloat(array[4].replace('"PM25":', ""));
            console.log(PM25);
            SO2 = parseFloat(array[5].replace('"SO2":', ""));
            console.log(SO2);
            city = array[6].replace('"city":', "");
            console.log(city);
            countryCode = array[7].replace('"countryCode":', "");
            console.log(countryCode);
            division = array[8].replace('"division":', "");
            console.log(division);
            lat = parseFloat(array[9].replace('"lat":', ""));
            console.log(lat);
            lng = parseFloat(array[10].replace('"lng":', ""));
            console.log(lng);
            placeName = array[11].replace('"placeName":', "");
            console.log(placeName);
            postalCode = array[12].replace('"postalCode":', "");
            console.log(postalCode);
            state = array[13].replace('"state":', "");
            console.log(state);
            updatedAt = array[14].replace('"updatedAt":', "");
            console.log(updatedAt);
            pollutant = array[15].replace('"aqiInfo":{"pollutant":', "");
            console.log(pollutant);
            concentration = parseFloat(array[16].replace('"concentration":', ""));
            console.log(concentration);
            category = array[17].replace('"category":', "");
            console.log(category);
            AQI = parseFloat(array[18].slice(0,-1).replace('"AQI":', ""));
            console.log(AQI);
        });

    });

    req.end();
}
function LatLngFromDateToDate(){

    const options = {
        "method": "GET",
        "hostname": "api.ambeedata.com",
        "port": null,
        //"path": "/history/by-lat-lng?lat=12.9889055&lng=77.574044&from=2020-07-13 12:16:44&to=2020-07-14 12:16:44",
        "path": "/history/by-lat-lng?lat=12.9889055&lng=77.574044&from=2022-11-15%2000%3A00%3A00&to=2022-11-15%2001%3A00%3A00",
        //"path": `/history/by-lat-lng?lat=${inputLat}&lng=${inputLng}&from=${inputDateFrom}&to=${inputDateTo}`,
        "headers": {
            "x-api-key": "5ab5633d25b8f8f48f14679fb0c78eeac59f0ee98b317f32122f091f782e1ac5",
            "Content-type": "application/json"
        }
    };
    let output = "";

    let NO2 = 0.0;
    let PM10 = 0.0;
    let PM25 = 0.0;
    let CO = 0.0;
    let SO2 = 0.0;
    let OZONE = 0.0;
    let AQI = 0.0;
    let lat = 0.0;
    let lng = 0.0;
    let createdAt = "";
    let postalCode = "";
    let majorPollutant = "";
    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            output = body.toString();
            newOutput = output.replace('{"message":"success","data":[{',"");
            newOutput2 = newOutput.replace('}]}',"");
            //newOutput = output.replace('}]',"");
            console.log(newOutput2);
            array = newOutput2.split(",");
            for(let i = 0;i < array.length;i++){
                console.log(array[i]);
            }

            CO = parseFloat(array[0].replace('"CO":', ""));
            console.log(CO);
            NO2 = parseFloat(array[1].replace('"NO2":', ""));
            console.log(NO2);
            OZONE = parseFloat(array[2].replace('"OZONE":', ""));
            console.log(OZONE);
            PM10 = parseFloat(array[3].replace('"PM10":', ""));
            console.log(PM10);
            PM25 = parseFloat(array[4].replace('"PM25":', ""));
            console.log(PM25);
            SO2 = parseFloat(array[5].replace('"SO2":', ""));
            console.log(SO2);
            lat = parseFloat(array[6].replace('"lat":', ""));
            console.log(lat);
            lng = parseFloat(array[7].replace('"lng":', ""));
            console.log(lng);
            postalCode = array[8].replace('"postalCode":', "");
            console.log(postalCode);
            AQI = parseFloat(array[9].replace('"AQI":', ""));
            console.log(AQI);
            createdAt = array[10].replace('"createdAt":', "");
            console.log(createdAt);
            majorPollutant = array[11].replace('"majorPollutant', "");
            console.log(majorPollutant);

        });

    });

    req.end();
}
//latestByLatLng(inputLat,inputLng);
//Change lat/lng and from one date by hour
LatLngFromDateToDate();
