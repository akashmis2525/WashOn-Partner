import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Droplets,
  Camera,
  Wallet,
  Star,
  Award,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_VERIFICATION_APPROVED
>;

const GUIDELINES = [
  {
    id: '1',
    title: 'Punctual Doorstep Arrival',
    desc: 'Reach the customer vehicle location within 10 minutes of the booked time slot.',
    icon: Clock,
  },
  {
    id: '2',
    title: 'Quality Wash Chemicals',
    desc: 'Always use scratch-safe microfibers & approved pH-neutral foam shampoo.',
    icon: Droplets,
  },
  {
    id: '3',
    title: 'Pre & Post Wash Photos',
    desc: 'Take 4 quick condition photos before starting and after completing the wash.',
    icon: Camera,
  },
  {
    id: '4',
    title: 'Direct Bank Payouts',
    desc: 'Zero payment collection hassles. Earnings are transferred every Tuesday & Friday.',
    icon: Wallet,
  },
];

export const VendorVerificationApprovedScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleStartSetup = () => {
    // Navigate to Section 3: Vendor Service Setup (Screen V013)
    navigation.navigate(Routes.VENDOR_SERVICE_AREA as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CELEBRATION HEADER */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Award size={44} color="#0F172A" />
            </View>
            <View style={styles.badgeCheck}>
              <CheckCircle2 size={20} color="#059669" />
            </View>
          </View>

          <View style={styles.verifiedTag}>
            <Sparkles size={13} color="#0F172A" />
            <AppText style={styles.verifiedTagText}>KYC VERIFIED PARTNER</AppText>
          </View>

          <AppText style={styles.title}>You're Approved!</AppText>
          <AppText style={styles.subtitle}>
            Your partner account is active and verified.
          </AppText>
        </View>

        {/* ACTIVATED PARTNER ID CARD */}
        <View style={styles.partnerCard}>
          <View style={styles.partnerCardHeader}>
            <View>
              <AppText style={styles.partnerName}>Ramesh Sharma</AppText>
              <AppText style={styles.partnerId}>ID: WASH-PTR-49102</AppText>
            </View>
            <View style={styles.activeStatusPill}>
              <View style={styles.greenPulseDot} />
              <AppText style={styles.activeStatusText}>ACTIVE</AppText>
            </View>
          </View>

          <View style={styles.partnerCardDivider} />

          <View style={styles.partnerCardStats}>
            <View style={styles.statCol}>
              <AppText style={styles.statLabel}>Partner Tier</AppText>
              <AppText style={styles.statVal}>Gold Partner</AppText>
            </View>
            <View style={styles.statCol}>
              <AppText style={styles.statLabel}>Rating</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <Star size={13} color="#FFC80A" fill="#FFC80A" />
                <AppText style={styles.statVal}>5.0</AppText>
              </View>
            </View>
            <View style={styles.statCol}>
              <AppText style={styles.statLabel}>Operating Hub</AppText>
              <AppText style={styles.statVal}>Indore Central</AppText>
            </View>
          </View>
        </View>

        {/* IMPORTANT SERVICE GUIDELINES */}
        <View style={styles.guidelinesSection}>
          <AppText style={styles.guidelinesTitle}>
            Service Guidelines
          </AppText>

          <View style={styles.guidelinesList}>
            {GUIDELINES.map((item) => {
              const IconComp = item.icon;
              return (
                <View key={item.id} style={styles.guidelineCard}>
                  <View style={styles.guidelineIconCircle}>
                    <IconComp size={20} color="#0F172A" />
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <AppText style={styles.guidelineHeading}>{item.title}</AppText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* START SETUP BUTTON */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartSetup}
          activeOpacity={0.85}
        >
          <AppText style={styles.startButtonText}>
            Go to Partner Dashboard
          </AppText>
          <ArrowRight size={20} color="#0F172A" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  bottomLeftCurve: {
    position: 'absolute',
    bottom: -height * 0.08,
    left: -width * 0.2,
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: (width * 0.55) / 2,
    backgroundColor: '#FFC80A',
    opacity: 0.95,
  },
  bottomRightCurve: {
    position: 'absolute',
    bottom: -height * 0.1,
    right: -width * 0.25,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#FFC80A',
    opacity: 0.95,
  },
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircleOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  iconCircleInner: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  badgeCheck: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 3,
    borderWidth: 2,
    borderColor: '#FEF3C7',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
    gap: 6,
  },
  verifiedTagText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  partnerCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  partnerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partnerName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  partnerId: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
  },
  activeStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.4)',
  },
  greenPulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
  },
  activeStatusText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#10B981',
    letterSpacing: 0.5,
  },
  partnerCardDivider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 14,
  },
  partnerCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {},
  statLabel: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  statVal: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#F8FAFC',
    marginTop: 2,
  },
  guidelinesSection: {
    marginBottom: 20,
  },
  guidelinesTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 12,
  },
  guidelinesList: {
    gap: 10,
  },
  guidelineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  guidelineIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidelineHeading: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 2,
  },
  guidelineDesc: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 16,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
