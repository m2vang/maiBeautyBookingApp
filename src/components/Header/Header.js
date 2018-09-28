import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import '../Header/Header.css';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
});

class Header extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  } //end of componentDidMount

  //logout() will log out the user once it's clicked
  logout = () => {
    this.props.dispatch(triggerLogout());
  } //end of logout

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div className="instructions">
          <div>
            <h1 className="welcome">Welcome, {this.props.user.first_name}!</h1>
            <Button variant="outlined" color="secondary" onClick={this.logout}>
              Log Out
            </Button>
          </div>
        </div>
      )
    } else if (this.props.user.email === null) {
      content = (
        <div className="appName">
          <h1>Mai Beauty Booking App</h1>
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }

}

export default connect(mapStateToProps)(Header);
