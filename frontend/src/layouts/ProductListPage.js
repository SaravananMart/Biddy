import React, { Component } from 'react';
import axios from 'axios';
// import { Collapse} from 'reactstrap';
import logo from '../images/myntra-logo.png';
import { Redirect } from 'react-router-dom'
import { Paper,Table,TableHead,TableBody,TableRow,TableCell, Button,TextField,Grid,Typography} from '@material-ui/core'
import Close from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import  './ProductListPage.css';
import Header from './Header'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';
const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500px', // <-- This sets the height
        width:'400px'
        // overflow: 'scroll' // <-- This tells the modal to scrol
    }
}
Modal.setAppElement('#root')

class ProductListPage extends Component{
  componentDidMount(){
      if(localStorage.getItem('token')!==null){
          this.setState({redirect:false})
          axios.get(`http://localhost:3000/products`,
              {
                  headers:{
                      Authorization: localStorage.getItem('token')
                  }
              })
              .then(function (response) {
                  console.log(response.data)
                  this.setState({list: response.data});
              }.bind(this))
              .catch(function (error) {
                  console.log(error);
              })
      }
      if(localStorage.getItem('token')===null) {
          this.setState({redirect:true})
      }
  }
  constructor () {
    super()
    this.state = {
        collapse: false,
        searchValue: '',
        list: [],
        redirect:false,
        auth: true,
        anchorEl: null,
        modalIsOpen: false,
        fields:{
            discount:'',
            startDate:moment(),
            endDate:moment().add(1, 'days')
        },
        product:'',
        errors:{},
        addItemModel: false,
        itemName: '',
        nights:1
    }
  }

  handleChange = (e) => {
    console.log(e.target)
    e.preventDefault()
        this.setState({
        searchValue: e.target.value,
      });
      if(this.state.searchValue.length < 2){
          axios.get(`http://localhost:3000/products`,
              {
                  headers:{
                      Authorization: localStorage.getItem('token')
                  }
              })
              .then(function (response) {
                  console.log(response.data)
                  this.setState({list: response.data});
              }.bind(this))
              .catch(function (error) {
                  console.log(error);
              })
      }
      else {
          this.getProduct()
      }

    }

    handleChangeAdd = (e) => {
      e.preventDefault()
      this.setState({
        itemName: e.target.value,
      });

    }

