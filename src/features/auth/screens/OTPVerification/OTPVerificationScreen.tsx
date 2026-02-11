import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CommonHeader } from '../../../../components';
import OTPInputBox from '../../components/OTPInputBox/OTPInputBox';
import styles from './OTPVerificationScreen.styles';

const OTPVerificationScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'OTPVerificationScreen'>) => {
  const insets = useSafeAreaInsets();
  const { phoneNumber } = route?.params || {};

  const handleOTPComplete = async (otp: string) => {
    console.log('OTP Filled:', otp);
  };

  const handleResendOTP = () => {
    console.log('Resending OTP...');
  };

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
            We have sent a verification code to
          </Text>
          <Text style={styles.phoneDisplay}>{phoneNumber}</Text>
        </View>
        <OTPInputBox onCodeFilled={handleOTPComplete} />
        <View style={styles.resendContainer}>
          <View style={styles.rowLayout}>
            <Text style={styles.instructionText}>Didn't get the OTP?</Text>
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={styles.actionLinkText}>Resend SMS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.footerAction}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryActionText}>Go back to login methods</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPVerificationScreen;
