import React, { Component } from 'react';
import { ProductListPage, Login, Calendar, BestBidsPage } from './layouts'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withRR4, Nav, NavText } from 'react-sidenav';
import {  Paper,
          Table,
          TableHead,
          TableBody,
          TableRow,
          TableCell,
          Button,
          TextField,
          Grid
} from '@material-ui/core'
import Header from './layouts/Header'

const SideNav = withRR4();

const style = {
    Paper:{
        height:'100%',
        marginTop:20,
        marginLeft:10,

    }
}


class RouterClass extends Component {
    render() {
        return (
          <Router>
          <div>
            <div>
              <Header handleClick={this.handleLogout}/>
            </div>
            <div>
              <Grid container spacing={24}>
                <Grid item xs={2} style={{height:500}}>
                  <Paper style={style.Paper}>
                    <SideNav default='dashboard' highlightBgColor='grey' highlightColor='white'>
                      <Nav id='home'>
                        <NavText  >  Home </NavText>
                      </Nav>
                      <Nav id='calendar'>
                        <NavText> Calendar </NavText>
                      </Nav>
                    </SideNav>
                   </Paper>
              </Grid>
              <Grid item xs={10} style={{marginRight: -25, marginTop: 20,paddingRight:15, paddingLeft: 0}}>
               
                    <div style={{padding: 10}} >
                      <Route exact path = '/' component={Login}/>
                        <Route path='/products' component={ProductListPage}/>
                        <Route path='/calendar' component={Calendar}/>
                        <Route path='/bestbids' component={BestBidsPage}/>
                    </div>
              
               </Grid>
              </Grid>
            </div>
            </div>
            </Router>
        )
    }
}

export default RouterClass