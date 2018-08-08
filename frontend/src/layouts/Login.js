import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Card,CardContent,Typography,TextField,Button } from '@material-ui/core'
import '../App.css'

class Login extends Component {
    componentWillMount(){
        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token')!==null){
            this.setState({redirect:true})
        }
        if(localStorage.getItem('token')===null) {
            this.setState({redirect:false})
        }


    }
    constructor(props){
        super(props)
        this.state={
            fields:{
                username:'',
                password:'',
                 },
            errors:{},
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
                console.log(response)
                localStorage.setItem('token', response.data.access_token)
                console.log(localStorage.getItem('token'));
                if(localStorage.getItem('token')){
                    this.setState({redirect:true})
                }
            }).catch(function(error){
                console.log(error)
            })
        }

    }
    renderCard() {
        return (
        <Card>
            {/*<CardMedia*/}
                {/*className={classes.media}*/}
                {/*image={codingLogo}*/}

            {/*/>*/}

            <CardContent>
                <Typography  variant="headline" component="h2">
                    <div className='centerMargin'>
                   Myntra Login
                    </div>
                </Typography>
                <Typography component="div">
                    <form>
                        <TextField type="text" label='Enter Username' name='username'
                               onChange={(e) => this.handleFormFieldChange(e)}/><br/>
                        <p>{this.state.errors['username']}</p>
                        <TextField type="password" label='Enter Password' name='password'
                               onChange={(e) => this.handleFormFieldChange(e)}/><br/>
                        <p>{this.state.errors['password']}</p>
                        <div className={'center'}>
                        <Button type='submit' color={'primary'} variant={'contained'} onClick={e => (this.handleLogin(e))}>Login</Button>
                        </div>
                    </form>
                </Typography>
            </CardContent>
        </Card>
        )
    }
    render() {
        if (!this.state.redirect) {
            return (
                <div className={'background'}>
                    <div className={'Form'}>
                        { this.renderCard()}
                    </div>
                </div>
            );
        }
        if(this.state.redirect){
            return <Redirect to='/products'/>
        }

    }
}

export default Login;