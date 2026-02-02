import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import { hs, ms, vs } from '../../utils/Layout';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useState } from 'react';
import styles from './InputBox.styles';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';

type InputBoxProps = {
  title?: string;
  noOfLines?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  isEditable?: boolean;
  icon?: string;
  iconSize?: number;
};

const InputBox = ({
  title,
  noOfLines = 1,
  keyboardType = 'default',
  value,
  placeholder = '',
  onChangeText,
  isPassword = false,
  isEditable = true,
  icon = '',
  iconSize = 12,
}: InputBoxProps) => {
  const [isPassVisible, setIsPassVisible] = useState(isPassword);

  return (
    <View>
      {title && <Text style={styles.inputBoxTitle}>{title}</Text>}
      <View style={styles.InputBoxPassIcon}>
        <TextInput
          multiline={noOfLines > 1}
          keyboardType={keyboardType}
          value={value}
          style={[
            styles.inputBox,
            { paddingRight: isPassword ? hs(40) : hs(10) },
            icon && { paddingLeft: hs(40) },
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={isPassVisible}
          placeholderTextColor={COLORS.ui.borderGrey}
          editable={isEditable}
          accessibilityLabel={isPassVisible ? 'Show password' : 'Hide password'}
        />

        {isPassword && value.length ? (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => {
              setIsPassVisible(!isPassVisible);
            }}
          >
            <Ionicons
              name={isPassVisible ? 'eye-off' : 'eye'}
              size={ms(30)}
              color={COLORS.others.uiIconColor}
            />
          </TouchableOpacity>
        ) : null}
        {icon && (
          <CustomIonicIcon
            name={icon}
            size={iconSize}
            style={styles.searchIcon}
            color={COLORS.primary}
          />
        )}
      </View>
    </View>
  );
};

export default InputBox;
