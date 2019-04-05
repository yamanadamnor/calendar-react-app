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

  handleDelete = (item) => {
    this.props.onDelete(item);
    this.handleVisibility(false);
  }

  render() {
    // TODO: popover currently doesnt hide when confirm button is clicked
    const popoverContent = (item) => (
      <Button 
        type="danger" 
        onClick={() => this.handleDelete(item)} 
        disabled={!this.state.visible}
        block>
        Confirm
      </Button>
    );

    return(
      <Popover
        content={popoverContent(this.props.item)}
        title={`Are you sure you want to delete '${this.props.item.name}'?`}
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
