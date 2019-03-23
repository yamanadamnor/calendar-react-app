import React from 'react';
import { Calendar, Badge, Button } from 'antd';
import moment from 'moment';

import CalendarModal from './CalendarModal';
import * as calendar from '../../api/calendar/calendar';
import './CalendarPage.css';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      modalVisible: false,
      modalMode: "", // should be either "update", "create" or "list", could prob use enum
      events: [],
    }
  }

  componentDidMount() {
    const d = new Date(), y = d.getFullYear(), m = d.getMonth();
    const from = new Date(y, m, 1);
    const to = new Date(y, m +1, 1);
    const events = calendar.getAllEventsInInterval(from, to);

    events.then(res => {
      // Empty events if the result is empty
      if (res === null) {
        return;
      }

      this.setState({
        events: convertEvents(res),
      });
    });
  }

  handleSelect = (selectedDate) => {
    this.setState({
      modalVisible: true,
      modalMode: "list",
    });
  }

  handleCreateClick = e => {
    this.setState({
      modalVisible: true,
      modalMode: "create",
    });
    e.currentTarget.blur();
  }

  // called when changing months/mode
  handlePanelChange = (date, mode) => {
    const d = date.toDate(), y = d.getFullYear(), m = d.getMonth();
    const from = new Date(y, m, 1);
    const to = new Date(y, m +1, 1);

    // all events between the first day and the last day of the
    // selected month
    const events = calendar.getAllEventsInInterval(from, to);

    events.then(res => {
      // Empty events if the result is empty
      if (res === null) {
        this.setState({
          events: [],
        });
        return;
      }

      this.setState({
        events: convertEvents(res),
      });
    });
  }

  // Refresh the calendar when an event is updated in a child modal/form
  handleEventUpdate = () => {
    const d = this.state.selectedDate.toDate(), y = d.getFullYear(), m = d.getMonth();
    const from = new Date(y, m, 1);
    const to = new Date(y, m +1, 1);

    // all events between the first day and the last day of the
    // selected month
    const events = calendar.getAllEventsInInterval(from, to);

    events.then(res => {
      // Empty events if the result is empty
      if (res === null) {
        this.setState({
          events: [],
        });
        return;
      }

      this.setState({
        events: convertEvents(res),
      });
    });
  }

  handleVisibleModalChange = (visible) => {
    this.setState({ modalVisible: visible })
  }

  handleChange = (date) => {
    this.setState({ selectedDate: date });
  }

  // TODO: calendar currently wont render days outside the current month
  // could change but low priority
  dateCellRender = (date) => {
    // Check if date is in the current month
    if (date.month() !== this.state.selectedDate.month()) {
      return;
    }
    const events = this.state.events[date.date()];

    // Check if events are fetched
    if (!events || !events.length) {
      return;
    }

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

  handleModalModeChange = mode => {
    this.setState({ modalMode: mode });
  }

  render() {
    const { events, selectedDate, value, modalVisible, modalMode } = this.state;
    return (
      <div>
        <Calendar
          dateCellRender={this.dateCellRender}
          value={selectedDate}
          onSelect={this.handleSelect}
          onPanelChange={this.handlePanelChange}
          onChange={this.handleChange}
        />
        <CalendarModal 
          date={selectedDate}
          events={events[selectedDate.date()]}
          visible={modalVisible}
          mode={modalMode}
          onModeChange={this.handleModalModeChange}
          onVisibleChange={this.handleVisibleModalChange}
          onEventUpdate={this.handleEventUpdate}
        />
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          size="large"
          className="create-event-btn-calendar"
          onClick={this.handleCreateClick}
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

  events.map(event => {
    const dateObj = new Date(event.starts_at);
    const momentObj = moment(dateObj);
    newEvents[momentObj.date()].push(event);
  });

  return newEvents;
}
