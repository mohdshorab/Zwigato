import { StyleSheet } from 'react-native';
import { hs } from '../../utils/Layout';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hs(10),
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
});

export default styles;
