import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';
import { AUTH_ENDPOINTS } from '../../../api/urlConfig';

interface SelectedItem {
  name: string;
  price: number;
  type: 'AddOnOption' | 'CustomizationOption';
}

interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  basePrice: number;
  image: string;
  selectedItems: SelectedItem[];
  quantity: number;
  itemTotal: number;
}

interface AddToCartState {
  cart: CartItem[];
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'rejected';
}

const initialState: AddToCartState = {
  cart: [],
  status: 'idle',
  error: '',
};

export const addToCart = createAsyncThunk<any, any, any>(
  'addToCart',
  async (foodItem, { getState, rejectWithValue }) => {
    try {
      const currentUser = getState().authUser.user;
      const updatedCart = [...(currentUser.cartItems || []), foodItem];
      const result = await apiClient.patch(
        `${AUTH_ENDPOINTS.USERS}/${currentUser.id}`,
        {
          cartItems: updatedCart,
        },
      );
      return result.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const addToCartSlice = createSlice({
  name: 'cart/addToCartSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addToCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cartItems;
        state.status = 'succeeded';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = (action.payload as string) ?? action.error.message;
      });
  },
});

export default addToCartSlice.reducer;
