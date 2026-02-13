import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CommonHeader, ShowAppToast } from '../../../../components';
import OTPInputBox from '../../components/OTPInputBox/OTPInputBox';
import styles from './OTPVerificationScreen.styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect, useMemo, useState } from 'react';
import { validateOTPComplete } from '../../../../utils/helpers/validators';
import {
  clearOtpStates,
  confirmCode,
  signInWithPhone,
} from '../../slices/signInWithPhoneSlice';
import { ms } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';
import { getFirebaseAuthErrorMessage } from '../../../../utils/helpers/errorMessages';
import SendingOtpModal from '../../components/SendingOtpModal/SendingOtpModal';

const OTPVerificationScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'OTPVerificationScreen'>) => {
  const insets = useSafeAreaInsets();
  const { phoneNumber } =
    route?.params ?? useAppSelector(state => state.phoneOTPAuth.phoneNumber);
  const {
    status,
    error,
    verificationId,
    otpVerificationStatus,
    otpVerificationError,
  } = useAppSelector(state => state.phoneOTPAuth);
  const dispatch = useAppDispatch();
  const [showWaitToresend, setShowWaitToresend] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState(0);

  useEffect(() => {
    if (
      otpVerificationStatus === 'rejected' &&
      otpVerificationError &&
      otpVerificationError.length > 0
    ) {
      ShowAppToast(getFirebaseAuthErrorMessage(otpVerificationError), 'error');
    }
    // otpVerificationStatus === 'succeeded' && navigation.replace('HomeScreen');
  }, [otpVerificationStatus, otpVerificationError]);

  useEffect(() => {
    if (status === 'rejected' && error) {
      ShowAppToast(getFirebaseAuthErrorMessage(error), 'error');
    }
  }, [status, error]);

  const maskedPhone = useMemo(() => {
    if (!phoneNumber) return '';
    return (
      phoneNumber.slice(0, 4) +
      '*'.repeat(phoneNumber.slice(4, 12).length) +
      phoneNumber.slice(-4)
    );
  }, [phoneNumber]);

  useEffect(() => {
    if (showWaitToresend) {
      const timeOutTimer = setInterval(() => {
        setTimerCount(prev => {
          if (prev === 1) {
            setShowWaitToresend(false);
            clearInterval(timeOutTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(timeOutTimer);
      };
    }
  }, [showWaitToresend]);

  const handleOTPComplete = (otp: string) => {
    const validationResult = validateOTPComplete(otp);
    if (!!validationResult.isValid) {
      setTimerCount(30);
      dispatch(confirmCode({ code: otp, verificationId }));
    }
    if (!validationResult.isValid)
      ShowAppToast(
        validationResult.error ?? 'Something went wrong. Try again.',
        'error',
      );
  };

  const handleResendOTP = () => {
    dispatch(clearOtpStates());
    setShowWaitToresend(true);
    setTimerCount(30);
    dispatch(signInWithPhone(`${phoneNumber}`));
  };

  useEffect(() => {
    return () => {
      dispatch(clearOtpStates());
    };
  }, []);

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <CommonHeader
        showModalBackButton
        navigation={navigation}
        title="OTP Verification"
      />
      <View style={styles.contentWrapper}>
        <View style={styles.infoSection}>
          <Text style={styles.instructionText}>
            We have sent a verification code
          </Text>
          {!!phoneNumber && (
            <Text style={styles.phoneDisplay}>{maskedPhone}</Text>
          )}
        </View>
        <OTPInputBox onCodeFilled={handleOTPComplete} />
        <View style={styles.resendContainer}>
          <View style={styles.rowLayout}>
            <Text style={styles.instructionText}>Didn't get the OTP?</Text>
            <TouchableOpacity onPress={handleResendOTP}>
              {!showWaitToresend && (
                <Text style={styles.actionLinkText}>Resend OTP</Text>
              )}
            </TouchableOpacity>
            {!!showWaitToresend && (
              <Text style={styles.actionLinkText}>
                wait for {timerCount} seconds..
              </Text>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.footerAction}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryActionText}>Go back to login methods</Text>
      </TouchableOpacity>
      <Modal
        visible={otpVerificationStatus === 'loading'}
        animationType="fade"
        transparent
      >
        <ActivityIndicator
          style={styles.loader}
          color={COLORS.common.black}
          animating
          size={ms(40)}
        />
      </Modal>
      <SendingOtpModal visible={showWaitToresend} />
    </View>
  );
};

export default OTPVerificationScreen;
