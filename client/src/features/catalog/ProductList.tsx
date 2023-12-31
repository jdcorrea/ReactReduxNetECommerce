import { Product } from "@app/models/product"
import ProductCard from "./ProductCard"
import { Grid } from "@mui/material";
import { useAppSelector } from "@app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

function ProductList({products}: Props) {
  const {productsLoaded} = useAppSelector(state => state.catalog)
  return (
    <Grid container spacing={3}>
        {
          products.map(product => (
            <Grid item xs={4} key={product.id}>
              {!productsLoaded ? (
                <ProductCardSkeleton />
              ) : (
              <ProductCard product={product} />
              )}
            </Grid>
          ))
        }
      </Grid>
  )
}

export default ProductList