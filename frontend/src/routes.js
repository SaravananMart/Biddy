import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ProductListPage, Login, Calendar, BestBidsPage, AdminCalendar, ApprovedCalendar } from './layouts'

class RouterClass extends Component {
    render() {
        return (
          <Router>
            <div>
              <Route exact path = '/' component={Login}/>
              <Route path='/products' component={ProductListPage}/>
              <Route path='/calendar' component={Calendar}/>
              <Route path='/bestbids' component={BestBidsPage}/>
              <Route path='/admin/:id' component={AdminCalendar}/>
              <Route path='/approved' component={ApprovedCalendar}/>
            </div>
          </Router>
        )
    }
}

export default RouterClass