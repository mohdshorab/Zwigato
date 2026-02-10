import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, InputBox, CustomIonicIcon } from '../../../../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import { hs, ms, vs } from '../../../../utils/Layout';
import { useState } from 'react';
import ContentSeparator from '../../components/ContentSeparator/ContentSeparator';
import { styles } from './OnboardingScreen.styles';

const OnboardingScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) => {
  const [phone, setPhone] = useState('');

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
          <View style={styles.phoneInputContainer}>
            <InputBox title="PHONE" value="+91 " isEditable={false} />
            <View style={styles.flexOne}>
              <InputBox
                placeholder="9875588220"
                noOfLines={1}
                value={phone}
                onChangeText={(t: string) => setPhone(t)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.continueBtnContainer}>
            <AppButton
              title="Send OTP"
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}
              buttonStyle={styles.continueBtn}
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
              onPress={() => {}}
              buttonStyle={styles.appButtonBg}
              textStyle={styles.appButtonText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default OnboardingScreen;
