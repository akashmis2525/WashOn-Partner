import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Calendar,
  IndianRupee,
  TrendingUp,
  ArrowRight,
} from 'lucide-react-native';
import { AppText } from '../../components/common/AppText';
import { Typography } from '../../constants/typography';
import { Routes } from '../../constants/routes';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type VendorOnboarding3NavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.VENDOR_ONBOARDING_3
>;

export const VendorOnboarding03Screen: React.FC = () => {
  const navigation = useNavigation<VendorOnboarding3NavProp>();

  const handleGetStarted = () => {
    navigation.navigate(Routes.VENDOR_LOGIN as never);
  };

  const handleSkip = () => {
    navigation.navigate(Routes.VENDOR_LOGIN as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* BOTTOM DECORATIVE YELLOW CURVES */}
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomRightCurve} />

      {/* TOP HEADER */}
      <View style={styles.header}>
        {/* LOGO */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/logo.jpg')}
            style={{ width: 120, height: 38 }}
            resizeMode="contain"
          />
          <View style={{ backgroundColor: '#FFC80A', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 }}>
            <AppText style={{ fontSize: 10, fontWeight: '800', color: '#0F172A' }}>PARTNER</AppText>
          </View>
        </View>

        {/* SKIP BUTTON */}
        <TouchableOpacity
          onPress={handleSkip}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <AppText style={styles.skipText}>Skip</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* MAIN HEADINGS */}
        <View style={styles.headingSection}>
          <AppText style={[styles.headingBlack, { fontSize: 32, letterSpacing: -0.5 }]}>
            Work. Earn. <AppText style={[styles.headingYellow, { fontSize: 32 }]}>Grow.</AppText>
          </AppText>
        </View>

        {/* HERO ILLUSTRATION CONTAINER */}
        <View style={styles.heroContainer}>
          {/* BACKGROUND WITH CAR & CLEANING BUCKET */}
          <View style={styles.drivewayBackground}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
              }}
              style={styles.drivewayCarImg}
              resizeMode="cover"
            />
          </View>

          {/* LEFT SLOGAN NOTE */}
          <View style={styles.leftSloganBadge}>
            <AppText style={styles.sloganLine1}>Same</AppText>
            <AppText style={styles.sloganLine2}>Skill</AppText>
            <AppText style={styles.sloganLine3}>Bigger</AppText>
            <AppText style={styles.sloganLine4}>Future!</AppText>
          </View>

          {/* RIGHT SLOGAN NOTE */}
          <View style={styles.rightSloganBadge}>
            <AppText style={styles.rightSloganText}>Clean Vehicles</AppText>
            <AppText style={styles.rightSloganSub}>Happy Customers ☺</AppText>
          </View>

          {/* WASHERMAN CUTOUT WITH SMARTPHONE & EARNINGS */}
          <View style={styles.washermanCutoutContainer}>
            <Image
              source={require('../../../assets/vendor_onboarding_3_cutout.png')}
              style={styles.washermanCutoutImg}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* 3 BENEFIT BADGES ROW */}
        <View style={styles.benefitsRow}>
          {/* 1. FLEXIBLE SCHEDULE */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <Calendar size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Flexible Schedule</AppText>
          </View>

          {/* 2. TRANSPARENT PAYMENT */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <IndianRupee size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Transparent Payment</AppText>
          </View>

          {/* 3. GROW YOUR BUSINESS */}
          <View style={styles.benefitItem}>
            <View style={styles.benefitIconCircle}>
              <TrendingUp size={18} color="#0F172A" />
            </View>
            <AppText style={styles.benefitTitle}>Grow Your Business</AppText>
          </View>
        </View>

        {/* PAGINATION DOTS (3RD ACTIVE) */}
        <View style={styles.paginationRow}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        {/* GET STARTED BUTTON */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.85}
        >
          <AppText style={styles.getStartedButtonText}>Get Started</AppText>
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
    paddingBottom: 4,
    zIndex: 10,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carMiniIcon: {
    width: 28,
    height: 14,
    backgroundColor: '#0F172A',
    borderRadius: 5,
    position: 'relative',
  },
  carMiniRoof: {
    position: 'absolute',
    top: -6,
    left: 5,
    width: 16,
    height: 8,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  carMiniDrop: {
    position: 'absolute',
    bottom: -2,
    right: 2,
    width: 8,
    height: 10,
    backgroundColor: '#FFC80A',
    borderRadius: 4,
  },
  logoTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  logoTitleYellow: {
    color: '#FFC80A',
  },
  logoSubtitle: {
    fontSize: 7.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    letterSpacing: 1.5,
    marginTop: -1,
  },
  skipText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  headingSection: {
    marginTop: 4,
    marginBottom: 8,
  },
  headingBlack: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    lineHeight: 32,
  },
  headingYellow: {
    color: '#FFC80A',
  },
  description: {
    fontSize: 12.5,
    fontFamily: Typography.fontFamily.regular,
    color: '#475569',
    marginTop: 6,
    lineHeight: 18,
  },
  heroContainer: {
    width: '100%',
    height: height * 0.44,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drivewayBackground: {
    ...StyleSheet.absoluteFill,
    opacity: 0.15,
  },
  drivewayCarImg: {
    width: '100%',
    height: '100%',
  },
  leftSloganBadge: {
    position: 'absolute',
    top: 24,
    left: 14,
    zIndex: 5,
  },
  sloganLine1: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E293B',
    transform: [{ rotate: '-8deg' }],
  },
  sloganLine2: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E293B',
    transform: [{ rotate: '-8deg' }],
  },
  sloganLine3: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    transform: [{ rotate: '-8deg' }],
  },
  sloganLine4: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#D97706',
    transform: [{ rotate: '-8deg' }],
  },
  rightSloganBadge: {
    position: 'absolute',
    top: 24,
    right: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 5,
  },
  rightSloganText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
  rightSloganSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  washermanCutoutContainer: {
    width: '95%',
    height: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
  },
  washermanCutoutImg: {
    width: '100%',
    height: '100%',
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 6,
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  benefitIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  benefitTitle: {
    fontSize: 10.5,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 2,
  },
  benefitSub: {
    fontSize: 9,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 12.5,
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#FFC80A',
  },
  getStartedButton: {
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
  getStartedButtonText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#0F172A',
  },
});
