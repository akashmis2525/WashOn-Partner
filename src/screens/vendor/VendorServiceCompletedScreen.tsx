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
  CheckCircle2,
  Wallet,
  Star,
  Trophy,
  Gift,
  Home,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorServiceCompletedScreen = ({ navigation, route }: any) => {
  const {
    bookingId = 'BK-9824',
    customerName = 'Aakash Mishra',
    vendorNetEarning = 308,
  } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Celebration Success Header */}
        <View style={styles.successCard}>
          <View style={styles.iconCircle}>
            <CheckCircle2 size={54} color="#059669" />
          </View>
          <Text style={styles.successTitle}>Service Completed Successfully!</Text>
          <Text style={styles.successSub}>
            Booking #{bookingId} has been closed and approved by {customerName}.
          </Text>

          {/* Amount Box */}
          <View style={styles.earningBox}>
            <Text style={styles.earningBoxLabel}>Added to Wallet Balance</Text>
            <Text style={styles.earningBoxAmount}>+ ₹{vendorNetEarning}</Text>
            <View style={styles.walletTag}>
              <Wallet size={14} color="#059669" />
              <Text style={styles.walletTagText}>Credited Instantly</Text>
            </View>
          </View>
        </View>

        {/* Status Metrics */}
        <View style={styles.metricGrid}>
          <View style={styles.metricCard}>
            <Star size={24} color="#FFC80A" />
            <Text style={styles.metricTitle}>Customer Rating</Text>
            <Text style={styles.metricValue}>Pending</Text>
            <Text style={styles.metricSub}>Awaiting feedback</Text>
          </View>

          <View style={styles.metricCard}>
            <Trophy size={24} color="#0284C7" />
            <Text style={styles.metricTitle}>Acceptance Rate</Text>
            <Text style={styles.metricValue}>98%</Text>
            <Text style={styles.metricSub}>Top Tier Partner</Text>
          </View>
        </View>

        {/* Tip & Feedback notice */}
        <View style={styles.noticeCard}>
          <Gift size={22} color="#7C3AED" />
          <View style={styles.noticeTextWrap}>
            <Text style={styles.noticeTitle}>Customer Tips</Text>
            <Text style={styles.noticeDesc}>
              Any tips given by {customerName} within 2 hours will be 100% credited to your account with 0 platform deduction.
            </Text>
          </View>
        </View>

        {/* Summary Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsHeader}>Job Summary</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Customer</Text>
            <Text style={styles.detailVal}>{customerName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle Type</Text>
            <Text style={styles.detailVal}>Honda Activa 6G (Two-Wheeler)</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Service</Text>
            <Text style={styles.detailVal}>Foam Bike Wash + 2 Add-ons</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Mode</Text>
            <Text style={styles.detailVal}>Online (WashOn Pay)</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTAs */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_DASHBOARD as any)
          }
        >
          <Text style={styles.detailsBtnText}>View Bookings History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_DASHBOARD as any)
          }
        >
          <Home size={18} color={Colors.textPrimary} />
          <Text style={styles.dashboardBtnText}>Back to Home Dashboard</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  successCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    marginTop: 8,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },
  successSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  earningBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  earningBoxLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
  },
  earningBoxAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 6,
  },
  walletTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  walletTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  metricGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricTitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 16,
    gap: 12,
  },
  noticeTextWrap: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5B21B6',
  },
  noticeDesc: {
    fontSize: 11,
    color: '#6D28D9',
    marginTop: 2,
    lineHeight: 16,
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailsHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  detailVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 10,
  },
  detailsBtn: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  dashboardBtn: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dashboardBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
