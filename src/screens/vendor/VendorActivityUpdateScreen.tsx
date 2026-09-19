import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  Droplets,
  Sparkles,
  ArrowRight,
  ListChecks,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ACTIVITY_UPDATE
>;

interface StepActivity {
  id: string;
  name: string;
  desc: string;
  done: boolean;
}

const INITIAL_ACTIVITIES: StepActivity[] = [
  { id: '1', name: 'Pre-Rinse & Mud Blasting', desc: 'Rinse off thick dust & road grime', done: true },
  { id: '2', name: 'Snow Foam Application', desc: 'Cover body in dense dirt-lifting foam', done: true },
  { id: '3', name: 'Wheel Rim & Chain Scrubbing', desc: 'Degrease chain & clean alloy rims', done: true },
  { id: '4', name: 'High-Pressure Pure Water Rinse', desc: 'Wash off all shampoo residues', done: true },
  { id: '5', name: 'Microfiber Drying', desc: 'Scratch-safe towel drying to prevent water marks', done: true },
  { id: '6', name: 'Seat & Handlebar Detailing', desc: 'Wipe dashboard meter, mirrors & grips', done: false },
  { id: '7', name: 'Tyre Shine & Synthetic Chain Lube', desc: 'Apply non-sticky high-temp lube & tyre dressing', done: false },
  { id: '8', name: 'Final Quality Inspection', desc: 'Check for remaining spots & clean area', done: false },
];

export const VendorActivityUpdateScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [activities, setActivities] = useState<StepActivity[]>(INITIAL_ACTIVITIES);

  const toggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a))
    );
  };

  const doneCount = activities.filter((a) => a.done).length;

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
          <AppText style={styles.badgeText}>{doneCount}/8 STEPS DONE</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.title}>Service Activity Update</AppText>
        <AppText style={styles.subtitle}>
          Mark each wash milestone as you complete it. Updates are synced live to customer.
        </AppText>

        {/* PROGRESS BAR */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressBar,
              { width: `${(doneCount / 8) * 100}%` },
            ]}
          />
        </View>

        {/* ACTIVITIES CHECKLIST */}
        <View style={styles.list}>
          {activities.map((act) => (
            <TouchableOpacity
              key={act.id}
              style={[
                styles.itemCard,
                act.done && styles.itemCardDone,
              ]}
              onPress={() => toggleActivity(act.id)}
              activeOpacity={0.88}
            >
              <View style={styles.checkCircleBox}>
                {act.done ? (
                  <CheckCircle2 size={22} color="#059669" />
                ) : (
                  <Circle size={22} color="#CBD5E1" />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <AppText
                  style={[
                    styles.itemTitle,
                    act.done && styles.itemTitleDone,
                  ]}
                >
                  {act.name}
                </AppText>
                <AppText style={styles.itemDesc}>{act.desc}</AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* SAVE & BACK BUTTON */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <AppText style={styles.saveBtnText}>Save Milestone Progress</AppText>
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
  badge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
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
  progressTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#059669',
  },
  list: {
    gap: 10,
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  itemCardDone: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  checkCircleBox: {
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#334155',
  },
  itemTitleDone: {
    color: '#065F46',
  },
  itemDesc: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
