import React from 'react';
import { Button } from 'antd';
import { animated } from 'react-spring/renderprops';

import history from '../history'; 
import './WelcomePage.css';

export default class WelcomePage extends React.Component {
  handleLinkClick = (endpoint) => {
    history.push(endpoint);
  }

  render() {
    return (
      <animated.div style={this.props.style} className="container container-welcome">
        <div className="title-container">
          <h1 className="welcome">PlannerOwO</h1>
          <p className="welcome">Revolutionizing the way of planning</p>
        </div>
        <div className="button-container">
          <Button
            onClick={() => this.handleLinkClick('/register')} className="btn-custom" type="primary"
          >Register</Button>
          <Button 
            onClick={() => this.handleLinkClick('/login')} className="btn-custom" type="default"
          >Login</Button>
        </div>
      </animated.div>
    )
  }
}
