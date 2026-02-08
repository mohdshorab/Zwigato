import { Text, TouchableOpacity, View } from 'react-native';
import { QuickImage } from '../../../../components';
import { MenuItem, Restaurant } from '../../../../types/restaurant';
import styles from './ItemCard.styles';
import { hs } from '../../../../utils/Layout';

export interface ItemCardProps {
  item: MenuItem | Restaurant;
  onPress: () => void;
  type: 'dish' | 'restaurant';
}

const ItemCard = ({ item, onPress, type }: ItemCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.cardContainer}
    >
      <QuickImage
        source={item?.image}
        style={[
          styles.itemImage,
          type === 'dish' ? { borderRadius: hs(25) } : { borderRadius: hs(5) },
        ]}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.itemTitle}>
          {item?.name}
        </Text>
        <Text style={[styles.categoryLabel, { textTransform: 'none' }]}>
          {type === 'dish'
            ? `Dish`
            : `Rated ${(item as Restaurant)?.rating} with ${
                (item as Restaurant)?.ratingCount
              } ratings`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
