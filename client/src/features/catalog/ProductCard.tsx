import agent from "@app/api/agent";
import { Product } from "@app/models/product";

import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from "@mui/material";
import { LoadingButton } from '@mui/lab'
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false)
  
  function handleAddItem(productId: number) {
    setLoading(true);

    agent.Basket.addItem(productId)
      .catch(error => console.log("adding error", productId, error))
      .finally(() => setLoading(false))
  }

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
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small">Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard