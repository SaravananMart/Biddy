import React, {Component} from 'react'
import { AccountCircle} from '@material-ui/icons';
import {AppBar,Toolbar,Typography,IconButton,Menu,MenuItem,Button } from '@material-ui/core'
class Header extends Component{
    constructor(){
        super()
        this.state = {
            auth: true,
            anchorEl: null,
        }
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }
    render(){
        const {handleClick} = this.props
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant={'headline'} color={'inherit'} style={{flexGrow:1}}>
                        BiddY
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleClose}><Button color='inherit' onClick={(e)=>handleClick(e)}>Logout</Button></MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}

export default Header