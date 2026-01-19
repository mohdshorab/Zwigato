import { ViewStyle, TextStyle, View, Text, Platform,} from 'react-native';
import {
  BaseToast,
  ToastConfig,
  BaseToastProps,
} from 'react-native-toast-message';
import { hs, ms, vs } from '../Layout';
import COLORS from '../constants/Colors';

export const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' } as ViewStyle}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={
        {
          fontSize: ms(15),
          fontWeight: '400',
        } as TextStyle
      }
    />
  ),

  nativeToast: ({ text1 }) => (
    <View
      style={[Platform.OS === 'ios' ? {width: '80%', marginTop: vs(50),} : {marginBottom:vs(50)},{
        backgroundColor: Platform.OS === 'ios' ? COLORS.common.white : COLORS.toast.androidBg ,
        alignItems: Platform.OS === 'android' ? 'center' : 'flex-start',
        paddingVertical: vs(5),
        paddingHorizontal: hs(20),
        borderRadius: hs(20),
      }]}
    >
      <Text
        style={{
          fontWeight: '300',
          fontSize: ms(18),
          color: Platform.OS === 'ios' ? COLORS.common.black : COLORS.common.white,
        }}
      >
        {text1}
      </Text>
    </View>
  ),
};