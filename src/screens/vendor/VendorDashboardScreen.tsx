import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Switch,
  Alert,
  Modal,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Bell,
  Radio,
  Power,
  TrendingUp,
  Car,
  MapPin,
  Phone,
  Navigation,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  Sparkles,
  Wallet,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Award,
  Menu,
  X,
  Sliders,
  Tag,
  Gift,
  HelpCircle,
  LogOut,
  Bike,
  Compass,
  Zap,
} from 'lucide-react-native';
import { VendorBottomNav } from '../../components/common/VendorBottomNav';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_DASHBOARD
>;

type RouteProps = RouteProp<
  RootStackParamList,
  typeof Routes.VENDOR_DASHBOARD
>;

export const VendorDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProps>();

  const [isOnline, setIsOnline] = useState<boolean>(
    route.params?.initialOnline !== undefined ? route.params.initialOnline : true
  );
  const [selectedRadius, setSelectedRadius] = useState<number>(5);
  const [autoAssign, setAutoAssign] = useState<boolean>(true);

  // Side Drawer State
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  // Services Offered Toggle Modal State
  const [servicesModalVisible, setServicesModalVisible] = useState<boolean>(false);
  const [serviceToggles, setServiceToggles] = useState({
    basicBikeWash: true,
    foamBikeWash: true,
    carFoamWash: true,
    interiorVacuum: true,
    ceramicPolish: false,
    tirePolishAddon: true,
    chainLubeAddon: true,
    helmetSanitizeAddon: true,
  });

  const toggleService = (key: keyof typeof serviceToggles) => {
    setServiceToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleOnline = (value: boolean) => {
    setIsOnline(value);
  };

  const handleStartCurrentJob = () => {
    navigation.navigate(Routes.VENDOR_ACTIVE_BOOKING as any, {
      bookingId: 'WASH-JOB-8941',
    });
  };

  const handleCallCustomer = () => {
    Alert.alert('Calling Customer', 'Connecting to Vikram Malhotra (+91 98260 XXXXX)...');
  };

  const handleLogout = () => {
    setDrawerVisible(false);
    Alert.alert('Logout from WashOn Partner', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.VENDOR_LOGIN as any }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER: GREETING, HAMBURGER & NOTIFICATION */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => setDrawerVisible(true)}
        >
          <Menu size={22} color="#0F172A" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileRow}
          onPress={() => setDrawerVisible(true)}
          activeOpacity={0.8}
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.greetingText}>Good morning,</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.partnerName}>Ramesh Sharma</Text>
              <View style={styles.ratingBadge}>
                <Star size={10} color="#FFC80A" fill="#FFC80A" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notifButton}
          onPress={() => navigation.navigate(Routes.VENDOR_NOTIFICATIONS as any)}
          activeOpacity={0.8}
        >
          <Bell size={20} color="#0F172A" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ============================================================ */}
        {/* RAPIDO MAP RADAR WITH EMBEDDED LIVE DUTY SWITCH */}
        {/* ============================================================ */}
        <View style={styles.radarCard}>
          <View style={styles.radarCanvas}>
            {/* Grid & Roads Simulation */}
            <View style={styles.gridLine1} />
            <View style={styles.gridLine2} />
            <View style={styles.roadLineH} />
            <View style={styles.roadLineV} />

            {/* Radar Waves if Online */}
            {isOnline && (
              <View style={styles.radarWaveOuter}>
                <View style={styles.radarWaveInner} />
              </View>
            )}

            {/* Partner Center Pin */}
            <View style={styles.partnerMapPin}>
              <Bike size={16} color="#0F172A" />
            </View>

            {/* FLOATING TOP DUTY SWITCH ON MAP */}
            <View style={styles.floatingDutyBar}>
              <View style={styles.dutyLeft}>
                <View style={[styles.dutyDot, isOnline ? styles.dutyDotOnline : styles.dutyDotOffline]} />
                <Text style={styles.dutyText}>{isOnline ? 'YOU ARE ONLINE' : 'OFFLINE'}</Text>
              </View>
              <Switch
                value={isOnline}
                onValueChange={handleToggleOnline}
                trackColor={{ false: '#94A3B8', true: '#FFC80A' }}
                thumbColor={isOnline ? '#0F172A' : '#FFFFFF'}
              />
            </View>

            {/* FLOATING BOTTOM RADIUS & AUTO-ASSIGN BAR */}
            <View style={styles.floatingRadiusBar}>
              <View style={styles.radiusChipsRow}>
                <Compass size={13} color="#0F172A" />
                {[3, 5, 8, 12].map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.radiusChip, selectedRadius === r && styles.radiusChipActive]}
                    onPress={() => setSelectedRadius(r)}
                  >
                    <Text style={[styles.radiusChipText, selectedRadius === r && styles.radiusChipTextActive]}>
                      {r}km
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.autoAssignChip, autoAssign && styles.autoAssignChipActive]}
                onPress={() => setAutoAssign(!autoAssign)}
              >
                <Zap size={11} color={autoAssign ? '#059669' : '#64748B'} />
                <Text style={[styles.autoAssignText, autoAssign && styles.autoAssignTextActive]}>
                  {autoAssign ? 'Auto-Accept ON' : 'Manual'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* TODAY'S EARNINGS SUMMARY */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <View>
              <Text style={styles.earningsLabel}>TODAY'S NET EARNINGS</Text>
              <Text style={styles.earningsAmount}>₹1,840.00</Text>
            </View>
            <TouchableOpacity
              style={styles.viewEarningsBtn}
              onPress={() => navigation.navigate(Routes.VENDOR_EARNINGS_DASHBOARD as any)}
            >
              <Text style={styles.viewEarningsText}>Passbook</Text>
              <ChevronRight size={14} color="#0F172A" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>6</Text>
              <Text style={styles.statKey}>Completed</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>1</Text>
              <Text style={styles.statKey}>Active</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>98%</Text>
              <Text style={styles.statKey}>Accept Rate</Text>
            </View>
          </View>
        </View>

        {/* ACTIVE BOOKING CARD (1-TAP RESUME WORK CONSOLE) */}
        <View style={styles.activeJobCard}>
          <View style={styles.activeJobHeader}>
            <View style={styles.activePill}>
              <View style={styles.activeDot} />
              <Text style={styles.activePillText}>CURRENT ACTIVE BOOKING</Text>
            </View>
            <Text style={styles.jobIdText}>#WASH-JOB-8941</Text>
          </View>

          <View style={styles.customerRow}>
            <View style={styles.custAvatar}>
              <Text style={styles.custAvatarText}>VM</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.custName}>Vikram Malhotra</Text>
              <Text style={styles.custCar}>Hyundai Creta • (MP-09-WA-7721)</Text>
              <Text style={styles.custService}>Full Foam Wash + Interior Vacuum</Text>
            </View>
            <TouchableOpacity style={styles.callBtn} onPress={handleCallCustomer}>
              <Phone size={16} color="#059669" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.resumeWorkBtn} onPress={handleStartCurrentJob}>
            <Text style={styles.resumeWorkText}>OPEN RAPIDO WORK CONSOLE</Text>
            <ArrowRight size={16} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* QUICK SERVICE CONFIG SHORTCUT */}
        <TouchableOpacity
          style={styles.servicesConfigBanner}
          onPress={() => setServicesModalVisible(true)}
        >
          <View style={styles.configIconCircle}>
            <Sliders size={18} color="#0F172A" />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.configTitle}>Services Offered & Add-on Settings</Text>
            <Text style={styles.configSub}>Toggle services you want to accept today</Text>
          </View>
          <ChevronRight size={18} color="#64748B" />
        </TouchableOpacity>
      </ScrollView>

      {/* FOOTER NAVIGATION */}
      <VendorBottomNav activeTab="home" />

      {/* ============================================================ */}
      {/* RAPIDO SIDE NAVIGATION DRAWER MODAL */}
      {/* ============================================================ */}
      <Modal visible={drawerVisible} animationType="fade" transparent={true}>
        <View style={styles.drawerOverlay}>
          <View style={styles.drawerContainer}>
            {/* Drawer Header */}
            <View style={styles.drawerHeader}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
                }}
                style={styles.drawerAvatar}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.drawerName}>Ramesh Sharma</Text>
                <Text style={styles.drawerId}>ID: #WASH-PARTNER-8891</Text>
                <View style={styles.drawerRatingRow}>
                  <Star size={11} color="#FFC80A" fill="#FFC80A" />
                  <Text style={styles.drawerRatingText}>4.9 (342 Washes)</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.closeDrawerBtn} onPress={() => setDrawerVisible(false)}>
                <X size={20} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <ScrollView style={styles.drawerMenu} showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate(Routes.VENDOR_BOOKING_HISTORY as any);
                }}
              >
                <Car size={18} color="#0F172A" />
                <Text style={styles.drawerItemText}>My Bookings & Rides</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate(Routes.VENDOR_OFFERS as any);
                }}
              >
                <Tag size={18} color="#0F172A" />
                <Text style={styles.drawerItemText}>Offers & Boosters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate(Routes.VENDOR_INCENTIVES as any);
                }}
              >
                <Gift size={18} color="#0F172A" />
                <Text style={styles.drawerItemText}>Daily Rewards & Coins</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate(Routes.VENDOR_NOTIFICATIONS as any);
                }}
              >
                <Bell size={18} color="#0F172A" />
                <Text style={styles.drawerItemText}>Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  setServicesModalVisible(true);
                }}
              >
                <Sliders size={18} color="#0F172A" />
                <Text style={styles.drawerItemText}>Services & Add-ons Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate(Routes.VENDOR_HELP_SUPPORT as any);
                }}
              >
                <HelpCircle size={18} color="#0F172A" />
                <Text style={styles.drawerItemText}>Help & Support</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.drawerItemLogout} onPress={handleLogout}>
                <LogOut size={18} color="#DC2626" />
                <Text style={styles.drawerItemLogoutText}>Logout Partner Account</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ============================================================ */}
      {/* TOGGLE-BASED SERVICES OFFERED MODAL */}
      {/* ============================================================ */}
      <Modal visible={servicesModalVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => setServicesModalVisible(false)}
            >
              <ArrowLeft size={20} color="#0F172A" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Services & Add-on Settings</Text>
              <Text style={styles.headerSub}>Turn ON / OFF services as per capacity</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHeading}>1. PRIMARY WASH SERVICES</Text>
            
            <View style={styles.serviceToggleCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceToggleTitle}>Basic Bike Wash</Text>
                <Text style={styles.serviceToggleSub}>₹149 • 20 Mins</Text>
              </View>
              <Switch
                value={serviceToggles.basicBikeWash}
                onValueChange={() => toggleService('basicBikeWash')}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={serviceToggles.basicBikeWash ? '#0F172A' : '#94A3B8'}
              />
            </View>

            <View style={styles.serviceToggleCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceToggleTitle}>Foam Bike Wash</Text>
                <Text style={styles.serviceToggleSub}>₹249 • 30 Mins (High Demand)</Text>
              </View>
              <Switch
                value={serviceToggles.foamBikeWash}
                onValueChange={() => toggleService('foamBikeWash')}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={serviceToggles.foamBikeWash ? '#0F172A' : '#94A3B8'}
              />
            </View>

            <View style={styles.serviceToggleCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceToggleTitle}>Full Car Foam Wash</Text>
                <Text style={styles.serviceToggleSub}>₹399 • 40 Mins</Text>
              </View>
              <Switch
                value={serviceToggles.carFoamWash}
                onValueChange={() => toggleService('carFoamWash')}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={serviceToggles.carFoamWash ? '#0F172A' : '#94A3B8'}
              />
            </View>

            <View style={styles.serviceToggleCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceToggleTitle}>Deep Interior Vacuum Cleaning</Text>
                <Text style={styles.serviceToggleSub}>₹449 • 45 Mins</Text>
              </View>
              <Switch
                value={serviceToggles.interiorVacuum}
                onValueChange={() => toggleService('interiorVacuum')}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={serviceToggles.interiorVacuum ? '#0F172A' : '#94A3B8'}
              />
            </View>

            <View style={styles.serviceToggleCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceToggleTitle}>Ceramic Coat & High-Gloss Polish</Text>
                <Text style={styles.serviceToggleSub}>₹899 • 60 Mins</Text>
              </View>
              <Switch
                value={serviceToggles.ceramicPolish}
                onValueChange={() => toggleService('ceramicPolish')}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={serviceToggles.ceramicPolish ? '#0F172A' : '#94A3B8'}
              />
            </View>

            <Text style={styles.sectionHeading}>2. POPULAR ADD-ON OFFERINGS</Text>

            <View style={styles.serviceToggleCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceToggleTitle}>Tire & Dashboard Polish</Text>
                <Text style={styles.serviceToggleSub}>+₹49 Extra Earning</Text>
              </View>
              <Switch
                value={serviceToggles.tirePolishAddon}
                onValueChange={() => toggleService('tirePolishAddon')}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={serviceToggles.tirePolishAddon ? '#0F172A' : '#94A3B8'}
              />
            </View>

            <View style={styles.serviceToggleCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceToggleTitle}>Chain Degrease & Lube</Text>
                <Text style={styles.serviceToggleSub}>+₹59 Extra Earning</Text>
              </View>
              <Switch
                value={serviceToggles.chainLubeAddon}
                onValueChange={() => toggleService('chainLubeAddon')}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={serviceToggles.chainLubeAddon ? '#0F172A' : '#94A3B8'}
              />
            </View>
          </ScrollView>

          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setServicesModalVisible(false)}
            >
              <Text style={styles.submitButtonText}>SAVE SERVICE SETTINGS</Text>
              <ArrowRight size={18} color="#0F172A" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
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
  menuBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FFC80A',
  },
  greetingText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
  },
  partnerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  notifButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#DC2626',
    position: 'absolute',
    top: 9,
    right: 9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  radarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  radarCanvas: {
    height: 200,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLine1: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  gridLine2: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  roadLineH: {
    position: 'absolute',
    top: 95,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#FFFFFF',
  },
  roadLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 20,
    backgroundColor: '#FFFFFF',
  },
  radarWaveOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 200, 10, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radarWaveInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 200, 10, 0.45)',
  },
  partnerMapPin: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  floatingDutyBar: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  dutyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dutyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dutyDotOnline: {
    backgroundColor: '#059669',
  },
  dutyDotOffline: {
    backgroundColor: '#94A3B8',
  },
  dutyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  floatingRadiusBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  radiusChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radiusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  radiusChipActive: {
    backgroundColor: '#FFC80A',
  },
  radiusChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  radiusChipTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  autoAssignChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  autoAssignChipActive: {
    backgroundColor: '#ECFDF5',
  },
  autoAssignText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  autoAssignTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
  earningsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  earningsAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  viewEarningsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  viewEarningsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCol: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  statKey: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 1,
  },
  activeJobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FFC80A',
    marginBottom: 14,
  },
  activeJobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  jobIdText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  custAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  custAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  custName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  custCar: {
    fontSize: 11,
    fontWeight: '500',
    color: '#334155',
  },
  custService: {
    fontSize: 10,
    fontWeight: '400',
    color: '#64748B',
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeWorkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  resumeWorkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  servicesConfigBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  configIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  configTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  configSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 1,
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  drawerContainer: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingTop: 40,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  drawerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFC80A',
  },
  drawerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  drawerId: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  drawerRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  drawerRatingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  closeDrawerBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerMenu: {
    padding: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  drawerItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  drawerItemLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  drawerItemLogoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
  serviceToggleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceToggleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  serviceToggleSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    marginTop: 10,
    letterSpacing: 0.5,
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
