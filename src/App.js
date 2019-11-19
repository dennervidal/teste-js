import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {makeStyles, Snackbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ProductCard from "./ProductCard";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {TabPanel} from "./TabPanel";
import {CartTable} from "./CartTable";

const PRODUCTS = gql`
   query productsList {
    allProducts {
      id
      name
      iconUrl
      price
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(PRODUCTS);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [cart, setCart] = React.useState([]);
  const products = data && data.allProducts.map(({iconUrl, name, price, id}) => (
      <ProductCard productName={name} imageUrl={iconUrl} productPrice={price} key={id} productId={id} addToCart={setCart} cartList={cart}/>
  ));

  return (
      <div className={classes.root}>
        <AppBar position='sticky' style={{height: '56px'}}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Tecsinapse Store
            </Typography>
            <Tabs value={value} onChange={handleChange} aria-label="store tabs">
              <Tab label="Produtos" {...a11yProps(0)} />
              <Tab label="Carrinho" {...a11yProps(1)} />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Container style={{marginTop: '18px'}}>
          <TabPanel value={value} index={0}>
            {!error? !loading?
                <Grid container
                      spacing={3}
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                >
                  {products}
                </Grid>
                : <CircularProgress /> : <Snackbar variant="error" open={error} message="Erro ao carregar :(" />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {cart.length > 0?
                <CartTable cartList={cart} />
                : <Snackbar variant="error" open={true} message="Nenhum produto adicionado ainda :(" />}
          </TabPanel>

        </Container>
        </div>
  );
}

export default App;
