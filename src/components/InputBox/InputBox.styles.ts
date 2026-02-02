import { StyleSheet } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import { hs, ms, vs } from '../../utils/Layout';

const styles = StyleSheet.create({
  inputBox: {
    // borderWidth:0.5,
    borderColor: COLORS.ui.borderGrey,
    backgroundColor: COLORS.others.inputBox,
    paddingVertical: vs(10),
    paddingHorizontal: hs(10),
    fontSize: ms(16),
    borderRadius: hs(10),
    letterSpacing: 2,
  },
  inputBoxTitle: {
    marginBottom: vs(5),
  },
  InputBoxPassIcon: {
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingHorizontal: hs(10),
  },
  searchIcon: { position: 'absolute', left: hs(10) },
});

export default styles;
