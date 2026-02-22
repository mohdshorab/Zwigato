import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage) // Controls AsyncStorage tracking
  .configure({
    name: 'Zwigato',
    host: 'localhost', // Use IP address if testing on a physical device
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/, // Avoid cluttering logs with symbolication requests
    },
  })
  .connect();

// Clear Reactotron on reload for a fresh timeline
Reactotron.clear!();

export default Reactotron;
