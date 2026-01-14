import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../features/auth/screens/Splash/SplashScreen';
import OnboardingScreen from '../features/onboarding/screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { RootStackParamList } from './types';

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
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
