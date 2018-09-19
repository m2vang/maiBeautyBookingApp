import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapReduxStateToProps = state => ({state});

class DisplayReminder extends Component {
    render() {
        return (
            <div>
                <p>{this.props.state.category}</p>
            </div>
        )
    }
}

export default connect(mapReduxStateToProps)(DisplayReminder);