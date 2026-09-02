import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth } from '@/constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface NoteItem {
  id: string;
  avatar: string;
  author: string;
  timestamp: string;
  comment: string;
}

interface ActivityItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  timestamp: string;
}

const INITIAL_NOTES: NoteItem[] = [
  {
    id: '1',
    avatar: 'FA',
    author: 'Foyez Ahmed',
    timestamp: 'Today',
    comment:
      'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
  },
  {
    id: '2',
    avatar: 'FA',
    author: 'Foyez Ahmed',
    timestamp: 'Today',
    comment:
      'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
  },
  {
    id: '3',
    avatar: 'FA',
    author: 'Foyez Ahmed',
    timestamp: 'Today',
    comment:
      'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
  },
];

const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: '3',
    stepNumber: '03',
    title: 'Agreement Set up',
    description: 'Created new rental contract with Foyez Ahmed',
    timestamp: 'Now',
  },
  {
    id: '2',
    stepNumber: '02',
    title: 'Usage Tracking & Billing',
    description: 'Generated usage report for period Sep 24–28',
    timestamp: 'Yesterday',
  },
  {
    id: '1',
    stepNumber: '01',
    title: 'Work Order Created',
    description: 'System initialized the installation order',
    timestamp: '16–Jan–2026',
  },
];

