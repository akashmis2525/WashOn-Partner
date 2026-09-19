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
  AlertTriangle,
  XCircle,
  Shield,
  HelpCircle,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

type AccountStatusState =
  | 'ACTIVE'
  | 'VERIFICATION_PENDING'
  | 'TEMPORARILY_SUSPENDED'
  | 'DOCUMENTS_EXPIRED'
  | 'PAYMENT_HOLD'
  | 'ACCOUNT_RESTRICTED';

export const VendorAccountStatusScreen = ({ navigation }: any) => {
  const [status, setStatus] = useState<AccountStatusState>('ACTIVE');

  const getStatusData = () => {
    switch (status) {
      case 'ACTIVE':
        return {
          title: 'Account is Active & In Good Standing',
          desc: 'You are fully verified and eligible for all incoming bookings, bonuses, and instant wallet settlements.',
          badge: 'ACTIVE & VERIFIED',
          badgeBg: '#ECFDF5',
          badgeText: '#059669',
          icon: <CheckCircle2 size={48} color="#059669" />,
        };
      case 'VERIFICATION_PENDING':
        return {
          title: 'KYC Document Verification in Progress',
          desc: 'Our onboarding team is reviewing your uploaded documents. Approval takes up to 4 business hours.',
          badge: 'UNDER REVIEW',
          badgeBg: '#FFFBEB',
          badgeText: '#B45309',
          icon: <Clock size={48} color="#D97706" />,
        };
      case 'TEMPORARILY_SUSPENDED':
        return {
          title: 'Account Temporarily Suspended',
          desc: 'Your account has been temporarily placed on hold due to multiple unfulfilled scheduled bookings.',
          badge: 'SUSPENDED',
          badgeBg: '#FEE2E2',
          badgeText: '#DC2626',
          icon: <AlertTriangle size={48} color="#DC2626" />,
        };
      case 'DOCUMENTS_EXPIRED':
        return {
          title: 'Police Clearance / DL Expired',
          desc: 'Please upload your renewed Driving Licence or Police Certificate to reactivate incoming bookings.',
          badge: 'DOCS EXPIRED',
          badgeBg: '#FFFBEB',
          badgeText: '#B45309',
          icon: <AlertTriangle size={48} color="#D97706" />,
        };
      case 'PAYMENT_HOLD':
        return {
          title: 'Wallet Settlements on Hold',
          desc: 'Bank account penny-drop re-verification required before next settlement batch.',
          badge: 'PAYMENT HOLD',
          badgeBg: '#FFF7ED',
          badgeText: '#EA580C',
          icon: <Clock size={48} color="#EA580C" />,
        };
      case 'ACCOUNT_RESTRICTED':
        return {
          title: 'Account Restricted',
          desc: 'Account restricted due to policy violation inquiry. Please contact partner escalation desk.',
          badge: 'RESTRICTED',
          badgeBg: '#FEE2E2',
          badgeText: '#DC2626',
          icon: <XCircle size={48} color="#DC2626" />,
        };
    }
  };

  const statusData = getStatusData();

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
          <Text style={styles.headerTitle}>Partner Account Health</Text>
          <Text style={styles.headerSubtitle}>Compliance & Verification</Text>
        </View>
        <TouchableOpacity
          style={styles.helpBtn}
          onPress={() => navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any)}
        >
          <HelpCircle size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Status Hero */}
        <View style={styles.statusHero}>
          <View style={styles.iconContainer}>{statusData.icon}</View>
          <View style={[styles.statusBadge, { backgroundColor: statusData.badgeBg }]}>
            <Text style={[styles.statusBadgeText, { color: statusData.badgeText }]}>
              {statusData.badge}
            </Text>
          </View>
          <Text style={styles.statusTitle}>{statusData.title}</Text>
          <Text style={styles.statusDesc}>{statusData.desc}</Text>
        </View>

        {/* Status Preview Selector (For testing all 6 required states) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Simulate Account Health States</Text>
          <View style={styles.stateGrid}>
            {[
              { key: 'ACTIVE', label: 'Active' },
              { key: 'VERIFICATION_PENDING', label: 'Pending KYC' },
              { key: 'TEMPORARILY_SUSPENDED', label: 'Suspended' },
              { key: 'DOCUMENTS_EXPIRED', label: 'Expired Docs' },
              { key: 'PAYMENT_HOLD', label: 'Payment Hold' },
              { key: 'ACCOUNT_RESTRICTED', label: 'Restricted' },
            ].map(s => (
              <TouchableOpacity
                key={s.key}
                style={[
                  styles.stateBtn,
                  status === s.key && styles.stateBtnActive,
                ]}
                onPress={() => setStatus(s.key as any)}
              >
                <Text
                  style={[
                    styles.stateBtnText,
                    status === s.key && styles.stateBtnTextActive,
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Have Questions About Your Status?</Text>
          <Text style={styles.cardDesc}>
            Our partner compliance team is available 24x7 to assist with document re-evaluations and account appeals.
          </Text>
          <TouchableOpacity
            style={styles.appealBtn}
            onPress={() => navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any)}
          >
            <Text style={styles.appealBtnText}>Contact Partner Compliance Helpdesk</Text>
          </TouchableOpacity>
        </View>
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
  helpBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  statusHero: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  iconContainer: {
    marginBottom: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },
  statusDesc: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  stateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stateBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  stateBtnActive: {
    backgroundColor: '#0F172A',
  },
  stateBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  stateBtnTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  appealBtn: {
    height: 46,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appealBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
});
