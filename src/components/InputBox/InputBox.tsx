import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../utils/constants/Colors';
import { hs, ms, vs } from '../../utils/Layout';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useState } from 'react';
import styles from './InputBox.styles';

type InputBoxProps = {
  title?: string;
  noOfLines?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  isPassword?: boolean;
  isEditable?: boolean
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
}: InputBoxProps) => {
  const [isPassVisible, setIsPassVisible] = useState(isPassword);

  return (
    <View style={styles.inputBoxContainer}>
      {title && <Text style={styles.inputBoxTitle}>{title}</Text>}
      <View style={styles.InputBoxPassIcon}>
        <TextInput
          numberOfLines={noOfLines}
          keyboardType={keyboardType}
          value={value}
          style={[
            styles.inputBox,
            { paddingRight: isPassword ? hs(40) : hs(10) },
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText || (()=>{})}
          secureTextEntry={isPassVisible}
          placeholderTextColor={COLORS.others.uiIconColor}
          editable={isEditable}
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
      </View>
    </View>
  );
};

export default InputBox;
