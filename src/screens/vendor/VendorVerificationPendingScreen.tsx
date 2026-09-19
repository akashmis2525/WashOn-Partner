import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Clock,
  CheckCircle2,
  Hourglass,
  FileText,
  Headphones,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_VERIFICATION_PENDING
>;

export const VendorVerificationPendingScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckStatus = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      // For demo flow, simulate instantaneous KYC approval!
      navigation.navigate(Routes.VENDOR_VERIFICATION_APPROVED as never);
    }, 900);
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Partner Verification Support',
      'Need expedited approval or having issues with KYC?\n\nHelpline: +91 81206 52523\nEmail: partners@washon.app',
      [
        { text: 'Call Support', onPress: () => {} },
        { text: 'Chat on WhatsApp', onPress: () => {} },
        { text: 'Close', style: 'cancel' },
      ]
    );
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
        {/* HERO ICON ANIMATION */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Hourglass size={38} color="#0F172A" />
            </View>
            <View style={styles.badgePulse}>
              <Clock size={15} color="#D97706" />
            </View>
          </View>

          <AppText style={styles.title}>Application Under Review</AppText>
          <AppText style={styles.subtitle}>
            Your vendor documents have been securely received. Our onboarding team is reviewing your profile.
          </AppText>
        </View>

        {/* APPLICATION STATUS CARD */}
        <View style={styles.statusCard}>
          <View style={styles.statusCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <FileText size={16} color="#0F172A" />
              <AppText style={styles.statusCardTitle}>Application Summary</AppText>
            </View>
            <View style={styles.refBadge}>
              <AppText style={styles.refBadgeText}>#WASH-88219</AppText>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Submitted On</AppText>
            <AppText style={styles.summaryValue}>Today, 10:45 AM</AppText>
          </View>
          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Document Type</AppText>
            <AppText style={styles.summaryValue}>Aadhaar Card + Selfie</AppText>
          </View>
          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Operating City</AppText>
            <AppText style={styles.summaryValue}>Indore (Madhya Pradesh)</AppText>
          </View>
        </View>

        {/* VERIFICATION PROGRESS TIMELINE */}
        <View style={styles.timelineSection}>
          <AppText style={styles.timelineSectionTitle}>
            Verification Steps
          </AppText>

          {/* STEP 1: COMPLETED */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineDot, styles.timelineDotDone]}>
                <CheckCircle2 size={16} color="#FFFFFF" />
              </View>
              <View style={[styles.timelineLine, styles.timelineLineDone]} />
            </View>
            <View style={styles.timelineContent}>
              <AppText style={styles.stepTitle}>Details Submitted</AppText>
              <AppText style={styles.stepDesc}>
                Personal profile, phone & government ID uploaded
              </AppText>
            </View>
          </View>

          {/* STEP 2: IN PROGRESS */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineDot, styles.timelineDotActive]}>
                <Hourglass size={14} color="#0F172A" />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <AppText style={styles.stepTitleActive}>Document Review</AppText>
                <View style={styles.inReviewBadge}>
                  <AppText style={styles.inReviewBadgeText}>IN PROGRESS</AppText>
                </View>
              </View>
              <AppText style={styles.stepDesc}>
                Automated face matching & background verification
              </AppText>
            </View>
          </View>

          {/* STEP 3: PENDING */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineDot}>
                <ShieldCheck size={14} color="#94A3B8" />
              </View>
            </View>
            <View style={styles.timelineContent}>
              <AppText style={styles.stepTitlePending}>Account Activation</AppText>
              <AppText style={styles.stepDesc}>
                Start receiving wash bookings in your area
              </AppText>
            </View>
          </View>
        </View>

        {/* EXPECTED TIME NOTICE */}
        <View style={styles.reviewTimeNotice}>
          <Clock size={16} color="#D97706" style={{ marginTop: 2, marginRight: 8 }} />
          <AppText style={styles.reviewTimeText}>
            Expected review time: <AppText style={styles.boldTime}>2 to 4 hours</AppText>. You will receive an SMS confirmation once activated.
          </AppText>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionsBlock}>
          {/* CHECK STATUS / DEMO APPROVE */}
          <TouchableOpacity
            style={styles.checkStatusBtn}
            onPress={handleCheckStatus}
            activeOpacity={0.85}
            disabled={isChecking}
          >
            {isChecking ? (
              <ActivityIndicator color="#0F172A" size="small" />
            ) : (
              <>
                <Sparkles size={18} color="#0F172A" />
                <AppText style={styles.checkStatusBtnText}>
                  Check Status (Simulate Approval)
                </AppText>
              </>
            )}
          </TouchableOpacity>

          {/* CONTACT SUPPORT */}
          <TouchableOpacity
            style={styles.supportBtn}
            onPress={handleContactSupport}
            activeOpacity={0.8}
          >
            <Headphones size={18} color="#64748B" />
            <AppText style={styles.supportBtnText}>
              Need Help? Contact Partner Support
            </AppText>
          </TouchableOpacity>
        </View>
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
    paddingTop: 24,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircleOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  iconCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  badgePulse: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 5,
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
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
  statusCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 20,
  },
  statusCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 10,
  },
  statusCardTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  refBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  refBadgeText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  timelineSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    padding: 16,
    marginBottom: 16,
  },
  timelineSectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 14,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 52,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 28,
    marginRight: 10,
  },
  timelineDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timelineDotDone: {
    backgroundColor: '#059669',
  },
  timelineDotActive: {
    backgroundColor: '#FFC80A',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
  },
  timelineLineDone: {
    backgroundColor: '#059669',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 14,
  },
  stepTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  stepTitleActive: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  stepTitlePending: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#94A3B8',
  },
  inReviewBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  inReviewBadgeText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  stepDesc: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  reviewTimeNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFDF5',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  reviewTimeText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#78350F',
    lineHeight: 16,
  },
  boldTime: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  actionsBlock: {
    gap: 10,
  },
  checkStatusBtn: {
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
  checkStatusBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  supportBtnText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#475569',
  },
});
