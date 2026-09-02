import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLoginPress = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../../assets/images/welcome-bg.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover">
        {/* Dark overlay for contrast and sleek mood */}
        <View style={styles.darkOverlay} />

        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
          {/* Top Brand Tag */}
          <View style={styles.topBrandContainer}>
            <Text style={styles.brandName}>Florida Builders</Text>
            <Text style={styles.brandSubtitle}>Subcontractor App</Text>
          </View>

          {/* Spacer to push content */}
          <View style={styles.contentMiddleSpacer}>
            {/* Bold Headline */}
            <View style={styles.headlineContainer}>
              <Text style={styles.headlineText}>BETTER WINDOWS.</Text>
              <Text style={styles.headlineText}>BETTER SERVICE.</Text>
              <Text style={styles.headlineText}>BETTER RESULTS.</Text>
            </View>
          </View>

          {/* Bottom Card & Button Container */}
          <View style={styles.bottomContainer}>
            {/* Glassmorphic Info Card */}
            <View style={styles.glassCard}>
              <Text style={styles.glassCardText}>
                Quality window installation and repair, handled by a team you can rely on.
              </Text>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleLoginPress}
              style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 15, 26, 0.38)',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  /* Top Brand */
  topBrandContainer: {
    paddingTop: 16,
    paddingHorizontal: 4,
    gap: 3,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  brandSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.82)',
  },
  /* Headline */
  contentMiddleSpacer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 48,
    paddingHorizontal: 4,
  },
  headlineContainer: {
    gap: 6,
  },
  headlineText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    lineHeight: 38,
  },
  /* Bottom Glass Card & Action */
  bottomContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 8,
  },
  glassCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    paddingVertical: 22,
    paddingHorizontal: 22,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  glassCardText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
});
