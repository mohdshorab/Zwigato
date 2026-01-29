import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import { fetchSelectedRestaurantData } from '../slices/selectedRestaurantDataSlice';
import { styles } from './RestaurantDetailScreen.styles';
import { CustomIonicIcon } from '../../../components';
import COLORS from '../../../utils/constants/Colors';
import { ms } from '../../../utils/Layout';

const RestaurantDetailScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'RestaurantDetailScreen'>) => {
  const { restaurantId } = route.params;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSelectedRestaurantData(restaurantId));
  }, [restaurantId, dispatch]);
  const { restaurant, status, error } = useAppSelector(
    state => state.selectedRestaurant,
  );

  console.log(restaurant);
  if (status === 'loading')
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerRow}>
        <View style={styles.infoWrapper}>
          <Text style={styles.restaurantName}>{restaurant?.name}</Text>
          <View style={styles.detailRow}>
            <CustomIonicIcon
              name="location-outline"
              size={ms(20)}
              color={COLORS.common.black}
              style={styles.iconMargin}
            />
            <Text style={styles.addressText} numberOfLines={2}>
              {restaurant?.address}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <CustomIonicIcon
              name="bicycle"
              size={ms(20)}
              color={COLORS.common.green}
              style={styles.iconMargin}
            />
            <Text style={styles.deliveryText}>{restaurant?.deliveryTime}</Text>
          </View>
        </View>
        <View style={styles.ratingWrapper}>
          <View style={styles.ratingBadge}>
            <CustomIonicIcon
              name="star"
              size={ms(14)}
              color={COLORS.common.white}
              style={styles.iconMargin}
            />
            <Text style={styles.ratingText}>{restaurant?.rating}</Text>
          </View>
          <Text style={styles.ratingCountText}>
            By {restaurant?.ratingCount}
          </Text>
        </View>
      </View>
      <View style={styles.thinSeparator} />
      <View style={styles.offersContainer}>
        <View style={styles.offerLabelWrapper}>
          <CustomIonicIcon
            name="sparkles-outline"
            size={ms(14)}
            color={COLORS.primary}
            style={styles.iconMargin}
          />
          <Text style={styles.offerText}>{restaurant?.offers}</Text>
        </View>
        <Text style={styles.offersPlaceholder}>Offers</Text>
      </View>
      <View style={styles.thickSeparator} />
    </SafeAreaView>
  );
};

export default RestaurantDetailScreen;
