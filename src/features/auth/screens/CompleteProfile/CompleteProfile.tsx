import React, { useRef, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';

import {
  AppButton,
  CommonHeader,
  CustomIonicIcon,
  InputBox,
  QuickImage,
} from '../../../../components';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import { ms } from '../../../../utils/Layout';
import styles from './CompleteProfile.styles';
import { GENDER_TYPES } from '../../../../utils/constants/ProfileConstants';

const CompleteProfile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CompleteProfile'>) => {
  const [userName, setUserName] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userDob, setUserDob] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userGender, setUserGender] = useState<string>('');
  const ref = useRef(TextInput);

  const onPressOption = (id: number) => {
    const selectedItem = GENDER_TYPES.find(i => i.id === id);
    setUserGender(selectedItem?.dropdownItem ?? '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        title="Complete Profile"
        showBackButton
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBackground} />
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <QuickImage source={''} style={styles.profileImage} />
            <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
              <CustomIonicIcon name="aperture" size={ms(28)} />
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
            <InputBox
              title="Full Name"
              placeholder="Enter your name"
              value={userName}
            />
            <InputBox
              title="Phone Number"
              placeholder="+1 234 567 890"
              value={userPhone}
              keyboardType="numeric"
            />
            <InputBox
              title="Email Address"
              placeholder="example@mail.com"
              value={userEmail}
              keyboardType="email-address"
            />
            <InputBox title="DOB" placeholder="DD/MM/YYYY" value={userDob} />
            <Dropdown
              title="Gender"
              onPressOption={onPressOption}
              optionsArray={GENDER_TYPES}
            />
            <InputBox
              title="Address"
              placeholder="Your home address"
              value={userAddress}
            />
          </View>
          <AppButton
            title="Save"
            onPress={() => {}}
            buttonStyle={styles.buttonSpacing}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfile;
