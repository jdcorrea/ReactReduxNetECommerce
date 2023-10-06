import Typography from '@mui/material/Typography'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Grid, Button } from "@mui/material"
import { Add, Delete, Remove } from "@mui/icons-material"
import agent from '@app/api/agent';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { currencyFormat } from '@app/util/util';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/store/configureStore';
import { removeItem, setBasket } from './basketSlice';


function BasketPage() {
  const { basket } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  })

  function handleAddItem(productId: number, name: string) {
    setStatus({loading: true, name});
    agent.Basket.addItem(productId)
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name}))
  }

  function handleRemoveItem(productId: number, quantity: number = 1, name: string) {
    setStatus({loading: true, name});
    agent.Basket.removeItem(productId, quantity)
      .then(() => dispatch(removeItem({productId, quantity})))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name}))
  }

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name}
                      style={{height: 50, marginRight: 20}}/>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton loading={status.loading && status.name === `rem${item.productId}`}
                    color='error'
                    onClick={() => handleRemoveItem(item.productId, 1, `rem${item.productId}`)}
                  >
                    <Remove/>
                  </LoadingButton>
                    {item.quantity}
                  <LoadingButton loading={status.loading && status.name === `add${item.productId}`}
                    color='success'
                    onClick={() => handleAddItem(item.productId, `add${item.productId}`)}
                  >
                    <Add />
                  </LoadingButton>  
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status.loading && status.name === `del${item.productId}`}
                    color='error'
                    onClick={() => handleRemoveItem(item.productId, item.quantity, `del${item.productId}`)}
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default BasketPage