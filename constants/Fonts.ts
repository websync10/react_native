/**
 * Font Configuration
 * Centralized font management for the Myuze app
 */

export const FontFamily = {
  // Primary font family - Helvetica Neue variants
  HelveticaNeue: {
    Thin: 'HelveticaNeue-Thin',
    Light: 'HelveticaNeue-Light',
    Regular: 'HelveticaNeue-Roman', // Using Medium as regular weight
    Medium: 'HelveticaNeue-Medium',
    Bold: 'HelveticaNeue-Bold',
    Heavy: 'HelveticaNeue-Heavy',
    Black: 'HelveticaNeue-Black',
  },
  
  // Monospace font
  SpaceMono: 'SpaceMono',
  
  // Backward compatibility aliases
  Default: 'HelveticaNeue-Roman',
  Primary: 'HelveticaNeue-Roman',
} as const;

export const FontWeight = {
  Thin: '100',
  Light: '300', 
  Regular: '400',
  Medium: '500',
  SemiBold: '600',
  Bold: '700',
  Heavy: '800',
  Black: '900',
} as const;

export const FontSize = {
  // Headings
  H1: 32,
  H2: 28,
  H3: 24,
  H4: 20,
  H5: 18,
  H6: 16,
  
  // Body text
  Large: 18,
  Medium: 16,
  Regular: 14,
  Small: 12,
  XSmall: 10,
  
  // UI elements
  Button: 16,
  Caption: 12,
  Label: 14,
} as const;

// Pre-defined text styles for common use cases
export const TextStyles = {
  // Headings
  h1: {
    fontFamily: FontFamily.HelveticaNeue.Bold,
    fontSize: FontSize.H1,
    lineHeight: FontSize.H1 * 1.2,
  },
  h2: {
    fontFamily: FontFamily.HelveticaNeue.Bold,
    fontSize: FontSize.H2,
    lineHeight: FontSize.H2 * 1.2,
  },
  h3: {
    fontFamily: FontFamily.HelveticaNeue.Medium,
    fontSize: FontSize.H3,
    lineHeight: FontSize.H3 * 1.2,
  },
  h4: {
    fontFamily: FontFamily.HelveticaNeue.Medium,
    fontSize: FontSize.H4,
    lineHeight: FontSize.H4 * 1.2,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: FontFamily.HelveticaNeue.Regular,
    fontSize: FontSize.Large,
    lineHeight: FontSize.Large * 1.4,
  },
  body: {
    fontFamily: FontFamily.HelveticaNeue.Regular,
    fontSize: FontSize.Regular,
    lineHeight: FontSize.Regular * 1.4,
  },
  bodySmall: {
    fontFamily: FontFamily.HelveticaNeue.Light,
    fontSize: FontSize.Small,
    lineHeight: FontSize.Small * 1.4,
  },
  
  // UI elements
  button: {
    fontFamily: FontFamily.HelveticaNeue.Medium,
    fontSize: FontSize.Button,
    lineHeight: FontSize.Button * 1.2,
  },
  caption: {
    fontFamily: FontFamily.HelveticaNeue.Light,
    fontSize: FontSize.Caption,
    lineHeight: FontSize.Caption * 1.3,
  },
  label: {
    fontFamily: FontFamily.HelveticaNeue.Medium,
    fontSize: FontSize.Label,
    lineHeight: FontSize.Label * 1.2,
  },
} as const;

export default {
  FontFamily,
  FontWeight,
  FontSize,
  TextStyles,
};
