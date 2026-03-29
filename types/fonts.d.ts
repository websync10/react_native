/**
 * Font type definitions for the Myuze app
 */

export type FontFamilyType = 
  | 'HelveticaNeue-Thin'
  | 'HelveticaNeue-Light'
  | 'HelveticaNeue-Roman'
  | 'HelveticaNeue-Medium'
  | 'HelveticaNeue-Bold'
  | 'HelveticaNeue-Heavy'
  | 'HelveticaNeue-Black'
  | 'SpaceMono'
  // Backward compatibility
  | 'Helvetica'
  | 'Helvetica-Medium'
  | 'HelveticaNeue'
  | 'Helvetica Neue'
  | 'HelveticaNeueMedium'
  | 'HelveticaNeueLight';

export type FontWeightType = 
  | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  | 'thin' | 'ultraLight' | 'light' | 'normal' | 'medium' | 'semiBold' | 'bold' | 'heavy' | 'black';

export type FontSizeType = number;

export interface TextStyleType {
  fontFamily: FontFamilyType;
  fontSize: FontSizeType;
  lineHeight?: number;
  fontWeight?: FontWeightType;
  letterSpacing?: number;
}

declare module 'react-native' {
  interface TextStyle {
    fontFamily?: FontFamilyType;
  }
}
