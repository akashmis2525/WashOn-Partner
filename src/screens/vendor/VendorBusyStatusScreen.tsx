import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Bike,
  Sparkles,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorBusyStatusScreen = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Busy Status</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Busy Warning Banner */}
        <View style={styles.busyBanner}>
          <Clock size={28} color="#B45309" />
          <View style={styles.busyTextWrap}>
            <Text style={styles.busyTitle}>Job in Progress • ~18 mins remaining</Text>
            <Text style={styles.busyDesc}>
              Incoming booking requests are automatically paused so you can focus 100% on delivering spotless quality.
            </Text>
          </View>
        </View>

        {/* Current Job Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Booking Details</Text>
          <View style={styles.jobRow}>
            <Bike size={24} color={Colors.textPrimary} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobId}>#BK-9824 • Honda Activa 6G</Text>
              <Text style={styles.jobCustomer}>Customer: Aakash Mishra</Text>
              <Text style={styles.jobService}>Foam Bike Wash + 2 Add-ons</Text>
            </View>
          </View>
        </View>

        {/* Automatic Toggle Notice */}
        <View style={styles.card}>
          <View style={styles.autoRow}>
            <CheckCircle2 size={20} color="#059669" />
            <Text style={styles.autoText}>
              Your status will automatically switch back to <Text style={{ fontWeight: '700', color: '#059669' }}>Available & Online</Text> as soon as you complete this wash.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.resumeBtn}
          onPress={() => navigation.navigate(Routes.VENDOR_SERVICE_IN_PROGRESS as any)}
        >
          <Text style={styles.resumeBtnText}>Return to Current Service</Text>
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
    color: '#B45309',
    marginTop: 1,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  busyBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  busyTextWrap: {
    flex: 1,
  },
  busyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B45309',
  },
  busyDesc: {
    fontSize: 12,
    color: '#92400E',
    marginTop: 4,
    lineHeight: 18,
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
    marginBottom: 12,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobId: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  jobCustomer: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  jobService: {
    fontSize: 12,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
  },
  autoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  autoText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
    lineHeight: 18,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  resumeBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
