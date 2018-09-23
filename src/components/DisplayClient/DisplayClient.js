import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DisplayClientAppt from '../DisplayClientAppt/DisplayClientAppt.js';
//Styling
import '../DisplayClient/DisplayClient.css';
//Import Material Expansion Table
import PropTypes from 'prop-types';
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

class DisplayClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientAppts: [],
        };
    } //end of constructor

    componentDidMount() {
        this.getClientAppt();
    } //end of componentDidMount

    getClientAppt() {
        console.log(this.props.clientName.id)
        axios.get(`/api/user/clientAppt?user=${this.props.clientName.id}`)
            .then((response) => {
                console.log('back from DB with:', response.data);
                this.setState({
                    clientAppts: response.data
                })
            }).catch((error) => {
                console.log('Error in getClientAppt', error);
                alert('Cannot get client appts!');
            }) //end of axios
    } //end of getClients()

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
                    <ExpansionPanelDetails className={PropTypes.details}>
                        <div>
                            <Typography>Appointments:</Typography>
                        </div>
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
                                {this.state.clientAppts.map((apptsAtIndex, index) => {
                                    return (
                                        <DisplayClientAppt key={index} clientAppt={apptsAtIndex} />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
            </div>
        ) //end of return
    } //end of render
} //end of DisplayClient

export default connect()(DisplayClient);