import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router-dom'
import { Paper,Table,TableHead,TableBody,TableRow,TableCell, Button,TextField,Grid} from '@material-ui/core'
import Close from '@material-ui/icons/Close';
import  './ProductListPage.css';
import Header from './Header'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';
import ProductCard from './ProductCard'
import ProductGrid from './ProductGrid'

class ProductListPage extends Component{
  constructor () {
    super()
    this.state = {       
        searchValue: '',
        list: [],
        count: [],
        redirect:false
    }
  }

  componentDidMount(){
      if(localStorage.getItem('token')!==null){
          this.setState({redirect:false})
          this.getProduct(0);
      }
      else {
          this.setState({redirect:true})
      }
  }


  handleChange = (e) => {
    console.log(e.target)
    e.preventDefault()
        this.setState({
        searchValue: e.target.value,
      });
      if(this.state.searchValue.length > 2) {
          this.getProduct(1);
      }
    }

    getProduct = (e) =>{
      var url = '';
      if(e == 1){
        url = `http://localhost:3000/products?q=${this.state.searchValue}`;
      }
      else{
        url = `http://localhost:3000/products`;
      }
        axios.get(url,{
                headers:{ Authorization: localStorage.getItem('token') }
            })
            .then(function (response) {
                console.log(response.data)
                this.setState({list: response.data.products, count: response.data.count });
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

  render(){
    const { redirect,list} = this.state
    
    if(!redirect){
        return(
           <Grid item xs={9} style={{marginRight: -25,paddingRight:15, paddingLeft: 0}}>
               <ProductGrid list={list} />
           </Grid>
      );
    }
    else {
      return <Redirect to={'/'}/>
    }
  }
}

const style = {
    Paper:{
        height:500,
        marginTop:20,
    }
}

export default ProductListPage;
