import { Text, TouchableOpacity, View } from 'react-native';
import { CustomIonicIcon, QuickImage } from '../../../../components';
import { hs, ms, vs } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';
import { styles } from './RestaurantCard.styles';
import { Restaurant } from '../../../../types/restaurant';

interface RestaurantCardProps {
  item: Restaurant;
  onPress?: () => void;
}

const RestaurantCard = ({ item, onPress }: RestaurantCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.cardContainer}
    >
      <QuickImage
        source={item?.image}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={{ position: 'absolute', right: hs(15), top: vs(15) }}>
        <CustomIonicIcon
          name="bookmark-outline"
          size={ms(28)}
          color={COLORS.common.white}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.restaurantName}>{item?.name}</Text>
          <View style={styles.ratingBadge}>
            <CustomIonicIcon
              name="star"
              size={ms(14)}
              color={COLORS.common.white}
              style={styles.iconMargin}
            />
            <Text style={styles.ratingText}>{item?.rating}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <CustomIonicIcon
            name="bicycle"
            size={ms(14)}
            color={COLORS.text.secondary}
            style={styles.iconMargin}
          />
          <Text style={styles.infoText}>
            {item?.deliveryTime} {'  '}|{'  '}
          </Text>
          <CustomIonicIcon
            name="sparkles"
            size={ms(14)}
            color={COLORS.text.secondary}
            style={styles.sparkleMargin}
          />
          <Text style={styles.infoText}>{item?.offers}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
