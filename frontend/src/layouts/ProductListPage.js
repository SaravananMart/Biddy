import React, { Component } from 'react';
import axios from 'axios';
// import { Collapse} from 'reactstrap';
import logo from '../images/myntra-logo.png';
import { Redirect } from 'react-router-dom'
import { Paper,Table,TableHead,TableBody,TableRow,TableCell, Button,TextField,Grid,AppBar,Toolbar,Typography, IconButton,Menu,MenuItem } from '@material-ui/core'
import { AccountCircle} from '@material-ui/icons';

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
        redirect:false,
        auth: true,
        anchorEl: null,
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
  handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
  }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
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
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
       <div>
           <AppBar position="static">
               <Toolbar>
                   <Typography variant={'headline'} color={'inherit'} style={{flexGrow:1}}>
                       BiddY
                   </Typography>
                   {auth && (
                       <div>
                           <IconButton
                               aria-owns={open ? 'menu-appbar' : null}
                               aria-haspopup="true"
                               onClick={this.handleMenu}
                               color="inherit"
                           >
                               <AccountCircle />
                           </IconButton>
                           <Menu
                               id="menu-appbar"
                               anchorEl={anchorEl}
                               anchorOrigin={{
                                   vertical: 'top',
                                   horizontal: 'right',
                               }}
                               transformOrigin={{
                                   vertical: 'top',
                                   horizontal: 'right',
                               }}
                               open={open}
                               onClose={this.handleClose}
                           >
                               <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                               <MenuItem onClick={this.handleClose}><Button color='inherit' onClick={(e)=>this.handleLogout(e)}>Logout</Button></MenuItem>
                           </Menu>
                       </div>
                   )}
               </Toolbar>
           </AppBar>
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
