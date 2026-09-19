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
  MapPin,
  ShieldCheck,
  Bike,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Camera,
  AlertCircle,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ARRIVED
>;

const PRE_SERVICE_CHECKLIST = [
  'Vehicle parked in shaded / safe wash spot',
  'Engine switched off & keys with customer',
  'Water tap & electricity socket accessible',
  'Customer informed & present at vehicle',
];

export const VendorArrivedScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleStartInspection = () => {
    // Navigate to Section 7: Screen V032 Start Service Verification
    navigation.navigate(Routes.VENDOR_START_VERIFICATION as any, {
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
        {/* ARRIVED HERO */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <MapPin size={42} color="#0F172A" />
            </View>
            <View style={styles.badgeDone}>
              <CheckCircle2 size={16} color="#059669" />
            </View>
          </View>

          <View style={styles.statusTag}>
            <AppText style={styles.statusTagText}>CUSTOMER NOTIFIED</AppText>
          </View>

          <AppText style={styles.title}>You Have Arrived!</AppText>
          <AppText style={styles.subtitle}>
            A notification and SMS alert has been sent to Aakash that you are at the doorstep.
          </AppText>
        </View>

        {/* CUSTOMER & VEHICLE CARD */}
        <View style={styles.card}>
          <View style={styles.customerHeader}>
            <View style={styles.bikeIconBox}>
              <Bike size={22} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.customerName}>Aakash Mishra</AppText>
              <AppText style={styles.vehicleName}>Honda Activa 6G • MP09 XX 9821</AppText>
            </View>
            <TouchableOpacity
              style={styles.callIconBtn}
              onPress={() => Alert.alert('Call', '+91 98260 XXXXX')}
            >
              <Phone size={16} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <AppText style={styles.addressLine}>
            📍 House #42, Lane 3, Near Ganesh Temple, Scheme 54, Indore
          </AppText>
        </View>

        {/* SAFETY & PRE-WASH CHECKLIST */}
        <View style={styles.checklistCard}>
          <View style={styles.checklistHeader}>
            <ShieldCheck size={18} color="#059669" />
            <AppText style={styles.checklistTitle}>Pre-Wash Safety Checklist</AppText>
          </View>

          <View style={styles.checklistItems}>
            {PRE_SERVICE_CHECKLIST.map((item, index) => (
              <View key={index} style={styles.checkRow}>
                <CheckCircle2 size={16} color="#059669" />
                <AppText style={styles.checkText}>{item}</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* START INSPECTION BUTTON */}
        <TouchableOpacity
          style={styles.startInspectionButton}
          onPress={handleStartInspection}
          activeOpacity={0.85}
        >
          <Camera size={20} color="#0F172A" />
          <AppText style={styles.startInspectionButtonText}>
            Start Vehicle Inspection & Photos
          </AppText>
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
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
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
  badgeDone: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1.5,
    borderColor: '#FEF3C7',
  },
  statusTag: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 8,
  },
  statusTagText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
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
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bikeIconBox: {
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
  vehicleName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
  },
  callIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  addressLine: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
    lineHeight: 17,
  },
  checklistCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    marginBottom: 22,
  },
  checklistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  checklistTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#166534',
  },
  checklistItems: {
    gap: 8,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#14532D',
  },
  startInspectionButton: {
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
  startInspectionButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
