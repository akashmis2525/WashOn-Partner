import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  XCircle,
  AlertTriangle,
  RotateCcw,
  Headphones,
  FileX,
  Camera,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_VERIFICATION_REJECTED
>;

const REJECTED_ISSUES = [
  {
    id: '1',
    title: 'Aadhaar Photo Unclear / Glare',
    desc: 'The front photo of your Aadhaar card was blurry with strong light reflection over your date of birth.',
    icon: FileX,
  },
  {
    id: '2',
    title: 'Live Selfie Face Mismatch',
    desc: 'Selfie lighting was dark and face could not be 100% matched with the provided government ID photo.',
    icon: Camera,
  },
];

export const VendorVerificationRejectedScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleReupload = () => {
    // Navigate back to KYC verification screen to re-submit clean photos
    navigation.navigate(Routes.VENDOR_KYC_VERIFY as never);
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Partner Support Desk',
      'Speak with a verification agent to clarify document guidelines.\n\nHelpline: +91 81206 52523\nWhatsApp: +91 81206 52523',
      [
        { text: 'Call Support', onPress: () => {} },
        { text: 'WhatsApp Chat', onPress: () => {} },
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
        {/* REJECTION HERO */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <XCircle size={44} color="#EF4444" />
            </View>
            <View style={styles.badgeAlert}>
              <AlertTriangle size={15} color="#D97706" />
            </View>
          </View>

          <View style={styles.rejectionTag}>
            <AppText style={styles.rejectionTagText}>ACTION REQUIRED</AppText>
          </View>

          <AppText style={styles.title}>Verification Incomplete</AppText>
          <AppText style={styles.subtitle}>
            Your vendor documents could not be verified automatically. Please fix the highlighted issues and re-upload.
          </AppText>
        </View>

        {/* REJECTION REASON CARD */}
        <View style={styles.issuesCard}>
          <View style={styles.issuesCardHeader}>
            <Info size={16} color="#DC2626" />
            <AppText style={styles.issuesCardTitle}>Issues Found (2)</AppText>
          </View>

          <View style={styles.issuesList}>
            {REJECTED_ISSUES.map((issue) => {
              const IconComp = issue.icon;
              return (
                <View key={issue.id} style={styles.issueItem}>
                  <View style={styles.issueIconBox}>
                    <IconComp size={18} color="#DC2626" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText style={styles.issueHeading}>{issue.title}</AppText>
                    <AppText style={styles.issueDesc}>{issue.desc}</AppText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* TIPS BOX */}
        <View style={styles.tipsBox}>
          <AppText style={styles.tipsTitle}>Tips for Quick Approval:</AppText>
          <AppText style={styles.tipPoint}>• Place ID card on a flat surface in natural daylight.</AppText>
          <AppText style={styles.tipPoint}>• Take selfie without cap, spectacles, or mask.</AppText>
          <AppText style={styles.tipPoint}>• Ensure all 4 corners of your ID are clearly visible.</AppText>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsBlock}>
          {/* RE-UPLOAD BUTTON */}
          <TouchableOpacity
            style={styles.reuploadBtn}
            onPress={handleReupload}
            activeOpacity={0.85}
          >
            <RotateCcw size={18} color="#0F172A" />
            <AppText style={styles.reuploadBtnText}>Re-upload Documents</AppText>
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
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  iconCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeAlert: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  rejectionTag: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
  },
  rejectionTagText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
    letterSpacing: 0.8,
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
    paddingHorizontal: 10,
  },
  issuesCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    padding: 16,
    marginBottom: 16,
  },
  issuesCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#FEE2E2',
    paddingBottom: 8,
    marginBottom: 10,
  },
  issuesCardTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
  issuesList: {
    gap: 12,
  },
  issueItem: {
    flexDirection: 'row',
    gap: 10,
  },
  issueIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  issueHeading: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#991B1B',
    marginBottom: 2,
  },
  issueDesc: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#7F1D1D',
    lineHeight: 16,
  },
  tipsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 6,
  },
  tipPoint: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#475569',
    lineHeight: 18,
  },
  actionsBlock: {
    gap: 10,
  },
  reuploadBtn: {
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
  reuploadBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
