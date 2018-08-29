import React from 'react';
import 'antd/dist/antd.css';
//import Combobox from 'react-widgets'
import { Input } from 'antd';
import { Button, Icon } from 'antd';

export default class VariableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shareholders: [{ name: '' }],
      initialLeft: [{name: ''}],
      initialRight: [{name: ''}]
    };
  }


  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  }

  handleLeftNameChange = (idx) => (evt) => {
    const newShareholders = this.state.initialLeft.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ initialLeft: newShareholders });
  }

  handleRightNameChange = (idx) => (evt) => {
    const newShareholders = this.state.initialRight.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ initialRight: newShareholders });
  }

  handleSubmit = (evt) => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  }

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: '' }]),
      initialLeft: this.state.initialLeft.concat([{ name: '' }]),
      initialRight: this.state.initialRight.concat([{ name: '' }]),
      
    });
  }

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx),
      initialLeft: this.state.initialLeft.filter((s, sidx) => idx !== sidx),
      initialRight: this.state.initialRight.filter((s, sidx) => idx !== sidx)

    });
  }

  render() {
    return (
      <div>
        {/* ... */}
        <label>
          Variable:
        </label>
        <Button type="button" onClick={this.handleAddShareholder} className="small">Add Variable</Button>
        <br/>
        {this.state.shareholders.map((shareholder, idx) => (
          <view >
            <Input
              style={{width:"10%",
              }}
              type="text"
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <Button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">
              <Icon type="delete"/>
            </Button>
            {"   "}
          </view>
        ))}
        <br/>
          <label>
            Initial Set:
          </label>
        <br/>
         {this.state.shareholders.map((shareholder, idx) => (
          <view>
            <Input
              style={{width:"5.6%",
              }}
              type="text"
              value={this.state.initialLeft[idx].name}
              onChange={this.handleLeftNameChange(idx)}
            />
              <label>
                {"  <  "+shareholder.name+"  <  "}
              </label>
            <Input
              style={{width:"5.6%",
              }}
              type="text"
              value={this.state.initialRight[idx].name}
              onChange={this.handleRightNameChange(idx)}
            />
            {"   "}
          </view>
        ))}
      </div>
    )
  }
}