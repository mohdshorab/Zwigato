import { ActivityIndicator, Modal, Text, View } from 'react-native';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';
import styles from './ImagePickerModal.styles';
import { ms } from '../../utils/Layout';
import imagePickerOptions from './ImagePicker.service';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import ImagePickerTrigger from './ImagePickerTrigger';
import COLORS from '../../utils/constants/Colors';
import { useState } from 'react';
import ShowAppToast from '../ShowAppToast/ShowAppToast';

type ImagePickerModalProps = {
  showModal: boolean;
  onClose: () => void;
  returnUserPhoto: (t: string) => void;
};

const ImagePickerModal = ({
  showModal,
  onClose,
  returnUserPhoto,
}: ImagePickerModalProps) => {
  const [showLoader, setShowLoader] = useState(false);

  const onPressCameraOption = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };
    try {
      setShowLoader(true);
      const cameraResponse = await imagePickerOptions.openCamera(options);
      if (
        !cameraResponse.error &&
        cameraResponse.result.assets?.length &&
        cameraResponse.result.assets?.length > 0
      ) {
        returnUserPhoto(cameraResponse.result.assets[0].uri || '');
        onClose();
      }
    } catch (e: any) {
      ShowAppToast(e.message ?? 'Something went wrong!', 'error');
    } finally {
      setShowLoader(false);
    }
  };

  const onPressImageLibraryOption = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 1,
    };
    try {
      setShowLoader(true);
      const imageLibraryRes = await imagePickerOptions.openImageLibrary(
        options,
      );

      if (
        !imageLibraryRes.error &&
        imageLibraryRes.result.assets?.length &&
        imageLibraryRes.result.assets?.length > 0
      ) {
        returnUserPhoto(imageLibraryRes.result.assets[0].uri || '');
        onClose();
      }
    } catch (e: any) {
      ShowAppToast(e.message ?? 'Something went wrong!', 'error');
    } finally {
      setShowLoader(false);
    }
  };

  const renderCameraOption = () => {
    return (
      <View style={styles.optionLeft}>
        <CustomIonicIcon name="camera-outline" size={ms(44)} />
        <Text style={styles.text}>Camera</Text>
      </View>
    );
  };
  const renderImageLibraryOption = () => {
    return (
      <View style={styles.optionRight}>
        <CustomIonicIcon name="image-outline" size={ms(44)} />
        <Text style={styles.text}>Gallery</Text>
      </View>
    );
  };
  return (
    <Modal
      visible={showModal}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <CustomIonicIcon
          name="close-outline"
          size={30}
          color={COLORS.common.black}
          onPress={onClose}
          style={styles.closeButton}
        />
        <View style={styles.container}>
          <ImagePickerTrigger onPress={onPressCameraOption}>
            {renderCameraOption()}
          </ImagePickerTrigger>
          <ImagePickerTrigger onPress={onPressImageLibraryOption}>
            {renderImageLibraryOption()}
          </ImagePickerTrigger>
        </View>
        {showLoader && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size={ms(44)} color={COLORS.common.white} />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
