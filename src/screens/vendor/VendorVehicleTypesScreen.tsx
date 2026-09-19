import React, { useState } from 'react';
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
  ArrowRight,
  Car,
  Bike,
  Truck,
  Sparkles,
  Shield,
  CheckCircle2,
  Circle,
  Layers,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_VEHICLE_TYPES
>;

interface VehicleTypeItem {
  id: string;
  name: string;
  subtitle: string;
  avgEarning: string;
  icon: any;
  popular?: boolean;
}

const VEHICLE_CATEGORIES: VehicleTypeItem[] = [
  {
    id: 'bike',
    name: 'Motorcycle & Scooters',
    subtitle: 'Quick 20-min wash & chain degreasing. High volume daily orders.',
    avgEarning: '₹149 - ₹249 / wash',
    icon: Bike,
    popular: true,
  },
  {
    id: 'car',
    name: 'Hatchback & Sedans',
    subtitle: 'Standard 4-wheeler foam wash, interior vacuum & tyre dressing.',
    avgEarning: '₹349 - ₹549 / wash',
    icon: Car,
    popular: true,
  },
  {
    id: 'suv',
    name: 'SUVs & Compact SUVs',
    subtitle: 'Deep mud removal, underbody spray & full interior detailing.',
    avgEarning: '₹499 - ₹799 / wash',
    icon: Car,
  },
  {
    id: 'luxury',
    name: 'Premium & Luxury Cars',
    subtitle: 'Ceramic safe wash, scratchless microfiber & high-gloss paint protection.',
    avgEarning: '₹899 - ₹1,499 / wash',
    icon: Sparkles,
  },
  {
    id: 'commercial',
    name: 'Commercial Vehicles & Fleets',
    subtitle: 'Travel cabs, school vans, delivery fleets & pickup trucks.',
    avgEarning: '₹599 - ₹999 / wash',
    icon: Truck,
  },
];

export const VendorVehicleTypesScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'bike',
    'car',
    'suv',
  ]);

  const toggleType = (id: string) => {
    if (selectedTypes.includes(id)) {
      if (selectedTypes.length === 1) {
        Alert.alert('Required', 'Please select at least 1 vehicle category to offer wash services.');
        return;
      }
      setSelectedTypes(selectedTypes.filter((item) => item !== id));
    } else {
      setSelectedTypes([...selectedTypes, id]);
    }
  };

  const handleContinue = () => {
    // Navigate to Screen V015: Equipment Details
    navigation.navigate(Routes.VENDOR_EQUIPMENT_DETAILS as never);
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
          <AppText style={styles.stepBadgeText}>SERVICE SETUP • 2/8</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE SECTION */}
        <View style={styles.titleSection}>
          <View style={styles.badgeRow}>
            <View style={styles.miniIconBadge}>
              <Car size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>VEHICLE SPECIALIZATION</AppText>
          </View>
          <AppText style={styles.title}>Vehicle Types Supported</AppText>
          <AppText style={styles.subtitle}>
            Select the vehicle types your equipment and team are equipped to clean and detail.
          </AppText>
        </View>

        {/* LIST OF VEHICLE TYPES */}
        <View style={styles.list}>
          {VEHICLE_CATEGORIES.map((cat) => {
            const isSelected = selectedTypes.includes(cat.id);
            const IconComponent = cat.icon;

            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                ]}
                onPress={() => toggleType(cat.id)}
                activeOpacity={0.88}
              >
                <View
                  style={[
                    styles.iconCircle,
                    isSelected && styles.iconCircleSelected,
                  ]}
                >
                  <IconComponent
                    size={24}
                    color={isSelected ? '#0F172A' : '#64748B'}
                  />
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.headerRow}>
                    <AppText
                      style={[
                        styles.cardTitle,
                        isSelected && styles.cardTitleSelected,
                      ]}
                    >
                      {cat.name}
                    </AppText>
                    {cat.popular && (
                      <View style={styles.popularBadge}>
                        <AppText style={styles.popularText}>Popular</AppText>
                      </View>
                    )}
                  </View>

                  <AppText style={styles.cardSub}>{cat.subtitle}</AppText>
                  <AppText style={styles.earningTag}>{cat.avgEarning}</AppText>
                </View>

                <View style={styles.radioBox}>
                  {isSelected ? (
                    <CheckCircle2 size={22} color="#FFC80A" />
                  ) : (
                    <Circle size={22} color="#CBD5E1" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <AppText style={styles.continueButtonText}>
            Continue with {selectedTypes.length} Categories
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
  list: {
    gap: 12,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleSelected: {
    backgroundColor: '#FEF3C7',
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#334155',
  },
  cardTitleSelected: {
    color: '#0F172A',
  },
  popularBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  popularText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  cardSub: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 4,
  },
  earningTag: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  radioBox: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  continueButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
