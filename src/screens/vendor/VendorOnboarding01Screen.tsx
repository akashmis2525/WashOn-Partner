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
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorOnboardingNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ONBOARDING_1
>;

export const VendorOnboarding01Screen: React.FC = () => {
  const navigation = useNavigation<VendorOnboardingNavProp>();

  const handleNext = () => {
    navigation.navigate(Routes.VENDOR_ONBOARDING_2 as never);
  };

  const handleSkip = () => {
    navigation.navigate(Routes.VENDOR_LOGIN as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP HEADER WITH LOGO & SKIP */}
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
            <Sparkles size={13} color="#0F172A" />
            <Text style={styles.tagBadgeText}>EARN ₹30,000+ MONTHLY</Text>
          </View>
          <Text style={styles.headingBlack}>
            Get Nearby <Text style={styles.headingYellow}>Wash Bookings</Text>
          </Text>
          <Text style={styles.description}>
            Doorstep vehicle washing orders directly sent to your mobile radar.
          </Text>
        </View>

        {/* HERO ILLUSTRATION */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../../assets/vendor_washerman_cutout.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />

          {/* OVERLAY BADGES */}
          <View style={styles.leftSkillBadge}>
            <Text style={styles.badgeBold}>Your Skill</Text>
            <Text style={styles.badgeItalic}>Our Platform</Text>
          </View>

          <View style={styles.bottomBookingsCard}>
            <View style={styles.cardHeaderSmall}>
              <View style={styles.pulseGreenDot} />
              <Text style={styles.cardHeaderSmallText}>NEARBY DEMAND ACTIVE</Text>
            </View>

            <View style={styles.orderRow}>
              <View style={styles.carMiniIcon}>
                <Zap size={14} color="#0F172A" />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.orderLoc}>Vijay Nagar (1.2 km away)</Text>
                <Text style={styles.orderType}>Foam Bike Wash • ₹249 Payout</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3 HIGHLIGHT FEATURE CARDS */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <MapPin size={18} color="#0F172A" />
            </View>
            <Text style={styles.featureTitle}>Nearby Rides</Text>
            <Text style={styles.featureSub}>Under 3 km radius</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <IndianRupee size={18} color="#0F172A" />
            </View>
            <Text style={styles.featureTitle}>Daily Cashout</Text>
            <Text style={styles.featureSub}>Instant bank transfer</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <ShieldCheck size={18} color="#0F172A" />
            </View>
            <Text style={styles.featureTitle}>Zero Loss</Text>
            <Text style={styles.featureSub}>100% genuine clients</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM PAGINATION & CTA */}
      <View style={styles.bottomContainer}>
        <View style={styles.paginationRow}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.ctaText}>NEXT</Text>
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
    marginBottom: 12,
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
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
    lineHeight: 38,
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
  heroContainer: {
    width: '100%',
    height: height * 0.38,
    borderRadius: 20,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  heroImage: {
    width: '90%',
    height: '90%',
  },
  leftSkillBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeBold: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  badgeItalic: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFC80A',
  },
  bottomBookingsCard: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeaderSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  pulseGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  cardHeaderSmallText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carMiniIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderLoc: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  orderType: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  featureItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  featureIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  featureSub: {
    fontSize: 9,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
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
