const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const https = require('https');
var cors = require('cors');
const fs = require('fs')
const app = express();
const category = {
"Cubesats": "cubesat.txt",
"Space Stations": "stations.txt",
"Beidou": "beidou.txt",
"Amateur": "amateur.txt",
"Argos Data Collection System": "argos.txt",
"Cosmos 2251 Debris": "cosmos-2251-debris.txt",
"Disaster Monitoring": "dmc.txt",
"Education": "education.txt", 
"Engineering": "engineering.txt",
"Feng Yun Debris": "fengyun.txt",
"Galileo": "galileo.txt",
"Geodetic": "geodetic.txt",
"Glonass Operational": "glo-ops.txt",
"GlobalStar": "globalstar.txt",
"GOES": "goes.txt",
"Gorizont": "gorizont.txt",
"Operational GPS": "gps-ops.txt",
"IntelSat": "intelsat.txt",
"Iridium Debris": "iridium-33-debris.txt",
"Iridium Next": "iridium-NEXT.txt",
"Iridium": "iridium.txt",
"Military": "military.txt",
"Molniya": "molniya.txt",
"Russia LEO Navigation": "musson.txt",
"Navy Navigation Satellite": "nnss.txt",
"NOAA": "noaa.txt",
"Orbcomm": "orbcomm.txt",
"Other Communication Satellite": "other-comm.txt",
"Other": "other.txt",
"PLANET": "planet.txt",
"Radar Calibration": "radar.txt",
"Raduga": "raduga.txt",
"Earth Resources": "resource.txt",
"Search & Rescue": "sarsat.txt",
"Satellite-Based Augmentation System (WAAS/EGNOS/MSAS)": "sbas.txt",
"Space & Earth Science": "science.txt",
"SES": "ses.txt",
"Tracking and Data Relay Satellite System (TDRSS)": "tdrss.txt",
"Last 30 Days' Launches": "tle-new.txt",
"100 (or so) Brightest": "visual.txt", 
"Weather": "weather.txt",
"Experimental": "x-comm.txt"
}

var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


io.on('connection', function(socket){
    console.log("connect socket from open-orbit frontend")
})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get("/", function(req, res, next) {
    return res.send('pong');
});

app.get("/api/listcategory", function(req,res) {
    fs.readFile(path.resolve(__dirname, "./TLEs/categories.json"), 'UTF-8', function (err, data){
        return res.send({categories: data})
    })
})

app.post("/api/updateTles", function(req, res) {
    var files = []
    for(var key in category){
        files.push(category[key])
 //       var filename = category[key]
 //       var file = fs.createWriteStream(filename);
 //       var request = https.get("https://www.celestrak.com/NORAD/elements/"+filename, function(response) {
 // response.pipe(file);
}
    try {
    processArray(files)
}
    catch(err) {
    return res.send({status: "fail"})
}
    return res.send({status: "success"})
    
    })


app.post("/api/getFile", function(req, res) {
    var key = req.body.fileName
    console.log(key)
    fs.readFile(path.resolve(__dirname, "./TLEs/"+key), 'UTF-8', function (err, data){
        return res.send({tle: data})
    })
})

async function processArray(array) {
    array.forEach(async (item) => {
    var filename = item
    console.log(path.join(__dirname, "./TLEs/" + filename))
    var file = fs.createWriteStream(path.join(__dirname, "./TLEs/" + filename));
    var request = https.get("https://www.celestrak.com/NORAD/elements/"+filename, function(response) {
    response.pipe(file);})
})
}


server.listen(process.env.PORT || 8080);