import { Text, TouchableOpacity, View } from 'react-native';
import { MenuItem } from '../../../../types/restaurant';
import COLORS from '../../../../utils/constants/Colors';
import { QuickImage, AppButton, CustomIonicIcon } from '../../../../components';
import styles from './FoodItemCard.styles';


interface FoodItemCardProps {
  item: MenuItem;
  onPress: (item: MenuItem) => void;
}

const FoodItemCard = ({ item, onPress }: FoodItemCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.itemCard}>
      <View style={styles.itemDetails}>
        <View
          style={[
            styles.vegIndicator,
            {
              borderColor: item?.isVeg ? COLORS.common.green : COLORS.common.red,
            },
          ]}
        >
          <View
            style={[
              styles.vegDot,
              {
                backgroundColor: item?.isVeg
                  ? COLORS.common.green
                  : COLORS.common.red,
              },
            ]}
          />
        </View>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item?.name}</Text>
        </View>
        <Text style={styles.itemPrice}>₹{item?.price}</Text>
        <Text style={styles.itemDesc}>{item?.desc}</Text>
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
        <QuickImage source={{ uri: item?.image }} style={styles.itemImage} />
        <AppButton
          title="Add"
          variant="outline"
          onPress={() => onPress(item)}
          buttonStyle={styles.addButton}
        />
        {item?.customization?.length > 0 && (
          <Text style={styles.customisationText}>customisable</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FoodItemCard;