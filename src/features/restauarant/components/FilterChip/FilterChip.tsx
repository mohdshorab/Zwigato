import { Text, TouchableOpacity } from 'react-native';
import { CustomIonicIcon } from '../../../../components';
import COLORS from '../../../../utils/constants/Colors';
import { ms } from '../../../../utils/Layout';
import styles from './FilterChip.styles';

type FilterChipProps = {
  title: string;
  icon: string;
  onPress?: () => void;
};

const FilterChip = ({ title, icon, onPress }: FilterChipProps) => {
  const getIconColor = () => {
    if (title === 'Non-Veg') return COLORS.common.red;
    if (title === 'Veg') return COLORS.common.green;
    return COLORS.common.black;
  };

  return (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
      <CustomIonicIcon
        name={icon}
        size={ms(14)}
        style={styles.icon}
        color={getIconColor()}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FilterChip;
