import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';

const styles = StyleSheet.create({
  container: {
    marginVertical: vs(20),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  box: {
    borderWidth: 2,
    height: vs(40),
    width: hs(40),
    borderRadius: hs(5),
    borderColor: COLORS.others.uiIconColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBox: { borderColor: COLORS.common.red, borderWidth: 2 },
  otpText: { fontSize: ms(20), fontWeight: 'bold' },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  errorString: {
    fontWeight: '400',
    color: COLORS.common.red,
    alignSelf: 'center',
    marginVertical: vs(10),
  },
});

export default styles;
