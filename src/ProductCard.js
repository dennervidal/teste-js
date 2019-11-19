import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    media: {
        height: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default function ProductCard({
    imageUrl,
    productName,
    productPrice,
    addToCart,
    productId,
    cartList
}) {
    const classes = useStyles();
    const addProduct = () => {
        addToCart([
            ...cartList,
            {
              id: productId,
              name: productName,
              price: productPrice,
              qty: 1
            }
        ]);
    };
    return (
        <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card>
                <CardActionArea>
                    <CardMedia className={classes.media}>
                        <img src={imageUrl} alt={productName} width="95%"/>
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            { productName }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            $ { productPrice }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={addProduct}>
                        Adicionar ao carrinho
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}