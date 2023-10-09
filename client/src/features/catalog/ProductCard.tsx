import { Product } from "@app/models/product";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import { Link } from "react-router-dom";
import { currencyFormat } from "@app/util/util";
import { useAppDispatch, useAppSelector } from "@app/store/configureStore";
import { addBasketItemAsync } from "@features/baskets/basketSlice";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { status } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()

  return (
    <Card>
      <CardHeader 
        avatar={
          <Avatar sx={{bgcolor: 'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: 'bold',
            color: 'primary.main'
          }
        }}
      />
      <CardMedia
        image={product.pictureUrl}
        sx={{
          height: 140, 
          backgroundSize: 'contain',
          bgcolor: 'primary.light'
        }}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes(`pendingAddItem${product.id}`)}
          onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
          size="small">Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard