import React, { Component } from 'react';
import axios from 'axios';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';
import DisplayReminder from '../DisplayReminder/DisplayReminder';

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

export default AppointmentsPage;