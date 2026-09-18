import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
  },
});
