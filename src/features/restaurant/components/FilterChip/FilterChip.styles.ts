import { StyleSheet } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../../utils/Layout';

const styles = StyleSheet.create({
  chip: {
    borderWidth: 0.5,
    borderColor: COLORS.ui.borderGrey,
    paddingVertical: vs(5),
    paddingHorizontal: hs(10),
    borderRadius: ms(10),
    flexDirection: 'row',
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    alignItems: 'center',
  },
  icon: {
    marginRight: hs(10),
  },
  text: {
    fontSize: ms(14),
    color: COLORS.text.primary,
  },
});

export default styles;
