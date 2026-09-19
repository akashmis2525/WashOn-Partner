import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  RotateCw,
  Sparkles,
  Car,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

interface PhotoSlot {
  id: string;
  label: string;
  required: boolean;
  uri: string | null;
}

export const VendorAfterPhotosScreen = ({ navigation, route }: any) => {
  const { bookingId = 'BK-9824', vehicleModel = 'Honda Activa 6G', customerName = 'Aakash Mishra' } = route.params || {};

  const [photos, setPhotos] = useState<PhotoSlot[]>([
    {
      id: 'front',
      label: 'Front Side (Sparkling)',
      required: true,
      uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'back',
      label: 'Back Side & Number Plate',
      required: true,
      uri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'left',
      label: 'Left Side View',
      required: true,
      uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 'right',
      label: 'Right Side View',
      required: true,
      uri: null,
    },
    {
      id: 'closeup',
      label: 'Cleaned Engine / Wheels Close-up',
      required: true,
      uri: null,
    },
    {
      id: 'interior',
      label: 'Seat & Console (Optional)',
      required: false,
      uri: null,
    },
  ]);

  const handleCapture = (id: string) => {
    const sampleUri = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60';
    setPhotos(prev =>
      prev.map(p => (p.id === id ? { ...p, uri: p.uri ? null : sampleUri } : p))
    );
  };

  const completedCount = photos.filter(p => p.uri !== null).length;
  const requiredCount = photos.filter(p => p.required).length;
  const requiredCompleted = photos.filter(p => p.required && p.uri !== null).length;
  const canProceed = requiredCompleted === requiredCount;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>After Wash Photos</Text>
        </View>
        <View style={styles.stepBadge}>
          <Text style={styles.stepText}>Step 2/2</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Progress Bar */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Photos Captured</Text>
            <Text style={styles.progressCount}>
              {completedCount} of {photos.length} ({requiredCompleted}/{requiredCount} Mandatory)
            </Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(completedCount / photos.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Photo Grid */}
        <Text style={styles.sectionTitle}>Mandatory & Optional Angles</Text>
        <View style={styles.photoGrid}>
          {photos.map(item => {
            const hasPhoto = item.uri !== null;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.photoCard,
                  hasPhoto && styles.photoCardActive,
                ]}
                activeOpacity={0.8}
                onPress={() => handleCapture(item.id)}
              >
                {hasPhoto ? (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.uri! }} style={styles.capturedImage} />
                    <View style={styles.retakeOverlay}>
                      <RotateCw size={14} color="#FFF" />
                      <Text style={styles.retakeText}>Retake</Text>
                    </View>
                    <View style={styles.checkmarkBadge}>
                      <CheckCircle2 size={20} color="#059669" />
                    </View>
                  </View>
                ) : (
                  <View style={styles.emptyUploadBox}>
                    <View style={styles.cameraIconCircle}>
                      <Camera size={22} color={Colors.primary} />
                    </View>
                    <Text style={styles.tapToCaptureText}>Tap to Capture</Text>
                  </View>
                )}

                <View style={styles.photoDetails}>
                  <Text style={styles.photoLabel} numberOfLines={1}>
                    {item.label}
                  </Text>
                  <View style={styles.tagRow}>
                    {item.required ? (
                      <View style={styles.requiredTag}>
                        <Text style={styles.requiredTagText}>Mandatory</Text>
                      </View>
                    ) : (
                      <View style={styles.optionalTag}>
                        <Text style={styles.optionalTagText}>Optional</Text>
                      </View>
                    )}
                    {hasPhoto && (
                      <Text style={styles.verifiedText}>Uploaded</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.proceedBtn, !canProceed && styles.proceedBtnDisabled]}
          disabled={!canProceed}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_BEFORE_AFTER_COMPARE as any, {
              bookingId,
              vehicleModel,
              customerName,
            })
          }
        >
          <Text style={styles.proceedBtnText}>
            {canProceed
              ? 'Compare Before & After'
              : `Capture All Mandatory Photos (${requiredCompleted}/${requiredCount})`}
          </Text>
          <ArrowRight size={18} color={Colors.textPrimary} />
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  stepBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
  },
  infoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  infoDesc: {
    fontSize: 12,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
  },
  progressCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  progressCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginBottom: 14,
    overflow: 'hidden',
  },
  photoCardActive: {
    borderColor: '#059669',
    borderStyle: 'solid',
  },
  imageContainer: {
    height: 110,
    width: '100%',
    position: 'relative',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  retakeOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  retakeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  checkmarkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  emptyUploadBox: {
    height: 110,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  tapToCaptureText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  photoDetails: {
    padding: 10,
    backgroundColor: '#FFF',
  },
  photoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requiredTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#FEE2E2',
  },
  requiredTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DC2626',
  },
  optionalTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
  },
  optionalTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  proceedBtn: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  proceedBtnDisabled: {
    backgroundColor: '#E2E8F0',
  },
  proceedBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
