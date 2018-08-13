import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Card,CardContent,Typography,TextField,Button, col } from '@material-ui/core'
import '../App.css'
import purple from '@material-ui/core/colors/purple';

const primary = purple.A200
class Login extends Component {
    componentWillMount(){
        // console.log(localStorage.getItem('token'))
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
        if (typeof fields["username"] !== "undefined") {
            let lastAtPos = fields["username"].lastIndexOf("@");
            let lastDotPos = fields["username"].lastIndexOf(".");

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    fields["username"].indexOf("@@") === -1 &&
                    lastDotPos > 2 &&
                    fields["username"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["username"] = "Please enter a valid Username";
            }
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
                    localStorage.setItem('user_id', response.data.user_id)
                    localStorage.setItem('mail_id', state.username)
                    localStorage.setItem('user_type',response.data.user_type)
                    console.log(localStorage.getItem('token'));
                    if (localStorage.getItem('token')) {
                        this.setState({redirect: true})
                    }
            }).catch((error)=>{
                console.log(error)
                this.setState({errors:{'username':'Invalid username or password','password':'Invalid username or password'}})
            })
        }

    }
    checkValue(value){
        if(value===undefined){
            return false
        }
        else{
            return true
        }
    }
    renderCard() {
        const { errors } = this.state
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
                               onChange={(e) => this.handleFormFieldChange(e)}  helperText={errors['username']} error={this.checkValue(errors['username'])} style={{marginBottom:20}}/><br/>
                        <TextField type="password" label='Enter Password' name='password'
                               onChange={(e) => this.handleFormFieldChange(e)}  helperText={errors['password']} error={this.checkValue(errors['password'])} style={{marginBottom:30}}/><br/>
                        <div className={'center'}>
                        <Button style={{flexGrow:1}} type='submit' color={'primary'} variant={'contained'} onClick={e => (this.handleLogin(e))}>Login</Button>
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