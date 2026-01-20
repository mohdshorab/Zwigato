import FastImage, { ImageStyle, Source } from 'react-native-fast-image';

type QuickImageProps = {
  source: string | number | Source;
  style: ImageStyle | ImageStyle[];
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
};

const QuickImage = ({
  source,
  style,
  resizeMode = 'cover',
}: QuickImageProps) => {
  const imageSource = typeof source == 'string' ? { uri: source } : source;
  return (
    <FastImage
      style={style}
      source={imageSource}
      resizeMode={FastImage.resizeMode[resizeMode]}
    />
  );
};

export default QuickImage;
