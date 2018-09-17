import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          <p>First Name: {this.props.user.first_name}</p>
          <p>Last Name: {this.props.user.last_name}</p>
          <p>Telephone: {this.props.user.telephone}</p>
          <p>Email: {this.props.user.email}</p>
          <button>Edit</button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
