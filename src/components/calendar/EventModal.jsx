import React from 'react';
import { Form, Input, Modal, List, Button, message } from 'antd';
import moment from 'moment';

import EventForm from './EventForm';
import * as calendar from '../../api/calendar/calendar';

export default class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false, 
      editingEvent: moment(),
    }
  }

  handleCancel = e => {
    // TODO: handle cancel, don't save and just close
    this.props.onVisibleChange(false);
    this.setState({
      editing: false,
    });
  }

  handleBack = e => {
    this.setState({
      editing: false,
    });
  }

  renderItemTitle = (start, end, title) => {
    // TODO: check time zone conversion between server and client
    const sd = new Date(start), ed = new Date(end);
    const s = moment(sd).format('LT'), e = moment(ed).format('LT');

    return (
      <div>
        <h3>{s} - {e}</h3>
        <h4>{title}</h4>
      </div>
    );
  }

  handleEditClick = event => {
    this.setState({
      editing: true,
      editingEvent: event,
    });
  }

  saveEventFormRef = (eventFormRef) => {
    this.eventFormRef = eventFormRef;
  }

  // Handles submit child form
  handleOk = () => {
    const form = this.eventFormRef.props.form; 
    const event = this.eventFormRef.props.event;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values.starts_at_time.get('hour'));

      values.starts_at = values.starts_at_date.set({
        hour: values.starts_at_time.get('hour'),
        minute: values.starts_at_time.get('minute'),
      })

      values.ends_at = values.ends_at_date.set({
        hour: values.ends_at_time.get('hour'),
        minute: values.ends_at_time.get('minute'),
      })

      calendar.updateEvent(event.id, values);

      // Hides the modal
      this.props.onVisibleChange(false);

      // Refreshes the calendar
      this.props.onEventUpdate();
      this.setState({
        editing: false,
      });

      message.success(`Successfully updated event '${event.name}'!`);
    });
  }

  renderEventList() {
    // if not empty
    if (this.props.events) {
      return (
        <List
          itemLayout="horizontal"
          dataSource={this.props.events} 
          renderItem={event => (
            <List.Item
              actions={[
                <Button 
                  type="primary"
                  shape="circle"
                  icon="edit"
                  onClick={() => this.handleEditClick(event)}
                />
              ]}
            >
              <List.Item.Meta
                // title={<ItemTitle start={event.starts_at} end={event.ends_at} />}
                title={this.renderItemTitle(event.starts_at, event.ends_at, event.name)}
                description={event.description}
              />
            </List.Item>
          )}
        />
      );
    } 
    return null;
  }

  render() {
    const eventForm = 
      <EventForm 
        event={this.state.editingEvent}
        wrappedComponentRef={this.saveEventFormRef}
      />;
    const footer = [
      <Button key="back" onClick={this.handleBack}>Go Back</Button>,
      <Button 
        form="event-form"
        key="submit"
        type="primary"
        onClick={this.handleOk}
      >
        Save
      </Button>,
    ];

    return (
      <Modal
        title={this.props.date.format("dddd Do MMM")}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={this.state.editing ? footer : null}
      >
        {this.state.editing ? eventForm : this.renderEventList()}
      </Modal>
    );
  }
}
