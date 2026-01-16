import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.style';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BASE_URL, ENDPOINTS } from '../../api/urlConfig';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch(`${BASE_URL}${ENDPOINTS.RESTAURANT}`);
      const json = await res.json();
      setRestaurants(json);
    };
    fetchdata();
    console.log(restaurants);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
