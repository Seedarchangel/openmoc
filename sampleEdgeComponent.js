import React, { Component,View } from 'react';
import { Select } from 'antd';
import logo from './logo.svg';
import 'antd/dist/antd.css';
//import Combobox from 'react-widgets'
import {Combobox} from 'react-widgets';
import { Input } from 'antd';
import { InputNumber } from 'antd';
import { Upload, message, Button, Icon } from 'antd';

export default class EdgeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      edge: [{ name: '' }],
      guard: [{ name: '' }],
      reset: [{ name: '' }]

    };
  }

  // ...

  handleEdgeNameChange = (idx) => (evt) => {
    const newShareholders = this.state.edge.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ edge: newShareholders });
  }
/*
  handleSubmit = (evt) => {
    const { name, edge } = this.state;
    alert(`Incorporated: ${name} with ${edge.length} shareholders`);
  }*/

  handleAddEdge = () => {
    this.setState({
      edge: this.state.edge.concat([{ name: '' }]),
      guard: this.state.guard.concat([{ name: '' }]),
      reset: this.state.reset.concat([{ name: '' }])
    });
  }

  

  handleRemoveEdge = (idx) => () => {
    this.setState({
      edge: this.state.edge.filter((s, sidx) => idx !== sidx),
      guard: this.state.guard.filter((s, sidx) => idx !== sidx),
      reset: this.state.reset.filter((s, sidx) => idx !== sidx),
    });
  }



  render() {
    return (
      <div>
        {/* ... */}
        <label>Edge: </label>
        <Button type="button" onClick={this.handleAddEdge} className="small">Add Edge</Button>
        <br/>
        {this.state.edge.map((shareholder, idx) => (
          <view 
                /*style={{display:"inline-block",
                        width:"12%"
                }}*/
          >
            <Input
              style={{width:"10%",
              }}
              type="text"
              value={shareholder.name}
              onChange={this.handleEdgeNameChange(idx)}
            />
            <Button type="button" onClick={this.handleRemoveEdge(idx)} className="small">
            <Icon type="delete"/>
            </Button>
            {"   "}
          </view>


        ))}
        <br/>
        <label>Guard: </label>
        <br/>
        {this.state.guard.map((shareholder, idx) => (
          <view 
                /*style={{display:"inline-block",
                        width:"12%"
                }}*/
          >
            <Input
              style={{width:"10%",
              }}
              type="text"
              value={shareholder.name}
              onChange={this.handleEdgeNameChange(idx)}
            />
            {"   "}
          </view>

          
        ))}
        <br/>
        <label>Reset: </label>
        <br/>
        {this.state.reset.map((shareholder, idx) => (
          <view 
                /*style={{display:"inline-block",
                        width:"12%"
                }}*/
          >
            <Input
              style={{width:"10%",
              }}
              type="text"
              value={shareholder.name}
              onChange={this.handleEdgeNameChange(idx)}
            />
            {"   "}
          </view>

          
        ))}

        
      </div>
    )
  }
}