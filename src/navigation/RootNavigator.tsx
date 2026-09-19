import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../constants/routes';
import { RootStackParamList } from '../types/navigation';

// Section 1: Auth & Onboarding
import { VendorSplashScreen } from '../screens/vendor/VendorSplashScreen';
import { VendorOnboarding01Screen } from '../screens/vendor/VendorOnboarding01Screen';
import { VendorOnboarding02Screen } from '../screens/vendor/VendorOnboarding02Screen';
import { VendorOnboarding03Screen } from '../screens/vendor/VendorOnboarding03Screen';
import { VendorLoginScreen } from '../screens/vendor/VendorLoginScreen';
import { VendorOtpVerificationScreen } from '../screens/vendor/VendorOtpVerificationScreen';

// Section 2: Profile & Verification
import { VendorProfileSetupScreen } from '../screens/vendor/VendorProfileSetupScreen';
import { VendorTypeSelectionScreen } from '../screens/vendor/VendorTypeSelectionScreen';
import { VendorKycVerifyScreen } from '../screens/vendor/VendorKycVerifyScreen';
import { VendorVerificationPendingScreen } from '../screens/vendor/VendorVerificationPendingScreen';
import { VendorVerificationApprovedScreen } from '../screens/vendor/VendorVerificationApprovedScreen';
import { VendorVerificationRejectedScreen } from '../screens/vendor/VendorVerificationRejectedScreen';

// Section 3: Service Setup
import { VendorServiceAreaScreen } from '../screens/vendor/VendorServiceAreaScreen';
import { VendorVehicleTypesScreen } from '../screens/vendor/VendorVehicleTypesScreen';
import { VendorEquipmentDetailsScreen } from '../screens/vendor/VendorEquipmentDetailsScreen';
import { VendorEquipmentVerifyScreen } from '../screens/vendor/VendorEquipmentVerifyScreen';
import { VendorServicesOfferedScreen } from '../screens/vendor/VendorServicesOfferedScreen';
import { VendorPricingSetupScreen } from '../screens/vendor/VendorPricingSetupScreen';
import { VendorWorkingHoursScreen } from '../screens/vendor/VendorWorkingHoursScreen';
import { VendorAvailabilitySetupScreen } from '../screens/vendor/VendorAvailabilitySetupScreen';

// Section 4: Dashboard & Online Mode
import { VendorDashboardScreen } from '../screens/vendor/VendorDashboardScreen';
import { VendorOnlineConfirmScreen } from '../screens/vendor/VendorOnlineConfirmScreen';
import { VendorOfflineConfirmScreen } from '../screens/vendor/VendorOfflineConfirmScreen';

// Section 5: Booking Requests
import { VendorNewRequestScreen } from '../screens/vendor/VendorNewRequestScreen';
import { VendorRequestDetailsScreen } from '../screens/vendor/VendorRequestDetailsScreen';
import { VendorBookingAcceptedScreen } from '../screens/vendor/VendorBookingAcceptedScreen';
import { VendorBookingRejectedScreen } from '../screens/vendor/VendorBookingRejectedScreen';

// Section 6: Navigation & Arrival
import { VendorNavigateCustomerScreen } from '../screens/vendor/VendorNavigateCustomerScreen';
import { VendorOnTheWayScreen } from '../screens/vendor/VendorOnTheWayScreen';
import { VendorArrivedScreen } from '../screens/vendor/VendorArrivedScreen';
import { VendorUnableToFindScreen } from '../screens/vendor/VendorUnableToFindScreen';

// Section 7: Service Start & Before Photos
import { VendorStartVerificationScreen } from '../screens/vendor/VendorStartVerificationScreen';
import { VendorBeforePhotosScreen } from '../screens/vendor/VendorBeforePhotosScreen';
import { VendorDamageNotesScreen } from '../screens/vendor/VendorDamageNotesScreen';
import { VendorCustomerApprovalStartScreen } from '../screens/vendor/VendorCustomerApprovalStartScreen';

// Section 8: Wash Process
import { VendorServiceInProgressScreen } from '../screens/vendor/VendorServiceInProgressScreen';
import { VendorActivityUpdateScreen } from '../screens/vendor/VendorActivityUpdateScreen';
import { VendorAddonConfirmationScreen } from '../screens/vendor/VendorAddonConfirmationScreen';
import { VendorIssueReportScreen } from '../screens/vendor/VendorIssueReportScreen';

