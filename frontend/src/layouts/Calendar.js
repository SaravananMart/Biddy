import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
BigCalendar.momentLocalizer(moment);

class Calendar extends Component{
    constructor(){
        super()
        this.state = {
            event:[
                {
                    id: 0,
                    title: 'All Day Event very long title',
                    allDay: true,
                    start: new Date(2015, 3, 0),
                    end: new Date(2015, 3, 1),
                    hexColor:'800000'
                },
                {
                    id: 1,
                    title: 'Long Event',
                    start: new Date(2015, 3, 7),
                    end: new Date(2015, 3, 10),
                    hexColor:'FFFF00'
                }
            ]
        }
    }

    eventStyleGetter =(event, start, end, isSelected)=>{
        console.log(event);
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        }
        return {
            style: style
        }
    }

    render(){
        return(
            <div>
                <h1>Calendar</h1>
                <BigCalendar
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "100vh" }}
                selectable
                events={this.state.event}
                eventPropGetter={(this.eventStyleGetter)}
                defaultView={BigCalendar.Views.WEEK}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(2015, 3, 12)}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={slotInfo =>
                    alert(
                        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                        `\nend: ${slotInfo.end.toLocaleString()}` +
                        `\naction: ${slotInfo.action}`
                    )
                }
                />
            </div>
        )
    }
}

export default Calendar