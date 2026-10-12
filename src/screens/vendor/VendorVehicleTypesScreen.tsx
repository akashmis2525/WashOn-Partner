import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Bike,
  Sparkles,
  CheckCircle2,
  Circle,
  Wrench,
  ChevronDown,
  ChevronUp,
  Clock,
  Plus,
  Trash2,
  Calendar,
  Zap,
  Check,
  Tag,
  Sliders,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_VEHICLE_TYPES
>;

type VehicleSelectionMode = 'bike' | 'car' | 'combo';

interface EquipmentItem {
  id: string;
  name: string;
  category: 'bike' | 'car' | 'all';
  desc: string;
}

const ALL_EQUIPMENTS: EquipmentItem[] = [
  {
    id: 'eq_pressure',
    name: 'Portable High Pressure Washer',
    category: 'all',
    desc: 'Min 120-150 bar high pressure jet for deep mud & dirt removal',
  },
  {
    id: 'eq_foam',
    name: 'Foam Cannon & pH Shampoo',
    category: 'all',
    desc: 'High-density snow foam lance with paint-safe pH neutral foam',
  },
  {
    id: 'eq_microfiber',
    name: 'Scratch-Safe Microfibers (800 GSM)',
    category: 'all',
    desc: 'Ultra-plush edgeless microfibers for swirl-free drying & buffing',
  },
  {
    id: 'eq_vacuum',
    name: 'Wet & Dry Interior Vacuum',
    category: 'car',
    desc: 'High suction 1400W vacuum with crevice & upholstery tools',
  },
  {
    id: 'eq_polish',
    name: 'Dashboard & Tyre Dressing Kit',
    category: 'all',
    desc: 'Non-greasy UV protectant & deep gloss tyre shine applicators',
  },
  {
    id: 'eq_chain',
    name: 'Chain Cleaner & Degreaser Brush',
    category: 'bike',
    desc: '3-sided grunge brush & eco degreaser for bike drivetrain',
  },
  {
    id: 'eq_bucket',
    name: 'Grit Guard Twin Bucket Kit',
    category: 'all',
    desc: 'Two-bucket wash system to isolate grit and prevent swirl marks',
  },
  {
    id: 'eq_underbody',
    name: 'Underbody Curved Spray Lance',
    category: 'car',
    desc: 'Angled chassis cleaner for underbody dirt and wheel arches',
  },
];

interface PricingPackage {
  id: string;
  name: string;
  badge: string;
  defaultPrice: number;
  userPrice: number;
  enabled: boolean;
  subOptions: string[];
}

const DEFAULT_PACKAGES: PricingPackage[] = [
  {
    id: 'pkg_1',
    name: 'Basic Bike Wash',
    badge: 'BIKE',
    defaultPrice: 149,
    userPrice: 149,
    enabled: true,
    subOptions: ['High Pressure Foam Rinse', 'Wheel & Engine Degreasing', 'Microfiber Dry Wipe', 'Tyre Polish'],
  },
  {
    id: 'pkg_2',
    name: 'Basic Outside Wash',
    badge: 'CAR EXTERIOR',
    defaultPrice: 299,
    userPrice: 299,
    enabled: true,
    subOptions: ['Foam Jet Snow Bath', 'Glass & Mirror Cleaning', 'Microfiber Body Dry', 'Tyre Gloss'],
  },
  {
    id: 'pkg_3',
    name: 'Basic Inside Wash',
    badge: 'CAR INTERIOR',
    defaultPrice: 249,
    userPrice: 249,
    enabled: true,
    subOptions: ['Cabin Deep Vacuuming', 'Dashboard & Console Wipe', 'Footmat Cleaning', 'AC Vent Dusting'],
  },
];

const WEEK_DAYS = [
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' },
  { id: 'sun', label: 'Sun' },
];

