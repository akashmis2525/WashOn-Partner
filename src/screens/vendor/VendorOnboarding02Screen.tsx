import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Zap,
  MapPin,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Car,
  Bike,
  Bell,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorOnboarding2NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ONBOARDING_2
>;

export const VendorOnboarding02Screen: React.FC = () => {
  const navigation = useNavigation<VendorOnboarding2NavProp>();

  const handleNext = () => {
    // Navigate to next onboarding screen (V004 Vendor Onboarding 3)
    navigation.navigate(Routes.VENDOR_ONBOARDING_3 as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSkip = () => {
    navigation.navigate(Routes.VENDOR_LOGIN as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      {/* TOP HEADER */}
      <View style={styles.header}>
        {/* LOGO */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={{ width: 120, height: 38 }}
            resizeMode="contain"
          />
          <View style={{ backgroundColor: '#FFC80A', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 }}>
            <AppText style={{ fontSize: 10, fontWeight: '800', color: '#0F172A' }}>PARTNER</AppText>
          </View>
        </View>

        {/* SKIP BUTTON */}
        <TouchableOpacity
          onPress={handleSkip}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <AppText style={styles.skipText}>Skip</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* MAIN HEADINGS */}
        <View style={styles.headingSection}>
          <AppText style={styles.headingBlack}>Get Nearby</AppText>
          <AppText style={styles.headingYellow}>Wash Bookings</AppText>
          <AppText style={styles.description}>
            Receive real-time booking requests from customers near you and start earning.
          </AppText>
        </View>

        {/* HERO MAP & LIVE REQUEST CONTAINER */}
        <View style={styles.heroContainer}>
          {/* MAP GRID BACKGROUND */}
          <View style={styles.mapGrid}>
            <View style={styles.mapBlock1} />
            <View style={styles.mapBlock2} />
            <View style={styles.mapBlock3} />
            <View style={styles.mapRoadH1} />
            <View style={styles.mapRoadH2} />
            <View style={styles.mapRoadV1} />
            <View style={styles.mapRoadV2} />
          </View>

          {/* MAP PIN 1 - CAR WASH (TOP LEFT) */}
          <View style={[styles.mapPinCard, styles.pinTopLeft]}>
            <View style={styles.pinIconCircle}>
              <Car size={13} color="#FFFFFF" />
            </View>
            <View style={{ marginLeft: 6 }}>
              <AppText style={styles.pinTitle}>Car Wash</AppText>
              <AppText style={styles.pinSub}>1.2 km away</AppText>
              <AppText style={styles.pinPrice}>₹299</AppText>
            </View>
          </View>

          {/* MAP PIN 2 - SUV WASH (TOP RIGHT) */}
          <View style={[styles.mapPinCard, styles.pinTopRight]}>
            <View style={styles.pinIconCircle}>
              <Car size={13} color="#FFFFFF" />
            </View>
            <View style={{ marginLeft: 6 }}>
              <AppText style={styles.pinTitle}>SUV Wash</AppText>
              <AppText style={styles.pinSub}>2.4 km away</AppText>
              <AppText style={styles.pinPrice}>₹399</AppText>
            </View>
          </View>

          {/* MAP PIN 3 - BIKE WASH (CENTER) */}
          <View style={[styles.mapPinCard, styles.pinCenter]}>
            <View style={styles.pinIconCircle}>
              <Bike size={13} color="#FFFFFF" />
            </View>
            <View style={{ marginLeft: 6 }}>
              <AppText style={styles.pinTitle}>Bike Wash</AppText>
              <AppText style={styles.pinSub}>0.8 km away</AppText>
              <AppText style={styles.pinPrice}>₹149</AppText>
            </View>
          </View>

          {/* CENTER RADAR & WASHERMAN CURRENT LOCATION PIN */}
          <View style={styles.radarContainer}>
            <View style={styles.radarRingOuter} />
            <View style={styles.radarRingInner} />
            <View style={styles.userLocationMarker}>
              <View style={styles.markerCapIcon} />
            </View>
            <View style={styles.youAreHereBadge}>
              <AppText style={styles.youAreHereText}>You are here</AppText>
            </View>
          </View>

          {/* HANDWRITTEN SLOGAN */}
          <View style={styles.handwrittenBadge}>
            <AppText style={styles.handwrittenText}>More</AppText>
            <AppText style={styles.handwrittenText}>Bookings</AppText>
            <AppText style={styles.handwrittenHighlight}>More Earnings!</AppText>
          </View>

          {/* WASHERMAN CUTOUT ON LEFT */}
          <View style={styles.washermanCutoutContainer}>
            <Image
              source={require('../../../assets/vendor_onboarding_2_cutout.png')}
              style={styles.washermanCutoutImg}
              resizeMode="contain"
            />
          </View>

          {/* LIVE BOOKING REQUEST POPUP CARD (BOTTOM RIGHT) */}
          <View style={styles.requestPopupCard}>
            <View style={styles.requestPopupHeader}>
              <View style={styles.bellCircle}>
                <Bell size={12} color="#0F172A" />
              </View>
              <AppText style={styles.requestPopupTitle}>New Booking Request</AppText>
              <AppText style={styles.requestPopupTime}>Just now</AppText>
            </View>

            <View style={styles.requestServiceRow}>
              <View style={styles.requestServiceLeft}>
                <Car size={16} color="#0F172A" style={{ marginRight: 6 }} />
                <View>
                  <AppText style={styles.requestServiceName}>Car Wash</AppText>
                  <AppText style={styles.requestServiceDistance}>
                    1.2 km away • Indore (Vijay Nagar)
                  </AppText>
                </View>
              </View>
              <AppText style={styles.requestServicePrice}>₹299</AppText>
            </View>

            <View style={styles.requestActionsRow}>
              <TouchableOpacity style={styles.rejectBtn} activeOpacity={0.7}>
                <AppText style={styles.rejectBtnText}>Reject</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptBtn} activeOpacity={0.85}>
                <AppText style={styles.acceptBtnText}>Accept</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 3 BENEFIT BADGES ROW */}
        <View style={styles.benefitsRow}>
          {/* 1. REAL-TIME REQUESTS */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <Zap size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Real-Time Requests</AppText>
          </View>

          {/* 2. NEARBY CUSTOMERS */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <MapPin size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Nearby Customers</AppText>
          </View>

          {/* 3. MORE EARNINGS */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <BarChart3 size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>More Earnings</AppText>
          </View>
        </View>

        {/* PAGINATION DOTS */}
        <View style={styles.paginationRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>

        {/* DUAL BUTTON ROW (BACK & NEXT) */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={18} color="#0F172A" style={{ marginRight: 6 }} />
            <AppText style={styles.backButtonText}>Back</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <AppText style={styles.nextButtonText}>Next</AppText>
            <ArrowRight size={20} color="#0F172A" style={{ marginLeft: 6 }} />
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
    paddingBottom: 4,
    zIndex: 10,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carMiniIcon: {
    width: 28,
    height: 14,
    backgroundColor: '#0F172A',
    borderRadius: 5,
    position: 'relative',
  },
  carMiniRoof: {
    position: 'absolute',
    top: -6,
    left: 5,
    width: 16,
    height: 8,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  carMiniDrop: {
    position: 'absolute',
    bottom: -2,
    right: 2,
    width: 8,
    height: 10,
    backgroundColor: '#FFC80A',
    borderRadius: 4,
  },
  logoTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  logoTitleYellow: {
    color: '#FFC80A',
  },
  logoSubtitle: {
    fontSize: 7.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 1.5,
    marginTop: -1,
  },
  skipText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  headingSection: {
    marginTop: 4,
    marginBottom: 8,
  },
  headingBlack: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    lineHeight: 32,
  },
  headingYellow: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFC80A',
    lineHeight: 32,
  },
  description: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#475569',
    marginTop: 6,
    lineHeight: 18,
  },
  heroContainer: {
    width: '100%',
    height: height * 0.44,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mapGrid: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#E2E8F0',
  },
  mapBlock1: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 100,
    height: 80,
    backgroundColor: '#DCFCE7',
    borderRadius: 8,
  },
  mapBlock2: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 110,
    height: 90,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  mapBlock3: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 140,
    height: 100,
    backgroundColor: '#FEF9C3',
    borderRadius: 8,
    opacity: 0.6,
  },
  mapRoadH1: {
    position: 'absolute',
    top: 95,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#FFFFFF',
  },
  mapRoadH2: {
    position: 'absolute',
    top: 195,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#FFFFFF',
  },
  mapRoadV1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 120,
    width: 14,
    backgroundColor: '#FFFFFF',
  },
  mapRoadV2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 130,
    width: 14,
    backgroundColor: '#FFFFFF',
  },
  mapPinCard: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#FFC80A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 5,
  },
  pinTopLeft: {
    top: 18,
    left: 36,
  },
  pinTopRight: {
    top: 18,
    right: 20,
  },
  pinCenter: {
    top: 90,
    left: 135,
  },
  pinIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinTitle: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  pinSub: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  pinPrice: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  radarContainer: {
    position: 'absolute',
    top: 130,
    left: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  radarRingOuter: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.25)',
  },
  radarRingInner: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  userLocationMarker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFC80A',
  },
  markerCapIcon: {
    width: 8,
    height: 4,
    backgroundColor: '#FFC80A',
    borderRadius: 2,
  },
  youAreHereBadge: {
    backgroundColor: '#FEF08A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
  },
  youAreHereText: {
    fontSize: 7.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  handwrittenBadge: {
    position: 'absolute',
    top: 110,
    right: 18,
    alignItems: 'flex-start',
    zIndex: 4,
  },
  handwrittenText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E293B',
    transform: [{ rotate: '-6deg' }],
  },
  handwrittenHighlight: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    transform: [{ rotate: '-6deg' }],
  },
  washermanCutoutContainer: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    width: width * 0.44,
    height: height * 0.32,
    zIndex: 6,
  },
  washermanCutoutImg: {
    width: '100%',
    height: '100%',
  },
  requestPopupCard: {
    position: 'absolute',
    bottom: 12,
    right: 10,
    left: width * 0.38,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#FFC80A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 10,
  },
  requestPopupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bellCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  requestPopupTitle: {
    flex: 1,
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  requestPopupTime: {
    fontSize: 8.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
  },
  requestServiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 6,
    marginBottom: 8,
  },
  requestServiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  requestServiceName: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  requestServiceDistance: {
    fontSize: 8,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  requestServicePrice: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginLeft: 6,
  },
  requestActionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtnText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#475569',
  },
  acceptBtn: {
    flex: 1.3,
    backgroundColor: '#FFC80A',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  acceptBtnText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 6,
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  benefitIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  benefitTitle: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 2,
  },
  benefitSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 12.5,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#FFC80A',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 14,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
