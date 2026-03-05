import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../utils/Layout';
import COLORS from '../../utils/constants/Colors';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: ms(25),
    padding: ms(5),
    marginVertical: vs(20),
    backgroundColor: COLORS.ui.borderGrey,
    borderColor: COLORS.common.white,
  },
  contentContainer: {
    backgroundColor: COLORS.common.white,
    borderTopRightRadius: hs(20),
    borderTopLeftRadius: hs(20),
    marginVertical: vs(10),
    flex: 1,
    maxHeight: '80%',
  },
  scrollContent: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: hs(10),
    paddingTop: vs(20),
  },
  menuItemImage: {
    height: hs(250),
    borderRadius: hs(20),
  },
  vegIndicator: {
    width: hs(18),
    height: hs(18),
    borderWidth: 2,
    borderRadius: hs(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vs(15),
  },
  vegDot: {
    width: hs(8),
    height: hs(8),
    borderRadius: hs(4),
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: vs(10),
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: ms(20),
    fontWeight: '600',
    color: COLORS.common.black,
  },
  servesText: {
    fontSize: ms(16),
    fontWeight: '500',
    color: COLORS.common.black,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    borderRadius: ms(15),
    borderWidth: 0.5,
    borderColor: COLORS.ui.borderGrey,
    padding: ms(5),
    marginHorizontal: hs(10),
  },
  itemDesc: {
    fontSize: ms(16),
    color: COLORS.ui.borderGrey,
  },
  thickSeparator: {
    height: 0,
    borderWidth: 5,
    borderColor: COLORS.ui.border,
    marginTop: vs(20),
  },
  thinSeparator: {
    height: 0,
    borderWidth: 1,
    borderColor: COLORS.ui.border,
  },
  sectionContainer: {
    paddingHorizontal: hs(10),
  },
  sectionTitle: {
    fontSize: ms(20),
    fontWeight: '500',
    color: COLORS.common.black,
    marginVertical: vs(10),
  },
  optionRow: {
    flexDirection: 'row',
    marginVertical: vs(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionImage: {
    height: hs(70),
    width: hs(70),
    borderRadius: hs(10),
  },
  optionName: {
    fontWeight: '500',
    fontSize: ms(16),
  },
  optionPrice: {
    fontWeight: '500',
    fontSize: ms(16),
  },
  footerContainer: {
    flexDirection: 'row',
    paddingHorizontal: hs(10),
    paddingVertical: vs(15),
    backgroundColor: COLORS.common.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.ui.border,
  },
  quantityContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: hs(10),
    justifyContent:'space-evenly',
    borderColor: COLORS.primary,
    paddingHorizontal: hs(5),
  },
  quantityText: {
    fontWeight: 'bold',
    fontSize: ms(18),
    paddingHorizontal: hs(20),
    color: COLORS.primary,
  },
  addButton: {
    flex: 1,
    marginLeft: hs(10),
  },
  addButtonText: {
    fontSize: ms(20),
  },
});

export default styles;
