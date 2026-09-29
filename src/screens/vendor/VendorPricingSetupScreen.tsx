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
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  IndianRupee,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

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
  { id: '2', name: 'Foam Bike Wash', category: 'bike', basePrice: '249', minAllowed: 149, maxAllowed: 349, duration: '30 min' },
  { id: '3', name: 'Exterior Car Wash', category: 'car', basePrice: '399', minAllowed: 299, maxAllowed: 599, duration: '35 min' },
  { id: '4', name: 'Interior Deep Vacuum', category: 'car', basePrice: '449', minAllowed: 349, maxAllowed: 699, duration: '45 min' },
  { id: '5', name: 'Full Combo Car Wash', category: 'car', basePrice: '599', minAllowed: 499, maxAllowed: 899, duration: '60 min' },
];

export const VendorPricingSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [prices, setPrices] = useState<PriceConfig[]>(DEFAULT_PRICES);
  const [tyrePolishAddon, setTyrePolishAddon] = useState('49');
  const [waxCoatingAddon, setWaxCoatingAddon] = useState('149');

  const handlePriceChange = (id: string, value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    setPrices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, basePrice: cleaned } : item))
    );
  };

  const handleSave = () => {
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

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonCircle}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Pricing Setup</Text>
          <Text style={styles.headerSub}>Customize Rates within City Limits</Text>
        </View>

        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>STEP 5/8</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* BASE SERVICE RATES */}
          <Text style={styles.sectionHeading}>1. BASE SERVICE RATES</Text>
          <View style={styles.pricingList}>
            {prices.map((item) => (
              <View key={item.id} style={styles.priceCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <View style={styles.metaRow}>
                    <Clock size={12} color="#64748B" />
                    <Text style={styles.durationText}>{item.duration}</Text>
                    <Text style={styles.rangeText}>
                      (Limit: ₹{item.minAllowed} - ₹{item.maxAllowed})
                    </Text>
                  </View>
                </View>

                {/* Price Input Box */}
                <View style={styles.priceInputBox}>
                  <IndianRupee size={15} color="#0F172A" />
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="number-pad"
                    value={item.basePrice}
                    onChangeText={(val) => handlePriceChange(item.id, val)}
                    maxLength={4}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* ADD-ON PRICING */}
          <Text style={styles.sectionHeading}>2. POPULAR ADD-ON RATES</Text>
          <View style={styles.pricingList}>
            <View style={styles.priceCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceName}>Tire & Dashboard Polish</Text>
                <Text style={styles.durationText}>High-gloss silicone protectant</Text>
              </View>
              <View style={styles.priceInputBox}>
                <IndianRupee size={15} color="#0F172A" />
                <TextInput
                  style={styles.priceInput}
                  keyboardType="number-pad"
                  value={tyrePolishAddon}
                  onChangeText={setTyrePolishAddon}
                  maxLength={3}
                />
              </View>
            </View>

            <View style={styles.priceCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceName}>Carnauba Wax Sealant</Text>
                <Text style={styles.durationText}>Hydrophobic water beading layer</Text>
              </View>
              <View style={styles.priceInputBox}>
                <IndianRupee size={15} color="#0F172A" />
                <TextInput
                  style={styles.priceInput}
                  keyboardType="number-pad"
                  value={waxCoatingAddon}
                  onChangeText={setWaxCoatingAddon}
                  maxLength={3}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>SAVE & CONTINUE TO HOURS</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
  },
  stepBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  pricingList: {
    gap: 8,
    marginBottom: 14,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
  },
  rangeText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94A3B8',
    marginLeft: 4,
  },
  priceInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    paddingHorizontal: 10,
    height: 40,
  },
  priceInput: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 2,
    minWidth: 40,
    textAlign: 'center',
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
