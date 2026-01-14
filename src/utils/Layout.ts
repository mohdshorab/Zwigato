import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * iPhone 16/17 standard base dimensions.
 */
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

//Horizontal Scale
export const hs = (size: number) =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;

//Verical Scale
export const vs = (size: number) =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

// Moderate Scale
export const ms = (size: number, factor = 0.5) =>
  size + (hs(size) - size) * factor;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
