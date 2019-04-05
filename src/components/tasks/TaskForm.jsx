import React from 'react';
import { Form, Input, InputNumber, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

class TaskForm extends React.Component {
  createMoment = (dateStr) => {
    const d = new Date(dateStr);
    return moment(d);
  }

  disabledDeadlineDate = endValue => {
    return endValue.valueOf() <= moment().valueOf();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const name = this.props.mode === "update" ? this.props.task.name : "";
    const description = this.props.mode === "update" ? this.props.task.description : "";
    const deadline = this.props.mode === "update" ? 
      this.createMoment(this.props.task.deadline) : null;
    const hours = this.props.mode === "update" ? this.props.task.hours : null;

    return (
      <Form id="task-form">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{ max: 100, message: 'Name cannot be more than 100 characters!' }],
          })(
            <Input type="text" placeholder="Input a name" />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: description,
            rules: [{ max: 200, message: 'Description cannot be more than 200 characters!' }],
          })(
            <Input.TextArea rows={4} placeholder="Input a description" />
          )}
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item label="Deadline">
              {getFieldDecorator('deadline', {
                initialValue: deadline,
              })(
                <DatePicker 
                  disabledDate={this.disabledDeadlineDate}
                  placeholder="Select deadline date"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item label="Total hours">
              {getFieldDecorator('hours', {
                initialValue: hours,
              })(
                <InputNumber min={1} placeholder="Input hours" />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default TaskForm = Form.create({})(TaskForm);
