import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/screens/Splash/SplashScreen';
import OnboardingScreen from '../features/auth/screens/Onboarding/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { RootStackParamList } from './NavigationTypes';
import HomeScreen from '../features/home/screens/HomeScreen';
import RestaurantDetailScreen from '../features/restaurant/screens/RestaurantDetailScreen';
import SearchScreen from '../features/search/screens/SearchScreen';
import OTPVerificationScreen from '../features/auth/screens/OTPVerification/OTPVerificationScreen';
import CompleteProfile from '../features/auth/screens/CompleteProfile/CompleteProfile';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator.Navigator
        initialRouteName={'Splash'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <StackNavigator.Screen name={'Splash'} component={SplashScreen} />
        <StackNavigator.Screen
          name={'Onboarding'}
          component={OnboardingScreen}
        />
        <StackNavigator.Screen name={'HomeScreen'} component={HomeScreen} />
        <StackNavigator.Screen
          name={'RestaurantDetailScreen'}
          component={RestaurantDetailScreen}
        />
        <StackNavigator.Screen
          name={'CompleteProfile'}
          component={CompleteProfile}
        />
        <StackNavigator.Group
          screenOptions={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          }}
        >
          <StackNavigator.Screen name="SearchScreen" component={SearchScreen} />
          <StackNavigator.Screen
            name="OTPVerificationScreen"
            component={OTPVerificationScreen}
          />
        </StackNavigator.Group>
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
