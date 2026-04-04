import { StyleSheet } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../../utils/Layout';

export const styles = StyleSheet.create({
  ratingWrapper: {
    alignItems: 'center',
    marginVertical: vs(10),
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: hs(10),
    paddingVertical: vs(4),
    paddingHorizontal: hs(6),
    borderColor: COLORS.primary,
    backgroundColor: COLORS.common.green,
  },
  iconMargin: {
    marginRight: hs(5),
  },
  ratingText: {
    fontSize: ms(14),
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
  ratingCountText: {
    fontSize: ms(12),
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: COLORS.ui.borderGrey,
    color: COLORS.ui.borderGrey,
    fontWeight: '200',
  },
});
