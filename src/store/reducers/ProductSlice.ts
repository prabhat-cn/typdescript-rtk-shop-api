import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listProducts, Product, getProduct } from '../actions/ProductAction';

export type ProductState = 'LOADING' | 'READY' | 'ERROR';
export type ViewProductState = 'LOADING' | 'READY' | 'ERROR';

export interface ShowProduct {
  products: { [id: string]: Product };
  productsItem: Product[];
  productItem: Product;
  productState: ProductState;
  viewProductState: ViewProductState;
  errorMessage: string;
}

const initialState: ShowProduct = {
  products: {},
  productsItem: [],
  productItem: {} as Product,
  productState: 'READY',
  viewProductState: 'READY',
  errorMessage: '',
};

const ProductSlice = createSlice({
  name: 'products',
  initialState: initialState,

  // normal actions create here
  reducers: {},

  extraReducers: function (builder) {
    // get Products
    builder.addCase(listProducts.pending, (state, action) => {
      state.productState = 'LOADING';
    });
    builder.addCase(
      listProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.productsItem = action.payload;
        state.productState = 'READY';
      }
    );
    builder.addCase(listProducts.rejected, (state, action) => {
      state.productState = 'ERROR';
      state.errorMessage = action.error.message || '';
    });

    // get single Product
    builder.addCase(getProduct.pending, (state, action) => {
      state.viewProductState = 'LOADING';
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, action: PayloadAction<Product>) => {
        // state.viewProductState = action.payload;
        state.viewProductState = 'READY';
      }
    );
    builder.addCase(getProduct.rejected, (state, action) => {
      state.viewProductState = 'ERROR';
      state.errorMessage = action.error.message || '';
    });
  },
});

export default ProductSlice.reducer;