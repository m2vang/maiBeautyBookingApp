import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  user: state.user,
});

class Nav extends Component {
  render() {
    let content = null;
    
    if (this.props.user && this.props.user.if_stylist === false) {
      content = (
        <div className="navbar">
          <div>
            <ul>
              <li>
                <Link to="/user"> Home </Link>
              </li>
              <li>
                <Link to="/info"> My Profile </Link>
              </li>
              <li>
                <Link to="/bookappt"> Book an Appointment </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    } else if (this.props.user && this.props.user.if_stylist === true ){
      content = (
        <div className="navbar">
          <div>
            <ul>
              <li>
                <Link to="/info"> My Profile </Link>
              </li>
              <li>
                <Link to="/calendar"> Calendar </Link>
              </li>
              <li>
                <Link to="/clients"> Clients </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
};

export default connect(mapStateToProps)(Nav);
