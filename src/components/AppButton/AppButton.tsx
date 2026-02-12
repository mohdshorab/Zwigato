import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styles from './AppButton.styles';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';
import COLORS from '../../utils/constants/Colors';
import { ms } from '../../utils/Layout';

type AppButtonProps = {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'outline';
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: string;
  iconSize?: number;
  disable?: boolean;
};

const AppButton = ({
  onPress,
  title = '',
  variant = 'primary',
  buttonStyle,
  textStyle,
  icon,
  iconSize = ms(16),
  disable = false,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      onPress={!disable ? onPress : ()=>{}}
      activeOpacity={disable ? 1 : 0.2}
      style={[
        styles.button,
        variant === 'outline' ? styles.outlineButton : styles.primaryButton,
        buttonStyle,
        icon && { flexDirection: 'row' },
        disable && { backgroundColor: COLORS.ui.borderGrey },
      ]}
    >
      {icon && (
        <CustomIonicIcon
          name={icon}
          size={ms(iconSize)}
          color={variant === 'outline' ? COLORS.primary : COLORS.common.white}
          style={styles.buttonWithIcon}
        />
      )}
      <Text
        style={[
          styles.text,
          variant === 'outline' ? styles.outlineText : styles.primaryText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
