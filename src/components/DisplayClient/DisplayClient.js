import React, { Component } from 'react';
import { connect } from 'react-redux';
//Styling
import '../DisplayClient/DisplayClient.css';
//Import React Accordion
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
const moment = require('moment');

class DisplayClient extends Component {
    render() {
        return (
            <div>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div>
                            <h3>{this.props.client.first_name} {this.props.client.last_name}</h3>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="details">
                        <div>
                            <Typography>Profile:</Typography>
                        </div>
                        <div className="column" />
                        <div className="column">
                            <Typography className="title">Telephone:</Typography>
                            <Typography className={PropTypes.details}>{this.props.client.telephone}</Typography>
                        </div>
                        <div className="column">                        
                            <Typography className="title">Email:</Typography>
                            <Typography className={PropTypes.details}>{this.props.client.email}</Typography>
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanelDetails className={PropTypes.details}>
                        <div>
                            <Typography>Appointments:</Typography>
                        </div>
                        <div className="column" />
                        <div className="column">                        
                            <Typography className="title">Date:</Typography>
                            <Typography className={PropTypes.details}>{moment(this.props.client.start).format("MMM Do YYYY")}</Typography>
                        </div>
                        <div className="column">
                            <Typography className="title">Start:</Typography>
                            <Typography className={PropTypes.details}>{moment(this.props.client.start).format("h:mm a")}</Typography>
                        </div>
                        <div className="column">
                            <Typography className="title">End:</Typography>
                            <Typography className={PropTypes.details}>{moment(this.props.client.end).format("h:mm a")}</Typography>
                        </div>
                        <Button size="small">Edit</Button>
                        <Button size="small" color="secondary">Cancel</Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Divider />
            </div>
        ) //end of return
    } //end of render
} //end of DisplayClient

export default connect()(DisplayClient);