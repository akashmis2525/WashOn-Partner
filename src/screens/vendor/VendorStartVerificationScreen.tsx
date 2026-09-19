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
  ArrowRight,
  ShieldCheck,
  Bike,
  CheckCircle2,
  FileText,
  Camera,
  Droplets,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_START_VERIFICATION
>;

export const VendorStartVerificationScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleStartPhotos = () => {
    // Navigate to Screen V033: Before Wash Photos
    navigation.navigate(Routes.VENDOR_BEFORE_PHOTOS as any, {
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

        <View style={styles.badge}>
          <AppText style={styles.badgeText}>SERVICE VERIFICATION</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <View style={styles.titleSection}>
          <View style={styles.bookingPill}>
            <AppText style={styles.bookingPillText}>BOOKING #WASH-9842</AppText>
          </View>
          <AppText style={styles.title}>Start Service Verification</AppText>
          <AppText style={styles.subtitle}>
            Confirm vehicle details and take 360° pre-wash photos to start the doorstep wash.
          </AppText>
        </View>

        {/* CUSTOMER & VEHICLE CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Bike size={22} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.vehicleName}>Honda Activa 6G</AppText>
              <AppText style={styles.plateText}>Plate: MP09 XX 9821 • Customer: Aakash</AppText>
            </View>
            <View style={styles.verifiedBadge}>
              <CheckCircle2 size={14} color="#059669" />
              <AppText style={styles.verifiedText}>Matched</AppText>
            </View>
          </View>
        </View>

        {/* SERVICE SUMMARY */}
        <View style={styles.card}>
          <View style={styles.cardHeaderSmall}>
            <Droplets size={16} color="#D97706" />
            <AppText style={styles.cardTitle}>Selected Package & Add-ons</AppText>
          </View>

          <View style={styles.itemRow}>
            <AppText style={styles.itemName}>• Foam Bike Wash & Shine Polish</AppText>
            <AppText style={styles.itemPrice}>₹249</AppText>
          </View>
          <View style={styles.itemRow}>
            <AppText style={styles.itemName}>• Chain Cleaning & Synthetic Lube</AppText>
            <AppText style={styles.itemPrice}>₹49</AppText>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <AppText style={styles.totalLabel}>Total Payout Value</AppText>
            <AppText style={styles.totalPrice}>₹298</AppText>
          </View>
        </View>

        {/* PHOTO MANDATE NOTE */}
        <View style={styles.noticeCard}>
          <ShieldCheck size={18} color="#059669" style={{ marginTop: 2, marginRight: 8 }} />
          <AppText style={styles.noticeText}>
            WashOn Policy: Taking 4-angle before photos protects you from pre-existing scratch and dent claims.
          </AppText>
        </View>

        {/* START PHOTOS BUTTON */}
        <TouchableOpacity
          style={styles.startPhotosBtn}
          onPress={handleStartPhotos}
          activeOpacity={0.85}
        >
          <Camera size={20} color="#0F172A" />
          <AppText style={styles.startPhotosBtnText}>Take Before Wash Photos</AppText>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 16,
  },
  bookingPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bookingPillText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    letterSpacing: 0.5,
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleName: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  plateText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  verifiedText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  cardHeaderSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  itemName: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
  },
  itemPrice: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
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
  totalPrice: {
    fontSize: 17,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 22,
  },
  noticeText: {
    flex: 1,
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#166534',
    lineHeight: 16,
  },
  startPhotosBtn: {
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
  startPhotosBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
