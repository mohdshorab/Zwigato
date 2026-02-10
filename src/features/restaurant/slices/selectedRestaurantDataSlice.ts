import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';
import { ENDPOINTS } from '../../../api/urlConfig';
import { Restaurant } from '../../../types/restaurant';

export interface SelectedRestaurantState {
  restaurant: Restaurant | null;
  status: 'rejected' | 'suceeded' | 'loading' | string;
  error: string | null;
}

const initialState: SelectedRestaurantState = {
  restaurant: null,
  status: 'idle',
  error: null,
};

export const fetchSelectedRestaurantData = createAsyncThunk(
  'restaurants/fetchSelectedRestaurantData',
  async (id: number) => {
    const res = await apiClient.get(`${ENDPOINTS.RESTAURANT}/${id}`);
    return res?.data;
  },
);

const selectedRestaurantDataSlice = createSlice({
  name: 'selectedRestaurantDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSelectedRestaurantData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSelectedRestaurantData.fulfilled, (state, action) => {
        state.restaurant = action.payload;
        state.status = 'suceeded';
      })
      .addCase(fetchSelectedRestaurantData.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default selectedRestaurantDataSlice.reducer;
