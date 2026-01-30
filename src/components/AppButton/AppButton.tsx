import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styles from './AppButton.styles';

type AppButtonProps = {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'outline';
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const AppButton = ({
  onPress,
  title = '',
  variant = 'primary',
  buttonStyle,
  textStyle,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === 'outline' ? styles.outlineButton : styles.primaryButton,
        buttonStyle,
      ]}
    >
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
