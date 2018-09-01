import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css'
import {Select, Button, Modal, InputNumber, Table} from 'antd';
import Plot from 'react-plotly.js';
import React from 'react';
import axios from 'axios';
import TLEJS from 'tle.js'
import {Map, TileLayer, Marker, Polyline, Tooltip} from 'react-leaflet';
import L from 'leaflet'
import jspredict from 'jspredict'
import moment from 'moment'

//import { Viewer, Entity } from "cesium-react";
//import { Cartesian3 } from "cesium";
//import 'leaflet/dist/leaflet.css'
const { Column, ColumnGroup } = Table;
const Option = Select.Option
const tlejs = new TLEJS()
export class SatelliteSelect extends React.Component {
	constructor(props) {
		super(props)
        var catelogs = [];
        var sats = []
        //child.push(<Option key={"first"}>first</Option>)
		this.state = {
        catelogs: catelogs,
        sats: sats, 
        availableCatelog: "",
        selectedCatelog: "",
        availableSats: [],
		selectedSats: "",
        options: "",
        tles: "",
        selectedtles: "",
        //child: child
		}
		this.changeMission = this.changeMission.bind(this)
        this.changeSatellite = this.changeSatellite.bind(this)
        GetSelectedTles = GetSelectedTles.bind(this)
	}

    changeSatellite(value) {
        var tle = {}
        value.map((value, idx)=> {
            if(Object.keys(this.state.selectedtles).includes(value)){
                tle[value] = this.state.selectedtles[value]
            }
            else
                tle[value] = this.state.tles[value]
        })
        this.setState({selectedtles: tle},()=>{
            updateOSMorbit()
            updatePasses(tle)
            updateTimelinePasses(tle)
        })
}

    changeMission(value) {
        this.setState({selectedCatelog: value}, function callback(){
        axios.post(`http://localhost:8080/api/getFile`, { 
        fileName: this.state.catelogs[this.state.selectedCatelog]
   }).then(res => {
        var tles = res.data.tle.split("\n")
        var tleJson = {}
        var satoptions = []
        for(var idx = 0; idx<tles.length; idx++){
                if(idx%3===0) {
                    if(tles[idx]!=""){
                    var tlearray = []
                    tlearray.push(tles[idx+1])
                    tlearray.push(tles[idx+2])
                    tleJson[tles[idx]] = tlearray
                    satoptions.push(<Option key={tles[idx]}>{tles[idx]}</Option>)
                    }
                }
                
            }
        this.setState({availableSats: satoptions})
        this.setState({tles: tleJson})
   })
        })

    }

    componentDidMount() {
            //console.log(navigator.geolocation.getCurrentPosition(function(location) {
                //console.log(location)
            //}))
        	axios.get(`http://localhost:8080/api/listcategory`).then(res=>{
                var namejson = JSON.parse(res.data.categories)
                var categoryList = []
                var options = []
                for(var names in namejson)
                 {
                    options.push(<Option key={names}>{names}</Option>)
                 }
                 this.setState({catelogs: namejson})
                 this.setState({options: options})
                 //(<Option key={"first"}>first</Option>)
            })
    }

	render(){
		return (
			<div>
				Category
        <br/>
            <Select
                mode="single"
                style={{ width: '100%' }}
                onChange={this.changeMission}
                tokenSeparators={[',']}
            >
                {this.state.options}
            </Select>
        <br/>
                Satellite
        <br/>
            <Select
                mode="tags"
                style={{ width: '100%' }}
                onChange={this.changeSatellite}
                tokenSeparators={[',']}
            >
                {this.state.availableSats}
            </Select>
			</div>
		)
	}
}

export class OSM extends React.Component {

