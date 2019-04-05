import React from 'react';
import { Form, Input, DatePicker, Row, Col } from 'antd';
import moment from 'moment';

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEnd: null,
    }
  }

  createMoment = (dateStr) => {
    const d = new Date(dateStr);
    return moment(d);
  }

  disabledEndDate = endValue => {
    if (this.state.selectedStart !== null) {
      return endValue.valueOf() <= this.state.selectedStart.valueOf();
    }
    return endValue.valueOf() <= moment().valueOf();
  }

  onEndChange = value => {
    this.setState({ selectedEnd: value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const name = this.props.mode === "update" ? this.props.event.name : "";
    const description = this.props.mode === "update" ? this.props.event.description : "";
    const ends_at = this.props.mode === "update" ? 
      this.createMoment(this.props.event.ends_at) : moment().add(1, 'hour');

    return (
      <Form id="task-form">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: name,
          })(
            <Input type="text" />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: description,
          })(
            <Input.TextArea rows={4} />
          )}
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('ends_at_date', {
                initialValue: ends_at,
                setFieldsValue: this.state.selectedEnd,
              })(
                <DatePicker 
                  disabledDate={this.disabledEndDate}
                  onChange={this.onEndChange}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item>
              {getFieldDecorator('ends_at_time', {
                initialValue: ends_at,
              })(
                <TimePicker
                  use12Hours
                  format={'h:mm A'}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default TaskForm = Form.create({})(TaskForm);
