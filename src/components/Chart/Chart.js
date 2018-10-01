import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const mapStateToProps = state => ({
    user: state.user,
});

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service_data: [],
        }
    }

    componentDidMount() {
        // this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.getData();
    }

    // componentDidUpdate() {
    //     if (!this.props.user.isLoading && this.props.user.email === null) {
    //         this.props.history.push('home');
    //     } //end of if statement
    // }

    getData = () => {
        console.log('in getData');
        axios.get('/api/chart/')
            .then((response) => {
                console.log('chartData:', response.data);
                const data = response.data;
                console.log('SERVICE_DATA:', data);
                this.setState({
                    service_data: [data]
                })
            }).catch((error) => {
                console.log('error in getData', error);
                alert('Cannot get data!');
            })
    } //end of getData()

    render() {

        return (
            <div>
                {JSON.stringify(this.state.service_data)}
                {this.state.service_data.map((event, index) => {
                    return (
                        <Bar
                            key={index}
                            label={event.service_name}
                            data={event.count}
                        />
                    )
                })
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Chart);