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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  XCircle,
  Clock,
  Radio,
  ArrowRight,
  Car,
  Bike,
  MapPin,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_BOOKING_REJECTED
>;

type RouteProps = RouteProp<
  RootStackParamList,
  typeof Routes.VENDOR_BOOKING_REJECTED
>;

export const VendorBookingRejectedScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProps>();

  const reason = route.params?.reason || 'Request Timed Out';

  const handleReturnOnline = () => {
    navigation.navigate(Routes.VENDOR_DASHBOARD as any, { initialOnline: true });
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
        {/* HERO ICON */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <XCircle size={42} color="#64748B" />
            </View>
          </View>

          <View style={styles.tagBadge}>
            <AppText style={styles.tagText}>{reason.toUpperCase()}</AppText>
          </View>

          <AppText style={styles.title}>Booking Passed</AppText>
          <AppText style={styles.subtitle}>
            This wash request was reassigned to the next available partner in your area. You are still marked online.
          </AppText>
        </View>

        {/* RECENT PASS SUMMARY */}
        <View style={styles.card}>
          <AppText style={styles.cardHeading}>Request Details</AppText>
          <View style={styles.row}>
            <AppText style={styles.rowLabel}>Customer</AppText>
            <AppText style={styles.rowVal}>Aakash Mishra (Scheme 54)</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.rowLabel}>Vehicle</AppText>
            <AppText style={styles.rowVal}>Honda Activa 6G</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.rowLabel}>Outcome</AppText>
            <AppText style={[styles.rowVal, { color: '#DC2626' }]}>{reason}</AppText>
          </View>
        </View>

        {/* OTHER NEARBY REQUESTS AVAILABLE */}
        <View style={styles.otherSection}>
          <AppText style={styles.otherSectionTitle}>Available Open Requests</AppText>

          <View style={styles.otherCard}>
            <View style={styles.otherIconBox}>
              <Car size={20} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.otherTitle}>Maruti Baleno • Exterior Wash</AppText>
              <AppText style={styles.otherSub}>Palasia (~2.4 km) • ₹399</AppText>
            </View>
            <TouchableOpacity
              style={styles.grabBtn}
              onPress={() => navigation.navigate(Routes.VENDOR_NEW_REQUEST as never)}
              activeOpacity={0.8}
            >
              <AppText style={styles.grabBtnText}>View</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* RETURN TO ONLINE MODE CTA */}
        <TouchableOpacity
          style={styles.returnOnlineBtn}
          onPress={handleReturnOnline}
          activeOpacity={0.85}
        >
          <Radio size={18} color="#0F172A" />
          <AppText style={styles.returnOnlineBtnText}>
            Return to Partner Dashboard
          </AppText>
          <ArrowRight size={18} color="#0F172A" />
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
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
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
    marginBottom: 12,
  },
  iconCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    letterSpacing: 0.5,
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
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  cardHeading: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 6,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  rowLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  rowVal: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  otherSection: {
    marginBottom: 24,
  },
  otherSectionTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  otherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  otherIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  otherSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  grabBtn: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  grabBtnText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  returnOnlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  returnOnlineBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
