import React from 'react';

import RegisterForm from './RegisterForm';

export default class RegisterPage extends React.Component {
  handleSuccessResponse = (response) => {
    this.props.onLogin();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="register-title">
            <h1>Register Account</h1>
          </div>
          <RegisterForm onSuccessResponse={this.handleSuccessResponse} />
        </div>
      </div>
    );
  }
}
