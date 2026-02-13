import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../utils/Layout';

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
});

export default styles;
