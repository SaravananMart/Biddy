import React, { Component } from 'react';
import { ProductListPage, Login, Calendar, BestBidsPage } from './layouts'
import { BrowserRouter as Router, Route } from 'react-router-dom'



class RouterClass extends Component {
    render() {
        return (
          <Router>
              <div>
                        <Route exact path = '/' component={Login}/>
                        <Route path='/products' component={ProductListPage}/>
                        <Route path='/calendar' component={Calendar}/>
                        <Route path='/bestbids' component={BestBidsPage}/>
              </div>
          </Router>
        )
    }
}

export default RouterClass