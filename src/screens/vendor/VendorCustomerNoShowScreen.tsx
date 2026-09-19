import React, { useState, useEffect } from 'react';
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
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle2,
  Headphones,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorCustomerNoShowScreen = ({ navigation }: any) => {
  const [callCount, setCallCount] = useState(2);
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 mins remaining of mandatory 10 min wait

  useEffect(() => {
    const t = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCall = () => {
    setCallCount(prev => prev + 1);
    Alert.alert('Calling Customer', 'Calling customer phone (+91 98260 11223)...');
  };

  const handleClaimCompensation = () => {
    Alert.alert(
      'No-Show Compensation Claimed',
      'Booking marked as Customer No-Show. ₹75 compensation fee will be credited to your partner wallet within 1 hour.',
      [
        {
          text: 'Return to Online Mode',
          onPress: () => navigation.navigate(Routes.VENDOR_DASHBOARD as any),
        },
      ]
    );
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
          <Text style={styles.headerTitle}>Customer Unreachable</Text>
          <Text style={styles.headerSubtitle}>No-Show Protocol</Text>
        </View>
        <TouchableOpacity
          style={styles.supportBtn}
          onPress={() => navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any)}
        >
          <Headphones size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Wait Timer Card */}
        <View style={styles.timerCard}>
          <Clock size={36} color="#B45309" />
          <Text style={styles.timerTitle}>Mandatory Wait Period: {formatTime(timerSeconds)}</Text>
          <Text style={styles.timerDesc}>
            Please wait at customer location for 10 minutes total and make at least 2 call attempts before marking No-Show.
          </Text>

          <View style={styles.callBadge}>
            <Text style={styles.callBadgeText}>Call Attempts Made: {callCount} / 2 (Required)</Text>
          </View>
        </View>

        {/* Action Options */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Required Steps</Text>

          <TouchableOpacity style={styles.callActionBtn} onPress={handleCall}>
            <Phone size={18} color="#FFF" />
            <Text style={styles.callActionText}>Call Customer Again</Text>
          </TouchableOpacity>
        </View>

        {/* Compensation Policy Box */}
        <View style={styles.policyCard}>
          <AlertTriangle size={20} color="#059669" />
          <View style={styles.policyTextWrap}>
            <Text style={styles.policyTitle}>₹75 Partner Convenience Compensation</Text>
            <Text style={styles.policyDesc}>
              WashOn covers your travel and fuel costs if the customer is unreachable after the mandatory 10-minute wait window.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.noShowBtn, (timerSeconds > 0 || callCount < 2) && styles.noShowBtnDisabled]}
          disabled={timerSeconds > 0 || callCount < 2}
          onPress={handleClaimCompensation}
        >
          <Text style={styles.noShowBtnText}>
            {timerSeconds > 0 ? `Wait (${formatTime(timerSeconds)}) to Claim ₹75` : 'Confirm No-Show & Claim ₹75'}
          </Text>
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
  supportBtn: {
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
  timerCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 16,
  },
  timerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#B45309',
    marginTop: 10,
    marginBottom: 4,
  },
  timerDesc: {
    fontSize: 12,
    color: '#92400E',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
  },
  callBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  callBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
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
  callActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    height: 48,
    borderRadius: 12,
    gap: 8,
  },
  callActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  policyCard: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 12,
  },
  policyTextWrap: {
    flex: 1,
  },
  policyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
  },
  policyDesc: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  noShowBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noShowBtnDisabled: {
    backgroundColor: '#E2E8F0',
  },
  noShowBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
