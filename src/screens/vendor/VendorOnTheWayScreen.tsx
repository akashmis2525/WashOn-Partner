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
  ArrowLeft,
  Navigation,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ON_THE_WAY
>;

export const VendorOnTheWayScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleMarkArrived = () => {
    // Navigate to Screen V030: Vendor Arrived
    navigation.navigate(Routes.VENDOR_ARRIVED as any, {
      bookingId: 'WASH-JOB-9842',
    });
  };

  const handleUnableToFind = () => {
    // Navigate to Screen V031: Unable to Find Customer
    navigation.navigate(Routes.VENDOR_UNABLE_TO_FIND as any, {
      bookingId: 'WASH-JOB-9842',
    });
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

        <View style={styles.statusPill}>
          <View style={styles.pulseDot} />
          <AppText style={styles.statusPillText}>LIVE TRANSIT</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO STATUS */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Navigation size={40} color="#0F172A" />
            </View>
          </View>

          <AppText style={styles.title}>You are on the way!</AppText>
          <AppText style={styles.subtitle}>
            Aakash has been notified that you are en route. Live GPS location is shared with the customer.
          </AppText>
        </View>

        {/* ETA & TRAFFIC STATS CARD */}
        <View style={styles.etaCard}>
          <View style={styles.etaHeader}>
            <View>
              <AppText style={styles.etaLabel}>ESTIMATED ARRIVAL</AppText>
              <AppText style={styles.etaTime}>4 Minutes</AppText>
            </View>
            <View style={styles.distanceBadge}>
              <AppText style={styles.distanceText}>1.2 km left</AppText>
            </View>
          </View>

          <View style={styles.trafficRow}>
            <View style={styles.trafficDot} />
            <AppText style={styles.trafficText}>Normal Traffic on AB Road • Fast Route</AppText>
          </View>
        </View>

        {/* DESTINATION SUMMARY */}
        <View style={styles.destCard}>
          <View style={styles.destHeaderRow}>
            <MapPin size={18} color="#D97706" />
            <AppText style={styles.destHeaderTitle}>Customer Doorstep Location</AppText>
          </View>

          <AppText style={styles.destAddress}>
            House #42, Lane 3, Near Ganesh Temple, Scheme 54, Indore
          </AppText>

          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => Alert.alert('Calling Customer', '+91 98260 XXXXX')}
              activeOpacity={0.8}
            >
              <Phone size={15} color="#0F172A" />
              <AppText style={styles.contactBtnText}>Call Aakash</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() => Alert.alert('Customer Chat', 'Opening chat...')}
              activeOpacity={0.8}
            >
              <MessageSquare size={15} color="#0F172A" />
              <AppText style={styles.contactBtnText}>Chat</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* UNABLE TO FIND LINK */}
        <TouchableOpacity
          style={styles.helpLinkBox}
          onPress={handleUnableToFind}
          activeOpacity={0.8}
        >
          <HelpCircle size={15} color="#64748B" />
          <AppText style={styles.helpLinkText}>
            Unable to find location or gate closed? Report issue
          </AppText>
        </TouchableOpacity>

        {/* MARK ARRIVED BUTTON */}
        <TouchableOpacity
          style={styles.arrivedButton}
          onPress={handleMarkArrived}
          activeOpacity={0.85}
        >
          <CheckCircle2 size={20} color="#0F172A" />
          <AppText style={styles.arrivedButtonText}>I Have Arrived at Location</AppText>
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
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  statusPillText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#2563EB',
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
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
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
    paddingHorizontal: 10,
  },
  etaCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  etaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  etaLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  etaTime: {
    fontSize: 26,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFC80A',
    marginTop: 2,
  },
  distanceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  distanceText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  trafficRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  trafficDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  trafficText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#CBD5E1',
  },
  destCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  destHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  destHeaderTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  destAddress: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
    lineHeight: 17,
    marginBottom: 14,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  contactBtnText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  helpLinkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginBottom: 16,
  },
  helpLinkText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    textDecorationLine: 'underline',
  },
  arrivedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  arrivedButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
