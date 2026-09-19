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
  Camera,
  CheckCircle2,
  UploadCloud,
  Shield,
  Info,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_BEFORE_PHOTOS
>;

interface PhotoAngle {
  id: string;
  name: string;
  mandatory: boolean;
  uri: string | null;
}

const INITIAL_ANGLES: PhotoAngle[] = [
  {
    id: 'front',
    name: 'Front Angle',
    mandatory: true,
    uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'rear',
    name: 'Rear / Back Side',
    mandatory: true,
    uri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'left',
    name: 'Left Side',
    mandatory: true,
    uri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'right',
    name: 'Right Side',
    mandatory: true,
    uri: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'plate',
    name: 'Number Plate Close-up',
    mandatory: true,
    uri: null,
  },
  {
    id: 'damage',
    name: 'Existing Scratches / Dents',
    mandatory: false,
    uri: null,
  },
];

export const VendorBeforePhotosScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [angles, setAngles] = useState<PhotoAngle[]>(INITIAL_ANGLES);

  const handleCapturePhoto = (id: string) => {
    Alert.alert('Capture Vehicle Photo', 'Take a clear, well-lit photo of this angle', [
      {
        text: 'Take Photo',
        onPress: () => {
          setAngles((prev) =>
            prev.map((a) =>
              a.id === id
                ? {
                    ...a,
                    uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80',
                  }
                : a
            )
          );
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleProceed = () => {
    // Navigate to Screen V034: Existing Damage Notes
    navigation.navigate(Routes.VENDOR_DAMAGE_NOTES as any, {
      bookingId: 'WASH-JOB-9842',
    });
  };

  const takenCount = angles.filter((a) => a.uri !== null).length;

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
          <AppText style={styles.badgeText}>{takenCount}/6 PHOTOS</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.title}>Before Wash Photos</AppText>
        <AppText style={styles.subtitle}>
          Take 360° photos of Honda Activa (MP09 XX 9821) before spraying water or chemicals.
        </AppText>

        {/* 6 PHOTOS GRID */}
        <View style={styles.grid}>
          {angles.map((angle) => (
            <TouchableOpacity
              key={angle.id}
              style={[
                styles.photoBox,
                angle.uri ? styles.photoBoxFilled : null,
              ]}
              onPress={() => handleCapturePhoto(angle.id)}
              activeOpacity={0.8}
            >
              {angle.uri ? (
                <View style={styles.imageWrap}>
                  <Image source={{ uri: angle.uri }} style={styles.image} />
                  <View style={styles.doneBadge}>
                    <CheckCircle2 size={14} color="#059669" />
                  </View>
                  <AppText style={styles.photoLabel}>{angle.name}</AppText>
                </View>
              ) : (
                <View style={styles.placeholder}>
                  <Camera size={22} color="#64748B" />
                  <AppText style={styles.placeholderText}>{angle.name}</AppText>
                  {angle.mandatory && (
                    <AppText style={styles.mandatoryText}>Required</AppText>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* GUIDELINE */}
        <View style={styles.infoCard}>
          <Info size={16} color="#D97706" style={{ marginTop: 2, marginRight: 8 }} />
          <AppText style={styles.infoText}>
            Ensure photos are clear and show vehicle condition accurately. Customer will review and approve these before wash timer starts.
          </AppText>
        </View>

        {/* PROCEED BUTTON */}
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={handleProceed}
          activeOpacity={0.85}
        >
          <AppText style={styles.proceedBtnText}>
            Proceed to Damage Notes ({takenCount} Photos)
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
  badge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
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
    paddingTop: 14,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  photoBox: {
    width: (width - 50) / 2,
    height: 120,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  photoBoxFilled: {
    borderStyle: 'solid',
    borderColor: '#059669',
  },
  imageWrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  doneBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  photoLabel: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    color: '#FFFFFF',
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  placeholderText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#334155',
    textAlign: 'center',
    marginTop: 4,
  },
  mandatoryText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#DC2626',
    marginTop: 2,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFDF5',
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#78350F',
    lineHeight: 16,
  },
  proceedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    borderRadius: 16,
    paddingVertical: 15,
    gap: 8,
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  proceedBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
