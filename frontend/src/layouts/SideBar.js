import {  Paper } from '@material-ui/core'
import React from "react";
import { withRR4, Nav, NavText } from 'react-sidenav';
const SideNav = withRR4();
const style = {
    Paper:{
        // height:500,
    }
}

class SideBar extends React.Component {

    render() {
        return (
            <Paper style={style.Paper}>
                <SideNav default='products' highlightBgColor='lightgrey' highlightColor='black'>
                    {/*<Nav id='home'>*/}
                    {/*<NavText  >  Home </NavText>*/}
                    {/*</Nav>*/}
                    <Nav id='products'>
                        <NavText> Products </NavText>
                    </Nav>
                    <Nav id='calendar'>
                        <NavText> Calendar </NavText>
                    </Nav>
                </SideNav>
            </Paper>
        );
    }
}

export default SideBar;