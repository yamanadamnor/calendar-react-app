import React from 'react';
import { Modal } from 'antd';

export default class EventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    }
  }

  componentDidUpdate(prevProps) {
    // Prevent infinite loop
    if (prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible,
      })
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <Modal
        title={this.props.date.format("dddd Do MMM")}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      />
    );
  }
}
