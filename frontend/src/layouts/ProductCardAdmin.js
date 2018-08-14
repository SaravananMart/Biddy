import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from '../images/shirt.jpeg'
import { Route,withRouter } from 'react-router-dom'
const styles = {
    card: {
        // maxWidth: 250,
        // marginTop:5,
        // marginLeft:20,
        // border:' 1px solid',
        // display:'inline-block'
        // minHeight:500,
        // height:300,
    },
    media: {
        height: 80,
        width:300,
        paddingTop: '56.25%', // 16:9
    }
};

const AdminButtonLink = ({id}) => {
    return(
        <Route render={({history})=> (
            <Button  size="small" color="secondary" variant={'contained'}
                     onClick = {()=>{history.push(`/admin/${id}`)}}
            > Bid Status</Button>
        )}/>
    )
}

function ProductCardAdmin(props){
    const { classes,product } = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={product.name}
                />
                <CardContent>
                    <Typography variant="title" >
                        <div className={'center'}>
                            {product.name.toUpperCase()}
                        </div>
                    </Typography>
                </CardContent>
                <div className={'centerBottomMargin'}>
                    <CardActions>
                        <AdminButtonLink id={product.id}/>
                    </CardActions>
                </div>
            </Card>
        </div>
    );
}
export default withStyles(styles)(ProductCardAdmin);