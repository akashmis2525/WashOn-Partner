import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  IndianRupee,
  Clock,
  Star,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorLoginNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_LOGIN
>;

export const VendorLoginScreen: React.FC = () => {
  const navigation = useNavigation<VendorLoginNavProp>();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePhoneChange = (text: string) => {
    // Only numbers, max 10 digits
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setMobileNumber(cleaned);
    if (errorMessage) setErrorMessage('');
  };

  const validateIndianMobile = (num: string) => {
    if (!num || num.length !== 10) {
      return 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!/^[6-9]\d{9}$/.test(num)) {
      return 'Mobile number must start with 6, 7, 8, or 9';
    }
    return '';
  };

  const handleContinue = () => {
    const error = validateIndianMobile(mobileNumber);
    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate(Routes.VENDOR_OTP_VERIFY, {
        phoneNumber: `+91 ${mobileNumber}`,
      });
    }, 600);
  };

  const handleGoogleLogin = () => {
    Alert.alert(
      'Google Login',
      'Signing in with your verified Google Partner account...'
    );
  };

  const handleNeedHelp = () => {
    Alert.alert(
      'WashOn Partner Helpline',
      'Need help logging in? Call our 24/7 partner support at +91 81206 52523 or email partner@washon.in'
    );
  };

  const handleTerms = () => {
    Alert.alert('Terms of Service', 'Opening WashOn Partner Terms of Service...');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy Policy', 'Opening WashOn Partner Privacy Policy...');
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* BRANDING */}
          <View style={styles.brandSection}>
            <View style={styles.logoIconContainer}>
              <View style={styles.carBody}>
                <View style={styles.carRoof} />
                <View style={styles.carBubble1} />
                <View style={styles.carBubble2} />
                <View style={styles.carBubble3} />
                <View style={styles.dropIcon}>
                  <View style={styles.innerDrop} />
                </View>
              </View>
            </View>

            <AppText style={styles.brandTitle}>
              Wash<AppText style={styles.brandTitleYellow}>On</AppText>
            </AppText>
            <AppText style={styles.vendorAppBadge}>VENDOR APP</AppText>

            <AppText style={styles.welcomeTitle}>Welcome Back!</AppText>
            <AppText style={styles.welcomeSubtitle}>
              Login to your vendor account and start earning with WashOn.
            </AppText>
          </View>

          {/* HERO GRAPHIC CARD WITH WASHERMAN & BENEFITS */}
          <View style={styles.heroCard}>
            {/* LEFT NOTE */}
            <View style={styles.leftNoteBadge}>
              <AppText style={styles.leftNoteText}>Clean</AppText>
              <AppText style={styles.leftNoteText}>Roads</AppText>
              <AppText style={styles.leftNoteHighlight}>Brighter</AppText>
              <AppText style={styles.leftNoteHighlight}>Tomorrows</AppText>
            </View>

            {/* RIGHT BENEFITS CARD */}
            <View style={styles.benefitsCard}>
              <View style={styles.benefitRow}>
                <View style={styles.benefitIconBg}>
                  <IndianRupee size={11} color="#0F172A" />
                </View>
                <AppText style={styles.benefitRowText}>Earn More</AppText>
              </View>
              <View style={styles.benefitRow}>
                <View style={styles.benefitIconBg}>
                  <Clock size={11} color="#0F172A" />
                </View>
                <AppText style={styles.benefitRowText}>Flexible Working</AppText>
              </View>
              <View style={styles.benefitRow}>
                <View style={styles.benefitIconBg}>
                  <Star size={11} color="#0F172A" />
                </View>
                <AppText style={styles.benefitRowText}>Be Your Own Boss</AppText>
              </View>
            </View>

            {/* WASHERMAN CUTOUT */}
            <View style={styles.washermanCutoutBox}>
              <Image
                source={require('../../../assets/vendor_login_cutout.png')}
                style={styles.washermanCutoutImg}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* MOBILE NUMBER INPUT FORM */}
          <View style={styles.formSection}>
            <AppText style={styles.inputLabel}>Mobile Number</AppText>

            <View style={[styles.inputBox, errorMessage ? styles.inputBoxError : null]}>
              {/* COUNTRY CODE PICKER */}
              <View style={styles.countryPicker}>
                <AppText style={styles.flagIcon}>🇮🇳</AppText>
                <AppText style={styles.countryCode}>+91</AppText>
                <ChevronDown size={14} color="#64748B" style={{ marginLeft: 2 }} />
              </View>

              <View style={styles.inputDivider} />

              {/* PHONE INPUT */}
              <TextInput
                style={styles.textInput}
                placeholder="Enter your mobile number"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={handlePhoneChange}
                autoFocus={false}
              />
            </View>

            {/* INLINE ERROR */}
            {errorMessage ? (
              <AppText style={styles.errorText}>{errorMessage}</AppText>
            ) : null}

            {/* CONTINUE BUTTON */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                isLoading && { opacity: 0.8 },
              ]}
              onPress={handleContinue}
              activeOpacity={0.85}
              disabled={isLoading}
            >
              <AppText style={styles.continueButtonText}>
                {isLoading ? 'Sending OTP...' : 'Continue'}
              </AppText>
              <ArrowRight size={20} color="#0F172A" />
            </TouchableOpacity>

            {/* OR DIVIDER */}
            <View style={styles.orDividerRow}>
              <View style={styles.orLine} />
              <AppText style={styles.orText}>OR</AppText>
              <View style={styles.orLine} />
            </View>

            {/* GOOGLE SIGN IN */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.75}
            >
              {/* GOOGLE 'G' ICON SIMULATED */}
              <View style={styles.googleIconCircle}>
                <AppText style={styles.googleIconLetter}>G</AppText>
              </View>
              <AppText style={styles.googleButtonText}>Continue with Google</AppText>
            </TouchableOpacity>

            {/* TERMS & PRIVACY */}
            <View style={styles.legalSection}>
              <AppText style={styles.legalText}>
                By continuing, you agree to our{'\n'}
                <AppText style={styles.legalLink} onPress={handleTerms}>
                  Terms of Service
                </AppText>{' '}
                and{' '}
                <AppText style={styles.legalLink} onPress={handlePrivacy}>
                  Privacy Policy
                </AppText>
              </AppText>

              <AppText style={styles.footerTagline}>
                CLEANER ROADS • BRIGHTER TOMORROW
              </AppText>
            </View>
          </View>
        </ScrollView>
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
    paddingBottom: 4,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 30,
  },
  brandSection: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
  },
  logoIconContainer: {
    width: 50,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  carBody: {
    width: 36,
    height: 15,
    backgroundColor: '#0F172A',
    borderRadius: 6,
    position: 'relative',
  },
  carRoof: {
    position: 'absolute',
    top: -8,
    left: 7,
    width: 22,
    height: 10,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  carBubble1: {
    position: 'absolute',
    top: -13,
    left: 14,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFC80A',
  },
  carBubble2: {
    position: 'absolute',
    top: -10,
    left: 21,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFC80A',
  },
  carBubble3: {
    position: 'absolute',
    top: -15,
    left: 18,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFC80A',
  },
  dropIcon: {
    position: 'absolute',
    bottom: -3,
    right: 3,
    width: 11,
    height: 14,
    backgroundColor: '#FFC80A',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    transform: [{ rotate: '45deg' }],
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  innerDrop: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
    marginTop: 2.5,
    marginLeft: 2.5,
  },
  brandTitle: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  brandTitleYellow: {
    color: '#FFC80A',
  },
  vendorAppBadge: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 2.5,
    marginTop: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginTop: 10,
  },
  welcomeSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  heroCard: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNoteBadge: {
    position: 'absolute',
    top: 14,
    left: 12,
    zIndex: 5,
  },
  leftNoteText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E293B',
    transform: [{ rotate: '-8deg' }],
  },
  leftNoteHighlight: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    transform: [{ rotate: '-8deg' }],
  },
  benefitsCard: {
    position: 'absolute',
    top: 14,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    gap: 6,
    zIndex: 5,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  benefitIconBg: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitRowText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  washermanCutoutBox: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  washermanCutoutImg: {
    width: '100%',
    height: '100%',
  },
  formSection: {
    marginTop: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  inputBoxError: {
    borderColor: '#EF4444',
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  flagIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
  },
  inputDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
    height: '100%',
  },
  errorText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 14,
    gap: 8,
    marginTop: 14,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  orText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 1,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  googleIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconLetter: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  googleButtonText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  legalSection: {
    alignItems: 'center',
    marginTop: 14,
    gap: 10,
  },
  legalText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 15,
  },
  legalLink: {
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  footerTagline: {
    fontSize: 8.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 2,
    marginTop: 4,
  },
});
