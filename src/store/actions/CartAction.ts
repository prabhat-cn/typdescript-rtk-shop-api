import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import { checkout } from '../../app/operation';
import { RootState } from '../store';

export const checkoutCart = createAsyncThunk<
  { success: boolean },
  undefined,
  { state: RootState }
>('checkoutCart', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const items = state.cart.items;
  const response = await checkout(items);
  return response;
});
