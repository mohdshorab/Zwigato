import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../utils/Layout';
import COLORS from '../../utils/constants/Colors';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hs(10),
    paddingVertical: vs(10),
  },
  backButton: {
    paddingRight: hs(10),
  },
  searchWrapper: {
    flex: 1,
  },
  headEndIconButton: {
    paddingLeft: hs(10),
  },
  rightIconContainer: {
    flexDirection: 'row',
  },
  stretchWrapper: { flex: 1 },
  titleStyle: {
    fontWeight: '500',
    fontSize: ms(18),
  },
  cartIconWrapper: {
    marginLeft: hs(10),
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -vs(4),
    right: -hs(4),
    backgroundColor: COLORS.primary,
    borderRadius: ms(10),
    minWidth: ms(16),
    height: ms(16),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hs(3),
  },
  cartBadgeText: {
    color: COLORS.common.white,
    fontSize: ms(9),
    fontWeight: '700',
  },
});

export default styles;
