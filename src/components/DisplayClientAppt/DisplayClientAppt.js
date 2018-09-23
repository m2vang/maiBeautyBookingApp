import React, { Component } from 'react';
import { connect } from 'react-redux';
//Styling
import '../DisplayClientAppt/DisplayClientAppt.css';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');


class DisplayClientAppt extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{moment(this.props.clientAppt.start).format("MMM D YYYY")}</TableCell>
                <TableCell>{moment(this.props.clientAppt.start).format("hh:mm a")}</TableCell>
                <TableCell>{moment(this.props.clientAppt.end).format("hh:mm a")}</TableCell>
                <TableCell><Button size="small">Edit</Button><Button size="small" color="secondary">Cancel</Button></TableCell>
            </TableRow>
        )
    }
}

export default connect()(DisplayClientAppt);
