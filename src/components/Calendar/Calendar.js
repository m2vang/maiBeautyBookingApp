import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import ExampleControlSlot from '../Calendar/ExampleControlSlot';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import '../../libraries/react-big-calendar/lib/addons/dragAndDrop/styles.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './react-big-calendar.css';
import moment from 'moment';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import events from './Events';
import SelectService from '../SelectService/SelectService';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { AVAILABLE_ACTIONS } from '../../redux/actions/availableActions';

const propTypes = {}
Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(Calendar);

const mapStateToProps = state => ({
    user: state.user,
    available: state.available.available,
    unavailable: state.available.unavailable,
    estimate: state.available.estimate,
});

class BigCalendar extends Component {
    constructor(...args) {
        super(...args);
        this.state = { events }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: AVAILABLE_ACTIONS.FETCH_AVAILABILITY });
        this.props.dispatch({ type: AVAILABLE_ACTIONS.FETCH_UNAVAILABILITY });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
        } //end of if statement
    }

    postBooking() {
        console.log('in postBooking',);
        
    }

    handleSelect = ({start, end}) => {
        if (this.props.user.if_stylist === false) {
            const title = window.prompt('Book Service:')
            if (title) {
                this.setState({
                    events: [
                        ...this.state.events,
                        {
                            start,
                            end,
                            title,
                        },
                    ],
                })
                this.dispatchApt();
            }
        } else if (this.props.user.if_stylist === true) {
            const title = window.prompt('Block Out For:')
            if (title) {
                this.setState({
                    events: [
                        ...this.state.events,
                        {
                            start,
                            end,
                            title,
                        },
                    ],
                })
                this.dispatchUnavailability();
            }
        }
    }

    dispatchAppt = () => {
        this.props.dispatch({ 
            type: AVAILABLE_ACTIONS.STORE_UNAVAILABILITY, 
            payload: this.state.events });
    }

    dispatchUnavailability = () => {
        this.props.dispatch({ 
            type: AVAILABLE_ACTIONS.STORE_UNAVAILABILITY, 
            payload: this.state.events });
    }

    render() {
        const { localizer } = this.props
        let content = null;
        if (this.props.user.if_stylist === false) {
            content = (
                <div>
                    <h3>Select a Service:</h3>
                    <SelectService />
                </div>
            )
        } else if (this.props.if_stylist === true) {
            content = (
                <div></div>
            )
        }

        return (
            <div>
                <Nav />
                {content}
                <br />
                <ExampleControlSlot.Entry waitForOutlet>
                    <strong>
                        Click an event to see more info, or drag the mouse over the calendar
                        to select a date/time range.
                    </strong>
                </ExampleControlSlot.Entry>
                <DragAndDropCalendar
                    defaultDate={new Date()}
                    defaultView={Calendar.Views.WEEK}
                    views={{
                        week: true,
                    }}
                    events={this.state.events}
                    // onEventDrop={this.moveEvent}
                    selectable
                    resizable
                    localizer={localizer}
                    showMultiDayTimes
                    step={30}
                    min={new Date(2018, 7, 2, 7)}
                    max={new Date(2018, 7, 2, 21)}
                    //this will allow the user to click on the slot & see the event title
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={this.handleSelect}
                />
            </div>
        )
    }
}

BigCalendar.propTypes = propTypes
export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(BigCalendar));