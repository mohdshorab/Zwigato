import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './NavigationService';
import { RootStackParamList } from './NavigationTypes';
import SplashScreen from '../features/auth/screens/Splash/SplashScreen';
import OnboardingScreen from '../features/auth/screens/Onboarding/OnboardingScreen';
import OTPVerificationScreen from '../features/auth/screens/OTPVerification/OTPVerificationScreen';
import CompleteProfile from '../features/auth/screens/CompleteProfile/CompleteProfile';
import HomeScreen from '../features/home/screens/HomeScreen';
import RestaurantDetailScreen from '../features/restaurant/screens/RestaurantDetailScreen';
import SearchScreen from '../features/search/screens/SearchScreen';
import { useAppSelector } from '../store/hooks';
import CartSCreen from '../features/cart/screens/CartScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen
      name="OTPVerificationScreen"
      component={OTPVerificationScreen}
    />
    <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen
      name="RestaurantDetailScreen"
      component={RestaurantDetailScreen}
    />
    <Stack.Screen
      options={{
        animation: 'slide_from_right',
      }}
      name="CartScreen"
      component={CartSCreen}
    />
    <Stack.Group
      screenOptions={{ presentation: 'modal', animation: 'slide_from_bottom' }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Group>
  </Stack.Navigator>
);

const RootNavigation = () => {
  const accessToken = useAppSelector(state => state.authUser.accessToken);
  const isRehydrated = useAppSelector(state => state.authUser.isRehydrated);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {accessToken ? (
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
