import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './AppButton.styles';

type AppButtonProps = {
  onPress: () => void;
  title: string;
buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const AppButton = ({
  onPress,
  title = '',
  buttonStyle,
  textStyle,
}: AppButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,buttonStyle]}>
      <Text style={[styles.text,textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
