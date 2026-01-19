import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { ENDPOINTS } from '../../api/urlConfig';
import { CategoryItem } from '../../types/restaurantCategories';

export interface CategoryState {
  categories: CategoryItem[];
  status: string;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};
export const fetchCategories = createAsyncThunk(
  'restaurants/fetchAllCategories',
  async () => {
    const res = await apiClient.get(`${ENDPOINTS.CATEGORIES}`);
    console.log('CATS' , res?.data)
    return res?.data;
  },
);

const restaurantsCategoriesSlice = createSlice({
  name: 'restaurantsCategoriesSlice',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status == 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default restaurantsCategoriesSlice.reducer;