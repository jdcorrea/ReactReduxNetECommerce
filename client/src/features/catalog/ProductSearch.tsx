import { useAppDispatch, useAppSelector } from "@app/store/configureStore"
import { TextField, debounce } from "@mui/material"
import { setProductParams } from "./catalogSlice"
import { useState } from "react"

function ProductSearch() {
  const { productsParams } = useAppSelector(state => state.catalog)
  const [searchTerm, setSearchTerm] = useState(productsParams.searchTerm)
  const dispatch = useAppDispatch()

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({searchTerm: event.target.value}))
  }, 1000)

  return (
    <TextField
      label='Search products'
      variant='outlined'
      fullWidth
      value={searchTerm ?? []}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(event: any) => {
        setSearchTerm(event.target.value)
        debouncedSearch(event)
      }}
    />
  )
}

export default ProductSearch