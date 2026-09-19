import React, { useState } from 'react';
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
  Receipt,
  CheckCircle2,
  Clock,
  Car,
  Bike,
  Sparkles,
  MapPin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

interface BookingBreakdown {
  id: string;
  customer: string;
  vehicle: string;
  vehicleType: 'bike' | 'car';
  serviceName: string;
  serviceAmount: number;
  addonAmount: number;
  travelAmount: number;
  commission: number;
  taxDeduction: number;
  netEarning: number;
  paymentStatus: 'Online Paid' | 'Cash Collected' | 'Settlement Pending';
  paymentMode: string;
  date: string;
}

export const VendorEarningsBreakdownScreen = ({ navigation }: any) => {
  const [expandedId, setExpandedId] = useState<string | null>('BK-9824');

  const bookings: BookingBreakdown[] = [
    {
      id: 'BK-9824',
      customer: 'Aakash Mishra',
      vehicle: 'Honda Activa 6G (MP-09-XX-1234)',
      vehicleType: 'bike',
      serviceName: 'Foam Bike Wash',
      serviceAmount: 249,
      addonAmount: 98,
      travelAmount: 0,
      commission: 39,
      taxDeduction: 0,
      netEarning: 308,
      paymentStatus: 'Online Paid',
      paymentMode: 'WashOn UPI',
      date: 'Today, 11:15 AM',
    },
    {
      id: 'BK-9821',
      customer: 'Rohit Sharma',
      vehicle: 'Hyundai Creta (MP-09-AB-5678)',
      vehicleType: 'car',
      serviceName: 'Premium Exterior Foam Car Wash',
      serviceAmount: 499,
      addonAmount: 149,
      travelAmount: 40,
      commission: 79,
      taxDeduction: 10,
      netEarning: 599,
      paymentStatus: 'Cash Collected',
      paymentMode: 'Cash (Collected on Spot)',
      date: 'Today, 09:40 AM',
    },
    {
      id: 'BK-9818',
      customer: 'Pooja Verma',
      vehicle: 'Royal Enfield Hunter 350',
      vehicleType: 'bike',
      serviceName: 'Full Bike Detail & Polish',
      serviceAmount: 399,
      addonAmount: 0,
      travelAmount: 0,
      commission: 49,
      taxDeduction: 0,
      netEarning: 350,
      paymentStatus: 'Settlement Pending',
      paymentMode: 'Online Pay (In Review)',
      date: 'Yesterday, 05:20 PM',
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
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
          <Text style={styles.headerTitle}>Earnings Breakdown</Text>
          <Text style={styles.headerSubtitle}>Itemized Per-Booking Payouts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Box */}
        <View style={styles.infoBox}>
          <Receipt size={20} color="#0284C7" />
          <Text style={styles.infoText}>
            Transparent calculation: Net Earning = (Service + Add-ons + Travel) − Platform Fee − TDS/Tax.
          </Text>
        </View>

        {bookings.map(item => {
          const isExpanded = expandedId === item.id;
          const grossAmount = item.serviceAmount + item.addonAmount + item.travelAmount;

          return (
            <View key={item.id} style={styles.bookingCard}>
              {/* Card Header clickable */}
              <TouchableOpacity
                style={styles.cardHeader}
                activeOpacity={0.7}
                onPress={() => toggleExpand(item.id)}
              >
                <View style={styles.cardHeaderLeft}>
                  <View style={styles.vehicleIconCircle}>
                    {item.vehicleType === 'bike' ? (
                      <Bike size={20} color={Colors.textPrimary} />
                    ) : (
                      <Car size={20} color={Colors.textPrimary} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.bookingIdText}>#{item.id}</Text>
                    <Text style={styles.customerName}>{item.customer}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>

                <View style={styles.cardHeaderRight}>
                  <Text style={styles.netEarningAmount}>₹{item.netEarning}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      item.paymentStatus === 'Online Paid' && styles.statusPaid,
                      item.paymentStatus === 'Cash Collected' && styles.statusCash,
                      item.paymentStatus === 'Settlement Pending' && styles.statusPending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        item.paymentStatus === 'Online Paid' && styles.statusPaidText,
                        item.paymentStatus === 'Cash Collected' && styles.statusCashText,
                        item.paymentStatus === 'Settlement Pending' && styles.statusPendingText,
                      ]}
                    >
                      {item.paymentStatus}
                    </Text>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={16} color="#64748B" />
                  ) : (
                    <ChevronDown size={16} color="#64748B" />
                  )}
                </View>
              </TouchableOpacity>

              {/* Expanded Breakdown */}
              {isExpanded && (
                <View style={styles.breakdownDetails}>
                  <View style={styles.divider} />

                  <Text style={styles.breakdownSectionTitle}>Fare Calculation</Text>

                  <View style={styles.calcRow}>
                    <Text style={styles.calcLabel}>Base Service Amount ({item.serviceName})</Text>
                    <Text style={styles.calcValue}>₹{item.serviceAmount}</Text>
                  </View>

                  <View style={styles.calcRow}>
                    <Text style={styles.calcLabel}>Add-on Upgrades</Text>
                    <Text style={styles.calcValue}>₹{item.addonAmount}</Text>
                  </View>

                  {item.travelAmount > 0 && (
                    <View style={styles.calcRow}>
                      <Text style={styles.calcLabel}>Long Distance Travel Allowance</Text>
                      <Text style={styles.calcValue}>₹{item.travelAmount}</Text>
                    </View>
                  )}

                  <View style={styles.subtotalRow}>
                    <Text style={styles.subtotalLabel}>Gross Booking Total</Text>
                    <Text style={styles.subtotalValue}>₹{grossAmount}</Text>
                  </View>

                  <View style={styles.dividerLight} />

                  <Text style={styles.breakdownSectionTitle}>Deductions & Fees</Text>

                  <View style={styles.calcRow}>
                    <Text style={styles.calcLabel}>Platform Commission Fee</Text>
                    <Text style={styles.calcDeduct}>- ₹{item.commission}</Text>
                  </View>

                  {item.taxDeduction > 0 && (
                    <View style={styles.calcRow}>
                      <Text style={styles.calcLabel}>TDS / Statutory Deduction</Text>
                      <Text style={styles.calcDeduct}>- ₹{item.taxDeduction}</Text>
                    </View>
                  )}

                  <View style={styles.totalRow}>
                    <View>
                      <Text style={styles.totalLabel}>Your Net Bank Payout</Text>
                      <Text style={styles.paymentModeText}>Via {item.paymentMode}</Text>
                    </View>
                    <Text style={styles.totalValue}>₹{item.netEarning}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.viewStatusBtn}
                    onPress={() =>
                      navigation.navigate(Routes.VENDOR_PAYMENT_STATUS as any, {
                        bookingId: item.id,
                        status: item.paymentStatus,
                      })
                    }
                  >
                    <Text style={styles.viewStatusBtnText}>Track Payment & Settlement</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#0369A1',
    lineHeight: 18,
  },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  vehicleIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingIdText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  customerName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginTop: 1,
  },
  dateText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  netEarningAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
  },
  statusPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusPaid: {
    backgroundColor: '#ECFDF5',
  },
  statusPaidText: {
    color: '#059669',
  },
  statusCash: {
    backgroundColor: '#FEF3C7',
  },
  statusCashText: {
    color: '#B45309',
  },
  statusPending: {
    backgroundColor: '#EFF6FF',
  },
  statusPendingText: {
    color: '#2563EB',
  },
  breakdownDetails: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 12,
  },
  dividerLight: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  breakdownSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  calcLabel: {
    fontSize: 12,
    color: '#475569',
  },
  calcValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  calcDeduct: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  subtotalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtotalValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  paymentModeText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
  },
  viewStatusBtn: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStatusBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
});
