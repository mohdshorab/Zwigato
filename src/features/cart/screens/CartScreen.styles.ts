import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../../utils/Layout';
import COLORS from '../../../utils/constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ui.border,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: vs(12),
  },
  emptyTitle: {
    fontSize: ms(20),
    fontWeight: '600',
    color: COLORS.common.black,
  },
  emptySubtitle: {
    fontSize: ms(14),
    color: COLORS.ui.borderGrey,
    textAlign: 'center',
    paddingHorizontal: hs(40),
  },
  itemCountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hs(6),
    paddingHorizontal: hs(15),
    paddingVertical: vs(8),
    backgroundColor: COLORS.common.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ui.border,
  },
  itemCountText: {
    fontSize: ms(13),
    color: COLORS.primary,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: hs(12),
    paddingVertical: vs(12),
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.common.white,
    borderRadius: hs(14),
    padding: hs(12),
    alignItems: 'center',
    shadowColor: COLORS.common.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: hs(70),
    height: hs(70),
    borderRadius: hs(10),
    backgroundColor: COLORS.ui.border,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: hs(10),
    gap: vs(4),
  },
  itemName: {
    fontSize: ms(15),
    fontWeight: '600',
    color: COLORS.common.black,
  },
  itemAddons: {
    fontSize: ms(12),
    color: COLORS.ui.borderGrey,
    lineHeight: ms(16),
  },
  itemPrice: {
    fontSize: ms(15),
    fontWeight: '700',
    color: COLORS.primary,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hs(4),
  },
  quantityText: {
    fontSize: ms(16),
    fontWeight: '700',
    color: COLORS.common.black,
    minWidth: hs(20),
    textAlign: 'center',
  },
  separator: {
    height: vs(10),
  },
  billContainer: {
    backgroundColor: COLORS.common.white,
    marginHorizontal: hs(12),
    marginBottom: vs(12),
    borderRadius: hs(14),
    padding: hs(15),
    gap: vs(10),
    shadowColor: COLORS.common.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  billTitle: {
    fontSize: ms(16),
    fontWeight: '700',
    color: COLORS.common.black,
    marginBottom: vs(2),
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: ms(14),
    color: COLORS.ui.borderGrey,
  },
  billValue: {
    fontSize: ms(14),
    color: COLORS.common.black,
    fontWeight: '500',
  },
  billValueFree: {
    fontSize: ms(14),
    color: COLORS.common.green,
    fontWeight: '600',
  },
  billDivider: {
    height: 1,
    backgroundColor: COLORS.ui.border,
  },
  billTotal: {
    fontSize: ms(15),
    fontWeight: '700',
    color: COLORS.common.black,
  },
  billTotalValue: {
    fontSize: ms(16),
    fontWeight: '800',
    color: COLORS.primary,
  },
  checkoutContainer: {
    paddingHorizontal: hs(15),
    paddingBottom: vs(10),
    backgroundColor: COLORS.common.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.ui.border,
    paddingTop: vs(12),
  },
  checkoutButton: {
    width: '100%',
    paddingVertical: vs(8),
  },
  checkoutText: {
    fontSize: ms(17),
    fontWeight: '700',
  },
});

export default styles;
