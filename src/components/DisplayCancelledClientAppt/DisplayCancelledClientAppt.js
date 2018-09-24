import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
const moment = require('moment');

class DisplayCancelledClientAppt extends Component {

    render() {
        return (
            <TableRow>
                <TableCell>{moment(this.props.clientCancelAppt.cancel_date).format("MMM D YYYY")}</TableCell>
                <TableCell>{this.props.clientCancelAppt.service_name}</TableCell>
                <TableCell>{moment(this.props.clientCancelAppt.start).format("MMM D YYYY")}</TableCell>
                <TableCell>{moment(this.props.clientCancelAppt.start).format("hh:mm a")}</TableCell>
                <TableCell>{moment(this.props.clientCancelAppt.end).format("hh:mm a")}</TableCell>
            </TableRow>
        ) //end of return
    } //end of render
} //end of DisplayClientAppt class

export default connect()(DisplayCancelledClientAppt);