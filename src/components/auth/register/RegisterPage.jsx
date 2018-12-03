import React from 'react';
import RegisterForm from './RegisterForm';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="my-3">Register Account</h2>
        <RegisterForm />
      </div>
    );
  }
}
