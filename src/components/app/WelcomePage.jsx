import React from 'react';
import './WelcomePage.css';
import { NavLink } from 'react-router-dom';

export default function WelcomePage(props) {
  return (
    <div className="container">
      <div className="title-container">
        <h1>PlannerOwO</h1>
        <p>Revolutionizing the way of planning</p>
      </div>
      <div className="button-container">
        <ul className="list-group">
          <li className="list-group-item"><NavLink className="btn btn-primary" to="/register">Register</NavLink></li>
          <li className="list-group-item"><NavLink className="btn btn-secondary" to="/login">Login</NavLink></li>
        </ul>
      </div>
    </div>
  )
}
