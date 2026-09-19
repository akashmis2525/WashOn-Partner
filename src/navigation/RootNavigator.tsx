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

// Section 10: Earnings & Payments
import { VendorEarningsDashboardScreen } from '../screens/vendor/VendorEarningsDashboardScreen';
import { VendorEarningsBreakdownScreen } from '../screens/vendor/VendorEarningsBreakdownScreen';
import { VendorPaymentStatusScreen } from '../screens/vendor/VendorPaymentStatusScreen';
import { VendorBankDetailsScreen } from '../screens/vendor/VendorBankDetailsScreen';
import { VendorWithdrawalScreen } from '../screens/vendor/VendorWithdrawalScreen';
import { VendorTransactionHistoryScreen } from '../screens/vendor/VendorTransactionHistoryScreen';

// Section 11: Vendor Bookings
import { VendorUpcomingBookingsScreen } from '../screens/vendor/VendorUpcomingBookingsScreen';
import { VendorActiveBookingScreen } from '../screens/vendor/VendorActiveBookingScreen';
import { VendorBookingHistoryScreen } from '../screens/vendor/VendorBookingHistoryScreen';
import { VendorBookingDetailsScreen } from '../screens/vendor/VendorBookingDetailsScreen';
import { VendorReworkRequestScreen } from '../screens/vendor/VendorReworkRequestScreen';

// Section 12: Ratings & Performance
import { VendorCustomerRatingsScreen } from '../screens/vendor/VendorCustomerRatingsScreen';
import { VendorPerformanceDashboardScreen } from '../screens/vendor/VendorPerformanceDashboardScreen';
import { VendorPerformanceImprovementScreen } from '../screens/vendor/VendorPerformanceImprovementScreen';
import { VendorCustomerReviewDetailsScreen } from '../screens/vendor/VendorCustomerReviewDetailsScreen';

// Section 13: Offers, Incentives & Membership
import { VendorIncentivesScreen } from '../screens/vendor/VendorIncentivesScreen';
import { VendorOffersScreen } from '../screens/vendor/VendorOffersScreen';
import { VendorSubscriptionPlansScreen } from '../screens/vendor/VendorSubscriptionPlansScreen';

// Section 14: Vendor Profile & Support
import { VendorProfileScreen } from '../screens/vendor/VendorProfileScreen';
import { VendorEditProfileScreen } from '../screens/vendor/VendorEditProfileScreen';
import { VendorServiceAreasScreen } from '../screens/vendor/VendorServiceAreasScreen';
import { VendorEquipmentDocsScreen } from '../screens/vendor/VendorEquipmentDocsScreen';
import { VendorNotificationsScreen } from '../screens/vendor/VendorNotificationsScreen';
import { VendorHelpSupportScreen } from '../screens/vendor/VendorHelpSupportScreen';
import { VendorSupportChatScreen } from '../screens/vendor/VendorSupportChatScreen';
import { VendorTermsPoliciesScreen } from '../screens/vendor/VendorTermsPoliciesScreen';
import { VendorSettingsScreen } from '../screens/vendor/VendorSettingsScreen';

