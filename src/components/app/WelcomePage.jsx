import React from 'react';
import './WelcomePage.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';


export default function WelcomePage(props) {
  return (
    <div className="container">
      <div className="title-container">
        <h1>PlannerOwO</h1>
        <p>Revolutionizing the way of planning</p>
      </div>
      <div className="button-container">
        <Button className="btn-custom" type="primary"><NavLink to="/register">Register</NavLink></Button>
        <Button className="btn-custom" type="default"><NavLink to="/login">Login</NavLink></Button>
      </div>
    </div>
  )
}
