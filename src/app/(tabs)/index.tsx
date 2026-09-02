import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
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

// Mini Bar Sparkline Component
function MiniBarSparkline({
  heights,
  color,
}: {
  heights: number[];
  color: string;
}) {
  return (
    <View style={styles.miniSparklineContainer}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={[
            styles.miniSparklineBar,
            { height: `${h}%`, backgroundColor: color },
          ]}
        />
      ))}
    </View>
  );
}

// 12 Months Bar Chart Data
const MONTHLY_ORDERS_DATA = [
  { month: 'Jan', value: 45 },
  { month: 'Feb', value: 70 },
  { month: 'Mar', value: 70 },
  { month: 'Apr', value: 45 },
  { month: 'May', value: 90 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 30 },
  { month: 'Aug', value: 45 },
  { month: 'Sep', value: 70 },
  { month: 'Oct', value: 45 },
  { month: 'Nov', value: 30 },
  { month: 'Dec', value: 90 },
];

export default function HomeScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();

  // Filter Dropdown State
  const [filterPeriod, setFilterPeriod] = useState('12 months');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  return (
    <View style={styles.screenBackground}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: Math.max(safeAreaInsets.top, 16) + 4,
            paddingBottom: safeAreaInsets.bottom + BottomTabInset + 30,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>
          {/* Top Header Bar */}
          <View style={styles.topHeaderBar}>
            {/* Left: Brand Logo Image */}
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.brandLogoImage}
              resizeMode="contain"
            />

            {/* Right: Circular Profile Avatar */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/edit-profile')}
              style={styles.avatarButton}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
                }}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          </View>

          {/* Hero Banner Card */}
          <LinearGradient
            colors={['#5897FF', '#3C7FEC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroBannerCard}>
            <Text style={styles.heroGreetingText}>Hello, Colton!</Text>
            <Text style={styles.heroSubtitleText}>
              Track projects, manage tasks, and stay productive.
            </Text>
          </LinearGradient>

          {/* 2x2 Grid of Metrics Cards */}
          <View style={styles.metricCardsGrid}>
            {/* Card 1: Active Orders */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardHeader}>
                <View style={[styles.metricIconBox, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="folder-outline" size={14} color="#3B82F6" />
                </View>
                <Text style={styles.metricLabelText}>Active Orders</Text>
              </View>

              <View style={styles.metricValueRow}>
                <Text style={styles.metricValueText}>740K</Text>
                <MiniBarSparkline
                  heights={[20, 60, 100, 75, 45, 85]}
                  color="#3B82F6"
                />
              </View>
            </View>

            {/* Card 2: Completed */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardHeader}>
                <View style={[styles.metricIconBox, { backgroundColor: '#E0F2FE' }]}>
                  <Ionicons name="folder-outline" size={14} color="#0284C7" />
                </View>
                <Text style={styles.metricLabelText}>Completed</Text>
              </View>

              <View style={styles.metricValueRow}>
                <Text style={styles.metricValueText}>740K</Text>
                <MiniBarSparkline
                  heights={[30, 80, 100, 60, 75, 90]}
                  color="#06B6D4"
                />
              </View>
            </View>

            {/* Card 3: On Hold */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardHeader}>
                <View style={[styles.metricIconBox, { backgroundColor: '#F3E8FF' }]}>
                  <Ionicons name="folder-outline" size={14} color="#9333EA" />
                </View>
                <Text style={styles.metricLabelText}>On Hold</Text>
              </View>

              <View style={styles.metricValueRow}>
                <Text style={styles.metricValueText}>740K</Text>
                <MiniBarSparkline
                  heights={[35, 90, 100, 50, 70, 85]}
                  color="#A855F7"
                />
              </View>
            </View>

            {/* Card 4: New Orders */}
            <View style={styles.metricCard}>
              <View style={styles.metricCardHeader}>
                <View style={[styles.metricIconBox, { backgroundColor: '#DCFCE7' }]}>
                  <Ionicons name="folder-outline" size={14} color="#16A34A" />
                </View>
                <Text style={styles.metricLabelText}>New Orders</Text>
              </View>

              <View style={styles.metricValueRow}>
                <Text style={styles.metricValueText}>740K</Text>
                <MiniBarSparkline
                  heights={[25, 90, 100, 65, 75, 95]}
                  color="#10B981"
                />
              </View>
            </View>
          </View>

          {/* Orders per Month Real Bar Chart Card */}
          <View style={styles.chartCard}>
            {/* Header: Title + Dropdown Selector */}
            <View style={styles.chartCardHeaderRow}>
              <Text style={styles.chartTitleText}>Orders per month</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsFilterDropdownOpen(true)}
                style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>{filterPeriod}</Text>
                <Ionicons name="chevron-down" size={16} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Chart Area */}
            <View style={styles.barChartContainer}>
              {/* Y-Axis Label: 1k */}
              <Text style={styles.yAxisTopLabel}>1k</Text>

              {/* Bars Row */}
              <View style={styles.barsPlotArea}>
                {MONTHLY_ORDERS_DATA.map((item) => (
                  <View key={item.month} style={styles.barColumn}>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          { height: `${item.value}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.xAxisMonthLabel}>{item.month}</Text>
                  </View>
                ))}
              </View>

              {/* Y-Axis Label: 0 */}
              <Text style={styles.yAxisBottomLabel}>0</Text>
            </View>
          </View>

          {/* Completion Rate Semi-Circle Gauge Card */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitleText}>Completion Rate</Text>

            {/* Pure React Native Gauge Graphic */}
            <View style={styles.gaugeContainer}>
              <View style={styles.gaugeArchWrapper}>
                {/* Background Grey Track */}
                <View style={styles.gaugeBackgroundTrack} />

                {/* Active Progress Blue Arc */}
                <View style={styles.gaugeProgressTrack} />

                {/* Rounded End Caps */}
                <View style={[styles.gaugeCap, styles.gaugeCapLeft]} />
                <View style={[styles.gaugeCap, styles.gaugeCapRight]} />
              </View>

              {/* Centered Number Value */}
              <View style={styles.gaugeCenterLabelBox}>
                <Text style={styles.gaugeCenterValueText}>240</Text>
              </View>
            </View>

            {/* Bottom Stats Pills */}
            <View style={styles.statsPillsRow}>
              <View style={styles.statPillCard}>
                <Text style={styles.statPillLabel}>Active</Text>
                <Text style={styles.statPillValue}>168</Text>
              </View>
              <View style={styles.statPillCard}>
                <Text style={styles.statPillLabel}>Completed</Text>
                <Text style={styles.statPillValue}>100</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Filter Period Dropdown Modal */}
      <Modal
        visible={isFilterDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsFilterDropdownOpen(false)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsFilterDropdownOpen(false)}>
          <View style={styles.dropdownModalCard}>
            <Text style={styles.dropdownModalTitle}>Select Range</Text>
            {['3 months', '6 months', '12 months', 'All time'].map((period) => (
              <TouchableOpacity
                key={period}
                activeOpacity={0.7}
                onPress={() => {
                  setFilterPeriod(period);
                  setIsFilterDropdownOpen(false);
                }}
                style={[
                  styles.dropdownOptionRow,
                  filterPeriod === period && styles.dropdownOptionRowSelected,
                ]}>
                <Text
                  style={[
                    styles.dropdownOptionText,
                    filterPeriod === period && styles.dropdownOptionTextSelected,
                  ]}>
                  {period}
                </Text>
                {filterPeriod === period && (
                  <Ionicons name="checkmark" size={18} color="#3B82F6" />
                )}
              </TouchableOpacity>
            ))}
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  mainWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: 14,
  },
  /* Top Header Bar */
  topHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  brandLogoImage: {
    height: 30,
    width: 160,
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  /* Hero Banner Card */
  heroBannerCard: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 6,
    shadowColor: '#3C7FEC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 5,
  },
  heroGreetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroSubtitleText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.92)',
    lineHeight: 18,
  },
  /* 2x2 Metric Cards Grid */
  metricCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  metricCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    gap: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  metricCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricIconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  metricValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metricValueText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  miniSparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 28,
    gap: 3,
  },
  miniSparklineBar: {
    width: 3,
    borderRadius: 1.5,
  },
  /* Generic Chart Card */
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    gap: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  chartCardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
  },
  dropdownButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  /* Bar Chart Plot Area */
  barChartContainer: {
    position: 'relative',
    paddingTop: 14,
    paddingBottom: 4,
    paddingLeft: 20,
  },
  yAxisTopLabel: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 11,
    color: '#94A3B8',
  },
  yAxisBottomLabel: {
    position: 'absolute',
    left: 0,
    bottom: 24,
    fontSize: 11,
    color: '#94A3B8',
  },
  barsPlotArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 10,
  },
  barColumn: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  barTrack: {
    height: 110,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  barFill: {
    width: 13,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  xAxisMonthLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  /* Semi-Circle Gauge with Pure React Native */
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginTop: 4,
    position: 'relative',
  },
  gaugeArchWrapper: {
    width: 190,
    height: 95,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  gaugeBackgroundTrack: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 16,
    borderColor: '#E2E8F0',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    top: 0,
  },
  gaugeProgressTrack: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 16,
    borderColor: '#3B82F6',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '-105deg' }],
    position: 'absolute',
    top: 0,
  },
  gaugeCap: {
    position: 'absolute',
    bottom: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  gaugeCapLeft: {
    left: 0,
    backgroundColor: '#3B82F6',
  },
  gaugeCapRight: {
    right: 0,
    backgroundColor: '#E2E8F0',
  },
  gaugeCenterLabelBox: {
    position: 'absolute',
    bottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeCenterValueText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  /* Stats Pills Row */
  statsPillsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  statPillCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statPillLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statPillValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  /* Dropdown Range Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dropdownModalCard: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  dropdownModalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  dropdownOptionRow: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  dropdownOptionRowSelected: {
    backgroundColor: '#EFF6FF',
  },
  dropdownOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  dropdownOptionTextSelected: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});
