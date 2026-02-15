import {
  getAuth,
  PhoneAuthProvider,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ConfirmCodeProps {
  code: string;
  verificationId: string;
}

interface PhoneAuthState {
  verificationId: string;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'rejected';
  isCodeSent: boolean;
  phoneNumber: string;
  otpVerificationStatus: 'idle' | 'loading' | 'succeeded' | 'rejected';
  otpVerificationError: string | null;
  firebaseUser: any;
}

const initialState: PhoneAuthState = {
  verificationId: '',
  error: null,
  status: 'idle',
  isCodeSent: false,
  phoneNumber: '',
  otpVerificationStatus: 'idle',
  otpVerificationError: '',
  firebaseUser: {},
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

export const confirmCode = createAsyncThunk(
  'auth/confirmCode',
  async ({ code, verificationId }: ConfirmCodeProps, { rejectWithValue }) => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      
      const userCredential = await getAuth().signInWithCredential(credential);
      return {
        firebaseUid: userCredential.user.uid,
        phoneNumber: userCredential.user.phoneNumber
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
    clearOtpStates: state => {
      state.otpVerificationStatus = 'idle';
      state.otpVerificationError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInWithPhone.pending, state => {
        state.status = 'loading';
      })
      .addCase(signInWithPhone.fulfilled, (state, action) => {
        state.verificationId = action.payload.verificationdId ?? '';
        state.phoneNumber = action.payload.phone;
        state.isCodeSent = true;
        state.status = 'succeeded';
      })
      .addCase(signInWithPhone.rejected, (state, action) => {
        state.error = (action.payload as string) ?? action.error.message;
        state.status = 'rejected';
      })
      .addCase(confirmCode.pending, state => {
        state.otpVerificationStatus = 'loading';
      })
      .addCase(confirmCode.fulfilled, (state, action) => {
        state.firebaseUser = action.payload;
        state.otpVerificationStatus = 'succeeded';
      })
      .addCase(confirmCode.rejected, (state, action) => {
        state.otpVerificationStatus = 'rejected';
        state.otpVerificationError =
          (action.payload as string) ?? action.error.message;
      });
  },
});

export const { clearState, clearOtpStates } = phoneAuthSlice.actions;
export default phoneAuthSlice.reducer;
