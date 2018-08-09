import React, { Component } from 'react';
import { ProductListPage, Login, Calendar, BestBidsPage } from './layouts'
import { BrowserRouter, Route } from 'react-router-dom'

class RouterClass extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path = '/' component={Login}/>
                    <Route path='/products' component={ProductListPage}/>
                    <Route path='/calendar' component={Calendar}/>
                    <Route path='/bestbids' component={BestBidsPage}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default RouterClass