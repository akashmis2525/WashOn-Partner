import React, { useState } from 'react';
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
  Calendar,
  Clock,
  MapPin,
  Bike,
  Car,
  ChevronRight,
  CalendarDays,
  Phone,
  XCircle,
  RotateCw,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

interface ScheduledBooking {
  id: string;
  customerName: string;
  phone: string;
  vehicle: string;
  vehicleType: 'bike' | 'car';
  service: string;
  date: string;
  timeSlot: string;
  location: string;
  earning: number;
}

export const VendorUpcomingBookingsScreen = ({ navigation }: any) => {
  const [bookings, setBookings] = useState<ScheduledBooking[]>([
    {
      id: 'BK-9850',
      customerName: 'Vivek Sharma',
      phone: '+91 98260 11223',
      vehicle: 'Honda City (MP-09-CB-1234)',
      vehicleType: 'car',
      service: 'Full Foam Car Wash & Vacuum',
      date: 'Today',
      timeSlot: '02:30 PM - 03:30 PM',
      location: 'Flat 402, Royal Palms, Scheme 54, Vijay Nagar',
      earning: 499,
    },
    {
      id: 'BK-9855',
      customerName: 'Anjali Deshmukh',
      phone: '+91 98260 44556',
      vehicle: 'TVS Jupiter (MP-09-ZX-9876)',
      vehicleType: 'bike',
      service: 'Premium Foam Bike Wash',
      date: 'Today',
      timeSlot: '05:00 PM - 05:45 PM',
      location: '12-B, Silver Estate, Near Bengali Square',
      earning: 249,
    },
    {
      id: 'BK-9862',
      customerName: 'Priya Rathore',
      phone: '+91 98260 77889',
      vehicle: 'Hyundai Creta',
      vehicleType: 'car',
      service: 'Car Interior Deep Clean',
      date: 'Tomorrow',
      timeSlot: '09:00 AM - 10:30 AM',
      location: 'Plot 88, Saket Nagar, Indore',
      earning: 799,
    },
  ]);

  const handleReschedule = (id: string) => {
    Alert.alert(
      'Request Reschedule',
      'Choose a reason for reschedule request to notify customer:',
      [
        { text: 'Slot Conflict', onPress: () => Alert.alert('Sent', 'Reschedule request sent to customer.') },
        { text: 'Equipment Delay', onPress: () => Alert.alert('Sent', 'Reschedule request sent to customer.') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleCancel = (id: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to decline this scheduled job? This may slightly affect your acceptance score.',
      [
        {
          text: 'Decline Booking',
          style: 'destructive',
          onPress: () => {
            setBookings(prev => prev.filter(b => b.id !== id));
            Alert.alert('Booking Cancelled', 'The slot has been freed.');
          },
        },
        { text: 'Keep Booking', style: 'cancel' },
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
          <Text style={styles.headerTitle}>Upcoming Bookings</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {bookings.map(item => (
          <View key={item.id} style={styles.bookingCard}>
            {/* Top Row: Date & Earning */}
            <View style={styles.cardTop}>
              <View style={styles.dateTimeBadge}>
                <CalendarDays size={14} color="#0F172A" />
                <Text style={styles.dateTimeText}>
                  {item.date} • {item.timeSlot}
                </Text>
              </View>
              <Text style={styles.earningText}>+₹{item.earning}</Text>
            </View>

            {/* Customer & Vehicle */}
            <View style={styles.detailRow}>
              <View style={styles.vehicleIconCircle}>
                {item.vehicleType === 'bike' ? (
                  <Bike size={20} color={Colors.textPrimary} />
                ) : (
                  <Car size={20} color={Colors.textPrimary} />
                )}
              </View>
              <View style={styles.detailTextWrap}>
                <Text style={styles.customerName}>{item.customerName}</Text>
                <Text style={styles.vehicleName}>{item.vehicle}</Text>
                <Text style={styles.serviceName}>{item.service}</Text>
              </View>
            </View>

            {/* Location */}
            <View style={styles.locationBox}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.locationText} numberOfLines={2}>
                {item.location}
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.rescheduleBtn}
                onPress={() => handleReschedule(item.id)}
              >
                <RotateCw size={14} color="#0F172A" />
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleCancel(item.id)}
              >
                <XCircle size={14} color="#DC2626" />
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.startBtn}
                onPress={() =>
                  navigation.navigate(Routes.VENDOR_ACTIVE_BOOKING as any, {
                    bookingId: item.id,
                  })
                }
              >
                <Text style={styles.startBtnText}>View Details</Text>
                <ChevronRight size={14} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  dateTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  earningText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#059669',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  vehicleIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTextWrap: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  vehicleName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginTop: 1,
  },
  serviceName: {
    fontSize: 12,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    gap: 8,
    marginBottom: 14,
  },
  locationText: {
    fontSize: 11,
    color: '#475569',
    flex: 1,
    lineHeight: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  rescheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  rescheduleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  cancelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  startBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  startBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
