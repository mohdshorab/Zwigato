import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import {
  AppButton,
  CommonHeader,
  CustomIonicIcon,
  ImagePickerModal,
  InputBox,
  QuickImage,
  ShowAppToast,
} from '../../../../components';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { ms } from '../../../../utils/Layout';
import styles from './CompleteProfile.styles';
import { GENDER_TYPES } from '../../../../utils/constants/ProfileConstants';
import {
  validateAddress,
  validateEmailComplete,
  validateEmailInput,
  validateName,
  validatePhoneComplete,
  validatePhoneInput,
} from '../../../../utils/helpers/validators';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { RegisterPayload, registerUser } from '../../slices/authSlice';
import DeliveryCalendar from '../../../../components/DeliveryCalendar/DeliveryCalendar';

type userForm = {
  userName: string;
  userPhone: string;
  userEmail: string;
  userDob: string;
  userAddress: string;
  userGender: string;
  userPhoto: string;
};

const CompleteProfile = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CompleteProfile'>) => {
  const { authProvider } = route?.params;
  const [userProfileForm, setUserProfileForm] = useState<userForm>({
    userName: '',
    userPhone: '',
    userEmail: '',
    userDob: '',
    userAddress: '',
    userGender: '',
    userPhoto: '',
  });
  const [nameErrorString, setNameErrorString] = useState('');
  const [addressErrorString, setAddressErrorString] = useState('');
  const [phoneErrorString, setPhoneErrorString] = useState('');
  const [emailErrorString, setEmailErrorString] = useState('');

  const ref = useRef<TextInput>(null);

  const [showModal, setShowModal] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useAppDispatch();

  const { accessToken, error, status } = useAppSelector(
    state => state.authUser,
  );

  const phoneAuthData = useAppSelector(state => state.phoneOTPAuth);

  const activeUser = useMemo(() => {
    if (authProvider === 'phoneAuth')
      return {
        authProvider: authProvider,
        fbUid: phoneAuthData.firebaseUser?.firebaseUid,
        phoneNumber: phoneAuthData.firebaseUser?.phoneNumber,
      };
    // TODO : later
    // if (authProvider === 'googleSignIn')
  }, [authProvider, phoneAuthData]);

  useEffect(() => {
    if (activeUser?.authProvider === 'phoneAuth') {
      setUserProfileForm(prev => ({
        ...prev,
        userPhone: activeUser.phoneNumber?.replace('+91', '') || '',
      }));
    }
  }, [activeUser]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    !!error && ShowAppToast(error, 'error');
  }, [error]);

  useEffect(() => {
    if (status === 'succeeded' && accessToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    }
  }, [status, accessToken, navigation]);

  const updateUserFormField = (key: keyof userForm, value: string) => {
    if (key === 'userPhone') setPhoneErrorString('');
    if (key === 'userEmail') setEmailErrorString('');
    if (key === 'userPhone') setPhoneErrorString('');
    if (key === 'userEmail') setEmailErrorString('');
    if (key === 'userName') setNameErrorString('');
    if (key === 'userAddress') setAddressErrorString('');
    setUserProfileForm(prev => ({ ...prev, [key]: value }));
  };

  const validateAndSetName = (name: string) => {
    updateUserFormField('userName', name);
    const result = validateName(name);
    if (!result.isValid) setNameErrorString(result.error);
  };

  const validateAndSetPhone = (phone: string) => {
    updateUserFormField('userPhone', phone);
    const result = validatePhoneInput(phone);
    if (!result.isValid)
      setPhoneErrorString(result.error || 'Invalid phone number.');
  };

  const validateAndSetEmail = (email: string) => {
    updateUserFormField('userEmail', email);
    const result = validateEmailInput(email);
    if (!result.isValid)
      setEmailErrorString(result.error || 'Invalid email address.');
  };

  const validateAndSetAddress = (address: string) => {
    updateUserFormField('userAddress', address);
    const result = validateAddress(address);
    if (!result.isValid) setAddressErrorString(result.error);
  };

  const onPressOption = (id: number) => {
    const selectedItem = GENDER_TYPES.find(i => i.id === id);
    updateUserFormField('userGender', selectedItem?.dropdownItem || '');
  };

  const isFormValid = (): boolean => {
    const nameOk = validateName(userProfileForm.userName).isValid;
    const phoneOk = validatePhoneComplete(userProfileForm.userPhone).isValid;
    const addressOk = validateAddress(userProfileForm.userAddress).isValid;
    const emailOk =
      !userProfileForm.userEmail ||
      validateEmailComplete(userProfileForm.userEmail).isValid;
    const dobOk = userProfileForm.userDob.length > 0;
    return nameOk && phoneOk && addressOk && emailOk && dobOk;
  };

  const profileInfoSubmission = () => {
    if (!isFormValid()) return;

    const finalPayload: RegisterPayload = {
      userName: userProfileForm.userName,
      phone: activeUser?.phoneNumber || `+91${userProfileForm.userPhone}`,
      userEmail: userProfileForm.userEmail,
      userDob: userProfileForm.userDob,
      userAddress: userProfileForm.userAddress,
      userGender: userProfileForm.userGender,
      userPhoto: userProfileForm.userPhoto,
      orderHistory: [],
      cartItems: [],
      recentSearches: [],
      createdAt: new Date().toISOString(),
      email: userProfileForm.userEmail,
      password: activeUser?.fbUid,
      firebaseUid: activeUser?.fbUid || null,
      isProfileComplete: true,
      authProvider: authProvider,
    };

    dispatch(registerUser(finalPayload));
  };
  const onPressImagePicker = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const handleDateSelection = (date: string) => {
    updateUserFormField('userDob', date);
    setShowCalendar(false);
  };

  const isLoading = status === 'loading';

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        title="Complete Your Profile"
        showBackButton
        navigation={navigation}
      />
      <KeyboardAvoidingView
        style={styles.flexOnly}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={styles.headerBackground} />
          <View style={styles.card}>
            <View style={styles.avatarContainer}>
              <QuickImage
                source={userProfileForm.userPhoto}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editBadge}
                activeOpacity={0.8}
                onPress={onPressImagePicker}
              >
                <CustomIonicIcon name="aperture" size={ms(28)} />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <InputBox
                ref={ref}
                title="Full Name*"
                placeholder="Enter your name"
                value={userProfileForm.userName}
                onChangeText={validateAndSetName}
              />
              {!!nameErrorString && (
                <Text style={styles.fieldError}>{nameErrorString}</Text>
              )}
              <View style={styles.phoneRow}>
                <InputBox
                  title="Code"
                  value={'+91'}
                  keyboardType="numeric"
                  isEditable={false}
                />

                <View style={styles.phoneInputContainer}>
                  <InputBox
                    title="Phone Number"
                    placeholder="9875588220"
                    value={userProfileForm.userPhone}
                    keyboardType="numeric"
                    onChangeText={validateAndSetPhone}
                    isEditable={
                      !(
                        activeUser?.phoneNumber &&
                        activeUser.phoneNumber?.length > 0
                      )
                    }
                  />
                </View>
              </View>
              {!!phoneErrorString.length &&
                userProfileForm.userPhone.length !== 10 && (
                  <Text style={styles.fieldError}>{phoneErrorString}</Text>
                )}
              <InputBox
                title="Email Address*"
                placeholder="example@mail.com"
                value={userProfileForm.userEmail}
                keyboardType="email-address"
                onChangeText={validateAndSetEmail}
              />
              {!!emailErrorString.length && (
                <Text style={styles.fieldError}>{emailErrorString}</Text>
              )}

              <TouchableOpacity
                onPress={() => setShowCalendar(true)}
                activeOpacity={0.7}
              >
                <View pointerEvents="none">
                  <InputBox
                    title="Date of Birth*"
                    placeholder="YYYY-MM-DD"
                    value={userProfileForm.userDob}
                    isEditable={false}
                  />
                </View>
              </TouchableOpacity>

              {showCalendar && (
                <DeliveryCalendar
                  visible={showCalendar}
                  initialDate={userProfileForm.userDob}
                  onClose={() => setShowCalendar(false)}
                  onDateSelect={handleDateSelection}
                />
              )}
              <Dropdown
                title="Gender"
                onPressOption={onPressOption}
                optionsArray={GENDER_TYPES}
              />
              <InputBox
                title="Address"
                placeholder="Your home address"
                value={userProfileForm.userAddress}
                onChangeText={validateAndSetAddress}
              />
              {!!addressErrorString && (
                <Text style={styles.fieldError}>{addressErrorString}</Text>
              )}
            </View>
            <AppButton
              title={isLoading ? 'Saving...' : 'Complete Profile'}
              onPress={profileInfoSubmission}
              disable={isLoading || !isFormValid()}
              buttonStyle={[
                styles.submitBtn,
                (!isFormValid() || isLoading) && styles.submitBtnDisabled,
              ]}
            />
          </View>
        </ScrollView>
        <ImagePickerModal
          showModal={showModal}
          onClose={onClose}
          returnUserPhoto={uri => updateUserFormField('userPhoto', uri)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CompleteProfile;
