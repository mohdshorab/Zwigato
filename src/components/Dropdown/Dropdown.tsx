import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Dropdown.styles';

interface DropDownProps {
  onPressOption: (optionId: number) => void;
  optionsArray: any;
  title: string;
}

const Dropdown = ({ onPressOption, optionsArray, title }: DropDownProps) => {
  const [selectedOption, setSelectedOption] = useState('Select');
  const [showDropdownList, setShowDropdownList] = useState(false);

  return (
    <View style={styles.container}>
      {title && <Text style={styles.titleText}>{title}</Text>}
      {!showDropdownList ? (
        <TouchableOpacity
          style={styles.collapsedContainer}
          onPress={() => setShowDropdownList(!showDropdownList)}
        >
          <Text style={styles.selectedText}>{selectedOption}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.expandedContainer}>
          {optionsArray.map((a: any) => {
            return (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => {
                  setSelectedOption(a.dropdownItem);
                  setShowDropdownList(!showDropdownList);
                  onPressOption(a.id);
                }}
              >
                <Text style={styles.optionText}>{a.dropdownItem}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
