import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';
import { ENDPOINTS } from '../../../api/urlConfig';

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchAll',
  async () => {
    const res = await apiClient.get(`${ENDPOINTS.RESTAURANT}`);
    return res?.data;
  },
);

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRestaurants.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('PAYLOAD', action.payload);
        state.items = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default restaurantsSlice.reducer;
