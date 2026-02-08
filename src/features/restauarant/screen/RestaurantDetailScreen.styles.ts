import { StyleSheet } from 'react-native';
import COLORS from '../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../utils/Layout';

export const styles = StyleSheet.create({
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mainContainer: { flex: 1, backgroundColor: COLORS.common.white },
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hs(10),
  },
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
  addressText: {
    fontSize: ms(14),
    flex: 1,
    color: COLORS.common.black,
  },
  deliveryText: {
    fontSize: ms(14),
    color: COLORS.common.green,
  },
  ratingWrapper: {
    alignItems: 'center',
    marginVertical: vs(10),
  },
  ratingCountText: {
    fontSize: ms(12),
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: COLORS.ui.borderGrey,
    color: COLORS.ui.borderGrey,
    fontWeight: '200',
  },
  thinSeparator: {
    height: 0,
    borderWidth: 1,
    borderColor: COLORS.ui.border,
  },
  thickSeparator: {
    height: 0,
    borderWidth: 5,
    borderColor: COLORS.ui.border,
  },
  offersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vs(15),
    paddingHorizontal: hs(10),
    alignItems: 'center',
  },
  offerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerText: {
    fontSize: ms(14),
    fontWeight: '500',
    color: COLORS.common.black,
  },
  offersPlaceholder: {
    color: COLORS.text.placeholder,
    fontSize: ms(14),
  },
  sectionHeader: {
    backgroundColor: COLORS.common.white,
    paddingVertical: vs(12),
    paddingHorizontal: hs(16),
    borderBottomWidth: 2,
    borderBottomColor: COLORS.ui.border,
    marginBottom: vs(12),
  },
  sectionTitle: {
    fontSize: ms(16),
    fontWeight: '500',
    color: COLORS.common.black,
  },
});
