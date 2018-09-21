import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
            clientList: [],
        };
    } //end of constructor

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getClients();
    } //end of componentDidMount

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
        } //end of if statement
    } //end of componentDidUpdate

    getClients() {
        axios.get('/api/user/clientList/')
            .then((response) => {
                console.log('back from DB with:', response.data);
                this.setState({
                    clientList: response.data
                })
            }).catch((error) => {
                console.log('Error in getClients', error);
                alert('Cannot get appt!');
            }) //end of axios
    } //end of getClients()

    render() {
        let clientContent = null;

        //this will render the clients
        if (this.props.user.if_stylist === true) {
            clientContent = (
                <div>
                    {this.state.clientList.map((clientsAtIndex, index) => {
                        return (
                            <DisplayClient key={index} client={clientsAtIndex} />
                        )
                    })
                    }
                </div>
            ) //end of clientContent
        } //end of if statement

        return (
            <div>
                <Nav />
                {clientContent}
            </div>
        ); //end of return
    } //end of render
} //end of ListOfClients

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ListOfClients);