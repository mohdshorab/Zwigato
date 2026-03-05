import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';
import { AUTH_ENDPOINTS } from '../../../api/urlConfig';
import { createSlice } from '@reduxjs/toolkit';
import { Storage } from '../../../utils/storage';

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
  isRehydrated: boolean;
  existingUser: User | null;
  checkUserStatus: 'idle' | 'loading' | 'succeeded' | 'rejected';
}

const initialState: AuthUserState = {
  user: null,
  accessToken: '',
  status: 'idle',
  error: null,
  isRehydrated: false,
  existingUser: null,
  checkUserStatus: 'idle',
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const result = await apiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);
      return result.data;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data ?? { message: 'Login failed. Please try again.' },
      );
    }
  },
);

export const checkUserExists = createAsyncThunk(
  'auth/checkUserExists',
  async (
    payload: {
      authProvider: 'phoneAuth' | 'googleAuth';
      identifier: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const field = payload.authProvider === 'phoneAuth' ? 'phone' : 'email';
      const url = `${AUTH_ENDPOINTS.USERS}?${field}=${encodeURIComponent(
        payload.identifier,
      )}`;
      const result = await apiClient.get(url);
      return result.data.length > 0 ? result.data[0] : null;
    } catch (e: any) {
      return rejectWithValue(
        e.response?.data ?? {
          message: 'Unable to verify account. Please try again.',
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
    logout() {
      Storage.removeItem('auth-token');
      Storage.removeItem('user');
      return {
        ...initialState,
        isRehydrated: true,
      };
    },
    rehydrateAuth(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = 'succeeded';
      state.isRehydrated = true;
    },
    setRehydrated(state) {
      state.isRehydrated = true;
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
        Storage.setItem('auth-token', action.payload.accessToken);
        Storage.setObject('user', action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error =
          (action.payload as any)?.message ??
          action.error?.message ??
          'Unknown error';
      })
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = 'succeeded';
        Storage.setItem('auth-token', action.payload.accessToken);
        Storage.setObject('user', action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error =
          (action.payload as any)?.message ??
          action.error?.message ??
          'Unknown error';
      })
      .addCase(checkUserExists.pending, state => {
        state.checkUserStatus = 'loading';
        state.error = null;
      })
      .addCase(checkUserExists.fulfilled, (state, action) => {
        state.checkUserStatus = 'succeeded';
        state.existingUser = action.payload;
      })
      .addCase(checkUserExists.rejected, (state, action) => {
        state.checkUserStatus = 'rejected';
        state.error = (action.payload as any)?.message ?? 'Unknown error';
      });
  },
});

export const { clearAuthError, logout, rehydrateAuth, setRehydrated } =
  authUserSlice.actions;
export default authUserSlice.reducer;
