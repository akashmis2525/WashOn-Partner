import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Bell,
  Radio,
  Power,
  TrendingUp,
  Car,
  MapPin,
  Phone,
  Navigation,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  Sparkles,
  Wallet,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Award,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { VendorBottomNav } from '../../components/common/VendorBottomNav';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_DASHBOARD
>;

type RouteProps = RouteProp<
  RootStackParamList,
  typeof Routes.VENDOR_DASHBOARD
>;

export const VendorDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProps>();

  const [isOnline, setIsOnline] = useState<boolean>(
    route.params?.initialOnline !== undefined ? route.params.initialOnline : true
  );

  const handleToggleOnline = (value: boolean) => {
    if (value) {
      // Go to Online Confirmation Screen V022
      navigation.navigate(Routes.VENDOR_ONLINE_CONFIRM as any);
    } else {
      // Go to Offline Confirmation Screen V023 (passes hasActiveBooking true)
      navigation.navigate(Routes.VENDOR_OFFLINE_CONFIRM as any, {
        hasActiveBooking: true,
      });
    }
  };

  const handleStartCurrentJob = () => {
    // Navigate to Screen V028 Navigation Map
    navigation.navigate(Routes.VENDOR_NAVIGATE_CUSTOMER as any, {
      jobId: 'WASH-JOB-8941',
    });
  };

  const handleCallCustomer = () => {
    Alert.alert('Calling Customer', 'Connecting to Vikram Malhotra (+91 98260 XXXXX)...');
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
        {/* TOP HEADER: GREETING & PROFILE */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
              }}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 10 }}>
              <AppText style={styles.greetingText}>Good morning,</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <AppText style={styles.partnerName}>Ramesh Sharma</AppText>
                <View style={styles.ratingBadge}>
                  <Star size={10} color="#FFC80A" fill="#FFC80A" />
                  <AppText style={styles.ratingText}>4.9</AppText>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.notifButton}
            onPress={() => Alert.alert('Notifications', 'No new unread partner alerts.')}
            activeOpacity={0.8}
          >
            <Bell size={20} color="#0F172A" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* ONLINE / OFFLINE TOGGLE BANNER */}
        <View
          style={[
            styles.statusBanner,
            isOnline ? styles.statusBannerOnline : styles.statusBannerOffline,
          ]}
        >
          <View style={styles.statusLeft}>
            <View
              style={[
                styles.statusDot,
                isOnline ? styles.statusDotOnline : styles.statusDotOffline,
              ]}
            />
            <View>
              <AppText
                style={[
                  styles.statusTitle,
                  isOnline ? styles.statusTitleOnline : styles.statusTitleOffline,
                ]}
              >
                {isOnline ? 'You Are Online' : 'You Are Offline'}
              </AppText>
              <AppText style={styles.statusSub}>
                {isOnline
                  ? 'Online • Ready for incoming jobs'
                  : 'Offline • Tap switch to go online'}
              </AppText>
            </View>
          </View>

          <Switch
            value={isOnline}
            onValueChange={handleToggleOnline}
            trackColor={{ false: '#CBD5E1', true: '#FFC80A' }}
            thumbColor={isOnline ? '#0F172A' : '#64748B'}
          />
        </View>

        {/* TODAY'S EARNINGS HERO CARD */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsCardHeader}>
            <View>
              <AppText style={styles.earningsTag}>TODAY'S EARNINGS</AppText>
              <AppText style={styles.earningsAmount}>₹1,850</AppText>
            </View>
            <View style={styles.trendPill}>
              <TrendingUp size={14} color="#059669" />
              <AppText style={styles.trendText}>+18% vs yesterday</AppText>
            </View>
          </View>

          <View style={styles.earningsDivider} />

          {/* 3 STAT CHIPS */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <AppText style={styles.statNumber}>6</AppText>
              <AppText style={styles.statLabel}>Today's Bookings</AppText>
            </View>
            <View style={styles.statDividerVertical} />
            <View style={styles.statItem}>
              <AppText style={styles.statNumber}>5</AppText>
              <AppText style={styles.statLabel}>Completed</AppText>
            </View>
            <View style={styles.statDividerVertical} />
            <View style={styles.statItem}>
              <AppText style={[styles.statNumber, { color: '#D97706' }]}>1</AppText>
              <AppText style={styles.statLabel}>In Progress</AppText>
            </View>
          </View>
        </View>

        {/* CURRENT ACTIVE BOOKING CARD */}
        <View style={styles.currentJobSection}>
          <View style={styles.sectionHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Car size={18} color="#0F172A" />
              <AppText style={styles.sectionTitle}>Current Booking</AppText>
            </View>
            <View style={styles.activePill}>
              <View style={styles.livePulse} />
              <AppText style={styles.activePillText}>ASSIGNED</AppText>
            </View>
          </View>

          <View style={styles.jobCard}>
            {/* VEHICLE & CUSTOMER INFO */}
            <View style={styles.jobTopRow}>
              <View style={styles.carIconBox}>
                <Car size={22} color="#0F172A" />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <AppText style={styles.vehicleTitle}>
                  Hyundai Creta <AppText style={styles.plateTag}>(MP09 CB 4421)</AppText>
                </AppText>
                <AppText style={styles.customerName}>
                  Vikram Malhotra • <AppText style={styles.serviceNameHighlight}>Full Car Foam Wash</AppText>
                </AppText>
              </View>
              <AppText style={styles.jobPrice}>₹599</AppText>
            </View>

            {/* LOCATION ROW */}
            <View style={styles.locationRow}>
              <MapPin size={16} color="#D97706" style={{ marginTop: 2, marginRight: 6 }} />
              <View style={{ flex: 1 }}>
                <AppText style={styles.locationAddress}>
                  Flat 402, Royal Palms, Scheme 54, Vijay Nagar
                </AppText>
                <AppText style={styles.distanceText}>1.2 km away (~4 mins drive)</AppText>
              </View>
            </View>

            {/* ACTION BUTTONS */}
            <View style={styles.jobActionsRow}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={handleCallCustomer}
                activeOpacity={0.8}
              >
                <Phone size={16} color="#0F172A" />
                <AppText style={styles.callButtonText}>Call Customer</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navigateButton}
                onPress={handleStartCurrentJob}
                activeOpacity={0.85}
              >
                <Navigation size={16} color="#0F172A" />
                <AppText style={styles.navigateButtonText}>Navigate & Start</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* QUICK ACTION TILES */}
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickTile}
            onPress={() => navigation.navigate(Routes.VENDOR_SERVICE_AREA as never)}
            activeOpacity={0.85}
          >
            <View style={styles.quickIconCircle}>
              <MapPin size={20} color="#0F172A" />
            </View>
            <AppText style={styles.quickTileTitle}>Service Area</AppText>
            <AppText style={styles.quickTileSub}>10 km radius</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickTile}
            onPress={() => navigation.navigate(Routes.VENDOR_PRICING_SETUP as never)}
            activeOpacity={0.85}
          >
            <View style={styles.quickIconCircle}>
              <Wallet size={20} color="#0F172A" />
            </View>
            <AppText style={styles.quickTileTitle}>My Pricing</AppText>
            <AppText style={styles.quickTileSub}>5 Packages</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickTile}
            onPress={() => navigation.navigate(Routes.VENDOR_WORKING_HOURS as never)}
            activeOpacity={0.85}
          >
            <View style={styles.quickIconCircle}>
              <Clock size={20} color="#0F172A" />
            </View>
            <AppText style={styles.quickTileTitle}>Working Slots</AppText>
            <AppText style={styles.quickTileSub}>Mon - Sun</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickTile}
            onPress={() => navigation.navigate(Routes.VENDOR_AVAILABILITY_SETUP as never)}
            activeOpacity={0.85}
          >
            <View style={styles.quickIconCircle}>
              <Radio size={20} color="#0F172A" />
            </View>
            <AppText style={styles.quickTileTitle}>Live Status</AppText>
            <AppText style={styles.quickTileSub}>Live Radar</AppText>
          </TouchableOpacity>
        </View>

        {/* PERFORMANCE SUMMARY */}
        <View style={styles.perfCard}>
          <AppText style={styles.perfTitle}>Partner Performance Score</AppText>
          <View style={styles.perfRow}>
            <View style={styles.perfCol}>
              <AppText style={styles.perfVal}>96%</AppText>
              <AppText style={styles.perfLabel}>Acceptance Rate</AppText>
            </View>
            <View style={styles.perfDivider} />
            <View style={styles.perfCol}>
              <AppText style={styles.perfVal}>98%</AppText>
              <AppText style={styles.perfLabel}>On-Time Arrival</AppText>
            </View>
            <View style={styles.perfDivider} />
            <View style={styles.perfCol}>
              <AppText style={styles.perfVal}>4.9 ★</AppText>
              <AppText style={styles.perfLabel}>Rating (142)</AppText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER TAB BAR */}
      <VendorBottomNav activeTab="home" />
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
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#FFC80A',
  },
  greetingText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  partnerName: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 8,
    gap: 3,
  },
  ratingText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1.5,
  },
  statusBannerOnline: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  statusBannerOffline: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusDotOnline: {
    backgroundColor: '#10B981',
  },
  statusDotOffline: {
    backgroundColor: '#94A3B8',
  },
  statusTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
  },
  statusTitleOnline: {
    color: '#065F46',
  },
  statusTitleOffline: {
    color: '#475569',
  },
  statusSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  earningsCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  earningsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  earningsTag: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  earningsAmount: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
    marginTop: 4,
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#10B981',
  },
  earningsDivider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#F8FAFC',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
  },
  statDividerVertical: {
    width: 1,
    height: 24,
    backgroundColor: '#1E293B',
  },
  currentJobSection: {
    marginBottom: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  activePillText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    letterSpacing: 0.5,
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FFC80A',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  jobTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
    marginBottom: 12,
  },
  carIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  plateTag: {
    color: '#64748B',
    fontFamily: Typography.fontFamily.medium,
  },
  customerName: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  serviceNameHighlight: {
    color: '#D97706',
    fontFamily: Typography.fontFamily.semiBold,
  },
  jobPrice: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  locationAddress: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  distanceText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  jobActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    gap: 6,
  },
  callButtonText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  navigateButton: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  navigateButtonText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  quickTile: {
    width: (width - 50) / 2,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickTileTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  quickTileSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  perfCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  perfTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 12,
  },
  perfRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  perfCol: {
    alignItems: 'center',
  },
  perfVal: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  perfLabel: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  perfDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E2E8F0',
  },
});
