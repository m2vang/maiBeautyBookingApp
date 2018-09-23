import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
const moment = require('moment');

class DisplayReminder extends Component {
    render() {
        return (
            <tr>
                <TableCell>{this.props.appts.category}</TableCell>
                <TableCell>{this.props.appts.service_name}</TableCell>
                <TableCell>{this.props.appts.duration} hour</TableCell>
                <TableCell>{moment(this.props.appts.start).format("MMM Do YYYY")}</TableCell>
                <TableCell>{moment(this.props.appts.start).format("h:mm a")}</TableCell>
            </tr>
        ) //end of return
    } //end of render
} //end of DisplayReminder

export default connect()(DisplayReminder);