import React from 'react';
import { Popover, Button } from 'antd';

export default class DeletePopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,  
    }
  }

  handleVisibility = (visible) => {
    this.setState({ visible });
  }

  handleDelete = (event) => {
    this.props.onDelete(event);
    this.handleVisibility(false);
  }

  render() {
    // TODO: popover currently doesnt hide when confirm button is clicked
    const popoverContent = (event) => (
      <Button 
        type="danger" 
        onClick={() => this.handleDelete(event)} 
        disabled={!this.state.visible}
        block>
        Confirm
      </Button>
    );

    return(
      <Popover
        content={popoverContent(this.props.event)}
        title={`Are you sure you want to delete '${this.props.event.name}'?`}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibility}
      >
        <Button 
          type="danger"
          shape="circle"
          icon="delete"
          onClick={() => this.handleVisibility(true)}
        />
      </Popover>
    );
  }
}
