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
  MapPin,
  Compass,
  CheckCircle2,
  Circle,
  Navigation,
  Layers,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_SERVICE_AREA
>;

interface AreaItem {
  id: string;
  name: string;
  pincode: string;
  demand: 'High' | 'Very High' | 'Medium';
  distance: string;
}

const OPERATING_AREAS: AreaItem[] = [
  { id: '1', name: 'Vijay Nagar', pincode: '452010', demand: 'Very High', distance: '0.8 km' },
  { id: '2', name: 'Scheme 54', pincode: '452010', demand: 'High', distance: '1.4 km' },
  { id: '3', name: 'Palasia', pincode: '452001', demand: 'Very High', distance: '3.2 km' },
  { id: '4', name: 'Bengali Square', pincode: '452016', demand: 'High', distance: '4.5 km' },
  { id: '5', name: 'Sudama Nagar', pincode: '452009', demand: 'Medium', distance: '6.0 km' },
  { id: '6', name: 'Rau', pincode: '453331', demand: 'High', distance: '8.5 km' },
  { id: '7', name: 'Bhanwarkua', pincode: '452014', demand: 'Medium', distance: '5.2 km' },
  { id: '8', name: 'Nipania & Bypass', pincode: '452016', demand: 'Very High', distance: '4.1 km' },
];

const RADIUS_OPTIONS = [5, 10, 15, 20];

export const VendorServiceAreaScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [selectedRadius, setSelectedRadius] = useState<number>(10);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]);

  const toggleArea = (id: string) => {
    if (selectedAreas.includes(id)) {
      if (selectedAreas.length === 1) {
        Alert.alert('Required', 'Please select at least 1 operating area to receive bookings.');
        return;
      }
      setSelectedAreas(selectedAreas.filter((item) => item !== id));
    } else {
      setSelectedAreas([...selectedAreas, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedAreas.length === OPERATING_AREAS.length) {
      setSelectedAreas(['1']);
    } else {
      setSelectedAreas(OPERATING_AREAS.map((a) => a.id));
    }
  };

  const handleSave = () => {
    // Navigate to Screen V014: Vehicle Types Selection
    navigation.navigate(Routes.VENDOR_VEHICLE_TYPES as never);
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
          <AppText style={styles.stepBadgeText}>SERVICE SETUP • 1/8</AppText>
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
              <Navigation size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>DOORSTEP COVERAGE</AppText>
          </View>
          <AppText style={styles.title}>Service Area Setup</AppText>
          <AppText style={styles.subtitle}>
            Set your base location and service radius.
          </AppText>
        </View>

        {/* CURRENT LOCATION PIN CARD */}
        <View style={styles.baseLocationCard}>
          <View style={styles.baseLocationIconCircle}>
            <MapPin size={22} color="#0F172A" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <AppText style={styles.baseLocationTag}>CURRENT BASE HUB</AppText>
            <AppText style={styles.baseLocationTitle}>Vijay Nagar, Indore</AppText>
            <AppText style={styles.baseLocationCoords}>22.7533° N, 75.8937° E • Madhya Pradesh</AppText>
          </View>
        </View>

        {/* SERVICE RADIUS SELECTOR */}
        <View style={styles.radiusSection}>
          <View style={styles.sectionHeaderRow}>
            <AppText style={styles.sectionTitle}>Max Travel Radius</AppText>
            <AppText style={styles.radiusHighlight}>{selectedRadius} km</AppText>
          </View>

          <View style={styles.radiusOptionsRow}>
            {RADIUS_OPTIONS.map((rad) => {
              const isSelected = selectedRadius === rad;
              return (
                <TouchableOpacity
                  key={rad}
                  style={[
                    styles.radiusTab,
                    isSelected && styles.radiusTabSelected,
                  ]}
                  onPress={() => setSelectedRadius(rad)}
                  activeOpacity={0.8}
                >
                  <AppText
                    style={[
                      styles.radiusTabText,
                      isSelected && styles.radiusTabTextSelected,
                    ]}
                  >
                    {rad} km
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* OPERATING AREAS CHECKLIST */}
        <View style={styles.areasSection}>
          <View style={styles.sectionHeaderRow}>
            <AppText style={styles.sectionTitle}>Select Operating Areas</AppText>
            <TouchableOpacity onPress={handleSelectAll}>
              <AppText style={styles.selectAllText}>
                {selectedAreas.length === OPERATING_AREAS.length
                  ? 'Deselect All'
                  : 'Select All'}
              </AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.areasList}>
            {OPERATING_AREAS.map((area) => {
              const isSelected = selectedAreas.includes(area.id);
              return (
                <TouchableOpacity
                  key={area.id}
                  style={[
                    styles.areaCard,
                    isSelected && styles.areaCardSelected,
                  ]}
                  onPress={() => toggleArea(area.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.areaLeft}>
                    <View
                      style={[
                        styles.areaCheckCircle,
                        isSelected && styles.areaCheckCircleSelected,
                      ]}
                    >
                      {isSelected ? (
                        <CheckCircle2 size={18} color="#0F172A" />
                      ) : (
                        <Circle size={18} color="#CBD5E1" />
                      )}
                    </View>
                    <View>
                      <AppText
                        style={[
                          styles.areaName,
                          isSelected && styles.areaNameSelected,
                        ]}
                      >
                        {area.name}
                      </AppText>
                      <AppText style={styles.areaSub}>
                        PIN {area.pincode} • ~{area.distance} away
                      </AppText>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.demandBadge,
                      area.demand === 'Very High' && styles.demandVeryHigh,
                      area.demand === 'High' && styles.demandHigh,
                    ]}
                  >
                    <AppText
                      style={[
                        styles.demandText,
                        area.demand === 'Very High' && styles.demandTextVeryHigh,
                      ]}
                    >
                      {area.demand} Demand
                    </AppText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <AppText style={styles.saveButtonText}>
            Save & Choose Vehicle Types ({selectedAreas.length} Areas)
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
  baseLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  baseLocationIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseLocationTag: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    letterSpacing: 0.5,
  },
  baseLocationTitle: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 2,
  },
  baseLocationCoords: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  radiusSection: {
    marginBottom: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  radiusHighlight: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  radiusOptionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  radiusTab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  radiusTabSelected: {
    backgroundColor: '#FFC80A',
    borderColor: '#FFC80A',
  },
  radiusTabText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#475569',
  },
  radiusTabTextSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  areasSection: {
    marginBottom: 20,
  },
  selectAllText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  areasList: {
    gap: 8,
  },
  areaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  areaCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
  },
  areaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  areaCheckCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaCheckCircleSelected: {},
  areaName: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#334155',
  },
  areaNameSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  areaSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  demandBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  demandHigh: {
    backgroundColor: '#FEF3C7',
  },
  demandVeryHigh: {
    backgroundColor: '#FEE2E2',
  },
  demandText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#64748B',
  },
  demandTextVeryHigh: {
    color: '#DC2626',
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
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
