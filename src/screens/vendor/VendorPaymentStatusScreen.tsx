import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Banknote,
  Building2,
  Smartphone,
  RefreshCw,
  HelpCircle,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

type PaymentStatusType =
  | 'CUSTOMER_PENDING'
  | 'CASH_COLLECTED'
  | 'ONLINE_RECEIVED'
  | 'VERIFICATION_PENDING'
  | 'SETTLEMENT_PROCESSING'
  | 'SETTLEMENT_COMPLETED'
  | 'PAYMENT_FAILED';

interface StatusItem {
  id: string;
  bookingId: string;
  customerName: string;
  service: string;
  amount: number;
  status: PaymentStatusType;
  date: string;
  mode: string;
  referenceId: string;
}

export const VendorPaymentStatusScreen = ({ navigation, route }: any) => {
  const { bookingId = 'BK-9824' } = route.params || {};

  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'PENDING' | 'SETTLED' | 'FAILED'>('ALL');

  const payments: StatusItem[] = [
    {
      id: '1',
      bookingId: 'BK-9824',
      customerName: 'Aakash Mishra',
      service: 'Foam Bike Wash + 2 Add-ons',
      amount: 308,
      status: 'SETTLEMENT_COMPLETED',
      date: 'Today, 11:20 AM',
      mode: 'WashOn Wallet Direct',
      referenceId: 'TXN-984210984',
    },
    {
      id: '2',
      bookingId: 'BK-9821',
      customerName: 'Rohit Sharma',
      service: 'Basic Car Exterior Wash',
      amount: 599,
      status: 'CASH_COLLECTED',
      date: 'Today, 09:45 AM',
      mode: 'Cash in Hand (Platform Fee deducted from wallet)',
      referenceId: 'CASH-REC-1029',
    },
    {
      id: '3',
      bookingId: 'BK-9818',
      customerName: 'Pooja Verma',
      service: 'Full Bike Detail',
      amount: 350,
      status: 'SETTLEMENT_PROCESSING',
      date: 'Yesterday, 05:30 PM',
      mode: 'Direct Bank NEFT Transfer',
      referenceId: 'NEFT-8841029',
    },
    {
      id: '4',
      bookingId: 'BK-9810',
      customerName: 'Amit Saxena',
      service: 'Foam Bike Wash',
      amount: 249,
      status: 'ONLINE_RECEIVED',
      date: '17 Sep, 02:15 PM',
      mode: 'UPI Payment Received',
      referenceId: 'UPI-7740192',
    },
    {
      id: '5',
      bookingId: 'BK-9804',
      customerName: 'Sunil Gupta',
      service: 'SUV Deep Foam Wash',
      amount: 699,
      status: 'VERIFICATION_PENDING',
      date: '16 Sep, 06:10 PM',
      mode: 'QR Code Scan (Under Reconciliation)',
      referenceId: 'QR-5541092',
    },
    {
      id: '6',
      bookingId: 'BK-9799',
      customerName: 'Deepak Joshi',
      service: 'Bike Chain Lube & Wash',
      amount: 299,
      status: 'CUSTOMER_PENDING',
      date: '16 Sep, 11:00 AM',
      mode: 'Payment link sent to customer SMS',
      referenceId: 'PAY-LNK-0021',
    },
    {
      id: '7',
      bookingId: 'BK-9790',
      customerName: 'Karan Mehra',
      service: 'Car Interior Dry Clean',
      amount: 799,
      status: 'PAYMENT_FAILED',
      date: '15 Sep, 04:30 PM',
      mode: 'UPI Gateway Timeout',
      referenceId: 'FAIL-TXN-1102',
    },
  ];

  const getStatusBadge = (status: PaymentStatusType) => {
    switch (status) {
      case 'SETTLEMENT_COMPLETED':
        return {
          label: 'Settlement Completed',
          icon: <CheckCircle2 size={14} color="#059669" />,
          bg: '#ECFDF5',
          text: '#059669',
        };
      case 'SETTLEMENT_PROCESSING':
        return {
          label: 'Settlement Processing',
          icon: <RefreshCw size={14} color="#2563EB" />,
          bg: '#EFF6FF',
          text: '#2563EB',
        };
      case 'CASH_COLLECTED':
        return {
          label: 'Cash Collected',
          icon: <Banknote size={14} color="#B45309" />,
          bg: '#FEF3C7',
          text: '#B45309',
        };
      case 'ONLINE_RECEIVED':
        return {
          label: 'Online Payment Received',
          icon: <Smartphone size={14} color="#059669" />,
          bg: '#ECFDF5',
          text: '#059669',
        };
      case 'VERIFICATION_PENDING':
        return {
          label: 'Verification Pending',
          icon: <Clock size={14} color="#D97706" />,
          bg: '#FFFBEB',
          text: '#D97706',
        };
      case 'CUSTOMER_PENDING':
        return {
          label: 'Customer Payment Pending',
          icon: <AlertCircle size={14} color="#EA580C" />,
          bg: '#FFF7ED',
          text: '#EA580C',
        };
      case 'PAYMENT_FAILED':
        return {
          label: 'Payment Failed',
          icon: <XCircle size={14} color="#DC2626" />,
          bg: '#FEE2E2',
          text: '#DC2626',
        };
    }
  };

  const filtered = payments.filter(p => {
    if (selectedFilter === 'PENDING')
      return (
        p.status === 'CUSTOMER_PENDING' ||
        p.status === 'VERIFICATION_PENDING' ||
        p.status === 'SETTLEMENT_PROCESSING'
      );
    if (selectedFilter === 'SETTLED')
      return p.status === 'SETTLEMENT_COMPLETED' || p.status === 'ONLINE_RECEIVED' || p.status === 'CASH_COLLECTED';
    if (selectedFilter === 'FAILED') return p.status === 'PAYMENT_FAILED';
    return true;
  });

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
          <Text style={styles.headerTitle}>Payment Status</Text>
          <Text style={styles.headerSubtitle}>Real-time Collection & Settlements</Text>
        </View>
        <TouchableOpacity
          style={styles.supportBtn}
          onPress={() =>
            Alert.alert(
              'Payment Support',
              'Need help with an un-settled transaction? Call partner helpdesk: +91 1800-WASHON-PRO'
            )
          }
        >
          <HelpCircle size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['ALL', 'PENDING', 'SETTLED', 'FAILED'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.filterPill,
              selectedFilter === tab && styles.filterPillActive,
            ]}
            onPress={() => setSelectedFilter(tab)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === tab && styles.filterTextActive,
              ]}
            >
              {tab === 'ALL'
                ? 'All Statuses'
                : tab === 'PENDING'
                ? 'Pending'
                : tab === 'SETTLED'
                ? 'Settled / Done'
                : 'Failed / Issue'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filtered.map(item => {
          const badge = getStatusBadge(item.status);
          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.bookingId}>#{item.bookingId}</Text>
                  <Text style={styles.customerName}>{item.customerName}</Text>
                </View>
                <Text style={styles.amountText}>₹{item.amount}</Text>
              </View>

              <Text style={styles.serviceText}>{item.service}</Text>

              {/* Status Pill */}
              <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                {badge.icon}
                <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                  {badge.label}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardBottom}>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>Payment Mode</Text>
                  <Text style={styles.infoVal} numberOfLines={1}>
                    {item.mode}
                  </Text>
                </View>
                <View style={[styles.infoCol, { alignItems: 'flex-end' }]}>
                  <Text style={styles.infoLabel}>Ref / Timestamp</Text>
                  <Text style={styles.infoVal}>{item.date}</Text>
                </View>
              </View>

              {item.status === 'PAYMENT_FAILED' && (
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={() =>
                    Alert.alert(
                      'Re-requesting Customer',
                      `Payment link re-sent to ${item.customerName}.`
                    )
                  }
                >
                  <RefreshCw size={14} color="#FFF" />
                  <Text style={styles.retryBtnText}>Resend Payment Link</Text>
                </TouchableOpacity>
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
  supportBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 8,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  filterPillActive: {
    backgroundColor: '#0F172A',
  },
  filterText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  customerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginTop: 1,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  serviceText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
    marginBottom: 10,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginBottom: 2,
  },
  infoVal: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 8,
    height: 38,
    marginTop: 12,
    gap: 6,
  },
  retryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
});
