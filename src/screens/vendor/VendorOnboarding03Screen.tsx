import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Calendar,
  IndianRupee,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorOnboarding3NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ONBOARDING_3
>;

export const VendorOnboarding03Screen: React.FC = () => {
  const navigation = useNavigation<VendorOnboarding3NavProp>();

  const handleGetStarted = () => {
    navigation.navigate(Routes.VENDOR_LOGIN as never);
  };

  const handleSkip = () => {
    navigation.navigate(Routes.VENDOR_LOGIN as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP HEADER */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <View style={styles.partnerPill}>
            <Text style={styles.partnerPillText}>PARTNER</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* RAPIDO HIGH-IMPACT HERO HEADINGS */}
        <View style={styles.headingSection}>
          <View style={styles.tagBadge}>
            <Award size={13} color="#0F172A" />
            <Text style={styles.tagBadgeText}>BE YOUR OWN BOSS</Text>
          </View>
          <Text style={styles.headingBlack}>
            Work. Earn. <Text style={styles.headingYellow}>Grow.</Text>
          </Text>
          <Text style={styles.description}>
            Flexible working hours, weekly bonus incentives, and guaranteed digital payments.
          </Text>
        </View>

        {/* 3 VALUE CARDS */}
        <View style={styles.cardsGrid}>
          {/* Card 1: Flexible Hours */}
          <View style={styles.benefitCard}>
            <View style={styles.cardIconCircle}>
              <Calendar size={20} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>Flexible Working Hours</Text>
              <Text style={styles.cardSub}>Work full-time or part-time. Turn duty ON/OFF anytime.</Text>
            </View>
          </View>

          {/* Card 2: Instant Payouts */}
          <View style={styles.benefitCard}>
            <View style={styles.cardIconCircle}>
              <IndianRupee size={20} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>Instant & Safe Payouts</Text>
              <Text style={styles.cardSub}>Direct bank transfers twice a week with zero commission cut.</Text>
            </View>
          </View>

          {/* Card 3: Incentives & Rewards */}
          <View style={styles.benefitCard}>
            <View style={styles.cardIconCircle}>
              <TrendingUp size={20} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>Weekly Incentives & Badges</Text>
              <Text style={styles.cardSub}>Complete daily milestones to unlock cash bonuses and tips.</Text>
            </View>
          </View>
        </View>

        {/* TRUST BADGE */}
        <View style={styles.trustBanner}>
          <ShieldCheck size={18} color="#059669" />
          <Text style={styles.trustText}>Joined by 2,500+ verified wash partners across Indore</Text>
        </View>
      </ScrollView>

      {/* BOTTOM PAGINATION & CTA */}
      <View style={styles.bottomContainer}>
        <View style={styles.paginationRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted} activeOpacity={0.85}>
          <Text style={styles.ctaText}>GET STARTED NOW</Text>
          <ArrowRight size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    width: 120,
    height: 38,
  },
  partnerPill: {
    backgroundColor: '#FFC80A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  partnerPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headingSection: {
    marginBottom: 14,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  headingBlack: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
    lineHeight: 40,
  },
  headingYellow: {
    color: '#D97706',
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 6,
    lineHeight: 18,
  },
  cardsGrid: {
    gap: 10,
    marginVertical: 10,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  trustText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  activeDot: {
    width: 22,
    backgroundColor: '#FFC80A',
  },
  ctaButton: {
    height: 52,
    backgroundColor: '#FFC80A',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});
