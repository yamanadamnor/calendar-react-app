import React from 'react';
import { Form, Input } from 'antd';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("submitted:D");
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form id="event-form" onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: this.props.event.name,
          })(
            <Input type="text" />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: this.props.event.description,
          })(
            <Input.TextArea
              rows={4}
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default EventForm = Form.create({})(EventForm);
