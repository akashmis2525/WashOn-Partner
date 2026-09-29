import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  MapPin,
  Compass,
  CheckCircle2,
  Circle,
  Navigation,
  Sparkles,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

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

  const handleContinue = () => {
    // Navigate to Screen V014: Vehicle Types
    navigation.navigate(Routes.VENDOR_VEHICLE_TYPES as never);
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
          <Text style={styles.headerTitle}>Service Area Setup</Text>
          <Text style={styles.headerSub}>Operating Radius & Preferred Zones</Text>
        </View>

        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>STEP 1/8</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* RADIUS SELECTOR CARD */}
        <Text style={styles.sectionHeading}>1. MAXIMUM TRAVEL RADIUS</Text>
        <View style={styles.radiusCard}>
          <View style={styles.radiusHeader}>
            <Compass size={18} color="#0F172A" />
            <Text style={styles.radiusTitle}>Choose Operating Distance</Text>
            <View style={styles.selectedRadiusPill}>
              <Text style={styles.selectedRadiusPillText}>{selectedRadius} KM</Text>
            </View>
          </View>

          <View style={styles.radiusOptionsRow}>
            {RADIUS_OPTIONS.map((rad) => {
              const isActive = selectedRadius === rad;
              return (
                <TouchableOpacity
                  key={rad}
                  style={[styles.radiusBtn, isActive && styles.radiusBtnActive]}
                  onPress={() => setSelectedRadius(rad)}
                >
                  <Text style={[styles.radiusBtnText, isActive && styles.radiusBtnTextActive]}>
                    {rad} km
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* OPERATING LOCALITIES LIST */}
        <View style={styles.localitiesHeadingRow}>
          <Text style={styles.sectionHeading}>2. SELECT OPERATING LOCALITIES</Text>
          <Text style={styles.selectedCountText}>
            {selectedAreas.length}/{OPERATING_AREAS.length} Selected
          </Text>
        </View>

        <View style={styles.areasGrid}>
          {OPERATING_AREAS.map((area) => {
            const isSelected = selectedAreas.includes(area.id);
            return (
              <TouchableOpacity
                key={area.id}
                style={[styles.areaCard, isSelected && styles.areaCardSelected]}
                onPress={() => toggleArea(area.id)}
                activeOpacity={0.8}
              >
                <View style={styles.areaTopRow}>
                  <View style={styles.areaPinWrap}>
                    <MapPin size={15} color={isSelected ? '#0F172A' : '#64748B'} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={[styles.areaName, isSelected && styles.areaNameSelected]}>
                      {area.name}
                    </Text>
                    <Text style={styles.areaSub}>PIN: {area.pincode} • {area.distance}</Text>
                  </View>
                  <View style={styles.checkCircle}>
                    {isSelected ? (
                      <CheckCircle2 size={18} color="#0F172A" />
                    ) : (
                      <Circle size={18} color="#CBD5E1" />
                    )}
                  </View>
                </View>

                <View style={styles.areaFooter}>
                  <View
                    style={[
                      styles.demandPill,
                      area.demand === 'Very High' && { backgroundColor: '#FEE2E2' },
                      area.demand === 'High' && { backgroundColor: '#FEF3C7' },
                      area.demand === 'Medium' && { backgroundColor: '#EFF6FF' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.demandPillText,
                        area.demand === 'Very High' && { color: '#DC2626' },
                        area.demand === 'High' && { color: '#D97706' },
                        area.demand === 'Medium' && { color: '#2563EB' },
                      ]}
                    >
                      {area.demand} Demand
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
          <Text style={styles.submitButtonText}>SAVE & CONTINUE TO VEHICLES</Text>
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
    letterSpacing: 0.5,
  },
  radiusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginTop: 8,
    marginBottom: 16,
  },
  radiusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radiusTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
    flex: 1,
  },
  selectedRadiusPill: {
    backgroundColor: '#FFC80A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  selectedRadiusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  radiusOptionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  radiusBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiusBtnActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FFC80A',
  },
  radiusBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  radiusBtnTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  localitiesHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  areasGrid: {
    gap: 8,
  },
  areaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  areaCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFBEB',
  },
  areaTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaPinWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  areaNameSelected: {
    color: '#0F172A',
  },
  areaSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
  },
  checkCircle: {
    marginLeft: 6,
  },
  areaFooter: {
    marginTop: 8,
    flexDirection: 'row',
  },
  demandPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  demandPillText: {
    fontSize: 10,
    fontWeight: '700',
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
