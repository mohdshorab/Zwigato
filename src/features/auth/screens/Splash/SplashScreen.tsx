import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import { QuickImage, ShowAppToast } from '../../../../components';
import { iconSplash } from '../../../../assets/images';
import styles from './SplashScreen.styles';
import { StatusBar, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useEffect } from 'react';
import { fetchRestaurants } from '../../../../store/slices/restaurantsSlice';
import { fetchCategories } from '../../../../store/slices/restaurantsCategoriesSlice';

const SplashScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Splash'>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // createAsyncThunk always returns a resolved Promise, even if the API call fails
      // With dispatch(fetchCategories()).unwrap(): It "unpacks" the result. If the call was successful, it returns the payload.
      // If the call failed, it throws an error, which allows your try/catch block to actually catch it.
      // Promise.allSettled returns an Array of Objects like [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }].
      // The order of these objects in the results array matches exactly the order of the promises you provided in the input array.
      // Whether your dispatch(anyThunk()) succeeded or rejected, the allSettled Promise itself will ALWAYS resolve. It never reaches the catch section
      const timer = new Promise<void>(resolve =>
        setTimeout(() => resolve(), 2000),
      );
      const promiseObject = await Promise.allSettled([
        dispatch(fetchRestaurants()),
        dispatch(fetchCategories()),
        timer,
      ]);
      const anyRejection = promiseObject.find(t => t.status == 'rejected');
      anyRejection && ShowAppToast('Something went wrong!', 'error');
      navigation.replace('Onboarding');
    };
    fetchData();
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
