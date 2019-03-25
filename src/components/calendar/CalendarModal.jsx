import React from 'react';
import { Form, Input, Modal, List, Button, 
  message, Popover } from 'antd';
import moment from 'moment';

import EventForm from './EventForm';
import * as calendar from '../../api/calendar/calendar';

export default class CalendarModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingEvent: moment(),
      buttonLoading: false,
    }
  }

  handleCancel = e => {
    // Hide the modal
    this.props.onVisibleChange(false);
  }

  handleBack = e => {
    // Change mode back to list
    this.props.onModeChange("list");
  }

  renderModalTitle = (start, end, title) => {
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
    // Change modal mode to editing 
    this.props.onModeChange("update");
    this.setState({
      editingEvent: event,
    });
  }

  saveEventFormRef = (eventFormRef) => {
    this.eventFormRef = eventFormRef;
  }

  // TODO: modify to work with both creating and updating (using props?)
  // Handles submit child form
  handleOk = () => {
    const form = this.eventFormRef.props.form; 
    const event = this.eventFormRef.props.event;

    this.setState({ buttonLoading: true });
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values.starts_at = values.starts_at_date.set({
        hour: values.starts_at_time.get('hour'),
        minute: values.starts_at_time.get('minute'),
      });

      values.ends_at = values.ends_at_date.set({
        hour: values.ends_at_time.get('hour'),
        minute: values.ends_at_time.get('minute'),
      });

      if (this.props.mode === "update") {
        calendar.updateEvent(event.id, values)
          .then(
            this.setState({ buttonLoading: false }),

            // Hides the modal
            this.props.onVisibleChange(false),

            // Refreshes the calendar
            this.props.onEventUpdate(),

            message.success(`Successfully updated event '${event.name}'!`)
          );
      } else {
        calendar.createEvent(values)
          .then(
            this.setState({ buttonLoading: false }),

            // Hides the modal
            this.props.onVisibleChange(false),

            // Refreshes the calendar
            this.props.onEventUpdate(),

            message.success(`Successfully created event '${values.name}'!`)
          );
      }
    });
  }

  handleDelete = (event) => {
    calendar.deleteEvent(event.id)
      .then(
        // Hides the modal
        this.props.onVisibleChange(false),

        // Refreshes the calendar
        this.props.onEventUpdate(),

        message.success(`Successfully deleted event '${event.name}'!`)
      );
  }

  renderEventList() {
    // TODO: popover currently doesnt hide when confirm button is clicked
    const popoverContent = (event) => (
      <Button type="danger" onClick={() => this.handleDelete(event)} block>
        Confirm
      </Button>
    );

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
                />,
                <Popover
                  content={popoverContent(event)}
                  title={`Are you sure you want to delete '${event.name}'?`}
                  trigger="click"
                >
                  <Button 
                    type="danger"
                    shape="circle"
                    icon="delete"
                  />
                </Popover>
              ]}
            >
              <List.Item.Meta
                title={this.renderModalTitle(event.starts_at, event.ends_at, event.name)}
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
        mode={this.props.mode}
        wrappedComponentRef={this.saveEventFormRef}
      />;
    const editFooter = [
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

    const createFooter = [
      <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
      <Button 
        form="event-form"
        key="submit"
        type="primary"
        onClick={this.handleOk}
      >
        Create
      </Button>,
    ]

    return (
      <Modal
        title={this.props.mode === "create" ? "Create new event" 
            : this.props.date.format("dddd Do MMM")}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={this.props.mode === "update" ? editFooter : 
            this.props.mode === "create" ? createFooter : null}
      >
        {this.props.mode === "list" ? this.renderEventList() : eventForm}
      </Modal>
    );
  }
}
