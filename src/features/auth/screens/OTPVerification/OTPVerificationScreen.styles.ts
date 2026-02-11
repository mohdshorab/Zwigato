import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.common.white,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: hs(20),
  },
  infoSection: {
    alignItems: 'center',
    marginTop: vs(40),
    marginBottom: vs(20),
  },
  instructionText: {
    fontSize: ms(16),
    fontWeight: '400',
    color: COLORS.common.black,
    textAlign: 'center',
  },
  phoneDisplay: {
    fontSize: ms(16),
    fontWeight: '700',
    marginTop: vs(5),
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: vs(30),
  },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hs(8),
  },
  actionLinkText: {
    fontSize: ms(16),
    fontWeight: '600',
    color: COLORS.common.red,
  },
  footerAction: {
    marginBottom: vs(20),
    alignItems: 'center',
  },
  secondaryActionText: {
    fontSize: ms(14),
    fontWeight: '500',
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});

export default styles;
