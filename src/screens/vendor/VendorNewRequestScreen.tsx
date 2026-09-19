import React, { useState, useEffect } from 'react';
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
  Bike,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  Info,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_NEW_REQUEST
>;

export const VendorNewRequestScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [countdown, setCountdown] = useState<number>(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigation.navigate(Routes.VENDOR_BOOKING_REJECTED as any, {
            reason: 'Request Timed Out',
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigation]);

  const handleAccept = () => {
    navigation.navigate(Routes.VENDOR_BOOKING_ACCEPTED as any, {
      bookingId: 'WASH-JOB-9842',
    });
  };

  const handleReject = () => {
    navigation.navigate(Routes.VENDOR_BOOKING_REJECTED as any, {
      reason: 'Declined by Vendor',
    });
  };

  const handleViewDetails = () => {
    navigation.navigate(Routes.VENDOR_REQUEST_DETAILS as any, {
      bookingId: 'WASH-JOB-9842',
    });
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
        {/* COUNTDOWN TIMER BADGE */}
        <View style={styles.timerHeader}>
          <View style={styles.timerCircle}>
            <AppText style={styles.timerText}>{countdown}s</AppText>
          </View>
          <View style={styles.pulseTag}>
            <View style={styles.pulseDot} />
            <AppText style={styles.pulseTagText}>NEW INCOMING WASH REQUEST</AppText>
          </View>
        </View>

        {/* EARNINGS HERO */}
        <View style={styles.earningHeroCard}>
          <AppText style={styles.earningTag}>ESTIMATED EARNING</AppText>
          <AppText style={styles.earningAmount}>₹249</AppText>
          <AppText style={styles.netPayoutSub}>Net Payout • Direct Bank Transfer</AppText>
        </View>

        {/* REQUEST DETAILS CARD */}
        <View style={styles.requestCard}>
          {/* CUSTOMER & VEHICLE */}
          <View style={styles.topRow}>
            <View style={styles.vehicleIconCircle}>
              <Bike size={24} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <AppText style={styles.customerName}>Aakash Mishra</AppText>
                <View style={styles.userRatingPill}>
                  <Star size={10} color="#FFC80A" fill="#FFC80A" />
                  <AppText style={styles.userRatingText}>4.9</AppText>
                </View>
              </View>
              <AppText style={styles.vehicleName}>
                Honda Activa 6G • <AppText style={styles.plateNumber}>MP09 XX 9821</AppText>
              </AppText>
            </View>
          </View>

          <View style={styles.divider} />

          {/* SERVICE & LOCATION STATS */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <AppText style={styles.detailLabel}>Package</AppText>
              <AppText style={styles.detailVal}>Foam Bike Wash</AppText>
            </View>
            <View style={styles.detailItem}>
              <AppText style={styles.detailLabel}>Distance</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} color="#D97706" />
                <AppText style={styles.detailVal}>1.8 km away</AppText>
              </View>
            </View>
            <View style={styles.detailItem}>
              <AppText style={styles.detailLabel}>Est. Duration</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Clock size={12} color="#64748B" />
                <AppText style={styles.detailVal}>25 Mins</AppText>
              </View>
            </View>
            <View style={styles.detailItem}>
              <AppText style={styles.detailLabel}>Location</AppText>
              <AppText style={styles.detailVal}>Scheme 54, Indore</AppText>
            </View>
          </View>

          {/* VIEW FULL DETAILS LINK */}
          <TouchableOpacity
            style={styles.viewDetailsRow}
            onPress={handleViewDetails}
            activeOpacity={0.8}
          >
            <Info size={14} color="#D97706" />
            <AppText style={styles.viewDetailsText}>View Full Customer Instructions & Add-ons</AppText>
            <ArrowRight size={14} color="#D97706" />
          </TouchableOpacity>
        </View>

        {/* ACTION BUTTONS (ACCEPT / REJECT) */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={handleReject}
            activeOpacity={0.8}
          >
            <XCircle size={18} color="#EF4444" />
            <AppText style={styles.rejectBtnText}>Decline</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={handleAccept}
            activeOpacity={0.85}
          >
            <CheckCircle2 size={18} color="#0F172A" />
            <AppText style={styles.acceptBtnText}>Accept Booking ({countdown}s)</AppText>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  timerHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FEF3C7',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  pulseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D97706',
  },
  pulseTagText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    letterSpacing: 0.8,
  },
  earningHeroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  earningTag: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  earningAmount: {
    fontSize: 34,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFC80A',
    marginVertical: 4,
  },
  netPayoutSub: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#CBD5E1',
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FFC80A',
    marginBottom: 20,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  userRatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  userRatingText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  vehicleName: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#475569',
    marginTop: 2,
  },
  plateNumber: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    width: (width - 80) / 2,
  },
  detailLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  detailVal: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 2,
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    padding: 10,
    borderRadius: 10,
    marginTop: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  viewDetailsText: {
    flex: 1,
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#D97706',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    paddingVertical: 15,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    gap: 6,
  },
  rejectBtnText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#EF4444',
  },
  acceptBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 6,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
