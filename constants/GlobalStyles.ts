import { StyleSheet } from 'react-native';
import { FontFamily, TextStyles } from './Fonts';

export const GlobalStyles = StyleSheet.create({
  text: {
    fontFamily: FontFamily.HelveticaNeue.Regular,
    fontSize: 14,
    lineHeight: 20,
  },
  heading: {
    ...TextStyles.h3,
  },
  subheading: {
    ...TextStyles.h4,
  },
  body: {
    ...TextStyles.body,
  },
  caption: {
    ...TextStyles.caption,
  },
  
  // Additional common styles
  bodyLarge: {
    ...TextStyles.bodyLarge,
  },
  bodySmall: {
    ...TextStyles.bodySmall,
  },
  button: {
    ...TextStyles.button,
  },
  label: {
    ...TextStyles.label,
  },
});

// Backward compatibility
export const defaultFontFamily = FontFamily.Default;
