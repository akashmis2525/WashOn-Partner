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
  VENDOR_VERIFICATION_REJECTED: 'V012_VendorVerificationRejected',

  // SECTION 3: VENDOR SERVICE SETUP (V013 - V020)
  VENDOR_SERVICE_AREA: 'V013_VendorServiceArea',
  VENDOR_VEHICLE_TYPES: 'V014_VendorVehicleTypes',
  VENDOR_EQUIPMENT_DETAILS: 'V015_VendorEquipmentDetails',
  VENDOR_EQUIPMENT_VERIFY: 'V016_VendorEquipmentVerify',
  VENDOR_SERVICES_OFFERED: 'V017_VendorServicesOffered',
  VENDOR_PRICING_SETUP: 'V018_VendorPricingSetup',
  VENDOR_WORKING_HOURS: 'V019_VendorWorkingHours',
  VENDOR_AVAILABILITY_SETUP: 'V020_VendorAvailabilitySetup',

  // SECTION 4: VENDOR HOME DASHBOARD & ONLINE STATUS (V021 - V023)
  VENDOR_DASHBOARD: 'V021_VendorDashboard',
  VENDOR_ONLINE_CONFIRM: 'V022_VendorOnlineConfirm',
  VENDOR_OFFLINE_CONFIRM: 'V023_VendorOfflineConfirm',

  // VENDOR JOBS & EXECUTION (V024 - V032)
  VENDOR_LIVE_REQUEST: 'V024_VendorLiveRequest',
  VENDOR_NAVIGATION_MAP: 'V025_VendorNavigationMap',
  VENDOR_ARRIVED: 'V026_VendorArrived',
  VENDOR_PRE_WASH_PHOTOS: 'V027_VendorPreWashPhotos',
  VENDOR_WASH_EXECUTION: 'V028_VendorWashExecution',
  VENDOR_POST_WASH_PHOTOS: 'V029_VendorPostWashPhotos',
  VENDOR_PAYMENT_COLLECTION: 'V030_VendorPaymentCollection',
  VENDOR_EARNINGS: 'V031_VendorEarnings',
  VENDOR_PROFILE: 'V032_VendorProfile',
} as const;

export type RouteNames = typeof Routes[keyof typeof Routes];
