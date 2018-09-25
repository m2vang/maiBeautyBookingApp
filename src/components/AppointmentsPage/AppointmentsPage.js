import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';
import DisplayAppointment from '../DisplayAppointment/DisplayAppointment';
//Material Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => ({
    user: state.user,
}); // end of mapStateToProps

class AppointmentsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pastApptList: [],
            upcomingApptList: [],
        };
    } //end of constructor
    
    componentDidMount() {
        this.getPastAppointments();
        this.getUpcomingAppointments();
    } //end of componentDidMount

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
        } //end of if statement
    } //end of componentDidUpdate()

    getPastAppointments() {
        axios.get('/api/user/clientPastAppt/')
            .then((response) => {
                console.log('back from DB with:', response.data);
                this.setState({
                    pastApptList: response.data
                })
            }).catch((error) => {
                console.log('Error in getApptReminder', error);
                alert('Cannot get past appts!');
            }) //end of axios
    } //end of getPastApptReminder()

    getUpcomingAppointments() {
        axios.get('/api/user/upcomingReminder/')
            .then((response) => {
                console.log('back from DB with:', response.data);
                this.setState({
                    upcomingApptList: response.data
                })
            }).catch((error) => {
                console.log('Error in getApptReminder', error);
                alert('Cannot get upcoming appts!');
            }) //end of axios
    } //end of getUpcomingApptReminder()

    render() {
        let upcomingContent = null;
        let pastContent = null;

        //this will render the client's past appts
        if (this.props.user.email) {
            pastContent = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Service Type</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.pastApptList.map((apptsAtIndex, index) => {
                            return (
                                <DisplayAppointment key={index} appts={apptsAtIndex} />
                            )
                        })
                        }
                    </TableBody>
                </Table>
            ) //end of content
        } //end of if statement

        //this will render the client's upcoming appts
        if (this.props.user.email) {
            upcomingContent = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Service Type</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.upcomingApptList.map((apptsAtIndex, index) => {
                            return (
                                <DisplayAppointment key={index} appts={apptsAtIndex} />
                            )
                        })
                        }
                    </TableBody>
                </Table>
            ) //end of content
        } //end of if statement
        return (
            <div>
                <Nav />
                <h2>Upcoming Appointments</h2>
                { upcomingContent }
                <h2>Past Appointments</h2>
                { pastContent }
            </div>
        ) //end of return
    } //end of render
} //end of AppointmentsPage class

export default connect(mapStateToProps)(AppointmentsPage);