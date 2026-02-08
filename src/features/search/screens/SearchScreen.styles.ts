import { StyleSheet } from 'react-native';
import COLORS from '../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../utils/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
  },
  flex: {
    flex: 1,
  },
  noMatchFoundHead: {
    fontWeight: '500',
    fontSize: ms(18),
    color: COLORS.ui.borderGrey,
    marginVertical: vs(10),
  },
  listEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: hs(50),
    marginTop: vs(100),
  },
  noMatchFoundSubHead: {
    alignSelf: 'center',
    fontSize: ms(12),
    color: COLORS.text.placeholder,
    textAlign: 'center',
  },
  titleHead: {
    fontSize: ms(16),
    fontWeight: '300',
    color: COLORS.text.placeholder,
    marginVertical: vs(10),
    marginHorizontal: hs(16),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
