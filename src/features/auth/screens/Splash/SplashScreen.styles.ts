import { StyleSheet } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../../utils/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.common.white
  },
  //using vertical scale for both to make the icon Square always
  iconSplash: {
    height: vs(200),
    width: vs(200),
  },
  bottomText: {
    color: COLORS.text.primary,
    fontWeight: '500',
    fontSize: ms(20),
    flexWrap: 'wrap',
  },
});

export default styles;
