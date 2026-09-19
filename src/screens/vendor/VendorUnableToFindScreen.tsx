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
  AlertTriangle,
  Phone,
  MessageSquare,
  Clock,
  Headphones,
  CheckCircle2,
  Circle,
  XCircle,
  HelpCircle,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_UNABLE_TO_FIND
>;

const ISSUES_LIST = [
  { id: '1', label: 'Wrong GPS Pin / Unable to locate building' },
  { id: '2', label: 'Customer not answering calls or messages' },
  { id: '3', label: 'Security gate access denied / no entry' },
  { id: '4', label: 'No parking space or water source available' },
  { id: '5', label: 'Customer asked to reschedule or cancel' },
];

export const VendorUnableToFindScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [selectedIssue, setSelectedIssue] = useState('2');
  const [waitTimer, setWaitTimer] = useState<number>(300); // 5 mins wait timer

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleRaiseDispute = () => {
    Alert.alert(
      'Issue Logged with Support',
      'Our partner support executive has been assigned. You will receive a callback within 2 minutes or automatic cancellation fee credit if customer does not respond.',
      [
        {
          text: 'Back to Dashboard',
          onPress: () =>
            navigation.navigate(Routes.VENDOR_DASHBOARD as any, {
              initialOnline: true,
            }),
        },
      ]
    );
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

        <View style={styles.badge}>
          <AppText style={styles.badgeText}>CUSTOMER HELP</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircleOuter}>
            <View style={styles.iconCircleInner}>
              <HelpCircle size={40} color="#DC2626" />
            </View>
          </View>

          <AppText style={styles.title}>Unable to Find Customer?</AppText>
          <AppText style={styles.subtitle}>
            Please select the issue you are facing at the customer's location.
          </AppText>
        </View>

        {/* 5-MINUTE MANDATORY WAIT TIMER */}
        <View style={styles.timerCard}>
          <View style={styles.timerHeaderRow}>
            <Clock size={16} color="#D97706" />
            <AppText style={styles.timerTitle}>Mandatory Wait Timer</AppText>
          </View>
          <AppText style={styles.timerClock}>{formatTimer(waitTimer)}</AppText>
          <AppText style={styles.timerSub}>
            Platform policy requires a 5-minute wait window before order cancellation without penalty.
          </AppText>
        </View>

        {/* ISSUES SELECTION LIST */}
        <View style={styles.issuesList}>
          {ISSUES_LIST.map((item) => {
            const isSelected = selectedIssue === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.issueCard,
                  isSelected && styles.issueCardSelected,
                ]}
                onPress={() => setSelectedIssue(item.id)}
                activeOpacity={0.88}
              >
                <AppText
                  style={[
                    styles.issueText,
                    isSelected && styles.issueTextSelected,
                  ]}
                >
                  {item.label}
                </AppText>
                {isSelected ? (
                  <CheckCircle2 size={18} color="#FFC80A" />
                ) : (
                  <Circle size={18} color="#CBD5E1" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CONTACT ACTIONS */}
        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Alert.alert('Call', '+91 98260 XXXXX')}
            activeOpacity={0.8}
          >
            <Phone size={15} color="#0F172A" />
            <AppText style={styles.contactBtnText}>Call Customer</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Alert.alert('Chat', 'Opening chat...')}
            activeOpacity={0.8}
          >
            <MessageSquare size={15} color="#0F172A" />
            <AppText style={styles.contactBtnText}>Chat</AppText>
          </TouchableOpacity>
        </View>

        {/* REPORT ISSUE / RAISE DISPUTE */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={handleRaiseDispute}
          activeOpacity={0.85}
        >
          <Headphones size={18} color="#0F172A" />
          <AppText style={styles.reportButtonText}>
            Contact Support & Cancel (with Fee)
          </AppText>
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
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircleOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconCircleInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: 12,
  },
  timerCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  timerTitle: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#92400E',
  },
  timerClock: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginVertical: 4,
  },
  timerSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#B45309',
    textAlign: 'center',
  },
  issuesList: {
    gap: 8,
    marginBottom: 16,
  },
  issueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  issueCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
  },
  issueText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
    flex: 1,
    marginRight: 8,
  },
  issueTextSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    gap: 6,
  },
  contactBtnText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  reportButton: {
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
  reportButtonText: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
