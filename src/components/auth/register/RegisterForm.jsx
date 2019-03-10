import React from 'react';
import { Form, Input, Button } from 'antd';

import * as account from '../../../api/account/account';
import './RegisterForm.css';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      emailStatus: "",
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let acc = {
          "email": values.email,
          "password": values.password,
        }
        account.createAccount(acc).then((response) => {
          if (response.error) {
            this.setState({
              emailStatus: response.error
            });
          } else {
            this.props.onSuccessResponse(response);
          }
        });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !! value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The entered passwords do not match!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form className="register-form" onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label="E-mail"
          validateStatus={this.state.emailStatus ? "error" : ""}
          help={this.state.emailStatus || ""}
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'Not a valid e-mail!',
            }, {
              required: true, message: 'Please input your e-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'register' })(RegisterForm);
