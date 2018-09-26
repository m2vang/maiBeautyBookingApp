import React, { Component } from 'react';
import { connect } from 'react-redux';

class Service extends Component {

    render() {
        return (
                <option>{this.props.service.service_name}</option>
        ) //end of return
    } //end of render
} //end of DisplayClientAppt class

export default connect()(Service);