// Section 9: Completion & After Photos
import { VendorAfterPhotosScreen } from '../screens/vendor/VendorAfterPhotosScreen';
import { VendorBeforeAfterCompareScreen } from '../screens/vendor/VendorBeforeAfterCompareScreen';
import { VendorCompletionSummaryScreen } from '../screens/vendor/VendorCompletionSummaryScreen';
import { VendorCustomerApprovalPendingScreen } from '../screens/vendor/VendorCustomerApprovalPendingScreen';
import { VendorServiceCompletedScreen } from '../screens/vendor/VendorServiceCompletedScreen';

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
      {/* Section 1 */}
      <Stack.Screen name={Routes.VENDOR_SPLASH} component={VendorSplashScreen} />
      <Stack.Screen name={Routes.VENDOR_ONBOARDING_1} component={VendorOnboarding01Screen} />
      <Stack.Screen name={Routes.VENDOR_ONBOARDING_2} component={VendorOnboarding02Screen} />
      <Stack.Screen name={Routes.VENDOR_ONBOARDING_3} component={VendorOnboarding03Screen} />
      <Stack.Screen name={Routes.VENDOR_LOGIN} component={VendorLoginScreen} />
      <Stack.Screen name={Routes.VENDOR_OTP_VERIFY} component={VendorOtpVerificationScreen} />

      {/* Section 2 */}
      <Stack.Screen name={Routes.VENDOR_PROFILE_SETUP} component={VendorProfileSetupScreen} />
      <Stack.Screen name={Routes.VENDOR_TYPE_SELECTION} component={VendorTypeSelectionScreen} />
      <Stack.Screen name={Routes.VENDOR_KYC_VERIFY} component={VendorKycVerifyScreen} />
      <Stack.Screen name={Routes.VENDOR_VERIFICATION_PENDING} component={VendorVerificationPendingScreen} />
      <Stack.Screen name={Routes.VENDOR_VERIFICATION_APPROVED} component={VendorVerificationApprovedScreen} />
      <Stack.Screen name={Routes.VENDOR_VERIFICATION_REJECTED} component={VendorVerificationRejectedScreen} />

      {/* Section 3 */}
      <Stack.Screen name={Routes.VENDOR_SERVICE_AREA} component={VendorServiceAreaScreen} />
      <Stack.Screen name={Routes.VENDOR_VEHICLE_TYPES} component={VendorVehicleTypesScreen} />
      <Stack.Screen name={Routes.VENDOR_EQUIPMENT_DETAILS} component={VendorEquipmentDetailsScreen} />
      <Stack.Screen name={Routes.VENDOR_EQUIPMENT_VERIFY} component={VendorEquipmentVerifyScreen} />
      <Stack.Screen name={Routes.VENDOR_SERVICES_OFFERED} component={VendorServicesOfferedScreen} />
      <Stack.Screen name={Routes.VENDOR_PRICING_SETUP} component={VendorPricingSetupScreen} />
      <Stack.Screen name={Routes.VENDOR_WORKING_HOURS} component={VendorWorkingHoursScreen} />
      <Stack.Screen name={Routes.VENDOR_AVAILABILITY_SETUP} component={VendorAvailabilitySetupScreen} />

      {/* Section 4 */}
      <Stack.Screen name={Routes.VENDOR_DASHBOARD} component={VendorDashboardScreen} />
      <Stack.Screen name={Routes.VENDOR_ONLINE_CONFIRM} component={VendorOnlineConfirmScreen} />
      <Stack.Screen name={Routes.VENDOR_OFFLINE_CONFIRM} component={VendorOfflineConfirmScreen} />

      {/* Section 5: Booking Requests */}
      <Stack.Screen name={Routes.VENDOR_NEW_REQUEST} component={VendorNewRequestScreen} />
      <Stack.Screen name={Routes.VENDOR_REQUEST_DETAILS} component={VendorRequestDetailsScreen} />
      <Stack.Screen name={Routes.VENDOR_BOOKING_ACCEPTED} component={VendorBookingAcceptedScreen} />
      <Stack.Screen name={Routes.VENDOR_BOOKING_REJECTED} component={VendorBookingRejectedScreen} />

      {/* Section 6: Navigation & Customer Arrival */}
      <Stack.Screen name={Routes.VENDOR_NAVIGATE_CUSTOMER} component={VendorNavigateCustomerScreen} />
      <Stack.Screen name={Routes.VENDOR_ON_THE_WAY} component={VendorOnTheWayScreen} />
      <Stack.Screen name={Routes.VENDOR_ARRIVED} component={VendorArrivedScreen} />
      <Stack.Screen name={Routes.VENDOR_UNABLE_TO_FIND} component={VendorUnableToFindScreen} />

      {/* Section 7: Service Start & Before Photos */}
      <Stack.Screen name={Routes.VENDOR_START_VERIFICATION} component={VendorStartVerificationScreen} />
      <Stack.Screen name={Routes.VENDOR_BEFORE_PHOTOS} component={VendorBeforePhotosScreen} />
      <Stack.Screen name={Routes.VENDOR_DAMAGE_NOTES} component={VendorDamageNotesScreen} />
      <Stack.Screen name={Routes.VENDOR_CUSTOMER_APPROVAL_START} component={VendorCustomerApprovalStartScreen} />

      {/* Section 8: Wash Process */}
      <Stack.Screen name={Routes.VENDOR_SERVICE_IN_PROGRESS} component={VendorServiceInProgressScreen} />
      <Stack.Screen name={Routes.VENDOR_ACTIVITY_UPDATE} component={VendorActivityUpdateScreen} />
      <Stack.Screen name={Routes.VENDOR_ADDON_CONFIRMATION} component={VendorAddonConfirmationScreen} />
      <Stack.Screen name={Routes.VENDOR_ISSUE_REPORT} component={VendorIssueReportScreen} />

      {/* Section 9: Completion & After Photos */}
      <Stack.Screen name={Routes.VENDOR_AFTER_PHOTOS} component={VendorAfterPhotosScreen} />
      <Stack.Screen name={Routes.VENDOR_BEFORE_AFTER_COMPARE} component={VendorBeforeAfterCompareScreen} />
      <Stack.Screen name={Routes.VENDOR_COMPLETION_SUMMARY} component={VendorCompletionSummaryScreen} />
      <Stack.Screen name={Routes.VENDOR_CUSTOMER_APPROVAL_PENDING} component={VendorCustomerApprovalPendingScreen} />
      <Stack.Screen name={Routes.VENDOR_SERVICE_COMPLETED} component={VendorServiceCompletedScreen} />
    </Stack.Navigator>
  );
};