	constructor(props) {
		super(props)
        //child.push(<Option key={"first"}>first</Option>)
		this.state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 1,
        position: [],
        orbits: [],
        gs: "",
        satinfos: []
        //child: child
		}
    updateOSMorbit = updateOSMorbit.bind(this)
	}

  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  tick() {
    const position = []
    const focus = [50.0, 50.0]
    var tleList = GetSelectedTles()
    var orbits = []
    var name = []
    var satinfos = []
    var gs = [getGS().latitude, getGS().longitude]
    if(tleList!=[])
    {
    for (var key in tleList) {
    var tlestring = ""
    var tlearray = tleList[key]
    tlestring = key + "\n" + tlearray[0] + "\n" + tlearray[1]
    var location = tlejs.getLatLon(tlestring)
    position.push(location)
    var satinfo = tlejs.getSatelliteInfo(tlestring, new Date(), gs[0], gs[1], getGS().altitude)
    satinfos.push(satinfo)
    name.push(key)
   // var orbit = tlejs.getGroundTrackLatLng(tlestring)[1]
   // if(typeof(orbit) == "undefined") {
   //   orbit = tlejs.getGroundTrackLatLng(tlestring)
   // }
   // orbits.push(orbit)
}
    }
    this.setState({position: position, focus: focus, name: name, gs: gs, satinfos: satinfos})
    }

  render() {
    const customMarker = L.icon({ iconUrl: require("./261861.svg"), iconSize: [30, 30]})
    const radarMarker= L.icon({iconUrl: require("./radar.svg"), iconSize: [30, 30]})
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={this.state.focus} zoom={1} style={{ width: '100%', height: '500px' }}>
  
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker key= {Math.random()} icon={radarMarker} position={this.state.gs} className="myGS"/>
        
        {this.state.position.map((position, idx) => 
        <Marker key= {Math.random()} icon={customMarker} position={position} className="mysat">
        <Tooltip>{
          this.state.name[idx]}
          <br/>
          {"Elevation: " +
          this.state.satinfos[idx].elevation}
          <br/>
          {
          "Azimuth: " + this.state.satinfos[idx].azimuth}
          <br/>
          {
          "Distance: " + this.state.satinfos[idx].range  
          }
          <br/>
          {
          "Latitude: " + this.state.satinfos[idx].lat
          }
          <br/>
          {
          "Longitude: " + this.state.satinfos[idx].lng
          }
          <br/>
          {
          "Velocity: " + this.state.satinfos[idx].velocity
          }
          </Tooltip>


        </Marker>
        
        
        
        
        )}
        {/*this.state.position.map((position, idx) => 
        <Popup key={Math.random()} position={position}>
        {this.state.name[idx]}
 
        </Popup>
        
        )*/}

        {this.state.orbits.map((orbit, index) => 
        <Polyline key = {Math.random()} positions = {orbit}>
        </Polyline>
        )
        }


      </Map>
    )
  }
}


export class Passes extends React.Component {

	constructor(props) {
		super(props)
        //child.push(<Option key={"first"}>first</Option>)
		this.state = {
            selectedtles: "",
            passes: []
            
        //child: child
		}
        updatePasses = updatePasses.bind(this)
	}

  componentDidMount(){

  }
  
  componentWillUnmount() {
  }

  showModal(value) {
  }

  render() {
    return (
    <div>
       <Button>Refresh</Button>
          <Table dataSource={this.state.passes}>
      <Column
        title="Satellite"
        dataIndex="satellite"
        key="satellite"
      />
      <Column
        title="AOS Time"
        dataIndex="start"
        key="start"
      />
      <Column
        title="LOS Time"
        dataIndex="end"
        key="end"
      />
    <Column
      title="Duration"
      dataIndex="duration"
      key="duration"
    />
    <Column
      title="ETA"
      dataIndex="eta"
      key="eta"
    />
    <Column
      title="Action"
      key="action"
      render={(text, record) => (
        <span>
          <Button onClick={this.showModal}>View Pass</Button>
        </span>
      )}
    />
  </Table>
 
  </div>
    )
  }
}

export class Location extends React.Component {

	constructor(props) {
		super(props)
        //child.push(<Option key={"first"}>first</Option>)
		this.state = {
            location: "",
            visible: false,
            latitude: 0,
            longitude: 0,
            altitude: 0,
            allowchange: false,
        //child: child
		}
        this.showChange = this.showChange.bind(this)
        this.handleOK = this.handleOK.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.changeAlt = this.changeAlt.bind(this)
        this.changeLat = this.changeLat.bind(this)
        this.changeLong = this.changeLong.bind(this)
        getGS = getGS.bind(this)
	}

  componentDidMount(){
            navigator.geolocation.getCurrentPosition((location) => {
                this.setState({latitude: location.coords.latitude,
                               longitude: location.coords.longitude,
                               latitudeToChange: location.coords.latitude,
                               longitudeToChange: location.coords.longitude,
                               altitudeToChange: 0
                            }
                )
            })
  }
  
  componentWillUnmount() {
  }

  showChange() {
    this.setState({
        visible: true
    })
  }
  handleOK() {
    this.setState({
        altitude: this.state.altitudeToChange,
        latitude: this.state.latitudeToChange,
        longitude: this.state.longitudeToChange,
        visible: false
    })
  }
  handleCancel() {
    this.setState({
        visible: false,
        allowchange: false
    })
  }

  changeLat(value) {
    this.setState({latitudeToChange: value})
  }

  changeLong(value) {
    this.setState({longitudeToChange: value})
  }

