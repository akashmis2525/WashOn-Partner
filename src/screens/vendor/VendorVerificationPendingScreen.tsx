import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Text,
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
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

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

      {/* TOP HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonCircle}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Verification Status</Text>
          <Text style={styles.headerSubtitle}>Step 3 of 3</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* RAPIDO HIGH-IMPACT HERO */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Hourglass size={36} color="#0F172A" />
            </View>
            <View style={styles.badgePulse}>
              <Clock size={15} color="#D97706" />
            </View>
          </View>

          <Text style={styles.mainTitle}>
            Application Under <Text style={styles.highlightYellow}>Review</Text>
          </Text>
        </View>

        {/* VERIFICATION PROGRESS TIMELINE */}
        <View style={styles.timelineCard}>
          <Text style={styles.sectionHeaderTitle}>VERIFICATION STAGES</Text>

          {/* STEP 1: COMPLETED */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineDot, styles.timelineDotDone]}>
                <CheckCircle2 size={16} color="#FFFFFF" />
              </View>
              <View style={[styles.timelineLine, styles.timelineLineDone]} />
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.stepTitleDone}>Details & Documents Submitted</Text>
              <Text style={styles.stepSubDone}>Aadhaar, PAN & live selfie uploaded</Text>
            </View>
          </View>

          {/* STEP 2: IN PROGRESS */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={[styles.timelineDot, styles.timelineDotActive]}>
                <Hourglass size={14} color="#0F172A" />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineContent}>
              <View style={styles.stepHeaderRow}>
                <Text style={styles.stepTitleActive}>Compliance & Document Review</Text>
                <View style={styles.inReviewBadge}>
                  <Text style={styles.inReviewBadgeText}>IN PROGRESS</Text>
                </View>
              </View>
            </View>
          </View>

          {/* STEP 3: PENDING */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.timelineDot}>
                <ShieldCheck size={15} color="#94A3B8" />
              </View>
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.stepTitlePending}>Account Activation</Text>
              <Text style={styles.stepSubPending}>Ready to start receiving wash requests</Text>
            </View>
          </View>
        </View>

        {/* EXPECTED TIME ROW */}
        <View style={styles.statusCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Expected Time</Text>
            <Text style={[styles.summaryValue, { color: '#D97706' }]}>2 to 4 Hours</Text>
          </View>
        </View>

        {/* EXPECTED TIME NOTICE */}
        <View style={styles.reviewTimeNotice}>
          <Clock size={18} color="#D97706" style={{ marginTop: 2, marginRight: 10 }} />
          <Text style={styles.reviewTimeText}>
            You will receive an SMS confirmation once activated.
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
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
              <Text style={styles.checkStatusBtnText}>
                CHECK STATUS
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.supportBtn}
          onPress={handleContactSupport}
          activeOpacity={0.8}
        >
          <Headphones size={16} color="#64748B" />
          <Text style={styles.supportBtnText}>
            Contact Support?
          </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircleOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  iconCircleInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePulse: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
    elevation: 3,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.6,
    lineHeight: 32,
    textAlign: 'center',
  },
  highlightYellow: {
    color: '#D97706',
  },
  subTitle: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 17,
    paddingHorizontal: 8,
  },
  timelineCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 46,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 26,
    marginRight: 10,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
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
    paddingBottom: 10,
  },
  stepTitleDone: {
    fontSize: 13,
    fontWeight: '800',
    color: '#059669',
    flexShrink: 1,
  },
  stepSubDone: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  stepTitleActive: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    flexShrink: 1,
  },
  stepSubActive: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  inReviewBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  inReviewBadgeText: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#B45309',
  },
  stepTitlePending: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
    flexShrink: 1,
  },
  stepSubPending: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  statusCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  statusCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  statusCardTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  refBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  refBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#B45309',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    gap: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    flexShrink: 1,
    textAlign: 'right',
  },
  reviewTimeNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
  },
  reviewTimeText: {
    flex: 1,
    fontSize: 11.5,
    color: '#92400E',
    lineHeight: 16,
    fontWeight: '500',
  },
  boldTime: {
    fontWeight: '800',
    color: '#0F172A',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  checkStatusBtn: {
    height: 50,
    backgroundColor: '#FFC80A',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  checkStatusBtnText: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  supportBtn: {
    height: 42,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  supportBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
});
