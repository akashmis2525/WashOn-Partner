import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Droplets,
  Car,
  Bike,
  Shield,
  Clock,
  CheckCircle2,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_SERVICES_OFFERED
>;

interface ServiceItem {
  id: string;
  name: string;
  category: 'bike' | 'car' | 'addon';
  duration: string;
  desc: string;
}

const ALL_SERVICES: ServiceItem[] = [
  // BIKE SERVICES
  { id: '1', name: 'Basic Bike Wash', category: 'bike', duration: '20 min', desc: 'Pressure rinse, body shampoo & dry wipe' },
  { id: '2', name: 'Foam Bike Wash', category: 'bike', duration: '30 min', desc: 'Snow foam bath, rim scrub & tyre dressing' },
  { id: '3', name: 'Premium Bike Wash & Wax', category: 'bike', duration: '45 min', desc: 'Foam wash, chain degreasing, Teflon liquid shine' },

  // CAR SERVICES
  { id: '4', name: 'Exterior Car Wash', category: 'car', duration: '35 min', desc: 'Snow foam wash, tyre dressing & high-gloss drying' },
  { id: '5', name: 'Interior Deep Cleaning', category: 'car', duration: '45 min', desc: 'Seat vacuuming, dashboard polish & vent sanitization' },
  { id: '6', name: 'Full Car Wash (Exterior + Interior)', category: 'car', duration: '60 min', desc: 'Complete 360° wash, underbody rinse, deep cabin vacuum' },
  { id: '7', name: 'Ceramic Detailing & Rubbing', category: 'car', duration: '90 min', desc: 'Machine paint correction, scratch removal & gloss seal' },

  // ADD-ONS
  { id: '8', name: 'Chain Cleaning & Lube', category: 'addon', duration: '15 min', desc: 'O-ring safe degreaser & synthetic high-temp lube' },
  { id: '9', name: 'Tyre & Trim Dressing', category: 'addon', duration: '10 min', desc: 'Deep black matte / high shine silicon shield' },
  { id: '10', name: 'Liquid Wax Coating', category: 'addon', duration: '20 min', desc: 'Hydrophobic rain repellent & UV protectant layer' },
];

export const VendorServicesOfferedScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [enabledServices, setEnabledServices] = useState<string[]>([
    '1',
    '2',
    '4',
    '5',
    '6',
    '8',
    '9',
    '10',
  ]);

  const toggleService = (id: string) => {
    if (enabledServices.includes(id)) {
      if (enabledServices.length === 1) {
        Alert.alert('Required', 'You must enable at least 1 service to receive orders.');
        return;
      }
      setEnabledServices(enabledServices.filter((s) => s !== id));
    } else {
      setEnabledServices([...enabledServices, id]);
    }
  };

  const handleContinue = () => {
    // Navigate to Screen V018: Pricing Setup
    navigation.navigate(Routes.VENDOR_PRICING_SETUP as never);
  };

  const renderCategory = (
    title: string,
    category: 'bike' | 'car' | 'addon',
    Icon: any
  ) => {
    const list = ALL_SERVICES.filter((s) => s.category === category);
    return (
      <View style={styles.catBlock} key={category}>
        <View style={styles.catHeader}>
          <Icon size={18} color="#0F172A" />
          <AppText style={styles.catTitle}>{title}</AppText>
        </View>

        <View style={styles.servicesGrid}>
          {list.map((item) => {
            const isEnabled = enabledServices.includes(item.id);
            return (
              <View
                key={item.id}
                style={[
                  styles.serviceCard,
                  isEnabled && styles.serviceCardActive,
                ]}
              >
                <View style={{ flex: 1, marginRight: 10 }}>
                  <View style={styles.serviceNameRow}>
                    <AppText style={styles.serviceName}>{item.name}</AppText>
                    <View style={styles.durationBadge}>
                      <Clock size={10} color="#64748B" />
                      <AppText style={styles.durationText}>{item.duration}</AppText>
                    </View>
                  </View>
                  <AppText style={styles.serviceDesc}>{item.desc}</AppText>
                </View>

                <Switch
                  value={isEnabled}
                  onValueChange={() => toggleService(item.id)}
                  trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                  thumbColor={isEnabled ? '#0F172A' : '#94A3B8'}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
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

        <View style={styles.stepBadge}>
          <AppText style={styles.stepBadgeText}>SERVICE SETUP • 5/8</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE */}
        <View style={styles.titleSection}>
          <View style={styles.badgeRow}>
            <View style={styles.miniIconBadge}>
              <Droplets size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>MENU & PACKAGES</AppText>
          </View>
          <AppText style={styles.title}>Services Offered</AppText>
          <AppText style={styles.subtitle}>
            Enable the wash packages and add-ons you want to make visible to customers in your area.
          </AppText>
        </View>

        {/* CATEGORY GROUPS */}
        {renderCategory('Bike Wash Packages', 'bike', Bike)}
        {renderCategory('Car Wash Packages', 'car', Car)}
        {renderCategory('Add-ons & Coatings', 'addon', Sparkles)}

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <AppText style={styles.continueButtonText}>
            Set Pricing for {enabledServices.length} Services
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
  catBlock: {
    marginBottom: 18,
  },
  catHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  catTitle: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  servicesGrid: {
    gap: 10,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  serviceCardActive: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
  },
  serviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 3,
  },
  serviceName: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    gap: 3,
  },
  durationText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  serviceDesc: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 15,
  },
  continueButton: {
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
    marginTop: 8,
  },
  continueButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
