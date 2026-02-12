import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface PhoneAuthState {
  verificationId: string;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'rejected';
  isCodeSent: boolean;
  phoneNumber: string;
}

const initialState: PhoneAuthState = {
  verificationId: '',
  error: null,
  status: 'idle',
  isCodeSent: false,
  phoneNumber: '',
};

export const signInWithPhone = createAsyncThunk(
  'auth/signInWithPhone',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
      return {
        verificationdId: confirmation.verificationId,
        phone: phoneNumber,
      };
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  },
);

const phoneAuthSlice = createSlice({
  name: 'auth/phoneAuthStateSlice',
  initialState,
  reducers: {
    clearState: state => {
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInWithPhone.pending, state => {
        state.status = 'loading';
      })
      .addCase(signInWithPhone.fulfilled, (state, action) => {
        console.log('action.payload', action.payload);
        state.verificationId = action.payload.verificationdId ?? '';
        state.phoneNumber = action.payload.phone;
        state.isCodeSent = true;
        state.status = 'succeeded';
      })
      .addCase(signInWithPhone.rejected, (state, action) => {
        state.error = (action.payload as string) ?? action.error.message;
        state.status = 'rejected';
      });
  },
});

export const { clearState } = phoneAuthSlice.actions;
export default phoneAuthSlice.reducer;
