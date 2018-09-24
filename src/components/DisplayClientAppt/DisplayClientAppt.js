import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//Styling
import '../DisplayClientAppt/DisplayClientAppt.css';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');

class DisplayClientAppt extends Component {

    cancelAppt = (id) => {
        console.log('in cancelAppt', id);
        axios.put('/api/user/cancelAppt/' + id)
            .then((response) => {
                this.props.getClientAppt();
            }).catch((error) => {
                console.log('error in cancelAppt', error);
                
            })
    } //end of cancelAppt

    render() {
        return (
            <TableRow>
                <TableCell>{moment(this.props.clientAppt.start).format("MMM D YYYY")}</TableCell>
                <TableCell>{moment(this.props.clientAppt.start).format("hh:mm a")}</TableCell>
                <TableCell>{moment(this.props.clientAppt.end).format("hh:mm a")}</TableCell>
                <TableCell><Button size="small" onClick={this.editAppt}>Edit</Button><Button size="small" color="secondary" onClick={()=>this.cancelAppt(this.props.clientAppt.id)}>Cancel</Button></TableCell>
            </TableRow>
        ) //end of return
    } //end of render
} //end of DisplayClientAppt class

export default connect()(DisplayClientAppt);
