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
  Text,
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
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  Trash2,
  X,
  RefreshCw,
  CheckCircle2,
  Upload,
} from 'lucide-react-native';
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

const GALLERY_PRESETS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', label: 'Classic Partner' },
  { id: '2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', label: 'Professional' },
  { id: '3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80', label: 'Outdoor' },
  { id: '4', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80', label: 'Casual' },
  { id: '5', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80', label: 'Studio' },
  { id: '6', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80', label: 'Executive' },
];

const CAMERA_POSES = [
  { id: 'cam1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80', label: 'Pose 1: Professional' },
  { id: 'cam2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80', label: 'Pose 2: Formal' },
  { id: 'cam3', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80', label: 'Pose 3: Casual' },
  { id: 'cam4', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80', label: 'Pose 4: Outdoor' },
];

export const VendorProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [fullName, setFullName] = useState('Ramesh Sharma');
  const [email, setEmail] = useState('ramesh.washon@gmail.com');
  const [selectedCity, setSelectedCity] = useState('Indore');
  const [experience, setExperience] = useState('2+ Years');
  const [photoUri, setPhotoUri] = useState<string | null>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  );
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Photo Action Modals (Unified state machine)
  const [photoModalMode, setPhotoModalMode] = useState<'NONE' | 'ACTIONS' | 'CAMERA' | 'GALLERY'>('NONE');
  const [cameraCapturedPreview, setCameraCapturedPreview] = useState<string | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string>('1');
  const [cameraPoseIndex, setCameraPoseIndex] = useState<number>(0);
  const [flashActive, setFlashActive] = useState<boolean>(false);

  const openPhotoPicker = () => {
    setPhotoModalMode('ACTIONS');
  };

  const handleOpenLiveCamera = () => {
    setCameraCapturedPreview(null);
    setPhotoModalMode('CAMERA');
  };

  const handleOpenGallery = () => {
    setPhotoModalMode('GALLERY');
  };

  const handleRemovePhoto = () => {
    setPhotoUri(null);
    setPhotoModalMode('NONE');
  };

  const triggerDeviceFilePicker = () => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target?.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result) {
              setPhotoUri(result);
              setPhotoModalMode('NONE');
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      setPhotoModalMode('GALLERY');
    }
  };

  const captureCameraPhoto = () => {
    setFlashActive(true);
    setTimeout(() => {
      setFlashActive(false);
      setCameraCapturedPreview(CAMERA_POSES[cameraPoseIndex].url);
    }, 150);
  };

  const confirmCameraPhoto = () => {
    if (cameraCapturedPreview) {
      setPhotoUri(cameraCapturedPreview);
    }
    setPhotoModalMode('NONE');
    setCameraCapturedPreview(null);
  };

  const confirmGallerySelection = () => {
    const chosen = GALLERY_PRESETS.find((p) => p.id === selectedGalleryId);
    if (chosen) {
      setPhotoUri(chosen.url);
    }
    setPhotoModalMode('NONE');
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

      {/* TOP HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonCircle}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Partner Setup</Text>
          <Text style={styles.headerSubtitle}>Step 1 of 3</Text>
        </View>

        <View style={styles.badge}>
          <ShieldCheck size={12} color="#059669" />
          <Text style={styles.badgeText}>VERIFIED ID</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* RAPIDO HIGH-IMPACT HEADINGS */}
          <View style={styles.titleSection}>
            <View style={styles.tagBadge}>
              <Zap size={12} color="#0F172A" />
              <Text style={styles.tagBadgeText}>IDENTITY & CITY</Text>
            </View>
            <Text style={styles.mainTitle}>
              Create Vendor <Text style={styles.highlightYellow}>Profile</Text>
            </Text>
            <Text style={styles.subTitle}>
              Fill in your basic information and upload a clear profile photo for customer trust.
            </Text>
          </View>

          {/* AVATAR UPLOAD CIRCLE */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={openPhotoPicker}
              activeOpacity={0.8}
            >
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <User size={38} color="#94A3B8" />
                </View>
              )}
              <View style={styles.cameraBadge}>
                <Camera size={14} color="#0F172A" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={openPhotoPicker}>
              <Text style={styles.avatarHint}>Tap to upload or take photo</Text>
            </TouchableOpacity>
          </View>

          {/* FORM FIELDS */}
          <View style={styles.formCard}>
            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>FULL NAME *</Text>
              <View
                style={[
                  styles.inputRow,
                  !!errors.fullName && styles.inputRowError,
                ]}
              >
                <User size={18} color="#64748B" />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Ramesh Sharma"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                />
              </View>
              {errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}
            </View>

            {/* Email Address */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>EMAIL ADDRESS (OPTIONAL)</Text>
              <View
                style={[
                  styles.inputRow,
                  !!errors.email && styles.inputRowError,
                ]}
              >
                <Mail size={18} color="#64748B" />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. ramesh@gmail.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            {/* City Selector */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>OPERATING CITY *</Text>
              <TouchableOpacity
                style={styles.inputRow}
                onPress={() => setCityModalVisible(true)}
              >
                <MapPin size={18} color="#D97706" />
                <Text style={styles.cityText}>{selectedCity}</Text>
                <ChevronDown size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>CONTINUE</Text>
          <ArrowRight size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* ============================================================ */}
      {/* 1. CUSTOM ULTRA-SLEEK BOTTOM ACTION SHEET */}
      {/* ============================================================ */}
      <Modal visible={photoModalMode === 'ACTIONS'} animationType="fade" transparent={true}>
        <TouchableOpacity
          style={styles.sheetOverlay}
          activeOpacity={1}
          onPress={() => setPhotoModalMode('NONE')}
        >
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeaderRow}>
              <View>
                <Text style={styles.sheetTitle}>Profile Photo</Text>
                <Text style={styles.sheetSub}>Upload or capture a clear frontal picture</Text>
              </View>
              <TouchableOpacity
                style={styles.sheetCloseBtn}
                onPress={() => setPhotoModalMode('NONE')}
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetOptions}>
              {/* Option 1: Live Camera */}
              <TouchableOpacity
                style={styles.sheetOptionCard}
                onPress={handleOpenLiveCamera}
                activeOpacity={0.8}
              >
                <View style={[styles.sheetOptionIconCircle, { backgroundColor: '#FFFBEB' }]}>
                  <Camera size={22} color="#D97706" />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.sheetOptionTitle}>Take Live Photo</Text>
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedBadgeText}>INSTANT</Text>
                    </View>
                  </View>
                  <Text style={styles.sheetOptionSub}>Open camera viewfinder & frame face</Text>
                </View>
                <ChevronDown size={18} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
              </TouchableOpacity>

              {/* Option 2: Choose from Gallery Presets */}
              <TouchableOpacity
                style={styles.sheetOptionCard}
                onPress={handleOpenGallery}
                activeOpacity={0.8}
              >
                <View style={[styles.sheetOptionIconCircle, { backgroundColor: '#EFF6FF' }]}>
                  <ImageIcon size={22} color="#2563EB" />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.sheetOptionTitle}>Choose from Gallery</Text>
                  <Text style={styles.sheetOptionSub}>Select from professional partner portraits</Text>
                </View>
                <ChevronDown size={18} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
              </TouchableOpacity>

              {/* Option 3: Upload from Device Files */}
              <TouchableOpacity
                style={styles.sheetOptionCard}
                onPress={triggerDeviceFilePicker}
                activeOpacity={0.8}
              >
                <View style={[styles.sheetOptionIconCircle, { backgroundColor: '#ECFDF5' }]}>
                  <Upload size={22} color="#059669" />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.sheetOptionTitle}>Browse Device Files</Text>
                  <Text style={styles.sheetOptionSub}>Upload any JPG / PNG directly from storage</Text>
                </View>
                <ChevronDown size={18} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
              </TouchableOpacity>

              {/* Option 4: Remove photo */}
              {photoUri && (
                <TouchableOpacity
                  style={[styles.sheetOptionCard, { borderColor: '#FEE2E2', backgroundColor: '#FEF2F2' }]}
                  onPress={handleRemovePhoto}
                  activeOpacity={0.8}
                >
                  <View style={[styles.sheetOptionIconCircle, { backgroundColor: '#FEE2E2' }]}>
                    <Trash2 size={20} color="#DC2626" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={[styles.sheetOptionTitle, { color: '#DC2626' }]}>Remove Current Photo</Text>
                    <Text style={styles.sheetOptionSub}>Revert to default avatar placeholder</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.sheetCancelBtn}
              onPress={() => setPhotoModalMode('NONE')}
            >
              <Text style={styles.sheetCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ============================================================ */}
      {/* 2. LIVE CAMERA VIEWFINDER MODAL */}
      {/* ============================================================ */}
      <Modal visible={photoModalMode === 'CAMERA'} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.cameraModalContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          {/* Camera Top Bar */}
          <View style={styles.cameraTopBar}>
            <TouchableOpacity
              style={styles.cameraCloseBtn}
              onPress={() => {
                setCameraCapturedPreview(null);
                setPhotoModalMode('ACTIONS');
              }}
            >
              <X size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.cameraModalTitle}>Take Partner Selfie</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Viewfinder Area */}
          <View style={styles.viewfinder}>
            {flashActive && <View style={styles.flashOverlay} />}
            {cameraCapturedPreview ? (
              <Image source={{ uri: cameraCapturedPreview }} style={styles.capturedImageFull} />
            ) : (
              <View style={styles.cameraLiveSimulator}>
                <Image
                  source={{ uri: CAMERA_POSES[cameraPoseIndex].url }}
                  style={styles.livePosePreview}
                  blurRadius={1}
                />
                <View style={styles.viewfinderOverlay}>
                  <View style={styles.ovalFaceGuide}>
                    <Sparkles size={24} color="#FFC80A" />
                    <Text style={styles.guideText}>Position face inside the oval</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Pose Selector (when not captured) */}
          {!cameraCapturedPreview && (
            <View style={styles.poseSelectorRow}>
              <Text style={styles.poseSelectorTitle}>Switch Sample Pose:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {CAMERA_POSES.map((pose, idx) => (
                  <TouchableOpacity
                    key={pose.id}
                    style={[styles.poseChip, cameraPoseIndex === idx && styles.poseChipActive]}
                    onPress={() => setCameraPoseIndex(idx)}
                  >
                    <Text style={[styles.poseChipText, cameraPoseIndex === idx && styles.poseChipTextActive]}>
                      {pose.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Shutter / Confirmation Controls */}
          <View style={styles.cameraBottomBar}>
            {cameraCapturedPreview ? (
              <View style={styles.confirmActionRow}>
                <TouchableOpacity
                  style={styles.cameraRetakeBtn}
                  onPress={() => setCameraCapturedPreview(null)}
                >
                  <RefreshCw size={18} color="#FFFFFF" />
                  <Text style={styles.cameraRetakeText}>Retake</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cameraConfirmBtn}
                  onPress={confirmCameraPhoto}
                >
                  <CheckCircle2 size={18} color="#0F172A" />
                  <Text style={styles.cameraConfirmText}>Use Photo</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.shutterRow}>
                <TouchableOpacity
                  style={styles.shutterButton}
                  onPress={captureCameraPhoto}
                  activeOpacity={0.7}
                >
                  <View style={styles.shutterInner} />
                </TouchableOpacity>
                <Text style={styles.shutterHint}>Tap button to capture</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>

      {/* ============================================================ */}
      {/* 3. VISUAL GALLERY PICKER MODAL */}
      {/* ============================================================ */}
      <Modal visible={photoModalMode === 'GALLERY'} animationType="slide" transparent={true}>
        <View style={styles.sheetOverlay}>
          <View style={[styles.sheetContainer, { maxHeight: height * 0.8 }]}>
            <View style={styles.sheetHeaderRow}>
              <View>
                <Text style={styles.sheetTitle}>Choose Profile Photo</Text>
                <Text style={styles.sheetSub}>Select an avatar or pick from device files</Text>
              </View>
              <TouchableOpacity
                style={styles.sheetCloseBtn}
                onPress={() => setPhotoModalMode('ACTIONS')}
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Direct Device Upload Button inside Gallery */}
            <TouchableOpacity
              style={styles.deviceUploadBanner}
              onPress={triggerDeviceFilePicker}
              activeOpacity={0.85}
            >
              <Upload size={18} color="#2563EB" />
              <Text style={styles.deviceUploadBannerText}>Browse from My Computer / Phone</Text>
            </TouchableOpacity>

            <ScrollView
              contentContainerStyle={styles.galleryGrid}
              showsVerticalScrollIndicator={false}
            >
              {GALLERY_PRESETS.map((item) => {
                const isSelected = selectedGalleryId === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.galleryItem, isSelected && styles.galleryItemSelected]}
                    onPress={() => setSelectedGalleryId(item.id)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: item.url }} style={styles.galleryThumb} />
                    {isSelected && (
                      <View style={styles.galleryCheckBadge}>
                        <Check size={14} color="#0F172A" />
                      </View>
                    )}
                    <Text style={[styles.galleryLabel, isSelected && styles.galleryLabelSelected]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.galleryConfirmBtn}
              onPress={confirmGallerySelection}
              activeOpacity={0.85}
            >
              <Text style={styles.galleryConfirmBtnText}>CONFIRM PHOTO SELECTION</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* CITY SELECTION MODAL */}
      <Modal visible={cityModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Operating City</Text>
              <TouchableOpacity
                onPress={() => setCityModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.cityList}>
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
                    }}
                  >
                    <Text
                      style={[
                        styles.cityName,
                        isSelected && styles.cityNameSelected,
                      ]}
                    >
                      {city}
                    </Text>
                    {isSelected && <Check size={18} color="#0F172A" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  titleSection: {
    marginBottom: 16,
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
  subTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 6,
    lineHeight: 18,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FFC80A',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  avatarHint: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  formCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 14,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#475569',
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    height: 48,
    gap: 10,
  },
  inputRowError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cityText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  expChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  expChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  expChipActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FFC80A',
  },
  expChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  expChipTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DC2626',
    marginTop: 2,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  submitButton: {
    height: 52,
    backgroundColor: '#FFC80A',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 28,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  sheetSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
    marginBottom: 16,
  },
  sheetOptions: {
    gap: 10,
    marginBottom: 16,
  },
  sheetOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  sheetOptionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  sheetOptionSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
  },
  sheetCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  recommendedBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#D97706',
  },
  sheetCancelBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  cameraModalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cameraTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cameraCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  viewfinder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 99,
  },
  cameraLiveSimulator: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  livePosePreview: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
    resizeMode: 'cover',
  },
  viewfinderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ovalFaceGuide: {
    width: 220,
    height: 300,
    borderRadius: 110,
    borderWidth: 2.5,
    borderColor: '#FFC80A',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  guideText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  poseSelectorRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0F172A',
  },
  poseSelectorTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 6,
  },
  poseChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  poseChipActive: {
    backgroundColor: '#FFC80A',
    borderColor: '#FFC80A',
  },
  poseChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  poseChipTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  capturedImageFull: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraBottomBar: {
    height: 120,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shutterRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFC80A',
  },
  shutterHint: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 8,
  },
  confirmActionRow: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
  },
  cameraRetakeBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cameraRetakeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cameraConfirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFC80A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cameraConfirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceUploadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    marginBottom: 14,
  },
  deviceUploadBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  galleryItem: {
    width: (width - 64) / 3,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingBottom: 6,
  },
  galleryItemSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFBEB',
  },
  galleryThumb: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    marginBottom: 4,
  },
  galleryCheckBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  galleryLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  galleryLabelSelected: {
    color: '#0F172A',
    fontWeight: '800',
  },
  galleryConfirmBtn: {
    height: 50,
    backgroundColor: '#FFC80A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  galleryConfirmBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.6,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#D97706',
  },
  cityList: {
    padding: 16,
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  cityItemSelected: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  cityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  cityNameSelected: {
    fontWeight: '800',
    color: '#0F172A',
  },
});
