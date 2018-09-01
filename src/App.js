import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Select, Tabs} from 'antd';
import {SatelliteSelect, OSM, Passes, Location, Radar, Timeline} from "./componentLib"
const TabPane = Tabs.TabPane;
class App extends Component {

  render() {
    //const Option = Select.Option
    return (
      <div className="App">
          <h1 className="App-title">Mission Control Center</h1>
             
            <SatelliteSelect></SatelliteSelect>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="Satellite Map" key="1">
                    <OSM></OSM>
              </TabPane>
              <TabPane tab="Polar View" key="2">
                  <Radar/>
              </TabPane>
              <TabPane tab="Timeline" key="3" forceRender={true}>
              <Timeline/>
              </TabPane>

              <TabPane tab="Upcoming Passes" key="4" forceRender={true}>
              <Passes/>
              </TabPane>
              <TabPane tab="Ground Stations" key="5">GroundStation Configuration</TabPane>
            </Tabs>
            <Location/>
            <br/>
            
            


    <div className='Edge'>
    </div>
    <div className='VariableInput'>
    </div>
<div>
<br/>
</div>
      </div>
    );
  }
}

export default App;
