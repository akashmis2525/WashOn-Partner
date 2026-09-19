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
  Bike,
  MapPin,
  Clock,
  IndianRupee,
  CheckCircle2,
  XCircle,
  FileText,
  Plus,
  Shield,
  Star,
  MessageSquare,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_REQUEST_DETAILS
>;

export const VendorRequestDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

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
          <AppText style={styles.badgeText}>JOB BREAKDOWN</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.title}>Booking Request Details</AppText>
        <AppText style={styles.subtitle}>
          Review vehicle condition, customer address, and requested add-ons before accepting.
        </AppText>

        {/* CUSTOMER & VEHICLE CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.vehicleIconCircle}>
              <Bike size={22} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.cardTitle}>Honda Activa 6G</AppText>
              <AppText style={styles.cardSub}>Plate: MP09 XX 9821 • Matte Black</AppText>
            </View>
            <View style={styles.userBadge}>
              <Star size={10} color="#FFC80A" fill="#FFC80A" />
              <AppText style={styles.userBadgeText}>Aakash (4.9 ★)</AppText>
            </View>
          </View>
        </View>

        {/* LOCATION & LANDMARK */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <MapPin size={16} color="#D97706" />
            <AppText style={styles.sectionTitle}>Customer Doorstep Location</AppText>
          </View>
          <AppText style={styles.addressText}>
            House #42, Lane 3, Near Ganesh Temple, Scheme 54, Vijay Nagar, Indore
          </AppText>
          <View style={styles.distanceChip}>
            <AppText style={styles.distanceChipText}>1.8 km away (~6 mins travel time)</AppText>
          </View>
        </View>

        {/* PACKAGE & ADDONS */}
        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <FileText size={16} color="#0F172A" />
            <AppText style={styles.sectionTitle}>Selected Wash Services</AppText>
          </View>

          <View style={styles.serviceRow}>
            <AppText style={styles.serviceName}>Foam Bike Wash & Polish</AppText>
            <AppText style={styles.servicePrice}>₹249</AppText>
          </View>
          <View style={styles.serviceRow}>
            <AppText style={styles.serviceName}>Add-on: Chain Cleaning & High-Temp Lube</AppText>
            <AppText style={styles.servicePrice}>+ ₹49</AppText>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.totalRow}>
            <AppText style={styles.totalLabel}>Your Net Earning</AppText>
            <AppText style={styles.totalAmount}>₹298</AppText>
          </View>
        </View>

        {/* CUSTOMER SPECIAL INSTRUCTIONS */}
        <View style={styles.instructionBox}>
          <MessageSquare size={16} color="#D97706" style={{ marginTop: 2, marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <AppText style={styles.instructionTitle}>Customer Note:</AppText>
            <AppText style={styles.instructionText}>
              "Water tap is available outside parking porch. Please call once arrived at gate."
            </AppText>
          </View>
        </View>

        {/* ACTIONS ROW */}
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
            <AppText style={styles.acceptBtnText}>Accept (₹298)</AppText>
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
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
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
    paddingTop: 12,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  userBadgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  addressText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
    lineHeight: 17,
  },
  distanceChip: {
    backgroundColor: '#F8FAFC',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  distanceChipText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#D97706',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  serviceName: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#475569',
  },
  servicePrice: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFDF5',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 12,
    borderRadius: 14,
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
    marginBottom: 2,
  },
  instructionText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#B45309',
    lineHeight: 16,
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
