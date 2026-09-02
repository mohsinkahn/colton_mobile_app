import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

// Data Types
type OrderStatus = 'in_progress' | 'on_hold' | 'completed' | 'requested';
type OrderType = 'Installation' | 'Service';

interface OrderItem {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  division: string;
  address: string;
  scheduledDate: string;
  details?: string;
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: '1',
    orderNumber: '004353',
    type: 'Installation',
    status: 'in_progress',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'HVAC Installation Unit A2 • Contact: (215) 555-0149',
  },
  {
    id: '2',
    orderNumber: '004354',
    type: 'Installation',
    status: 'in_progress',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'System Calibration & Duct Inspection',
  },
  {
    id: '3',
    orderNumber: '004355',
    type: 'Service',
    status: 'on_hold',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'Awaiting parts replacement from central warehouse',
  },
  {
    id: '4',
    orderNumber: '004356',
    type: 'Service',
    status: 'on_hold',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'Customer requested reschedule to afternoon',
  },
  {
    id: '5',
    orderNumber: '004357',
    type: 'Service',
    status: 'completed',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'Filter Replacement Complete • Signed by customer',
  },
  {
    id: '6',
    orderNumber: '004358',
    type: 'Service',
    status: 'completed',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'Annual Maintenance Completed Successfully',
  },
  {
    id: '7',
    orderNumber: '004359',
    type: 'Service',
    status: 'requested',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'New Service Request: Compressor Check',
  },
  {
    id: '8',
    orderNumber: '004360',
    type: 'Installation',
    status: 'requested',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'New Installation Request: Unit B1',
  },
  {
    id: '9',
    orderNumber: '004361',
    type: 'Service',
    status: 'requested',
    division: 'North Division',
    address: '4319 Wakefield St, Philadelphia',
    scheduledDate: 'Mar 30, 2025',
    details: 'Emergency Repair Request: Thermostat Sync',
  },
];

