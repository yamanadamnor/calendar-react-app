import React from 'react';
import { Form, Input, DatePicker, TimePicker, Row, Col } from 'antd';
import moment from 'moment';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStart: null,
      selectedEnd: null,
    }
  }

  createMoment = (dateStr) => {
    const d = new Date(dateStr);
    return moment(d);
  }

  disabledStartDate = startValue => {
    return startValue.valueOf() < moment().subtract(1, 'day').valueOf();
  }

  disabledEndDate = endValue => {
    if (this.state.selectedStart !== null) {
      return endValue.valueOf() <= this.state.selectedStart.valueOf();
    }
    return endValue.valueOf() <= moment().valueOf();
  }

  onStartChange = value => {
    this.setState({ selectedStart: value });
  }

  onEndChange = value => {
    this.setState({ selectedEnd: value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const name = this.props.mode === "update" ? this.props.event.name : "";
    const description = this.props.mode === "update" ? this.props.event.description : "";
    const starts_at = this.props.mode === "update" ? 
      this.createMoment(this.props.event.starts_at) : moment();
    const ends_at = this.props.mode === "update" ? 
      this.createMoment(this.props.event.ends_at) : moment().add(1, 'hour');

    return (
      <Form id="event-form">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{ max: 100, message: 'Name cannot be more than 100 characters!'}, 
              { required: true, message: 'Name cannot be empty!' }]
          })(
            <Input type="text" placeholder="Input a name" />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: description,
            rules: [{ max: 200, message: 'Description cannot be more than 200 characters!' }]
          })(
            <Input.TextArea rows={4} placeholder="Input a description" />
          )}
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('starts_at_date', {
                initialValue: starts_at,
                setFieldsValue: this.state.selectedStart,
                rules: [{ required: true, message: "Start date cannot be empty!" }]
              })(
                <DatePicker 
                  disabledDate={this.disabledStartDate}
                  onChange={this.onStartChange}
                />
            )}
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item>
              {getFieldDecorator('starts_at_time', {
                initialValue: starts_at,
                rules: [{ required: true, message: "Start time cannot be empty!" }]
              })(
                <TimePicker
                  use12Hours
                  format={'h:mm A'}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('ends_at_date', {
                initialValue: ends_at,
                setFieldsValue: this.state.selectedEnd,
                rules: [{ required: true, message: "End date cannot be empty!" }]
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
                rules: [{ required: true, message: "End time cannot be empty!" }]
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

export default EventForm = Form.create({})(EventForm);
