import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import QuickImage from '../../../../components/QuickImage/QuickImage';
import { iconSplash } from '../../../../assets/images';
import styles from './SplashScreen.styles';
import { StatusBar, Text,} from 'react-native';

const SplashScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Splash'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <QuickImage
        source={iconSplash}
        style={styles.iconSplash}
        resizeMode="contain"
      />
      {/* <ActivityIndicator size={'large'} color={COLORS.primary} /> */}
      <Text style={styles.bottomText}>Loading your 5-star experience...</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