export default function AssignedOrderScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();

  // Navigation & Filter States
  const [mainTab, setMainTab] = useState<'ongoing' | 'requests'>('ongoing');
  const [subTab, setSubTab] = useState<'in_progress' | 'on_hold' | 'completed'>('in_progress');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Orders State
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);

  // Handlers
  const handleToggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const handleMarkCompleted = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'completed' } : item))
    );
  };

  const handleAcceptRequest = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOrders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'in_progress' } : item))
    );
  };

  const handleRejectRequest = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOrders((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter Logic
  const ongoingOrders = orders.filter((o) => o.status !== 'requested');
  const requestOrders = orders.filter((o) => o.status === 'requested');

  const filteredOrders = (mainTab === 'ongoing'
    ? ongoingOrders.filter((o) => o.status === subTab)
    : requestOrders
  ).filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.screenBackground}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: safeAreaInsets.top + 16,
            paddingBottom: safeAreaInsets.bottom + BottomTabInset + 32,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainWrapper}>
          {/* Header Section */}
          <View style={styles.headerRow}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>Hello, Colton!</Text>
              <Text style={styles.headerTitle}>Explore your{'\n'}Assigned Orders</Text>
            </View>

            <View style={styles.orderCountBadge}>
              <Text style={styles.orderCountText}>{ongoingOrders.length + requestOrders.length}</Text>
            </View>
          </View>

          {/* Main Segmented Control: Ongoing / Requests */}
          <View style={styles.mainTabContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMainTab('ongoing')}
              style={[styles.mainTabButton, mainTab === 'ongoing' && styles.mainTabButtonActive]}>
              <Text style={[styles.mainTabText, mainTab === 'ongoing' && styles.mainTabTextActive]}>
                Ongoing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setMainTab('requests')}
              style={[styles.mainTabButton, mainTab === 'requests' && styles.mainTabButtonActive]}>
              <View style={styles.requestsTabContent}>
                <Text
                  style={[
                    styles.mainTabText,
                    mainTab === 'requests' && styles.mainTabTextActive,
                  ]}>
                  Requests
                </Text>
                <View
                  style={[
                    styles.requestBadge,
                    mainTab === 'requests' && styles.requestBadgeActive,
                  ]}>
                  <Text style={styles.requestBadgeText}>
                    {requestOrders.length < 10 ? `0${requestOrders.length}` : requestOrders.length}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar & Filter Button */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search-outline" size={18} color="#94A3B8" style={styles.searchIcon} />
              <TextInput
                placeholder="Search orders..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.filterButton}>
              <Ionicons name="options-outline" size={18} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Sub-Tabs: In Progress / On hold / Completed (Only when Ongoing tab is active) */}
          {mainTab === 'ongoing' && (
            <View style={styles.subTabContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSubTab('in_progress')}
                style={[styles.subTabButton, subTab === 'in_progress' && styles.subTabButtonActive]}>
                <Text style={[styles.subTabText, subTab === 'in_progress' && styles.subTabTextActive]}>
                  In Progress
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSubTab('on_hold')}
                style={[styles.subTabButton, subTab === 'on_hold' && styles.subTabButtonActive]}>
                <Text style={[styles.subTabText, subTab === 'on_hold' && styles.subTabTextActive]}>
                  On hold
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSubTab('completed')}
                style={[styles.subTabButton, subTab === 'completed' && styles.subTabButtonActive]}>
                <Text style={[styles.subTabText, subTab === 'completed' && styles.subTabTextActive]}>
                  Completed
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Order Cards List */}
          <View style={styles.cardsList}>
            {filteredOrders.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="documents-outline" size={40} color="#94A3B8" />
                <Text style={styles.emptyText}>No orders found</Text>
              </View>
            ) : (
              filteredOrders.map((item) => {
                const isExpanded = expandedCardId === item.id;

                return (
                  <View key={item.id} style={styles.cardContainer}>
                    {/* Clickable Card Header & Details to open /order-detail */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() =>
                        router.push({
                          pathname: '/order-detail',
                          params: { source: mainTab },
                        })
                      }>
                      {/* Card Header & Badges */}
                      <View style={styles.cardTopRow}>
                        <Text style={styles.orderNumberText}>{item.orderNumber}</Text>

                        <View style={styles.badgesRow}>
                          {/* Type Badge */}
                          <View
                            style={[
                              styles.badge,
                              item.type === 'Installation'
                                ? styles.badgeInstallation
                                : styles.badgeService,
                            ]}>
                            <Text
                              style={[
                                styles.badgeText,
                                item.type === 'Installation'
                                  ? styles.badgeTextInstallation
                                  : styles.badgeTextService,
                              ]}>
                              {item.type}
                            </Text>
                          </View>

                          {/* Status Badge */}
                          {item.status === 'in_progress' && (
                            <View style={[styles.badge, styles.badgeInProgress]}>
                              <Text style={[styles.badgeText, styles.badgeTextInProgress]}>
                                In progress
                              </Text>
                            </View>
                          )}

                          {item.status === 'on_hold' && (
                            <View style={[styles.badge, styles.badgeOnHold]}>
                              <Text style={[styles.badgeText, styles.badgeTextOnHold]}>
                                On hold
                              </Text>
                            </View>
                          )}

                          {item.status === 'completed' && (
                            <View style={[styles.badge, styles.badgeCompleted]}>
                              <Text style={[styles.badgeText, styles.badgeTextCompleted]}>
                                Completed
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      {/* Middle Info Row */}
                      <View style={styles.cardMiddleRow}>
                        <View style={styles.addressContainer}>
                          <Text style={styles.divisionText}>{item.division}</Text>
                          <Text style={styles.addressText}>{item.address}</Text>
                        </View>

                        <View style={styles.scheduleContainer}>
                          <Text style={styles.scheduledLabel}>SCHEDULED</Text>
                          <Text style={styles.scheduledDateText}>{item.scheduledDate}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* Optional Expanded Details */}
                    {isExpanded && item.details && (
                      <View style={styles.expandedDetailsBox}>
                        <Text style={styles.detailsText}>{item.details}</Text>
                      </View>
                    )}

                    {/* Action Buttons Row */}
                    {mainTab === 'ongoing' && item.status !== 'completed' && (
                      <View style={styles.cardBottomRow}>
                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() => handleMarkCompleted(item.id)}
                          style={styles.markCompletedTouchWrapper}>
                          <LinearGradient
                            colors={['#5897FF', '#3C7FEC', '#488EFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.markCompletedGradient}>
                            <Text style={styles.markCompletedText}>Mark as Completed</Text>
                          </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleToggleExpand(item.id)}
                          style={styles.dropdownButton}>
                          <Ionicons
                            name={isExpanded ? 'chevron-up' : 'chevron-down'}
                            size={18}
                            color="#64748B"
                          />
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Requests Tab Action Buttons: Reject & Accept */}
                    {mainTab === 'requests' && (
                      <View style={styles.requestsActionRow}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleRejectRequest(item.id)}
                          style={styles.rejectButton}>
                          <Text style={styles.rejectButtonText}>Reject</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() => handleAcceptRequest(item.id)}
                          style={styles.acceptButtonTouchWrapper}>
                          <LinearGradient
                            colors={['#12A150', '#0BBC58', '#12A150']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.acceptButtonGradient}>
                            <Text style={styles.acceptButtonText}>Accept</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })
            )}
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
    gap: 16,
  },
  /* Header Styles */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  headerTextContainer: {
    gap: 4,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#0B1B34',
    letterSpacing: -0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#286AB8',
    lineHeight: 30,
  },
  orderCountBadge: {
    width: 68,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  orderCountText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5B6878',
  },
  /* Main Tabs: Ongoing / Requests */
  mainTabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 16,
    padding: 4,
    marginTop: 4,
  },
  mainTabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  mainTabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  mainTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  mainTabTextActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
  requestsTabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  requestBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  requestBadgeActive: {
    backgroundColor: '#F8FAFC',
  },
  requestBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  /* Search & Filter Row */
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Sub Tabs: In Progress / On hold / Completed */
  subTabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 14,
    padding: 4,
  },
  subTabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  subTabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  subTabTextActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
  /* Cards List */
  cardsList: {
    gap: 12,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  /* Card Container */
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
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  /* Badge Colors */
  badgeInstallation: {
    backgroundColor: '#E0F2FE',
  },
  badgeTextInstallation: {
    color: '#0284C7',
  },
  badgeService: {
    backgroundColor: '#F3E8FF',
  },
  badgeTextService: {
    color: '#7E22CE',
  },
  badgeInProgress: {
    backgroundColor: '#FFEDD5',
  },
  badgeTextInProgress: {
    color: '#C2410C',
  },
  badgeOnHold: {
    backgroundColor: '#E0E7FF',
  },
  badgeTextOnHold: {
    color: '#4338CA',
  },
  badgeCompleted: {
    backgroundColor: '#DCFCE7',
  },
  badgeTextCompleted: {
    color: '#15803D',
  },
  /* Card Middle Content */
  cardMiddleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addressContainer: {
    gap: 2,
    flex: 1,
  },
  divisionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  addressText: {
    fontSize: 12,
    color: '#64748B',
  },
  scheduleContainer: {
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
  expandedDetailsBox: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailsText: {
    fontSize: 12,
    color: '#475569',
  },
  /* Card Bottom Action Row */
  cardBottomRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  markCompletedTouchWrapper: {
    flex: 1,
    borderRadius: 12,
    shadowColor: '#3C7FEC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  markCompletedGradient: {
    width: '100%',
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markCompletedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dropdownButton: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Requests Buttons: Reject & Accept */
  requestsActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  acceptButtonTouchWrapper: {
    flex: 1,
    borderRadius: 12,
    shadowColor: '#12A150',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  acceptButtonGradient: {
    width: '100%',
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
