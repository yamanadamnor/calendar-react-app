import React from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="my-3">Sign in</h2>
        <LoginForm />
      </div>
    );
  }

}
