import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Zap,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Car,
  Bike,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react-native';
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

      {/* TOP HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.brandRow}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={styles.logoImg}
            resizeMode="contain"
          />
          <View style={styles.partnerPill}>
            <Text style={styles.partnerPillText}>PARTNER</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* RAPIDO HIGH-IMPACT HERO HEADINGS */}
        <View style={styles.headingSection}>
          <View style={styles.tagBadge}>
            <Zap size={13} color="#0F172A" />
            <Text style={styles.tagBadgeText}>INSTANT 20S RADAR ALERTS</Text>
          </View>
          <Text style={styles.headingBlack}>
            Accept Bookings in <Text style={styles.headingYellow}>Real-Time</Text>
          </Text>
          <Text style={styles.description}>
            1-tap accept or decline jobs with transparent fare and customer distance.
          </Text>
        </View>

        {/* HERO RADAR SIMULATION */}
        <View style={styles.heroContainer}>
          <View style={styles.radarCard}>
            <View style={styles.radarHeader}>
              <View style={styles.pulseDot} />
              <Text style={styles.radarHeaderText}>NEW BOOKING ALERT (20S)</Text>
            </View>

            <View style={styles.customerBookingBox}>
              <View style={styles.bookingRowTop}>
                <View style={styles.custIcon}>
                  <Bike size={18} color="#0F172A" />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.customerName}>Rohit Verma</Text>
                  <Text style={styles.serviceDetail}>Foam Bike Wash • Honda CB Shine</Text>
                </View>
                <View style={styles.fareBadge}>
                  <Text style={styles.fareText}>₹249</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.bookingRowBottom}>
                <View style={styles.locItem}>
                  <MapPin size={13} color="#D97706" />
                  <Text style={styles.locText}>Scheme 54 (1.4 km)</Text>
                </View>
                <View style={styles.timeItem}>
                  <Clock size={13} color="#059669" />
                  <Text style={styles.timeText}>ETA 5 mins</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionPreviewRow}>
              <View style={styles.declineBtnPreview}>
                <Text style={styles.declineText}>Decline</Text>
              </View>
              <View style={styles.acceptBtnPreview}>
                <Text style={styles.acceptText}>Accept (18s)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 3 VALUE BULLETS */}
        <View style={styles.benefitsList}>
          <View style={styles.benefitRow}>
            <CheckCircle2 size={16} color="#059669" />
            <Text style={styles.benefitText}>
              <Text style={{ fontWeight: '800', color: '#0F172A' }}>Transparent Pricing:</Text> Know exactly what you earn before accepting.
            </Text>
          </View>
          <View style={styles.benefitRow}>
            <CheckCircle2 size={16} color="#059669" />
            <Text style={styles.benefitText}>
              <Text style={{ fontWeight: '800', color: '#0F172A' }}>In-App Navigation:</Text> Turn-by-turn GPS directly to the vehicle spot.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM PAGINATION & CTA */}
      <View style={styles.bottomContainer}>
        <View style={styles.paginationRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.ctaText}>NEXT</Text>
          <ArrowRight size={20} color="#0F172A" />
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
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImg: {
    width: 120,
    height: 38,
  },
  partnerPill: {
    backgroundColor: '#FFC80A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  partnerPillText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headingSection: {
    marginBottom: 12,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  headingBlack: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  headingYellow: {
    color: '#D97706',
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 6,
    lineHeight: 18,
  },
  heroContainer: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
    padding: 16,
    marginVertical: 10,
  },
  radarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FFC80A',
    elevation: 2,
  },
  radarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
  },
  radarHeaderText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#DC2626',
    letterSpacing: 0.5,
  },
  customerBookingBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bookingRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  custIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  serviceDetail: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  fareBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  fareText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  bookingRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  actionPreviewRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  declineBtnPreview: {
    flex: 1,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  acceptBtnPreview: {
    flex: 2,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#0F172A',
  },
  benefitsList: {
    gap: 8,
    marginTop: 8,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  benefitText: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  activeDot: {
    width: 22,
    backgroundColor: '#FFC80A',
  },
  ctaButton: {
    height: 52,
    backgroundColor: '#FFC80A',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});
