import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  AlertTriangle,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  Headphones,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorReworkRequestScreen = ({ navigation, route }: any) => {
  const { reworkId = 'RWK-1042' } = route.params || {};

  const handleAccept = () => {
    Alert.alert(
      'Revisit Accepted',
      'You have accepted the complimentary touch-up visit scheduled for Tomorrow, 11:00 AM.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate(Routes.VENDOR_UPCOMING_BOOKINGS as any),
        },
      ]
    );
  };

  const handleDispute = () => {
    Alert.alert(
      'Dispute Rework Claim',
      'Our quality audit team will review your original after-wash photos against the customer’s claim within 2 hours.',
      [
        {
          text: 'Submit Dispute',
          onPress: () => navigation.navigate(Routes.VENDOR_HELP_SUPPORT as any),
        },
        { text: 'Cancel', style: 'cancel' },
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
          <Text style={styles.headerTitle}>Rework / Revisit Request</Text>
          <Text style={styles.headerSubtitle}>#{reworkId}</Text>
        </View>
        <TouchableOpacity
          style={styles.supportBtn}
          onPress={() => navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any)}
        >
          <Headphones size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quality Alert Banner */}
        <View style={styles.alertBanner}>
          <AlertTriangle size={24} color="#D97706" />
          <View style={styles.alertTextWrap}>
            <Text style={styles.alertTitle}>Customer Reported Missed Spot</Text>
            <Text style={styles.alertDesc}>
              Customer requested a free touch-up under WashOn 24-Hour Cleanliness Guarantee.
            </Text>
          </View>
        </View>

        {/* Customer & Booking Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Customer</Text>
            <Text style={styles.infoValue}>Siddharth Dave</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vehicle</Text>
            <Text style={styles.infoValue}>Kia Seltos (MP-09-XX-5544)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Service Completed</Text>
            <Text style={styles.infoValue}>Full Foam Exterior Wash</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Customer Reason</Text>
            <Text style={styles.reasonText}>"Water marks visible on rear windshield & rims"</Text>
          </View>
        </View>

        {/* Issue Photos Uploaded by Customer */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Photos Uploaded by Customer</Text>
          <View style={styles.photoRow}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60' }}
              style={styles.issueImg}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60' }}
              style={styles.issueImg}
            />
          </View>
        </View>

        {/* Revisit Slot Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Proposed Revisit Slot</Text>
          <View style={styles.slotRow}>
            <Calendar size={18} color="#059669" />
            <Text style={styles.slotText}>Tomorrow, 11:00 AM - 11:30 AM</Text>
          </View>
          <View style={styles.slotRow}>
            <MapPin size={18} color="#059669" />
            <Text style={styles.slotText}>B-201, Shishukunj Campus, Jhalaria Road, Indore</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.disputeBtn} onPress={handleDispute}>
          <XCircle size={16} color="#DC2626" />
          <Text style={styles.disputeBtnText}>Dispute Claim</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
          <CheckCircle2 size={16} color={Colors.textPrimary} />
          <Text style={styles.acceptBtnText}>Accept Revisit (Free)</Text>
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
  supportBtn: {
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
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 14,
    gap: 12,
  },
  alertTextWrap: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B45309',
  },
  alertDesc: {
    fontSize: 11,
    color: '#92400E',
    marginTop: 2,
    lineHeight: 16,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  reasonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    flex: 1,
    textAlign: 'right',
  },
  photoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  issueImg: {
    flex: 1,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  slotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 10,
  },
  disputeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    gap: 6,
  },
  disputeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  acceptBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 14,
    gap: 6,
  },
  acceptBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
