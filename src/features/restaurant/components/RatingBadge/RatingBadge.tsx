import React from 'react';
import { View, Text } from 'react-native';
import { CustomIonicIcon } from '../../../../components';
import { ms } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';
import { styles } from './RatingBadge.styles';

interface RatingBadgeProps {
  rating?: number | string;
  ratingCount?: number | string;
}

const RatingBadge = ({ rating, ratingCount }: RatingBadgeProps) => {
  return (
    <View style={styles.ratingWrapper}>
      <View style={styles.ratingBadge}>
        <CustomIonicIcon
          name="star"
          size={ms(14)}
          color={COLORS.common.white}
          style={styles.iconMargin}
        />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <Text style={styles.ratingCountText}>By {ratingCount}</Text>
    </View>
  );
};

export default RatingBadge;