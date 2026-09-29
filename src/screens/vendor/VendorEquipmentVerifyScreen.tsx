import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Droplets,
  Wrench,
  Award,
  Zap,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_EQUIPMENT_VERIFY
>;

const VERIFIED_ITEMS = [
  { id: '1', name: 'High-Pressure Washer (140 Bar)', status: 'Approved', note: 'Certified for high-speed foaming & rinse' },
  { id: '2', name: 'Snow Foam Cannon Lance', status: 'Approved', note: 'Standard high-density foam certified' },
  { id: '3', name: 'Wet & Dry Vacuum Cleaner (1400W)', status: 'Approved', note: 'Interior cabin detailing approved' },
  { id: '4', name: 'pH Neutral Shampoos & Microfibers', status: 'Approved', note: 'Scratchless doorstep kit compliant' },
];

export const VendorEquipmentVerifyScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const handleContinue = () => {
    // Navigate to Pricing Setup (or Services Offered)
    navigation.navigate(Routes.VENDOR_PRICING_SETUP as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* CELEBRATION HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <Wrench size={42} color="#0F172A" />
            </View>
            <View style={styles.badgeCheck}>
              <CheckCircle2 size={20} color="#059669" />
            </View>
          </View>

          <View style={styles.verifiedTag}>
            <Sparkles size={13} color="#0F172A" />
            <Text style={styles.verifiedTagText}>EQUIPMENT AUDIT PASSED</Text>
          </View>

          <Text style={styles.heroTitle}>Equipment Approved!</Text>
          <Text style={styles.heroSub}>
            Your machine and washing kit meet WashOn 5-star quality standards.
          </Text>
        </View>

        {/* VERIFIED AUDIT LIST */}
        <Text style={styles.sectionHeading}>APPROVED HARDWARE</Text>
        <View style={styles.auditList}>
          {VERIFIED_ITEMS.map((item) => (
            <View key={item.id} style={styles.auditCard}>
              <View style={styles.checkIconCircle}>
                <CheckCircle2 size={16} color="#059669" />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.itemNote}>{item.note}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* QUALITY GUARANTEE BADGE */}
        <View style={styles.guaranteeCard}>
          <View style={styles.guaranteeHeader}>
            <Award size={18} color="#0F172A" />
            <Text style={styles.guaranteeTitle}>WashOn Certified Partner Kit</Text>
          </View>
          <Text style={styles.guaranteeSub}>
            You are now eligible to receive high-value Premium Foam Wash & Deep Detailing bookings.
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
          <Text style={styles.submitButtonText}>CONTINUE TO PRICING SETUP</Text>
          <ArrowRight size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 28,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconCircleOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  iconCircleInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCheck: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
    marginBottom: 10,
  },
  verifiedTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 10,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  auditList: {
    gap: 10,
  },
  auditCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  checkIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  itemNote: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
  },
  guaranteeCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: 16,
  },
  guaranteeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guaranteeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  guaranteeSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#92400E',
    marginTop: 4,
    lineHeight: 16,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    height: 50,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});
