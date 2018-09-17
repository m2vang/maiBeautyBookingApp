import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            Home
          </Link>
        </li>
        <li>
          <Link to="/info">
            My Profile
          </Link>
        </li>
        <li>
          <Link to="/bookappt">
            Book an Appointment
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