  changeAlt(value) {
    this.setState({altitudeToChange: value})
  }

  


  render() {
    
    return (
        <div>
        <p fontSize={5}>Your current location is 
            Latitude: {this.state.latitude} {", "} Longitude: {this.state.longitude} {", "} Elevation: {this.state.altitude} {" "}
            <Button onClick={this.showChange}>Change Location</Button>
            </p>
        
        <Modal
        visible={this.state.visible}
        onOk={this.handleOK}
        onCancel={this.handleCancel}
        >
        Latitude: <InputNumber max={180} min={-180} onChange={this.changeLat} defaultValue={this.state.latitude}/> {"\n"}
        Longitude:  <InputNumber max={90} min={-90} onChange={this.changeLong} defaultValue={this.state.longitude}/>{"\n"}
        Elevation: <InputNumber onChange={this.changeAlt} defaultValue={this.state.altitude}/> {"\n"}
    
        </Modal>
        </div>
    )
  }
}

export class Radar extends React.Component {
	constructor(props) {
		super(props)
        //child.push(<Option key={"first"}>first</Option>)
		this.state = {
            location: "",
            r: [],
            theta: []
        //child: child
		}
  }
    componentDidMount(){
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  tick() {
    var r = []
    var theta = []
    var gs = getGS()
    var tles = GetSelectedTles()
    for(var tle in tles) {
    var tlestring = ""
    var tlearray = tles[tle]
    var tlestring = tle + "\n" + tlearray[0] + "\n" + tlearray[1]
    var satInfo = tlejs.getSatelliteInfo(
      tlestring,
      new Date(),
      gs.latitutde,
      gs.longitude,
      gs.altitude
    )
    if (satInfo.elevation > 0) {
      r.push(satInfo.elevation)
      theta.push(satInfo.azimuth)
    }
    
  }
  this.setState({r: r, theta: theta})
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Plot
        data={[
          {
            r: this.state.r,
            theta: this.state.theta,
            type: 'scatterpolar',
            mode: 'markers',
            marker: {color: 'blue', size: 5, opacity: 0.7},
          },
        ]}
        layout={ {width: 1000, height: 600, title: 'Polar View', polar: {radialaxis: {range: [90, 0]}, angularaxis: {direction: "clockwise"}}} }
      />
    );
  }
}

export class Timeline extends React.Component {
	constructor(props) {
		super(props)
        //child.push(<Option key={"first"}>first</Option>)
		this.state = {
            passes: [],
            data: [],
            range: []
        //child: child
		}
    updateTimelinePasses = updateTimelinePasses.bind(this)
  }
    componentDidMount(){
      this.setState({range: [moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(1, "days").format('YYYY-MM-DD HH:mm:ss')]})
    //this.interval = setInterval(() => this.tick(), 1000);
  }
  
  tick() {
    var r = []
    var theta = []
    var gs = getGS()
    var tles = GetSelectedTles()
    for(var tle in tles) {
    var tlestring = ""
    var tlearray = tles[tle]
    var tlestring = tle + "\n" + tlearray[0] + "\n" + tlearray[1]
    var satInfo = tlejs.getSatelliteInfo(
      tlestring,
      new Date(),
      gs.latitutde,
      gs.longitude,
      gs.altitude
    )
    if (satInfo.elevation > 0) {
      r.push(satInfo.elevation)
      theta.push(satInfo.azimuth)
    }
    
  }
  this.setState({r: r, theta: theta})
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
      <Button>Refresh</Button>
      <Plot
        data={
          this.state.data
        }
        layout={ {width: 1000, height: 600, title: 'Satellite Timeline', xaxis: {type: 'date', range: this.state.range, rangeslider: {range: this.state.range}}} }
      />
      </div>
    );
  }
}

/*
export class Cesium extends React.Component {

	constructor(props) {
		super(props)
        //child.push(<Option key={"first"}>first</Option>)
		this.state = {
        //child: child
		}
	}

  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  tick() {
    /*tleList.map((value, idx) => {
    console.log(value)
    })
    //update satellite here
    }

  render() {
    return 
    /*<Viewer full>
        <Entity
          name="tokyo"
          point={{ pixelSize: 10 }}>
          test
        </Entity>
      </Viewer>

    
  }
}*/



function GetSelectedTles() {
    return this.state.selectedtles
}

function getGS() {
    return this.state
}

