import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom'
import { Button,TextField,Grid} from '@material-ui/core'
import Close from '@material-ui/icons/Close';
import  './ProductListPage.css';
import Header from './Header'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';
import SideBar from './SideBar'
import NestedGrid from './NestedGrid'

class ProductListPage extends Component{

    getProducts(){
        axios.get(`http://localhost:3000/products`,
            {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(function (response) {
                console.log(response.data)
                this.setState({list: response.data.products, count: response.data.count });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    }
  componentDidMount(){
      if(localStorage.getItem('token')!==null){
          this.setState({redirect:false})
          this.getProducts()
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
        count: [],
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
        nights:1,
        color:''
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
         if(response.status === 200){
          this.closeModal();
         }
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    }

  handleLogout = (e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    this.setState({redirect:true})
    }

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
    render(){
      const { redirect,list} = this.state
    if(!redirect){
        return(
            <div>
                <Header handleClick={this.handleLogout}/>
                    <Grid container>
                        <Grid item xs={2} style={{marginTop:30,marginLeft:10}}>
                            <SideBar/>
                        </Grid>
                        <Grid item xs={9} style={{marginLeft:80,marginTop:30}}>
                        <NestedGrid list={list}/>
                        </Grid>
                    </Grid>
            </div>

      );
    }
    if(this.state.redirect){
        return <Redirect to={'/'}/>
      }
  }

}

export default ProductListPage;