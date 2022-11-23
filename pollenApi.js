const http = require("https");
inputLat = 12.9889055;
inputLng = 77.574044;
//Input date/Time from latest 2 days.
startTime= "2022-11-23 00:00:00";
endTime = "2022-11-23 04:00:00";

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

let startDate = startTime[0]+startTime[1]+startTime[2]+startTime[3]+startTime[4]+startTime[5]+startTime[6]+startTime[7]+startTime[8]+startTime[9];
//console.log(startDate);
let endDate = endTime[0]+endTime[1]+endTime[2]+endTime[3]+endTime[4]+endTime[5]+endTime[6]+endTime[7]+endTime[8]+endTime[9];
//console.log(endDate);
let startHours = startTime[11]+startTime[12];
//console.log(startHours);
let startMin = startTime[14]+startTime[15];
//console.log(startMin);
let startSeconds = startTime[17]+startTime[18];
//console.log(startSeconds);

let endHours = endTime[11]+endTime[12];
//console.log(endHours);
let endMin = endTime[14]+endTime[15];
//console.log(endMin);
let endSeconds = endTime[17]+endTime[18];
//console.log(endSeconds);

function LatLngFromDateToDate(inputLat, inputLon, startDateInput,endDateInput,startHoursInput,startMinInput,startSecondsInput,endHoursInput,endMinInput,endSecondsInput){
    let path = '/history/pollen/by-lat-lng?lat='+inputLat+'&lng=' + inputLon + '&from='+startDateInput +
        '%20'+startHoursInput+'%3A'+startMinInput+'%3A'+startSecondsInput+ '&to=' +endDateInput +'%20'+
        endHoursInput+'%3A'+endMinInput+'%3A'+endSecondsInput;

    console.log(path);
    const options = {
        "method": "GET",
        "hostname": "api.ambeedata.com",
        "port": null,
        "path": path,
        "headers": {
            "x-api-key": "5ab5633d25b8f8f48f14679fb0c78eeac59f0ee98b317f32122f091f782e1ac5",
            "Content-type": "application/json"
        }
    };
    let output = "";
    let grassPollenCount = [];
    let grassPollenRisk = [];
    let treePollenCount = [];
    let treePollenRisk = [];
    let weedPollenCount = [];
    let weedPollenRisk = [];
    let lat = [];
    let lng = [];
    let time = [];
    let createdAt = [];
    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
            output = body.toString();
            newOutput = output.replace('{"message":"success",',"");
            newOutput2 = newOutput.replace('}]}',"");

           // console.log(newOutput2);
            array = newOutput2.split(",");
            for(let i = 0;i < array.length;i++){
                console.log(array[i]);
            }
            for(let i = 0;i < numberOfHours;i++){
                if(i == 0){
                    lat.push(parseFloat(array[0].replace('"lat":', "")));
                    //console.log(lat);
                    lng.push(parseFloat(array[1].replace('"lng":', "")));
                    //console.log(lng);
                }
               if( i == 0){
                   grassPollenCount.push(parseFloat(array[(i*8)+2].replace('"data":[{"Count":{"grass_pollen":', "")));

                   //console.log(grassPollenCount);
               }
               else {
                   grassPollenCount.push(parseFloat(array[(i*8)+2].replace('{"Count":{"grass_pollen":', "")));
                  // console.log(grassPollenCount);
               }
                treePollenCount.push(parseFloat(array[(i*8)+3].replace('"tree_pollen":', "")));
                //console.log(treePollenCount);
                weedPollenCount.push(parseFloat(array[(i*8)+4].slice(0,-1).replace('"weed_pollen":', "")));
                //console.log(weedPollenCount);
                grassPollenRisk.push((array[(i*8)+5].replace('"Risk":{"grass_pollen":', "")));
               // console.log(grassPollenRisk);
                treePollenRisk.push((array[(i*8)+6].replace('"tree_pollen":', "")));
               // console.log(treePollenRisk);
                weedPollenRisk.push((array[(i*8)+7].slice(0,-1).replace('"weed_pollen":', "")));
                //console.log(weedPollenRisk);
                time.push(array[(i*8)+8].replace('"time":', ""));
                if(i == numberOfHours-1 ){
                    createdAt.push((array[(i*8)+9].replace('"createdAt":', "")));
                }else{
                    createdAt.push((array[(i*8)+9].slice(0,-1).replace('"createdAt":', "")));
                }


            }
            console.log(lat);
            console.log(lng);
            console.log(grassPollenCount);
            console.log(treePollenCount);
            console.log(weedPollenCount);
            console.log(grassPollenRisk);
            console.log(treePollenRisk);
            console.log(weedPollenRisk);
            console.log(time);
            console.log(createdAt);


        });

    });

    req.end();
}

LatLngFromDateToDate(inputLat,inputLng,startDate,endDate,startHours,startMin,startSeconds,endHours,endMin,endSeconds);
