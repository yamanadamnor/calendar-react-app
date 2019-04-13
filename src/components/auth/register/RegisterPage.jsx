import React from 'react';
import { animated } from 'react-spring/renderprops';

import RegisterForm from './RegisterForm';

export default class RegisterPage extends React.Component {
  handleSuccessResponse = (response) => {
    this.props.onLogin();
  }

  render() {
    return (
      <animated.div style={this.props.style} className="container">
        <div className="register-title">
          <h1>Register Account</h1>
        </div>
        <RegisterForm onSuccessResponse={this.handleSuccessResponse} />
      </animated.div>
    );
  }
}
