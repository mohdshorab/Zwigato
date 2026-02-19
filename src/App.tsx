import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './utils/toastConfig/toastConfig';
import AppInitializer from './AppInitializer';

const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppInitializer>
          <RootNavigation />
          <Toast config={toastConfig} />
        </AppInitializer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
