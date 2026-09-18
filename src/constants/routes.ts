export const Routes = {
  // VENDOR AUTH & ONBOARDING (V001 - V008)
  VENDOR_SPLASH: 'V001_VendorSplash',
  VENDOR_ONBOARDING_1: 'V002_VendorOnboarding1',
  VENDOR_ONBOARDING_2: 'V003_VendorOnboarding2',
  VENDOR_ONBOARDING_3: 'V004_VendorOnboarding3',
  VENDOR_LOGIN: 'V005_VendorLogin',
  VENDOR_OTP_VERIFY: 'V006_VendorOtpVerify',
  VENDOR_PROFILE_SETUP: 'V007_VendorProfileSetup',
  VENDOR_KYC_DOCUMENTS: 'V008_VendorKycDocuments',

  // VENDOR DASHBOARD & JOBS
  VENDOR_DASHBOARD: 'V009_VendorDashboard',
  VENDOR_LIVE_REQUEST: 'V010_VendorLiveRequest',
  VENDOR_NAVIGATION_MAP: 'V011_VendorNavigationMap',
  VENDOR_ARRIVED: 'V012_VendorArrived',
  VENDOR_PRE_WASH_PHOTOS: 'V013_VendorPreWashPhotos',
  VENDOR_WASH_EXECUTION: 'V014_VendorWashExecution',
  VENDOR_POST_WASH_PHOTOS: 'V015_VendorPostWashPhotos',
  VENDOR_PAYMENT_COLLECTION: 'V016_VendorPaymentCollection',
  VENDOR_EARNINGS: 'V017_VendorEarnings',
  VENDOR_PROFILE: 'V018_VendorProfile',
} as const;

export type RouteNames = typeof Routes[keyof typeof Routes];
