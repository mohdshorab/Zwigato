import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { ENDPOINTS } from '../../api/urlConfig';
import { Restaurant } from '../../types/restaurant';

export interface restaurants {
  items: Restaurant[];
  status: string;
  error: string | null;
}

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchAll',
  async () => {
    const res = await apiClient.get(`${ENDPOINTS.RESTAURANT}`);
    return res?.data;
  },
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRestaurants.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default restaurantsSlice.reducer;
