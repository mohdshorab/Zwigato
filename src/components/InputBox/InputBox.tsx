import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import { hs, ms, vs } from '../../utils/Layout';
import Ionicons from '@react-native-vector-icons/ionicons';
import { forwardRef, useState } from 'react';
import styles from './InputBox.styles';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';

type InputBoxProps = {
  title?: string;
  noOfLines?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  value: string | number;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  isEditable?: boolean;
  icon?: string;
  iconSize?: number;
  autoFocus?: boolean;
  onEndEditing?: () => void;
  ref?: any;
  maxLength?: number;
};

const InputBox = forwardRef<TextInput, InputBoxProps>((props, ref) => {
  const {
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
    autoFocus = false,
    onEndEditing = () => {},
    maxLength = 30
  } = props;
  const [isPassVisible, setIsPassVisible] = useState(isPassword);

  return (
    <View>
      {title && <Text style={styles.inputBoxTitle}>{title}</Text>}
      <View style={styles.InputBoxPassIcon}>
        <TextInput
          ref={ref ? ref : null}
          autoFocus={autoFocus}
          maxLength={ maxLength}
          multiline={noOfLines > 1}
          keyboardType={keyboardType}
          value={value.toString()}
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
          onEndEditing={onEndEditing}
        />

        {isPassword && typeof value === 'string' && value.length ? (
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
});

export default InputBox;
