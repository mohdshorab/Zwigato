import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { useAppSelector } from '../../../store/hooks';
import { CommonHeader } from '../../../components';

const CartSCreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CartScreen'>) => {
  const { user } = useAppSelector(state => state.authUser);

  return (
    <SafeAreaView>
      <CommonHeader showBackButton navigation={navigation} />
      <Text>{user?.userName}</Text>
    </SafeAreaView>
  );
};

export default CartSCreen;
