import { View, StatusBar, Text, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonHeader, MenuItemModal, FoodItemCard } from '../../../components';
import COLORS from '../../../utils/constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import styles from './SearchScreen.styles';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { FlashList } from '@shopify/flash-list';
import { MenuItem, Restaurant } from '../../../types/restaurant';
import {
  globalSearchFoodItems,
  globalSearchRestaurants,
  searchedDataList,
} from '../slices/searchSelectors';
import ItemCard from '../components/ItemCard/ItemCard';
import { GlobalSearchItem } from '../types/searchTypes';
import useDebounce from '../../../hooks/useDebounce';

const EMPTY_ARRAY: any[] = [];

const SearchScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SearchScreen'>) => {
  const insets = useSafeAreaInsets();
  const { searchPlaceHolder, searchMode, contextId } = route?.params || {};

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isItemModalVisible, setIsItemModalVisible] = useState<boolean>(false);
  const [activeSelectedItem, setActiveSelectedItem] = useState<MenuItem | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debounceQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setIsLoading(true);
    if (debounceQuery === searchQuery) {
      setIsLoading(false);
    }
  }, [debounceQuery, searchQuery]);

  const localRestaurantResults = useAppSelector(state =>
    searchedDataList(state, debounceQuery),
  );

  const globalFoodItemResults = useAppSelector(state =>
    searchMode === 'global'
      ? globalSearchFoodItems(state, debounceQuery)
      : EMPTY_ARRAY,
  );

  const globalRestaurantResults = useAppSelector(state =>
    searchMode === 'global'
      ? globalSearchRestaurants(state, debounceQuery)
      : EMPTY_ARRAY,
  );

  const isSearchEmpty = searchQuery.length === 0;

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleItemPress = (item: MenuItem) => {
    if (item) {
      setActiveSelectedItem(item);
      setIsItemModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsItemModalVisible(false);
  };

  const renderSelectedRestaurantsItem = ({ item }: { item: MenuItem }) => {
    return <FoodItemCard item={item} onPress={handleItemPress} />;
  };

  const renderLocalRestaurantResults = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    }
    return (
      <FlashList
        data={localRestaurantResults}
        renderItem={renderSelectedRestaurantsItem}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.noMatchFoundHead}>
              {isSearchEmpty
                ? 'Search for your cravings...'
                : 'Bummer! No matches found.'}
            </Text>
            {!isSearchEmpty && (
              <Text style={styles.noMatchFoundSubHead}>
                Why not try something else for now?
              </Text>
            )}
          </View>
        )}
      />
    );
  };

  const listEmptyComponent = () => {
    if (isSearchEmpty) {
      return (
        <View style={styles.listEmptyContainer}>
          <Text style={styles.noMatchFoundHead}>What's on your mind?</Text>
          <Text style={styles.noMatchFoundSubHead}>
            Search for restaurants or dishes
          </Text>
        </View>
      );
    }

    if (
      !isSearchEmpty &&
      !globalFoodItemResults?.length &&
      !globalRestaurantResults?.length
    ) {
      return (
        <View style={styles.listEmptyContainer}>
          <Text style={styles.noMatchFoundHead}>Bummer! No matches found.</Text>
          <Text style={styles.noMatchFoundSubHead}>
            Try different keywords or browse popular items
          </Text>
        </View>
      );
    }

    return null;
  };

  const combinedData = useMemo(() => {
    if (searchQuery.length === 0) return EMPTY_ARRAY;
    return [
      ...(globalRestaurantResults?.length > 0
        ? [{ type: 'header' as const, title: 'Restaurants' }]
        : []),
      ...globalRestaurantResults?.map(gRestResults => ({
        type: 'restaurant' as const,
        data: gRestResults,
      })),
      ...(globalFoodItemResults?.length > 0
        ? [
            {
              type: 'header' as const,
              title: 'Dishes',
            },
          ]
        : []),
      ...globalFoodItemResults?.map(gFastFoodItem => ({
        type: 'dish' as const,
        data: gFastFoodItem,
      })),
    ];
  }, [globalFoodItemResults, globalRestaurantResults, searchQuery.length]);

  const renderGlobalSearchedData = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    }
    return (
      <FlashList
        data={combinedData}
        renderItem={({ item }: { item: GlobalSearchItem }) => {
          if (item.type === 'header') {
            return <Text style={styles.titleHead}>{item.title}</Text>;
          }
          if (item.type === 'restaurant') {
            return (
              <ItemCard item={item.data} onPress={() => {}} type="restaurant" />
            );
          }
          if (item.type === 'dish') {
            return <ItemCard item={item.data} onPress={() => {}} type="dish" />;
          }
          return null;
        }}
        ListEmptyComponent={listEmptyComponent}
      />
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.common.white}
      />
      <CommonHeader
        showModalBackButton
        navigation={navigation}
        showSearchBox
        searchPlaceholder={searchPlaceHolder}
        autoFocusSearch
        onSearchChange={handleSearchInputChange}
      />
      {searchMode === 'restaurant'
        ? renderLocalRestaurantResults()
        : renderGlobalSearchedData()}

      {searchMode === 'restaurant' && (
        <MenuItemModal
          showModal={isItemModalVisible}
          infoToShow={activeSelectedItem}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

export default SearchScreen;
