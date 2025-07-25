import { FontFamily, FontSize, TextStyles } from '@/constants/Fonts';
import { FontFamilyType } from '@/types/fonts';
import { useMemo } from 'react';
import { TextStyle } from 'react-native';

interface UseFontOptions {
  family?: keyof typeof FontFamily.HelveticaNeue | 'SpaceMono' | 'Default';
  size?: keyof typeof FontSize | number;
  weight?: keyof typeof FontFamily.HelveticaNeue;
  customStyle?: TextStyle;
}

/**
 * Custom hook for consistent font usage across the app
 */
export const useFont = (options: UseFontOptions = {}): TextStyle => {
  return useMemo(() => {
    const { family = 'Regular', size = 'Regular', weight, customStyle = {} } = options;
    
    let fontFamily: FontFamilyType;
    let fontSize: number;
    
    // Determine font family
    if (family === 'SpaceMono') {
      fontFamily = FontFamily.SpaceMono;
    } else if (family === 'Default') {
      fontFamily = FontFamily.Default;
    } else if (weight) {
      fontFamily = FontFamily.HelveticaNeue[weight];
    } else {
      fontFamily = FontFamily.HelveticaNeue[family as keyof typeof FontFamily.HelveticaNeue] || FontFamily.Default;
    }
    
    // Determine font size
    if (typeof size === 'number') {
      fontSize = size;
    } else {
      fontSize = FontSize[size as keyof typeof FontSize] || FontSize.Regular;
    }
    
    return {
      fontFamily,
      fontSize,
      lineHeight: fontSize * 1.4, // Default line height
      ...customStyle,
    };
  }, [options]);
};

/**
 * Predefined text styles hook
 */
export const useTextStyle = (styleKey: keyof typeof TextStyles): TextStyle => {
  return useMemo(() => TextStyles[styleKey], [styleKey]);
};

/**
 * Get font family by weight
 */
export const getFontFamily = (weight: keyof typeof FontFamily.HelveticaNeue = 'Regular'): FontFamilyType => {
  return FontFamily.HelveticaNeue[weight];
};

/**
 * Get responsive font size based on device
 */
export const getResponsiveFontSize = (baseSize: number, scale: number = 1): number => {
  return Math.round(baseSize * scale);
};

export default {
  useFont,
  useTextStyle,
  getFontFamily,
  getResponsiveFontSize,
};
