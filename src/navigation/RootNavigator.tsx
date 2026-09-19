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
import { VendorVerificationRejectedScreen } from '../screens/vendor/VendorVerificationRejectedScreen';
import { VendorServiceAreaScreen } from '../screens/vendor/VendorServiceAreaScreen';
import { VendorVehicleTypesScreen } from '../screens/vendor/VendorVehicleTypesScreen';
import { VendorEquipmentDetailsScreen } from '../screens/vendor/VendorEquipmentDetailsScreen';
import { VendorEquipmentVerifyScreen } from '../screens/vendor/VendorEquipmentVerifyScreen';
import { VendorServicesOfferedScreen } from '../screens/vendor/VendorServicesOfferedScreen';
import { VendorPricingSetupScreen } from '../screens/vendor/VendorPricingSetupScreen';
import { VendorWorkingHoursScreen } from '../screens/vendor/VendorWorkingHoursScreen';
import { VendorAvailabilitySetupScreen } from '../screens/vendor/VendorAvailabilitySetupScreen';
import { VendorDashboardScreen } from '../screens/vendor/VendorDashboardScreen';
import { VendorOnlineConfirmScreen } from '../screens/vendor/VendorOnlineConfirmScreen';
import { VendorOfflineConfirmScreen } from '../screens/vendor/VendorOfflineConfirmScreen';

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
      <Stack.Screen name={Routes.VENDOR_VERIFICATION_REJECTED} component={VendorVerificationRejectedScreen} />
      <Stack.Screen name={Routes.VENDOR_SERVICE_AREA} component={VendorServiceAreaScreen} />
      <Stack.Screen name={Routes.VENDOR_VEHICLE_TYPES} component={VendorVehicleTypesScreen} />
      <Stack.Screen name={Routes.VENDOR_EQUIPMENT_DETAILS} component={VendorEquipmentDetailsScreen} />
      <Stack.Screen name={Routes.VENDOR_EQUIPMENT_VERIFY} component={VendorEquipmentVerifyScreen} />
      <Stack.Screen name={Routes.VENDOR_SERVICES_OFFERED} component={VendorServicesOfferedScreen} />
      <Stack.Screen name={Routes.VENDOR_PRICING_SETUP} component={VendorPricingSetupScreen} />
      <Stack.Screen name={Routes.VENDOR_WORKING_HOURS} component={VendorWorkingHoursScreen} />
      <Stack.Screen name={Routes.VENDOR_AVAILABILITY_SETUP} component={VendorAvailabilitySetupScreen} />
      <Stack.Screen name={Routes.VENDOR_DASHBOARD} component={VendorDashboardScreen} />
      <Stack.Screen name={Routes.VENDOR_ONLINE_CONFIRM} component={VendorOnlineConfirmScreen} />
      <Stack.Screen name={Routes.VENDOR_OFFLINE_CONFIRM} component={VendorOfflineConfirmScreen} />
    </Stack.Navigator>
  );
};
