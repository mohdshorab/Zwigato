import { View } from 'react-native';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';
import InputBox from '../InputBox/InputBox';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/NavigationTypes';
import COLORS from '../../utils/constants/Colors';
import { useState } from 'react';
import styles from './CommonHeader.styles';
import AppButton from '../AppButton/AppButton';
import { ms } from '../../utils/Layout';

interface CommonheaderProps {
  showBackButton?: boolean;
  showModalBackButton?: boolean;
  showSearchBox?: boolean;
  endIcon?: string;
  searchPlaceholder?: string;
  navigation?: NavigationProp<RootStackParamList>;
  onSearchChange?: (text: string) => void;
  onEndIconPress?: () => void;
  showSearchIcon?: boolean;
  onSearchIconPress?: () => void;
}

const CommonHeader = ({
  showBackButton,
  showModalBackButton,
  showSearchBox,
  endIcon,
  searchPlaceholder = 'Search...',
  navigation,
  onSearchChange,
  onEndIconPress,
  showSearchIcon,
  onSearchIconPress,
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
      {showBackButton ? (
        <CustomIonicIcon
          name="chevron-back-outline"
          size={ms(32)}
          onPress={handleBackPress}
          style={styles.backButton}
          color={COLORS.common.black}
        />
      ) : showModalBackButton ? (
        <CustomIonicIcon
          name="chevron-down-outline"
          size={32}
          onPress={handleBackPress}
          style={styles.backButton}
          color={COLORS.common.black}
        />
      ) : null}
      {showSearchBox && (
        <View style={styles.searchWrapper}>
          <InputBox
            value={searchText}
            onChangeText={t => handleSearchChange(t)}
            placeholder={searchPlaceholder}
            icon="search"
            iconSize={18}
          />
        </View>
      )}
      {!showSearchBox && <View style={ styles.stretchWrapper} />}
      <View style={styles.rightIconContainer}>
        {!showSearchBox && showSearchIcon && (
          <AppButton
            title="Search"
            onPress={onSearchIconPress || (() => {})}
            icon="search-outline"
            variant="outline"
            iconSize={ms(18)}
          />
        )}
        {endIcon && (
          <CustomIonicIcon
            name={endIcon}
            size={25}
            style={styles.headEndIconButton}
            onPress={onEndIconPress}
          />
        )}
      </View>
    </View>
  );
};

export default CommonHeader;
