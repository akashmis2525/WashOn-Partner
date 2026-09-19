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
  Wallet,
  TrendingUp,
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Award,
  Building2,
  History,
  CheckCircle2,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

type TimeFilter = 'today' | 'week' | 'month' | 'all';

export const VendorEarningsDashboardScreen = ({ navigation }: any) => {
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>('today');

  const earningsData = {
    today: {
      amount: 1480,
      bookings: 5,
      commission: 165,
      incentives: 150,
      pending: 480,
    },
    week: {
      amount: 9850,
      bookings: 34,
      commission: 1090,
      incentives: 800,
      pending: 1250,
    },
    month: {
      amount: 38400,
      bookings: 142,
      commission: 4250,
      incentives: 3200,
      pending: 2400,
    },
    all: {
      amount: 142600,
      bookings: 520,
      commission: 15800,
      incentives: 12500,
      pending: 0,
    },
  };

  const current = earningsData[selectedFilter];

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
          <Text style={styles.headerTitle}>Earnings & Payments</Text>
          <Text style={styles.headerSubtitle}>Financial Dashboard</Text>
        </View>
        <TouchableOpacity
          style={styles.bankBtn}
          onPress={() => navigation.navigate(Routes.VENDOR_BANK_DETAILS as any)}
        >
          <Building2 size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Time Filter Pills */}
      <View style={styles.filterRow}>
        {(['today', 'week', 'month', 'all'] as TimeFilter[]).map(tab => (
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
              {tab === 'today'
                ? "Today's"
                : tab === 'week'
                ? 'This Week'
                : tab === 'month'
                ? 'This Month'
                : 'All Time'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Wallet Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>Net Partner Earnings</Text>
              <Text style={styles.heroAmount}>₹{current.amount.toLocaleString()}</Text>
            </View>
            <View style={styles.heroBadge}>
              <TrendingUp size={14} color="#059669" />
              <Text style={styles.heroBadgeText}>+18.4% vs last</Text>
            </View>
          </View>

          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{current.bookings}</Text>
              <Text style={styles.heroStatLabel}>Completed Washes</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={[styles.heroStatValue, { color: '#FFC80A' }]}>
                ₹{current.incentives}
              </Text>
              <Text style={styles.heroStatLabel}>Bonus & Tips</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={[styles.heroStatValue, { color: '#CBD5E1' }]}>
                ₹{current.commission}
              </Text>
              <Text style={styles.heroStatLabel}>Platform Fee</Text>
            </View>
          </View>

          {/* Settle / Withdraw CTA inside Hero */}
          <View style={styles.heroActionRow}>
            <TouchableOpacity
              style={styles.settleBtn}
              onPress={() => navigation.navigate(Routes.VENDOR_WITHDRAWAL as any)}
            >
              <Wallet size={16} color="#0F172A" />
              <Text style={styles.settleBtnText}>Withdraw / Settle ₹{current.amount}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Access Menu */}
        <View style={styles.menuGrid}>
          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate(Routes.VENDOR_EARNINGS_BREAKDOWN as any)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <TrendingUp size={22} color="#2563EB" />
            </View>
            <Text style={styles.menuTitle}>Order Breakdown</Text>
            <Text style={styles.menuSub}>Detailed fare splits</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate(Routes.VENDOR_PAYMENT_STATUS as any)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#ECFDF5' }]}>
              <CheckCircle2 size={22} color="#059669" />
            </View>
            <Text style={styles.menuTitle}>Payment Status</Text>
            <Text style={styles.menuSub}>Cash & Online tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate(Routes.VENDOR_TRANSACTION_HISTORY as any)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#F5F3FF' }]}>
              <History size={22} color="#7C3AED" />
            </View>
            <Text style={styles.menuTitle}>Passbook History</Text>
            <Text style={styles.menuSub}>Credits & debits log</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate(Routes.VENDOR_BANK_DETAILS as any)}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Building2 size={22} color="#B45309" />
            </View>
            <Text style={styles.menuTitle}>Bank & UPI</Text>
            <Text style={styles.menuSub}>Manage payout account</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Jobs Earnings Preview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Completed Washes</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.VENDOR_EARNINGS_BREAKDOWN as any)}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {[
          {
            id: 'BK-9824',
            customer: 'Aakash Mishra',
            service: 'Foam Bike Wash + 2 Add-ons',
            earning: 308,
            time: '11:15 AM today',
            status: 'Settled to Wallet',
          },
          {
            id: 'BK-9821',
            customer: 'Rohit Sharma',
            service: 'Basic Car Exterior Wash',
            earning: 399,
            time: '09:40 AM today',
            status: 'Settled to Wallet',
          },
          {
            id: 'BK-9818',
            customer: 'Pooja Verma',
            service: 'Premium Bike Wash & Polish',
            earning: 349,
            time: 'Yesterday, 05:20 PM',
            status: 'Settled to Wallet',
          },
        ].map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.recentItem}
            onPress={() =>
              navigation.navigate(Routes.VENDOR_EARNINGS_BREAKDOWN as any, {
                bookingId: item.id,
              })
            }
          >
            <View style={styles.recentLeft}>
              <View style={styles.recentIconWrap}>
                <Award size={18} color="#059669" />
              </View>
              <View>
                <Text style={styles.recentCustomer}>{item.customer}</Text>
                <Text style={styles.recentService}>{item.service}</Text>
                <Text style={styles.recentTime}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.recentRight}>
              <Text style={styles.recentEarning}>+₹{item.earning}</Text>
              <View style={styles.recentBadge}>
                <Text style={styles.recentBadgeText}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  bankBtn: {
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
    fontSize: 12,
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
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 4,
  },
  heroAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFC80A',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#34D399',
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 2,
  },
  heroStatLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  heroStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  settleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  settleBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  menuSub: {
    fontSize: 11,
    color: '#64748B',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  recentIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentCustomer: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  recentService: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  recentTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  recentRight: {
    alignItems: 'flex-end',
  },
  recentEarning: {
    fontSize: 15,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 4,
  },
  recentBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recentBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#059669',
  },
});
