import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ImagePickerTriggerProps extends TouchableOpacityProps {
  children: ReactElement;
}

const ImagePickerTrigger: React.FC<ImagePickerTriggerProps> = ({
  children,
  ...rest
}) => {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
};
export default ImagePickerTrigger;
