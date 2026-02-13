import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { InputBox } from '../../../../components';
import { useEffect, useRef, useState } from 'react';
import styles from './OTPInputBox.styles';
import { validateOTPInput } from '../../../../utils/helpers/validators';

const ARRAY_SIZE = 6;
type OTPInputBoxProps = {
  onCodeFilled: (text: string) => void;
};

const OTPInputBox = ({ onCodeFilled }: OTPInputBoxProps) => {
  const [otpInput, setOtpInput] = useState<string>('');
  const [showErrorString, setShowErrorString] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const oneTimeCodeArray = new Array(ARRAY_SIZE).fill(0);

  useEffect(() => {
    if (otpInput.length === 6) onCodeFilled(otpInput);
  },[otpInput.length]);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const onchangeText = (t: string) => {
    setShowErrorString('');
    const validationResult = validateOTPInput(t);
    validationResult.isValid && setOtpInput(t);
    !validationResult.isValid &&
      setShowErrorString(validationResult.error || '');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.otpContainer} onPress={handlePress}>
        {oneTimeCodeArray.map((_, index) => {
          const char = otpInput[index] || '';
          const isFocused = otpInput.length === index;
          return (
            <View style={[styles.box, isFocused ? styles.activeBox : {}]}>
              <Text style={styles.otpText}>{char}</Text>
            </View>
          );
        })}
      </Pressable>
      {!!showErrorString.length && (
        <Text style={styles.errorString}>OTP must contain only numbers</Text>
      )}
      <View style={styles.hiddenInput}>
        <InputBox
          ref={inputRef}
          autoFocus
          value={otpInput}
          placeholder=""
          keyboardType="numeric"
          onChangeText={onchangeText}
          maxLength={6}
        />
      </View>
    </View>
  );
};

export default OTPInputBox;
