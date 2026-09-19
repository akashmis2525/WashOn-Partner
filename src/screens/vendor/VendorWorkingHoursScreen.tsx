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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Coffee,
  Sun,
  Moon,
  Sparkles,
  Plane,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

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
  const [holidayMode, setHolidayMode] = useState(false);

  const toggleDay = (key: string) => {
    setDays((prev) =>
      prev.map((d) => (d.key === key ? { ...d, active: !d.active } : d))
    );
  };

  const handleSave = () => {
    // Navigate to Screen V020: Availability Setup
    navigation.navigate(Routes.VENDOR_AVAILABILITY_SETUP as never);
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

        <View style={styles.stepBadge}>
          <AppText style={styles.stepBadgeText}>SERVICE SETUP • 7/8</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE SECTION */}
        <View style={styles.titleSection}>
          <View style={styles.badgeRow}>
            <View style={styles.miniIconBadge}>
              <Calendar size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>SCHEDULE & SHIFTS</AppText>
          </View>
          <AppText style={styles.title}>Working Hours & Days</AppText>
          <AppText style={styles.subtitle}>
            Set your daily operational slots. Customers can only book slots when you are marked active.
          </AppText>
        </View>

        {/* HOLIDAY / VACATION MODE CARD */}
        <View style={styles.holidayCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
            <View style={styles.holidayIconCircle}>
              <Plane size={18} color="#D97706" />
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.holidayTitle}>Holiday / Leave Mode</AppText>
              <AppText style={styles.holidaySub}>
                Temporarily pause all incoming bookings
              </AppText>
            </View>
          </View>
          <Switch
            value={holidayMode}
            onValueChange={setHolidayMode}
            trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
            thumbColor={holidayMode ? '#0F172A' : '#94A3B8'}
          />
        </View>

        {/* DAILY SCHEDULE LIST */}
        <View style={styles.daysSection}>
          <AppText style={styles.sectionHeading}>Weekly Working Days</AppText>

          <View style={styles.daysList}>
            {days.map((day) => (
              <View
                key={day.key}
                style={[styles.dayCard, !day.active && styles.dayCardInactive]}
              >
                <View style={{ flex: 1 }}>
                  <AppText
                    style={[
                      styles.dayName,
                      !day.active && styles.dayNameInactive,
                    ]}
                  >
                    {day.label}
                  </AppText>
                  {day.active ? (
                    <View style={styles.timeRow}>
                      <Clock size={11} color="#64748B" />
                      <AppText style={styles.timeText}>
                        {day.start} - {day.end}
                      </AppText>
                    </View>
                  ) : (
                    <AppText style={styles.offDayText}>Day Off / Closed</AppText>
                  )}
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
        </View>

        {/* LUNCH / BREAK TIME CARD */}
        <View style={styles.breakCard}>
          <View style={styles.breakHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Coffee size={18} color="#0F172A" />
              <AppText style={styles.breakTitle}>Afternoon Lunch Break</AppText>
            </View>
            <Switch
              value={breakTimeEnabled}
              onValueChange={setBreakTimeEnabled}
              trackColor={{ false: '#E2E8F0', true: '#FFC80A' }}
              thumbColor={breakTimeEnabled ? '#0F172A' : '#94A3B8'}
            />
          </View>
          {breakTimeEnabled && (
            <View style={styles.breakTimeBox}>
              <Clock size={13} color="#D97706" />
              <AppText style={styles.breakTimeVal}>01:00 PM to 02:00 PM (No jobs allocated)</AppText>
            </View>
          )}
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <AppText style={styles.saveButtonText}>
            Save Hours & Set Live Availability
          </AppText>
          <ArrowRight size={20} color="#0F172A" />
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
  stepBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stepBadgeText: {
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
    paddingTop: 10,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
    gap: 6,
  },
  miniIconBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 18,
  },
  holidayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginBottom: 18,
  },
  holidayIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  holidayTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  holidaySub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#78350F',
    marginTop: 2,
  },
  daysSection: {
    marginBottom: 18,
  },
  sectionHeading: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  daysList: {
    gap: 8,
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  dayCardInactive: {
    backgroundColor: '#F8FAFC',
    borderColor: '#F1F5F9',
  },
  dayName: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  dayNameInactive: {
    color: '#94A3B8',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  timeText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  offDayText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 2,
  },
  breakCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 22,
  },
  breakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  breakTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
    gap: 6,
  },
  breakTimeVal: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#78350F',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
