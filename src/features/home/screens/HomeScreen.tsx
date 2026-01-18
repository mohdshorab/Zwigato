import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './HomeScreen.style';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { useAppSelector } from '../../../store/hooks';
import { Restaurant } from '../../../types/restaurant';

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'HomeScreen'>) => {
  const restaurantsList: Restaurant[] = useAppSelector(
    state => state.restaurants.items,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen</Text>
      <FlashList
        data={restaurantsList}
        renderItem={({ item }) => {
          return <Text style={{ color: 'red' }}>{item?.name}</Text>;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
