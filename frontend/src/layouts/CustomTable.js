import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core"
import { Toolbar } from '@material-ui/core'

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
            textAlign:'left'
        },

    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}



function CustomizedTable(props) {
    const { classes,list,checkStatus,approveBid } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Id</CustomTableCell>
                        <CustomTableCell>Name</CustomTableCell>
                        <CustomTableCell numeric>Markup</CustomTableCell>
                        <CustomTableCell>From</CustomTableCell>
                        <CustomTableCell>To</CustomTableCell>
                        <CustomTableCell numeric>Days</CustomTableCell>
                        <CustomTableCell numeric>Profit Per Day</CustomTableCell>
                        <CustomTableCell>Status</CustomTableCell>
                        { checkStatus()&&<CustomTableCell>Approve</CustomTableCell>}


                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((l,index) => {
                        return (
                            <TableRow className={classes.row} key={index}>
                                <CustomTableCell component="th" scope="row">
                                    {l.id}
                                </CustomTableCell>
                                <CustomTableCell numeric>{l.name}</CustomTableCell>
                                <CustomTableCell numeric>{l.markup}</CustomTableCell>
                                <CustomTableCell numeric>{l.from_date}</CustomTableCell>
                                <CustomTableCell numeric>{l.to_date}</CustomTableCell>
                                <CustomTableCell numeric>{l.days}</CustomTableCell>
                                <CustomTableCell numeric>{l.profit}</CustomTableCell>
                                <CustomTableCell numeric>{l.status}</CustomTableCell>
                                {checkStatus()&&<CustomTableCell ><Button outline color="primary" onClick={() => approveBid(index)} >Approve</Button>
                                </CustomTableCell>}

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);