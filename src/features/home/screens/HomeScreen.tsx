import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.style';
import { useState } from 'react';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const [restaurants, setRestaurants] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
