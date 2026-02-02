import { View } from 'react-native';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';
import InputBox from '../InputBox/InputBox';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import COLORS from '../../utils/constants/Colors';
import { useState } from 'react';
import styles from './CommonHeader.styles';

interface CommonheaderProps {
  needBack?: boolean;
  searchBox?: boolean;
  headEndIcon?: string;
  searchPlaceHolder?: string;
  navigation?: NavigationProp<RootStackParamList>;
  onSearchChange?: (text: string) => void;
  onPressHeadEndIcon?: () => void;
}

const CommonHeader = ({
  needBack,
  searchBox,
  headEndIcon,
  searchPlaceHolder = 'Search...',
  navigation,
  onSearchChange,
  onPressHeadEndIcon,
}: CommonheaderProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearchChange?.(text);
  };

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerContainer}>
      {needBack && (
        <CustomIonicIcon
          name="chevron-back"
          size={32}
          onPress={handleBackPress}
          style={styles.backButton}
          color={COLORS.common.black}
        />
      )}
      {searchBox && (
        <View style={styles.searchWrapper}>
          <InputBox
            value={searchText}
            onChangeText={t => handleSearchChange(t)}
            placeholder={searchPlaceHolder}
            icon="search"
            iconSize={18}
          />
        </View>
      )}
      {headEndIcon && (
        <CustomIonicIcon
          name={headEndIcon}
          size={25}
          style={styles.headEndIconButton}
          onPress={onPressHeadEndIcon}
        />
      )}
    </View>
  );
};

export default CommonHeader;
