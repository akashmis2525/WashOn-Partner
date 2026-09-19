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
  Radio,
  MapPin,
  Compass,
  CheckCircle2,
  Droplets,
  Sparkles,
  Zap,
  ShieldCheck,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ONLINE_CONFIRM
>;

export const VendorOnlineConfirmScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleConfirmOnline = () => {
    // Navigate back to Dashboard with isOnline = true
    navigation.navigate(Routes.VENDOR_DASHBOARD as any, { initialOnline: true });
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

        <View style={styles.badge}>
          <AppText style={styles.badgeText}>DISPATCH READY</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO RADAR ICON */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Radio size={42} color="#0F172A" />
            </View>
            <View style={styles.badgeLive}>
              <View style={styles.greenDot} />
              <AppText style={styles.liveText}>LIVE</AppText>
            </View>
          </View>

          <AppText style={styles.title}>Ready to Go Online?</AppText>
          <AppText style={styles.subtitle}>
            You will become immediately visible to nearby vehicle owners seeking doorstep wash & detailing.
          </AppText>
        </View>

        {/* DETAILS CARD */}
        <View style={styles.infoCard}>
          {/* LOCATION */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircle}>
              <MapPin size={18} color="#0F172A" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.infoLabel}>Current Base Location</AppText>
              <AppText style={styles.infoValue}>Vijay Nagar, Indore (GPS High Accuracy)</AppText>
            </View>
            <CheckCircle2 size={18} color="#059669" />
          </View>

          <View style={styles.infoDivider} />

          {/* RADIUS */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircle}>
              <Compass size={18} color="#0F172A" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.infoLabel}>Service Travel Radius</AppText>
              <AppText style={styles.infoValue}>10 km • 8 Servicing Zones Covered</AppText>
            </View>
            <CheckCircle2 size={18} color="#059669" />
          </View>

          <View style={styles.infoDivider} />

          {/* ACTIVE SERVICES */}
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircle}>
              <Droplets size={18} color="#0F172A" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.infoLabel}>Active Wash Packages</AppText>
              <AppText style={styles.infoValue}>5 Packages Enabled (Bike & Car)</AppText>
            </View>
            <CheckCircle2 size={18} color="#059669" />
          </View>
        </View>

        {/* GUIDELINE REMINDER */}
        <View style={styles.reminderBox}>
          <ShieldCheck size={18} color="#059669" style={{ marginTop: 2, marginRight: 8 }} />
          <AppText style={styles.reminderText}>
            Keep your phone volume up. When a nearby customer requests a wash, you will have 45 seconds to accept the job.
          </AppText>
        </View>

        {/* GO ONLINE CTA BUTTON */}
        <TouchableOpacity
          style={styles.goOnlineButton}
          onPress={handleConfirmOnline}
          activeOpacity={0.85}
        >
          <Zap size={20} color="#0F172A" />
          <AppText style={styles.goOnlineButtonText}>Go Online Now</AppText>
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
  badge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
    letterSpacing: 0.5,
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
  badgeLive: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
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
  infoCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 2,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  reminderBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  reminderText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#166534',
    lineHeight: 16,
  },
  goOnlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  goOnlineButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
