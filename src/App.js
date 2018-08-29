import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Select, Tabs} from 'antd';
import {SatelliteSelect, OSM, Passes, Location} from "./componentLib"
const TabPane = Tabs.TabPane;
class App extends Component {

  render() {
    //const Option = Select.Option
    return (
      <div className="App">
          <h1 className="App-title">Mission Control Center</h1>
             <Location/>
            <SatelliteSelect></SatelliteSelect>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Satellite Map" key="1">
                    <OSM></OSM>
              </TabPane>
              <TabPane tab="Satellite Globe" key="2">Satellite Globe</TabPane>
              
              <TabPane tab="Upcoming Passes" key="3" forceRender={true}>
              <Passes/>
              </TabPane>
              <TabPane tab="Ground Stations" key="4">GroundStation Configuration</TabPane>
            </Tabs>
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
