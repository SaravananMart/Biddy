import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Close from '@material-ui/icons/Close';
import Modal from 'react-modal';
import Header from './Header'
import axios from "axios/index";
import { Button,Grid} from '@material-ui/core'
import SideBar from './SideBar'
import { Table, Button as Approve } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'
import CustomTable from './CustomTable'
BigCalendar.momentLocalizer(moment);
Modal.setAppElement('#root')

class AdminCalendar extends Component{
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
          list: [],
          modalIsOpen:false,
          date:'',
          redirect:false,
          index:''
      }
    }

    componentDidMount(){
      this.getBidData(0);
    }

    getBidData = (date) =>{
        console.log(this.props.match.params.id)
      var url = '';
      if(date != 0){
        url = `http://localhost:3000/biddings/bid_details?date=${date}&pid=${this.props.match.params.id}`;
      }else{
        url = `http://localhost:3000/biddings/total_bid?pid=${this.props.match.params.id}`;
      }
      axios.get(url, {
          headers:{ Authorization: localStorage.getItem('token') }
        })
        .then(function (response) {
        console.log(response.data)
          if(date == 0){
          var arr = response.data
            for (var i=0;i<arr.length;i++){
              arr[i].start = new Date(arr[i].start)
              arr[i].end = new Date(arr[i].start)
            }
            this.setState({event: arr});
          }
          else{
          this.setState({list: response.data});
          this.setState({modalIsOpen:true});
        }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        })
    }

    approveBid = (e) =>{
      console.log(e)
      axios.post('http://localhost:3000/biddings/approve_bid', {
          id: this.state.list[e].id,
          user_id: this.state.list[e].user_id,
          product_id: this.state.list[e].product_id,
          from_date: this.state.list[e].from_date,
          to_date: this.state.list[e].to_date,
          from: this.state.list[e].from,
          to: this.state.list[e].to,
          days: this.state.list[e].days
      })
      .then(function (response) {
       if(response.status === 200){
        this.closeModal();
        this.getBidData(0);
       }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    }

    handleLogout = (e)=>{
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
        this.setState({modalIsOpen: false})
    }

    handleFormFieldChange =(e)=>{
        let state= this.state
        state[e.target.name]=e.target.value
        this.setState(state)
    }
    handleLogout = (e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState({redirect:true})
    }
    checkStatus = ()=>{
        const { list } = this.state
        let bool = true
        let index
        for (var i = 0;i <list.length;i++){
            var listStatus = list[i]
            if(listStatus['status']==='Approved' || listStatus['status']==='Partially approved'){
                bool = false
            }
        }
        return bool
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
                      <div>
                        <Button style={customStyles.buttonStyle} variant="fab" mini color="secondary" aria-label="Add"  onClick={()=>this.closeModal()}>
                            <Close />
                        </Button>
                        <p></p>
                        <div>
                            <CustomTable list={this.state.list} checkStatus = {this.checkStatus} approveBid={this.approveBid}/>
                        </div>
                      </div>
                  </Modal>
                  <BigCalendar
                    style={{ height: "80vh" }}
                    selectable
                    events={this.state.event}
                    eventPropGetter={(this.eventStyleGetter)}
                    defaultView={BigCalendar.Views.MONTH}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={event => alert(event.title)}
                    onSelectSlot={slotInfo => {
                        this.getBidData(slotInfo.start.toLocaleString())
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
        height: '500px', // <-- This sets the height
        width:'1200px',
        borderRadius: '15px',
    },
    buttonStyle: {
      marginLeft: '-15px',
      marginTop: '-15px'
    }
  }


export default AdminCalendar;