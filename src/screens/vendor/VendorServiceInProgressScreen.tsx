import React, { useState, useEffect } from 'react';
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
  Clock,
  Droplets,
  Bike,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  AlertCircle,
  Sparkles,
  Plus,
  ListChecks,
  Camera,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_SERVICE_IN_PROGRESS
>;

export const VendorServiceInProgressScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [timerSeconds, setTimerSeconds] = useState<number>(22 * 60 + 30); // 22m 30s
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (!isPaused && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleFinishWash = () => {
    // Navigate to Section 9: Screen V040 After Wash Photos
    navigation.navigate(Routes.VENDOR_AFTER_PHOTOS as any, {
      bookingId: 'WASH-JOB-9842',
    });
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

        <View style={styles.activePill}>
          <View style={styles.pulseDot} />
          <AppText style={styles.activePillText}>WASH IN PROGRESS</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LIVE TIMER HERO */}
        <View style={styles.timerHeroCard}>
          <AppText style={styles.timerTag}>ESTIMATED TIME REMAINING</AppText>
          <AppText style={styles.timerClock}>{formatTimer(timerSeconds)}</AppText>
          <AppText style={styles.etaSub}>Estimated Finish: 11:50 AM</AppText>

          {/* PAUSE / RESUME TOGGLE */}
          <TouchableOpacity
            style={styles.pauseBtn}
            onPress={() => setIsPaused(!isPaused)}
            activeOpacity={0.8}
          >
            {isPaused ? (
              <>
                <PlayCircle size={16} color="#0F172A" />
                <AppText style={styles.pauseBtnText}>Resume Wash</AppText>
              </>
            ) : (
              <>
                <PauseCircle size={16} color="#64748B" />
                <AppText style={styles.pauseBtnText}>Pause Timer</AppText>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* CUSTOMER & VEHICLE CARD */}
        <View style={styles.card}>
          <View style={styles.customerRow}>
            <View style={styles.bikeIconBox}>
              <Bike size={22} color="#0F172A" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.vehicleName}>Honda Activa 6G • MP09 XX 9821</AppText>
              <AppText style={styles.customerName}>Customer: Aakash Mishra</AppText>
            </View>
            <AppText style={styles.priceTag}>₹298</AppText>
          </View>
        </View>

        {/* WORKFLOW SHORTCUT TILES */}
        <View style={styles.shortcutsRow}>
          {/* STEP CHECKLIST */}
          <TouchableOpacity
            style={styles.shortcutTile}
            onPress={() =>
              navigation.navigate(Routes.VENDOR_ACTIVITY_UPDATE as any, {
                bookingId: 'WASH-JOB-9842',
              })
            }
            activeOpacity={0.85}
          >
            <ListChecks size={20} color="#0F172A" />
            <AppText style={styles.shortcutTitle}>Activity Steps</AppText>
            <AppText style={styles.shortcutSub}>5/8 Completed</AppText>
          </TouchableOpacity>

          {/* ADD-ON CONFIRMATION */}
          <TouchableOpacity
            style={styles.shortcutTile}
            onPress={() =>
              navigation.navigate(Routes.VENDOR_ADDON_CONFIRMATION as any, {
                bookingId: 'WASH-JOB-9842',
              })
            }
            activeOpacity={0.85}
          >
            <Sparkles size={20} color="#D97706" />
            <AppText style={styles.shortcutTitle}>Add-on Upgrades</AppText>
            <AppText style={styles.shortcutSub}>1 Active Add-on</AppText>
          </TouchableOpacity>
        </View>

        {/* REPORT ISSUE LINK */}
        <TouchableOpacity
          style={styles.issueReportBox}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_ISSUE_REPORT as any, {
              bookingId: 'WASH-JOB-9842',
            })
          }
          activeOpacity={0.8}
        >
          <AlertCircle size={16} color="#DC2626" />
          <AppText style={styles.issueReportText}>
            Water shortage / Equipment problem? Report issue
          </AppText>
        </TouchableOpacity>

        {/* FINISH WASH & TAKE AFTER PHOTOS BUTTON */}
        <TouchableOpacity
          style={styles.finishWashBtn}
          onPress={handleFinishWash}
          activeOpacity={0.85}
        >
          <Camera size={20} color="#0F172A" />
          <AppText style={styles.finishWashBtnText}>
            Wash Done • Take After Photos
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
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  activePillText: {
    fontSize: 10,
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  timerHeroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  timerTag: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  timerClock: {
    fontSize: 38,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFC80A',
    marginVertical: 4,
  },
  etaSub: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#CBD5E1',
    marginBottom: 12,
  },
  pauseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  pauseBtnText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#F8FAFC',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bikeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleName: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  customerName: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  priceTag: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  shortcutTile: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  shortcutTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 8,
  },
  shortcutSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  issueReportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    gap: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  issueReportText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#DC2626',
  },
  finishWashBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  finishWashBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
