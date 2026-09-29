import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Switch,
  Alert,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Coffee,
  CheckCircle2,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_WORKING_HOURS
>;

interface DaySchedule {
  key: string;
  label: string;
  active: boolean;
  start: string;
  end: string;
}

const INITIAL_DAYS: DaySchedule[] = [
  { key: 'mon', label: 'Monday', active: true, start: '08:00 AM', end: '07:00 PM' },
  { key: 'tue', label: 'Tuesday', active: true, start: '08:00 AM', end: '07:00 PM' },
  { key: 'wed', label: 'Wednesday', active: true, start: '08:00 AM', end: '07:00 PM' },
  { key: 'thu', label: 'Thursday', active: true, start: '08:00 AM', end: '07:00 PM' },
  { key: 'fri', label: 'Friday', active: true, start: '08:00 AM', end: '07:00 PM' },
  { key: 'sat', label: 'Saturday', active: true, start: '08:00 AM', end: '08:00 PM' },
  { key: 'sun', label: 'Sunday', active: true, start: '08:00 AM', end: '08:00 PM' },
];

export const VendorWorkingHoursScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [days, setDays] = useState<DaySchedule[]>(INITIAL_DAYS);
  const [breakTimeEnabled, setBreakTimeEnabled] = useState(true);

  const toggleDay = (key: string) => {
    setDays((prev) =>
      prev.map((d) => (d.key === key ? { ...d, active: !d.active } : d))
    );
  };

  const handleSave = () => {
    // Navigate directly to Vendor Dashboard
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
          <Text style={styles.headerTitle}>Working Hours</Text>
          <Text style={styles.headerSub}>Weekly Schedule & Daily Slots</Text>
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
        <Text style={styles.sectionHeading}>1. WEEKLY OPERATING DAYS</Text>

        <View style={styles.daysList}>
          {days.map((day) => (
            <View
              key={day.key}
              style={[
                styles.dayCard,
                day.active && styles.dayCardActive,
              ]}
            >
              <View style={styles.dayInfo}>
                <Text style={[styles.dayLabel, day.active && styles.dayLabelActive]}>
                  {day.label}
                </Text>
                <Text style={styles.dayHours}>
                  {day.active ? `${day.start} - ${day.end}` : 'Day Off / Closed'}
                </Text>
              </View>

              <Switch
                value={day.active}
                onValueChange={() => toggleDay(day.key)}
                trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
                thumbColor={day.active ? '#0F172A' : '#94A3B8'}
              />
            </View>
          ))}
        </View>

        {/* LUNCH BREAK SLOTS */}
        <Text style={styles.sectionHeading}>2. LUNCH & TEA BREAK</Text>
        <View style={styles.breakCard}>
          <View style={styles.breakInfo}>
            <View style={styles.coffeeIconCircle}>
              <Coffee size={18} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.breakTitle}>Afternoon Break (01:00 PM - 02:00 PM)</Text>
              <Text style={styles.breakSub}>Pause bookings automatically during lunch</Text>
            </View>
          </View>
          <Switch
            value={breakTimeEnabled}
            onValueChange={setBreakTimeEnabled}
            trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
            thumbColor={breakTimeEnabled ? '#0F172A' : '#94A3B8'}
          />
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>COMPLETE SETUP & GO TO DASHBOARD</Text>
          <ArrowRight size={18} color="#0F172A" />
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '400',
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
    fontWeight: '700',
    color: '#D97706',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  daysList: {
    gap: 8,
    marginBottom: 14,
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayCardActive: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFBEB',
  },
  dayInfo: {
    flex: 1,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  dayLabelActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  dayHours: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
  },
  breakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  coffeeIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  breakSub: {
    fontSize: 10,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 1,
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
