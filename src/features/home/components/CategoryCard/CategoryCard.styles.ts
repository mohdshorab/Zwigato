import { Platform, StyleSheet } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { hs, vs, ms } from '../../../../utils/Layout';

const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 0.25,
    borderBottomColor: COLORS.ui.borderGrey,
    alignItems: 'center',
    backgroundColor: COLORS.common.white,
    paddingTop: vs(10),
    paddingHorizontal: hs(10),
    marginBottom:vs(15)
  },
  categoryImage: {
    height: hs(70),
    width: hs(70),
    borderRadius: hs(35),
  },
  categoryTitle: {
    fontWeight: '500',
    fontSize: ms(18),
    color: COLORS.text.primary,
    marginVertical: vs(10),
  },
  catTitle: {
    width: '100%',
    height: vs(5),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default styles;
