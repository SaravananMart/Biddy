import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Button,TextField,Typography,Grid} from '@material-ui/core'
import SideBar from './SideBar'
import Close from '@material-ui/icons/Close';
import Modal from 'react-modal';
import axios from "axios/index";
import Header from './Header'
import { Redirect } from 'react-router-dom'

import 'react-big-calendar/lib/css/react-big-calendar.css'
// import './Calendar.css'

BigCalendar.momentLocalizer(moment);
Modal.setAppElement('#root')

class Calendar extends Component{
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
          errors:{},
          startDate:'',
          endDate:'',
          discount:'',
          redirect:false
      }
    }

    componentDidMount(){
      this.getBidData();
    }

    getBidData = (e) =>{
      axios.get(`http://localhost:3000/biddings/total_bid?pid=1`,
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

    handleLogout = (e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState({redirect:true})
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
        this.setState({modalIsOpen: false, addItemModel: false, discount:''})
    }

    handleFormFieldChange =(e)=>{
        let state= this.state
        state[e.target.name]=e.target.value
        this.setState(state)
    }

    handleValidation() {
        let fields = this.state
        let errors = {};
        let formIsValid = true;
        if (!fields["discount"]) {
            formIsValid = false;
            errors["discount"] = "Markup is required!";
        }
        if(fields['discount'] < 1 || fields['discount'] > 99){
            formIsValid = false
            errors['discount'] = 'Enter Markup greater than 1 and less than 100'
        }
        this.setState({errors:errors})
        return formIsValid
    }
    handleBid(e){
        e.preventDefault()
        let state= this.state
        if(this.handleValidation()){
            axios.post('http://localhost:3000/biddings', {
                from_date: state.startDate,
                to_date: state.endDate,
                days: 1,
                markup: parseInt(state.discount,10),
                user_id: 1,  //localStorage.getItem('user_id'),
                product_id: 1,
                status: 0
            })
            .then(function (response) {
             if(response.status === 200){
              this.closeModal();
              this.getBidData();
             }
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
          }
    }
    setFormData = (start,end) =>{
        this.setState({startDate:start,endDate:end},()=>this.setState({modalIsOpen:true}))
    }

     renderBidForm = () =>(
        <form>
            <Button style={customStyles.buttonStyle} variant="fab" mini color="secondary" aria-label="Add" onClick={()=>this.closeModal()}>
                <Close />
            </Button>
            <p></p>
            <Typography variant="body2" gutterBottom>
                Start Date: {this.state.startDate}
            </Typography>
            <Typography variant="body2" gutterBottom>
                End Date: {this.state.endDate}
            </Typography>
            <p></p>
            <TextField name='discount' onChange={(e)=>this.handleFormFieldChange(e)} fullWidth type='number' label={'Markup'}/>
            <p>{this.state.errors['discount']}</p>
            <div className='center'>
                <Button color='primary' variant="contained" onClick={(e)=>this.handleBid(e)}>BID</Button>
            </div>
        </form>
    )

    render(){
        const { redirect } = this.state
        if(!redirect) {
            return (
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
                            style={{height: "80vh"}}
                            selectable
                            events={this.state.event}
                            eventPropGetter={(this.eventStyleGetter)}
                            defaultView={BigCalendar.Views.MONTH}
                            scrollToTime={new Date(1970, 1, 1, 6)}
                            defaultDate={new Date()}
                            onSelectEvent={event => alert(event.title)}
                            onSelectSlot={slotInfo => {
                                this.setFormData(slotInfo.start.toLocaleString(), slotInfo.end.toLocaleString())
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
        height: '300px', // <-- This sets the height
        width:'400px',
        borderRadius: '15px',
    },
    buttonStyle: {
      marginLeft: '-15px',
      marginTop: '-15px'
    }
}

export default Calendar