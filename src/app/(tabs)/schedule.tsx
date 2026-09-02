import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

const MONTHS_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Years list from 2000 to 2035
const YEARS_LIST = Array.from({ length: 36 }, (_, i) => (2000 + i).toString());

interface ScheduleTimeSlot {
  id: string;
  timeLabel: string;
  orders: {
    id: string;
    orderNumber: string;
    time: string;
  }[];
}

const SCHEDULE_SLOTS: ScheduleTimeSlot[] = [
  {
    id: 'slot-1',
    timeLabel: '02:00 am',
    orders: [
      { id: '1', orderNumber: '#121548', time: '12:00 PM' },
      { id: '2', orderNumber: '#121548', time: '12:00 PM' },
    ],
  },
  {
    id: 'slot-2',
    timeLabel: '03:00 am',
    orders: [{ id: '3', orderNumber: '#121548', time: '12:00 PM' }],
  },
  {
    id: 'slot-3',
    timeLabel: '04:00 am',
    orders: [{ id: '4', orderNumber: '#121548', time: '12:00 PM' }],
  },
  {
    id: 'slot-4',
    timeLabel: '04:00 am',
    orders: [],
  },
  {
    id: 'slot-5',
    timeLabel: '04:00 am',
    orders: [{ id: '5', orderNumber: '#121548', time: '12:00 PM' }],
  },
];

