import React from 'react';
import RegisterForm from './RegisterForm';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Register Account</h1>
        <RegisterForm />
      </div>
    );
  }
}
