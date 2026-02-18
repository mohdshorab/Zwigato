import { StyleSheet } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import { hs, ms, vs } from '../../utils/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginBottom: vs(5),
  },
  collapsedContainer: {
    borderColor: COLORS.ui.borderGrey,
    backgroundColor: COLORS.others.inputBox,
    paddingVertical: vs(10),
    paddingHorizontal: hs(10),
    borderRadius: hs(10),
  },
  selectedText: {
    fontSize: ms(16),
    letterSpacing: 2,
    color: COLORS.common.black,
  },
  expandedContainer: {
    borderWidth: 1,
    padding: hs(10),
    borderColor: COLORS.ui.border,
    borderRadius: ms(10),
    width: '70%',
  },
  optionItem: {
    borderColor: COLORS.ui.borderGrey,
    backgroundColor: COLORS.others.inputBox,
    paddingVertical: vs(10),
    paddingHorizontal: hs(10),
    borderRadius: hs(10),
    marginVertical: vs(5),
  },
  optionText: {
    fontSize: ms(16),
    letterSpacing: 2,
    color: COLORS.ui.borderGrey,
  },
});

export default styles;