    addItem = (e) => {
      axios.post('http://localhost:3000/products', {
          name: this.state.itemName,
        })
        .then(function (response) {
         if(response.status == 200){
          this.closeModal();
         }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }

    getProduct(){
        axios.get(`http://localhost:3000/products?q=${this.state.searchValue}`,
            {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(function (response) {
                console.log(response.data)
                this.setState({list: response.data});
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

  renderTable() {
      let  list = this.state.list
        if (list !== undefined) {
            return (
                <TableBody>
                    {
                        list.map(n => {
                            return (
                                <TableRow key={`${n.name}`}>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell><Button onClick={()=>this.openModal(n)}>Bid</Button></TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            )
        }
    }

    openModal = (n)=> {
      if(n =="add_item") {
        this.setState({addItemModel: true});
        this.setState({modalIsOpen: true});
      }
      else {
        this.setState({modalIsOpen: true});
        this.setState({product:n})
        // console.log(name)
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
    handleFormFieldChange =(e)=>{
        let state= this.state.fields
        state[e.target.name]=e.target.value
        this.setState(state)
    }
    handleStartDate = (date)=> {
        var nextDate = moment(date).add(1, 'days')
        if (this.state.fields['endDate'] < nextDate ){
            this.setState({
                // fields['startDate']: date
                // fields['endDate']: nextDate
            fields:{
                'startDate':date,
                'endDate':nextDate
            }
            },function(){this.getDays()});
        }
        else{
            this.setState({
                fields:{
                    'startDate':date,
                    'endDate':this.state.fields['endDate']
                }
            },function(){this.getDays()});
        }
    }
    handleEndDate = (date) => {
        this.setState({
            fields:{
                'startDate':this.state.fields['startDate'],
                'endDate':date
            }
        },function(){this.getDays()});
    }
    getDays = () =>{
        var a = this.state.fields['startDate']
        var b = this.state.fields['endDate']
        console.log(a.format("MMM Do YY"))
        console.log(b.format("MMM Do YY"))
        var c = b.diff(a, 'days')
        this.setState({nights:c+1},function(){ console.log(this.state.nights);})
    }

    renderBidForm = () =>(
        <form>
            <Button variant="fab" mini color="secondary" aria-label="Add"  onClick={()=>this.closeModal()}>
                <Close />
            </Button>
            <p></p>
            <Typography variant="headline" gutterBottom>{this.state.product.name}</Typography>
            <TextField name='discount' onChange={(e)=>this.handleFormFieldChange(e)} fullWidth type='number'/>
            <p>{this.state.errors['discount']}</p>
            <DatePicker
                minDate={moment()}
                selected={this.state.fields['startDate']}
                onChange={this.handleStartDate}
                className="form-control"
                dateFormat={'DD/MM/YYYY'}
            /><p></p>
            <DatePicker
                minDate={moment().add(1, 'days')}
                selected={this.state.fields['endDate']}
                onChange={this.handleEndDate}
                className="form-control"
                dateFormat={'DD/MM/YYYY'}
            />
            <p></p>
            <div className='center'>
                <Button color='primary' variant="contained" onClick={(e)=>this.handleBid(e)}>BID</Button>
            </div>
        </form>
    )

    renderAddItemForm = () =>(
        <form>
            <Button variant="fab" mini color="secondary" aria-label="Add"  onClick={()=>this.closeModal()}>
                <Close />
            </Button>
            <p></p>
            <TextField name='searchValue' label={'Enter Product Name'} onChange={(e)=>this.handleChangeAdd(e)} /><br/><br/>
             <p></p>
             <div className='center'>
                <Button color='primary' variant="contained" onClick={(e)=>this.addItem(e)} >Add</Button>
            </div>
        </form>
    )


    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["discount"]) {
            formIsValid = false;
            errors["discount"] = "Discount is required!";
        }
        if(fields['discount'] < 1 || fields['discount'] > 99){
            formIsValid = false
            errors['discount'] = 'Discount greater than 1 and Less than 100'
        }
        this.setState({errors:errors})
        return formIsValid
    }

    handleBid(e){
        e.preventDefault()
        let state= this.state
        // if(this.handleValidation()) {
        //     console.log(state.fields,state.product)
        // }
        if(this.handleValidation()) {
            axios.post('http://localhost:3000/biddings', {
                from_date:state.fields['startDate'],
                to_date:state.fields['endDate'],
                days:state.nights,
                markup:state.fields['discount'],
                user_id:localStorage.getItem('user_id'),
                product_id:state.product.id
            }).then(response=>{
                console.log(response)
                // localStorage.setItem('token', response.data.access_token)
            }).catch(function(error){
                console.log(error)
            })
        }

    }


    render(){
    if(!this.state.redirect){

        return(
       <div>
           <Modal
               isOpen={this.state.modalIsOpen}
               onAfterOpen={this.afterOpenModal}
               onRequestClose={this.closeModal}
               style={customStyles}
               contentLabel="Example Modal"
           >
            {this.state.addItemModel == true ? this.renderAddItemForm() : this.renderBidForm()}

           </Modal>
            <Header handleClick={this.handleLogout}/>
        {/*<img src={logo} style={image} alt={'logo'}/>*/}
        <div className='content'>
           <Grid container spacing={24}>
               <Grid item xs={3}>
                   <Paper>
                       <TextField name='searchValue' label={'Enter Product'} onChange={(e)=>this.handleChange(e)} fullWidth /><br/><br/>
                   </Paper>
                   <Button onClick={()=>this.openModal("add_item")}>Add Item</Button>
               </Grid>
               <Grid item xs={9}>
                   <Paper>
                       <Table >
                           <TableHead>
                               <TableRow>
                                   <TableCell><b>PRODUCT</b></TableCell>
                                   <TableCell><b>BID</b></TableCell>
                               </TableRow>
                           </TableHead>
                           {this.renderTable()}
                       </Table>
                   </Paper>
               </Grid>
           </Grid>
        </div>
        </div>
      );
    }
    if(this.state.redirect){
        return <Redirect to={'/'}/>
      }
  }

}


const image = {
  'height' : '100px',
  'width' : '150px'
}


export default ProductListPage;