// Additional Critical Screens
import { VendorAutoAssignmentStatusScreen } from '../screens/vendor/VendorAutoAssignmentStatusScreen';
import { VendorBusyStatusScreen } from '../screens/vendor/VendorBusyStatusScreen';
import { VendorCustomerNoShowScreen } from '../screens/vendor/VendorCustomerNoShowScreen';
import { VendorEmergencyAssistanceScreen } from '../screens/vendor/VendorEmergencyAssistanceScreen';
import { VendorTrainingGuidelinesScreen } from '../screens/vendor/VendorTrainingGuidelinesScreen';
import { VendorServiceChecklistScreen } from '../screens/vendor/VendorServiceChecklistScreen';
import { VendorAccountStatusScreen } from '../screens/vendor/VendorAccountStatusScreen';

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

      {/* Section 10: Earnings & Payments */}
      <Stack.Screen name={Routes.VENDOR_EARNINGS_DASHBOARD} component={VendorEarningsDashboardScreen} />
      <Stack.Screen name={Routes.VENDOR_EARNINGS_BREAKDOWN} component={VendorEarningsBreakdownScreen} />
      <Stack.Screen name={Routes.VENDOR_PAYMENT_STATUS} component={VendorPaymentStatusScreen} />
      <Stack.Screen name={Routes.VENDOR_BANK_DETAILS} component={VendorBankDetailsScreen} />
      <Stack.Screen name={Routes.VENDOR_WITHDRAWAL} component={VendorWithdrawalScreen} />
      <Stack.Screen name={Routes.VENDOR_TRANSACTION_HISTORY} component={VendorTransactionHistoryScreen} />

      {/* Section 11: Vendor Bookings */}
      <Stack.Screen name={Routes.VENDOR_UPCOMING_BOOKINGS} component={VendorUpcomingBookingsScreen} />
      <Stack.Screen name={Routes.VENDOR_ACTIVE_BOOKING} component={VendorActiveBookingScreen} />
      <Stack.Screen name={Routes.VENDOR_BOOKING_HISTORY} component={VendorBookingHistoryScreen} />
      <Stack.Screen name={Routes.VENDOR_BOOKING_DETAILS} component={VendorBookingDetailsScreen} />
      <Stack.Screen name={Routes.VENDOR_REWORK_REQUEST} component={VendorReworkRequestScreen} />

      {/* Section 12: Ratings & Performance */}
      <Stack.Screen name={Routes.VENDOR_CUSTOMER_RATINGS} component={VendorCustomerRatingsScreen} />
      <Stack.Screen name={Routes.VENDOR_PERFORMANCE_DASHBOARD} component={VendorPerformanceDashboardScreen} />
      <Stack.Screen name={Routes.VENDOR_PERFORMANCE_IMPROVEMENT} component={VendorPerformanceImprovementScreen} />
      <Stack.Screen name={Routes.VENDOR_CUSTOMER_REVIEW_DETAILS} component={VendorCustomerReviewDetailsScreen} />

      {/* Section 13: Offers, Incentives & Membership */}
      <Stack.Screen name={Routes.VENDOR_INCENTIVES} component={VendorIncentivesScreen} />
      <Stack.Screen name={Routes.VENDOR_OFFERS} component={VendorOffersScreen} />
      <Stack.Screen name={Routes.VENDOR_SUBSCRIPTION_PLANS} component={VendorSubscriptionPlansScreen} />

      {/* Section 14: Vendor Profile & Support */}
      <Stack.Screen name={Routes.VENDOR_PROFILE} component={VendorProfileScreen} />
      <Stack.Screen name={Routes.VENDOR_EDIT_PROFILE} component={VendorEditProfileScreen} />
      <Stack.Screen name={Routes.VENDOR_SERVICE_AREAS} component={VendorServiceAreasScreen} />
      <Stack.Screen name={Routes.VENDOR_EQUIPMENT_DOCS} component={VendorEquipmentDocsScreen} />
      <Stack.Screen name={Routes.VENDOR_NOTIFICATIONS} component={VendorNotificationsScreen} />
      <Stack.Screen name={Routes.VENDOR_HELP_SUPPORT} component={VendorHelpSupportScreen} />
      <Stack.Screen name={Routes.VENDOR_SUPPORT_CHAT} component={VendorSupportChatScreen} />
      <Stack.Screen name={Routes.VENDOR_TERMS_POLICIES} component={VendorTermsPoliciesScreen} />
      <Stack.Screen name={Routes.VENDOR_SETTINGS} component={VendorSettingsScreen} />

      {/* Additional Critical Screens */}
      <Stack.Screen name={Routes.VENDOR_AUTO_ASSIGNMENT_STATUS} component={VendorAutoAssignmentStatusScreen} />
      <Stack.Screen name={Routes.VENDOR_BUSY_STATUS} component={VendorBusyStatusScreen} />
      <Stack.Screen name={Routes.VENDOR_CUSTOMER_NO_SHOW} component={VendorCustomerNoShowScreen} />
      <Stack.Screen name={Routes.VENDOR_EMERGENCY_ASSISTANCE} component={VendorEmergencyAssistanceScreen} />
      <Stack.Screen name={Routes.VENDOR_TRAINING_GUIDELINES} component={VendorTrainingGuidelinesScreen} />
      <Stack.Screen name={Routes.VENDOR_SERVICE_CHECKLIST} component={VendorServiceChecklistScreen} />
      <Stack.Screen name={Routes.VENDOR_ACCOUNT_STATUS} component={VendorAccountStatusScreen} />
    </Stack.Navigator>
  );
};
