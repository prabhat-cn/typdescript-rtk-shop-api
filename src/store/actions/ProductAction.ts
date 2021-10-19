import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import { RootState } from '../store';

export type productId = string;
export interface Product {
  id: productId;
  name: string;
  preview: string;
  photos: string[];
  description: string;
  size: number[];
  isAccessory: boolean;
  brand: string;
  price: number;
}

// List Products
export const listProducts = createAsyncThunk<
  Product[],
  undefined,
  { state: RootState }
>('listProducts', async (_, thunkAPI) => {
  const response = await API.get('/product');
  // console.log('listProducts', response);
  return response.data as Product[];
});

// Single Product
export const getProduct = createAsyncThunk<
  Product,
  { id: string },
  { state: RootState }
>('getProduct', async ({ id }) => {
  const response = await API.get(`/product/${id}`);
  // console.log('getProduct', response);

  return response.data as Product;
});

export async function getProducts(): Promise<Product[]> {
  const response = await API.get(`/product`);
  return response.data as Product[];
}