// Abstract wallpaper sample images for gallery
const SAMPLE_PHOTO_IDS = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function OrderDetailScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ source?: string }>();
  const isRequestMode = params.source === 'requests';

  // Tab States
  const [mainTab, setMainTab] = useState<'overview' | 'photos'>('overview');
  const [subTab, setSubTab] = useState<'notes' | 'activities'>('notes');

  // Notes State
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [newNoteText, setNewNoteText] = useState('');

  // Photos Gallery & Selection State
  const [photos, setPhotos] = useState<string[]>(SAMPLE_PHOTO_IDS);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Job Status Drawer State
  const [isJobStatusExpanded, setIsJobStatusExpanded] = useState(false);
  const [jobStatus, setJobStatus] = useState<string>('On hold');

  // Handlers
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newEntry: NoteItem = {
      id: Date.now().toString(),
      avatar: 'FA',
      author: 'Foyez Ahmed',
      timestamp: 'Just now',
      comment: newNoteText.trim(),
    };

    setNotes([newEntry, ...notes]);
    setNewNoteText('');
  };

  const handlePhotoLongPress = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSelectionMode(true);
    if (!selectedPhotoIds.includes(id)) {
      setSelectedPhotoIds((prev) => [...prev, id]);
    }
  };

  const handlePhotoPress = (id: string) => {
    if (isSelectionMode) {
      handleToggleSelectPhoto(id);
    }
  };

  const handleToggleSelectPhoto = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedPhotoIds.includes(id)) {
      const next = selectedPhotoIds.filter((item) => item !== id);
      setSelectedPhotoIds(next);
      if (next.length === 0) {
        setIsSelectionMode(false);
      }
    } else {
      setSelectedPhotoIds((prev) => [...prev, id]);
      setIsSelectionMode(true);
    }
  };

  const handleConfirmDeletePhotos = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPhotos((prev) => prev.filter((id) => !selectedPhotoIds.includes(id)));
    setSelectedPhotoIds([]);
    setIsSelectionMode(false);
    setIsDeleteModalVisible(false);
  };

  const handleToggleJobStatusExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsJobStatusExpanded((prev) => !prev);
  };

  const handleSelectJobStatus = (newStatus: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setJobStatus(newStatus);
    setIsJobStatusExpanded(false);
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

        <Text style={styles.headerTitle}>Order Details</Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Dimmed Overlay when Job Status Drawer is Expanded */}
      {isJobStatusExpanded && (
        <Pressable style={styles.drawerBackdropOverlay} onPress={handleToggleJobStatusExpand} />
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom:
              safeAreaInsets.bottom +
              (selectedPhotoIds.length > 0 ? 170 : isJobStatusExpanded ? 240 : 130),
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>
          {/* Top Job Summary Card */}
          <View style={styles.cardContainer}>
            {/* Job Type Row */}
            <View style={styles.cardRowBetween}>
              <Text style={styles.greyLabel}>Job Type:</Text>
              <View style={[styles.badge, styles.badgeService]}>
                <Text style={styles.badgeTextService}>Service</Text>
              </View>
            </View>

            {/* Division & Scheduled Row */}
            <View style={styles.cardRowBetween}>
              <View style={styles.divisionContainer}>
                <Text style={styles.divisionText}>North Division</Text>
                <Text style={styles.addressText}>4319 Wakefield St, Philadelphia</Text>
              </View>

              <View style={styles.scheduledContainer}>
                <Text style={styles.scheduledLabel}>SCHEDULED</Text>
                <Text style={styles.scheduledDateText}>Mar 30, 2025</Text>
              </View>
            </View>

            {/* Key-Value Details Table */}
            <View style={styles.tableBox}>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Order Date</Text>
                <Text style={styles.tableValue}>16-Jan-2026</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Completion Date</Text>
                <Text style={styles.tableValue}>30-Jan-2025</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Order Number</Text>
                <Text style={styles.tableValue}>#7032478</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Lot Number</Text>
                <Text style={styles.tableValue}>#5647</Text>
              </View>
            </View>

            {/* Status Row */}
            <View style={styles.cardRowBetween}>
              <Text style={styles.greyLabel}>Status</Text>
              <View
                style={[
                  styles.badge,
                  jobStatus === 'Completed'
                    ? styles.badgeCompleted
                    : jobStatus === 'In Progress'
                      ? styles.badgeInProgress
                      : styles.badgeOnHold,
                ]}>
                <Text
                  style={[
                    styles.badgeTextOnHold,
                    jobStatus === 'Completed'
                      ? styles.badgeTextCompleted
                      : jobStatus === 'In Progress'
                        ? styles.badgeTextInProgress
                        : styles.badgeTextOnHold,
                  ]}>
                  {jobStatus}
                </Text>
              </View>
            </View>
          </View>

          {/* Main Segmented Control: Overview / Photos */}
          <View style={styles.segmentedContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMainTab('overview')}
              style={[styles.segmentedTab, mainTab === 'overview' && styles.segmentedTabActive]}>
              <Text
                style={[
                  styles.segmentedTabText,
                  mainTab === 'overview' && styles.segmentedTabTextActive,
                ]}>
                Overview
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMainTab('photos')}
              style={[styles.segmentedTab, mainTab === 'photos' && styles.segmentedTabActive]}>
              <Text
                style={[
                  styles.segmentedTabText,
                  mainTab === 'photos' && styles.segmentedTabTextActive,
                ]}>
                Photos
              </Text>
            </TouchableOpacity>
          </View>

          {/* MAIN TAB CONTENT: Overview (Description) OR Photos (Thumbnail Gallery) */}
          {mainTab === 'overview' ? (
            /* Description / Scope Card */
            <View style={styles.cardContainer}>
              <Text style={styles.sectionHeaderTitle}>DESCRIPTION / SCOPE</Text>
              <Text style={styles.descriptionText}>
                Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in
                varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor. In
                vulputate lorem quis dui vestibulum, vitae imperdiet diam bibendum.
              </Text>
            </View>
          ) : (
            /* Photos Thumbnail Gallery Card */
            <View style={styles.cardContainer}>
              {/* Header Row: Thumbnail Gallery + Action Icons */}
              <View style={styles.galleryHeaderRow}>
                <Text style={styles.galleryHeaderTitle}>Thumbnail Gallery</Text>

                <View style={styles.galleryActionIcons}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.galleryIconButton}>
                    <Ionicons name="download-outline" size={18} color="#64748B" />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.galleryIconButton}>
                    <Ionicons name="arrow-up-outline" size={18} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Photos 2-Column Grid */}
              <View style={styles.photosGrid2Col}>
                {photos.map((photoId) => {
                  const isSelected = selectedPhotoIds.includes(photoId);

                  return (
                    <TouchableOpacity
                      key={photoId}
                      activeOpacity={0.9}
                      onPress={() => handlePhotoPress(photoId)}
                      onLongPress={() => handlePhotoLongPress(photoId)}
                      style={styles.photoGridCard}>
                      {/* Abstract Wallpaper Image */}
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
                        }}
                        style={styles.photoImage}
                      />

                      {/* Checkbox Overlay (Shown in Selection Mode) */}
                      {isSelectionMode && (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleToggleSelectPhoto(photoId)}
                          style={styles.checkboxOverlayContainer}>
                          {isSelected ? (
                            <View style={styles.checkboxChecked}>
                              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                            </View>
                          ) : (
                            <View style={styles.checkboxUnchecked} />
                          )}
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Sub Segmented Control: Notes / Activities (ALWAYS VISIBLE BELOW) */}
          <View style={styles.subSegmentedContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSubTab('notes')}
              style={[
                styles.subSegmentedTab,
                subTab === 'notes' && styles.subSegmentedTabActive,
              ]}>
              <Text
                style={[
                  styles.subSegmentedTabText,
                  subTab === 'notes' && styles.subSegmentedTabTextActive,
                ]}>
                Notes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSubTab('activities')}
              style={[
                styles.subSegmentedTab,
                subTab === 'activities' && styles.subSegmentedTabActive,
              ]}>
              <Text
                style={[
                  styles.subSegmentedTabText,
                  subTab === 'activities' && styles.subSegmentedTabTextActive,
                ]}>
                Activities
              </Text>
            </TouchableOpacity>
          </View>

          {/* SUB TAB CONTENT: NOTES OR ACTIVITIES */}
          {subTab === 'notes' ? (
            <View style={styles.notesOuterCard}>
              <View style={styles.notesList}>
                {notes.map((item, index) => (
                  <View key={item.id}>
                    <View style={styles.noteItemRow}>
                      <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>{item.avatar}</Text>
                      </View>

                      <View style={styles.noteContentContainer}>
                        <View style={styles.noteHeaderRow}>
                          <Text style={styles.authorName}>{item.author}</Text>
                          <Text style={styles.timestampText}>{item.timestamp}</Text>
                        </View>
                        <Text style={styles.commentText}>{item.comment}</Text>
                      </View>
                    </View>
                    {index < notes.length - 1 && <View style={styles.noteSeparator} />}
                  </View>
                ))}
              </View>

              {/* Add Note Input Bar */}
              <View style={styles.inputBarRow}>
                <TextInput
                  placeholder="Add a note..."
                  placeholderTextColor="#94A3B8"
                  value={newNoteText}
                  onChangeText={setNewNoteText}
                  style={styles.noteInput}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleAddNote}
                  style={styles.sendButton}>
                  <Ionicons name="send-outline" size={16} color="#2563EB" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* SUB TAB: ACTIVITIES TIMELINE */
            <View style={styles.activitiesCardContainer}>
              {ACTIVITIES_DATA.map((item, index) => {
                const isLatest = index === 0;
                const isLast = index === ACTIVITIES_DATA.length - 1;

                return (
                  <View key={item.id} style={styles.timelineItemRow}>
                    {/* Left Column: Step Circle Node + Connecting Line */}
                    <View style={styles.timelineLeftCol}>
                      <View
                        style={[
                          styles.numberCircleNode,
                          isLatest ? styles.numberCircleActive : styles.numberCircleInactive,
                        ]}>
                        <Text
                          style={[
                            styles.numberCircleText,
                            isLatest
                              ? styles.numberCircleTextActive
                              : styles.numberCircleTextInactive,
                          ]}>
                          {item.stepNumber}
                        </Text>
                      </View>

                      {!isLast && (
                        <View
                          style={[
                            styles.verticalLine,
                            isLatest ? styles.verticalLineActive : styles.verticalLineInactive,
                          ]}
                        />
                      )}
                    </View>

                    {/* Right Column: Title, Description, Timestamp */}
                    <View style={styles.timelineRightCol}>
                      <Text style={styles.activityStepTitle}>{item.title}</Text>
                      <Text style={styles.activityStepDescription}>{item.description}</Text>
                      <Text style={styles.activityStepTimestamp}>{item.timestamp}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Job Status Bottom Drawer Card (Exact Mockup Match) */}
      {selectedPhotoIds.length === 0 && (
        <View style={[styles.jobStatusDrawerCard, { paddingBottom: Math.max(safeAreaInsets.bottom, 16) }]}>
          {/* Drag Handle Pill */}
          <View style={styles.dragHandlePill} />

          {isRequestMode ? (
            /* Requests Action Buttons: Reject & Accept (Exact Image Mockup) */
            <View style={styles.requestDrawerActionRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.back()}
                style={styles.drawerRejectButton}>
                <Text style={styles.drawerRejectButtonText}>Reject</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.back()}
                style={styles.drawerAcceptButton}>
                <Text style={styles.drawerAcceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Label: Job Status */}
              <Text style={styles.jobStatusTitleLabel}>Job Status</Text>

              {/* Primary Action Row: Mark as Completed + Expand Chevron Button */}
              <View style={styles.jobStatusMainRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelectJobStatus('Completed')}
                  style={styles.markCompletedPrimaryButton}>
                  <Text style={styles.markCompletedPrimaryText}>
                    {jobStatus === 'Completed' ? 'Completed' : 'Mark as Completed'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleToggleJobStatusExpand}
                  style={styles.jobStatusChevronButton}>
                  <Ionicons
                    name={isJobStatusExpanded ? 'chevron-down' : 'chevron-up'}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>

              {/* Expanded Options List (Image 2) */}
              {isJobStatusExpanded && (
                <View style={styles.expandedStatusButtonsList}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleSelectJobStatus('On hold')}
                    style={[
                      styles.statusOptionButton,
                      jobStatus === 'On hold' && styles.statusOptionButtonSelected,
                    ]}>
                    <Text style={styles.statusOptionText}>On hold</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleSelectJobStatus('In Progress')}
                    style={[
                      styles.statusOptionButton,
                      jobStatus === 'In Progress' && styles.statusOptionButtonSelected,
                    ]}>
                    <Text style={styles.statusOptionText}>In Progress</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleSelectJobStatus('Archive')}
                    style={[
                      styles.statusOptionButton,
                      jobStatus === 'Archive' && styles.statusOptionButtonSelected,
                    ]}>
                    <Text style={styles.statusOptionText}>Archive</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      )}

      {/* Bottom Drawer Card for Photo Selection Actions */}
      {selectedPhotoIds.length > 0 && (
        <View style={[styles.bottomDrawerCard, { paddingBottom: Math.max(safeAreaInsets.bottom, 16) }]}>
          {/* Drag Handle Pill */}
          <View style={styles.dragHandlePill} />

          {/* Download Button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.drawerDownloadButton}>
            <Ionicons name="download-outline" size={18} color="#475569" />
            <Text style={styles.drawerDownloadText}>Download</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsDeleteModalVisible(true)}
            style={styles.drawerDeleteButton}>
            <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
            <Text style={styles.drawerDeleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsDeleteModalVisible(false)}>
          <Pressable style={styles.modalCardContainer} onPress={(e) => e.stopPropagation()}>
            {/* Red Squircle Trash Icon Badge */}
            <View style={styles.modalTrashIconContainer}>
              <Ionicons name="trash-outline" size={28} color="#EF4444" />
            </View>

            {/* Modal Titles */}
            <Text style={styles.modalTitle}>Delete Pictures</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to delete this?{'\n'}This action cannot be reverted.
            </Text>

            {/* Modal Buttons */}
            <View style={styles.modalButtonsColumn}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleConfirmDeletePhotos}
                style={styles.modalConfirmDeleteButton}>
                <Text style={styles.modalConfirmDeleteText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsDeleteModalVisible(false)}
                style={styles.modalCancelButton}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: '#DCEEFE', // Exact sky-blue gradient background from mockup
  },
  drawerBackdropOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    zIndex: 80,
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
    paddingTop: 8,
  },
  mainWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: 14,
  },
  /* Generic Card Container */
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greyLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  divisionContainer: {
    gap: 2,
    flex: 1,
  },
  divisionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  addressText: {
    fontSize: 12,
    color: '#64748B',
  },
  scheduledContainer: {
    alignItems: 'flex-end',
    gap: 2,
  },
  scheduledLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  scheduledDateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  /* Badges */
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeService: {
    backgroundColor: '#F3E8FF',
  },
  badgeTextService: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7E22CE',
  },
  badgeOnHold: {
    backgroundColor: '#E0E7FF',
  },
  badgeTextOnHold: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4338CA',
  },
  badgeInProgress: {
    backgroundColor: '#FFEDD5',
  },
  badgeTextInProgress: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C2410C',
  },
  badgeCompleted: {
    backgroundColor: '#DCFCE7',
  },
  badgeTextCompleted: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  /* Key-Value Table */
  tableBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  tableValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  /* Main Segmented Control: Overview / Photos */
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 14,
    padding: 4,
  },
  segmentedTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  segmentedTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  segmentedTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  segmentedTabTextActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
  /* Section Header */
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  /* Sub Segmented Control: Notes / Activities */
  subSegmentedContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(226, 232, 240, 0.6)',
    borderRadius: 14,
    padding: 4,
  },
  subSegmentedTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  subSegmentedTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subSegmentedTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  subSegmentedTabTextActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
  /* Notes Card & List */
  notesOuterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  notesList: {
    gap: 12,
  },
  noteItemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  noteContentContainer: {
    flex: 1,
    gap: 4,
  },
  noteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  timestampText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  commentText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  noteSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginTop: 12,
  },
  /* Note Input Bar */
  inputBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  noteInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 14,
    fontSize: 13,
    color: '#0F172A',
  },
  sendButton: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Activities Timeline Container (Exact Mockup Match) */
  activitiesCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  timelineItemRow: {
    flexDirection: 'row',
    gap: 14,
    minHeight: 74,
  },
  timelineLeftCol: {
    alignItems: 'center',
    width: 32,
  },
  numberCircleNode: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  numberCircleActive: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  numberCircleInactive: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  numberCircleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  numberCircleTextActive: {
    color: '#FFFFFF',
  },
  numberCircleTextInactive: {
    color: '#3B82F6',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    marginTop: -2,
    marginBottom: -2,
  },
  verticalLineActive: {
    backgroundColor: '#3B82F6',
  },
  verticalLineInactive: {
    backgroundColor: '#CBD5E1',
  },
  timelineRightCol: {
    flex: 1,
    paddingBottom: 22,
    gap: 2,
  },
  activityStepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  activityStepDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  activityStepTimestamp: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  /* Photos Gallery Grid Styles */
  galleryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  galleryHeaderTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  galleryActionIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  galleryIconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photosGrid2Col: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: 4,
  },
  photoGridCard: {
    width: '48.5%',
    aspectRatio: 1,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  checkboxOverlayContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxUnchecked: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  /* Job Status Sticky Drawer Card (Collapsible / Expandable) */
  jobStatusDrawerCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 90,
  },
  jobStatusTitleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    alignSelf: 'flex-start',
  },
  jobStatusMainRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  markCompletedPrimaryButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  markCompletedPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  jobStatusChevronButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedStatusButtonsList: {
    width: '100%',
    gap: 10,
    marginTop: 2,
    marginBottom: 4,
  },
  statusOptionButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusOptionButtonSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  /* Bottom Drawer Card for Photo Selection Actions */
  bottomDrawerCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 100,
  },
  dragHandlePill: {
    width: 44,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    marginBottom: 4,
  },
  /* Request Drawer Action Buttons (Mockup Match) */
  requestDrawerActionRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 4,
  },
  drawerRejectButton: {
    flex: 1,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerRejectButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  drawerAcceptButton: {
    flex: 1,
    height: 46,
    backgroundColor: '#0BBC58',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0BBC58',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  drawerAcceptButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  drawerDownloadButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  drawerDownloadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  drawerDeleteButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#FF4D4F',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  drawerDeleteText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  /* Delete Confirmation Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCardContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTrashIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  modalButtonsColumn: {
    width: '100%',
    gap: 10,
    marginTop: 8,
  },
  modalConfirmDeleteButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#FF4D4F',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmDeleteText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCancelButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
});
