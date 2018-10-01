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
import SelectService from '../SelectService/SelectService';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { UNAVAILABLE_ACTIONS } from '../../redux/actions/unavailableActions';

const propTypes = {}
Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(Calendar);

const mapStateToProps = state => ({
    user: state.user,
    appointment: state.unavailable.appointment,
    newAppointment: state.unavailable.newAppointment,
    unavailable: state.unavailable,
});

class BigCalendar extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            eventToAdd: {
                start: '',
                end: '',
                title: '',
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: UNAVAILABLE_ACTIONS.FETCH_UNAVAILABILITY });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.email === null) {
            this.props.history.push('home');
        } //end of if statement
    }

    handleSelect = ({ start, end, title }) => {
        if (this.props.user.if_stylist === false) {
            this.setState({
                eventToAdd: {
                    ...this.state.eventToAdd, // keep the type
                    start,
                    end,
                    title,
                },
            })
            this.dispatchAppt();
        } else if (this.props.user.if_stylist === true) {
            this.setState({
                eventToAdd: {
                    start,
                    end,
                    title,
                    type: 16
                },
            })
            this.dispatchUnavailability();
        }
    }

    dispatchAppt = () => {
        this.props.dispatch({
            type: UNAVAILABLE_ACTIONS.POST_NEW_AVAILABILITY_DATA,
            payload: this.state.eventToAdd
        });
    }

    dispatchUnavailability = () => {
        this.props.dispatch({
            type: UNAVAILABLE_ACTIONS.POST_NEW_AVAILABILITY_DATA,
            payload: this.state.eventToAdd
        });
    }

    setApptType = (type) => {
        this.setState({
            eventToAdd: {
                type: type
                // Might need to spread this
            },
        })
    }

    render() {
        const thisUnavailable = this.props.unavailable.unavailability.map((event, index) => {
            const modifiedEvent = event;
            if (this.props.user.id !== modifiedEvent.user_id && this.props.user.if_stylist === false) {
                modifiedEvent.title = 'Unavailable';
            }
            modifiedEvent.start = new Date(modifiedEvent.start);
            modifiedEvent.end = new Date(modifiedEvent.end);
            return modifiedEvent;
        })

        const { localizer } = this.props
        let content = null;
        if (this.props.user.if_stylist === false) {
            content = (
                <div className="selectService">
                    <h3>Services Offered:</h3>
                    <SelectService setApptType={this.setApptType} />
                </div>
            )
        } else if (this.props.user.if_stylist === true) {
            content = (
                <div></div>
            )
        }

        if (this.props.unavailable.unavailability) {
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
                        events={thisUnavailable}
                        startAccessor="start"
                        endAccessor="end"
                        allDayAccessor="allDay"
                        titleAccessor="title"
                        resourceAccessor="resource"
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
                        eventPropGetter={(event, start, end, isSelected) => {
                            let newStyle = {
                                backgroundColor: "lightgrey",
                                color: 'black',
                                borderRadius: "0px",
                                border: "none"
                            };

                            if (event.title === 'Women Hair Cut') {
                                newStyle.backgroundColor = "yellow"
                            } else if (event.title === 'Men Hair Cut') {
                                newStyle.backgroundColor = "yellow"
                            } else if (event.title === 'Child Hair Cut') {
                                newStyle.backgroundColor = "yellow"
                            } else if (event.title === 'Highlights') {
                                newStyle.backgroundColor = "lightgreen"
                            } else if (event.title === 'Balayage/Ombre') {
                                newStyle.backgroundColor = "lightgreen"
                            } else if (event.title === 'Shadow Root') {
                                newStyle.backgroundColor = "lightgreen"
                            } else if (event.title === 'All Over Glaze') {
                                newStyle.backgroundColor = "lightgreen"
                            } else if (event.title === 'Perm') {
                                newStyle.backgroundColor = "lightgreen"
                            } else if (event.title === 'Lip/Brow Wax') {
                                newStyle.backgroundColor = "lightpink"
                            } else if (event.title === 'Manicure') {
                                newStyle.backgroundColor = "lightpink"
                            } else if (event.title === 'Pedicure') {
                                newStyle.backgroundColor = "lightpink"
                            } else if (event.title === 'Deep Hair Treatment') {
                                newStyle.backgroundColor = "lightpink"
                            } else if (event.title === 'Blowout & Style') {
                                newStyle.backgroundColor = "lightpink"
                            } else if (event.title === 'Up-Do') {
                                newStyle.backgroundColor = "lightpink"
                            } else if (event.title === 'Extensions') {
                                newStyle.backgroundColor = "lightpink"
                            } else if (event.title === 'Unavailable') {
                                newStyle.backgroundColor = "lightgrey"
                            }

                            return {
                                className: "",
                                style: newStyle
                            };
                        }}
                    />
                </div>
            )
        } else {
            return (
                <p>
                    {JSON.stringify(this.props.unavailable.unavailability)}
                </p>
            )
        }
    }
}

BigCalendar.propTypes = propTypes
export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(BigCalendar));