import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './utils/toastConfig/toastConfig';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
