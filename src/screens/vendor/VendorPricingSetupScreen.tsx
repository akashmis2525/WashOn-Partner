import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  IndianRupee,
  Lock,
  Clock,
  Percent,
  CheckCircle2,
  Info,
  Shield,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_PRICING_SETUP
>;

interface PriceConfig {
  id: string;
  name: string;
  category: 'bike' | 'car';
  basePrice: string;
  minAllowed: number;
  maxAllowed: number;
  duration: string;
}

const DEFAULT_PRICES: PriceConfig[] = [
  { id: '1', name: 'Basic Bike Wash', category: 'bike', basePrice: '149', minAllowed: 99, maxAllowed: 249, duration: '20 min' },
  { id: '2', name: 'Foam Bike Wash', category: 'bike', basePrice: '199', minAllowed: 149, maxAllowed: 299, duration: '30 min' },
  { id: '4', name: 'Exterior Car Wash', category: 'car', basePrice: '399', minAllowed: 299, maxAllowed: 599, duration: '35 min' },
  { id: '5', name: 'Interior Deep Cleaning', category: 'car', basePrice: '449', minAllowed: 349, maxAllowed: 699, duration: '45 min' },
  { id: '6', name: 'Full Car Wash (Combo)', category: 'car', basePrice: '599', minAllowed: 499, maxAllowed: 899, duration: '60 min' },
];

