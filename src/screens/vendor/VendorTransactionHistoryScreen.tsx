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
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  AlertTriangle,
  RotateCcw,
  Wallet,
  Calendar,
  Filter,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

type TxnType = 'ALL' | 'EARNING' | 'SETTLEMENT' | 'BONUS' | 'PENALTY' | 'REFUND';

interface Transaction {
  id: string;
  type: 'EARNING' | 'SETTLEMENT' | 'BONUS' | 'PENALTY' | 'REFUND';
  title: string;
  subtitle: string;
  amount: number;
  isCredit: boolean;
  date: string;
  balanceAfter: number;
}

export const VendorTransactionHistoryScreen = ({ navigation }: any) => {
  const [selectedFilter, setSelectedFilter] = useState<TxnType>('ALL');

  const transactions: Transaction[] = [
    {
      id: 'TXN-9021',
      type: 'EARNING',
      title: 'Wash Completed #BK-9824',
      subtitle: 'Net earning after 11.2% platform fee',
      amount: 308,
      isCredit: true,
      date: 'Today, 11:20 AM',
      balanceAfter: 3840,
    },
    {
      id: 'TXN-9019',
      type: 'BONUS',
      title: 'Peak Hours Incentive Bonus',
      subtitle: 'Completed 5 washes between 8-11 AM',
      amount: 150,
      isCredit: true,
      date: 'Today, 11:00 AM',
      balanceAfter: 3532,
    },
    {
      id: 'TXN-9014',
      type: 'EARNING',
      title: 'Wash Completed #BK-9821',
      subtitle: 'Net customer payout credit',
      amount: 599,
      isCredit: true,
      date: 'Today, 09:45 AM',
      balanceAfter: 3382,
    },
    {
      id: 'TXN-8994',
      type: 'SETTLEMENT',
      title: 'Instant Bank Settlement',
      subtitle: 'Transferred to UPI: ramesh@oksbi',
      amount: 4250,
      isCredit: false,
      date: '17 Sep, 08:30 PM',
      balanceAfter: 2783,
    },
    {
      id: 'TXN-8980',
      type: 'REFUND',
      title: 'Customer Refund Adjustment',
      subtitle: 'Partial refund for missed add-on #BK-9750',
      amount: 49,
      isCredit: false,
      date: '16 Sep, 04:15 PM',
      balanceAfter: 7033,
    },
    {
      id: 'TXN-8971',
      type: 'PENALTY',
      title: 'Late Arrival Penalty',
      subtitle: 'Vendor 25 mins late without notice #BK-9710',
      amount: 50,
      isCredit: false,
      date: '15 Sep, 12:30 PM',
      balanceAfter: 7082,
    },
    {
      id: 'TXN-8960',
      type: 'BONUS',
      title: 'Weekly 5-Star Rating Bonus',
      subtitle: 'Maintained 4.9+ rating for 30 consecutive jobs',
      amount: 500,
      isCredit: true,
      date: '14 Sep, 10:00 AM',
      balanceAfter: 7132,
    },
  ];

  const getTxnIcon = (type: Transaction['type'], isCredit: boolean) => {
    switch (type) {
      case 'EARNING':
        return {
          icon: <ArrowDownLeft size={18} color="#059669" />,
          bg: '#ECFDF5',
        };
      case 'BONUS':
        return {
          icon: <Gift size={18} color="#7C3AED" />,
          bg: '#F5F3FF',
        };
      case 'SETTLEMENT':
        return {
          icon: <ArrowUpRight size={18} color="#2563EB" />,
          bg: '#EFF6FF',
        };
      case 'PENALTY':
        return {
          icon: <AlertTriangle size={18} color="#DC2626" />,
          bg: '#FEE2E2',
        };
      case 'REFUND':
        return {
          icon: <RotateCcw size={18} color="#D97706" />,
          bg: '#FEF3C7',
        };
    }
  };

  const filtered = transactions.filter(t => {
    if (selectedFilter === 'ALL') return true;
    return t.type === selectedFilter;
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
          <Text style={styles.headerTitle}>Transaction History</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {(['ALL', 'EARNING', 'BONUS', 'SETTLEMENT', 'PENALTY', 'REFUND'] as TxnType[]).map(tab => (
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
                  ? 'All Entries'
                  : tab === 'EARNING'
                  ? 'Bookings'
                  : tab === 'BONUS'
                  ? 'Incentives & Tips'
                  : tab === 'SETTLEMENT'
                  ? 'Bank Payouts'
                  : tab === 'PENALTY'
                  ? 'Penalties'
                  : 'Refunds'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filtered.map(item => {
          const iconMeta = getTxnIcon(item.type, item.isCredit);

          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={[styles.iconWrap, { backgroundColor: iconMeta.bg }]}>
                  {iconMeta.icon}
                </View>
                <View style={styles.textWrap}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Text
                  style={[
                    styles.amountText,
                    item.isCredit ? styles.amountCredit : styles.amountDebit,
                  ]}
                >
                  {item.isCredit ? `+₹${item.amount}` : `-₹${item.amount}`}
                </Text>
                <Text style={styles.balanceText}>
                  Bal: ₹{item.balanceAfter.toLocaleString()}
                </Text>
              </View>
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
  filterRow: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  dateText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 3,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  amountCredit: {
    color: '#059669',
  },
  amountDebit: {
    color: '#DC2626',
  },
  balanceText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
});
