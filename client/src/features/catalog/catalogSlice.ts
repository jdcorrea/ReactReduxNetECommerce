import agent from "@app/api/agent";
import { Product, ProductsParams } from "@app/models/product";
import { RootState } from "@app/store/configureStore";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productsParams: ProductsParams
}

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]> (
  'catalog/fetchProductsAsync',
  async ( _, thunkAPI) => {
    try{
      return await agent.Catalog.list()
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const fetchProductAsync = createAsyncThunk<Product, number> (
  'catalog/fetchProductAsync',
  async ( productId, thunkAPI ) => {
    try{
      return await agent.Catalog.details(productId)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const fetchFiltersAsync = createAsyncThunk(
  'catalog/fetchFiltersAsync',
  async (_, thunkAPI) => {
    try {
      return agent.Catalog.fetchFilters();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
    orderBy: 'name'
  }
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    status: 'idle',
    brands: [],
    types: [],
    filtersLoaded: false,
    productsParams: initParams()
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false
      state.productsParams = {
        ...state.productsParams, ...action.payload
      }
    },
    resetProductParams: (state) => {
      state.productsParams = initParams()
    }
  },
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
    builder.addCase(fetchFiltersAsync.pending, state => {
      state.status = 'pendingFetchFilters'
    })
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = 'idle'
    })
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle'
    })
  })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)
export const { setProductParams, resetProductParams } = catalogSlice.actions