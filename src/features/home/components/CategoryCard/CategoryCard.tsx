import { Text, TouchableOpacity, View } from 'react-native';
import styles from './CategoryCard.styles';
import { QuickImage } from '../../../../components';
import { CategoryItem } from '../../../../types/restaurantCategories';

interface props {
  item: CategoryItem;
  isSelected: string;
  onPress: () => void;
}

const CategoryCard = ({ item, isSelected, onPress }: props) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <QuickImage
        source={item?.image}
        style={styles.categoryImage}
        resizeMode="cover"
      />
      <Text style={styles.categoryTitle}>{item?.name}</Text>
      <View
        style={[
          item?.id == isSelected
            ? { backgroundColor: 'red' }
            : { backgroundColor: 'transparent' },
          styles.catTitle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default CategoryCard;
