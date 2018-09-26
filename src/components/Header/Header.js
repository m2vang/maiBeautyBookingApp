import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import '../Header/Header.css';

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
            <button onClick={this.logout}>
              Log Out
            </button>
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

}

export default connect(mapStateToProps)(Header);
