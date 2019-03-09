import React from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group-v2';

import * as account from '../../api/account/account';
import WelcomePage from '../app/WelcomePage';
import RegisterPage from '../auth/register/RegisterPage';
import LoginPage from '../auth/login/LoginPage';
import CalendarPage from '../calendar/CalendarPage';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    }
  }

  async componentDidMount() {
    let check = await account.validateLoggedIn();
    this.setState({ loggedIn: check });
  }

  handleLogin = (loggedIn) => {
    this.setState(loggedIn)
  }

  render() {
    return (
      <BrowserRouter>
        <RouteContainer loggedIn={this.state.loggedIn} handleLogin={this.handleLogin} />
      </BrowserRouter>
    );
  }
}

const RouteContainer = withRouter((props) => {
  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames={'fade'}
        >
          <div className="route-wrapper">
            <Switch location={props.location}>
              <Route exact path="/" component={props.loggedIn ? CalendarPage : WelcomePage} />
              <Route path="/register" render={() => <RegisterPage onLogin={props.handleLogin} />} />
              <Route path="/login" render={() => <LoginPage onLogin={props.handleLogin} />} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
});
