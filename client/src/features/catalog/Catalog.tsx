import ProductList from "./ProductList";
import { useEffect } from "react";
import Loading from "@app/layout/Loading";
import { useAppDispatch, useAppSelector } from "@app/store/configureStore";
import { productSelectors, fetchProductsAsync, fetchFiltersAsync, setProductParams, setPageNumber } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "@app/components/RadioButtonGroup";
import CheckboxButton from "@app/components/CheckboxButton";
import AppPagination from "@app/components/AppPagination";

const sortOptions = [
  { value: 'name', label: 'Alphabetical', checked: true },
  { value: 'priceDesc', label: 'Price - High to low', checked: false },
  { value: 'priceAsc', label: 'Price - Low to high', checked: false }
]


function Catalog() {

  const products = useAppSelector(productSelectors.selectAll)
  const dispatch = useAppDispatch()
  const { productsLoaded, status, filtersLoaded, brands, types, productsParams, metaData } = useAppSelector(state => state.catalog)

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync())
  }, [dispatch, filtersLoaded])

  if (status === 'pendingFetchProducts' || !metaData) return <Loading message="Loading products..." />
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productsParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButton
            items={types}
            checked={productsParams.types ?? []}
            onChange={(items: string[]) => dispatch(setPageNumber({ types: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButton
            items={brands}
            checked={productsParams.brands ?? []}
            onChange={(items: string[]) => dispatch(setPageNumber({ brands: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={9} sx={{mb:2}}>
        <AppPagination
          metaData={metaData}
          onPageChange={(page: number) => dispatch(setProductParams({pageNumber: page}))}
        />
      </Grid>
    </Grid>
  )
}

export default Catalog