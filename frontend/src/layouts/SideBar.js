import {  Paper, Grid } from '@material-ui/core'
import React from "react";
import { withRR4, Nav, NavText } from 'react-sidenav';
const SideNav = withRR4();
const style = {
    Paper:{
        height:'100%',
        marginTop:20,
        marginLeft:10,
    }
}

class SideBar extends React.Component {

    render() {
        return (

                        <Grid item xs={2} style={{height:500}}>
                            <Paper style={style.Paper}>
                                <SideNav default='dashboard' highlightBgColor='grey' highlightColor='white'>
                                    {/*<Nav id='home'>*/}
                                        {/*<NavText  >  Home </NavText>*/}
                                    {/*</Nav>*/}
                                    <Nav id='products'>
                                        <NavText> Product </NavText>
                                    </Nav>
                                    <Nav id='calendar'>
                                        <NavText> Calendar </NavText>
                                    </Nav>
                                </SideNav>
                            </Paper>
                        </Grid>
        );
    }
}

export default SideBar;