import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ShieldAlert,
  Phone,
  Share2,
  AlertTriangle,
  MapPin,
  Lock,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorEmergencyAssistanceScreen = ({ navigation }: any) => {
  const handleSOSCall = () => {
    Alert.alert('Emergency SOS', 'Connecting to 24x7 WashOn Partner Rapid Response Team & Local Authorities...');
  };

  const handleShareLocation = () => {
    Alert.alert('Location Shared', 'Your live GPS coordinates (Scheme 54, Vijay Nagar) have been sent to partner ops team.');
  };

  const handleSafeCancel = () => {
    Alert.alert(
      'Safe Cancel Booking',
      'You are safely withdrawing from this job due to safety concerns. No cancellation charges or performance penalties will apply.',
      [
        {
          text: 'Confirm Safe Exit',
          style: 'destructive',
          onPress: () => navigation.navigate(Routes.VENDOR_DASHBOARD as any),
        },
        { text: 'Stay on Job', style: 'cancel' },
      ]
    );
  };

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
          <Text style={styles.headerTitle}>Emergency SOS</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* SOS Alert Button */}
        <TouchableOpacity style={styles.sosButton} activeOpacity={0.8} onPress={handleSOSCall}>
          <ShieldAlert size={48} color="#FFF" />
          <Text style={styles.sosText}>TAP FOR EMERGENCY SOS</Text>
          <Text style={styles.sosSub}>Immediate call to safety response desk</Text>
        </TouchableOpacity>

        {/* Share Live Location */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Live Location Monitoring</Text>
          <View style={styles.locationRow}>
            <MapPin size={20} color="#059669" />
            <Text style={styles.locationText}>
              Current GPS: Flat 304, Green Heights, Vijay Nagar (Indore)
            </Text>
          </View>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShareLocation}>
            <Share2 size={16} color="#0F172A" />
            <Text style={styles.shareBtnText}>Broadcast Live GPS to Safety Team</Text>
          </TouchableOpacity>
        </View>

        {/* Safe Cancellation */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unsafe Situation on Location?</Text>
          <Text style={styles.cardDesc}>
            If you encounter hostile customer behaviour, dangerous terrain, or safety risks, you may leave immediately.
          </Text>
          <TouchableOpacity style={styles.cancelSafeBtn} onPress={handleSafeCancel}>
            <AlertTriangle size={16} color="#DC2626" />
            <Text style={styles.cancelSafeBtnText}>Cancel Job with Zero Penalty</Text>
          </TouchableOpacity>
        </View>
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
    color: '#DC2626',
    fontWeight: '600',
    marginTop: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sosButton: {
    backgroundColor: '#DC2626',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  sosText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFF',
    marginTop: 10,
  },
  sosSub: {
    fontSize: 12,
    color: '#FEE2E2',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3C7',
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  shareBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  cancelSafeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  cancelSafeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
});
