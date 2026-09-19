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
  Gift,
  Flame,
  Zap,
  CheckCircle2,
  MapPin,
  Clock,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorIncentivesScreen = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Incentives & Bonuses</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Daily Target Progress Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroLabel}>Daily Target Progress</Text>
              <Text style={styles.heroTitle}>4 of 6 Washes Completed</Text>
            </View>
            <View style={styles.heroBadge}>
              <Flame size={14} color="#FFC80A" />
              <Text style={styles.heroBadgeText}>₹250 Bonus</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(4 / 6) * 100}%` }]} />
          </View>
          <Text style={styles.heroSub}>Complete 2 more washes by 09:00 PM to unlock bonus!</Text>
        </View>

        {/* Incentive Schemes List */}
        <Text style={styles.sectionTitle}>Active Incentive Schemes</Text>

        {/* Peak-hour Bonus */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrap, { backgroundColor: '#FEF3C7' }]}>
              <Zap size={20} color="#B45309" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Peak Hours Evening Bonus</Text>
              <Text style={styles.cardSub}>05:00 PM - 09:00 PM Daily</Text>
            </View>
            <Text style={styles.rewardText}>+₹50 / wash</Text>
          </View>
          <Text style={styles.cardDesc}>
            Accept and finish any wash booking during evening peak hours to receive an automatic ₹50 extra bonus.
          </Text>
        </View>

        {/* Weekly Milestone */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrap, { backgroundColor: '#EFF6FF' }]}>
              <Gift size={20} color="#2563EB" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Weekly Champion Target</Text>
              <Text style={styles.cardSub}>35 Washes per week</Text>
            </View>
            <Text style={styles.rewardText}>+₹1,500</Text>
          </View>
          <Text style={styles.cardDesc}>
            Complete 35 washes Monday to Sunday with &gt;95% completion rate to receive ₹1,500 direct wallet credit.
          </Text>
        </View>

        {/* Area Surge Incentive */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconWrap, { backgroundColor: '#ECFDF5' }]}>
              <MapPin size={20} color="#059669" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Vijay Nagar High-Demand Surge</Text>
              <Text style={styles.cardSub}>Scheme 54, Mahalaxmi Nagar</Text>
            </View>
            <Text style={styles.rewardText}>+₹40 / wash</Text>
          </View>
          <Text style={styles.cardDesc}>
            Special high customer demand zone incentive valid for this weekend.
          </Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  heroLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 2,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 200, 10, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFC80A',
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC80A',
    borderRadius: 4,
  },
  heroSub: {
    fontSize: 11,
    color: '#CBD5E1',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
  },
  cardDesc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
});
