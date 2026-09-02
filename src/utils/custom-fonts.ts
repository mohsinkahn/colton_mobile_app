import React from 'react';
import { Platform, StyleSheet, Text, TextInput } from 'react-native';

function resolveFontForStyle(style: any) {
  const flattened = StyleSheet.flatten(style) || {};
  const weight = flattened.fontWeight;

  if (Platform.OS === 'web') {
    return "'Plus Jakarta Sans', sans-serif";
  }

  if (Platform.OS === 'ios') {
    return 'PlusJakartaSans';
  }

  // Android font matching
  if (weight === '800' || weight === '900') {
    return 'PlusJakartaSans-ExtraBold';
  }
  if (weight === '700' || weight === 'bold') {
    return 'PlusJakartaSans-Bold';
  }
  if (weight === '600') {
    return 'PlusJakartaSans-SemiBold';
  }
  if (weight === '500') {
    return 'PlusJakartaSans-Medium';
  }
  return 'PlusJakartaSans-Regular';
}

export function setupGlobalFont() {
  const TextComponent = Text as any;

  if (TextComponent && !TextComponent._plusJakartaFontApplied) {
    TextComponent._plusJakartaFontApplied = true;

    // Set defaultProps for compatibility
    if (TextComponent.defaultProps == null) {
      TextComponent.defaultProps = {};
    }
    TextComponent.defaultProps.style = [
      { fontFamily: Platform.OS === 'web' ? "'Plus Jakarta Sans', sans-serif" : 'PlusJakartaSans' },
      TextComponent.defaultProps.style,
    ];

    // Patch render if available to apply weight-aware Plus Jakarta Sans
    if (typeof TextComponent.render === 'function') {
      const originalTextRender = TextComponent.render;
      TextComponent.render = function (...args: any[]) {
        const origin = originalTextRender.call(this, ...args);
        if (!origin) return origin;

        const resolvedFamily = resolveFontForStyle(origin.props?.style);
        return React.cloneElement(origin, {
          style: [{ fontFamily: resolvedFamily }, origin.props?.style],
        });
      };
    }
  }

  const TextInputComponent = TextInput as any;
  if (TextInputComponent && !TextInputComponent._plusJakartaFontApplied) {
    TextInputComponent._plusJakartaFontApplied = true;

    if (TextInputComponent.defaultProps == null) {
      TextInputComponent.defaultProps = {};
    }
    TextInputComponent.defaultProps.style = [
      { fontFamily: Platform.OS === 'web' ? "'Plus Jakarta Sans', sans-serif" : 'PlusJakartaSans' },
      TextInputComponent.defaultProps.style,
    ];

    if (typeof TextInputComponent.render === 'function') {
      const originalTextInputRender = TextInputComponent.render;
      TextInputComponent.render = function (...args: any[]) {
        const origin = originalTextInputRender.call(this, ...args);
        if (!origin) return origin;

        const resolvedFamily = resolveFontForStyle(origin.props?.style);
        return React.cloneElement(origin, {
          style: [{ fontFamily: resolvedFamily }, origin.props?.style],
        });
      };
    }
  }
}
