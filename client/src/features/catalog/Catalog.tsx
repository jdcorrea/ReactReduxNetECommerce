import ProductList from "./ProductList";
import { useEffect } from "react";
import Loading from "@app/layout/Loading";
import { useAppDispatch, useAppSelector } from "@app/store/configureStore";
import { productSelectors, fetchProductsAsync } from "./catalogSlice";

function Catalog() {

  const products = useAppSelector(productSelectors.selectAll)
  const dispatch = useAppDispatch()
  const { productsLoaded, status } = useAppSelector(state => state.catalog)

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded, dispatch])

  if (status === 'pendingFetchProducts') return <Loading message="Loading products..."/>

  return (
    <>
      <ProductList products={products}/>
    </>
  )
}

export default Catalog