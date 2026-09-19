import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  Wrench,
  Camera,
  CheckCircle2,
  Circle,
  Plus,
  Info,
  Sparkles,
  Zap,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_EQUIPMENT_DETAILS
>;

interface EquipmentItem {
  id: string;
  name: string;
  spec: string;
  required: boolean;
}

const EQUIPMENT_LIST: EquipmentItem[] = [
  { id: '1', name: 'High-Pressure Washer', spec: '120 - 150 Bar or Cordless Portable', required: true },
  { id: '2', name: 'Foam Cannon Lance', spec: 'Snow foam bottle with brass nozzle', required: true },
  { id: '3', name: 'Wet & Dry Vacuum Cleaner', spec: '1200W+ for deep interior cabin suction', required: true },
  { id: '4', name: 'Water Tank (50L - 100L)', spec: 'Standalone water storage for remote spots', required: false },
  { id: '5', name: 'Waterless Wash Kit', spec: 'High-lubricity polymer spray & microfibers', required: false },
  { id: '6', name: 'Dual Action Polisher', spec: 'Machine buffer for scratch & swirl removal', required: false },
  { id: '7', name: 'Approved Cleaning Chemicals', spec: 'pH Neutral shampoo, tyre shine, dashboard polish', required: true },
];

export const VendorEquipmentDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([
    '1',
    '2',
    '3',
    '7',
  ]);
  const [photoUri, setPhotoUri] = useState<string | null>(
    'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&auto=format&fit=crop&q=80'
  );

  const toggleEquipment = (id: string) => {
    if (selectedEquipments.includes(id)) {
      setSelectedEquipments(selectedEquipments.filter((item) => item !== id));
    } else {
      setSelectedEquipments([...selectedEquipments, id]);
    }
  };

  const handleUploadPhoto = () => {
    Alert.alert('Upload Equipment Photo', 'Take a photo of your washing kit & machine setup', [
      {
        text: 'Take Photo',
        onPress: () =>
          setPhotoUri(
            'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&auto=format&fit=crop&q=80'
          ),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleContinue = () => {
    // Check required
    const missingRequired = EQUIPMENT_LIST.filter(
      (e) => e.required && !selectedEquipments.includes(e.id)
    );
    if (missingRequired.length > 0) {
      Alert.alert(
        'Required Equipment Missing',
        `To offer professional doorstep wash, you must have:\n• ${missingRequired.map((m) => m.name).join('\n• ')}`
      );
      return;
    }

    // Navigate to Screen V016: Equipment Verification
    navigation.navigate(Routes.VENDOR_EQUIPMENT_VERIFY as never);
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
          <AppText style={styles.stepBadgeText}>SERVICE SETUP • 3/8</AppText>
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
              <Wrench size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>HARDWARE & TOOLS</AppText>
          </View>
          <AppText style={styles.title}>Equipment Details</AppText>
          <AppText style={styles.subtitle}>
            Select the tools you own. Equipment quality guarantees 5-star customer ratings and higher job allocations.
          </AppText>
        </View>

        {/* EQUIPMENT CHECKLIST */}
        <View style={styles.equipmentList}>
          {EQUIPMENT_LIST.map((item) => {
            const isSelected = selectedEquipments.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.itemCard,
                  isSelected && styles.itemCardSelected,
                ]}
                onPress={() => toggleEquipment(item.id)}
                activeOpacity={0.88}
              >
                <View style={styles.checkCol}>
                  {isSelected ? (
                    <CheckCircle2 size={20} color="#FFC80A" />
                  ) : (
                    <Circle size={20} color="#CBD5E1" />
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <AppText
                      style={[
                        styles.itemName,
                        isSelected && styles.itemNameSelected,
                      ]}
                    >
                      {item.name}
                    </AppText>
                    {item.required && (
                      <View style={styles.requiredPill}>
                        <AppText style={styles.requiredPillText}>MANDATORY</AppText>
                      </View>
                    )}
                  </View>
                  <AppText style={styles.itemSpec}>{item.spec}</AppText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PHOTO UPLOAD CARD */}
        <View style={styles.photoUploadSection}>
          <AppText style={styles.photoUploadTitle}>
            Equipment Photo Verification
          </AppText>
          <TouchableOpacity
            style={styles.photoUploadBox}
            onPress={handleUploadPhoto}
            activeOpacity={0.85}
          >
            {photoUri ? (
              <View style={styles.photoPreviewWrap}>
                <Image source={{ uri: photoUri }} style={styles.previewImage} />
                <View style={styles.photoOverlayBadge}>
                  <Camera size={14} color="#FFFFFF" />
                  <AppText style={styles.photoOverlayText}>Change Photo</AppText>
                </View>
              </View>
            ) : (
              <View style={styles.photoPlaceholder}>
                <View style={styles.cameraCircle}>
                  <Camera size={22} color="#0F172A" />
                </View>
                <AppText style={styles.photoPromptTitle}>
                  Upload Kit Photo
                </AppText>
                <AppText style={styles.photoPromptSub}>
                  Take a clear photo showing your pressure washer, vacuum, and chemicals
                </AppText>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* CONTINUE BUTTON */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <AppText style={styles.continueButtonText}>
            Save & Verify Equipment ({selectedEquipments.length} Selected)
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
  equipmentList: {
    gap: 10,
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  itemCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
  },
  checkCol: {
    marginRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  itemName: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#334155',
  },
  itemNameSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  requiredPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  requiredPillText: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
  },
  itemSpec: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  photoUploadSection: {
    marginBottom: 24,
  },
  photoUploadTitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 10,
  },
  photoUploadBox: {
    height: 130,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  photoPreviewWrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlayBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  photoOverlayText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  cameraCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFC80A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  photoPromptTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  photoPromptSub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
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
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
