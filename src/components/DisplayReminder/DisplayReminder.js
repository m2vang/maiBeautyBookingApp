import React, { Component } from 'react';
import { connect } from 'react-redux';
const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
}); //end of mapStateToProps

class DisplayReminder extends Component {
    render() {
        let content = null;

        if (this.props.user.email) {
            content = (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Service Type</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.appts.category}</td>
                                <td>{this.props.appts.service_name}</td>
                                <td>{this.props.appts.duration} hours</td>
                                <td>{moment(this.props.appts.start).format("MMM Do YYYY")}</td>
                                <td>{moment(this.props.appts.start).format("h:mm a")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) //end of content
        } //end of if
        return (
            <div>
                { content }
            </div>
        )
    }
}

export default connect(mapStateToProps)(DisplayReminder);