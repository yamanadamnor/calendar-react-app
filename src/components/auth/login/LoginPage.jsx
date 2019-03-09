import React from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Sign in</h1>
        <LoginForm onLogin={this.props.onLogin} />
      </div>
    );
  }

}
