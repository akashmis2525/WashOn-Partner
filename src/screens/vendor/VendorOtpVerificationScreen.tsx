import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  Dimensions,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Edit2,
  CheckCircle2,
  Zap,
  Sparkles,
  Lock,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorOtpNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_OTP_VERIFY
>;

type VendorOtpRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.VENDOR_OTP_VERIFY
>;

export const VendorOtpVerificationScreen: React.FC = () => {
  const navigation = useNavigation<VendorOtpNavProp>();
  const route = useRoute<VendorOtpRouteProp>();

  const phoneNumber = route.params?.phoneNumber || '+91 98260 12345';

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 1) {
      // Pasted multi-digit OTP
      const digits = cleaned.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      if (digits.length === 6) {
        inputRefs.current[5]?.focus();
      }
      return;
    }

    newOtp[index] = cleaned;
    setOtp(newOtp);
    if (errorMessage) setErrorMessage('');

    // Auto-focus next input
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleQuickFill = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
    setErrorMessage('');
    inputRefs.current[5]?.focus();
  };

  const handleVerify = () => {
    const enteredCode = otp.join('');
    if (enteredCode.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to Screen V007: Vendor Profile Setup
      navigation.navigate(Routes.VENDOR_PROFILE_SETUP as any);
    }, 600);
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setErrorMessage('');
    Alert.alert('OTP Resent', `A new 6-digit code has been sent to ${phoneNumber}`);
    inputRefs.current[0]?.focus();
  };

  const handleEditPhone = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* TOP HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonCircle}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.badge}>
            <Lock size={12} color="#059669" />
            <Text style={styles.badgeText}>SMS VERIFICATION</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* RAPIDO HIGH-IMPACT HEADINGS */}
          <View style={styles.titleSection}>
            <View style={styles.tagBadge}>
              <Zap size={12} color="#0F172A" />
              <Text style={styles.tagBadgeText}>STEP 2 OF 2</Text>
            </View>
            <Text style={styles.mainTitle}>
              Enter <Text style={styles.highlightYellow}>Verification Code</Text>
            </Text>
            
            {/* PHONE NUMBER PILL */}
            <View style={styles.phonePillRow}>
              <Text style={styles.phoneLabel}>Sent to</Text>
              <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
              <TouchableOpacity onPress={handleEditPhone} style={styles.editBtn}>
                <Edit2 size={12} color="#D97706" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* OTP INPUT BOXES */}
          <View style={styles.otpCard}>
            <View style={styles.otpInputsRow}>
              {otp.map((digit, index) => {
                const isFocused = otp.findIndex((d) => d === '') === index || (otp.every((d) => d !== '') && index === 5);
                const hasValue = !!digit;

                return (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={[
                      styles.otpBox,
                      hasValue && styles.otpBoxFilled,
                      isFocused && styles.otpBoxFocused,
                      !!errorMessage && styles.otpBoxError,
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(val) => handleOtpChange(val, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                    selectTextOnFocus
                  />
                );
              })}
            </View>

            {/* ERROR MESSAGE */}
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            {/* DEMO FILL BUTTON */}
            <TouchableOpacity style={styles.demoFillBtn} onPress={handleQuickFill}>
              <Zap size={13} color="#D97706" />
              <Text style={styles.demoFillText}>Quick Demo Fill OTP: 123456</Text>
            </TouchableOpacity>

            {/* RESEND TIMER ROW */}
            <View style={styles.resendRow}>
              {canResend ? (
                <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
                  <RotateCcw size={15} color="#0F172A" />
                  <Text style={styles.resendActiveText}>Resend Code via SMS</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.timerWrapper}>
                  <Text style={styles.resendDisabledText}>Resend code in </Text>
                  <Text style={styles.timerCountText}>{timer}s</Text>
                </View>
              )}
            </View>

            {/* VERIFY CTA */}
            <TouchableOpacity
              style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
              onPress={handleVerify}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'VERIFYING CODE...' : 'VERIFY & CONTINUE'}
              </Text>
              <ArrowRight size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>

          {/* SECURITY TRUST BADGE */}
          <View style={styles.securityBadge}>
            <ShieldCheck size={16} color="#059669" />
            <Text style={styles.securityText}>
              Verified partner accounts enjoy priority booking assignments.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  backButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  titleSection: {
    marginBottom: 20,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  highlightYellow: {
    color: '#D97706',
  },
  phonePillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  phoneLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
  },
  phoneNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  editText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D97706',
  },
  otpCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  otpInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginVertical: 10,
  },
  otpBox: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  otpBoxFilled: {
    borderColor: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFocused: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFBEB',
  },
  otpBoxError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFBEB',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginVertical: 6,
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  resendRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  resendActiveText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendDisabledText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  timerCountText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  primaryButton: {
    height: 52,
    backgroundColor: '#FFC80A',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  securityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
});
