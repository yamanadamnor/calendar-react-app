import React from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';

import EventModal from './EventModal';
import * as calendar from '../../api/calendar/calendar';
import './CalendarPage.css';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: moment(),
      modalVisible: false,
      events: convertEvents(calendar.getAllEvents()),
    }
  }

  handleSelect = (selectedValue) => {
    this.setState({
      selectedValue,
      modalVisible: true,
    });
  }

  handlePanelChange = (selectedValue) => {
    this.setState({ selectedValue });
  }

  handleVisibleModalChange = (visible) => {
    this.setState({ modalVisible: visible })
  }

  dateCellRender = (date) => {
    // TODO: renders before this.state.events has received
    // all events from the api, fix
    const events = this.state.events[date.date()];

    return (
      <ul className="events-calendar">
        {
          events.map(event => (
            <li key={event.name}>
              <Badge status="success" text={event.name} />
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { selectedValue, value, modalVisible } = this.state;
    return (
      <div>
        <Calendar
          dateCellRender={this.dateCellRender}
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

function convertEvents(events) {
  let newEvents = {};
  for (var i = 1; i <= 31; i++) {
    newEvents[i] = [];
  }

  events.then(res => {
    res.map(event => {
      let dateObj = new Date(event.starts_at);
      let momentObj = moment(dateObj);
      let date = momentObj.date();
      newEvents[date].push(event);
    })
  });

  return newEvents;
}
