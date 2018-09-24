import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class DisplayClientNotes extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.notes.notes}</TableCell>
                <TableCell><button>Delete</button></TableCell>
            </TableRow>
        )
    }
}

export default connect()(DisplayClientNotes);