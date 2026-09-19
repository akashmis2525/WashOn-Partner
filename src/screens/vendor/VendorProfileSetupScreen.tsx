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
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  MapPin,
  Camera,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_PROFILE_SETUP
>;

const CITIES = [
  'Indore',
  'Bhopal',
  'Mumbai',
  'Delhi NCR',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];

export const VendorProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState('Indore');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handlePickPhoto = () => {
    // In production, integrate ImagePicker. For quick demo, set a professional avatar
    Alert.alert('Upload Photo', 'Choose profile photo source', [
      {
        text: 'Take Photo',
        onPress: () =>
          setPhotoUri(
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
          ),
      },
      {
        text: 'Choose from Gallery',
        onPress: () =>
          setPhotoUri(
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
          ),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }
    if (email.trim() && !email.includes('@')) {
      errs.email = 'Please enter a valid email address';
    }
    if (!selectedCity) {
      errs.city = 'Please select your operating city';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    // Navigate to Screen V008: Vendor Type Selection
    navigation.navigate(Routes.VENDOR_TYPE_SELECTION as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
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
            <AppText style={styles.stepBadgeText}>STEP 1 OF 2</AppText>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* TITLE & SUBTITLE */}
          <View style={styles.titleSection}>
            <View style={styles.badgeRow}>
              <View style={styles.miniIconBadge}>
                <Sparkles size={14} color="#0F172A" />
              </View>
              <AppText style={styles.badgeLabel}>PARTNER ONBOARDING</AppText>
            </View>
            <AppText style={styles.title}>Create Vendor Profile</AppText>
            <AppText style={styles.subtitle}>
              Set up your partner account to start receiving nearby wash bookings.
            </AppText>
          </View>

          {/* PROFILE PHOTO UPLOAD */}
          <View style={styles.photoContainer}>
            <TouchableOpacity
              style={styles.photoWrapper}
              onPress={handlePickPhoto}
              activeOpacity={0.8}
            >
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.photoImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <User size={42} color="#94A3B8" />
                </View>
              )}
              <View style={styles.cameraBadge}>
                <Camera size={16} color="#0F172A" />
              </View>
            </TouchableOpacity>
            <AppText style={styles.photoHint}>
              {photoUri ? 'Tap to change photo' : 'Upload Profile Photo'}
            </AppText>
          </View>

          {/* FORM FIELDS */}
          <View style={styles.form}>
            {/* FULL NAME */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                Full Name <AppText style={styles.requiredStar}>*</AppText>
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.fullName ? styles.inputError : null,
                ]}
              >
                <User size={18} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Ramesh Sharma"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={(val) => {
                    setFullName(val);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                />
              </View>
              {errors.fullName ? (
                <AppText style={styles.errorText}>{errors.fullName}</AppText>
              ) : null}
            </View>

            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                Email Address <AppText style={styles.optionalText}>(Optional)</AppText>
              </AppText>
              <View
                style={[
                  styles.inputContainer,
                  errors.email ? styles.inputError : null,
                ]}
              >
                <Mail size={18} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. ramesh.partner@gmail.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                />
              </View>
              {errors.email ? (
                <AppText style={styles.errorText}>{errors.email}</AppText>
              ) : null}
            </View>

            {/* OPERATING CITY */}
            <View style={styles.inputGroup}>
              <AppText style={styles.label}>
                Operating City <AppText style={styles.requiredStar}>*</AppText>
              </AppText>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  errors.city ? styles.inputError : null,
                ]}
                onPress={() => setCityModalVisible(true)}
                activeOpacity={0.8}
              >
                <MapPin size={18} color="#64748B" style={styles.inputIcon} />
                <AppText
                  style={[
                    styles.cityValueText,
                    !selectedCity && { color: '#94A3B8' },
                  ]}
                >
                  {selectedCity || 'Select your city'}
                </AppText>
                <ChevronDown size={18} color="#64748B" />
              </TouchableOpacity>
              {errors.city ? (
                <AppText style={styles.errorText}>{errors.city}</AppText>
              ) : null}
            </View>
          </View>

          {/* CONTINUE BUTTON */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <AppText style={styles.continueButtonText}>Continue</AppText>
            <ArrowRight size={20} color="#0F172A" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* CITY SELECTION MODAL */}
      <Modal
        visible={cityModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCityModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>Select Operating City</AppText>
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              {CITIES.map((city) => {
                const isSelected = selectedCity === city;
                return (
                  <TouchableOpacity
                    key={city}
                    style={[
                      styles.cityItem,
                      isSelected && styles.cityItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedCity(city);
                      setCityModalVisible(false);
                      if (errors.city) setErrors({ ...errors, city: '' });
                    }}
                  >
                    <AppText
                      style={[
                        styles.cityItemText,
                        isSelected && styles.cityItemTextSelected,
                      ]}
                    >
                      {city}
                    </AppText>
                    {isSelected && <Check size={18} color="#0F172A" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingTop: 12,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 20,
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
  photoContainer: {
    alignItems: 'center',
    marginVertical: 14,
  },
  photoWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFC80A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  photoImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  photoHint: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#64748B',
  },
  form: {
    gap: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  inputGroup: {},
  label: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#0F172A',
    marginBottom: 6,
  },
  requiredStar: {
    color: '#EF4444',
  },
  optionalText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  cityValueText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#0F172A',
  },
  inputError: {
    borderColor: '#EF4444',
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
    paddingVertical: 15,
    gap: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  modalHeader: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  cityItemSelected: {
    backgroundColor: '#FEF3C7',
  },
  cityItemText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
  },
  cityItemTextSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
