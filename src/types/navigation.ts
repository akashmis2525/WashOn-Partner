import { Routes } from '../constants/routes';

export type RootStackParamList = {
  [Routes.VENDOR_SPLASH]: undefined;
  [Routes.VENDOR_ONBOARDING_1]: undefined;
  [Routes.VENDOR_ONBOARDING_2]: undefined;
  [Routes.VENDOR_ONBOARDING_3]: undefined;
  [Routes.VENDOR_LOGIN]: undefined;
  [Routes.VENDOR_OTP_VERIFY]: { phoneNumber: string };
  [Routes.VENDOR_PROFILE_SETUP]: undefined;
  [Routes.VENDOR_TYPE_SELECTION]: undefined;
  [Routes.VENDOR_KYC_VERIFY]: undefined;
  [Routes.VENDOR_VERIFICATION_PENDING]: undefined;
  [Routes.VENDOR_VERIFICATION_APPROVED]: undefined;
  [Routes.VENDOR_VERIFICATION_REJECTED]: undefined;
  [Routes.VENDOR_SERVICE_AREA]: undefined;
  [Routes.VENDOR_VEHICLE_TYPES]: undefined;
  [Routes.VENDOR_EQUIPMENT_DETAILS]: undefined;
  [Routes.VENDOR_EQUIPMENT_VERIFY]: undefined;
  [Routes.VENDOR_SERVICES_OFFERED]: undefined;
  [Routes.VENDOR_PRICING_SETUP]: undefined;
  [Routes.VENDOR_WORKING_HOURS]: undefined;
  [Routes.VENDOR_AVAILABILITY_SETUP]: undefined;
  [Routes.VENDOR_DASHBOARD]: { initialOnline?: boolean } | undefined;
  [Routes.VENDOR_ONLINE_CONFIRM]: undefined;
  [Routes.VENDOR_OFFLINE_CONFIRM]: { hasActiveBooking?: boolean } | undefined;

  // SECTION 5: BOOKING REQUESTS (V024 - V027)
  [Routes.VENDOR_NEW_REQUEST]: undefined;
  [Routes.VENDOR_REQUEST_DETAILS]: { bookingId?: string } | undefined;
  [Routes.VENDOR_BOOKING_ACCEPTED]: { bookingId?: string } | undefined;
  [Routes.VENDOR_BOOKING_REJECTED]: { reason?: string } | undefined;

  // SECTION 6: NAVIGATION & CUSTOMER ARRIVAL (V028 - V031)
  [Routes.VENDOR_NAVIGATE_CUSTOMER]: { bookingId?: string } | undefined;
  [Routes.VENDOR_ON_THE_WAY]: { bookingId?: string } | undefined;
  [Routes.VENDOR_ARRIVED]: { bookingId?: string } | undefined;
  [Routes.VENDOR_UNABLE_TO_FIND]: { bookingId?: string } | undefined;

  // SECTION 7: SERVICE START & BEFORE PHOTOS (V032 - V035)
  [Routes.VENDOR_START_VERIFICATION]: { bookingId?: string } | undefined;
  [Routes.VENDOR_BEFORE_PHOTOS]: { bookingId?: string } | undefined;
  [Routes.VENDOR_DAMAGE_NOTES]: { bookingId?: string } | undefined;
  [Routes.VENDOR_CUSTOMER_APPROVAL_START]: { bookingId?: string } | undefined;

  // SECTION 8: WASH PROCESS (V036 - V039)
  [Routes.VENDOR_SERVICE_IN_PROGRESS]: { bookingId?: string } | undefined;
  [Routes.VENDOR_ACTIVITY_UPDATE]: { bookingId?: string } | undefined;
  [Routes.VENDOR_ADDON_CONFIRMATION]: { bookingId?: string } | undefined;
  [Routes.VENDOR_ISSUE_REPORT]: { bookingId?: string } | undefined;

  // SECTION 9: COMPLETION & AFTER PHOTOS (V040 - V044)
  [Routes.VENDOR_AFTER_PHOTOS]: { bookingId?: string } | undefined;
  [Routes.VENDOR_BEFORE_AFTER_COMPARE]: { bookingId?: string } | undefined;
  [Routes.VENDOR_COMPLETION_SUMMARY]: { bookingId?: string } | undefined;
  [Routes.VENDOR_CUSTOMER_APPROVAL_PENDING]: { bookingId?: string } | undefined;
  [Routes.VENDOR_SERVICE_COMPLETED]: { bookingId?: string } | undefined;

  // SECTION 10: EARNINGS & PAYMENTS (V045 - V050)
  [Routes.VENDOR_EARNINGS_DASHBOARD]: undefined;
  [Routes.VENDOR_EARNINGS_BREAKDOWN]: { bookingId?: string } | undefined;
  [Routes.VENDOR_PAYMENT_STATUS]: { bookingId?: string; status?: string } | undefined;
  [Routes.VENDOR_BANK_DETAILS]: undefined;
  [Routes.VENDOR_WITHDRAWAL]: undefined;
  [Routes.VENDOR_TRANSACTION_HISTORY]: undefined;

  // REMAINING VENDOR SECTIONS
  [Routes.VENDOR_PROFILE]: undefined;
};
