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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  Power,
  AlertTriangle,
  Lock,
  Car,
  CheckCircle2,
  Circle,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_OFFLINE_CONFIRM
>;

type RouteProps = RouteProp<
  RootStackParamList,
  typeof Routes.VENDOR_OFFLINE_CONFIRM
>;

const OFFLINE_REASONS = [
  { id: '1', label: 'Shift Finished / Completed Target' },
  { id: '2', label: 'Taking Lunch or Rest Break' },
  { id: '3', label: 'Low on Water Tank / Wash Chemicals' },
  { id: '4', label: 'Vehicle / Equipment Maintenance' },
  { id: '5', label: 'Personal Emergency' },
];

export const VendorOfflineConfirmScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProps>();

  const hasActiveBooking = route.params?.hasActiveBooking ?? true;
  const [selectedReason, setSelectedReason] = useState('1');

  const handleConfirmOffline = () => {
    if (hasActiveBooking) {
      Alert.alert(
        'Active Booking Locked',
        'You cannot go offline while an active wash booking is assigned. Please complete the wash or contact Partner Support to transfer the booking.',
        [
          { text: 'Contact Support', onPress: () => {} },
          { text: 'Go to Current Job', onPress: () => navigation.goBack() },
        ]
      );
      return;
    }

    // Navigate back to Dashboard with initialOnline: false
    navigation.navigate(Routes.VENDOR_DASHBOARD as any, { initialOnline: false });
  };

  const handleStayOnline = () => {
    navigation.goBack();
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
          <AppText style={styles.badgeText}>GO OFFLINE</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO ICON */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Power size={38} color="#64748B" />
            </View>
          </View>

          <AppText style={styles.title}>Going Offline?</AppText>
          <AppText style={styles.subtitle}>
            You will stop receiving new customer wash alerts and your location will be hidden from customer search.
          </AppText>
        </View>

        {/* ACTIVE BOOKING WARNING BLOCK */}
        {hasActiveBooking && (
          <View style={styles.activeBookingAlertCard}>
            <View style={styles.alertHeaderRow}>
              <Lock size={16} color="#DC2626" />
              <AppText style={styles.alertTitle}>Active Booking in Progress</AppText>
            </View>

            <View style={styles.bookingDetailsRow}>
              <Car size={20} color="#0F172A" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <AppText style={styles.bookingVehicle}>Hyundai Creta • MP09 CB 4421</AppText>
                <AppText style={styles.bookingCustomer}>Customer: Vikram Malhotra (Scheme 54)</AppText>
              </View>
              <View style={styles.lockedPill}>
                <AppText style={styles.lockedPillText}>IN PROGRESS</AppText>
              </View>
            </View>

            <AppText style={styles.alertWarningText}>
              Platform rules require you to complete or transfer this active job before switching offline.
            </AppText>
          </View>
        )}

        {/* SELECT REASON LIST */}
        <View style={styles.reasonsSection}>
          <AppText style={styles.sectionHeading}>Reason for Going Offline</AppText>
          <View style={styles.reasonsList}>
            {OFFLINE_REASONS.map((r) => {
              const isSelected = selectedReason === r.id;
              return (
                <TouchableOpacity
                  key={r.id}
                  style={[
                    styles.reasonCard,
                    isSelected && styles.reasonCardSelected,
                  ]}
                  onPress={() => setSelectedReason(r.id)}
                  activeOpacity={0.88}
                >
                  <AppText
                    style={[
                      styles.reasonText,
                      isSelected && styles.reasonTextSelected,
                    ]}
                  >
                    {r.label}
                  </AppText>
                  {isSelected ? (
                    <CheckCircle2 size={18} color="#FFC80A" />
                  ) : (
                    <Circle size={18} color="#CBD5E1" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionsBlock}>
          {/* PRIMARY: STAY ONLINE */}
          <TouchableOpacity
            style={styles.stayOnlineButton}
            onPress={handleStayOnline}
            activeOpacity={0.85}
          >
            <AppText style={styles.stayOnlineButtonText}>Stay Online</AppText>
            <ArrowRight size={20} color="#0F172A" />
          </TouchableOpacity>

          {/* SECONDARY: CONFIRM OFFLINE */}
          <TouchableOpacity
            style={[
              styles.confirmOfflineButton,
              hasActiveBooking && styles.confirmOfflineDisabled,
            ]}
            onPress={handleConfirmOffline}
            activeOpacity={0.8}
          >
            <Power size={18} color={hasActiveBooking ? '#94A3B8' : '#DC2626'} />
            <AppText
              style={[
                styles.confirmOfflineButtonText,
                hasActiveBooking && { color: '#94A3B8' },
              ]}
            >
              {hasActiveBooking ? 'Cannot Go Offline (Booking Active)' : 'Confirm & Go Offline'}
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
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#64748B',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
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
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  iconCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
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
  activeBookingAlertCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    marginBottom: 18,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
  bookingDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  bookingVehicle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  bookingCustomer: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 1,
  },
  lockedPill: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  lockedPillText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
  alertWarningText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#991B1B',
    lineHeight: 16,
  },
  reasonsSection: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  reasonsList: {
    gap: 8,
  },
  reasonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  reasonCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
  },
  reasonText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
  },
  reasonTextSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  actionsBlock: {
    gap: 10,
  },
  stayOnlineButton: {
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
  stayOnlineButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  confirmOfflineButton: {
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
  confirmOfflineDisabled: {
    opacity: 0.6,
  },
  confirmOfflineButtonText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
  },
});
