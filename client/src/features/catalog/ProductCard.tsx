import { Product } from "@app/models/product";

import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from "@mui/material";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
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
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard