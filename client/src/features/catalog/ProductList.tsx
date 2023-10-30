import { Product } from "@app/models/product"
import ProductCard from "./ProductCard"
import { Grid } from "@mui/material";

interface Props {
  products: Product[];
}

function ProductList({products}: Props) {
  return (
    <Grid container spacing={3}>
        {
          products.map(product => (
            <Grid item xs={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))
        }
      </Grid>
  )
}

export default ProductList