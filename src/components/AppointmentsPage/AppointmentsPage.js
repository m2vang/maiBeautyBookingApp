import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';
import DisplayReminder from '../DisplayReminder/DisplayReminder';


const mapStateToProps = state => ({
    user: state.user,
}); // end of mapStateToProps

class AppointmentsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apptList: [],
        };
    } //end of constructor

    componentDidMount() {
        this.getAppointments();
    } //end of componentDidMount

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
        } //end of if
    } //end of componentDidUpdate()

    getAppointments () {
        axios.get('/api/user/reminder/')
            .then((response) => {
                console.log('back from DB with:', response.data);
                this.setState({
                    apptList: response.data
                })
            }).catch((error) => {
                console.log('Error in getApptReminder', error);
                // alert('Cannot get appt!');
            }) //end of axios
    } //end of getApptReminder()

    render() {    
        return (
            <div>
                <Nav />
                {this.state.apptList.map((apptsAtIndex, index) => {
                    return (
                        <DisplayReminder key={index} appts={apptsAtIndex} />
                    )
                })
                }
            </div>
        ) //end of return
    } //end of render
} //end of AppointmentsPage class

export default connect(mapStateToProps)(AppointmentsPage);