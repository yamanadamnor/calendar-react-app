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

  onSelect = (selectedValue) => {
    this.setState({
      selectedValue,
      modalVisible: true,
    });
  }

  onPanelChange = (selectedValue) => {
    this.setState({ selectedValue });
  }

  render() {
    const { selectedValue, value, modalVisible } = this.state;
    return (
      <div>
        <Alert message={`You selected date: ${value.format("dddd Do MMM")}`} />
        <Calendar
          dateCellRender={dateCellRender}
          value={selectedValue}
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}
        />
        <EventModal date={selectedValue} visible={modalVisible} />
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
