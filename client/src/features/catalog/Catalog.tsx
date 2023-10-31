import ProductList from "./ProductList";
import { useEffect } from "react";
import Loading from "@app/layout/Loading";
import { useAppDispatch, useAppSelector } from "@app/store/configureStore";
import { productSelectors, fetchProductsAsync, fetchFiltersAsync, setProductParams } from "./catalogSlice";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "@app/components/RadioButtonGroup";

const sortOptions = [
  { value: 'name', label: 'Alphabetical', checked: true },
  { value: 'priceDesc', label: 'Price - High to low', checked: false },
  { value: 'priceAsc', label: 'Price - Low to high', checked: false }
]


function Catalog() {

  const products = useAppSelector(productSelectors.selectAll)
  const dispatch = useAppDispatch()
  const { productsLoaded, status, filtersLoaded, brands, types, productsParams } = useAppSelector(state => state.catalog)

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync())
  }, [dispatch, filtersLoaded])

  if (status === 'pendingFetchProducts') return <Loading message="Loading products..." />

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productsParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
          />
        </Paper>
        <Paper sx={{ mb:2, p:2 }}>
          <FormGroup>
            <FormLabel>Brands</FormLabel>
            {brands.map(brand => (
              <FormControlLabel key={brand} control={<Checkbox />} label={brand} />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ mb:2, p:2 }}>
          <FormGroup>
            <FormLabel>Types</FormLabel>
            {types.map(type => (
              <FormControlLabel key={type} control={<Checkbox />} label={type} />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>
            Displaying 1 - 6 of 20 items
          </Typography>
          <Pagination color='secondary' size='large' count={3} page={2}/>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Catalog