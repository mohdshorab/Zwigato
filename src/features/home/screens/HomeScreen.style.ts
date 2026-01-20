import { Platform, StyleSheet } from 'react-native';
import COLORS from '../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
  },
  categoriesHead: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: hs(10),
    marginVertical: vs(15),
  },
  catHeadTitle: {
    fontSize: ms(16),
    fontWeight: '300',
    color: COLORS.text.placeholder,
  },
  seeAllContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: ms(14),
    fontWeight: '500',
    color: COLORS.primary,
  },
  subHeads: {
    fontSize: ms(16),
    fontWeight: '300',
    color: COLORS.text.placeholder,
    paddingHorizontal: hs(10),
    marginBottom: vs(15),
  },
});
