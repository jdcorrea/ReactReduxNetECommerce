import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '@app/models/product'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import agent from '@app/api/agent'
import NotFound from '@app/errors/NotFound'
import Loading from '@app/layout/Loading'
import { currencyFormat } from '@app/util/util'
import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch, useAppSelector } from '@app/store/configureStore'
import { addBasketItemAsync, removeBasketItemAsync } from '@features/baskets/basketSlice'
import { fetchProductAsync, productSelectors } from './catalogSlice'

function ProductDetails() {
  const { basket, status: statusBasket } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()
  const { id } = useParams<{id: string}>()
  const product = useAppSelector(state => productSelectors.selectById(state, id!))
  const { status: statusProduct } = useAppSelector(state => state.catalog)
  const [quantity, setQuantity] = useState(0)
  const item = basket?.items.find(i => i.productId === product?.id)

  useEffect(() => {
    if (item) setQuantity(item.quantity)
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)))
  }, [id, item, dispatch, product])

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value))
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity){
      const updatedQuantity = item ? quantity - item.quantity : quantity
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity}))
    } else {
      const updatedQuantity = item.quantity - quantity
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity, name: item.name}))
    }
  }
  
  if (statusProduct === 'pendingFetchProduct') return <Loading message='Loading product detail...'/>

  if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} 
          alt={product.name}
          style={{width: '100%'}}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb: 2}} />
        <Typography variant='h4' color='secondary'>{currencyFormat(product.price)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={item?.quantity === quantity || !item && quantity === 0}
              loading={
                statusBasket.includes('pending')
              }
              onClick={handleUpdateCart}
              sx={{height: '55px'}}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
            >
              {item ? 'Update Quantity' : 'Add to Card'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProductDetails