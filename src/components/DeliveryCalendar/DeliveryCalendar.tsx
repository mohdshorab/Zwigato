import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styles from './DeliveryCalendar.styles';

interface DeliveryCalendarProps {
  onDateSelect: (date: string) => void;
  initialDate?: string;
  visible: boolean;
  onClose: () => void;
}

const DeliveryCalendar = ({
  onDateSelect,
  initialDate,
  visible,
  onClose,
}: DeliveryCalendarProps) => {
  const defaultDate = initialDate
    ? new Date(initialDate)
    : new Date(2000, 0, 1);

  const [tempDate, setTempDate] = useState<Date>(defaultDate);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      onClose();
      return;
    }
    if (selectedDate) {
      if (Platform.OS === 'android') {
        onDateSelect(selectedDate.toISOString().split('T')[0]);
        onClose();
      } else {
        setTempDate(selectedDate);
      }
    }
  };

  const handleDone = () => {
    onDateSelect(tempDate.toISOString().split('T')[0]);
    onClose();
  };

  const handleCancel = () => {
    setTempDate(defaultDate);
    onClose();
  };

  if (Platform.OS === 'android') {
    if (!visible) return null;
    return (
      <DateTimePicker
        value={defaultDate}
        mode="date"
        display="default"
        maximumDate={new Date()}
        minimumDate={new Date(1950, 0, 1)}
        onChange={handleChange}
      />
    );
  }

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleCancel}
        />
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDone}>
              <Text style={styles.doneBtn}>Done</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            minimumDate={new Date(1950, 0, 1)}
            onChange={handleChange}
            style={styles.picker}
            themeVariant="light"
          />
        </View>
      </View>
    </Modal>
  );
};

export default DeliveryCalendar;
