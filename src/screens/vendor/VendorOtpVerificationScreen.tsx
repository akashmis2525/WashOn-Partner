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
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
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

  const phoneNumber = route.params?.phoneNumber || '+91 81206 52523';

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

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter the full 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Demo validation or API check
      if (enteredOtp === '123456' || enteredOtp.length === 6) {
        // Navigate to Screen V007: Vendor Profile Setup
        navigation.navigate(Routes.VENDOR_PROFILE_SETUP as never);
      } else {
        setErrorMessage('Invalid OTP. Please check the code and try again.');
      }
    }, 600);
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setErrorMessage('');
    inputRefs.current[0]?.focus();
    Alert.alert('OTP Sent', `A new 6-digit code has been sent to ${phoneNumber}`);
  };

  const handleChangePhone = () => {
    navigation.goBack();
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'Partner Help',
      'If you have not received the OTP SMS within 1 minute, please contact WashOn Partner Support at +91 81206 52523.'
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

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

          <TouchableOpacity
            onPress={handleNeedHelp}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <AppText style={styles.needHelpText}>Need Help?</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* BRAND BADGE */}
          <View style={styles.brandBadge}>
            <View style={styles.shieldCircle}>
              <ShieldCheck size={20} color="#0F172A" />
            </View>
            <AppText style={styles.badgeText}>SECURE VERIFICATION</AppText>
          </View>

          {/* HEADINGS */}
          <AppText style={styles.title}>Enter Verification Code</AppText>
          <AppText style={styles.subtitle}>
            We've sent a 6-digit SMS verification code to
          </AppText>

          {/* PHONE ROW WITH CHANGE OPTION */}
          <View style={styles.phoneContainer}>
            <AppText style={styles.phoneNumberText}>{phoneNumber}</AppText>
            <TouchableOpacity
              style={styles.changePhoneButton}
              onPress={handleChangePhone}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Edit2 size={13} color="#D97706" style={{ marginRight: 4 }} />
              <AppText style={styles.changePhoneText}>Change</AppText>
            </TouchableOpacity>
          </View>

          {/* 6-DIGIT OTP BOXES */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => {
              const isFilled = digit.length > 0;
              return (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpBox,
                    isFilled && styles.otpBoxFilled,
                    errorMessage ? styles.otpBoxError : null,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  textAlign="center"
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              );
            })}
          </View>

          {/* INLINE ERROR */}
          {errorMessage ? (
            <AppText style={styles.errorText}>{errorMessage}</AppText>
          ) : null}

          {/* RESEND OTP SECTION */}
          <View style={styles.resendSection}>
            <AppText style={styles.resendLabel}>Didn't receive code? </AppText>
            {canResend ? (
              <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                <View style={styles.resendActionRow}>
                  <RotateCcw size={14} color="#0F172A" style={{ marginRight: 4 }} />
                  <AppText style={styles.resendActionText}>Resend OTP</AppText>
                </View>
              </TouchableOpacity>
            ) : (
              <AppText style={styles.timerText}>
                Resend in <AppText style={styles.timerHighlight}>00:{timer < 10 ? `0${timer}` : timer}</AppText>
              </AppText>
            )}
          </View>

          {/* DEMO MODE TIP */}
          <View style={styles.demoTipBox}>
            <CheckCircle2 size={15} color="#059669" style={{ marginRight: 6 }} />
            <AppText style={styles.demoTipText}>
              Demo Mode: Enter <AppText style={styles.demoTipBold}>123456</AppText> to verify instantly
            </AppText>
          </View>

          {/* VERIFY BUTTON */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              isLoading && { opacity: 0.8 },
            ]}
            onPress={handleVerify}
            activeOpacity={0.85}
            disabled={isLoading}
          >
            <AppText style={styles.verifyButtonText}>
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </AppText>
            <ArrowRight size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  needHelpText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 5,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
    gap: 6,
  },
  shieldCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 1,
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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 24,
    gap: 8,
  },
  phoneNumberText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  changePhoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  changePhoneText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  otpBoxFilled: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  otpBoxError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
    marginBottom: 10,
    textAlign: 'center',
  },
  resendSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  resendLabel: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  resendActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendActionText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  timerHighlight: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  demoTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginVertical: 14,
  },
  demoTipText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#065F46',
  },
  demoTipBold: {
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    marginTop: 10,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
