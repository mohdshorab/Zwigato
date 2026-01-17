import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
