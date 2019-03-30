import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group-v2';

import * as account from '../../api/account/account';
import WelcomePage from '../app/WelcomePage';
import RegisterPage from '../auth/register/RegisterPage';
import LoginPage from '../auth/login/LoginPage';
import CalendarPage from '../calendar/CalendarPage';
import history from '../history';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  async componentDidMount() {
    let check = await account.validateLoggedIn();
    this.setState({ loggedIn: check });
  }

  handleLogin = () => {
    this.setState({
      loggedIn: true,
    });
    history.push('/');
  }

  handleLogout= () => {
    this.setState({
      loggedIn: false,
    });
    history.push('/');
  }

  render() {
    return (
      <Router history={history}>
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <div className="route-wrapper">
                <Switch location={location}>
                  <Route exact path="/" render={() => this.state.loggedIn ? 
                      <CalendarPage onLogout={this.handleLogout} /> : <WelcomePage />} />
                  <Route path="/register" render={() => <RegisterPage onLogin={this.handleLogin} />} />
                  <Route path="/login" render={() => <LoginPage onLogin={this.handleLogin} />} />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </Router>
    );
  }
}
