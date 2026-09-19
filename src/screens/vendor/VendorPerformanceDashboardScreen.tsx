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
  Trophy,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorPerformanceDashboardScreen = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Performance</Text>
        </View>
        <View style={styles.tierBadge}>
          <Trophy size={14} color="#B45309" />
          <Text style={styles.tierBadgeText}>Gold Tier</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tier Banner */}
        <View style={styles.tierCard}>
          <Text style={styles.tierLabel}>Your Tier Level</Text>
          <Text style={styles.tierTitle}>Gold Partner Pro</Text>
          <Text style={styles.tierDesc}>
            You get 1.5x lead priority in Vijay Nagar & Scheme 54 and ₹150 peak-hour bonus!
          </Text>
        </View>

        {/* 6 Key KPIs Grid */}
        <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>96%</Text>
            <Text style={styles.kpiLabel}>Acceptance Rate</Text>
            <Text style={styles.kpiTarget}>Target: &gt;90%</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={[styles.kpiValue, { color: '#059669' }]}>99.2%</Text>
            <Text style={styles.kpiLabel}>Completion Rate</Text>
            <Text style={styles.kpiTarget}>Target: &gt;95%</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={[styles.kpiValue, { color: '#2563EB' }]}>4.9 ★</Text>
            <Text style={styles.kpiLabel}>Average Rating</Text>
            <Text style={styles.kpiTarget}>Target: &gt;4.7</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>94%</Text>
            <Text style={styles.kpiLabel}>On-Time Arrival</Text>
            <Text style={styles.kpiTarget}>Avg delay: 2 mins</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={[styles.kpiValue, { color: '#059669' }]}>0.8%</Text>
            <Text style={styles.kpiLabel}>Cancellation Rate</Text>
            <Text style={styles.kpiTarget}>Low (Excellent)</Text>
          </View>

          <View style={styles.kpiCard}>
            <Text style={[styles.kpiValue, { color: '#7C3AED' }]}>38%</Text>
            <Text style={styles.kpiLabel}>Repeat Customers</Text>
            <Text style={styles.kpiTarget}>120 Regulars</Text>
          </View>
        </View>

        {/* Improvement Tips Trigger */}
        <TouchableOpacity
          style={styles.improvementCard}
          onPress={() => navigation.navigate(Routes.VENDOR_PERFORMANCE_IMPROVEMENT as any)}
        >
          <View style={styles.improvementLeft}>
            <Sparkles size={22} color="#B45309" />
            <View style={styles.improvementText}>
              <Text style={styles.improvementTitle}>Tips to Reach Platinum Tier</Text>
              <Text style={styles.improvementSub}>Boost earnings by ₹4,000/month</Text>
            </View>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>
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
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  tierBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  tierCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  tierLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  tierTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFC80A',
    marginVertical: 4,
  },
  tierDesc: {
    fontSize: 12,
    color: '#CBD5E1',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  kpiTarget: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
  },
  improvementCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  improvementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  improvementText: {
    flex: 1,
  },
  improvementTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },
  improvementSub: {
    fontSize: 11,
    color: '#92400E',
    marginTop: 2,
  },
});
