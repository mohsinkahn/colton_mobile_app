import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth } from '@/constants/theme';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();

  // Password Fields State
  const [currentPassword, setCurrentPassword] = useState('12345678');
  const [newPassword, setNewPassword] = useState('12345678');
  const [confirmPassword, setConfirmPassword] = useState('12345678');

  // Eye Icon Visibility Toggle States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveChanges = () => {
    // Navigate back to Settings on saving changes
    router.back();
  };

  return (
    <View style={styles.screenBackground}>
      {/* Fixed Top Header Bar */}
      <View style={[styles.headerBar, { paddingTop: Math.max(safeAreaInsets.top, 12) }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={styles.backButtonSquare}>
          <Ionicons name="chevron-back" size={20} color="#2563EB" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Change Password</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: Math.max(safeAreaInsets.bottom, 24) + 20 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>
          {/* Main White Card Container */}
          <View style={styles.cardContainer}>
            {/* Field 1: Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Password</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showCurrentPassword}
                  style={styles.passwordTextInput}
                  placeholderTextColor="#94A3B8"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowCurrentPassword((prev) => !prev)}
                  style={styles.eyeIconButton}>
                  <Ionicons
                    name={showCurrentPassword ? 'eye-outline' : 'eye-outline'}
                    size={20}
                    color="#2563EB"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Field 2: New Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>New Password</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                  style={styles.passwordTextInput}
                  placeholderTextColor="#94A3B8"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowNewPassword((prev) => !prev)}
                  style={styles.eyeIconButton}>
                  <Ionicons
                    name={showNewPassword ? 'eye-outline' : 'eye-outline'}
                    size={20}
                    color="#2563EB"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.helperText}>Your new password must be more than 8 characters.</Text>
            </View>

            {/* Field 3: Confirm Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Confirm Password</Text>
              <View style={styles.passwordInputWrapper}>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  style={styles.passwordTextInput}
                  placeholderTextColor="#94A3B8"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  style={styles.eyeIconButton}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-outline' : 'eye-outline'}
                    size={20}
                    color="#2563EB"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Save Changes Primary Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSaveChanges}
              style={styles.saveChangesButton}>
              <LinearGradient
                colors={['#5897FF', '#3C7FEC', '#488EFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveChangesButton}>
                <Text style={styles.saveChangesText}>Save Changes</Text>
              </LinearGradient>

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: '#DCEEFE', // Exact sky-blue gradient background from mockup
  },
  /* Header Bar */
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#DCEEFE',
  },
  backButtonSquare: {
    width: 38,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSpacer: {
    width: 38,
  },
  /* Scroll View Layout */
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  mainWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  /* Main White Card Container */
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    gap: 18,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  fieldContainer: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
  },
  passwordInputWrapper: {
    width: '100%',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  passwordTextInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#334155',
    letterSpacing: 2,
  },
  eyeIconButton: {
    padding: 4,
  },
  helperText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  /* Save Changes Button */
  saveChangesButton: {
    width: '100%',
    height: 48,
    // backgroundColor: '#3B82F6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  saveChangesText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
