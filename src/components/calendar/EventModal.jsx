import React from 'react';
import { Form, Input, Modal, List, Button } from 'antd';
import moment from 'moment';

import EventForm from './EventForm';

export default class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false, 
      editingEvent: moment(),
    }
  }

  handleOk = e => {
    // TODO: handle save, send post request with changed values
    this.setState({
      editing: false,
    });
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
    })
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
      />;
    const footer = [
      <Button key="back" onClick={this.handleBack}>Go Back</Button>,
      <Button 
        form="event-form"
        key="submit"
        type="primary"
        onClick={this.handleOk}
        htmlType="submit"
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
