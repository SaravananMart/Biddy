import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from '../images/shirt.jpeg'
const styles = {
    card: {
        maxWidth: 250,
        // marginTop:5,
        // marginLeft:20,
        // border:' 1px solid',
        // display:'inline-block'
        // minHeight:500,
        height:300,
    },
    media: {
        height: 80,
        width:250,
        paddingTop: '56.25%', // 16:9
    }
};



function ProductCard(props) {
    const { classes,product } = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={product.productName}
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {product.name}
                    </Typography>
                    <Typography component="p">
                        {product.description}
                    </Typography>
                    {/*<Typography>*/}
                        {/*{product.productCount!==0 && <span>*/}
                        {/*<span className='discountedPrice'>Rs {product.discountedPrice}</span>*/}
                        {/*<span className="price">Rs {product.productPrice}</span>*/}
                            {/*<span className='discount'>{product.productDiscount}% OFF</span>*/}
                        {/*</span>*/}
                        {/*}*/}

                        {/*{product.productCount===0 && <span className='comingSoon'>Coming Soon</span>}*/}
                    {/*</Typography>*/}
                </CardContent>

                <CardActions>
                    {/*<Button size="small" color="primary">*/}
                        {/*Share*/}
                    {/*</Button>*/}
                    {/*<Button size="small" color="primary">*/}
                        {/*Learn More*/}
                    {/*</Button>*/}
                </CardActions>
            </Card>
        </div>
    );
}


export default withStyles(styles)(ProductCard);
