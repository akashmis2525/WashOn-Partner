import { Platform } from 'react-native';

export const Typography = {
  fontFamily: {
    regular: Platform.select({ ios: 'System', android: 'Roboto' }),
    medium: Platform.select({ ios: 'System', android: 'Roboto' }),
    semiBold: Platform.select({ ios: 'System', android: 'Roboto' }),
    bold: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 26,
    xxxl: 32,
  },
};
