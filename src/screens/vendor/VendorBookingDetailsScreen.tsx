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
  Calendar,
  Clock,
  MapPin,
  Bike,
  Star,
  Receipt,
  Headphones,
  CheckCircle2,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorBookingDetailsScreen = ({ navigation, route }: any) => {
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
          <Text style={styles.headerTitle}>Booking Details</Text>
          <Text style={styles.headerSubtitle}>#{bookingId}</Text>
        </View>
        <TouchableOpacity
          style={styles.supportBtn}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any, {
              bookingId,
            })
          }
        >
          <Headphones size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Customer & Vehicle Card */}
        <View style={styles.card}>
          <View style={styles.customerRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>AM</Text>
            </View>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>Aakash Mishra</Text>
              <Text style={styles.vehicleName}>Honda Activa 6G • MP-09-XX-1234</Text>
              <Text style={styles.serviceName}>Foam Bike Wash + 2 Add-ons</Text>
            </View>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Service Timeline</Text>
          {[
            { title: 'Booking Assigned & Accepted', time: '10:20 AM' },
            { title: 'Vendor Arrived at Location', time: '10:35 AM' },
            { title: 'Pre-Wash Photos & Verification', time: '10:38 AM' },
            { title: 'Wash & Polishing Finished', time: '11:10 AM' },
            { title: 'Customer Approved & Paid', time: '11:15 AM' },
          ].map((step, idx) => (
            <View key={idx} style={styles.timelineRow}>
              <View style={styles.timelineIconCol}>
                <View style={styles.timelineDot} />
                {idx < 4 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineTextCol}>
                <Text style={styles.timelineTitle}>{step.title}</Text>
                <Text style={styles.timelineTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Before & After Photos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Before & After Proofs</Text>
          <View style={styles.photoRow}>
            <View style={styles.photoCol}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60' }}
                style={styles.proofImg}
              />
              <Text style={styles.proofLabel}>Before Wash</Text>
            </View>
            <View style={styles.photoCol}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60' }}
                style={styles.proofImg}
              />
              <Text style={styles.proofLabel}>After Wash</Text>
            </View>
          </View>
        </View>

        {/* Earnings & Payment Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Financial Summary</Text>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Total Customer Fare</Text>
            <Text style={styles.calcVal}>₹347</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Platform Fee (11.2%)</Text>
            <Text style={styles.calcDeduct}>- ₹39</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.calcRowTotal}>
            <Text style={styles.totalLabel}>Partner Payout (Credited)</Text>
            <Text style={styles.totalVal}>₹308</Text>
          </View>
        </View>

        {/* Customer Review Card */}
        <View style={styles.card}>
          <View style={styles.reviewHeader}>
            <Text style={styles.cardTitle}>Customer Review</Text>
            <View style={styles.ratingBadge}>
              <Star size={14} color="#B45309" fill="#B45309" />
              <Text style={styles.ratingText}>5.0</Text>
            </View>
          </View>
          <Text style={styles.reviewComment}>
            "Excellent job by Ramesh! Activa looks brand new and spotless. Very polite and on time."
          </Text>
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
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#B45309',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  vehicleName: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  serviceName: {
    fontSize: 12,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineIconCol: {
    alignItems: 'center',
    width: 16,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  timelineTextCol: {
    flex: 1,
    paddingBottom: 14,
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  timelineTime: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  photoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  photoCol: {
    flex: 1,
  },
  proofImg: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  proofLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  calcLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  calcVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  calcDeduct: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  calcRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  reviewComment: {
    fontSize: 12,
    color: '#475569',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
