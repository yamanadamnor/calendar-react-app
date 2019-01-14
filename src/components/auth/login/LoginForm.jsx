import React from 'react';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';

import * as account from 'api/account/account';
import './LoginForm.css';

class LoginForm extends React.Component {
  // TODO: Fix handlesubmit function
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  // TODO: Add register and forgot password links
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <div className="remember-forgot-container"> 
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
          </div>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <span>Or</span> <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'login' })(LoginForm);
