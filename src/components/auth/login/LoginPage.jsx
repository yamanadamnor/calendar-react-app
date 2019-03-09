import React from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  handleSuccessResponse = (response) => {
    this.props.onLogin(true);
  }

  render() {
    return (
      <div className="container">
        <h1>Sign in</h1>
        <LoginForm onSuccessResponse={this.handleSuccessResponse} />
      </div>
    );
  }

}
