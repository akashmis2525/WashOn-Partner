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
  CheckCircle2,
  Zap,
  Receipt,
  Sparkles,
  Calculator,
  Send,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorCompletionSummaryScreen = ({ navigation, route }: any) => {
  const {
    bookingId = 'BK-9824',
    customerName = 'Aakash Mishra',
    vehicleModel = 'Honda Activa 6G (MP-09-XX-1234)',
    serviceName = 'Foam Bike Wash',
    startTime = '10:35 AM',
    completionTime = '11:15 AM',
    totalDuration = '40 mins',
  } = route.params || {};

  const basePrice = 249;
  const addonTireShine = 49;
  const addonChainLube = 49;
  const totalCustomerBill = basePrice + addonTireShine + addonChainLube; // ₹347
  const platformFee = 39;
  const vendorNetEarning = totalCustomerBill - platformFee; // ₹308

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
          <Text style={styles.headerTitle}>Job Summary (#{bookingId})</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Earnings Card Banner */}
        <View style={styles.earningCard}>
          <View style={styles.earningHeader}>
            <Text style={styles.earningLabel}>Your Net Payout</Text>
            <View style={styles.instantBadge}>
              <Zap size={12} color="#059669" />
              <Text style={styles.instantBadgeText}>Instant Wallet Credit</Text>
            </View>
          </View>
          <Text style={styles.earningAmount}>₹{vendorNetEarning}</Text>
          <Text style={styles.earningSub}>
            Credited to your WashOn Partner Wallet immediately upon customer approval.
          </Text>
        </View>

        {/* Booking Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Receipt size={18} color="#0F172A" />
            <Text style={styles.cardTitle}>Booking Information</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Customer</Text>
            <Text style={styles.infoValue}>{customerName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vehicle</Text>
            <Text style={styles.infoValue}>{vehicleModel}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Primary Service</Text>
            <Text style={styles.infoValueHighlight}>{serviceName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.timeGrid}>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxLabel}>Start Time</Text>
              <Text style={styles.timeBoxValue}>{startTime}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxLabel}>Completed At</Text>
              <Text style={styles.timeBoxValue}>{completionTime}</Text>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.timeBoxLabel}>Total Time</Text>
              <Text style={styles.timeBoxValue}>{totalDuration}</Text>
            </View>
          </View>
        </View>

        {/* Add-ons completed */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Sparkles size={18} color="#0F172A" />
            <Text style={styles.cardTitle}>Completed Services & Add-ons</Text>
          </View>

          <View style={styles.addonItem}>
            <View style={styles.addonLeft}>
              <CheckCircle2 size={18} color="#059669" />
              <Text style={styles.addonName}>{serviceName}</Text>
            </View>
            <Text style={styles.addonPrice}>₹{basePrice}</Text>
          </View>

          <View style={styles.addonItem}>
            <View style={styles.addonLeft}>
              <CheckCircle2 size={18} color="#059669" />
              <Text style={styles.addonName}>Tire & Trim Gloss Coating</Text>
            </View>
            <Text style={styles.addonPrice}>₹{addonTireShine}</Text>
          </View>

          <View style={styles.addonItem}>
            <View style={styles.addonLeft}>
              <CheckCircle2 size={18} color="#059669" />
              <Text style={styles.addonName}>Chain Clean & Lubrication</Text>
            </View>
            <Text style={styles.addonPrice}>₹{addonChainLube}</Text>
          </View>
        </View>

        {/* Fare & Commission Breakdown */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Calculator size={18} color="#0F172A" />
            <Text style={styles.cardTitle}>Payout Breakdown</Text>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Total Customer Amount</Text>
            <Text style={styles.fareValue}>₹{totalCustomerBill}</Text>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Platform Service Fee (11.2%)</Text>
            <Text style={styles.fareDeduct}>- ₹{platformFee}</Text>
          </View>

          <View style={styles.fareDivider} />

          <View style={styles.fareRowTotal}>
            <Text style={styles.fareTotalLabel}>Total Partner Earning</Text>
            <Text style={styles.fareTotalValue}>₹{vendorNetEarning}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.completeBtn}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_CUSTOMER_APPROVAL_PENDING as any, {
              bookingId,
              customerName,
              vendorNetEarning,
              totalCustomerBill,
            })
          }
        >
          <Text style={styles.completeBtnText}>Request Customer Approval</Text>
          <Send size={18} color={Colors.textPrimary} />
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
  earningCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  earningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  instantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  instantBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#34D399',
  },
  earningAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFC80A',
    marginBottom: 6,
  },
  earningSub: {
    fontSize: 12,
    color: '#CBD5E1',
    lineHeight: 16,
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
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  infoValueHighlight: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  timeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
  },
  timeBox: {
    alignItems: 'center',
    flex: 1,
  },
  timeBoxLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  timeBoxValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  addonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  addonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addonName: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  addonPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fareLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  fareValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  fareDeduct: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
  fareDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  fareRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareTotalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  fareTotalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  completeBtn: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  completeBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
