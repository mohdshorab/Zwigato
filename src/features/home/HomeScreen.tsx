import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.style';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ENDPOINTS } from '../../api/urlConfig';
import apiClient from '../../api/apiClient';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    console.log('SHORAB', restaurants);
    const fetchdata = async () => {
      try {
        console.log('AXIOS API CLIENT');
        const res = await apiClient.get(`${ENDPOINTS.RESTAURANT}`);
        console.log('SHORAB', res.data);
        setRestaurants(res?.data);
      } catch (e: any) {
        console.log('Axios Error :', e);
      }
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
