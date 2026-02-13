import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AppButton,
  InputBox,
  CustomIonicIcon,
  ShowAppToast,
} from '../../../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import { ms, vs } from '../../../../utils/Layout';
import { useEffect, useRef, useState } from 'react';
import ContentSeparator from '../../components/ContentSeparator/ContentSeparator';
import { styles } from './OnboardingScreen.styles';
import {
  validatePhoneComplete,
  validatePhoneInput,
} from '../../../../utils/helpers/validators';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearState, signInWithPhone } from '../../slices/signInWithPhoneSlice';
import SendingOtpModal from '../../components/SendingOtpModal/SendingOtpModal';
import { getFirebaseAuthErrorMessage } from '../../../../utils/helpers/errorMessages';
const COUNTRY_CODE = '+91';
const OnboardingScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) => {
  const dispatch = useAppDispatch();
  const { verificationId, status, error, isCodeSent, phoneNumber } =
    useAppSelector(state => state.phoneOTPAuth);
  const [phone, setPhone] = useState('');
  const [errorString, setErrorString] = useState<string>('');

  const ref = useRef<TextInput>(null);

  useEffect(() => {
    const handleInputRef = () => {
      ref.current?.focus();
    };
    handleInputRef();
  }, []);

  useEffect(() => {
    if (verificationId.length > 0 && status === 'succeeded' && isCodeSent) {
      navigation.navigate('OTPVerificationScreen', {
        phoneNumber: `${COUNTRY_CODE} ${phone}`,
      });
    } else if (status === 'rejected' && error?.length)
      ShowAppToast(getFirebaseAuthErrorMessage(error), 'error');
  }, [verificationId, status, error]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
      setPhone('');
      setErrorString('');
    };
  }, [dispatch]);

  const onChangePhoneText = (t: string) => {
    if (errorString.length > 0) setErrorString('');
    const validationResults = validatePhoneInput(t);
    if (!!validationResults.isValid) {
      setPhone(t);
    }
  };

  const onPressSendOtp = async () => {
    if (error?.length) dispatch(clearState());
    const validate = validatePhoneComplete(phone);
    !validate.isValid
      ? setErrorString(validate.error || '')
      : dispatch(signInWithPhone(`${COUNTRY_CODE} ${phone}`));
  };

  const navigateToHomescreen = () => () => navigation.navigate('HomeScreen');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.titleText}>zwigato</Text>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ------------- Bottomsheet starts ------------- */}
        <ScrollView style={styles.bottomSheet}>
          <Text style={styles.subHeading}>
            Fast as a heartbeat, fresh as a kitchen.
          </Text>
          <ContentSeparator text="Log in or Sign up" />
          <View
            style={[
              styles.phoneInputContainer,
              !errorString.length ? styles.verticalMargin : styles.marginTop,
            ]}
          >
            <InputBox title="PHONE" value={COUNTRY_CODE} isEditable={false} />
            <View style={styles.flexOne}>
              <InputBox
                placeholder="9875588220"
                noOfLines={1}
                value={phone}
                onChangeText={onChangePhoneText}
                keyboardType="numeric"
                ref={ref}
                maxLength={10}
              />
            </View>
          </View>
          {!!errorString.length && (
            <Text style={styles.errorString}>{errorString}</Text>
          )}
          <View style={styles.continueBtnContainer}>
            <AppButton
              title="Send OTP"
              onPress={onPressSendOtp}
              buttonStyle={styles.continueBtn}
              disable={status === 'loading'}
            />
          </View>
          <ContentSeparator text="OR" />
          <View style={styles.socialLoginContainer}>
            <CustomIonicIcon
              name="logo-google"
              size={ms(30)}
              style={styles.socialLoginIcon}
              onPress={() => {}}
            />
            <CustomIonicIcon
              name="mail"
              size={ms(30)}
              style={styles.socialLoginIcon}
              onPress={() => {}}
            />
          </View>
          <ContentSeparator text="Browse First" />
          {/* Bottom Continue as guest  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppButton
              title="Continue as Guest"
              onPress={navigateToHomescreen}
              buttonStyle={styles.appButtonBg}
              textStyle={styles.appButtonText}
            />
          </View>
        </ScrollView>
        <SendingOtpModal visible={status === 'loading'} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default OnboardingScreen;
