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
  Text,
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
  RefreshCw,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

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
    Alert.alert('Upload Equipment Photo', 'Take a live photo of your washing machines & kit', [
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

    // Navigate to Screen V016: Equipment Verification Approved
    navigation.navigate(Routes.VENDOR_EQUIPMENT_VERIFY as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonCircle}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Equipment Setup</Text>
          <Text style={styles.headerSub}>Machine Checklist & Live Photo</Text>
        </View>

        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>STEP 3/8</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: EQUIPMENT CHECKLIST */}
        <Text style={styles.sectionHeading}>1. SELECT OWNED EQUIPMENT</Text>

        <View style={styles.equipmentList}>
          {EQUIPMENT_LIST.map((item) => {
            const isSelected = selectedEquipments.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.equipmentCard,
                  isSelected && styles.equipmentCardSelected,
                ]}
                onPress={() => toggleEquipment(item.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconCircle}>
                    <Wrench size={16} color={isSelected ? '#0F172A' : '#64748B'} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={styles.nameRow}>
                      <Text style={[styles.equipmentName, isSelected && styles.equipmentNameSelected]}>
                        {item.name}
                      </Text>
                      {item.required && (
                        <View style={styles.requiredBadge}>
                          <Text style={styles.requiredBadgeText}>MANDATORY</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.specText}>{item.spec}</Text>
                  </View>

                  <View
                    style={[
                      styles.checkCircle,
                      isSelected && styles.checkCircleSelected,
                    ]}
                  >
                    {isSelected ? (
                      <CheckCircle2 size={20} color="#0F172A" />
                    ) : (
                      <Circle size={20} color="#CBD5E1" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SECTION 2: LIVE EQUIPMENT PHOTO AUDIT */}
        <Text style={styles.sectionHeading}>2. EQUIPMENT LIVE PHOTO AUDIT</Text>
        <View style={styles.photoUploadCard}>
          {photoUri ? (
            <View style={styles.photoPreviewWrapper}>
              <Image source={{ uri: photoUri }} style={styles.previewImage} />
              <View style={styles.verifiedTag}>
                <CheckCircle2 size={13} color="#059669" />
                <Text style={styles.verifiedTagText}>Photo Attached</Text>
              </View>
              <TouchableOpacity style={styles.retakeBtn} onPress={handleUploadPhoto}>
                <RefreshCw size={12} color="#0F172A" />
                <Text style={styles.retakeBtnText}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadBox} onPress={handleUploadPhoto}>
              <View style={styles.cameraIconBg}>
                <Camera size={22} color="#0F172A" />
              </View>
              <Text style={styles.uploadBoxTitle}>Take Photo of Your Wash Kit</Text>
              <Text style={styles.uploadBoxSub}>
                Include pressure washer, foam gun, and vacuum cleaner in 1 clear photo.
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleContinue}>
          <Text style={styles.submitButtonText}>SAVE & VERIFY EQUIPMENT</Text>
          <ArrowRight size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
  },
  stepBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  stepBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  equipmentList: {
    gap: 8,
    marginBottom: 16,
  },
  equipmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  equipmentCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFBEB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  equipmentName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  equipmentNameSelected: {
    color: '#0F172A',
  },
  requiredBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  requiredBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#DC2626',
  },
  specText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
  },
  checkCircle: {
    marginLeft: 8,
  },
  checkCircleSelected: {},
  photoUploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  photoPreviewWrapper: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  verifiedTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  retakeBtn: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 2,
  },
  retakeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  uploadBox: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  cameraIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  uploadBoxSub: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    height: 50,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});
