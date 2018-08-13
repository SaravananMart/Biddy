import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ProductListPage, Login, Calendar, AdminCalendar, ApprovedCalendar } from './layouts'

class RouterClass extends Component {
    render() {
        return (
          <Router>
            <div>
              <Route exact path = '/' component={Login}/>
              <Route path='/products' component={ProductListPage}/>
              <Route path='/calendar/:id' component={Calendar}/>
              <Route path='/admin/:id' component={AdminCalendar}/>
              <Route path='/approved/:id' component={ApprovedCalendar}/>
            </div>
          </Router>
        )
    }
}

export default RouterClass