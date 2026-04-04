import React from 'react';
import { View, Text } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { CustomIonicIcon } from '../../../../components';
import { styles } from './RestaurantInfo.styles';
import { ms } from '../../../../utils/Layout';

interface RestaurantInfoProps {
  name?: string;
  address?: string;
  deliveryTime?: string;
}

const RestaurantInfo = ({
  name,
  address,
  deliveryTime,
}: RestaurantInfoProps) => {
  return (
    <View style={styles.infoWrapper}>
      <Text style={styles.restaurantName}>{name}</Text>
      <View style={styles.detailRow}>
        <CustomIonicIcon
          name="location-outline"
          size={ms(20)}
          color={COLORS.common.black}
          style={styles.iconMargin}
        />
        <Text style={styles.addressText} numberOfLines={2}>
          {address}
        </Text>
      </View>
      <View style={styles.detailRow}>
        <CustomIonicIcon
          name="bicycle"
          size={ms(20)}
          color={COLORS.common.green}
          style={styles.iconMargin}
        />
        <Text style={styles.deliveryText}>{deliveryTime}</Text>
      </View>
    </View>
  );
};

export default RestaurantInfo;
