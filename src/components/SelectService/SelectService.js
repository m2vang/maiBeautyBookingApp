import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Service from './Service';


class SelectService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
        };
    } //end of constructor

    componentDidMount() {
        this.getServices();
    }

    getServices() {
        axios.get('/api/availability/services/')
            .then((response) => {
                console.log('service', response.data);

                this.setState({
                    services: response.data
                })
            }).catch((error) => {
                console.log('error in getServices!', error);
            })
    }

    render() {
        return (
            <div>
                <select>
                    {this.state.services.map((services, index) => {
                        return (
                            <Service key={index} service={services} />
                        )
                    })}
                </select>
            </div>
        )
    }
}

export default connect()(SelectService);