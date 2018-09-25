import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
import '../../libraries/react-big-calendar/lib/addons/dragAndDrop/styles.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './react-big-calendar.css';
import moment from 'moment';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(Calendar);

const mapStateToProps = state => ({
    user: state.user,
});

class ApptCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    start: null,
                    end: null,
                }
            ],
            newEvent: {
                start: null,
                end: null,
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
        }
    }

    selectTime = (slotInfo) => {
        if (this.props.user.if_stylist === false) {
            let start = new Date(slotInfo.start);
            let end = new Date(slotInfo.end);
            let diffHrs = end.getHours() - start.getHours();
            let diffMins = end.getMinutes() - start.getMinutes();
            let diff = diffHrs + (diffMins / 60);
            this.setState({
                newEvent: {start: new Date(slotInfo.start), end: new Date(slotInfo.end)},
                events: [this.state.newEvent]
            })
        } else if (this.props.user.if_stylist === true) {
            this.setState({
                newEvent: {start: new Date(slotInfo.start), end: new Date(slotInfo.end)},
                events: [...this.state.events, this.state.newEvent]
            })
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <DragAndDropCalendar
                    defaultDate={new Date()}
                    defaultView={Calendar.Views.WEEK}
                    views={{
                        week: true,
                    }}
                    events={this.state.events}
                    // onEventResize={this.resizeEvent}
                    // onEventDrop={this.moveEvent}
                    selectable
                    resizable
                    showMultiDayTimes
                    step={30}
                    min={new Date(2018, 7, 2, 7)}
                    max={new Date(2018, 7, 2, 21)}
                    onSelectSlot={this.selectTime}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(ApptCalendar));