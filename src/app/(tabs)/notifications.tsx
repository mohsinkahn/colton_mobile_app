import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

interface NotificationItem {
  id: string;
  sender: string;
  timestamp: string;
  message: string;
}

interface NotificationGroup {
  id: string;
  dateLabel: string;
  items: NotificationItem[];
}

const NOTIFICATION_GROUPS: NotificationGroup[] = [
  {
    id: 'group-today',
    dateLabel: 'Today',
    items: [
      {
        id: '1',
        sender: 'Foyez Ahmed',
        timestamp: 'Today',
        message:
          'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
      },
      {
        id: '2',
        sender: 'Foyez Ahmed',
        timestamp: 'Today',
        message:
          'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
      },
      {
        id: '3',
        sender: 'Foyez Ahmed',
        timestamp: 'Today',
        message:
          'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
      },
    ],
  },
  {
    id: 'group-aug31',
    dateLabel: 'Aug 31',
    items: [
      {
        id: '4',
        sender: 'Foyez Ahmed',
        timestamp: 'Today',
        message:
          'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
      },
      {
        id: '5',
        sender: 'Foyez Ahmed',
        timestamp: 'Today',
        message:
          'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
      },
      {
        id: '6',
        sender: 'Foyez Ahmed',
        timestamp: 'Today',
        message:
          'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
      },
    ],
  },
  {
    id: 'group-aug30',
    dateLabel: 'Aug 30',
    items: [
      {
        id: '7',
        sender: 'Foyez Ahmed',
        timestamp: 'Today',
        message:
          'Took new photos of the site and the timber is bad. I think it should be changed. Asked someone please.',
      },
    ],
  },
];

export default function NotificationsScreen() {
  const safeAreaInsets = useSafeAreaInsets();

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
        {/* Header Row: Hello Colton & Count Badge */}
        <View style={styles.headerRow}>
          <View style={styles.headerTitleCol}>
            <Text style={styles.greetingText}>Hello, Colton!</Text>
            <Text style={styles.subtitleText}>Here are your</Text>
            <Text style={styles.subtitleText}>notifications</Text>
          </View>

          {/* Count Badge Box */}
          <View style={styles.badgeBox}>
            <Text style={styles.badgeCountText}>76</Text>
          </View>
        </View>

        {/* Notifications Grouped by Date */}
        <View style={styles.groupsContainer}>
          {NOTIFICATION_GROUPS.map((group) => (
            <View key={group.id} style={styles.groupWrapper}>
              {/* Centered Date Pill */}
              <View style={styles.datePill}>
                <Text style={styles.datePillText}>{group.dateLabel}</Text>
              </View>

              {/* White Group Card */}
              <View style={styles.groupCard}>
                {group.items.map((item, index) => (
                  <View key={item.id}>
                    <View style={styles.notificationItemRow}>
                      {/* Left Icon Square */}
                      <View style={styles.iconSquare}>
                        <Ionicons name="mail-outline" size={18} color="#2563EB" />
                      </View>

                      {/* Right Content */}
                      <View style={styles.notificationContent}>
                        <View style={styles.notificationHeader}>
                          <Text style={styles.senderName}>{item.sender}</Text>
                          <Text style={styles.timestampText}>{item.timestamp}</Text>
                        </View>
                        <Text style={styles.messageText}>{item.message}</Text>
                      </View>
                    </View>

                    {/* Separator line between items inside card */}
                    {index < group.items.length - 1 && <View style={styles.itemSeparator} />}
                  </View>
                ))}
              </View>
            </View>
          ))}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  headerTitleCol: {
    gap: 0,
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
  badgeBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  badgeCountText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#334155',
  },
  /* Group Container & Date Pills */
  groupsContainer: {
    gap: 18,
  },
  groupWrapper: {
    gap: 10,
    alignItems: 'center',
  },
  datePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  datePillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  groupCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  /* Notification Item Row */
  notificationItemRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconSquare: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senderName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  timestampText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  messageText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
});
