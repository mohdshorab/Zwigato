import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';
import { AUTH_ENDPOINTS } from '../../../api/urlConfig';
import { createSlice } from '@reduxjs/toolkit';

interface registerUserProps {
  user: {
    id: string;
    firebaseUid: string;
    phone: string;
    email: string;
    name: string;
    photoURL: string;
    authProvider: 'phoneAuth' | 'googleAuth' | 'emailPassAuth' | 'guest';
    isProfileComplete: boolean;
    createdAt: string;
    lastLoginAt: string;
  } | null;
  token: string;
  status: 'idle' | 'loading' | 'succeeded' | 'rejected';
  error: string | null;
}

const registerUserInitialState: registerUserProps = {
  user: null,
  token: '',
  status: 'idle',
  error: '',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userInfo : any, { rejectWithValue }) => {
    try {
      const result = await apiClient.post(
        `${AUTH_ENDPOINTS.REGISTER}`,
        userInfo,
      );
      return result.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  },
);

const authUserSlice = createSlice({
  name: 'auth/main',
  initialState: registerUserInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        // state.token = action.
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = (action.payload as string) ?? action.error.message;
      });
  },
});

export default authUserSlice.reducer;
