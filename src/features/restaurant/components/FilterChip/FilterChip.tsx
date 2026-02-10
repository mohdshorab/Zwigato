import { Text, TouchableOpacity } from 'react-native';
import { CustomIonicIcon } from '../../../../components';
import COLORS from '../../../../utils/constants/Colors';
import { ms } from '../../../../utils/Layout';
import styles from './FilterChip.styles';
import {
  FilterOption,
  FOOD_TYPES,
} from '../../../../utils/constants/restaurantConstants';

type FilterChipProps = {
  filterOptions: FilterOption;
  selectedId: number;
  onPress?: () => void;
};

const FilterChip = ({
  filterOptions,
  selectedId,
  onPress,
}: FilterChipProps) => {
  const getIconColor = () => {
    if (filterOptions.title === FOOD_TYPES.NON_VEG.type)
      return COLORS.common.red;
    if (filterOptions.title === FOOD_TYPES.VEG.type) return COLORS.common.green;
    return COLORS.common.black;
  };

  const getBackGroundColor = () => {
    return selectedId === filterOptions.id
      ? COLORS.ui.border
      : COLORS.common.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: getBackGroundColor(),
        },
      ]}
      onPress={onPress}
    >
      <CustomIonicIcon
        name={filterOptions.icon}
        size={ms(14)}
        style={styles.icon}
        color={getIconColor()}
      />
      <Text style={styles.text}>{filterOptions.title}</Text>
    </TouchableOpacity>
  );
};

export default FilterChip;
