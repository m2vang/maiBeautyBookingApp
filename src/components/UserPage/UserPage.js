import React, { Component } from 'react';
import { connect } from 'react-redux';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';
//Reducers
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
}); // end of mapStateToProps

class UserPage extends Component {
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  } //end of componentDidMount()

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    } //end of if
  } //end of componentDidUpdate()
  
  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          <p>You have no current appointments!</p>
        </div>
      )
    }
    return (
      <div>
        <Nav />
        {content}
      </div>
    ); //end of return
  } //end of render
} //end of UserPage class

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
