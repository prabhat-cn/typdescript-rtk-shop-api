import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './reducers/ProductSlice';
import cartReducer from './reducers/CartSlice';
export const store = configureStore({
  reducer: {
    products: ProductSlice,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
