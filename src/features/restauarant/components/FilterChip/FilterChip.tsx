import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomIonicIcon } from '../../../../components';
import COLORS from '../../../../utils/constants/Colors';
import { hs, vs, ms } from '../../../../utils/Layout';

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

const styles = StyleSheet.create({
  chip: {
    borderWidth: 0.5,
    borderColor: COLORS.ui.borderGrey,
    paddingVertical: vs(5),
    paddingHorizontal: hs(10),
    borderRadius: ms(10),
    flexDirection: 'row',
    marginHorizontal: hs(10),
    marginVertical: vs(10),
    alignItems: 'center',
  },
  icon: {
    marginRight: hs(10),
  },
  text: {
    fontSize: ms(14),
    color: COLORS.text.primary,
  },
});

export default FilterChip;
