import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';

const SplashScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Splash'>) => {
  return (
    <SafeAreaView>
      <Text>Splash Screen</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Onboarding');
        }}
      >
        <Text>Navigate</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SplashScreen;
