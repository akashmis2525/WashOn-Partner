import { Routes } from '../constants/routes';

export type RootStackParamList = {
  [Routes.VENDOR_SPLASH]: undefined;
  [Routes.VENDOR_ONBOARDING_1]: undefined;
  [Routes.VENDOR_ONBOARDING_2]: undefined;
  [Routes.VENDOR_ONBOARDING_3]: undefined;
  [Routes.VENDOR_LOGIN]: undefined;
  [Routes.VENDOR_OTP_VERIFY]: { phoneNumber: string };
  [Routes.VENDOR_PROFILE_SETUP]: undefined;
  [Routes.VENDOR_KYC_DOCUMENTS]: undefined;
  [Routes.VENDOR_DASHBOARD]: undefined;
  [Routes.VENDOR_LIVE_REQUEST]: { jobId: string };
  [Routes.VENDOR_NAVIGATION_MAP]: { jobId: string };
  [Routes.VENDOR_ARRIVED]: { jobId: string };
  [Routes.VENDOR_PRE_WASH_PHOTOS]: { jobId: string };
  [Routes.VENDOR_WASH_EXECUTION]: { jobId: string };
  [Routes.VENDOR_POST_WASH_PHOTOS]: { jobId: string };
  [Routes.VENDOR_PAYMENT_COLLECTION]: { jobId: string };
  [Routes.VENDOR_EARNINGS]: undefined;
  [Routes.VENDOR_PROFILE]: undefined;
};
