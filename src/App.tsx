import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './features/home/HomeScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
};

export default App;
