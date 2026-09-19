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
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wrench,
  Sparkles,
  Edit3,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_EQUIPMENT_VERIFY
>;

const VERIFIED_ITEMS = [
  { id: '1', name: 'High-Pressure Washer (140 Bar)', status: 'Verified', note: 'Checked via photo verification' },
  { id: '2', name: 'Foam Cannon & Brass Lance', status: 'Verified', note: 'Standard high-density foam certified' },
  { id: '3', name: 'Wet & Dry Vacuum Cleaner (1400W)', status: 'Verified', note: 'Interior detailing approved' },
  { id: '4', name: 'pH Neutral Shampoos & Microfibers', status: 'Verified', note: 'Scratchless wash kit compliant' },
];

export const VendorEquipmentVerifyScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleContinue = () => {
    // Navigate to Screen V017: Services Offered
    navigation.navigate(Routes.VENDOR_SERVICES_OFFERED as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonCircle}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.stepBadge}>
          <AppText style={styles.stepBadgeText}>SERVICE SETUP • 4/8</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <View style={styles.titleSection}>
          <View style={styles.badgeRow}>
            <View style={styles.miniIconBadge}>
              <ShieldCheck size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>HARDWARE AUDIT</AppText>
          </View>
          <AppText style={styles.title}>Equipment Verification</AppText>
          <AppText style={styles.subtitle}>
            Your registered equipment has been verified.
          </AppText>
        </View>

        {/* AUDIT SUMMARY BADGE CARD */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryCardHeader}>
            <View style={styles.certBadge}>
              <Sparkles size={16} color="#0F172A" />
              <AppText style={styles.certBadgeText}>WASHON CERTIFIED KIT</AppText>
            </View>
            <View style={styles.allDoneBadge}>
              <CheckCircle2 size={14} color="#059669" />
              <AppText style={styles.allDoneText}>4/4 Verified</AppText>
            </View>
          </View>

          <AppText style={styles.summarySub}>
            Your equipment meets the WashOn Quality Standard for Doorstep Exterior & Interior Car/Bike Care.
          </AppText>
        </View>

        {/* VERIFIED EQUIPMENT LIST */}
        <View style={styles.listSection}>
          <View style={styles.sectionHeaderRow}>
            <AppText style={styles.sectionTitle}>Uploaded Tools & Machines</AppText>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AppText style={styles.editLink}>Update Tools</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.listWrap}>
            {VERIFIED_ITEMS.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.checkCircleDone}>
                  <CheckCircle2 size={16} color="#059669" />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={styles.itemName}>{item.name}</AppText>
                  <AppText style={styles.itemNote}>{item.note}</AppText>
                </View>
                <View style={styles.verifiedPill}>
                  <AppText style={styles.verifiedPillText}>APPROVED</AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* OPTIONAL ADVISORY */}
        <View style={styles.alertCard}>
          <AlertCircle size={16} color="#D97706" style={{ marginTop: 2, marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <AppText style={styles.alertTitle}>Optional Add-on Equipment</AppText>
            <AppText style={styles.alertDesc}>
              You haven't listed a portable water tank. When accepting bookings, ensure customer provides a garden tap or power socket if required.
            </AppText>
          </View>
        </View>

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <AppText style={styles.continueButtonText}>
            Continue to Services Offered
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  stepBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stepBadgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    gap: 6,
  },
  miniIconBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  summaryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  certBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC80A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  certBadgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  allDoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  allDoneText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#10B981',
  },
  summarySub: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    lineHeight: 17,
  },
  listSection: {
    marginBottom: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  editLink: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  listWrap: {
    gap: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  checkCircleDone: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  itemNote: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  verifiedPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedPillText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    letterSpacing: 0.5,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 12,
    borderRadius: 14,
    marginBottom: 22,
  },
  alertTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
    marginBottom: 2,
  },
  alertDesc: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#B45309',
    lineHeight: 15,
  },
  continueButton: {
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
  continueButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
