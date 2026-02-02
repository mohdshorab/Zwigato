import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect, useState } from 'react';
import {
  fetchSelectedRestaurantData,
  SelectedRestaurantState,
} from '../slices/selectedRestaurantDataSlice';
import { styles } from './RestaurantDetailScreen.styles';
import { AppButton, CustomIonicIcon, QuickImage } from '../../../components';
import COLORS from '../../../utils/constants/Colors';
import { ms, vs } from '../../../utils/Layout';
import FilterChip from '../components/FilterChip/FilterChip';
import { MenuItem } from '../../../types/restaurant';
import {
  FilterOption,
  FOOD_TYPES,
  RESTAURANT_FILTERS,
} from '../../../utils/constants/restaurantConstants';
import { filteredData } from '../slices/filteredSectionsSelector';
import MenuItemModal from '../components/MenuItemModal/MenuItemModal';

const RestaurantDetailScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'RestaurantDetailScreen'>) => {
  const { restaurantId } = route.params;
  const dispatch = useAppDispatch();
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedFoodInfo, setSelectedFoodInfo] = useState<MenuItem | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchSelectedRestaurantData(restaurantId));
  }, [restaurantId, dispatch]);

  const { restaurant, status, error }: SelectedRestaurantState = useAppSelector(
    state => state.selectedRestaurant,
  );

  const filteredSections = useAppSelector(state =>
    filteredData(state, selectedFilter),
  );

  const onPressFilterHandling = (item: FilterOption) => {
    if (item.action === 'TOGGLE') {
      setSelectedFilter(prev => (prev === item.id ? 0 : item.id));
    }
  };

  const showFoodDetails = (item: MenuItem) => {
    setSelectedFoodInfo(item);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(!showModal);
  };

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

  const renderMenuList = ({ item }: { item: MenuItem }) => {
    return (
      <TouchableOpacity
        onPress={() => showFoodDetails(item)}
        style={styles.itemCard}
      >
        <View style={styles.itemDetails}>
          <View
            style={[
              styles.vegIndicator,
              {
                borderColor: item.isVeg
                  ? COLORS.common.green
                  : COLORS.common.red,
              },
            ]}
          >
            <View
              style={[
                styles.vegDot,
                {
                  backgroundColor: item.isVeg
                    ? COLORS.common.green
                    : COLORS.common.red,
                },
              ]}
            />
          </View>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <Text style={styles.itemDesc}>{item.desc}</Text>
          <View style={styles.actionButtonsContainer}>
            <CustomIonicIcon
              name="bookmark-outline"
              size={18}
              color={COLORS.ui.borderGrey}
              style={styles.actionButtons}
              onPress={() => {}}
            />
            <CustomIonicIcon
              name="arrow-redo-outline"
              size={18}
              color={COLORS.ui.borderGrey}
              style={styles.actionButtons}
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <QuickImage source={{ uri: item.image }} style={styles.itemImage} />
          <AppButton
            title="Add"
            variant="outline"
            onPress={() => showFoodDetails(item)}
            buttonStyle={styles.addButton}
          />
          {item?.customization?.length > 0 && (
            <Text style={styles.customisationText}>customisable</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (status === 'loading')
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );

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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {RESTAURANT_FILTERS.map((item, index) => (
            <FilterChip
              key={index}
              filterOptions={item}
              selectedId={selectedFilter}
              onPress={() => onPressFilterHandling(item)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.thinSeparator} />
      <SectionList
        sections={filteredSections}
        keyExtractor={item => item?.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={renderMenuList}
      />
      <MenuItemModal
        showModal={showModal}
        infoToShow={selectedFoodInfo}
        onClose={() => onCloseModal()}
      />
    </SafeAreaView>
  );
};

export default RestaurantDetailScreen;
