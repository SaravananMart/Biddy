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



class BestBidsPage extends Component{
   constructor () {
    super()
    this.state = {
        collapse: false,
        searchValue: '',
        list: [],
        best_bids: [],
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

    }
  }


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

    getBestBids = (e) =>{
      console.log(e)
        axios.get(`http://localhost:3000/biddings/best?pid=1`,
          {
              headers:{
                  Authorization: localStorage.getItem('token')
              }
          })
          .then(function (response) {
              console.log(response.data.best_bid)
              this.setState({best_bids: response.data.best_bid, modalIsOpen:true });
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
                          <TableCell>
                            <Button onClick={()=>this.openModal(n.name, n.id)}>View</Button>
                          </TableCell>
                        </TableRow>
                        );
                    })
                  }
              </TableBody>
              )
          }
      }
    
      openModal = (name, id)=> {
        this.getBestBids(id);
          this.setState({product:name})
      }

      afterOpenModal = () => {
          // this.subtitle.style.color = 'blue';
      }

      closeModal = () => {
          this.setState({modalIsOpen: false});
      }
      handleFormFieldChange =(e)=>{
          let state= this.state.fields
          state[e.target.name]=e.target.value
          this.setState(state)
      }

      renderBestBid = () =>(
          <div>
              <Button variant="fab" mini color="secondary" aria-label="Add"  onClick={()=>this.closeModal()}>
                  <Close />
              </Button>
              <p></p>

              {
                this.state.best_bid.map(pdt =>{
                    <h4>{pdt.from_date}</h4>
                })
              }
          </div>
      )

      handleValidation() {
          let fields = this.state.fields;
          let errors = {};
          let formIsValid = true;

          //Name
          if (!fields["discount"]) {
              formIsValid = false;
              errors["username"] = "Discount is required!";
          }
          if (!fields["endDate"]) {
              formIsValid = false;
              errors["password"] = "Password is required!";
          }
          if (!fields["startDate"]) {
              formIsValid = false;
              errors["password"] = "Password is required!";
          }
          this.setState({errors:errors})
          return formIsValid
      }

      handleLogin(e){
          e.preventDefault()
          let state= this.state
          if(this.handleValidation()) {
              console.log(state['username'], state['password'])
              axios.post('http://localhost:3000/auth_user', {
                  username: state['username'],
                  password: state['password']
              }).then(response=>{
                  console.log(response)
                  localStorage.setItem('token', response.data.access_token)
                  console.log(localStorage.getItem('token'));
                  if(localStorage.getItem('token')){
                      this.setState({redirect:true})
                  }
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
            { (this.state.best_bid)?(this.renderBestBid()):(<div>No data</div>)}

           </Modal>
            <Header handleClick={this.handleLogout}/>
        {/*<img src={logo} style={image} alt={'logo'}/>*/}
        <div className='content'>
           <Grid container spacing={24}>
               <Grid item xs={3}>
                   <Paper>
                       <TextField name='searchValue' label={'Enter Product'} onChange={(e)=>this.handleChange(e)} fullWidth /><br/><br/>
                   </Paper>
               </Grid>
               <Grid item xs={9}>
                   <Paper>
                       <Table >
                           <TableHead>
                               <TableRow>
                                   <TableCell><b>PRODUCT</b></TableCell>
                                   <TableCell><b>BEST BID</b></TableCell>
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

const customStyles = {
        content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500px',
        width:'400px'
    }
}

export default BestBidsPage;
