import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import { RootStackParamList } from '../types/navigation';
import { VendorSplashScreen } from '../screens/vendor/VendorSplashScreen';
import { VendorOnboarding01Screen } from '../screens/vendor/VendorOnboarding01Screen';
import { VendorOnboarding02Screen } from '../screens/vendor/VendorOnboarding02Screen';
import { VendorOnboarding03Screen } from '../screens/vendor/VendorOnboarding03Screen';
import { VendorLoginScreen } from '../screens/vendor/VendorLoginScreen';
import { VendorOtpVerificationScreen } from '../screens/vendor/VendorOtpVerificationScreen';
import { VendorProfileSetupScreen } from '../screens/vendor/VendorProfileSetupScreen';
import { VendorTypeSelectionScreen } from '../screens/vendor/VendorTypeSelectionScreen';
import { VendorKycVerifyScreen } from '../screens/vendor/VendorKycVerifyScreen';
import { VendorVerificationPendingScreen } from '../screens/vendor/VendorVerificationPendingScreen';
import { VendorVerificationApprovedScreen } from '../screens/vendor/VendorVerificationApprovedScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.VENDOR_SPLASH}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name={Routes.VENDOR_SPLASH} component={VendorSplashScreen} />
      <Stack.Screen name={Routes.VENDOR_ONBOARDING_1} component={VendorOnboarding01Screen} />
      <Stack.Screen name={Routes.VENDOR_ONBOARDING_2} component={VendorOnboarding02Screen} />
      <Stack.Screen name={Routes.VENDOR_ONBOARDING_3} component={VendorOnboarding03Screen} />
      <Stack.Screen name={Routes.VENDOR_LOGIN} component={VendorLoginScreen} />
      <Stack.Screen name={Routes.VENDOR_OTP_VERIFY} component={VendorOtpVerificationScreen} />
      <Stack.Screen name={Routes.VENDOR_PROFILE_SETUP} component={VendorProfileSetupScreen} />
      <Stack.Screen name={Routes.VENDOR_TYPE_SELECTION} component={VendorTypeSelectionScreen} />
      <Stack.Screen name={Routes.VENDOR_KYC_VERIFY} component={VendorKycVerifyScreen} />
      <Stack.Screen name={Routes.VENDOR_VERIFICATION_PENDING} component={VendorVerificationPendingScreen} />
      <Stack.Screen name={Routes.VENDOR_VERIFICATION_APPROVED} component={VendorVerificationApprovedScreen} />
    </Stack.Navigator>
  );
};