export const VendorVehicleTypesScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  // 1. VEHICLE MODE STATE ('bike' | 'car' | 'combo')
  const [vehicleMode, setVehicleMode] = useState<VehicleSelectionMode>('combo');

  // 2. EQUIPMENT STATE (auto-populated by vehicle mode, but customizable)
  const getAutoEquipments = (mode: VehicleSelectionMode): string[] => {
    if (mode === 'bike') {
      return ['eq_pressure', 'eq_foam', 'eq_microfiber', 'eq_chain', 'eq_polish', 'eq_bucket'];
    }
    if (mode === 'car') {
      return ['eq_pressure', 'eq_foam', 'eq_microfiber', 'eq_vacuum', 'eq_polish', 'eq_bucket', 'eq_underbody'];
    }
    // combo
    return ALL_EQUIPMENTS.map((eq) => eq.id);
  };

  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(getAutoEquipments('combo'));

  // Switch vehicle mode and auto-select relevant equipment
  const handleSelectVehicleMode = (mode: VehicleSelectionMode) => {
    setVehicleMode(mode);
    setSelectedEquipments(getAutoEquipments(mode));
  };

  const toggleEquipment = (id: string) => {
    if (selectedEquipments.includes(id)) {
      if (selectedEquipments.length === 1) {
        Alert.alert('Required', 'Please keep at least 1 equipment selected.');
        return;
      }
      setSelectedEquipments(selectedEquipments.filter((eq) => eq !== id));
    } else {
      setSelectedEquipments([...selectedEquipments, id]);
    }
  };

  // 3. PRICING PACKAGES STATE
  const [packages, setPackages] = useState<PricingPackage[]>(DEFAULT_PACKAGES);
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>('pkg_1');
  const [newSubOptionText, setNewSubOptionText] = useState<{ [key: string]: string }>({});

  const toggleExpandPkg = (id: string) => {
    setExpandedPkgId(expandedPkgId === id ? null : id);
  };

  const updatePackagePrice = (id: string, delta: number) => {
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === id) {
          const newPrice = Math.max(49, pkg.userPrice + delta);
          return { ...pkg, userPrice: newPrice };
        }
        return pkg;
      })
    );
  };

  const togglePackageActive = (id: string) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, enabled: !pkg.enabled } : pkg))
    );
  };

  const addSubOption = (pkgId: string) => {
    const text = newSubOptionText[pkgId]?.trim();
    if (!text) return;

    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === pkgId) {
          return { ...pkg, subOptions: [...pkg.subOptions, text] };
        }
        return pkg;
      })
    );
    setNewSubOptionText({ ...newSubOptionText, [pkgId]: '' });
  };

  const removeSubOption = (pkgId: string, index: number) => {
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === pkgId) {
          const updated = [...pkg.subOptions];
          updated.splice(index, 1);
          return { ...pkg, subOptions: updated };
        }
        return pkg;
      })
    );
  };

  // 4. WORKING HOURS & AVAILABILITY STATE
  const [is24x7, setIs24x7] = useState<boolean>(true);
  const [selectedDays, setSelectedDays] = useState<string[]>(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
  const [selectedShift, setSelectedShift] = useState<string>('FULL_DAY');

  const handleToggle24x7 = () => {
    if (!is24x7) {
      setIs24x7(true);
      setSelectedDays(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
      setSelectedShift('FULL_DAY');
    } else {
      setIs24x7(false);
    }
  };

  const toggleDay = (dayId: string) => {
    setIs24x7(false);
    if (selectedDays.includes(dayId)) {
      if (selectedDays.length === 1) {
        Alert.alert('Required', 'Please select at least 1 working day.');
        return;
      }
      setSelectedDays(selectedDays.filter((d) => d !== dayId));
    } else {
      const updated = [...selectedDays, dayId];
      setSelectedDays(updated);
      if (updated.length === 7) {
        setIs24x7(true);
      }
    }
  };

  // COMPLETION & DIRECT DASHBOARD NAVIGATION (RAPIDO CAPTAIN REAL FLOW)
  const handleCompleteSetup = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.VENDOR_DASHBOARD as any, params: { initialOnline: true } }],
    });
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
          <Text style={styles.headerTitle}>Services & Pricing Setup</Text>
          <Text style={styles.headerSub}>Vehicles & Pricing</Text>
        </View>

        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>FINAL STEP</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* VEHICLE CATEGORY SELECTION */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Vehicle Categories</Text>
        </View>

        <View style={styles.vehicleModesRow}>
          {/* BIKE */}
          <TouchableOpacity
            style={[styles.modeCard, vehicleMode === 'bike' && styles.modeCardActive]}
            onPress={() => handleSelectVehicleMode('bike')}
            activeOpacity={0.8}
          >
            <View style={[styles.modeIconCircle, vehicleMode === 'bike' && styles.modeIconCircleActive]}>
              <Bike size={22} color={vehicleMode === 'bike' ? '#0F172A' : '#64748B'} />
            </View>
            <Text style={[styles.modeTitle, vehicleMode === 'bike' && styles.modeTitleActive]}>
              Bike Wash
            </Text>
            <View style={styles.modeCheck}>
              {vehicleMode === 'bike' ? (
                <CheckCircle2 size={16} color="#0F172A" />
              ) : (
                <Circle size={16} color="#CBD5E1" />
              )}
            </View>
          </TouchableOpacity>

          {/* CARS */}
          <TouchableOpacity
            style={[styles.modeCard, vehicleMode === 'car' && styles.modeCardActive]}
            onPress={() => handleSelectVehicleMode('car')}
            activeOpacity={0.8}
          >
            <View style={[styles.modeIconCircle, vehicleMode === 'car' && styles.modeIconCircleActive]}>
              <Car size={22} color={vehicleMode === 'car' ? '#0F172A' : '#64748B'} />
            </View>
            <Text style={[styles.modeTitle, vehicleMode === 'car' && styles.modeTitleActive]}>
              Car Wash
            </Text>
            <View style={styles.modeCheck}>
              {vehicleMode === 'car' ? (
                <CheckCircle2 size={16} color="#0F172A" />
              ) : (
                <Circle size={16} color="#CBD5E1" />
              )}
            </View>
          </TouchableOpacity>

          {/* BOTH VEHICLES */}
          <TouchableOpacity
            style={[styles.modeCard, vehicleMode === 'combo' && styles.modeCardActive]}
            onPress={() => handleSelectVehicleMode('combo')}
            activeOpacity={0.8}
          >
            <View style={[styles.modeIconCircle, vehicleMode === 'combo' && styles.modeIconCircleActive]}>
              <Sparkles size={22} color={vehicleMode === 'combo' ? '#0F172A' : '#64748B'} />
            </View>
            <Text style={[styles.modeTitle, vehicleMode === 'combo' && styles.modeTitleActive]}>
              Both Vehicles
            </Text>
            <View style={styles.modeCheck}>
              {vehicleMode === 'combo' ? (
                <CheckCircle2 size={16} color="#0F172A" />
              ) : (
                <Circle size={16} color="#CBD5E1" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* PRICING & PACKAGE */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Pricing & Package</Text>
        </View>

        <View style={styles.pricingContainer}>
          {packages.map((pkg) => {
            const isExpanded = expandedPkgId === pkg.id;
            return (
              <View key={pkg.id} style={[styles.pkgCard, isExpanded && styles.pkgCardExpanded]}>
                {/* PACKAGE HEADER BAR */}
                <TouchableOpacity
                  style={styles.pkgHeader}
                  onPress={() => toggleExpandPkg(pkg.id)}
                  activeOpacity={0.8}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={styles.pkgName}>{pkg.name}</Text>
                      <View style={styles.pkgBadge}>
                        <Text style={styles.pkgBadgeText}>{pkg.badge}</Text>
                      </View>
                    </View>
                    <Text style={styles.pkgSubText}>
                      {pkg.subOptions.length} features included • Default ₹{pkg.defaultPrice}
                    </Text>
                  </View>

                  {/* PRICE DISPLAY & EXPAND CHEVRON */}
                  <View style={styles.pkgHeaderRight}>
                    <View style={styles.pricePill}>
                      <Text style={styles.pricePillCurrency}>₹</Text>
                      <Text style={styles.pricePillValue}>{pkg.userPrice}</Text>
                    </View>
                    {isExpanded ? (
                      <ChevronUp size={20} color="#0F172A" />
                    ) : (
                      <ChevronDown size={20} color="#64748B" />
                    )}
                  </View>
                </TouchableOpacity>

                {/* EXPANDABLE EDIT SECTION */}
                {isExpanded && (
                  <View style={styles.pkgExpandContent}>
                    {/* PRICE STEPPER EDITOR */}
                    <View style={styles.priceEditorRow}>
                      <Text style={styles.editorLabel}>Set Package Price:</Text>
                      <View style={styles.stepperContainer}>
                        <TouchableOpacity
                          style={styles.stepperBtn}
                          onPress={() => updatePackagePrice(pkg.id, -50)}
                        >
                          <Text style={styles.stepperBtnText}>-₹50</Text>
                        </TouchableOpacity>
                        <View style={styles.stepperValueBox}>
                          <Text style={styles.stepperValueText}>₹{pkg.userPrice}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.stepperBtn}
                          onPress={() => updatePackagePrice(pkg.id, 50)}
                        >
                          <Text style={styles.stepperBtnText}>+₹50</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* SUB-OPTIONS LIST */}
                    <Text style={[styles.editorLabel, { marginTop: 12, marginBottom: 6 }]}>
                      Services Included in ₹{pkg.userPrice}:
                    </Text>

                    <View style={styles.subOptionsWrap}>
                      {pkg.subOptions.map((opt, idx) => (
                        <View key={idx} style={styles.subOptionChip}>
                          <Check size={12} color="#059669" />
                          <Text style={styles.subOptionText}>{opt}</Text>
                          <TouchableOpacity
                            onPress={() => removeSubOption(pkg.id, idx)}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          >
                            <Trash2 size={12} color="#DC2626" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>

                    {/* ADD SUB-OPTION INPUT */}
                    <View style={styles.addOptionRow}>
                      <TextInput
                        style={styles.addOptionInput}
                        placeholder="Add inclusion (e.g. Foam rinse, Tyre polish)..."
                        placeholderTextColor="#94A3B8"
                        value={newSubOptionText[pkg.id] || ''}
                        onChangeText={(txt) =>
                          setNewSubOptionText({ ...newSubOptionText, [pkg.id]: txt })
                        }
                      />
                      <TouchableOpacity
                        style={styles.addOptionBtn}
                        onPress={() => addSubOption(pkg.id)}
                      >
                        <Plus size={16} color="#0F172A" />
                        <Text style={styles.addOptionBtnText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTTOM ACTION BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleCompleteSetup}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>CONTINUE</Text>
          <ArrowRight size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '500',
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
    fontWeight: '900',
    color: '#D97706',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.8,
  },
  autoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  autoBadgeText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#D97706',
    letterSpacing: 0.5,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  vehicleModesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  modeCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    position: 'relative',
  },
  modeCardActive: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFBEB',
  },
  modeIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modeIconCircleActive: {
    backgroundColor: '#FFC80A',
    borderColor: '#FFC80A',
  },
  modeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  modeTitleActive: {
    color: '#0F172A',
  },
  modeSub: {
    fontSize: 9.5,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
  },
  modeCheck: {
    marginTop: 6,
  },
  equipmentCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  equipmentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 10,
  },
  equipmentBannerText: {
    flex: 1,
    fontSize: 10.5,
    fontWeight: '600',
    color: '#92400E',
    lineHeight: 14,
  },
  equipmentList: {
    gap: 8,
  },
  equipRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  equipRowSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFEF5',
  },
  equipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  equipCheckSelected: {
    backgroundColor: '#FFC80A',
  },
  equipName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  equipNameSelected: {
    color: '#0F172A',
  },
  equipDesc: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  pricingContainer: {
    gap: 10,
    marginBottom: 16,
  },
  pkgCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  pkgCardExpanded: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFFFF',
  },
  pkgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  pkgName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  pkgBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  pkgBadgeText: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#D97706',
  },
  pkgSubText: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 2,
  },
  pkgHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC80A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pricePillCurrency: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0F172A',
  },
  pricePillValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
  },
  pkgExpandContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  priceEditorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  editorLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#475569',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepperBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stepperBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  stepperValueBox: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  stepperValueText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
  },
  subOptionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  subOptionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subOptionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
  addOptionRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  addOptionInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 11.5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#0F172A',
  },
  addOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  addOptionBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  workingHoursCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  fullWeek24Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  fullWeek24BtnActive: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFBEB',
  },
  fullWeekLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  badge24: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badge24Active: {
    backgroundColor: '#FFC80A',
  },
  badge24Text: {
    fontSize: 12,
    fontWeight: '900',
    color: '#64748B',
  },
  badge24TextActive: {
    color: '#0F172A',
  },
  fullWeekTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  fullWeekTitleActive: {
    color: '#0F172A',
  },
  fullWeekSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 14,
  },
  fullWeekCheck: {},
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },
  customScheduleTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 8,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dayChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  dayChipActive: {
    backgroundColor: '#FFC80A',
    borderColor: '#FFC80A',
  },
  dayChipText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#64748B',
  },
  dayChipTextActive: {
    color: '#0F172A',
    fontWeight: '900',
  },
  shiftsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  shiftBtn: {
    flex: 1,
    minWidth: '46%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  shiftBtnActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FFC80A',
  },
  shiftBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  shiftBtnTextActive: {
    color: '#0F172A',
    fontWeight: '900',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    height: 52,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});

