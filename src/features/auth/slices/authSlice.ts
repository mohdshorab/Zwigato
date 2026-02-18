import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';
import { AUTH_ENDPOINTS } from '../../../api/urlConfig';
import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  userName: string;
  userPhone?: string;
  userEmail?: string;
  userDob?: string;
  userAddress?: string;
  userGender?: string;
  userPhoto?: string;
  email: string;
  phone: string;
  orderHistory: any[];
  cartItems: any[];
  recentSearches: any[];
  createdAt: string;
  isProfileComplete: boolean;
  authProvider: string;
  firebaseUid?: string | null;
}
export interface RegisterPayload {
  userName: string;
  userPhone?: string;
  userEmail?: string;
  userDob?: string;
  userAddress?: string;
  userGender?: string;
  userPhoto?: string;
  email: string;
  phone: string;
  orderHistory: any[];
  cartItems: any[];
  recentSearches: any[];
  createdAt: string;
  isProfileComplete: boolean;
  authProvider: string;
  firebaseUid?: string | null;
  password?: string;
}
export interface AuthUserState {
  user: User | null;
  accessToken: string;
  status: 'idle' | 'loading' | 'succeeded' | 'rejected';
  error: string | null;
}

const initialState: AuthUserState = {
  user: null,
  accessToken: '',
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userInfo: RegisterPayload, { rejectWithValue }) => {
    try {
      const result = await apiClient.post(
        `${AUTH_ENDPOINTS.REGISTER}`,
        userInfo,
      );
      return result.data;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data ?? {
          message: 'Registration failed. Please try again.',
        },
      );
    }
  },
);

const authUserSlice = createSlice({
  name: 'auth/main',
  initialState: initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    resetAuthState() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error?.message ?? 'Unknown error';
      });
  },
});

export const { clearAuthError, resetAuthState } = authUserSlice.actions;
export default authUserSlice.reducer;
