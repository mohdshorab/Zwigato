import Ionicons from '@react-native-vector-icons/ionicons';
import { ms } from '../../utils/Layout';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../utils/constants/Colors';

type IonicIconProps = {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size: number;
  style?: StyleProp<TextStyle>;
  color?: string;
  onPress?: () => void;
};

const CustomIonicIcon = ({
  name,
  size,
  color = COLORS.common.black,
  style,
  onPress = ()=>{},
}: IonicIconProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={name} size={size} style={style} color={color} />
    </TouchableOpacity>
  );
};

export default CustomIonicIcon;
