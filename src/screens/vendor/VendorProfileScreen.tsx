import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Bike,
  Car,
  Wrench,
  Settings,
  ChevronRight,
  Award,
  Phone,
  Mail,
  Edit,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate(Routes.VENDOR_SETTINGS as any)}
        >
          <Settings size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60' }}
                style={styles.avatarImg}
              />
              <View style={styles.verifiedDot}>
                <ShieldCheck size={14} color="#FFF" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>Ramesh Solanki</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>KYC Verified</Text>
                </View>
              </View>
              <Text style={styles.partnerType}>Professional Detailer • 4+ Years Exp</Text>
              <Text style={styles.contactText}>+91 98260 12345 • ramesh.pro@washon.in</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate(Routes.VENDOR_EDIT_PROFILE as any)}
          >
            <Edit size={14} color="#0F172A" />
            <Text style={styles.editBtnText}>Edit Profile Info</Text>
          </TouchableOpacity>
        </View>

        {/* Operating Area & Radius */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate(Routes.VENDOR_SERVICE_AREAS as any)}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#FEF3C7' }]}>
            <MapPin size={20} color="#B45309" />
          </View>
          <View style={styles.menuTextWrap}>
            <Text style={styles.menuTitle}>Operating Service Areas</Text>
            <Text style={styles.menuSub}>Vijay Nagar, Scheme 54, Palasia (6 km radius)</Text>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Vehicles & Services Supported */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate(Routes.VENDOR_VEHICLE_TYPES as any)}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#EFF6FF' }]}>
            <Bike size={20} color="#2563EB" />
          </View>
          <View style={styles.menuTextWrap}>
            <Text style={styles.menuTitle}>Serviced Vehicle Types</Text>
            <Text style={styles.menuSub}>Bikes, Scooters, Hatchbacks, Sedans, SUVs</Text>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Equipment & Verification Documents */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate(Routes.VENDOR_EQUIPMENT_DOCS as any)}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#ECFDF5' }]}>
            <Wrench size={20} color="#059669" />
          </View>
          <View style={styles.menuTextWrap}>
            <Text style={styles.menuTitle}>Equipment & Documents</Text>
            <Text style={styles.menuSub}>High-pressure washer, Foam cannon, Aadhaar verified</Text>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Account Status */}
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate(Routes.VENDOR_ACCOUNT_STATUS as any)}
        >
          <View style={[styles.menuIcon, { backgroundColor: '#F5F3FF' }]}>
            <Award size={20} color="#7C3AED" />
          </View>
          <View style={styles.menuTextWrap}>
            <Text style={styles.menuTitle}>Partner Account Health & Status</Text>
            <Text style={styles.menuSub}>Active • Compliant • 0 Pending Flags</Text>
          </View>
          <ChevronRight size={18} color="#94A3B8" />
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  profileTop: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0',
  },
  verifiedDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#059669',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  verifiedBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  partnerType: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 11,
    color: '#64748B',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});
