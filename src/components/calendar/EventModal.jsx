import React from 'react';
import { Modal } from 'antd';

export default class EventModal extends React.Component {
  componentDidUpdate(prevProps) {
    // // Prevent infinite loop
    // if (prevProps.visible !== this.props.visible) {
    //   this.setState({
    //     visible: this.props.visible,
    //   })
    // }
  }

  handleOk = (e) => {
  }

  handleCancel = (e) => {
  }

  handleVisibleChange = (visible) => {
    this.props.onVisibleChange(visible);
  }

  renderEvents() {
    // if not empty
    if (this.props.events) {
      return (
        this.props.events.map(event => (
          <li key={event.name}>
            {event.name} - {event.description}
          </li>
        ))
      );
    } 
    return null;
  }


  render() {
    return (
      <Modal
        title={this.props.date.format("dddd Do MMM")}
        visible={this.props.visible}
        onOk={() => this.handleVisibleChange(false)}
        onCancel={() => this.handleVisibleChange(false)}
      >
        <ul className="modal-events">
          {this.renderEvents()}
        </ul>
      </Modal>
    );
  }
}
