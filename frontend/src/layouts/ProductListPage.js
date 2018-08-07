import React, { Component } from 'react';
import axios from 'axios';
// import { Collapse} from 'reactstrap';
import logo from '../images/myntra-logo.png';
import { Redirect } from 'react-router-dom'
import { Paper,Table,TableHead,TableBody,TableRow,TableCell, Button,TextField} from '@material-ui/core'

import  './ProductListPage.css';

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
        redirect:false
    }
  }

  handleChange = (e) => {
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


  handleLogout(e){
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
                                    <TableCell><Button>Bid</Button></TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            )
        }
    }

  render(){
    if(!this.state.redirect){
    return(
      <div className="container" >
        <img src={logo} style={image} alt={'logo'}/>
<p></p>
          <TextField name='searchValue' label={'Enter Product'} onChange={(e)=>this.handleChange(e)}/><br/><br/>

          <Paper style={{'width':'50%'}}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell><b>PRODUCT</b></TableCell>
                          <TableCell><b>BID</b></TableCell>
                      </TableRow>
                  </TableHead>
                  {this.renderTable()}
              </Table>
          </Paper>
            <p></p>
        <button onClick={(e)=>this.handleLogout(e)}>Logout</button>
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