function updatePasses(tle) {
    if(typeof this !== "undefined"){
    var qth = getGS()
    var passes = []
    var qth = [qth.latitude, qth.longitude, qth.altitude]
    //var tle = '0 LEMUR-2 JEROEN\n1 40934U 15052E   15306.10048119  .00001740  00000-0  15647-3 0  9990\n2 40934   6.0033 141.2190 0010344 133.6141 226.4604 14.76056230  5130'
    var date = new Date()
    var interval = new Date()
    interval = (interval).setDate(date.getDate() + 10)
    //console.log(new Date(interval))
    var tles = GetSelectedTles()
    for (var key in tles) {
        var tlestring = ""
        var tlearray = tles[key]
        tlestring = key + "\n" + tlearray[0] + "\n" + tlearray[1]
        var passesList = jspredict.transits(tlestring, qth, date.getTime(), interval, 0, 10)
        if(typeof passesList !== "undefined"){
        passesList.map((value, idx) => {
        var pass = {}
        pass["satellite"] = key
        pass["start"] = new Date(value.start).toLocaleString()
        pass["end"] = new Date(value.end).toLocaleString()
        pass["duration"] = msToHMS(value.end - value.start)
        pass["key"] = Math.random()
        pass["eta"] = msToHMS(new Date(value.start) - new Date())
        passes.push(pass)
    })}
    }
    this.setState({passes: passes})
    
    }
}

function updateTimelinePasses(tle) {
      if(typeof this !== "undefined"){
    var qth = getGS()
    var passes = []
    var qth = [qth.latitude, qth.longitude, qth.altitude]
    //var tle = '0 LEMUR-2 JEROEN\n1 40934U 15052E   15306.10048119  .00001740  00000-0  15647-3 0  9990\n2 40934   6.0033 141.2190 0010344 133.6141 226.4604 14.76056230  5130'
    var date = new Date()
    var interval = new Date()
    interval = (interval).setDate(date.getDate() + 10)
    //console.log(new Date(interval))
    var tles = GetSelectedTles()
    
    var data = []
    var satNumber = 0
    for (var key in tles) {
        var tlestring = ""
        var tlearray = tles[key]
        tlestring = key + "\n" + tlearray[0] + "\n" + tlearray[1]
        var passesList = jspredict.transits(tlestring, qth, date.getTime(), interval, 0, 10)
        if(typeof passesList !== "undefined"){
        var oneSat = {}
        oneSat["orientation"] = "h"
        oneSat["type"] = "bar"
        oneSat["base"] = []
        oneSat["x"] = []
        oneSat["y"] = []
        passesList.map((value, idx) => {
        oneSat["base"].push(moment(value.start).format('YYYY-MM-DD HH:mm:ss'))
        oneSat["y"].push(satNumber)
        oneSat["x"].push(moment(value.end-value.start).utc().format('YYYY-MM-DD HH:mm:ss'))
        oneSat["name"] = key

    })}
    satNumber = satNumber + 1
    data.push(oneSat)
    
  }
    var range = [moment().format('YYYY-MM-DD HH:mm:ss'), moment().add(1, "days").format('YYYY-MM-DD HH:mm:ss')]
   //{type: 'bar', y: [1, 1, 1], x: [1, 2, 1], base: [0, 2, 5], orientation: "h"}
    this.setState({passes: passes, range: range, data:data})

    }
}

function msToHMS( ms ) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;


    return hours+" hrs "+minutes+" mins "+Math.round(seconds * 100)/100+" seconds";
}

function updateOSMorbit() {
    console.log("triggered OSM")
    var tleList = GetSelectedTles()
    var orbits = []
    if(tleList!=[])
    {
    for (var key in tleList) {
    var tlestring = ""
    var tlearray = tleList[key]
    tlestring = key + "\n" + tlearray[0] + "\n" + tlearray[1]
    var orbit = tlejs.getGroundTrackLatLng(tlestring, 50000, new Date())[1]
    if(typeof(orbit) == "undefined") {
      orbit = tlejs.getGroundTrackLatLng(tlestring, 50000, new Date())
    }
    orbits.push(orbit)
}
    this.setState({orbits: orbits})
}
}
/*export class EchoConsole extends React.Component{
  echo(text) {
    this.refs.console.log(text);
    this.refs.console.return();
  }
  render(){
    return (<Console ref="console"
            handler={this.echo}
            autofocus={true}
            />
            )
  }
}*/
function sec2dt(v) {
  var MIN = 60
  var HOUR = 60 * 60
  
  var h = Math.floor(v / HOUR)
  var m =  Math.floor((v - (h * HOUR)) / MIN)
  var s = Math.floor(v - (h * HOUR) - (m * MIN))

  // you have to provide YYYY-MM-DD
  // for plotly to understand it as a date
  return `${h}:${pad(m)}:${pad(s)}`
}

function pad(v) {
  return v < 10 ? '0' + v : String(v)
}

