import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';


const mapStateToProps = state => ({
  user: state.user,
});

class Nav extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.if_stylist === false) {
      content = (
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
      )
    } else {
      content = (
        <div className="navbar">
          <div>
            <ul>
              <li>
                <Link to="/info">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/calendar">
                  Calendar
                </Link>
              </li>
              <li>
                <Link to="/clients">
                  Clients
                </Link>
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
