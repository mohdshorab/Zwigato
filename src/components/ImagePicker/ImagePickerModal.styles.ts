import { StyleSheet } from 'react-native';
import { hs, ms, vs } from '../../utils/Layout';
import COLORS from '../../utils/constants/Colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.common.white,
    paddingVertical: vs(30),
    paddingHorizontal: hs(20),
    width: '100%',
    borderTopRightRadius: hs(20),
    borderTopLeftRadius: hs(20),
  },
  optionLeft: {
    marginRight: hs(40),
    alignItems: 'center',
  },
  optionRight: {
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: ms(16),
  },
  closeButton: {
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: ms(25),
    padding: ms(5),
    marginVertical: vs(20),
    backgroundColor: COLORS.common.white,
    borderColor: COLORS.common.black,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default styles;
