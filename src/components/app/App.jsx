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

  render() {
    return (
      <BrowserRouter>
        <RouteContainer loggedIn={this.state.loggedIn} />
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
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
});
