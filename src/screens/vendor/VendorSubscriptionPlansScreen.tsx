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
  Crown,
  Zap,
  Shield,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';

export const VendorSubscriptionPlansScreen = ({ navigation }: any) => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'premium'>('free');

  const plans = [
    {
      id: 'free',
      name: 'Starter Partner (Free)',
      price: '₹0 / month',
      commission: '12% per completed booking',
      features: [
        'Standard booking queue placement',
        'Standard 5 km operating radius',
        'Daily automated bank settlement',
        'Standard support via in-app chat',
      ],
      current: true,
    },
    {
      id: 'pro',
      name: 'Pro Washer Tier',
      price: '₹499 / month',
      commission: '8% per completed booking (Save 4%)',
      features: [
        '1.5x Higher priority for nearby leads',
        'Extended 8 km service radius',
        'Instant wallet withdrawal without fee',
        'Priority phone helpdesk support',
      ],
      current: false,
    },
    {
      id: 'premium',
      name: 'Elite Detailer Club',
      price: '₹999 / month',
      commission: '5% per completed booking (Save 7%)',
      features: [
        'Top search ranking in customer app',
        'Luxury & SUV booking exclusive access',
        'Zero platform fee on tips & bonuses',
        'Dedicated partner relationship manager',
      ],
      current: false,
    },
  ];

  const handleSelect = (id: 'free' | 'pro' | 'premium') => {
    setSelectedPlan(id);
    Alert.alert('Plan Selected', `You have selected ${id.toUpperCase()} membership.`);
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
          <Text style={styles.headerTitle}>Partner Memberships & Plans</Text>
          <Text style={styles.headerSubtitle}>Commission & priority options</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Fair pricing notice */}
        <View style={styles.noticeBox}>
          <Shield size={20} color="#0284C7" />
          <Text style={styles.noticeText}>
            WashOn values its partners! The Starter plan is 100% free with no upfront fees. Upgrade anytime only when you want higher lead volumes.
          </Text>
        </View>

        {plans.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[styles.planCard, selectedPlan === p.id && styles.planCardActive]}
            activeOpacity={0.8}
            onPress={() => handleSelect(p.id as any)}
          >
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{p.name}</Text>
                <Text style={styles.planPrice}>{p.price}</Text>
              </View>
              {p.id === 'premium' ? (
                <Crown size={24} color="#B45309" />
              ) : (
                <Zap size={24} color="#059669" />
              )}
            </View>

            <View style={styles.commissionTag}>
              <Text style={styles.commissionText}>{p.commission}</Text>
            </View>

            <View style={styles.divider} />

            {p.features.map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <CheckCircle2 size={16} color="#059669" />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 10,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#0369A1',
    lineHeight: 18,
  },
  planCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  planCardActive: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFBEB',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  planName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  planPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    marginTop: 2,
  },
  commissionTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  commissionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#334155',
  },
});
