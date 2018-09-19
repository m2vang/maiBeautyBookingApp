import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';

const mapStateToProps = state => ({
    user: state.user,
}); //end of mapStateToProps

class AppointmentsPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    } //end of componentDidMount

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
                                <td>Hair Cut</td>
                                <td>Women</td>
                                <td>2 hours</td>
                                <td>September 20, 2018</td>
                                <td>9:00 am</td>
                            </tr>
                        </tbody>
                    </table>  
                </div>
            ) //end of content
        } //end of if
        return (
            <div>
                <Nav />
                {content}
            </div>
        ) //end of return
    } //end of render
} //end of AppointmentsPage class

export default connect(mapStateToProps)(AppointmentsPage);