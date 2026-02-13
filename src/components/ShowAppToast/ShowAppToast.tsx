import { Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'warning' | 'info';

const ShowAppToast = (text: string, type: ToastType = 'info') => {
  const baseDuration = 2000;
  const duration = Math.max(baseDuration, text.length * 100);

  Toast.show({
    type: type,
    text1: text,
    visibilityTime: duration,
    position: 'top',
    topOffset: 70,
  });
};

export default ShowAppToast;
