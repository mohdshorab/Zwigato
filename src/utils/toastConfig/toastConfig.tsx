import { ViewStyle, TextStyle, View, Text, Platform } from 'react-native';
import {
  BaseToast,
  ToastConfig,
  BaseToastProps,
} from 'react-native-toast-message';
import { hs, ms, vs } from '../Layout';
import COLORS from '../constants/Colors';
import { CustomIonicIcon } from '../../components';

export const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <View
      style={{
        width: '90%',
        backgroundColor: COLORS.common.white,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.toast.success,
        borderRadius: 8,
        paddingVertical: vs(12),
        paddingHorizontal: hs(16),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.common.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <CustomIonicIcon
        name="checkmark-circle"
        size={ms(24)}
        color={COLORS.toast.success || '#10B981'}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: hs(12),
          fontSize: ms(14),
          fontWeight: '500',
          color: COLORS.common.black,
        }}
      >
        {props.text1}
      </Text>
    </View>
  ),

  error: (props: BaseToastProps) => (
    <View
      style={{
        width: '90%',
        backgroundColor: COLORS.common.white,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.toast.error,
        borderRadius: 8,
        paddingVertical: vs(12),
        paddingHorizontal: hs(16),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.common.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <CustomIonicIcon
        name="close-circle"
        size={ms(24)}
        color={COLORS.toast.error}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: hs(12),
          fontSize: ms(14),
          fontWeight: '500',
          color: COLORS.common.black,
        }}
      >
        {props.text1}
      </Text>
    </View>
  ),

  warning: (props: BaseToastProps) => (
    <View
      style={{
        width: '90%',
        backgroundColor: COLORS.common.white,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.toast.warning,
        borderRadius: 8,
        paddingVertical: vs(12),
        paddingHorizontal: hs(16),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.common.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <CustomIonicIcon
        name="warning"
        size={ms(24)}
        color={COLORS.toast.warning}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: hs(12),
          fontSize: ms(14),
          fontWeight: '500',
          color: COLORS.common.black,
        }}
      >
        {props.text1}
      </Text>
    </View>
  ),

  info: (props: BaseToastProps) => (
    <View
      style={{
        width: '90%',
        backgroundColor: COLORS.common.white,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.toast.info,
        borderRadius: 8,
        paddingVertical: vs(12),
        paddingHorizontal: hs(16),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: COLORS.common.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <CustomIonicIcon
        name="information-circle"
        size={ms(24)}
        color={COLORS.toast.info}
      />
      <Text
        style={{
          flex: 1,
          marginLeft: hs(12),
          fontSize: ms(14),
          fontWeight: '500',
          color: COLORS.common.black,
        }}
      >
        {props.text1}
      </Text>
    </View>
  ),
};
