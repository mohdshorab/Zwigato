import { configureStore } from '@reduxjs/toolkit';
import restaurantsReducer from './slices/restaurantsSlice';
import restaurantsCategoriesReducer from './slices/restaurantsCategoriesSlice';
import selectedRestaurantDataReducer from '../features/restaurant/slices/selectedRestaurantDataSlice';
import phoneAuthReducer from '../features/auth/slices/phoneAuthSlice';
import authUserReducer from '../features/auth/slices/authSlice';
import cartReducer from '../features/cart/slices/CartSlice';

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    restaurantsCategories: restaurantsCategoriesReducer,
    selectedRestaurant: selectedRestaurantDataReducer,
    phoneOTPAuth: phoneAuthReducer,
    authUser: authUserReducer,
    cart: cartReducer,
  },
});

// It creates a "map" of your entire initialState from all your slices.
// If you add a new slice tomorrow, this line automatically updates the "map" so you don't have to write the types manually.
export type RootState = ReturnType<typeof store.getState>;

// Standard dispatch (useDispatch) only accepts objects.
// Redux Toolkit's dispatch (store.dispatch) accepts Objects + Functions (Thunks).
// So we get the type of Redux Toolkit's dispatch (store.dispatch) and export this type so our hook (useAppDispatch) know that API calls are allowed.
export type AppDispatch = typeof store.dispatch;
