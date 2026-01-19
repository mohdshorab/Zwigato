import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.style';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useAppSelector } from '../../../store/hooks';
import { CategoryState } from '../../../store/slices/restaurantsCategoriesSlice';
import { useState } from 'react';
import CategoryCard from '../components/CategoryCard';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const { categories, status, error }: CategoryState = useAppSelector(
    state => state.restaurantsCategories,
  );

  const [isSelected, setIsSelected] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hey Username, Good Morning</Text>
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
    </SafeAreaView>
  );
};

export default HomeScreen;
