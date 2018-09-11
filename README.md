OpenMOC
=================
OpenMOC is a satellite tracking web application written in ReactJS. It supports visualization of satellite orbits with OpenStreetMaps, future passes and observation angles for satellites directly above you.

[中文文档](https://github.com/Seedarchangel/TuChart/blob/master/Example_Graphs/En_US.md)

## Examples
#### Interactive Realtime Tracking
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/move.gif)
#### Satellite Info
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/single_map.png?raw=true)
#### Multiple Satellites
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/map_3.png?raw=true)
#### Sky at a Glance
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/polar_many.png)
#### Upcoming Passes
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/passes.png)
#### Timeline
![notebook-0](https://github.com/Seedarchangel/openmoc/blob/master/examples/timeline.png)


## Download
#### The Easy Way:
You can download the bundled application here. They are packaged in Electron and is identical to the web app. You do not need to install any additional dependencies.

Windows:

Mac:

Linux:

#### The Hard Way:
You will need node.js, npm and git installed.
Clone this repository:
```git clone https://github.com/Seedarchangel/openmoc```

Then perform ```npm install``` in the project folder to install all the node module dependencies(Thanks, javascript). To start the application, do ```npm start``` and go to ```localhost:3000``` in your browser. 

## How it works:
openMOC acquires satellite two-line-element data from NORAD and Celestrak. Two-Line-Element files can be used with SGP-4 propagations to predict satellite orbit with decent accuracy.

This application uses TLE.js and JSPredict libraries for SGP-4 predictions. Although the orbits plotted by openmoc match up with commerical sites like https://www.heavens-above.com/ , accuracy of javascript SGP-4 implementations have not been verified. For serious mission planning, it is still recommended to use legacy software like [Gpredict](https://github.com/csete/gpredict)

## Openmoc Currently Supports:
* Satellite Types(as cataloged by Celestrak)
  * Cubesats
  * Space Stations
  * Beidou
  * Amateur Satellites
  * Argos Data Collection System
  * Disaster Monitering
  * Education
  * Engineering
  * Galileo
  * Glonass Operational
  * GlobalStar
  * GOES
  * Gorizont
  * GPS Satellites
  * IntelSat
  * Iridium Debris
  * Iridium Next
  * Iridium
  * Military
  * Molniya
  * Russia LEO Navigation
  * Navy Navigation Satellite
  * NOAA
  * Orbcomm
  * Other Communication Satellite
  * PLANET
  * Radar Calibration
  * Raduga
  * Earth Resources
  * Search & Rescue
  * Space & Earth Science
  * SES
  * Tracking and Data Relay Satellite System
  * Last 30 Days Launches
  * 100 (or so) Brightest
  * Weather
  * Experimental

* Satellite Orbit Visualization
  * Open Street Maps
  * Groundstation Coordinate Configuration
  
* Upcoming Passes
  * Future passes of all selected satellites
* Passes Calender
* Sky at a Glance
  * Viewing angles for satellites above your head

## TODO:
* Radio and Rotator Configurations
* Celsium globe visualization
* View trajectory of a particular pass
  
