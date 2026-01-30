import { StyleSheet } from "react-native";
import { hs, ms, vs } from "../../utils/Layout";
import COLORS from "../../utils/constants/Colors";

const styles = StyleSheet.create({
  button: {
    paddingVertical: vs(10),
    paddingHorizontal: hs(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hs(10),
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  text: {
    fontWeight: '500',
    fontSize: ms(16),
  },
  primaryText: {
    color: COLORS.text.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});

export default styles;