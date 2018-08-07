import React, { Component } from 'react';
import axios from 'axios';
import { Collapse} from 'reactstrap';
import logo from '../images/myntra-logo.png';

import  './ProductListPage.css';

class ProductListPage extends Component{
  constructor () {
    super()
    this.state = {
      collapse: false,
      collapsed: true,
      searchValue: '',
      list: []
    }
  }

  getMovieNames = (e) => {
    if ((this.state.searchValue.length) - 1) {
      this.setState({ collapse: true });
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key:'52ee9d5c12f1a8dba9590b47ffe68904',
          language:'en-US',
          query:e,
          page: 1,
          include_adult:false
        }
      })
      .then(function (response) {
        this.setState({list: response.data.results});
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
      this.getMovieNames(this.state.searchValue);
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


  render(){
    return(
      <div className="container" >
        <img src={logo} style={image} alt={'logo'}/>
      <div className="form-group">
        <input id="search_submit" type="text" className="form-control" placeholder="Search products..." style={searchBar} onChange={this.handleSearch}  onBlur={this.closeSuggest} value={this.state.searchValue} />
        <Collapse isOpen={this.state.collapse} >
        <ul className="suggestions">
        {
          this.state.list.slice(0, 10).map((movie, index) =>
              <li  key={index} className="list" onClick={this.handleClick} data-id={movie.title} >
                {movie.title}
              </li>
          )
        }
        </ul>
        </Collapse>
        </div>
      </div>
      );
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
