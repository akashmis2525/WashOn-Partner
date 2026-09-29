import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Droplets,
  Camera,
  Wallet,
  Star,
  Award,
  Zap,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_VERIFICATION_APPROVED
>;

const GUIDELINES = [
  {
    id: '1',
    title: 'Punctual Doorstep Arrival',
    desc: 'Reach customer vehicle within 10 minutes of the booked time slot.',
    icon: Clock,
  },
  {
    id: '2',
    title: 'Quality Wash Chemicals',
    desc: 'Always use scratch-safe microfibers & approved pH-neutral foam.',
    icon: Droplets,
  },
  {
    id: '3',
    title: 'Pre & Post Wash Photos',
    desc: 'Take 2-4 condition photos before starting and after wash completion.',
    icon: Camera,
  },
  {
    id: '4',
    title: 'Direct Bank Payouts',
    desc: 'Zero cash collection hassles. Automatic bank payouts every Tuesday.',
    icon: Wallet,
  },
];

export const VendorVerificationApprovedScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleStartSetup = () => {
    // Navigate to next onboarding step: Service Area Setup
    navigation.navigate(Routes.VENDOR_SERVICE_AREA as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CELEBRATION HERO */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Award size={40} color="#0F172A" />
            </View>
            <View style={styles.badgeCheck}>
              <CheckCircle2 size={18} color="#059669" />
            </View>
          </View>

          <View style={styles.verifiedTag}>
            <Sparkles size={13} color="#0F172A" />
            <Text style={styles.verifiedTagText}>KYC VERIFIED PARTNER</Text>
          </View>

          <Text style={styles.mainTitle}>
            You're <Text style={styles.highlightYellow}>Approved!</Text>
          </Text>
          <Text style={styles.subTitle}>
            Your partner account is active and verified. You are now ready to start earning with WashOn.
          </Text>
        </View>

        {/* ACTIVATED PARTNER ID CARD */}
        <View style={styles.partnerCard}>
          <View style={styles.partnerCardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.partnerName}>Ramesh Sharma</Text>
              <Text style={styles.partnerId}>ID: WASH-PTR-49102</Text>
            </View>
            <View style={styles.activeStatusPill}>
              <View style={styles.greenPulseDot} />
              <Text style={styles.activeStatusText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.partnerCardDivider} />

          <View style={styles.partnerCardStats}>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>Partner Tier</Text>
              <Text style={styles.statVal}>Gold Partner</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>Rating</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 }}>
                <Star size={13} color="#FFC80A" fill="#FFC80A" />
                <Text style={styles.statVal}>5.0</Text>
              </View>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>Operating Hub</Text>
              <Text style={styles.statVal}>Indore Central</Text>
            </View>
          </View>
        </View>

        {/* IMPORTANT SERVICE GUIDELINES */}
        <View style={styles.guidelinesSection}>
          <Text style={styles.guidelinesTitle}>IMPORTANT SERVICE GUIDELINES</Text>

          <View style={styles.guidelinesList}>
            {GUIDELINES.map((item) => {
              const IconComp = item.icon;
              return (
                <View key={item.id} style={styles.guidelineCard}>
                  <View style={styles.guidelineIconCircle}>
                    <IconComp size={18} color="#0F172A" />
                  </View>
                  <View style={styles.guidelineContent}>
                    <Text style={styles.guidelineHeading}>{item.title}</Text>
                    <Text style={styles.guidelineDesc}>{item.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM CTA BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartSetup}
          activeOpacity={0.85}
        >
          <Text style={styles.startButtonText}>CONTINUE TO SERVICE AREA</Text>
          <ArrowRight size={18} color="#0F172A" />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircleOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  iconCircleInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
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
    top: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
    elevation: 3,
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
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.8,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.6,
    lineHeight: 34,
    textAlign: 'center',
    marginBottom: 6,
  },
  highlightYellow: {
    color: '#D97706',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  partnerCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  partnerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  partnerName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  partnerId: {
    fontSize: 11.5,
    fontWeight: '600',
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
    gap: 5,
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
    fontWeight: '900',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  partnerCardDivider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 12,
  },
  partnerCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {
    flexShrink: 1,
  },
  statLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  statVal: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#F8FAFC',
    marginTop: 2,
  },
  guidelinesSection: {
    marginBottom: 8,
  },
  guidelinesTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  guidelinesList: {
    gap: 10,
  },
  guidelineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  guidelineIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidelineContent: {
    flex: 1,
  },
  guidelineHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  guidelineDesc: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#64748B',
    lineHeight: 16,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  startButton: {
    height: 50,
    backgroundColor: '#FFC80A',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});

