export const Routes = {
  // VENDOR AUTH & ONBOARDING (V001 - V008)
  VENDOR_SPLASH: 'V001_VendorSplash',
  VENDOR_ONBOARDING_1: 'V002_VendorOnboarding1',
  VENDOR_ONBOARDING_2: 'V003_VendorOnboarding2',
  VENDOR_ONBOARDING_3: 'V004_VendorOnboarding3',
  VENDOR_LOGIN: 'V005_VendorLogin',
  VENDOR_OTP_VERIFY: 'V006_VendorOtpVerify',
  VENDOR_PROFILE_SETUP: 'V007_VendorProfileSetup',
  VENDOR_TYPE_SELECTION: 'V008_VendorTypeSelection',
  VENDOR_KYC_VERIFY: 'V009_VendorKycVerify',
  VENDOR_VERIFICATION_PENDING: 'V010_VendorVerificationPending',
  VENDOR_VERIFICATION_APPROVED: 'V011_VendorVerificationApproved',
  VENDOR_SERVICE_SETUP: 'V012_VendorServiceSetup',

  // VENDOR DASHBOARD & JOBS
  VENDOR_DASHBOARD: 'V013_VendorDashboard',
  VENDOR_LIVE_REQUEST: 'V014_VendorLiveRequest',
  VENDOR_NAVIGATION_MAP: 'V015_VendorNavigationMap',
  VENDOR_ARRIVED: 'V016_VendorArrived',
  VENDOR_PRE_WASH_PHOTOS: 'V017_VendorPreWashPhotos',
  VENDOR_WASH_EXECUTION: 'V018_VendorWashExecution',
  VENDOR_POST_WASH_PHOTOS: 'V019_VendorPostWashPhotos',
  VENDOR_PAYMENT_COLLECTION: 'V020_VendorPaymentCollection',
  VENDOR_EARNINGS: 'V021_VendorEarnings',
  VENDOR_PROFILE: 'V022_VendorProfile',
} as const;

export type RouteNames = typeof Routes[keyof typeof Routes];
