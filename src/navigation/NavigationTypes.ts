export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  HomeScreen: undefined;
  RestaurantDetailScreen: { restaurantId: number };
  SearchScreen: {
    searchPlaceHolder: string;
    searchMode: 'global' | 'restaurant' | 'orders';
    contextId?: string;
    contextData?: any;
  };
  OTPVerificationScreen: {
    phoneNumber: string;
  };
  CompleteProfile: {
    authProvider: 'phoneAuth' | 'googleAuth' | 'emailPassAuth' | 'guest';
  };
  AuthStack: undefined;
  AppStack: undefined;
  CartScreen: undefined;
};
