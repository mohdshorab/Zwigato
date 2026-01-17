import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import { QuickImage } from '../../../../components';
import { iconSplash } from '../../../../assets/images';
import styles from './SplashScreen.styles';
import { StatusBar, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';
import { fetchRestaurants } from '../../../home/slices/restaurantsSlice';

const SplashScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Splash'>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      // createAsyncThunk always returns a resolved Promise, even if the API call fails
      // With .unwrap(): It "unpacks" the result. If the call was successful, it returns the payload.
      // If the call failed, it throws an error, which allows your try/catch block to actually catch it.
      dispatch(fetchRestaurants())
        .unwrap()
        .then(() => {
          navigation.navigate('Onboarding');
        });
    } catch (e) {
      console.error('SOMETHING WENT WRONG!');
      navigation.navigate('Onboarding');
    }
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <QuickImage
        source={iconSplash}
        style={styles.iconSplash}
        resizeMode="contain"
      />
      {/* <ActivityIndicator size={'large'} color={COLORS.primary} /> */}
      <Text style={styles.bottomText}>Loading your 5-star experience...</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
