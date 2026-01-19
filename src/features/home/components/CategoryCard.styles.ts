import { StyleSheet } from 'react-native';
import COLORS from '../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../utils/Layout';

const styles = StyleSheet.create({
  cardContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ui.borderGrey,
    alignItems: 'center',
    marginVertical: vs(20),
    backgroundColor: COLORS.common.white,
    paddingTop: vs(20),
    paddingHorizontal: hs(10),
  },
  categoryImage: {
    height: hs(60),
    width: hs(60),
    borderRadius: hs(30),
    // marginBottom: vs(10),
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
