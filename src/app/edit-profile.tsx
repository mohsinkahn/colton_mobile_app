import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth } from '@/constants/theme';

export default function EditProfileScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();

  // Form Fields State
  const [profileImageUri, setProfileImageUri] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [clientName, setClientName] = useState('Mohsin Khan');
  const [email, setEmail] = useState('Admin@gmail.com');
  const [phone, setPhone] = useState('+1-284-48962');
  const [address, setAddress] = useState('qe2e2434sad');

  // Handle Image Picking
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required to select a profile picture!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImageUri(result.assets[0].uri);
    }
  };

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

        <Text style={styles.headerTitle}>Edit Profile</Text>

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
          {/* Main White Card */}
          <View style={styles.outerCardContainer}>
            {/* Profile Picture Uploader Section */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePickImage}
              style={styles.pictureSection}>
              <View style={styles.avatarWrapper}>
                <Image source={{ uri: profileImageUri }} style={styles.profileAvatarImage} />
                <View style={styles.cameraBadge}>
                  <Ionicons name="camera" size={14} color="#FFFFFF" />
                </View>
              </View>

              <Text style={styles.changePictureText}>Change Picture</Text>
            </TouchableOpacity>

            {/* Inner Form Card */}
            <View style={styles.formInnerCard}>
              {/* Field 1: Client Name */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Client Name</Text>
                <TextInput
                  value={clientName}
                  onChangeText={setClientName}
                  style={styles.formInput}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Field 2: Email */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.formInput}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Field 3: Phone */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={styles.formInput}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* Field 4: Address */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Address</Text>
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  style={styles.formInput}
                  placeholderTextColor="#94A3B8"
                />
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
  /* Outer White Card */
  outerCardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    gap: 20,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  /* Profile Picture Section */
  pictureSection: {
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  avatarWrapper: {
    position: 'relative',
  },
  profileAvatarImage: {
    width: 140,
    height: 140,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  changePictureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  /* Form Inner Card */
  formInnerCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 16,
    gap: 14,
  },
  fieldContainer: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
  },
  formInput: {
    width: '100%',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#334155',
  },
  /* Save Changes Button */
  saveChangesButton: {
    width: '100%',
    height: 48,
    // backgroundColor: '#3B82F6',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
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
