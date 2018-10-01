import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class SelectService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            currentService: {},
        };
    } //end of constructor

    componentDidMount() {
        this.getServices();
    }

    componentDidUpdate() {
        if (this.state.services.length && !this.state.currentService.duration) {
            this.setState({
                currentService: this.state.services[0]
            });
        }
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
        let serviceIndex = event.target.value;
        let service = this.state.services[serviceIndex]
        console.log('services', service);
        
        this.setState({
            currentService: service
        })
        this.props.setApptType(service.id);
    }

    render() {
        let content = '';
        console.log('currentService', this.state.currentService);
        
        if (this.state.services !== null) {
            content = (
                <h4>Your recommended time frame is: {this.state.currentService.duration} hours</h4>
            )
        }
        return (
            <div>
                <select onChange={this.selectedService}>
                    {this.state.services.map((service, index) => {
                        return (
                            <option key={index} value={index}>{service.service_name}</option>
                        )
                    })}
                </select>
                { content }
            </div>
        )
    }
}

export default connect()(SelectService);