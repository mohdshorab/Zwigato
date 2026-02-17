import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

type PickerSuccess = {
  result: ImagePickerResponse;
  error: null;
};

type PickerError = {
  result: null;
  error: {
    errorCode: string;
    errorMessage: string;
  };
};

type PickerResult = PickerSuccess | PickerError;

const imagePickerOptions = {
  openCamera: async (options: CameraOptions): Promise<PickerResult> => {
    const result = await launchCamera(options);
    if (!result.didCancel && result.assets?.length) {
      return { result, error: null };
    }

    if (result.errorCode && result.errorMessage) {
      return {
        result: null,
        error: {
          errorCode: result.errorCode,
          errorMessage: result.errorMessage,
        },
      };
    }

    return {
      result: null,
      error: {
        errorCode: 'UNKNOWN',
        errorMessage: 'User cancelled or unknown error',
      },
    };
  },

  openImageLibrary: async (
    options: ImageLibraryOptions,
  ): Promise<PickerResult> => {
    const result = await launchImageLibrary(options);

    if (!result.didCancel && result.assets?.length) {
      return { result, error: null };
    }

    if (result.errorCode && result.errorMessage) {
      return {
        result: null,
        error: {
          errorCode: result.errorCode,
          errorMessage: result.errorMessage,
        },
      };
    }

    return {
      result: null,
      error: {
        errorCode: 'UNKNOWN',
        errorMessage: 'User cancelled or unknown error',
      },
    };
  },
};

export default imagePickerOptions;
