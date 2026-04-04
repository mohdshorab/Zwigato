import { StyleSheet } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../../utils/Layout';

export const styles = StyleSheet.create({
  infoWrapper: {
    flex: 1,
    marginRight: hs(10),
  },
  restaurantName: {
    fontWeight: 'bold',
    fontSize: ms(30),
    marginVertical: vs(10),
    color: COLORS.common.black,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(5),
  },
  iconMargin: {
    marginRight: hs(5),
  },
  addressText: {
    fontSize: ms(14),
    flex: 1,
    color: COLORS.common.black,
  },
  deliveryText: {
    fontSize: ms(14),
    color: COLORS.common.green,
  },
});
