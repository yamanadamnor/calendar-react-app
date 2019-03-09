import React from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';

import * as account from '../../../api/account/account';
import history from '../../history'; 
import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: "", 
    }
  }

  handleLinkClick = (endpoint) => {
    history.push(endpoint);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let acc = {
          "email": values.email,
          "password": values.password,
        }
        account.loginAccount(acc).then((response) => {
          if (response.error) {
            console.log(response.error);
            this.setState({
              responseError: response.error
            });
          } else {
            this.props.onSuccessResponse(response);
          }
        })
      }
    });
  }

  // TODO: Add register and forgot password links
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          validateStatus={this.state.responseError ? "error" : ""}
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={this.state.responseError ? "error" : ""}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input type="password" placeholder="Password" />
          )}
        </Form.Item>

        {this.state.responseError ? 
          <Alert message={this.state.responseError} type="error" /> : null}

        <Form.Item>
          <div className="remember-forgot-container"> 
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="#">Forgot password</a>
          </div>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <span>Or </span> 
          <a href="/register" onClick={(e) => {
            e.preventDefault();
            this.handleLinkClick('/register');
          }}>register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'login' })(LoginForm);
