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
  Navigation,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Bike,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorActiveBookingScreen = ({ navigation, route }: any) => {
  const { bookingId = 'BK-9824' } = route.params || {};

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
          <Text style={styles.headerTitle}>Active Booking</Text>
          <Text style={styles.headerSubtitle}>Booking #{bookingId}</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>In Progress</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Customer & Call Bar */}
        <View style={styles.customerCard}>
          <View style={styles.customerHeader}>
            <View>
              <Text style={styles.customerName}>Aakash Mishra</Text>
              <Text style={styles.customerPhone}>+91 98260 99881</Text>
            </View>
            <View style={styles.contactActions}>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() => Alert.alert('Calling', 'Connecting to Aakash Mishra...')}
              >
                <Phone size={18} color="#059669" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={() =>
                  navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any, {
                    bookingId,
                  })
                }
              >
                <MessageSquare size={18} color="#2563EB" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Vehicle & Service */}
          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <Bike size={22} color={Colors.textPrimary} />
            </View>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>Honda Activa 6G (MP-09-XX-1234)</Text>
              <Text style={styles.serviceName}>Foam Bike Wash + 2 Add-ons</Text>
              <Text style={styles.earningText}>Earning: ₹308 (Online Paid)</Text>
            </View>
          </View>
        </View>

        {/* Location & Navigation */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MapPin size={18} color="#0F172A" />
            <Text style={styles.cardTitle}>Customer Location</Text>
          </View>
          <Text style={styles.addressText}>
            Flat 304, Green Heights, Near Apollo DB City, Vijay Nagar, Indore
          </Text>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() =>
              navigation.navigate(Routes.VENDOR_NAVIGATE_CUSTOMER as any, {
                bookingId,
              })
            }
          >
            <Navigation size={16} color="#0F172A" />
            <Text style={styles.navBtnText}>Open Live Navigation (1.8 km)</Text>
          </TouchableOpacity>
        </View>

        {/* Service Milestones Progress */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Sparkles size={18} color="#0F172A" />
            <Text style={styles.cardTitle}>Service Checklist Status</Text>
          </View>

          {[
            { label: 'Vendor Arrived on Location', done: true },
            { label: 'Before Wash 6-Angle Photos', done: true },
            { label: 'Pre-Wash Damage Checklist Verified', done: true },
            { label: 'Foam Spray & Scrubbing', done: true },
            { label: 'After Wash Photos Upload', done: false },
            { label: 'Customer Quality Signoff', done: false },
          ].map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              <View style={[styles.stepDot, step.done && styles.stepDotDone]}>
                {step.done && <CheckCircle2 size={14} color="#FFF" />}
              </View>
              <Text style={[styles.stepText, step.done && styles.stepTextDone]}>
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTAs */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.issueBtn}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_ISSUE_REPORT as any, {
              bookingId,
            })
          }
        >
          <AlertTriangle size={16} color="#DC2626" />
          <Text style={styles.issueBtnText}>Report Issue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.completeBtn}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_AFTER_PHOTOS as any, {
              bookingId,
            })
          }
        >
          <Text style={styles.completeBtnText}>Continue Wash / Complete</Text>
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  customerCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  customerPhone: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vehicleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  serviceName: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  earningText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  addressText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 12,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3C7',
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  navBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotDone: {
    backgroundColor: '#059669',
  },
  stepText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  stepTextDone: {
    color: '#0F172A',
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 10,
  },
  issueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 14,
    gap: 6,
  },
  issueBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  completeBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
  },
  completeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
