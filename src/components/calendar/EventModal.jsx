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

  showModal = () => {
  }

  handleOk = (e) => {
  }

  handleCancel = (e) => {
  }

  handleVisibleChange = (visible) => {
    this.props.onVisibleChange(visible);
  }


  render() {
    return (
      <Modal
        title={this.props.date.format("dddd Do MMM")}
        visible={this.props.visible}
        onOk={() => this.handleVisibleChange(false)}
        onCancel={() => this.handleVisibleChange(false)}
      />
    );
  }
}
