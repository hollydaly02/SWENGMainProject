let lat = [];
let lon = [];
let AQI = [];
let CO = [];
let NO = [];
let NO2 = [];
let OZONE = [];
let SO2 = [];
let PM25 = [];
let PM10 = [];
let NH3 = [];
let DateTime = [];
function main(){
    let inputLat = 10.2;
    let inputLon = 20.1;
    let startTime = '2022/11/19 00:00:00';
    let endTime = '2022/11/19 03:00:00';

    function toTimestamp(strDate){
        let datum = Date.parse(strDate);
        return datum/1000;
    }

    let startTimeInUnix = toTimestamp(startTime);
    let endTimeInUnix =  toTimestamp(endTime);
    console.log(startTimeInUnix);
    console.log(endTimeInUnix);

    let timeDifference = endTimeInUnix-startTimeInUnix;
    console.log(timeDifference);
    let numberOfHours = timeDifference/3600;
    console.log(numberOfHours);

    airQualityForHourByLatLon(inputLat,inputLon,startTimeInUnix,endTimeInUnix).then(jsonData => {
        let output = JSON.stringify(jsonData);

        let array = output.split(",");
        for(let i = 0;i < array.length;i++){
            console.log(array[i]);
            //console.log(i);
        }
        for(let i = 0;i < numberOfHours;i++){

            if(i == 0){
                lon.push(parseFloat(array[0].replace('{"coord":{"lon":', "")));
                //console.log(lon);
                lat.push(parseFloat(array[1].slice(0,-1).replace('"lat":', "")));
                //console.log(lat);
            }

            if(i == 0){
                AQI.push(parseFloat(array[(i*10)+2].slice(0,-1).replace('"list":[{"main":{"aqi":', "")));
            }
            else{
                AQI.push(parseFloat(array[(i*10)+2].slice(0,-1).replace('{"main":{"aqi":', "")));
            }
           // console.log(AQI);
            CO.push(parseFloat(array[(i*10)+3].replace('"components":{"co":', "")));
            //console.log(CO);
            NO.push(parseFloat(array[(i*10)+4].replace('"no":', "")));
           // console.log(NO);
            NO2.push(parseFloat(array[(i*10)+5].replace('"no2":', "")));
           // console.log(NO2);
            OZONE.push(parseFloat(array[(i*10)+6].replace('"o3":', "")));
            //console.log(OZONE);
            SO2.push(parseFloat(array[(i*10)+7].replace('"so2":', "")));
            // console.log(SO2);
            PM25.push(parseFloat(array[(i*10)+8].replace('"pm2_5":', "")));
            //console.log(PM25);
            PM10.push(parseFloat(array[(i*10)+9].replace('"pm10":', "")));
            //console.log(PM10);
            NH3.push(parseFloat(array[(i*10)+10].slice(0,-1).replace('"nh3":', "")));
           // console.log(NH3);

            DateTime.push(parseFloat(array[(i*10)+11].slice(0,-1).replace('"dt":', "")));
            //console.log(DateTime);
        }


        console.log(lon);
        console.log(lat);
        console.log(AQI);
        console.log(CO);
        console.log(NO2);
        console.log(OZONE);
        console.log(SO2);
        console.log(PM25);
        console.log(PM10);
        console.log(NH3);
        console.log(DateTime);
        //Use values here in the promise

    });

}


async function airQualityForHourByLatLon(inputLat, inputLon, startTimeInput, endTimeInput) {
    let key = '725c1ea056aba9bb9f157aba9d00a3c2';
    let url = 'https://api.openweathermap.org/data/2.5/air_pollution/history?lat=' + inputLat + '&lon=' + inputLon + '&start=' + startTimeInput + '&end=' + endTimeInput + '&appid=' + key;
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
}
main();



