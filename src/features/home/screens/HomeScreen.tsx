import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.style';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useAppSelector } from '../../../store/hooks';
import { CategoryState } from '../../../store/slices/restaurantsCategoriesSlice';
import { useMemo, useState } from 'react';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { CustomIonicIcon, QuickImage } from '../../../components';
import COLORS from '../../../utils/constants/Colors';
import { restaurants } from '../../../store/slices/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';
import {
  dataAsPerSelectedCat,
  selectedCategory,
} from '../../../store/slices/restaurantsCategoriesSelector';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const { categories, status, error }: CategoryState = useAppSelector(
    state => state.restaurantsCategories,
  );
  const { items }: restaurants = useAppSelector(state => state.restaurants);
  const [isSelected, setIsSelected] = useState('0');
  const selectedCatName = useAppSelector(state =>
    selectedCategory(state, isSelected),
  );
  const dataToBeShown = useAppSelector(state =>
    dataAsPerSelectedCat(state, selectedCatName),
  );

  const ListEmptyComponent = () => {
    return (
      <View style={styles.listEmptyContainer}>
        <Text style={styles.noMatchFoundHead}>Bummer! No matches found.</Text>
        <Text style={styles.noMatchFoundSubHead}>
          Why not try something else for now?
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hey Username, Good Morning</Text>
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
        keyExtractor={(item, index) => item?.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <CategoryCard
              item={item}
              isSelected={isSelected}
              onPress={() => setIsSelected(item?.id)}
            />
          );
        }}
      />
      <FlashList
        key={isSelected}
        showsVerticalScrollIndicator
        data={dataToBeShown || []}
        keyExtractor={(item, index) => item?.id.toString()}
        renderItem={({ item }) => {
          return <RestaurantCard item={item} />;
        }}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={dataToBeShown?.length === 0 ? styles.flex : {}}
        ListHeaderComponent={() => (
          <Text style={styles.subHeads}>
            {dataToBeShown?.length && isSelected === '0'
              ? 'Explore More'
              : `${selectedCatName}`}
          </Text>
        )}
        ListFooterComponent={() => (
          <Text style={styles.listEndHeads}>
            {dataToBeShown?.length ? `That's all for now!` : ''}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
