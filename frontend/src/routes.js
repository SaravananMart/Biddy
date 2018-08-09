import React, { Component } from 'react';
import { ProductListPage, Login, BestBidsPage } from './layouts'
import { BrowserRouter, Route } from 'react-router-dom'

class RouterClass extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path = '/' component={Login}/>
                    <Route path='/products' component={ProductListPage}/>
                    <Route path='/bestbids' component={BestBidsPage}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default RouterClass