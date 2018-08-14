import React, { Component } from 'react'
import Header from './Header'
import moment from 'moment';
import SideBar from './SideBar'
import Modal from 'react-modal';
import axios from "axios/index";
import BigCalendar from 'react-big-calendar';
import Close from '@material-ui/icons/Close';
import { Button,Grid} from '@material-ui/core'
import { Redirect} from 'react-router-dom'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './ApprovedCalendar.css'

BigCalendar.momentLocalizer(moment);
Modal.setAppElement('#root')

class ApprovedCalendar extends Component{
    componentDidMount(){
      this.getBidData();
    }
    constructor(){
      super()
      this.state = {
          event:[
              {
                  title: '5',
                  start: new Date(),
                  end: new Date(),
              }
          ],
          modalIsOpen:false,
          status: '',
          redirect:false
      }
    }

    getBidData = (e) =>{
        console.log(this.props.match.params.id)
        axios.get(`http://localhost:3000/biddings/approved_dates?uid=${localStorage.getItem('user_id')}&pid=${this.props.match.params.id}`,
        {
          headers:{
              Authorization: localStorage.getItem('token')
          }
        })
        .then(function (response) {
          var arr = response.data
          for (var i=0;i<arr.length;i++){
              arr[i].start = new Date(arr[i].start)
              arr[i].end = new Date(arr[i].start)
          }
          console.log(arr)
          this.setState({event: arr});
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        })
    }

    eventStyleGetter =(event, start, end, isSelected)=>{
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
    afterOpenModal = () => {
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }
    renderBidForm = () =>(
         <div>
          <Button style={customStyles.buttonStyle} variant="fab" mini color="secondary" aria-label="Add"  onClick={()=>this.closeModal()}>
              <Close />
          </Button>

            <p></p>
            <div style={{textAlign: 'center'}}>
              <h4>{this.state.status}</h4>
            </div>
          </div>
    )


    setFormData = (event) =>{
        (event == 'R') ? event = "Rejected" : (event == 'P') ? event = "Partially Approved" : event = "Approved"
        this.setState({modalIsOpen:true, status:event})
    }
    handleLogout = (e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState({redirect:true})
    }

    render(){
        const { redirect} = this.state
        if(!redirect){
        return(
            <div>
              <Header handleClick={this.handleLogout}/>
                <Grid container>
                    <Grid item xs={2} style={{marginTop:30,marginLeft:10}}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={9} style={{marginLeft:80,marginTop:30,paddingLeft:0}}>
                     <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                          {this.renderBidForm()}
                      </Modal>
                    <BigCalendar
                      style={{ height: "80vh" }}
                      events={this.state.event}
                      eventPropGetter={(this.eventStyleGetter)}
                      defaultView={BigCalendar.Views.MONTH}
                      scrollToTime={new Date(1970, 1, 1, 6)}
                      defaultDate={new Date()}
                      onSelectEvent={event => this.setFormData(event.title)}
                      onSelectSlot={slotInfo => {
                          this.setFormData(slotInfo.start.toLocaleString(),slotInfo.end.toLocaleString())
                        }
                      }
                    />
                  </Grid>
                </Grid>
            </div>
        )
        }
        if(redirect){
            return <Redirect to={'/'}/>
        }
    }
}

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '100px', // <-- This sets the height
        width:'200px',
        borderRadius: '15px',
    },
    buttonStyle: {
      marginLeft: '-15px',
      marginTop: '-15px'
    }
}


export default ApprovedCalendar;