export default function ScheduleScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  // Tab State: 'full' | 'upcoming'
  const [activeTab, setActiveTab] = useState<'full' | 'upcoming'>('full');

  // Dynamic Real Calendar States
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(3); // 3 = April (0-indexed)
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedDateNumber, setSelectedDateNumber] = useState<number>(21);

  // Dropdown Selector Modals
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  // Compute Real Days Array for Selected Month & Year
  const daysInSelectedMonth = useMemo(() => {
    const totalDays = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();
    const daysArr: { dateNumber: number; dayName: string }[] = [];

    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(selectedYear, selectedMonthIndex, day);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      daysArr.push({ dateNumber: day, dayName });
    }
    return daysArr;
  }, [selectedYear, selectedMonthIndex]);

  const handleSelectMonth = (index: number) => {
    setSelectedMonthIndex(index);
    setIsMonthPickerOpen(false);
    // Ensure selected date does not exceed max days of new month
    const maxDays = new Date(selectedYear, index + 1, 0).getDate();
    if (selectedDateNumber > maxDays) {
      setSelectedDateNumber(maxDays);
    }
  };

  const handleSelectYear = (yearNum: number) => {
    setSelectedYear(yearNum);
    setIsYearPickerOpen(false);
    // Ensure selected date does not exceed max days of leap year
    const maxDays = new Date(yearNum, selectedMonthIndex + 1, 0).getDate();
    if (selectedDateNumber > maxDays) {
      setSelectedDateNumber(maxDays);
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
            <Text style={styles.subtitleText}>Check your schedule here</Text>
          </View>

          {/* Main Segmented Control: Full Calendar / Upcoming */}
          <View style={styles.segmentedContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab('full')}
              style={[styles.segmentedTab, activeTab === 'full' && styles.segmentedTabActive]}>
              <Text
                style={[
                  styles.segmentedTabText,
                  activeTab === 'full' && styles.segmentedTabTextActive,
                ]}>
                Full Calendar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab('upcoming')}
              style={[
                styles.segmentedTab,
                activeTab === 'upcoming' && styles.segmentedTabActive,
              ]}>
              <View style={styles.upcomingTabLabelRow}>
                <Text
                  style={[
                    styles.segmentedTabText,
                    activeTab === 'upcoming' && styles.segmentedTabTextActive,
                  ]}>
                  Upcoming
                </Text>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>03</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* White Card Container */}
          <View style={styles.cardContainer}>
            {/* If Full Calendar tab is active: Render Real Dropdowns & Days Strip */}
            {activeTab === 'full' && (
              <>
                {/* Dropdowns Row: Month & Year */}
                <View style={styles.dropdownsRow}>
                  {/* Month Selector */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsMonthPickerOpen(true)}
                    style={styles.dropdownBox}>
                    <Text style={styles.dropdownValueText}>{MONTHS_LIST[selectedMonthIndex]}</Text>
                    <Ionicons name="chevron-down" size={18} color="#64748B" />
                  </TouchableOpacity>

                  {/* Year Selector */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsYearPickerOpen(true)}
                    style={styles.dropdownBox}>
                    <Text style={styles.dropdownValueText}>{selectedYear.toString()}</Text>
                    <Ionicons name="chevron-down" size={18} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* Real Days Horizontal Scrollable Strip */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.daysScrollContent}>
                  {daysInSelectedMonth.map((item) => {
                    const isSelected = item.dateNumber === selectedDateNumber;
                    return (
                      <TouchableOpacity
                        key={item.dateNumber}
                        activeOpacity={0.8}
                        onPress={() => setSelectedDateNumber(item.dateNumber)}
                        style={[
                          styles.dayItemPill,
                          isSelected && styles.dayItemPillActive,
                        ]}>
                        <Text
                          style={[
                            styles.dayNumberText,
                            isSelected && styles.dayNumberTextActive,
                          ]}>
                          {item.dateNumber}
                        </Text>
                        <Text
                          style={[
                            styles.dayNameText,
                            isSelected && styles.dayNameTextActive,
                          ]}>
                          {item.dayName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <View style={styles.cardDivider} />
              </>
            )}

            {/* Time Slots Timeline List */}
            <View style={styles.timelineListContainer}>
              {/* GMT Indicator Header Row */}
              <View style={styles.gmtHeaderRow}>
                <Text style={styles.gmtLabelText}>GMT + 5</Text>
                <View style={styles.gmtLine} />
              </View>

              {/* Time Slot Rows */}
              {SCHEDULE_SLOTS.map((slot) => (
                <View key={slot.id} style={styles.timeSlotRow}>
                  {/* Left Column: Time Label */}
                  <Text style={styles.timeLabelText}>{slot.timeLabel}</Text>

                  {/* Right Column: Cards or Empty slot line */}
                  <View style={styles.slotCardsColumn}>
                    {slot.orders.length > 0 ? (
                      slot.orders.map((order) => (
                        <TouchableOpacity key={order.id} activeOpacity={0.9} style={styles.orderEventCard}>
                          <Text style={styles.orderNumberText}>Order {order.orderNumber}</Text>
                          <Text style={styles.orderTimeText}>{order.time}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <View style={styles.emptySlotLine} />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Month Picker Dropdown Modal */}
      <Modal
        visible={isMonthPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMonthPickerOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setIsMonthPickerOpen(false)}>
          <View style={styles.pickerModalCard}>
            <Text style={styles.pickerModalTitle}>Select Month</Text>
            <ScrollView style={styles.pickerScrollView} showsVerticalScrollIndicator={false}>
              {MONTHS_LIST.map((monthName, idx) => {
                const isSelected = idx === selectedMonthIndex;
                return (
                  <TouchableOpacity
                    key={monthName}
                    activeOpacity={0.7}
                    onPress={() => handleSelectMonth(idx)}
                    style={[
                      styles.pickerOptionRow,
                      isSelected && styles.pickerOptionRowSelected,
                    ]}>
                    <Text
                      style={[
                        styles.pickerOptionText,
                        isSelected && styles.pickerOptionTextSelected,
                      ]}>
                      {monthName}
                    </Text>
                    {isSelected && <Ionicons name="checkmark" size={18} color="#3B82F6" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Year Picker Dropdown Modal */}
      <Modal
        visible={isYearPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsYearPickerOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setIsYearPickerOpen(false)}>
          <View style={styles.pickerModalCard}>
            <Text style={styles.pickerModalTitle}>Select Year</Text>
            <ScrollView style={styles.pickerScrollView} showsVerticalScrollIndicator={false}>
              {YEARS_LIST.map((yearStr) => {
                const yearNum = parseInt(yearStr, 10);
                const isSelected = yearNum === selectedYear;
                return (
                  <TouchableOpacity
                    key={yearStr}
                    activeOpacity={0.7}
                    onPress={() => handleSelectYear(yearNum)}
                    style={[
                      styles.pickerOptionRow,
                      isSelected && styles.pickerOptionRowSelected,
                    ]}>
                    <Text
                      style={[
                        styles.pickerOptionText,
                        isSelected && styles.pickerOptionTextSelected,
                      ]}>
                      {yearStr}
                    </Text>
                    {isSelected && <Ionicons name="checkmark" size={18} color="#3B82F6" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
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
  /* Main Segmented Control */
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
  upcomingTabLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgePill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  /* Main White Card */
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    gap: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  /* Dropdowns Row */
  dropdownsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dropdownBox: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  dropdownValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  /* Days Strip Scroll */
  daysScrollContent: {
    gap: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  dayItemPill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: 42,
    gap: 2,
  },
  dayItemPillActive: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
  },
  dayNumberText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  dayNumberTextActive: {
    color: '#3B82F6',
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
  },
  dayNameTextActive: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  /* Timeline List Section */
  timelineListContainer: {
    gap: 16,
  },
  gmtHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gmtLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
  },
  gmtLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    minHeight: 46,
  },
  timeLabelText: {
    width: 65,
    fontSize: 12,
    color: '#94A3B8',
    paddingTop: 4,
  },
  slotCardsColumn: {
    flex: 1,
    gap: 8,
  },
  orderEventCard: {
    width: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 2,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  orderNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  orderTimeText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  emptySlotLine: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginTop: 12,
  },
  /* Dropdown Selector Modals */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  pickerModalCard: {
    width: '100%',
    maxWidth: 320,
    maxHeight: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  pickerModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  pickerScrollView: {
    maxHeight: 300,
  },
  pickerOptionRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  pickerOptionRowSelected: {
    backgroundColor: '#EFF6FF',
  },
  pickerOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  pickerOptionTextSelected: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});
