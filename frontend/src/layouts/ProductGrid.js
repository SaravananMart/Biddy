import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard'
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:150
    },
});

function FormRow(props) {
    const { classes,list } = props;
    console.log(list)
    return (
        <React.Fragment>
            {/*<Grid item xs={4}>*/}
                {/*<Paper className={classes.paper}>item</Paper>*/}
            {/*</Grid>*/}
            {
                (list)?(list.map((l,index)=>
                <Grid item xs={4} key={index}>
                    <ProductCard product={l} key={l.id}/>
                </Grid>
                )):(<div>loading</div>)
            }

        </React.Fragment>
    );
}

FormRow.propTypes = {
    classes: PropTypes.object.isRequired,
};

function chunkArray(myArray, chunk_size){
    var arrayLength = myArray.length;
    var tempArray = [];
    var myChunk = 0
    for ( var index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;
}

function NestedGrid(props) {
    const { classes,list } = props;
    var result = chunkArray(list, 3);
    console.log(result);

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                {result.map((l,index)=>
                    <Grid item xs={12} container spacing={24} key={index}>
                        <FormRow classes={classes} list={l}/>
                    </Grid>)
                }
            </Grid>
        </div>
    );
}

NestedGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);