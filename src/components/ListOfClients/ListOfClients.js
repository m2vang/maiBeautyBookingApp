import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../ListOfClients/ListOfClients.css';
import DisplayClient from '../DisplayClient/DisplayClient.js';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
}); //end of mapStateToProps

class ListOfClients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName: [],
        };
    } //end of constructor

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getClientName();
    } //end of componentDidMount

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
        } //end of if statement
    } //end of componentDidUpdate

    getClientName() {
        axios.get('/api/user/clientName/')
            .then((response) => {
                this.setState({
                    clientName: response.data
                })
            }).catch((error) => {
                console.log('Error in getClientName', error);
                alert('Cannot get client names!');
            }) //end of axios
    } //end of getClients()

    render() {
        let clientContent = null;

        //this will render the clients
        if (this.props.user.if_stylist === true) {
            clientContent = (
                <div>
                    {this.state.clientName.map((clientsAtIndex, index) => {
                        return (
                            <DisplayClient key={index} clientName={clientsAtIndex} />
                        )
                    })
                    }
                </div>
            ) //end of clientContent
        } //end of if statement
        return (
            <div>
                <Nav />
                <div className="header">
                    <span className="name">Clients</span>
                </div>
                {clientContent}
            </div>
        ); //end of return
    } //end of render
} //end of ListOfClients

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ListOfClients);