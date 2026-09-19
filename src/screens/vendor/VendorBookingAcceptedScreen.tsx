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
  CheckCircle2,
  Phone,
  MessageSquare,
  Navigation,
  MapPin,
  Bike,
  Clock,
  IndianRupee,
  ArrowRight,
  Shield,
  Star,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_BOOKING_ACCEPTED
>;

export const VendorBookingAcceptedScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleStartTravel = () => {
    // Navigate to Section 6: Screen V028 Navigate to Customer
    navigation.navigate(Routes.VENDOR_NAVIGATE_CUSTOMER as any, {
      bookingId: 'WASH-JOB-9842',
    });
  };

  const handleCall = () => {
    Alert.alert('Calling Customer', 'Connecting to Aakash Mishra (+91 98260 XXXXX)...');
  };

  const handleChat = () => {
    Alert.alert('In-App Chat', 'Opening live chat with Aakash Mishra...');
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
        {/* ACCEPTED HERO */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <CheckCircle2 size={42} color="#059669" />
            </View>
          </View>

          <View style={styles.bookingIdBadge}>
            <AppText style={styles.bookingIdText}>BOOKING #WASH-9842</AppText>
          </View>

          <AppText style={styles.title}>Booking Confirmed!</AppText>
          <AppText style={styles.subtitle}>
            You have accepted the doorstep wash request. Please head to the customer's location.
          </AppText>
        </View>

        {/* CUSTOMER & VEHICLE CARD */}
        <View style={styles.card}>
          <View style={styles.customerRow}>
            <View style={styles.avatarCircle}>
              <Bike size={22} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.customerName}>Aakash Mishra</AppText>
              <AppText style={styles.vehicleInfo}>Honda Activa 6G (MP09 XX 9821)</AppText>
            </View>
            <View style={styles.pricePill}>
              <AppText style={styles.priceText}>₹298</AppText>
            </View>
          </View>

          <View style={styles.divider} />

          {/* CONTACT ACTIONS */}
          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={handleCall}
              activeOpacity={0.8}
            >
              <Phone size={16} color="#0F172A" />
              <AppText style={styles.contactBtnText}>Call Customer</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactBtn}
              onPress={handleChat}
              activeOpacity={0.8}
            >
              <MessageSquare size={16} color="#0F172A" />
              <AppText style={styles.contactBtnText}>Chat</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* LOCATION & ETA CARD */}
        <View style={styles.card}>
          <View style={styles.locationHeaderRow}>
            <MapPin size={16} color="#D97706" />
            <AppText style={styles.locationHeaderTitle}>Customer Doorstep Location</AppText>
          </View>

          <AppText style={styles.addressText}>
            House #42, Lane 3, Near Ganesh Temple, Scheme 54, Vijay Nagar, Indore
          </AppText>

          <View style={styles.etaRow}>
            <View style={styles.etaItem}>
              <Clock size={14} color="#64748B" />
              <AppText style={styles.etaText}>Estimated Travel: ~6 Mins</AppText>
            </View>
            <View style={styles.etaItem}>
              <Navigation size={14} color="#D97706" />
              <AppText style={styles.etaText}>Distance: 1.8 km</AppText>
            </View>
          </View>
        </View>

        {/* START TRAVEL / NAVIGATE BUTTON */}
        <TouchableOpacity
          style={styles.startTravelButton}
          onPress={handleStartTravel}
          activeOpacity={0.85}
        >
          <Navigation size={20} color="#0F172A" />
          <AppText style={styles.startTravelButtonText}>Start Navigation (Turn-by-Turn)</AppText>
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
  scrollView: {
    flex: 1,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
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
    backgroundColor: '#ECFDF5',
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
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingIdBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 8,
  },
  bookingIdText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    letterSpacing: 0.5,
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerName: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  vehicleInfo: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
  },
  pricePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
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
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  locationHeaderTitle: {
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
  etaRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  etaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  etaText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  startTravelButton: {
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
    marginTop: 8,
  },
  startTravelButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
