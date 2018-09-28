import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
//Styling
import '../DisplayClientAppt/DisplayClientAppt.css';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');

class DisplayClientAppt extends Component {

    cancelAppt = (id) => {
        swal("Appointment Cancelled!", "You've cancelled the appointment!", "success");
        let date = new Date();
        axios({
            method: 'PUT',
            url: '/api/user/cancelAppt/' + id,
            data: {date: date}
        }).then((response) => {
            this.props.getClients(id);
        }).catch((error) => {
            console.log('error in cancelAppt', error);
        });
    } //end of cancelAppt

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.clientAppt.service_name}</TableCell>
                <TableCell>{moment(this.props.clientAppt.start).format("MMM D YYYY")}</TableCell>
                <TableCell>{moment(this.props.clientAppt.start).format("hh:mm a")}</TableCell>
                <TableCell>{moment(this.props.clientAppt.end).format("hh:mm a")}</TableCell>
                <TableCell><Button size="small" color="secondary" onClick={() => this.cancelAppt(this.props.clientAppt.id)}>Cancel</Button></TableCell>
            </TableRow>
        ) //end of return
    } //end of render
} //end of DisplayClientAppt class

export default connect()(DisplayClientAppt);
