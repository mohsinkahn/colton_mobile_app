import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();

  // Settings Toggle States
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [passwordChangeNotification, setPasswordChangeNotification] = useState(true);
  const [inAppNotification, setInAppNotification] = useState(true);

  return (
    <ScrollView
      style={styles.screenBackground}
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: Math.max(safeAreaInsets.top, 16) + 8,
          paddingBottom: safeAreaInsets.bottom + BottomTabInset + 24,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainWrapper}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.greetingText}>Hello, Colton!</Text>
          <Text style={styles.subtitleText}>Here you handle the basic</Text>
          <Text style={styles.subtitleText}>settings.</Text>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.userInfoRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
              }}
              style={styles.avatarImage}
            />
            <View style={styles.userTextCol}>
              <Text style={styles.userNameText}>Alex Johnson</Text>
              <Text style={styles.userEmailText}>alex.j@example.com</Text>
            </View>
          </View>

          {/* Edit Profile Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/edit-profile')}
            style={styles.editProfileButton}>
            <Ionicons name="create-outline" size={16} color="#64748B" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Section 1: SECURITY */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>SECURITY</Text>
          <View style={styles.settingsCard}>
            {/* Row 1: Change Password */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/change-password')}
              style={styles.settingsRow}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            {/* Row 2: Two Factor Authentication */}
            <View style={styles.settingsRow}>
              <Text style={styles.settingLabel}>Two Factor Authentication</Text>
              <Switch
                value={twoFactorAuth}
                onValueChange={setTwoFactorAuth}
                trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Section 2: NOTIFICATION */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>NOTIFICATION</Text>
          <View style={styles.settingsCard}>
            {/* Row 1: Email Notification */}
            <View style={styles.settingsRow}>
              <Text style={styles.settingLabel}>Email notification</Text>
              <Switch
                value={emailNotification}
                onValueChange={setEmailNotification}
                trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            {/* Row 2: Password Change Notification */}
            <View style={styles.settingsRow}>
              <Text style={styles.settingLabel}>Password change notification</Text>
              <Switch
                value={passwordChangeNotification}
                onValueChange={setPasswordChangeNotification}
                trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.rowDivider} />

            {/* Row 3: In App Notification */}
            <View style={styles.settingsRow}>
              <Text style={styles.settingLabel}>In app notificaiton</Text>
              <Switch
                value={inAppNotification}
                onValueChange={setInAppNotification}
                trackColor={{ false: '#CBD5E1', true: '#3B82F6' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: '#DCEEFE', // Exact sky-blue gradient background from mockup
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  mainWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: 16,
  },
  /* Header Section */
  headerSection: {
    gap: 0,
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 34,
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#2563EB',
    lineHeight: 30,
  },
  /* User Profile Card */
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    gap: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  userTextCol: {
    gap: 2,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  userEmailText: {
    fontSize: 13,
    color: '#64748B',
  },
  editProfileButton: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  /* Settings Section Container */
  sectionContainer: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
    paddingLeft: 4,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  settingsRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
