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
  Bike,
  Clock,
  Compass,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_NAVIGATE_CUSTOMER
>;

export const VendorNavigateCustomerScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleStartTravel = () => {
    // Navigate to Screen V029: On The Way
    navigation.navigate(Routes.VENDOR_ON_THE_WAY as any, {
      bookingId: 'WASH-JOB-9842',
    });
  };

  const handleCall = () => {
    Alert.alert('Calling Customer', 'Connecting to Aakash Mishra (+91 98260 XXXXX)...');
  };

  const handleChat = () => {
    Alert.alert('Customer Chat', 'Opening conversation with Aakash Mishra...');
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
          <Compass size={13} color="#D97706" />
          <AppText style={styles.badgeText}>TURN-BY-TURN GPS</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* MAP PREVIEW CARD */}
        <View style={styles.mapCard}>
          <View style={styles.mapCanvas}>
            {/* GRID & ROADS SIMULATION */}
            <View style={styles.gridLine1} />
            <View style={styles.gridLine2} />
            <View style={styles.roadLineH} />
            <View style={styles.roadLineV} />

            {/* ROUTE LINE */}
            <View style={styles.routePath} />

            {/* PARTNER CURRENT PIN */}
            <View style={styles.partnerPin}>
              <Navigation size={16} color="#0F172A" />
            </View>

            {/* CUSTOMER DESTINATION PIN */}
            <View style={styles.customerPin}>
              <MapPin size={20} color="#EF4444" fill="#EF4444" />
              <View style={styles.destLabel}>
                <AppText style={styles.destLabelText}>Scheme 54 (1.8 km)</AppText>
              </View>
            </View>
          </View>

          {/* MAP BOTTOM STATS */}
          <View style={styles.mapFooter}>
            <View style={styles.etaBox}>
              <Clock size={16} color="#059669" />
              <View style={{ marginLeft: 6 }}>
                <AppText style={styles.etaVal}>6 Mins</AppText>
                <AppText style={styles.etaSub}>Fastest route</AppText>
              </View>
            </View>
            <View style={styles.distDivider} />
            <View style={styles.distBox}>
              <Navigation size={16} color="#0F172A" />
              <View style={{ marginLeft: 6 }}>
                <AppText style={styles.distVal}>1.8 km</AppText>
                <AppText style={styles.distSub}>Via AB Road</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* CUSTOMER & VEHICLE CARD */}
        <View style={styles.infoCard}>
          <View style={styles.customerRow}>
            <View style={styles.bikeIconCircle}>
              <Bike size={22} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.customerName}>Aakash Mishra</AppText>
              <AppText style={styles.vehicleModel}>Honda Activa 6G • MP09 XX 9821</AppText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.addressRow}>
            <MapPin size={16} color="#D97706" style={{ marginTop: 2, marginRight: 6 }} />
            <AppText style={styles.addressText}>
              House #42, Lane 3, Near Ganesh Temple, Scheme 54, Indore
            </AppText>
          </View>

          {/* CONTACT BUTTONS */}
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

        {/* START NAVIGATION BUTTON */}
        <TouchableOpacity
          style={styles.startNavButton}
          onPress={handleStartTravel}
          activeOpacity={0.85}
        >
          <Navigation size={20} color="#0F172A" />
          <AppText style={styles.startNavButtonText}>Start Navigation (On the Way)</AppText>
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
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
    paddingTop: 10,
    paddingBottom: 40,
  },
  mapCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapCanvas: {
    height: 200,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLine1: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  gridLine2: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  roadLineH: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
  },
  roadLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 100,
    width: 16,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#CBD5E1',
  },
  routePath: {
    position: 'absolute',
    top: 96,
    left: 60,
    width: 180,
    height: 5,
    backgroundColor: '#FFC80A',
    borderRadius: 3,
  },
  partnerPin: {
    position: 'absolute',
    top: 80,
    left: 45,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  customerPin: {
    position: 'absolute',
    top: 75,
    right: 50,
    alignItems: 'center',
  },
  destLabel: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
  },
  destLabelText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  mapFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },
  etaBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etaVal: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  etaSub: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  distDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  distBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distVal: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  distSub: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bikeIconCircle: {
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
  vehicleModel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  addressText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
    lineHeight: 17,
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
  startNavButton: {
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
  startNavButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
