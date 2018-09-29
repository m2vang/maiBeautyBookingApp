import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class SelectService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            selectedService: [],
        };
    } //end of constructor

    componentDidMount() {
        this.getServices();
    }

    getServices() {
        axios.get('/api/unavailability/services/')
            .then((response) => {
                this.setState({
                    services: response.data
                })
            }).catch((error) => {
                console.log('error in getServices!', error);
            })
    }

    selectedService = (event) => {
        console.log('in selectedService', event.target.value);
        let service = event.target.value;
        this.props.setApptType(service);
    }

    render() {
        return (
            <div>
                <select onChange={this.selectedService}>
                    {this.state.services.map((service, index) => {
                        return (
                            <option key={index} value={service.id}>{service.service_name}</option>
                        )
                    })}
                </select>
                <h4>Your recommended time frame is: {}</h4>
            </div>
        )
    }
}

export default connect()(SelectService);