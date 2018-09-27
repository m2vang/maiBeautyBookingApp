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
                console.log('service', response.data);
                this.setState({
                    services: response.data
                })
            }).catch((error) => {
                console.log('error in getServices!', error);
            })
    }

    selectedService = (id) => {
        // this.setState({
        //     selectedService: response.data
        // })
    }

    render() {
        return (
            <div>
                <select onSelect={this.selectedService()}>
                    {this.state.services.map((service, index) => {
                        return (
                            <option key={index}>{service.service_name}</option>
                        )
                    })}
                </select>
                <h4>Your recommended time frame is: {this.state.service}</h4>
            </div>
        )
    }
}

export default connect()(SelectService);