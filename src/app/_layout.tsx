import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { setupGlobalFont } from '@/utils/custom-fonts';

setupGlobalFont();

SplashScreen.preventAutoHideAsync();

const AppTheme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    regular: { fontFamily: 'PlusJakartaSans', fontWeight: '400' as const },
    medium: { fontFamily: 'PlusJakartaSans-Medium', fontWeight: '500' as const },
    bold: { fontFamily: 'PlusJakartaSans-Bold', fontWeight: '700' as const },
    heavy: { fontFamily: 'PlusJakartaSans-ExtraBold', fontWeight: '800' as const },
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'PlusJakartaSans': PlusJakartaSans_400Regular,
    'PlusJakartaSans-Regular': PlusJakartaSans_400Regular,
    'PlusJakartaSans-Medium': PlusJakartaSans_500Medium,
    'PlusJakartaSans-SemiBold': PlusJakartaSans_600SemiBold,
    'PlusJakartaSans-Bold': PlusJakartaSans_700Bold,
    'PlusJakartaSans-ExtraBold': PlusJakartaSans_800ExtraBold,
    'Plus Jakarta Sans': PlusJakartaSans_400Regular,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={AppTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="home-view" options={{ headerShown: false }} />
        <Stack.Screen name="order-detail" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
        <Stack.Screen name="change-password" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

