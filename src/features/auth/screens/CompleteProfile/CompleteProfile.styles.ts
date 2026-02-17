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
  errorString: {
    fontWeight: '400',
    color: COLORS.common.red,
    alignSelf: 'center',
  },
});

export default styles;
