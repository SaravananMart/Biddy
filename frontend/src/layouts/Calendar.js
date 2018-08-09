import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button,TextField,Typography} from '@material-ui/core'
import Close from '@material-ui/icons/Close';
import Modal from 'react-modal';
import axios from "axios/index";
// import axios from "axios/index";

BigCalendar.momentLocalizer(moment);
Modal.setAppElement('#root')
const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '300px', // <-- This sets the height
        width:'400px'
    }
}
class Calendar extends Component{
    componentDidMount(){
            axios.get(`http://localhost:3000/biddings/total_bid`,
                {
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })
                .then(function (response) {
                    // console.log(response.data)
                    var arr = response.data
                    for (var i=0;i<arr.length;i++){
                        arr[i].date = new Date(arr[i].date)
                        arr[i].end = new Date(arr[i].date)
                    }
                    console.log(arr)
                    this.setState({event: arr});
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                })
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
            errors:{},
            startDate:'',
            endDate:'',
            discount:''
        }
    }
    // eventComponent=({event})=>(
    //     <div>
    //         <div>{event.title}</div>
    //         <div>{event.hexColor}</div>
    //     </div>
    // )


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
    afterOpenModal = () => {
        // this.subtitle.style.color = 'blue';
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
        this.setState({addItemModel: false});
        this.setState({discount:''})
    }
    renderBidForm = () =>(
        <form>
            <Button variant="fab" mini color="secondary" aria-label="Add"  onClick={()=>this.closeModal()}>
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
            console.log(state.startDate,state.endDate,state.discount,state.startDate-state.endDate,localStorage.getItem('user_id'))
        }
        // if(this.handleValidation()) {
        //     axios.post('http://localhost:3000/biddings', {
        //         from_date:state.startDate,
        //         to_date:state.endDate,
        //         days:state.nights,
        //         markup:state.discount,
        //         user_id:localStorage.getItem('user_id'),
        //         product_id:state.product.id
        //     }).then(response=>{
        //         console.log(response)
        //         // localStorage.setItem('token', response.data.access_token)
        //     }).catch(function(error){
        //         console.log(error)
        //     })
        // }

    }
    setFormData = (start,end) =>{
        this.setState({startDate:start,endDate:end},()=>this.setState({modalIsOpen:true}))
    }

    render(){
        return(
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {this.renderBidForm()}

                </Modal>

                <h1>Calendar</h1>
                <BigCalendar
                style={{ height: "100vh" }}
                selectable
                events={this.state.event}
                eventPropGetter={(this.eventStyleGetter)}
                defaultView={BigCalendar.Views.MONTH}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={slotInfo => {
                    this.setFormData(slotInfo.start.toLocaleString(),slotInfo.end.toLocaleString())
                    // console.log( `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                    //     `\nend: ${slotInfo.end.toLocaleString()}` +
                    //     `\naction: ${slotInfo.action}`)
                }
                }
                // components={{
                //     event:this.eventComponent
                // }}
                />
            </div>
        )
    }
}

export default Calendar