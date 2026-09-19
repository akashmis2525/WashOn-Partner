import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Headphones,
  Clock,
  Image as ImageIcon,
  Bell,
  Phone,
  AlertTriangle,
  ChevronRight,
  CheckCheck,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorCustomerApprovalPendingScreen = ({ navigation, route }: any) => {
  const {
    bookingId = 'BK-9824',
    customerName = 'Aakash Mishra',
    vendorNetEarning = 308,
    totalCustomerBill = 347,
  } = route.params || {};

  const [countdown, setCountdown] = useState(120); // 2 min auto-approval timer

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendReminder = () => {
    Alert.alert('Reminder Sent', `Notification & SMS reminder sent to ${customerName}.`);
  };

  const handleSimulateApproval = () => {
    navigation.navigate(Routes.VENDOR_SERVICE_COMPLETED as any, {
      bookingId,
      customerName,
      vendorNetEarning,
      totalCustomerBill,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Customer Approval Pending</Text>
          <Text style={styles.headerSubtitle}>Booking #{bookingId}</Text>
        </View>
        <TouchableOpacity
          style={styles.supportBtn}
          onPress={() =>
            Alert.alert(
              'Contact Support',
              'Need help with this approval? Choose an option:',
              [
                { text: 'Call Support', onPress: () => {} },
                { text: 'Chat Support', onPress: () => {} },
                { text: 'Cancel', style: 'cancel' },
              ]
            )
          }
        >
          <Headphones size={18} color="#0F172A" />
          <Text style={styles.supportText}>Support</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Waiting Card */}
        <View style={styles.waitingCard}>
          <View style={styles.pulseContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
          <Text style={styles.waitingTitle}>Waiting for {customerName}</Text>
          <Text style={styles.waitingSub}>
            Customer has received before/after photos on their app and is reviewing the wash quality.
          </Text>

          <View style={styles.autoApprovalBadge}>
            <Clock size={16} color="#B45309" />
            <Text style={styles.autoApprovalText}>
              Auto-approves in: <Text style={{ fontWeight: '800' }}>{formatTime(countdown)}</Text>
            </Text>
          </View>
        </View>

        {/* Photos Sent Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ImageIcon size={18} color="#0F172A" />
            <Text style={styles.cardTitle}>Photos Sent for Review (4)</Text>
          </View>

          <View style={styles.photoThumbRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60' }}
              style={styles.thumbImg}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60' }}
              style={styles.thumbImg}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60' }}
              style={styles.thumbImg}
            />
            <View style={styles.moreThumb}>
              <Text style={styles.moreThumbText}>+1</Text>
            </View>
          </View>
        </View>

        {/* Action Options */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
          </View>

          <TouchableOpacity style={styles.actionRow} onPress={handleSendReminder}>
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Bell size={20} color="#B45309" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Send Push Reminder</Text>
              <Text style={styles.actionSub}>Nudge customer to approve on phone</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() =>
              Alert.alert(
                'Calling Customer',
                `Connecting call with ${customerName} to confirm approval...`,
                [{ text: 'OK' }]
              )
            }
          >
            <View style={[styles.actionIcon, { backgroundColor: '#DCFCE7' }]}>
              <Phone size={20} color="#15803D" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Call Customer Directly</Text>
              <Text style={styles.actionSub}>Ask for OTP / Instant in-person signoff</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() =>
              navigation.navigate(Routes.VENDOR_ISSUE_REPORT as any, {
                bookingId,
                customerName,
              })
            }
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FEE2E2' }]}>
              <AlertTriangle size={20} color="#DC2626" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionTitle}>Raise Approval Dispute</Text>
              <Text style={styles.actionSub}>If customer is unresponsive or refusing</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom CTA (Simulate customer accepting) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.simulateBtn}
          onPress={handleSimulateApproval}
        >
          <CheckCheck size={20} color={Colors.textPrimary} />
          <Text style={styles.simulateBtnText}>Simulate Customer Approved</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  supportText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  waitingCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  pulseContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  waitingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  waitingSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  autoApprovalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  autoApprovalText: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  photoThumbRow: {
    flexDirection: 'row',
    gap: 8,
  },
  thumbImg: {
    flex: 1,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  moreThumb: {
    flex: 1,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  moreThumbText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionTextWrap: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  actionSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  simulateBtn: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  simulateBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
