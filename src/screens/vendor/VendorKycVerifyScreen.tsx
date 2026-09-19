import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Camera,
  UploadCloud,
  CheckCircle2,
  FileCheck,
  Info,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_KYC_VERIFY
>;

type DocType = 'aadhaar' | 'pan';

export const VendorKycVerifyScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [docType, setDocType] = useState<DocType>('aadhaar');
  const [docNumber, setDocNumber] = useState('');
  const [frontDocUri, setFrontDocUri] = useState<string | null>(
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80'
  );
  const [backDocUri, setBackDocUri] = useState<string | null>(null);
  const [selfieUri, setSelfieUri] = useState<string | null>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  );
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUploadDoc = (side: 'front' | 'back') => {
    Alert.alert('Upload Document', `Choose ${side.toUpperCase()} photo of your ${docType.toUpperCase()}`, [
      {
        text: 'Take Photo',
        onPress: () => {
          const sample =
            side === 'front'
              ? 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80';
          if (side === 'front') setFrontDocUri(sample);
          else setBackDocUri(sample);
        },
      },
      {
        text: 'Upload from Gallery',
        onPress: () => {
          const sample =
            side === 'front'
              ? 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80'
              : 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80';
          if (side === 'front') setFrontDocUri(sample);
          else setBackDocUri(sample);
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleCaptureSelfie = () => {
    Alert.alert('Live Selfie Verification', 'Position your face inside the frame in good lighting', [
      {
        text: 'Capture Selfie',
        onPress: () =>
          setSelfieUri(
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
          ),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = () => {
    if (!docNumber.trim() && docNumber.length < 10) {
      setErrorMsg(`Please enter a valid ${docType === 'aadhaar' ? '12-digit Aadhaar' : '10-digit PAN'} number`);
      return;
    }
    if (!frontDocUri) {
      setErrorMsg('Please upload the front image of your ID document');
      return;
    }
    if (!selfieUri) {
      setErrorMsg('Please take a live selfie for identity matching');
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg('Please accept KYC terms & verification consent');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to Screen V010: Verification Pending
      navigation.navigate(Routes.VENDOR_VERIFICATION_PENDING as never);
    }, 800);
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

          <View style={styles.stepBadge}>
            <AppText style={styles.stepBadgeText}>STEP 3 OF 3</AppText>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* TITLE SECTION */}
          <View style={styles.titleSection}>
            <View style={styles.badgeRow}>
              <View style={styles.miniIconBadge}>
                <ShieldCheck size={13} color="#0F172A" />
              </View>
              <AppText style={styles.badgeLabel}>GOVT ID & VERIFICATION</AppText>
            </View>
            <AppText style={styles.title}>KYC Verification</AppText>
            <AppText style={styles.subtitle}>
              Upload government ID and a live selfie to activate your WashOn partner wallet & job allocations.
            </AppText>
          </View>

          {/* DOCUMENT TYPE SELECTOR TABS */}
          <View style={styles.docTypeTabs}>
            <TouchableOpacity
              style={[
                styles.docTab,
                docType === 'aadhaar' && styles.docTabActive,
              ]}
              onPress={() => {
                setDocType('aadhaar');
                setDocNumber('');
              }}
              activeOpacity={0.8}
            >
              <FileCheck
                size={16}
                color={docType === 'aadhaar' ? '#0F172A' : '#64748B'}
              />
              <AppText
                style={[
                  styles.docTabText,
                  docType === 'aadhaar' && styles.docTabTextActive,
                ]}
              >
                Aadhaar Card
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.docTab,
                docType === 'pan' && styles.docTabActive,
              ]}
              onPress={() => {
                setDocType('pan');
                setDocNumber('');
              }}
              activeOpacity={0.8}
            >
              <CreditCard
                size={16}
                color={docType === 'pan' ? '#0F172A' : '#64748B'}
              />
              <AppText
                style={[
                  styles.docTabText,
                  docType === 'pan' && styles.docTabTextActive,
                ]}
              >
                PAN Card
              </AppText>
            </TouchableOpacity>
          </View>

          {/* DOCUMENT NUMBER INPUT */}
          <View style={styles.inputGroup}>
            <AppText style={styles.label}>
              {docType === 'aadhaar' ? 'Aadhaar Number' : 'PAN Card Number'}
            </AppText>
            <View style={styles.inputContainer}>
              <CreditCard size={18} color="#64748B" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.input}
                placeholder={
                  docType === 'aadhaar'
                    ? 'XXXX XXXX 4920'
                    : 'ABCDE1234F'
                }
                placeholderTextColor="#94A3B8"
                value={docNumber}
                onChangeText={setDocNumber}
                autoCapitalize={docType === 'pan' ? 'characters' : 'none'}
                keyboardType={docType === 'aadhaar' ? 'number-pad' : 'default'}
                maxLength={docType === 'aadhaar' ? 14 : 10}
              />
            </View>
          </View>

          {/* ID PROOF UPLOAD (FRONT & BACK) */}
          <View style={styles.sectionBlock}>
            <AppText style={styles.sectionTitle}>
              Upload {docType === 'aadhaar' ? 'Aadhaar' : 'PAN'} Photo
            </AppText>
            <View style={styles.uploadRow}>
              {/* FRONT SIDE */}
              <TouchableOpacity
                style={[
                  styles.uploadBox,
                  frontDocUri ? styles.uploadBoxDone : null,
                ]}
                onPress={() => handleUploadDoc('front')}
                activeOpacity={0.8}
              >
                {frontDocUri ? (
                  <View style={styles.uploadedPreviewContainer}>
                    <Image
                      source={{ uri: frontDocUri }}
                      style={styles.uploadedDocImage}
                    />
                    <View style={styles.doneCheckBadge}>
                      <CheckCircle2 size={16} color="#059669" />
                    </View>
                    <AppText style={styles.uploadDocLabelDone}>Front Side</AppText>
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <UploadCloud size={24} color="#64748B" />
                    <AppText style={styles.uploadBoxTitle}>Front Side</AppText>
                    <AppText style={styles.uploadBoxSub}>Tap to upload</AppText>
                  </View>
                )}
              </TouchableOpacity>

              {/* BACK SIDE (FOR AADHAAR) */}
              <TouchableOpacity
                style={[
                  styles.uploadBox,
                  backDocUri ? styles.uploadBoxDone : null,
                ]}
                onPress={() => handleUploadDoc('back')}
                activeOpacity={0.8}
              >
                {backDocUri ? (
                  <View style={styles.uploadedPreviewContainer}>
                    <Image
                      source={{ uri: backDocUri }}
                      style={styles.uploadedDocImage}
                    />
                    <View style={styles.doneCheckBadge}>
                      <CheckCircle2 size={16} color="#059669" />
                    </View>
                    <AppText style={styles.uploadDocLabelDone}>Back Side</AppText>
                  </View>
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <UploadCloud size={24} color="#64748B" />
                    <AppText style={styles.uploadBoxTitle}>Back Side</AppText>
                    <AppText style={styles.uploadBoxSub}>Tap to upload</AppText>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* SELFIE VERIFICATION */}
          <View style={styles.sectionBlock}>
            <View style={styles.selfieHeaderRow}>
              <AppText style={styles.sectionTitle}>Selfie Verification</AppText>
              <View style={styles.instantBadge}>
                <AppText style={styles.instantBadgeText}>Face Match</AppText>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.selfieCard,
                selfieUri ? styles.selfieCardDone : null,
              ]}
              onPress={handleCaptureSelfie}
              activeOpacity={0.85}
            >
              {selfieUri ? (
                <View style={styles.selfieContentRow}>
                  <Image source={{ uri: selfieUri }} style={styles.selfieAvatar} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <CheckCircle2 size={16} color="#059669" />
                      <AppText style={styles.selfieDoneTitle}>Selfie Captured</AppText>
                    </View>
                    <AppText style={styles.selfieDoneSub}>
                      Live photo matched with ID document
                    </AppText>
                  </View>
                  <TouchableOpacity
                    style={styles.retakeBtn}
                    onPress={handleCaptureSelfie}
                  >
                    <AppText style={styles.retakeBtnText}>Retake</AppText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.selfiePlaceholder}>
                  <View style={styles.selfieCameraCircle}>
                    <Camera size={22} color="#0F172A" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <AppText style={styles.selfiePromptTitle}>
                      Take a Live Selfie
                    </AppText>
                    <AppText style={styles.selfiePromptSub}>
                      Ensure good lighting without caps or sunglasses
                    </AppText>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* CONSENT / TERMS */}
          <TouchableOpacity
            style={styles.consentRow}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.checkbox,
                agreedToTerms && styles.checkboxActive,
              ]}
            >
              {agreedToTerms && <CheckCircle2 size={16} color="#0F172A" />}
            </View>
            <AppText style={styles.consentText}>
              I authorize WashOn to securely verify my Aadhaar/PAN details with government databases for partner background check.
            </AppText>
          </TouchableOpacity>

          {/* ERROR MSG */}
          {errorMsg ? (
            <View style={styles.errorBanner}>
              <Info size={14} color="#EF4444" style={{ marginRight: 6 }} />
              <AppText style={styles.errorText}>{errorMsg}</AppText>
            </View>
          ) : null}

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && { opacity: 0.8 },
            ]}
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={isSubmitting}
          >
            <AppText style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting Application...' : 'Submit for Verification'}
            </AppText>
            <ArrowRight size={20} color="#0F172A" />
          </TouchableOpacity>
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
  docTypeTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    gap: 6,
  },
  docTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  docTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  docTabText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#64748B',
  },
  docTabTextActive: {
    color: '#0F172A',
    fontFamily: Typography.fontFamily.bold,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  sectionBlock: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadBox: {
    flex: 1,
    height: 120,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  uploadBoxDone: {
    borderColor: '#059669',
    borderStyle: 'solid',
    backgroundColor: '#F0FDF4',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  uploadBoxTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#334155',
    marginTop: 6,
  },
  uploadBoxSub: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    marginTop: 2,
  },
  uploadedPreviewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedDocImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  doneCheckBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  uploadDocLabelDone: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selfieHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  instantBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  instantBadgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  selfieCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 14,
  },
  selfieCardDone: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  selfiePlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selfieCameraCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfiePromptTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  selfiePromptSub: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  selfieContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selfieAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#059669',
  },
  selfieDoneTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  selfieDoneSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#047857',
    marginTop: 2,
  },
  retakeBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  retakeBtnText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#065F46',
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 18,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFC80A',
  },
  consentText: {
    flex: 1,
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 16,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
  },
  submitButton: {
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
  submitButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
