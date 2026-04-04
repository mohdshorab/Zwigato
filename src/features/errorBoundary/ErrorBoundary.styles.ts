import { StyleSheet } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import { hs, ms, vs } from '../../utils/Layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hs(30),
  },
  iconContainer: {
    marginBottom: vs(20),
  },
  title: {
    fontSize: ms(24),
    fontWeight: 'bold',
    color: COLORS.common.black,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: ms(16),
    color: COLORS.ui.borderGrey,
    textAlign: 'center',
    marginTop: vs(12),
    marginBottom: vs(40),
    lineHeight: ms(22),
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: vs(14),
    paddingHorizontal: hs(50),
    borderRadius: ms(30),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.common.white,
    fontSize: ms(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
