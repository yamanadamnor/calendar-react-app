import React from 'react';
import RegisterPage from 'components/auth/register/RegisterPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  render() {
    return (
      <RegisterPage />
    );
  }
}
