import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.styles';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useAppSelector } from '../../../store/hooks';
import { CategoryState } from '../../../store/slices/restaurantsCategoriesSlice';
import { useCallback, useState } from 'react';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { CommonHeader, CustomIonicIcon } from '../../../components';
import COLORS from '../../../utils/constants/Colors';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import {
  dataAsPerSelectedCat,
  selectedCategory,
} from '../../../store/slices/restaurantsCategoriesSelector';

const ListEmptyComponent = () => (
  <View style={styles.listEmptyContainer}>
    <Text style={styles.noMatchFoundHead}>Bummer! No matches found.</Text>
    <Text style={styles.noMatchFoundSubHead}>
      Why not try something else for now?
    </Text>
  </View>
);

const ListHeader = ({ title }: { title: string }) => (
  <Text style={styles.subHeads}>{title}</Text>
);

const ListFooter = ({ show }: { show: boolean }) => (
  <Text style={styles.listEndHeads}>{show ? `That's all for now!` : ''}</Text>
);

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const { categories }: CategoryState = useAppSelector(
    state => state.restaurantsCategories,
  );

  const { user } = useAppSelector(state => state.authUser);
  const cartCount = useAppSelector(state => state.cart.cart.length);

  const [isSelected, setIsSelected] = useState<number>(0);

  const selectedCatName = useAppSelector(state =>
    selectedCategory(state, isSelected),
  );
  const dataToBeShown = useAppSelector(state =>
    dataAsPerSelectedCat(state, selectedCatName),
  );

  const headerTitle = !dataToBeShown?.length
    ? ''
    : isSelected === 0
    ? 'Explore More'
    : selectedCatName ?? '';

  const onPressingRestaurantCard = useCallback(
    (restID: number) => {
      navigation.navigate('RestaurantDetailScreen', {
        restaurantId: restID,
      });
    },
    [navigation],
  );

  const onPressCatIcon = useCallback((id: number) => {
    setIsSelected(id);
  }, []);

  const onSearchIconPress = useCallback(() => {
    navigation.navigate('SearchScreen', {
      searchMode: 'global',
      searchPlaceHolder: `Restaurant name or a dish...`,
    });
  }, [navigation]);

  const renderCategoryItem = useCallback(
    ({ item }: { item: any }) => (
      <CategoryCard
        item={item}
        isSelected={isSelected}
        onPress={() => onPressCatIcon(item.id)}
      />
    ),
    [isSelected, onPressCatIcon],
  );

  const renderRestaurantItem = useCallback(
    ({ item }: { item: any }) => (
      <RestaurantCard
        onPress={() => onPressingRestaurantCard(item?.id)}
        item={item}
      />
    ),
    [onPressingRestaurantCard],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        showSearchIcon
        showCartIcon
        cartCount={cartCount}
        navigation={navigation}
        onSearchIconPress={onSearchIconPress}
        onCartIconPress={() => navigation.navigate('CartScreen')}
        title={`Hi ${user?.userName},`}
      />
      <View style={styles.categoriesHead}>
        <Text style={styles.catHeadTitle}>All Categories</Text>
        <TouchableOpacity style={styles.seeAllContainer}>
          <Text style={styles.seeAllText}>See All</Text>
          <CustomIonicIcon
            name="chevron-forward-outline"
            size={12}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item?.id.toString()}
        renderItem={renderCategoryItem}
      />
      <FlashList
        key={isSelected}
        showsVerticalScrollIndicator
        data={dataToBeShown || []}
        keyExtractor={item => item?.id.toString()}
        renderItem={renderRestaurantItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={dataToBeShown?.length === 0 ? styles.flex : {}}
        ListHeaderComponent={<ListHeader title={headerTitle} />}
        ListFooterComponent={<ListFooter show={!!dataToBeShown?.length} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
