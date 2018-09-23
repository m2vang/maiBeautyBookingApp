import React, { Component } from 'react';
import { connect } from 'react-redux';
//Styling
import '../DisplayClientAppt/DisplayClientAppt.css';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');


class DisplayPastClientAppt extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{moment(this.props.clientPastAppt.start).format("MMM D YYYY")}</TableCell>
                <TableCell>{moment(this.props.clientPastAppt.start).format("hh:mm a")}</TableCell>
                <TableCell>{moment(this.props.clientPastAppt.end).format("hh:mm a")}</TableCell>
            </TableRow>
        )
    }
}

export default connect()(DisplayPastClientAppt);