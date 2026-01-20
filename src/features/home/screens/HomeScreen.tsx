import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.style';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useAppSelector } from '../../../store/hooks';
import { CategoryState } from '../../../store/slices/restaurantsCategoriesSlice';
import { useState } from 'react';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { CustomIonicIcon, QuickImage } from '../../../components';
import { hs, ms, vs } from '../../../utils/Layout';
import COLORS from '../../../utils/constants/Colors';
import { restaurants } from '../../../store/slices/restaurantsSlice';
import RestaurantCard from '../components/RestaurantCard/RestaurantCard';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const { categories, status, error }: CategoryState = useAppSelector(
    state => state.restaurantsCategories,
  );
  const {
    items,
    status: resStatus,
    error: resError,
  }: restaurants = useAppSelector(state => state.restaurants);

  const [isSelected, setIsSelected] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hey Username, Good Morning</Text>
      <View
        style={styles.categoriesHead}
      >
        <Text
          style={styles.catHeadTitle}
        >
          All Categories
        </Text>
        <TouchableOpacity
          style={styles.seeAllContainer}
        >
          <Text
            style={styles.seeAllText}
          >
            See All
          </Text>
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
      <Text
        style={styles.subHeads}
      >
        Explore More
      </Text>
      <FlashList
        showsVerticalScrollIndicator
        data={items}
        keyExtractor={(item, index) => item?.id.toString()}
        renderItem={({ item }) => {
          return <RestaurantCard item={item} /> ;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
