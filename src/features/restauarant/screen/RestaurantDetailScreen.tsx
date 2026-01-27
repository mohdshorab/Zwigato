import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import { fetchSelectedRestaurantData } from '../slices/selectedRestaurantDataSlice';
import { styles } from './RestaurantDetailScreen.styles';

const RestaurantDetailScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'RestaurantDetailScreen'>) => {
  const { restaurantId } = route.params;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSelectedRestaurantData(Number(restaurantId)));
  }, [restaurantId, dispatch]);
  const { restaurant, status , error } = useAppSelector(
    state => state.selectedRestaurant,
  );
  if (status === 'loading')
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={ styles.mainContainer }>
      <Text>
        {restaurantId}
        {' : '}
        {restaurant?.name}
      </Text>
    </SafeAreaView>
  );
};

export default RestaurantDetailScreen;
