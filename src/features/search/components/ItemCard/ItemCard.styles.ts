import { StyleSheet } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { hs, vs, ms } from '../../../../utils/Layout';

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.common.white,
    paddingVertical: vs(8),
    paddingHorizontal: hs(12),
    marginRight: hs(12),
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: COLORS.ui.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: vs(5),
  },
  itemImage: {
    height: hs(50),
    width: hs(50),
    backgroundColor: COLORS.background.skeleton,
  },
  textContainer: {
    marginLeft: hs(12),
    marginRight: hs(8),
    justifyContent: 'center',
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: ms(16),
    color: COLORS.text.primary,
    maxWidth: hs(160), 
  },
  categoryLabel: {
    fontWeight: '500',
    fontSize: ms(12),
    color: COLORS.ui.borderGrey,
    marginTop: vs(2),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default styles;