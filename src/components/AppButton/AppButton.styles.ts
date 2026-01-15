import { StyleSheet } from "react-native";
import { hs, ms, vs } from "../../utils/Layout";
import COLORS from "../../utils/constants/Colors";

const styles= StyleSheet.create({
  button:{
    paddingVertical: vs(10),
    paddingHorizontal: hs(10),
    alignItems: 'center',
    borderRadius: hs(10),
    backgroundColor: COLORS.primary
  },
  text:{
    color: COLORS.text.white,
    fontWeight: '500',
    fontSize: ms(20),   
  }
})
export default styles;