import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';


const styles = StyleSheet.create({
  itemCard: {
    flexDirection: 'row',
    padding: ms(10),
    borderBottomWidth: 5,
    borderColor: COLORS.ui.border,
  },
  itemDetails: {
    flex: 1,
    marginLeft: hs(12),
  },
  vegIndicator: {
    width: hs(18),
    height: hs(18),
    borderWidth: 2,
    borderRadius: hs(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vs(5),
  },
  vegDot: {
    width: hs(8),
    height: hs(8),
    borderRadius: hs(4),
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(4),
  },
  itemName: {
    fontSize: ms(16),
    fontWeight: '400',
    color: COLORS.common.black,
    flex: 1,
  },
  itemDesc: {
    fontSize: ms(13),
    color: COLORS.ui.borderGrey,
    marginVertical: vs(8),
  },
  itemPrice: {
    fontSize: ms(16),
    fontWeight: '400',
    color: COLORS.common.black,
  },
  actionButtonsContainer: { flexDirection: 'row', marginVertical: vs(10) },
  actionButtons: {
    borderRadius: ms(15),
    borderWidth: 0.5,
    borderColor: COLORS.ui.borderGrey,
    padding: ms(5),
    marginHorizontal: hs(10),
  },
  rightSection: { alignItems: 'center' },
  addButton: {
    position: 'relative',
    bottom: vs(10),
    backgroundColor: COLORS.common.white,
    zIndex: 1,
    paddingHorizontal: hs(30),
  },
  customisationText: { color: COLORS.ui.borderGrey },
  itemImage: {
    width: hs(120),
    height: hs(120),
    borderRadius: hs(8),
  },
});

export default styles;
