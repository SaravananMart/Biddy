import React, { Component } from 'react';
import axios from 'axios';
import { Collapse} from 'reactstrap';
import logo from '../images/myntra-logo.png';
import { Redirect } from 'react-router-dom'


import  './ProductListPage.css';

class ProductListPage extends Component{
  componentDidMount(){
      if(localStorage.getItem('token')!==null){
          this.setState({redirect:false})
      }
      if(localStorage.getItem('token')===null) {
          this.setState({redirect:true})
      }
  }
  constructor () {
    super()
    this.state = {
      collapse: false,
      collapsed: true,
      searchValue: '',
      list: [],
        redirect:false
    }
  }

    getProductNames = (product) => {
    if ((this.state.searchValue.length) - 1) {
      this.setState({ collapse: true });
      axios.get(`http://localhost:3000/products?q=${product}`,
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
      .then(function () {
      });
    }
    else
    {
      this.setState({ collapse: false });
    }
  }

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
    this.state.searchValue.length <=2 ? this.setState({ collapse: false }) : this.setState({ collapse: true });
    if(this.state.searchValue.length >= 2)
    {
      this.getProductNames(this.state.searchValue);
    }
  }

  closeSuggest = (e) => {
    this.setState({ collapse: false });
  }

  handleClick = (e) => {
        this.setState({
        searchValue: e.currentTarget.dataset.id,
        collapse: false
      });
    }

   toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  handleLogout(e){
    e.preventDefault()
    console.log("HEre")
    localStorage.removeItem('token')
    this.setState({redirect:true})
  }


  render(){
    if(!this.state.redirect){
    return(
      <div className="container" >
        <img src={logo} style={image} alt={'logo'}/>
      <div className="form-group">
        <input id="search_submit" type="text" className="form-control" placeholder="Search products..." style={searchBar} onChange={this.handleSearch}  onBlur={this.closeSuggest} value={this.state.searchValue} />
        <Collapse isOpen={this.state.collapse} >
        <ul className="suggestions">
        {
          this.state.list.slice(0, 10).map((product, index) =>
              <li  key={index} className="list" onClick={this.handleClick} data-id={product.id} >
                {product.name}
              </li>
          )
        }
        </ul>
        </Collapse>
        </div>
        <button onClick={(e)=>this.handleLogout(e)}>Logout</button>
      </div>
      );
    }
    if(this.state.redirect){
        return <Redirect to={'/'}/>
      }
  }

}

const searchBar ={
  'width' : '400px'
}

const image = {
  'height' : '100px',
  'width' : '150px'
}


export default ProductListPage;
