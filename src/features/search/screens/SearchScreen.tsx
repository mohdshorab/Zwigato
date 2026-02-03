import { View, StatusBar, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonHeader } from '../../../components';
import COLORS from '../../../utils/constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import styles from './SearchScreen.styles';
// No Safeareview because
// SafeAreaView calculates insets after mounting, during fast modal animations,
// it starts at very top, causing a layout jump once the animation settles.
const SearchScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SearchScreen'>) => {
  const insets = useSafeAreaInsets();
  const { searchPlaceHolder, searchMode, contextId } = route?.params;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.common.white}
      />
      <CommonHeader
        showModalBackButton
        navigation={navigation}
        showSearchBox
        searchPlaceholder={searchPlaceHolder}
      />
    </View>
  );
};

export default SearchScreen;
