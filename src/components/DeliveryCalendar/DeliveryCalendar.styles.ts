import { StyleSheet } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import { hs, ms, vs } from '../../utils/Layout';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  sheet: {
    backgroundColor: COLORS.common.white,
    borderTopLeftRadius: hs(16),
    borderTopRightRadius: hs(16),
    paddingBottom: hs(32),
    width: '100%',
    alignItems: 'center',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(16),
    paddingVertical: vs(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ui.borderLight,
    width: '100%',
  },
  cancelBtn: {
    fontSize: ms(16),
    color: COLORS.text.secondary,
  },
  doneBtn: {
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.primary,
  },
  picker: {
    width: '100%',
  },
});

export default styles;