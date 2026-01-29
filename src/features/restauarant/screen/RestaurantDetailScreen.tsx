import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import {
  fetchSelectedRestaurantData,
  SelectedRestaurantState,
} from '../slices/selectedRestaurantDataSlice';
import { styles } from './RestaurantDetailScreen.styles';
import { CustomIonicIcon, QuickImage } from '../../../components';
import COLORS from '../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../utils/Layout';
import FilterChip from '../components/FilterChip/FilterChip';
import { FlashList } from '@shopify/flash-list';

const RESTAURANT_FILTERS = [
  { id: '1', title: 'Filters', icon: 'options-outline' },
  { id: '2', title: 'Veg', icon: 'leaf' },
  { id: '3', title: 'Non-Veg', icon: 'restaurant' },
  { id: '4', title: 'Sort', icon: 'swap-vertical-outline' },
];

const RestaurantDetailScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'RestaurantDetailScreen'>) => {
  const { restaurantId } = route.params;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSelectedRestaurantData(restaurantId));
  }, [restaurantId, dispatch]);
  const { restaurant, status, error }: SelectedRestaurantState = useAppSelector(
    state => state.selectedRestaurant,
  );

  const RestaurantInfo = () => {
    return (
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
    );
  };

  const RatingBadge = () => {
    return (
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
        <Text style={styles.ratingCountText}>By {restaurant?.ratingCount}</Text>
      </View>
    );
  };

  if (status === 'loading')
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  const menuItem = restaurant?.menu[0];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerRow}>
        <RestaurantInfo />
        <RatingBadge />
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
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {RESTAURANT_FILTERS.map((item, index) => (
            <FilterChip
              key={index}
              title={item.title}
              icon={item.icon}
              onPress={() => console.log(item.title)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.thinSeparator} />
      <SectionList
        sections={
          restaurant?.menu.map(menuCat => ({
            title: menuCat?.category,
            data: menuCat?.items || [],
          })) || []
        }
        keyExtractor={item => item?.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.itemCard}>
              <QuickImage
                source={{ uri: item.image }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View
                    style={[
                      styles.vegIndicator,
                      {
                        borderColor: item.isVeg ? COLORS.common.green : COLORS.common.red,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.vegDot,
                        {
                          backgroundColor: item.isVeg ? COLORS.common.green : COLORS.common.red,
                        },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.itemDesc}>{item.desc}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default RestaurantDetailScreen;