export const VendorPricingSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [prices, setPrices] = useState<PriceConfig[]>(DEFAULT_PRICES);
  const [minBookingAmount, setMinBookingAmount] = useState('199');
  const [tyrePolishAddon, setTyrePolishAddon] = useState('49');
  const [waxCoatingAddon, setWaxCoatingAddon] = useState('149');

  const handlePriceChange = (id: string, value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    setPrices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, basePrice: cleaned } : item))
    );
  };

  const handleSave = () => {
    // Validate bounds
    for (const item of prices) {
      const num = parseInt(item.basePrice, 10) || 0;
      if (num < item.minAllowed || num > item.maxAllowed) {
        Alert.alert(
          'Price Out of Range',
          `${item.name} price must be between ₹${item.minAllowed} and ₹${item.maxAllowed} as per WashOn city rate card.`
        );
        return;
      }
    }

    // Navigate to Screen V019: Working Hours
    navigation.navigate(Routes.VENDOR_WORKING_HOURS as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonCircle}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.stepBadge}>
            <AppText style={styles.stepBadgeText}>SERVICE SETUP • 6/8</AppText>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* TITLE SECTION */}
          <View style={styles.titleSection}>
            <View style={styles.badgeRow}>
              <View style={styles.miniIconBadge}>
                <IndianRupee size={13} color="#0F172A" />
              </View>
              <AppText style={styles.badgeLabel}>RATE CARD & EARNINGS</AppText>
            </View>
            <AppText style={styles.title}>Vendor Pricing Setup</AppText>
            <AppText style={styles.subtitle}>
              Customize your rates within platform price limits. Transparent payouts with no hidden deductions.
            </AppText>
          </View>

          {/* COMMISSION BANNER CARD */}
          <View style={styles.commissionCard}>
            <View style={styles.commissionHeader}>
              <Percent size={18} color="#0F172A" />
              <AppText style={styles.commissionTitle}>Platform Commission: 12%</AppText>
            </View>
            <AppText style={styles.commissionDesc}>
              You keep <AppText style={styles.commissionHighlight}>88% of every booking</AppText>. WashOn covers customer insurance, marketing, and GPS dispatch.
            </AppText>
          </View>

          {/* SERVICE BASE PRICING LIST */}
          <View style={styles.pricingSection}>
            <AppText style={styles.sectionHeading}>Package Base Rates</AppText>

            <View style={styles.priceList}>
              {prices.map((item) => {
                const numericPrice = parseInt(item.basePrice, 10) || 0;
                const netEarning = Math.round(numericPrice * 0.88);

                return (
                  <View key={item.id} style={styles.priceRowCard}>
                    <View style={{ flex: 1, marginRight: 12 }}>
                      <AppText style={styles.serviceName}>{item.name}</AppText>
                      <View style={styles.limitRow}>
                        <Clock size={11} color="#64748B" />
                        <AppText style={styles.limitText}>
                          {item.duration} • Allowed ₹{item.minAllowed} - ₹{item.maxAllowed}
                        </AppText>
                      </View>
                      <AppText style={styles.netEarningText}>
                        You Earn: <AppText style={styles.netAmount}>₹{netEarning}</AppText> / wash
                      </AppText>
                    </View>

                    {/* INPUT BOX */}
                    <View style={styles.priceInputWrap}>
                      <AppText style={styles.currencySymbol}>₹</AppText>
                      <TextInput
                        style={styles.priceInput}
                        value={item.basePrice}
                        onChangeText={(val) => handlePriceChange(item.id, val)}
                        keyboardType="number-pad"
                        maxLength={4}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          {/* ADD-ON PRICING */}
          <View style={styles.addonSection}>
            <AppText style={styles.sectionHeading}>Add-on Rates</AppText>

            <View style={styles.addonRow}>
              <View style={{ flex: 1 }}>
                <AppText style={styles.addonTitle}>Tyre Polish & Trim Shine</AppText>
                <AppText style={styles.addonSub}>Estimated time: 10 min</AppText>
              </View>
              <View style={styles.priceInputWrap}>
                <AppText style={styles.currencySymbol}>₹</AppText>
                <TextInput
                  style={styles.priceInput}
                  value={tyrePolishAddon}
                  onChangeText={setTyrePolishAddon}
                  keyboardType="number-pad"
                  maxLength={3}
                />
              </View>
            </View>

            <View style={styles.addonRow}>
              <View style={{ flex: 1 }}>
                <AppText style={styles.addonTitle}>Liquid Wax Hydrophobic Coating</AppText>
                <AppText style={styles.addonSub}>Estimated time: 20 min</AppText>
              </View>
              <View style={styles.priceInputWrap}>
                <AppText style={styles.currencySymbol}>₹</AppText>
                <TextInput
                  style={styles.priceInput}
                  value={waxCoatingAddon}
                  onChangeText={setWaxCoatingAddon}
                  keyboardType="number-pad"
                  maxLength={3}
                />
              </View>
            </View>
          </View>

          {/* MINIMUM BOOKING ORDER */}
          <View style={styles.minBookingBlock}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <AppText style={styles.minBookingTitle}>Minimum Booking Amount</AppText>
              <AppText style={styles.minBookingSub}>
                Orders below this amount will not be dispatched to you
              </AppText>
            </View>
            <View style={styles.priceInputWrap}>
              <AppText style={styles.currencySymbol}>₹</AppText>
              <TextInput
                style={styles.priceInput}
                value={minBookingAmount}
                onChangeText={setMinBookingAmount}
                keyboardType="number-pad"
                maxLength={3}
              />
            </View>
          </View>

          {/* POLICY NOTE */}
          <View style={styles.policyCard}>
            <Shield size={16} color="#059669" style={{ marginTop: 2, marginRight: 8 }} />
            <AppText style={styles.policyText}>
              Prices are locked per customer booking to protect trust. You can update your standard rates anytime between jobs.
            </AppText>
          </View>

          {/* SAVE BUTTON */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <AppText style={styles.saveButtonText}>Save Pricing & Set Hours</AppText>
            <ArrowRight size={20} color="#0F172A" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  stepBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stepBadgeText: {
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
  titleSection: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    gap: 6,
  },
  miniIconBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 18,
  },
  commissionCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  commissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  commissionTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  commissionDesc: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#78350F',
    lineHeight: 16,
  },
  commissionHighlight: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  pricingSection: {
    marginBottom: 18,
  },
  sectionHeading: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  priceList: {
    gap: 10,
  },
  priceRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  serviceName: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 2,
  },
  limitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  limitText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  netEarningText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#059669',
  },
  netAmount: {
    fontFamily: Typography.fontFamily.bold,
  },
  priceInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    paddingHorizontal: 8,
    height: 42,
    minWidth: 78,
  },
  currencySymbol: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#64748B',
    marginRight: 2,
  },
  priceInput: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    minWidth: 44,
  },
  addonSection: {
    marginBottom: 18,
  },
  addonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  addonTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  addonSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  minBookingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  minBookingTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  minBookingSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  policyText: {
    flex: 1,
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#166534',
    lineHeight: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
