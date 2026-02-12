import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { ms } from '../../../../utils/Layout';
import styles from './SendingOtpModal.styles';

const SendingOtpModal = ({ visible = false }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.statusText}>Sending OTP</Text>
          <ActivityIndicator size={ms(30)} />
        </View>
      </View>
    </Modal>
  );
};

export default SendingOtpModal;