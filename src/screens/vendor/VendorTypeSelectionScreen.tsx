import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  ArrowRight,
  UserCheck,
  Sparkles,
  Users,
  Building2,
  CheckCircle2,
  Circle,
  Zap,
  ShieldCheck,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_TYPE_SELECTION
>;

interface VendorTypeOption {
  id: string;
  title: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

const VENDOR_TYPES: VendorTypeOption[] = [
  {
    id: 'individual',
    title: 'SOLO Partner',
    icon: UserCheck,
    iconBg: '#FEF3C7',
    iconColor: '#B45309',
  },
  {
    id: 'team',
    title: 'Team Partner',
    icon: Users,
    iconBg: '#DBEAFE',
    iconColor: '#2563EB',
  },
];

export const VendorTypeSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [selectedType, setSelectedType] = useState<string>('individual');

  const handleContinue = () => {
    // Navigate to Screen V009: Vendor KYC Verification
    navigation.navigate(Routes.VENDOR_KYC_VERIFY as never);
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
          <Text style={styles.headerSubtitle}>Step 2 of 3</Text>
        </View>

        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* RAPIDO HIGH-IMPACT HEADINGS */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            Select <Text style={styles.highlightYellow}>Washing Type</Text>
          </Text>
          <Text style={styles.subTitle}>
            Choose your type
          </Text>
        </View>

        {/* CLEAN PROFESSIONAL OPTIONS LIST */}
        <View style={styles.optionsList}>
          {VENDOR_TYPES.map((item) => {
            const isSelected = selectedType === item.id;
            const IconComponent = item.icon;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => setSelectedType(item.id)}
                activeOpacity={0.88}
              >
                {/* LEFT ICON */}
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  <IconComponent size={24} color={item.iconColor} />
                </View>

                {/* CENTER TITLE */}
                <View style={styles.cardHeaderInfo}>
                  <Text
                    style={[
                      styles.optionTitle,
                      isSelected && styles.optionTitleSelected,
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>

                {/* RIGHT RADIO CHECK */}
                <View style={styles.radioContainer}>
                  {isSelected ? (
                    <CheckCircle2 size={24} color="#D97706" />
                  ) : (
                    <Circle size={22} color="#CBD5E1" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTTOM ACTION */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>KYC</Text>
          <ArrowRight size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  titleSection: {
    marginBottom: 18,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.8,
    lineHeight: 34,
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
  optionsList: {
    gap: 12,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  optionCardSelected: {
    borderColor: '#FFC80A',
    backgroundColor: '#FFFDF5',
    shadowColor: '#FFC80A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardHeaderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 3,
    flexShrink: 1,
  },
  optionTitleSelected: {
    color: '#0F172A',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  radioContainer: {
    marginLeft: 6,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 4,
  },
  trustText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
    lineHeight: 16,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  continueButton: {
    height: 52,
    backgroundColor: '#FFC80A',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  continueButtonText: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 0.3,
    flexShrink: 1,
  },
});
