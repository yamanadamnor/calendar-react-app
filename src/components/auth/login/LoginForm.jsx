import React from 'react';
import * as account from 'api/account/account';


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    account.loginAccount(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input className="form-control" type="text" value={this.state.email} onChange={this.handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input className="form-control" type="password" value={this.state.password} onChange={this.handlePassChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }

}
