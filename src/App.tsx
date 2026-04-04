import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './utils/toastConfig/toastConfig';
import AppInitializer from './AppInitializer';
import ErrorBoundary from './features/errorBoundary/ErrorBoundary';

const App = () => {
  if (__DEV__) {
    require('../ReactotronConfig');
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <AppInitializer>
            <RootNavigation />
            <Toast config={toastConfig} />
          </AppInitializer>
        </ErrorBoundary>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
