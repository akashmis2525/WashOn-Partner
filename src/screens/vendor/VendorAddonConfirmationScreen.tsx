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
  Sparkles,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Plus,
  Send,
  Info,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ADDON_CONFIRMATION
>;

interface AddonItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  status: 'approved' | 'pending_approval' | 'available';
}

const ADDON_SERVICES: AddonItem[] = [
  { id: '1', name: 'Chain Cleaning & Synthetic Lube', price: 49, duration: '+10m', status: 'approved' },
  { id: '2', name: 'Liquid Hydrophobic Ceramic Wax', price: 99, duration: '+15m', status: 'available' },
  { id: '3', name: 'Helmet Sanitization & Anti-Fog Wipe', price: 49, duration: '+5m', status: 'available' },
];

export const VendorAddonConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [addons, setAddons] = useState<AddonItem[]>(ADDON_SERVICES);

  const handleRequestAddon = (id: string) => {
    setAddons((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'pending_approval' } : a
      )
    );
    Alert.alert(
      'Approval Sent to Customer',
      'An instant SMS & App pop-up has been sent to Aakash to approve this extra service charge.'
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

        <View style={styles.badge}>
          <AppText style={styles.badgeText}>ADD-ON UPGRADES</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.title}>Add-on Upgrades</AppText>
        <AppText style={styles.subtitle}>
          Suggest high-value add-ons during wash. Platform guardrails require customer approval before adding charges.
        </AppText>

        {/* LIST */}
        <View style={styles.list}>
          {addons.map((addon) => {
            const isApproved = addon.status === 'approved';
            const isPending = addon.status === 'pending_approval';

            return (
              <View
                key={addon.id}
                style={[
                  styles.card,
                  isApproved && styles.cardApproved,
                  isPending && styles.cardPending,
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.headerRow}>
                    <AppText style={styles.addonTitle}>{addon.name}</AppText>
                    <AppText style={styles.addonPrice}>+₹{addon.price}</AppText>
                  </View>
                  <AppText style={styles.addonSub}>Extra time: {addon.duration}</AppText>
                </View>

                {/* STATUS / ACTION */}
                {isApproved && (
                  <View style={styles.approvedBadge}>
                    <CheckCircle2 size={14} color="#059669" />
                    <AppText style={styles.approvedText}>Approved</AppText>
                  </View>
                )}

                {isPending && (
                  <View style={styles.pendingBadge}>
                    <AppText style={styles.pendingText}>Sent to User</AppText>
                  </View>
                )}

                {addon.status === 'available' && (
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => handleRequestAddon(addon.id)}
                    activeOpacity={0.8}
                  >
                    <Plus size={14} color="#0F172A" />
                    <AppText style={styles.addBtnText}>Request</AppText>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* POLICY BOX */}
        <View style={styles.policyCard}>
          <ShieldCheck size={16} color="#059669" style={{ marginTop: 2, marginRight: 8 }} />
          <AppText style={styles.policyText}>
            Zero Hidden Fees: Extra services are only billed once the vehicle owner taps "Approve" on their phone.
          </AppText>
        </View>

        {/* BACK TO WASH BUTTON */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <AppText style={styles.backBtnText}>Return to Live Wash Timer</AppText>
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
  badge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
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
    paddingTop: 14,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  list: {
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  cardApproved: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  cardPending: {
    borderColor: '#FDE68A',
    backgroundColor: '#FFFDF5',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addonTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  addonPrice: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  addonSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  approvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  approvedText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  pendingText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC80A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addBtnText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
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
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  backBtnText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
