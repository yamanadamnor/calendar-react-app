import React from 'react';
import { Form, Input } from 'antd';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Form>
        <Form.Item label="Name">
          <Input
            type="text"
            value={this.state.editingEvent.name}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            rows={4}
            value={this.state.editingEvent.description}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default EventForm = Form.create({})(EventForm);
