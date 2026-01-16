import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/screens/Splash/SplashScreen';
import OnboardingScreen from '../features/onboarding/screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { RootStackParamList } from './NavigationTypes';
import HomeScreen from '../features/home/HomeScreen';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator.Navigator
        initialRouteName={'Onboarding'}
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
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
