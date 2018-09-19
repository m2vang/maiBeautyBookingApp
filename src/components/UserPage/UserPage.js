import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';
//Reducers
import { USER_ACTIONS } from '../../redux/actions/userActions';
//Component
import DisplayReminder from '../DisplayReminder/DisplayReminder';

const mapStateToProps = state => ({
  user: state.user,
}); // end of mapStateToProps

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: []
    }
  } //end of constructor

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getApptReminder();
  } //end of componentDidMount()

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    } //end of if
  } //end of componentDidUpdate()
  
  getApptReminder = () => {
    axios.get('/api/user/reminder/')
      .then((response) => {
        console.log('back from DB with:', response.data);
        const appt = response.data;
        this.setState({
          reminder: appt
        })
      }).catch((error) => {
        console.log('Error in getApptReminder', error);
        // alert('Cannot get appt!');
      }) //end of axios
  } //end of getApptReminder()

  render() {
    let content = null;

    if (this.props.user.email) {
      content = (
        <div>
          {this.state.reminder.map((item, i) => {
            return (
              <DisplayReminder key={i} itemData={item} />
            )
          })}
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
