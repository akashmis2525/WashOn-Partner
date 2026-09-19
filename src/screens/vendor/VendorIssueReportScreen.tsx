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
  AlertTriangle,
  Camera,
  Headphones,
  CheckCircle2,
  Circle,
  XCircle,
  Phone,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ISSUE_REPORT
>;

const ISSUE_CATEGORIES = [
  'Water source / electricity tap failure',
  'Equipment / Pressure washer breakdown',
  'Severe hidden paint scratch found',
  'Customer asked to stop / change address',
  'Heavy rain / unsafe weather condition',
  'Other urgent difficulty',
];

export const VendorIssueReportScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [selectedCategory, setSelectedCategory] = useState(ISSUE_CATEGORIES[0]);
  const [remarks, setRemarks] = useState('');

  const handleSubmit = () => {
    Alert.alert(
      'Issue Transmitted to Support',
      'WashOn safety & operations team has received your report. An emergency dispatcher is reviewing your ticket.',
      [
        {
          text: 'Return to Wash',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCallEmergency = () => {
    Alert.alert('Partner SOS Helpline', 'Connecting to 24x7 Vendor Support: +91 81206 52523');
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
            <AppText style={styles.badgeText}>SERVICE INCIDENT</AppText>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AppText style={styles.title}>Report Service Issue</AppText>
          <AppText style={styles.subtitle}>
            If you encounter water outage, hardware malfunction, or safety risks, notify support immediately.
          </AppText>

          {/* EMERGENCY HELPLINE CALLOUT */}
          <TouchableOpacity
            style={styles.emergencyCard}
            onPress={handleCallEmergency}
            activeOpacity={0.85}
          >
            <View style={styles.emergencyIconBox}>
              <Phone size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <AppText style={styles.emergencyTitle}>Instant Partner Helpline</AppText>
              <AppText style={styles.emergencySub}>Tap to speak with operations manager</AppText>
            </View>
          </TouchableOpacity>

          {/* CATEGORIES */}
          <View style={styles.sectionBlock}>
            <AppText style={styles.sectionHeading}>Select Problem Category</AppText>
            <View style={styles.categoriesList}>
              {ISSUE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryCard,
                      isSelected && styles.categoryCardSelected,
                    ]}
                    onPress={() => setSelectedCategory(cat)}
                    activeOpacity={0.88}
                  >
                    <AppText
                      style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextSelected,
                      ]}
                    >
                      {cat}
                    </AppText>
                    {isSelected ? (
                      <CheckCircle2 size={18} color="#FFC80A" />
                    ) : (
                      <Circle size={18} color="#CBD5E1" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* REMARKS */}
          <View style={styles.sectionBlock}>
            <AppText style={styles.sectionHeading}>Incident Details</AppText>
            <View style={styles.notesBox}>
              <TextInput
                style={styles.notesInput}
                multiline
                numberOfLines={3}
                placeholder="Explain what happened at the doorstep location..."
                placeholderTextColor="#94A3B8"
                value={remarks}
                onChangeText={setRemarks}
              />
            </View>
          </View>

          {/* SUBMIT BUTTON */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <AlertTriangle size={18} color="#0F172A" />
            <AppText style={styles.submitBtnText}>Submit Issue to Operations</AppText>
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
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#DC2626',
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
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  emergencyIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTitle: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#FFFFFF',
  },
  emergencySub: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.regular,
    color: '#FEE2E2',
    marginTop: 2,
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 13.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    marginBottom: 8,
  },
  categoriesList: {
    gap: 8,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  categoryCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
  },
  categoryText: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.medium,
    color: '#334155',
    flex: 1,
    marginRight: 8,
  },
  categoryTextSelected: {
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
    minHeight: 65,
    textAlignVertical: 'top',
  },
  submitBtn: {
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
    marginTop: 6,
  },
  submitBtnText: {
    fontSize: 14.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
