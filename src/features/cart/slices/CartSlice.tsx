import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';
import { AUTH_ENDPOINTS } from '../../../api/urlConfig';
import { fetchCurrentUser } from '../../auth/slices/authSlice';
import { RootState } from '../../../store/store';
export interface SelectedItem {
  name: string;
  price: number;
  type?: 'AddOnOption' | 'CustomizationOption';
}

export interface CartItem {
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
  error: null,
};

export const addToCart = createAsyncThunk<
  any,
  Partial<CartItem>,
  { state: RootState }
>('cart/addToCart', async (foodItem, { getState, rejectWithValue }) => {
  try {
    const currentUser = getState().authUser.user;
    if (!currentUser) return rejectWithValue('No user found');
    const existingCart: CartItem[] = getState().cart.cart;
    const updatedCart = [...existingCart, foodItem];
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
});

export const incrementCartItem = createAsyncThunk<
  any,
  string,
  { state: RootState }
>(
  'cart/incrementCartItem',
  async (fingerprint, { getState, rejectWithValue }) => {
    try {
      const currentUser = getState().authUser.user;
      if (!currentUser) return rejectWithValue('No user found');
      const cartItems = getState().cart.cart;
      const updatedCart = cartItems.map((i: CartItem) =>
        i.cartItemId === fingerprint
          ? {
              ...i,
              quantity: i.quantity + 1,
              itemTotal: (i.itemTotal / i.quantity) * (i.quantity + 1),
            }
          : i,
      );

      const result = await apiClient.patch(
        `${AUTH_ENDPOINTS.USERS}/${currentUser.id}`,
        { cartItems: updatedCart },
      );
      return result.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const decrementCartItem = createAsyncThunk<
  any,
  string,
  { state: RootState }
>(
  'cart/decrementCartItem',
  async (fingerprint: string, { getState, rejectWithValue }) => {
    try {
      const currentUser = getState().authUser.user;
      if (!currentUser) return rejectWithValue('No user found');
      const cartItems = getState().cart.cart;
      const item: CartItem | undefined = cartItems.find(
        (i: CartItem) => i.cartItemId === fingerprint,
      );

      const updatedCart = item
        ? item.quantity > 1
          ? cartItems.map((i: CartItem) =>
              i.cartItemId === fingerprint
                ? {
                    ...i,
                    quantity: i.quantity - 1,
                    itemTotal: (i.itemTotal / i.quantity) * (i.quantity - 1),
                  }
                : i,
            )
          : cartItems.filter((i: CartItem) => i.cartItemId !== fingerprint)
        : cartItems;

      const result = await apiClient.patch(
        `${AUTH_ENDPOINTS.USERS}/${currentUser.id}`,
        { cartItems: updatedCart },
      );
      return result.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart/cartSlice',
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
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.cart = action.payload.cartItems ?? [];
      })
      .addCase(incrementCartItem.pending, state => {
        state.status = 'loading';
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.cartItems;
        state.status = 'succeeded';
      })
      .addCase(incrementCartItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = (action.payload as string) ?? action.error.message;
      })
      .addCase(decrementCartItem.pending, state => {
        state.status = 'loading';
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.cartItems;
        state.status = 'succeeded';
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = (action.payload as string) ?? action.error.message;
      });
  },
});

export default cartSlice.reducer;
