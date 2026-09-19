import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Wallet,
  Clock,
  CheckCircle2,
  Building2,
  AlertCircle,
  Zap,
  Calendar,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorWithdrawalScreen = ({ navigation }: any) => {
  const availableBalance = 3840;
  const pendingBalance = 480;
  const minWithdrawal = 500;

  const [withdrawAmount, setWithdrawAmount] = useState('3840');
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'BANK'>('UPI');

  const handleWithdraw = () => {
    const num = parseFloat(withdrawAmount);
    if (isNaN(num) || num < minWithdrawal) {
      Alert.alert('Invalid Amount', `Minimum withdrawal amount is ₹${minWithdrawal}.`);
      return;
    }
    if (num > availableBalance) {
      Alert.alert('Insufficient Balance', 'Withdrawal amount exceeds your available balance.');
      return;
    }

    Alert.alert(
      'Settlement Requested',
      `₹${num} payout initiated via ${selectedMethod}. Expected credit within 15 minutes!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate(Routes.VENDOR_TRANSACTION_HISTORY as any),
        },
      ]
    );
  };

  const settlementHistory = [
    {
      id: 'SET-99120',
      date: '17 Sep 2026, 08:30 PM',
      amount: 4250,
      mode: 'UPI (ramesh@oksbi)',
      status: 'Success',
      utr: 'UTR-9841209384',
    },
    {
      id: 'SET-99054',
      date: '14 Sep 2026, 09:15 PM',
      amount: 6800,
      mode: 'Bank NEFT (SBI ****8201)',
      status: 'Success',
      utr: 'UTR-8831094821',
    },
    {
      id: 'SET-98921',
      date: '10 Sep 2026, 07:45 PM',
      amount: 3200,
      mode: 'UPI (ramesh@oksbi)',
      status: 'Success',
      utr: 'UTR-7710294812',
    },
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
          <Text style={styles.headerTitle}>Withdrawal & Settlements</Text>
          <Text style={styles.headerSubtitle}>Direct Wallet to Bank Transfer</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Balance Overview Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceLabel}>Available for Withdrawal</Text>
              <Text style={styles.balanceAmount}>₹{availableBalance.toLocaleString()}</Text>
            </View>
            <View style={styles.instantBadge}>
              <Zap size={14} color="#059669" />
              <Text style={styles.instantBadgeText}>Instant Payout</Text>
            </View>
          </View>

          <View style={styles.dividerLight} />

          <View style={styles.subBalanceRow}>
            <View style={styles.subBalanceCol}>
              <Text style={styles.subBalanceLabel}>Pending Settlement (In Review)</Text>
              <Text style={styles.subBalanceVal}>₹{pendingBalance}</Text>
            </View>
            <View style={styles.subBalanceColRight}>
              <Text style={styles.subBalanceLabel}>Minimum Withdrawal</Text>
              <Text style={styles.subBalanceVal}>₹{minWithdrawal}</Text>
            </View>
          </View>
        </View>

        {/* Withdrawal Amount Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Enter Withdrawal Amount</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.rupeePrefix}>₹</Text>
            <TextInput
              style={styles.amountInput}
              value={withdrawAmount}
              onChangeText={setWithdrawAmount}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={styles.maxBtn}
              onPress={() => setWithdrawAmount(availableBalance.toString())}
            >
              <Text style={styles.maxBtnText}>WITHDRAW ALL</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.expectedDateText}>
            ⚡ Estimated Credit Time: <Text style={{ fontWeight: '700' }}>Within 15 minutes</Text> (24x7 IMPS/UPI)
          </Text>
        </View>

        {/* Destination Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payout Destination</Text>

          <TouchableOpacity
            style={[styles.methodOption, selectedMethod === 'UPI' && styles.methodOptionActive]}
            onPress={() => setSelectedMethod('UPI')}
          >
            <View style={styles.radioCircle}>
              {selectedMethod === 'UPI' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Primary UPI ID (Fastest)</Text>
              <Text style={styles.methodSub}>ramesh.washon@oksbi</Text>
            </View>
            <View style={styles.instantTag}>
              <Text style={styles.instantTagText}>⚡ Instant</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.methodOption, selectedMethod === 'BANK' && styles.methodOptionActive]}
            onPress={() => setSelectedMethod('BANK')}
          >
            <View style={styles.radioCircle}>
              {selectedMethod === 'BANK' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>Bank Account (SBI)</Text>
              <Text style={styles.methodSub}>A/C: ****8201 • IFSC: SBIN0001234</Text>
            </View>
            <View style={styles.neftTag}>
              <Text style={styles.neftTagText}>NEFT/IMPS</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Settlement History */}
        <View style={styles.historySectionHeader}>
          <Text style={styles.historySectionTitle}>Past Settlement History</Text>
          <Calendar size={18} color="#64748B" />
        </View>

        {settlementHistory.map(item => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={styles.historyIcon}>
                <CheckCircle2 size={18} color="#059669" />
              </View>
              <View>
                <Text style={styles.historyId}>{item.id}</Text>
                <Text style={styles.historyMode}>{item.mode}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.historyRight}>
              <Text style={styles.historyAmount}>-₹{item.amount}</Text>
              <Text style={styles.historyUtr}>{item.utr}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.withdrawBtn} onPress={handleWithdraw}>
          <Zap size={18} color={Colors.textPrimary} />
          <Text style={styles.withdrawBtnText}>Request Instant Settlement (₹{withdrawAmount || '0'})</Text>
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
  balanceCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balanceLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFC80A',
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
  dividerLight: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 14,
  },
  subBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subBalanceCol: {
    flex: 1,
  },
  subBalanceColRight: {
    alignItems: 'flex-end',
  },
  subBalanceLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 2,
  },
  subBalanceVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 52,
  },
  rupeePrefix: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  maxBtn: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  maxBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  expectedDateText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 10,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  methodOptionActive: {
    backgroundColor: '#FFFBEB',
    borderColor: Colors.primary,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F172A',
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  methodSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  instantTag: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  instantTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  neftTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  neftTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  historySectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  historySectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyId: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  historyMode: {
    fontSize: 11,
    color: '#64748B',
  },
  historyDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  historyUtr: {
    fontSize: 9,
    color: '#059669',
    fontWeight: '600',
    marginTop: 2,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  withdrawBtn: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  withdrawBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
