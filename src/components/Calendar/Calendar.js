import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import events from '../Calendar/Events';
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
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { AVAILABLE_ACTIONS } from '../../redux/actions/availableActions';

const propTypes = {}
Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(Calendar);

const mapStateToProps = state => ({
    user: state.user,
    available: state.available.available,
    unavailable: state.available.unavailable,

});

class Selectable extends Component {
    constructor(...args) {
        super(...args)
        this.state = { events }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: AVAILABLE_ACTIONS.FETCH_AVAILABILITY });
        this.props.dispatch({ type: AVAILABLE_ACTIONS.FETCH_UNAVAILABILITY });
    }

    handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
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
    }

    render() {
        const { localizer } = this.props
        return (
            <div>
                <Nav />
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
                    showMultiDayTimes
                    step={30}
                    min={new Date(2018, 7, 2, 7)}
                    max={new Date(2018, 7, 2, 21)}
                    onSelectSlot={this.handleSelect}
                />
            </div>
        )
    }
}

Selectable.propTypes = propTypes
export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Selectable));