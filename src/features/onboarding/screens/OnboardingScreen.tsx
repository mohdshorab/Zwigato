import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './OnboardingScreen.styles';

const OnboardingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Onboarding Screen</Text>
    </SafeAreaView>
  );
};
export default OnboardingScreen;