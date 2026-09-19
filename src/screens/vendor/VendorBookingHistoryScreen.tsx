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
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Bike,
  Car,
  Calendar,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

type HistoryTab = 'COMPLETED' | 'CANCELLED' | 'REJECTED' | 'EXPIRED' | 'FAILED' | 'PAYMENT_PENDING';

interface HistoryItem {
  id: string;
  customerName: string;
  vehicle: string;
  vehicleType: 'bike' | 'car';
  service: string;
  amount: number;
  date: string;
  tab: HistoryTab;
  reason?: string;
}

export const VendorBookingHistoryScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<HistoryTab>('COMPLETED');

  const historyData: HistoryItem[] = [
    {
      id: 'BK-9824',
      customerName: 'Aakash Mishra',
      vehicle: 'Honda Activa 6G',
      vehicleType: 'bike',
      service: 'Foam Bike Wash + 2 Add-ons',
      amount: 308,
      date: 'Today, 11:15 AM',
      tab: 'COMPLETED',
    },
    {
      id: 'BK-9821',
      customerName: 'Rohit Sharma',
      vehicle: 'Hyundai Creta',
      vehicleType: 'car',
      service: 'Basic Car Exterior Wash',
      amount: 599,
      date: 'Today, 09:40 AM',
      tab: 'COMPLETED',
    },
    {
      id: 'BK-9812',
      customerName: 'Praveen Jain',
      vehicle: 'Royal Enfield Classic 350',
      vehicleType: 'bike',
      service: 'Foam Bike Wash',
      amount: 249,
      date: '17 Sep, 03:20 PM',
      tab: 'CANCELLED',
      reason: 'Customer cancelled due to rain',
    },
    {
      id: 'BK-9805',
      customerName: 'Manish Verma',
      vehicle: 'Maruti Swift',
      vehicleType: 'car',
      service: 'Full Foam Wash',
      amount: 449,
      date: '16 Sep, 01:10 PM',
      tab: 'REJECTED',
      reason: 'Vendor busy on previous booking',
    },
    {
      id: 'BK-9794',
      customerName: 'Sanjay Dutt',
      vehicle: 'Honda Shine',
      vehicleType: 'bike',
      service: 'Standard Bike Wash',
      amount: 199,
      date: '15 Sep, 10:15 AM',
      tab: 'EXPIRED',
      reason: 'Request timer expired without acceptance',
    },
    {
      id: 'BK-9788',
      customerName: 'Amit Saxena',
      vehicle: 'Kia Seltos',
      vehicleType: 'car',
      service: 'Car Interior Dry Clean',
      amount: 799,
      date: '14 Sep, 05:40 PM',
      tab: 'FAILED',
      reason: 'Water supply unavailable at customer premises',
    },
    {
      id: 'BK-9775',
      customerName: 'Deepak Joshi',
      vehicle: 'Hero Splendor Plus',
      vehicleType: 'bike',
      service: 'Foam Bike Wash',
      amount: 249,
      date: '14 Sep, 11:30 AM',
      tab: 'PAYMENT_PENDING',
      reason: 'Customer UPI confirmation pending',
    },
  ];

  const filtered = historyData.filter(item => item.tab === activeTab);

  const tabs: { key: HistoryTab; label: string }[] = [
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'CANCELLED', label: 'Cancelled' },
    { key: 'REJECTED', label: 'Rejected' },
    { key: 'EXPIRED', label: 'Expired' },
    { key: 'FAILED', label: 'Failed' },
    { key: 'PAYMENT_PENDING', label: 'Pay Pending' },
  ];

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
          <Text style={styles.headerTitle}>Booking History</Text>
          <Text style={styles.headerSubtitle}>All past washes & statuses</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map(t => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabItem, activeTab === t.key && styles.tabItemActive]}
              onPress={() => setActiveTab(t.key)}
            >
              <Text style={[styles.tabText, activeTab === t.key && styles.tabTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Calendar size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No bookings in this category</Text>
            <Text style={styles.emptySub}>All your {activeTab.toLowerCase()} jobs will appear here.</Text>
          </View>
        ) : (
          filtered.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.historyCard}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate(Routes.VENDOR_BOOKING_DETAILS as any, {
                  bookingId: item.id,
                })
              }
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <View style={styles.vehicleIcon}>
                    {item.vehicleType === 'bike' ? (
                      <Bike size={20} color={Colors.textPrimary} />
                    ) : (
                      <Car size={20} color={Colors.textPrimary} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.bookingId}>#{item.id}</Text>
                    <Text style={styles.customerName}>{item.customerName}</Text>
                  </View>
                </View>

                <View style={styles.cardHeaderRight}>
                  <Text style={styles.amount}>₹{item.amount}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>

              <Text style={styles.service}>{item.service}</Text>

              {item.reason && (
                <View style={styles.reasonBox}>
                  <AlertCircle size={14} color="#64748B" />
                  <Text style={styles.reasonText}>{item.reason}</Text>
                </View>
              )}

              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <Text style={styles.viewDetailsText}>View Complete Timeline & Proofs</Text>
                <ChevronRight size={16} color="#2563EB" />
              </View>
            </TouchableOpacity>
          ))
        )}
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
  tabBar: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabScroll: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  tabItem: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  tabItemActive: {
    backgroundColor: '#0F172A',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 12,
  },
  emptySub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  historyCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vehicleIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingId: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  customerName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#059669',
  },
  date: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  service: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 8,
  },
  reasonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
});
