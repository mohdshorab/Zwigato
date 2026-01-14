import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './features/home/HomeScreen';
import RootNavigation from './navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigation/>
    </SafeAreaProvider>
  );
};

export default App;
