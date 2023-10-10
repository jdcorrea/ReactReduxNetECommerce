import agent from "@app/api/agent";
import { Product } from "@app/models/product";
import { RootState } from "@app/store/configureStore";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]> (
  'catalog/fetchProductsAsync',
  async () => {
    try{
      return await agent.Catalog.list()
    }
    catch(error) {
      console.log(error);
    }
  }
)

export const fetchProductAsync = createAsyncThunk<Product, number> (
  'catalog/fetchProductAsync',
  async ( productId ) => {
    try{
      return await agent.Catalog.details(productId)
    }
    catch(error) {
      console.log(error);
    }
  }
)

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: 'idle'
  }),
  reducers: {},
  extraReducers: (builder => {
    // products
    builder.addCase(fetchProductsAsync.pending, state => {
      state.status = 'pendingFetchProducts'
    })
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload)
      state.productsLoaded = true
      state.status = 'idle'
    })
    builder.addCase(fetchProductsAsync.rejected, state => {
      state.status = 'idle'
    })
    // product detail
    builder.addCase(fetchProductAsync.pending, state => {
      state.status = 'pendingFetchProduct'
    })
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload)
      state.status = 'idle'
    })
    builder.addCase(fetchProductAsync.rejected, state => {
      state.status = 'idle'
    })
  })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)