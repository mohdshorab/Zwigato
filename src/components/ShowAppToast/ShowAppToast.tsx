import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

const ShowAppToast = (text: string) => {
  return Toast.show({
    type: 'nativeToast',
    text1: text,
    visibilityTime: 2000,
    position: Platform.OS === 'ios' ? 'top' : 'bottom',
  });
};

export default ShowAppToast;
