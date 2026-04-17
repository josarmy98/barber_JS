import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'elevated' | 'flat' | 'outline';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  onPress,
  variant = 'elevated' 
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const CardComponent = onPress ? TouchableOpacity : View;

  const getVariantStyle = () => {
    switch (variant) {
      case 'flat':
        return { backgroundColor: theme.card };
      case 'outline':
        return { 
          borderWidth: 1, 
          borderColor: theme.border, 
          backgroundColor: 'transparent' 
        };
      default:
        return { 
          backgroundColor: theme.card,
          ...Shadows.small 
        };
    }
  };

  return (
    <CardComponent 
      style={[styles.card, getVariantStyle(), style]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    overflow: 'hidden',
  },
});
