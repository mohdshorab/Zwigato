import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: COLORS.common.white,
    flexDirection: 'row',
    gap: hs(10),
    justifyContent: 'center',
    width: '80%',
    paddingVertical: vs(16),
    borderRadius: hs(16),
    alignItems: 'center',
  },
  statusText: {
    fontSize: ms(18),
    color: COLORS.common.black,
  },
});

export default styles;
