import React, { useState } from 'react';
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
  ArrowLeft,
  ArrowRight,
  Radio,
  Power,
  Navigation,
  Clock,
  Droplets,
  PauseCircle,
  CheckCircle2,
  Circle,
  Sparkles,
  Zap,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_AVAILABILITY_SETUP
>;

type AvailabilityStatus =
  | 'online'
  | 'offline'
  | 'busy'
  | 'on_the_way'
  | 'in_progress'
  | 'temp_unavailable';

interface StatusOption {
  id: AvailabilityStatus;
  label: string;
  subtitle: string;
  color: string;
  bgColor: string;
  icon: any;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    id: 'online',
    label: 'Online (Ready for Bookings)',
    subtitle: 'Visible on customer map. Ready to receive instant doorstep orders.',
    color: '#059669',
    bgColor: '#ECFDF5',
    icon: Radio,
  },
  {
    id: 'on_the_way',
    label: 'On the Way (En Route)',
    subtitle: 'Currently traveling to customer wash location. GPS tracking active.',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    icon: Navigation,
  },
  {
    id: 'in_progress',
    label: 'Service in Progress',
    subtitle: 'Actively performing wash or detailing. Auto-paused from new instant alerts.',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    icon: Droplets,
  },
  {
    id: 'busy',
    label: 'Busy (Finishing / Cleaning Up)',
    subtitle: 'Finishing vehicle drying or packing equipment.',
    color: '#D97706',
    bgColor: '#FEF3C7',
    icon: Clock,
  },
  {
    id: 'temp_unavailable',
    label: 'Temporarily Unavailable',
    subtitle: 'Taking a 15-30 min break. Will resume shortly.',
    color: '#CA8A04',
    bgColor: '#FEF9C3',
    icon: PauseCircle,
  },
  {
    id: 'offline',
    label: 'Offline (Not Taking Orders)',
    subtitle: 'Closed for the day or resting. No new bookings will be sent.',
    color: '#64748B',
    bgColor: '#F1F5F9',
    icon: Power,
  },
];

export const VendorAvailabilitySetupScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [currentStatus, setCurrentStatus] = useState<AvailabilityStatus>('online');

  const handleFinishSetup = () => {
    // Finish entire Section 3 setup -> Go to Vendor Dashboard
    navigation.navigate(Routes.VENDOR_DASHBOARD as never);
  };

  const activeOption = STATUS_OPTIONS.find((s) => s.id === currentStatus);

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
          <AppText style={styles.stepBadgeText}>SERVICE SETUP • 8/8</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE SECTION */}
        <View style={styles.titleSection}>
          <View style={styles.badgeRow}>
            <View style={styles.miniIconBadge}>
              <Zap size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>REAL-TIME DISPATCH</AppText>
          </View>
          <AppText style={styles.title}>Live Availability Setup</AppText>
          <AppText style={styles.subtitle}>
            Control your live dispatch status. Customers only see and book partners who are active.
          </AppText>
        </View>

        {/* ACTIVE STATUS PREVIEW HERO */}
        {activeOption && (
          <View
            style={[
              styles.currentStatusHero,
              { backgroundColor: activeOption.bgColor, borderColor: activeOption.color },
            ]}
          >
            <View style={styles.heroRow}>
              <View
                style={[
                  styles.statusPulseDot,
                  { backgroundColor: activeOption.color },
                ]}
              />
              <AppText
                style={[styles.heroStatusText, { color: activeOption.color }]}
              >
                {activeOption.label}
              </AppText>
            </View>
            <AppText style={styles.heroStatusSub}>
              {activeOption.subtitle}
            </AppText>
          </View>
        )}

        {/* STATUS OPTIONS LIST */}
        <View style={styles.statusList}>
          {STATUS_OPTIONS.map((item) => {
            const isSelected = currentStatus === item.id;
            const IconComp = item.icon;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.statusCard,
                  isSelected && styles.statusCardSelected,
                ]}
                onPress={() => setCurrentStatus(item.id)}
                activeOpacity={0.88}
              >
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: item.bgColor },
                    isSelected && { borderColor: item.color, borderWidth: 1 },
                  ]}
                >
                  <IconComp size={20} color={item.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <AppText
                    style={[
                      styles.statusTitle,
                      isSelected && { color: '#0F172A', fontFamily: Typography.fontFamily.bold },
                    ]}
                  >
                    {item.label}
                  </AppText>
                  <AppText style={styles.statusDesc}>{item.subtitle}</AppText>
                </View>

                <View style={styles.radioContainer}>
                  {isSelected ? (
                    <CheckCircle2 size={22} color="#FFC80A" />
                  ) : (
                    <Circle size={22} color="#CBD5E1" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FINISH BUTTON */}
        <TouchableOpacity
          style={styles.finishButton}
          onPress={handleFinishSetup}
          activeOpacity={0.85}
        >
          <AppText style={styles.finishButtonText}>
            Complete Setup & Enter Dashboard
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
  currentStatusHero: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    marginBottom: 18,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statusPulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  heroStatusText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
  },
  heroStatusSub: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#475569',
    lineHeight: 16,
  },
  statusList: {
    gap: 10,
    marginBottom: 24,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  statusCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#334155',
    marginBottom: 2,
  },
  statusDesc: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 15,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishButton: {
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
  finishButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
