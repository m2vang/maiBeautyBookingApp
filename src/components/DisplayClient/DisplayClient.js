import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DisplayClientAppt from '../DisplayClientAppt/DisplayClientAppt.js';
import DisplayPastClientAppt from '../DisplayPastClientAppt/DisplayPastClientAppt.js';
//Styling
import '../DisplayClient/DisplayClient.css';
//Import Material Expansion Table
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
//Material Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const mapStateToProps = state => ({
    notes: state.notes,
});

class DisplayClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingClientAppts: [],
            pastClientAppts: [],
        };
    } //end of constructor
    componentDidMount() {
        this.getClientAppt();
        this.getClientPastAppt();
        this.getClientNotes();
    } //end of componentDidMount

    getClientAppt() {
        console.log(this.props.clientName.id)
        axios.get(`/api/user/adminClientAppt?user=${this.props.clientName.id}`)
            .then((response) => {
                console.log('appts:', response.data);
                this.setState({
                    upcomingClientAppts: response.data
                })
            }).catch((error) => {
                console.log('Error in getClientAppt', error);
                alert('Cannot get client appts!');
            }) //end of axios
    } //end of getClientAppt()

    getClientPastAppt() {
        console.log(this.props.clientName.id)
        axios.get(`/api/user/adminClientPastAppt?user=${this.props.clientName.id}`)
            .then((response) => {
                console.log('pastAppts:', response.data);
                this.setState({
                    pastClientAppts: response.data
                })
            }).catch((error) => {
                console.log('Error in getClientPastAppt', error);
                alert('Cannot get client past appts!');
            }) //end of axios
    } //end of getClientPastAppt()

    getClientNotes() {
        console.log(this.props.clientName.id)
        axios.get(`/api/user/clientNotes?user=${this.props.clientName.id}`)
            .then((response) => {
                const action = {type: 'FETCH_ADMIN_CLIENT_NOTES', payload:response.data};
                this.props.dispatch(action);
            }).catch((error) => {
                console.log('Error in getClientNotes', error);
                alert('Cannot get client notes!');
            }) //end of axios
    } //end of getClientNotes()

    removeNote = () => {
        const id = this.props.notes.id;
        console.log('in removeNote', id);
        axios({
            method: 'DELETE',
            url: '/api/user/clientNotes/' + id
        }).then((response) => {
            this.getClientNotes();
        }).catch((error) => {
            alert('Unable to delete feedback!');
            console.log('Error in remove', error);
        })
    }

    render() {
        return (
            <div>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div>
                            <h3>{this.props.clientName.first_name} {this.props.clientName.last_name}</h3>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="details">
                        <div>
                            <Typography>Profile:</Typography>
                        </div>
                        <div className="column" />
                        <div className="column">
                            <Typography className="title">Telephone:</Typography>
                            <Typography>{this.props.clientName.telephone}</Typography>
                        </div>
                        <div className="column">
                            <Typography className="title">Email:</Typography>
                            <Typography>{this.props.clientName.email}</Typography>
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Upcoming Appointments:
                                </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="details">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Start</TableCell>
                                        <TableCell>End</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.upcomingClientAppts.map((apptsAtIndex, index) => {
                                        return (
                                            <DisplayClientAppt key={index} clientAppt={apptsAtIndex}/>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Past Appointments:
                                </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="details">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Start</TableCell>
                                        <TableCell>End</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.pastClientAppts.map((pastApptsAtIndex, index) => {
                                        return (
                                            <DisplayPastClientAppt key={index} clientPastAppt={pastApptsAtIndex} />
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Notes:
                            </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="details">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.notes.clientNotes.map((notes) => {
                                        return (
                                            <TableRow key={notes.id}>
                                                <TableCell>{notes.notes}</TableCell>
                                                <TableCell><Button color="secondary" onClick={this.removeNote}>Delete<DeleteIcon /></Button></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <TextField
                                id="outlined-full-width"
                                label="New Note"
                                style={{ margin: 8 }}
                                placeholder=""
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <button>Add</button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </ExpansionPanel>
                <Divider />
            </div>
        ) //end of return
    } //end of render
} //end of DisplayClient

export default connect(mapStateToProps)(DisplayClient);