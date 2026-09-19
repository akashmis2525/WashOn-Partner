import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bell,
  Wallet,
  Star,
  CheckCircle2,
  AlertTriangle,
  Gift,
  Clock,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorNotificationsScreen = ({ navigation }: any) => {
  const notifications = [
    {
      id: '1',
      type: 'PAYMENT',
      title: '₹308 Credited to Partner Wallet',
      desc: 'Customer Aakash Mishra approved your wash for booking #BK-9824.',
      time: '15 mins ago',
      read: false,
    },
    {
      id: '2',
      type: 'RATING',
      title: 'New 5-Star Rating Received! ★★★★★',
      desc: '"Activa looks spotless! The foam wash was top class."',
      time: '20 mins ago',
      read: false,
    },
    {
      id: '3',
      type: 'INCENTIVE',
      title: 'Evening Peak Hour Bonus is LIVE',
      desc: 'Earn flat ₹50 extra on every booking completed between 5-9 PM today.',
      time: '1 hour ago',
      read: true,
    },
    {
      id: '4',
      type: 'SETTLEMENT',
      title: 'Settlement Payout Successful (₹4,250)',
      desc: 'Transferred to UPI: ramesh@oksbi. Reference UTR-9841209384.',
      time: 'Yesterday',
      read: true,
    },
    {
      id: '5',
      type: 'BOOKING',
      title: 'Booking Schedule Confirmed',
      desc: 'Upcoming booking scheduled for tomorrow 09:00 AM in Saket Nagar.',
      time: 'Yesterday',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'PAYMENT':
        return <Wallet size={18} color="#059669" />;
      case 'RATING':
        return <Star size={18} color="#B45309" fill="#B45309" />;
      case 'INCENTIVE':
        return <Gift size={18} color="#7C3AED" />;
      case 'SETTLEMENT':
        return <CheckCircle2 size={18} color="#2563EB" />;
      default:
        return <Bell size={18} color="#0F172A" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Activity & Notifications</Text>
          <Text style={styles.headerSubtitle}>Alerts & updates</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {notifications.map(item => (
          <View key={item.id} style={[styles.card, !item.read && styles.cardUnread]}>
            <View style={styles.iconCircle}>{getIcon(item.type)}</View>
            <View style={styles.textWrap}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                {!item.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
  },
  cardUnread: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B45309',
    marginLeft: 6,
  },
  desc: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
    lineHeight: 16,
  },
  time: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 6,
  },
});
