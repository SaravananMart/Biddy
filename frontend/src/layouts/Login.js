import React, { Component } from 'react';
import axios from 'axios'
import {reactLocalStorage} from 'reactjs-localstorage';

import '../App.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            fields:{
                username:'',
                password:'',
                 },
            errors:{}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "User Name is required!";
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Password is required!";
        }
        this.setState({errors:errors})
        return formIsValid
    }


    handleFormFieldChange =(e)=>{
        let state= this.state.fields
        state[e.target.name]=e.target.value
        this.setState(state)
    }
    handleLogin(e){
        e.preventDefault()
        let state= this.state
        if(this.handleValidation()) {
            console.log(state['username'], state['password'])
            axios.post('http://localhost:3000/auth_user', {
                username: state['username'],
                password: state['password']
            }).then(response=>{
                reactLocalStorage.setObject('var', {'access_token': response.data.access_token});
                console.log(reactLocalStorage.getObject('var'));
            }).catch(function(error){
                console.log(error)
            })
        }

    }
    render() {
        return (
            <div className={'Form'}>
                <form>
                    <input type="text" placeholder='Enter Username' name='username' onChange={(e)=>this.handleFormFieldChange(e)}/><br/>
                    <p>{this.state.errors['username']}</p>
                    <input type="password" placeholder='Enter Password' name='password' onChange={(e)=>this.handleFormFieldChange(e)}/><br/>
                    <p>{this.state.errors['password']}</p>
                    <button type='submit' onClick={e=>(this.handleLogin(e))}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;