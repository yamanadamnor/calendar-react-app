import React from 'react';
import { animated } from 'react-spring/renderprops';

import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  handleSuccessResponse = (response) => {
    this.props.onLogin(true);
  }

  render() {
    return (
      <animated.div style={this.props.style} className="container">
        <h1>Sign in</h1>
        <LoginForm onSuccessResponse={this.handleSuccessResponse} />
      </animated.div>
    );
  }

}
