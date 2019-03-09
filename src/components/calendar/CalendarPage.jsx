import React from 'react';
import { Calendar, Alert, Badge } from 'antd';
import moment from 'moment';

import EventModal from './EventModal';
import './CalendarPage.css';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      selectedValue: moment(),
      modalVisible: false,
    }
  }

  handleSelect = (selectedValue) => {
    this.setState({
      selectedValue,
      modalVisible: true,
    });
    console.log(this.state);
  }

  handlePanelChange = (selectedValue) => {
    this.setState({ selectedValue });
  }

  handleVisibleModalChange = (visible) => {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { selectedValue, value, modalVisible } = this.state;
    return (
      <div>
        <Alert message={`You selected date: ${value.format("dddd Do MMM")}`} />
        <Calendar
          dateCellRender={dateCellRender}
          value={selectedValue}
          onSelect={this.handleSelect}
          onPanelChange={this.handlePanelChange}
        />
        <EventModal 
          date={selectedValue}
          visible={modalVisible}
          onVisibleChange={this.handleVisibleModalChange}
        />
      </div>
    );
  }
}

function dateCellRender(value) {
  const lmao = [
    { name: 'lmao1', desc: 'desc1' },
    { name: 'lmao2', desc: 'desc2' },
  ];
  
  return (
    <ul className="events-calendar">
      {
        lmao.map(item => (
          <li key={item.name}>
            <Badge status="success" text={item.name} />
          </li>
        ))
      }
    </ul>
  )
}
