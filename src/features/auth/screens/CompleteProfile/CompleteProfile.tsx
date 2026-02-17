import React, { useEffect, useRef, useState } from 'react';
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
} from '../../../../components';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { hs, ms } from '../../../../utils/Layout';
import styles from './CompleteProfile.styles';
import { GENDER_TYPES } from '../../../../utils/constants/ProfileConstants';
import {
  validateEmailInput,
  validatePhoneInput,
} from '../../../../utils/helpers/validators';
import { useAppDispatch } from '../../../../store/hooks';
import { registerUser } from '../../slices/authSlice';

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
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CompleteProfile'>) => {
  const [userProfileForm, setUserProfileForm] = useState<userForm>({
    userName: '',
    userPhone: '',
    userEmail: '',
    userDob: '',
    userAddress: '',
    userGender: '',
    userPhoto: '',
  });
  const [phoneErrorString, setPhoneErrorString] = useState('');
  const [emailErrorString, setEmailErrorString] = useState('');
  const ref = useRef<TextInput>(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const validatePhone = (phone: string) => {
    const results = validatePhoneInput(phone);
    results.isValid
      ? updateUserFormField('userPhone', phone)
      : setPhoneErrorString(results.error || 'Wrong Input!');
  };

  const validateEmail = (email: string) => {
    const results = validateEmailInput(email);
    results.isValid
      ? updateUserFormField('userEmail', email)
      : setEmailErrorString(results.error || 'Wrong Input!');
  };

  const updateUserFormField = (key: keyof userForm, value: string) => {
    if (key === 'userPhone') setPhoneErrorString('');
    if (key === 'userEmail') setEmailErrorString('');

    setUserProfileForm(prev => ({ ...prev, [key]: value }));
  };

  const onPressOption = (id: number) => {
    const selectedItem = GENDER_TYPES.find(i => i.id === id);
    updateUserFormField('userGender', selectedItem?.dropdownItem || '');
  };

  const getInfo = () => {
console.log(userProfileForm)
  };

  const onPressImagePicker = async () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CommonHeader
          title="Complete Profile"
          showBackButton
          navigation={navigation}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
                title="Full Name"
                placeholder="Enter your name"
                value={userProfileForm.userName}
                onChangeText={t => updateUserFormField('userName', t)}
              />
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
                    onChangeText={validatePhone}
                  />
                </View>
              </View>
              {!!phoneErrorString.length &&
                userProfileForm.userPhone.length !== 10 && (
                  <Text style={styles.errorString}>{phoneErrorString}</Text>
                )}
              <InputBox
                title="Email Address"
                placeholder="example@mail.com"
                value={userProfileForm.userEmail}
                keyboardType="email-address"
                onChangeText={validateEmail}
              />
              {!!emailErrorString.length && (
                <Text style={styles.errorString}>{emailErrorString}</Text>
              )}
              <InputBox
                title="DOB"
                placeholder="DD/MM/YYYY"
                value={userProfileForm.userDob}
                onChangeText={t => updateUserFormField('userDob', t)}
              />
              <Dropdown
                title="Gender"
                onPressOption={onPressOption}
                optionsArray={GENDER_TYPES}
              />
              <InputBox
                title="Address"
                placeholder="Your home address"
                value={userProfileForm.userAddress}
                onChangeText={t => updateUserFormField('userAddress', t)}
              />
            </View>
            <AppButton
              title="Save"
              onPress={getInfo}
              buttonStyle={styles.buttonSpacing}
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
