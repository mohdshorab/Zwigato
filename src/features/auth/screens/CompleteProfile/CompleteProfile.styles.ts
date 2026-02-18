import { StyleSheet } from 'react-native';
import COLORS from '../../../../utils/constants/Colors';
import { hs, ms, vs } from '../../../../utils/Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ui.border,
  },
  scrollContent: {
    paddingBottom: vs(40),
  },
  headerBackground: {
    height: vs(20),
    borderBottomLeftRadius: ms(30),
    borderBottomRightRadius: ms(30),
  },
  card: {
    backgroundColor: COLORS.common.white,
    marginHorizontal: hs(20),
    marginTop: vs(50),
    borderRadius: ms(24),
    paddingHorizontal: hs(20),
    paddingBottom: vs(30),
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: -ms(60),
    marginBottom: vs(20),
  },
  profileImage: {
    height: ms(120),
    width: ms(120),
    borderRadius: ms(60),
    borderWidth: 4,
    borderColor: COLORS.ui.border,
    backgroundColor: COLORS.common.white,
  },
  editBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: ms(34),
    height: ms(34),
    borderRadius: ms(17),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.ui.border,
    backgroundColor: COLORS.common.white,
  },
  formGroup: {
    marginTop: vs(10),
    gap: vs(18),
  },
  buttonSpacing: {
    marginTop: vs(20),
  },
  phoneRow: {
    flexDirection: 'row',
    columnGap: hs(20),
  },

  phoneInputContainer: {
    flex: 1,
  },
  fieldError: {
    color: COLORS.ui.errorString,
    fontSize: ms(11),
    marginTop: vs(-6),
    marginBottom: vs(4),
    marginLeft: hs(4),
  },
  submitBtn: {
    marginTop: vs(24),
    marginBottom: vs(16),
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  flexOnly: { flex: 1 },
});

export default styles;
