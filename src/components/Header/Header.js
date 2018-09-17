import React, { Component } from 'react';
import { connect } from 'react-redux';

import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
});

class Header extends Component {
  //logout() will log out the user once it's clicked
  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    return (
      <div className="instructions">
        <div>
          <h1 className="welcome">Welcome, {this.props.user.first_name}!</h1>
        </div>
        <div>
          <button onClick={this.logout}>
            Log Out
          </button>
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps)(Header);
