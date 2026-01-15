import { StyleSheet } from 'react-native';
import COLORS from '../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.blue,
  },
  appButtonBg: {
    marginHorizontal: vs(10),
    alignSelf: 'center',
    borderRadius: hs(20),
    backgroundColor: '',
  },
  appButtonText: {
    fontSize: ms(20),
    fontWeight: '500',
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  titleText: {
    color: 'white',
    fontSize: ms(50),
    alignSelf: 'center',
    fontWeight: '700',
    marginVertical: vs(50),
  },
  bottomSheet: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: hs(30),
    borderTopRightRadius: hs(30),
    paddingTop: vs(20),
    paddingHorizontal: hs(30),
  },
  subHeading: {
    fontWeight: '500',
    fontSize: ms(25),
    textAlign: 'center',
    marginVertical: vs(35),
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: hs(10),
  },
  flexOne: { flex: 1 },
  image: {
    height: vs(200),
  },
  continueBtnContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 2,
    borderRadius: hs(10),
    marginBottom: vs(20),
  },
  continueBtn: {
    borderWidth: 1,
    borderColor: COLORS.common.white,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: vs(30),
  },
  socialLoginIcon: {
    borderWidth: 2,
    borderRadius: hs(50),
    padding: ms(10),
    borderColor: COLORS.others.uiIconColor,
  },
});
