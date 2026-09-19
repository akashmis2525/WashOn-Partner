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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Camera,
  FileEdit,
  ShieldCheck,
  Check,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_DAMAGE_NOTES
>;

const DAMAGE_TYPES = [
  'Minor Scratch',
  'Body Dent',
  'Broken Mirror/Indicator',
  'Paint Chip / Peel',
  'Heavy Tar / Rust Stain',
  'Missing Logo / Badge',
  'None / Clean Body',
];

export const VendorDamageNotesScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Minor Scratch']);
  const [notes, setNotes] = useState('Light scratch on left front mudguard & minor scuff on exhaust heat shield.');
  const [customerAcknowledged, setCustomerAcknowledged] = useState(true);

  const toggleDamage = (item: string) => {
    if (item === 'None / Clean Body') {
      setSelectedTypes(['None / Clean Body']);
      return;
    }

    const filtered = selectedTypes.filter((t) => t !== 'None / Clean Body');
    if (filtered.includes(item)) {
      setSelectedTypes(filtered.filter((t) => t !== item));
    } else {
      setSelectedTypes([...filtered, item]);
    }
  };

  const handleProceed = () => {
    // Navigate to Screen V035: Customer Approval for Service Start
    navigation.navigate(Routes.VENDOR_CUSTOMER_APPROVAL_START as any, {
      bookingId: 'WASH-JOB-9842',
    });
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
            <ShieldCheck size={13} color="#059669" />
            <AppText style={styles.badgeText}>PARTNER PROTECTION</AppText>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AppText style={styles.title}>Existing Damage Notes</AppText>
          <AppText style={styles.subtitle}>
            Tag any pre-existing scratches, dents or broken parts before washing to avoid false customer disputes.
          </AppText>

          {/* DAMAGE CHIPS */}
          <View style={styles.sectionBlock}>
            <AppText style={styles.sectionHeading}>Observed Condition</AppText>
            <View style={styles.chipsWrap}>
              {DAMAGE_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type);
                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.chip,
                      isSelected && styles.chipSelected,
                    ]}
                    onPress={() => toggleDamage(type)}
                    activeOpacity={0.8}
                  >
                    <AppText
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {type}
                    </AppText>
                    {isSelected && <Check size={13} color="#0F172A" />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* SPECIFIC NOTES INPUT */}
          <View style={styles.sectionBlock}>
            <AppText style={styles.sectionHeading}>Additional Inspection Remarks</AppText>
            <View style={styles.notesBox}>
              <TextInput
                style={styles.notesInput}
                multiline
                numberOfLines={3}
                placeholder="Describe exact location of scratches (e.g., front fender, right door)..."
                placeholderTextColor="#94A3B8"
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>

          {/* CUSTOMER ACKNOWLEDGEMENT TOGGLE */}
          <TouchableOpacity
            style={styles.ackCard}
            onPress={() => setCustomerAcknowledged(!customerAcknowledged)}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.ackCheckbox,
                customerAcknowledged && styles.ackCheckboxActive,
              ]}
            >
              {customerAcknowledged && <CheckCircle2 size={16} color="#0F172A" />}
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.ackTitle}>Customer Verbal Acknowledgement</AppText>
              <AppText style={styles.ackSub}>
                Customer has inspected and agreed to the pre-existing marks noted above.
              </AppText>
            </View>
          </TouchableOpacity>

          {/* PROCEED BUTTON */}
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}
            activeOpacity={0.85}
          >
            <AppText style={styles.proceedButtonText}>
              Send to Customer for Approval
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#059669',
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
  sectionBlock: {
    marginBottom: 18,
  },
  sectionHeading: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipSelected: {
    backgroundColor: '#FFC80A',
    borderColor: '#FFC80A',
  },
  chipText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#475569',
  },
  chipTextSelected: {
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  notesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 12,
  },
  notesInput: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.regular,
    color: '#0F172A',
    minHeight: 70,
    textAlignVertical: 'top',
  },
  ackCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    padding: 14,
    borderRadius: 14,
    marginBottom: 24,
    gap: 10,
  },
  ackCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  ackCheckboxActive: {
    backgroundColor: '#FFC80A',
    borderColor: '#FFC80A',
  },
  ackTitle: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#166534',
  },
  ackSub: {
    fontSize: 11.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#15803D',
    marginTop: 2,
    lineHeight: 16,
  },
  proceedButton: {
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
  proceedButtonText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
