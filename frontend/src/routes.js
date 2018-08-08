import React, { Component } from 'react';
import { ProductListPage, Login } from './layouts'
import { BrowserRouter, Route } from 'react-router-dom'

class RouterClass extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path = '/' component={Login}/>
                    <Route path='/products' component={ProductListPage}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default RouterClass