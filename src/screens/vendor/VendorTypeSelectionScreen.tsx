import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
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
  Briefcase,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_TYPE_SELECTION
>;

interface VendorTypeOption {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: any;
}

const VENDOR_TYPES: VendorTypeOption[] = [
  {
    id: 'individual',
    title: 'Individual Washerman',
    subtitle: 'Solo washer delivering doorstep wash & dry clean on bike/scooter',
    tag: 'Most Popular',
    icon: UserCheck,
  },
  {
    id: 'detailer',
    title: 'Professional Detailer',
    subtitle: 'Expert in deep interior cleaning, machine polish & ceramic coating',
    tag: 'High Earnings',
    icon: Sparkles,
  },
  {
    id: 'team',
    title: 'Small Service Team',
    subtitle: 'Crew of 2-5 washers handling multi-car society & fleet bookings',
    tag: 'Team Setup',
    icon: Users,
  },
  {
    id: 'business',
    title: 'Existing Car Wash Business',
    subtitle: 'Established garage or wash studio expanding doorstep services',
    tag: 'Business',
    icon: Building2,
  },
];

export const VendorTypeSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [selectedType, setSelectedType] = useState<string>('individual');

  const handleContinue = () => {
    // Navigate to Screen V009: Vendor KYC Documents
    navigation.navigate(Routes.VENDOR_KYC_DOCUMENTS as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

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
          <AppText style={styles.stepBadgeText}>STEP 2 OF 3</AppText>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TITLE & INTRO */}
        <View style={styles.titleSection}>
          <View style={styles.badgeRow}>
            <View style={styles.miniIconBadge}>
              <Briefcase size={13} color="#0F172A" />
            </View>
            <AppText style={styles.badgeLabel}>PARTNER CATEGORY</AppText>
          </View>
          <AppText style={styles.title}>Select Your Vendor Type</AppText>
          <AppText style={styles.subtitle}>
            Choose the category that best describes your car wash service setup.
          </AppText>
        </View>

        {/* OPTIONS LIST */}
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
                {/* ICON BADGE */}
                <View
                  style={[
                    styles.iconCircle,
                    isSelected && styles.iconCircleSelected,
                  ]}
                >
                  <IconComponent
                    size={24}
                    color={isSelected ? '#0F172A' : '#64748B'}
                  />
                </View>

                {/* TEXT CONTENT */}
                <View style={styles.cardContent}>
                  <View style={styles.cardHeaderRow}>
                    <AppText
                      style={[
                        styles.optionTitle,
                        isSelected && styles.optionTitleSelected,
                      ]}
                    >
                      {item.title}
                    </AppText>
                    {item.tag ? (
                      <View
                        style={[
                          styles.tagBadge,
                          isSelected && styles.tagBadgeSelected,
                        ]}
                      >
                        <AppText
                          style={[
                            styles.tagText,
                            isSelected && styles.tagTextSelected,
                          ]}
                        >
                          {item.tag}
                        </AppText>
                      </View>
                    ) : null}
                  </View>
                  <AppText style={styles.optionSubtitle}>
                    {item.subtitle}
                  </AppText>
                </View>

                {/* SELECTION RADIO */}
                <View style={styles.radioContainer}>
                  {isSelected ? (
                    <CheckCircle2 size={22} color="#FFC80A" />
                  ) : (
                    <Circle size={22} color="#CBD5E1" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
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
  optionsList: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
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
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconCircleSelected: {
    backgroundColor: '#FEF3C7',
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  optionTitle: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#334155',
  },
  optionTitleSelected: {
    color: '#0F172A',
  },
  tagBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagBadgeSelected: {
    backgroundColor: '#FEF3C7',
  },
  tagText: {
    fontSize: 9.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#64748B',
  },
  tagTextSelected: {
    color: '#D97706',
  },
  optionSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 16,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
});
