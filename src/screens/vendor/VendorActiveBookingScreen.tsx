import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Navigation,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Bike,
  Clock,
  MapPin,
  Sparkles,
  Shield,
  IndianRupee,
  Play,
  Check,
  ExternalLink,
  Camera,
  CheckCircle,
  Zap,
  RefreshCw,
  PlusCircle,
  Tag,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';

const { width } = Dimensions.get('window');

type WorkPhase = 'EN_ROUTE' | 'ARRIVED' | 'WASHING' | 'SETTLED';

export const VendorActiveBookingScreen = ({ navigation, route }: any) => {
  const { bookingId = 'WASH-JOB-9842', initialPhase = 'EN_ROUTE' } = route.params || {};

  const [phase, setPhase] = useState<WorkPhase>(initialPhase);
  const [startOtp, setStartOtp] = useState<string>('4821');
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);

  // Mandatory 2 Photos State
  const [frontPhotoUri, setFrontPhotoUri] = useState<string | null>(
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80'
  );
  const [rearPhotoUri, setRearPhotoUri] = useState<string | null>(
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80'
  );

  // Timer & Reason Selection
  const [timerSeconds, setTimerSeconds] = useState<number>(20 * 60); // 20 mins initial wash countdown
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string>('Standard Cleaning');
  const [extraTimeAdded, setExtraTimeAdded] = useState<number>(0);

  // Active steps completed inside washing
  const [checklist, setChecklist] = useState({
    waterRinse: true,
    foamApplied: false,
    scrubbed: false,
    tirePolish: false,
  });

  // Countdown timer for washing phase
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1: Arrived at location
  const handleMarkArrived = () => {
    setPhase('ARRIVED');
  };

  // Step 2: Upload Photo Handler
  const handleTakeVehiclePhoto = (slot: 'front' | 'rear') => {
    Alert.alert(
      slot === 'front' ? 'Capture Front View' : 'Capture Rear / Side View',
      'Take a clear photo of the customer vehicle in present condition',
      [
        {
          text: 'Take Photo',
          onPress: () => {
            const sample =
              slot === 'front'
                ? 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80'
                : 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80';
            if (slot === 'front') setFrontPhotoUri(sample);
            else setRearPhotoUri(sample);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Step 2: Start OTP validation & begin wash (Requires 2 Photos Mandatory)
  const handleVerifyOtpAndStart = () => {
    if (!frontPhotoUri || !rearPhotoUri) {
      Alert.alert(
        'Mandatory Photos Required',
        'Please capture both Front and Rear/Side photos of the vehicle before verifying OTP and starting the wash.'
      );
      return;
    }

    if (enteredOtp.length === 4 && enteredOtp === startOtp) {
      setOtpError(false);
      setPhase('WASHING');
      setTimerActive(true);
    } else {
      setOtpError(true);
      Alert.alert('Invalid OTP', 'Please ask customer for correct 4-digit start OTP (Hint: 4821)');
    }
  };

  // Add Extra Wash Time with Reason
  const handleAddExtraTime = (extraMins: number, reason: string) => {
    setTimerSeconds((prev) => prev + extraMins * 60);
    setExtraTimeAdded((prev) => prev + extraMins);
    setSelectedReason(reason);
    Alert.alert(
      'Wash Time Extended',
      `Added +${extraMins} Minutes to timer.\nReason: ${reason}`
    );
  };

  // Step 3: Complete Wash
  const handleFinishWash = () => {
    setTimerActive(false);
    setPhase('SETTLED');
  };

  // Step 4: Done & Return to Online Radar Dashboard
  const handleNextOrder = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.VENDOR_DASHBOARD as any, params: { initialOnline: true } }],
    });
  };

  const handleCall = () => {
    Alert.alert('Calling Customer', 'Connecting to Aakash Mishra (+91 98260 XXXXX)...');
  };

  const handleChat = () => {
    Alert.alert('Customer Chat', 'Opening live chat with Aakash Mishra...');
  };

  const handleOpenGoogleMaps = () => {
    Alert.alert('Live GPS Navigation', 'Opening Google Maps Turn-by-Turn GPS to Customer Pin...');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* TOP HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Active Work Mode</Text>
          <Text style={styles.headerSub}>ID: {bookingId}</Text>
        </View>

        {/* Dynamic Status Badge */}
        <View
          style={[
            styles.phaseBadge,
            phase === 'EN_ROUTE' && { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' },
            phase === 'ARRIVED' && { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' },
            phase === 'WASHING' && { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
            phase === 'SETTLED' && { backgroundColor: '#FAF5FF', borderColor: '#E9D5FF' },
          ]}
        >
          <View
            style={[
              styles.phaseDot,
              phase === 'EN_ROUTE' && { backgroundColor: '#2563EB' },
              phase === 'ARRIVED' && { backgroundColor: '#D97706' },
              phase === 'WASHING' && { backgroundColor: '#16A34A' },
              phase === 'SETTLED' && { backgroundColor: '#9333EA' },
            ]}
          />
          <Text
            style={[
              styles.phaseText,
              phase === 'EN_ROUTE' && { color: '#2563EB' },
              phase === 'ARRIVED' && { color: '#D97706' },
              phase === 'WASHING' && { color: '#16A34A' },
              phase === 'SETTLED' && { color: '#9333EA' },
            ]}
          >
            {phase === 'EN_ROUTE' && 'ON THE WAY'}
            {phase === 'ARRIVED' && 'ARRIVED (PHOTOS & OTP)'}
            {phase === 'WASHING' && 'WASH IN-PROGRESS'}
            {phase === 'SETTLED' && 'COMPLETED'}
          </Text>
        </View>
      </View>

      {/* RAPIDO PROGRESS BAR (4 STEPS) */}
      <View style={styles.stepProgressRow}>
        <View style={[styles.stepBar, styles.stepBarActive]} />
        <View style={[styles.stepBar, (phase === 'ARRIVED' || phase === 'WASHING' || phase === 'SETTLED') && styles.stepBarActive]} />
        <View style={[styles.stepBar, (phase === 'WASHING' || phase === 'SETTLED') && styles.stepBarActive]} />
        <View style={[styles.stepBar, phase === 'SETTLED' && styles.stepBarActive]} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ============================================================ */}
        {/* PHASE 1: EN ROUTE */}
        {/* ============================================================ */}
        {phase === 'EN_ROUTE' && (
          <View>
            <View style={styles.mapCard}>
              <View style={styles.mapCanvas}>
                <View style={styles.gridLine1} />
                <View style={styles.gridLine2} />
                <View style={styles.roadLineH} />
                <View style={styles.roadLineV} />
                <View style={styles.routePath} />

                <View style={styles.partnerPin}>
                  <Navigation size={14} color="#0F172A" />
                </View>

                <View style={styles.customerPin}>
                  <MapPin size={16} color="#FFF" />
                </View>

                <View style={styles.etaFloatingBadge}>
                  <Clock size={13} color="#059669" />
                  <Text style={styles.etaFloatingText}>1.8 km • 6 mins ETA</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.openGpsBtn} onPress={handleOpenGoogleMaps}>
                <Navigation size={15} color="#0F172A" />
                <Text style={styles.openGpsText}>Open in Google Maps GPS</Text>
                <ExternalLink size={14} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.customerRow}>
                <View style={styles.custAvatar}>
                  <Text style={styles.custAvatarText}>AM</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.customerName}>Aakash Mishra</Text>
                  <Text style={styles.vehicleSubtitle}>Honda Activa 6G • (MP-09-XX-1234)</Text>
                  <Text style={styles.serviceSubtitle}>Foam Bike Wash + 2 Add-ons</Text>
                </View>
                <View style={styles.actionButtonsCol}>
                  <TouchableOpacity style={styles.callIconBtn} onPress={handleCall}>
                    <Phone size={18} color="#059669" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatIconBtn} onPress={handleChat}>
                    <MessageSquare size={18} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.addressRow}>
                <MapPin size={16} color="#DC2626" style={{ marginTop: 2 }} />
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.addressTitle}>Pickup / Wash Location:</Text>
                  <Text style={styles.addressText}>
                    Flat 304, Green Heights, Near Apollo DB City, Vijay Nagar, Indore
                  </Text>
                  <Text style={styles.notesText}>⚠️ Note: Park vehicle in Basement 1 near Pillar C-4</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* ============================================================ */}
        {/* PHASE 2: ARRIVED (MANDATORY 2 VEHICLE PHOTOS + OTP) */}
        {/* ============================================================ */}
        {phase === 'ARRIVED' && (
          <View>
            <View style={styles.arrivedBanner}>
              <CheckCircle2 size={24} color="#059669" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.arrivedBannerTitle}>You have arrived at Customer Spot</Text>
                <Text style={styles.arrivedBannerSub}>Customer notified. Complete photos & OTP below.</Text>
              </View>
            </View>

            {/* MANDATORY 2 PHOTOS CARD */}
            <View style={styles.card}>
              <View style={styles.photoHeadingRow}>
                <Camera size={18} color="#0F172A" />
                <Text style={styles.cardHeaderTitle}>Vehicle Photos (Minimum 2 Required) *</Text>
              </View>
              <Text style={styles.otpHelperText}>
                Take Front & Rear/Side photos before washing to verify condition & avoid disputes.
              </Text>

              <View style={styles.photoSlotsRow}>
                {/* Photo 1: Front */}
                <View style={styles.photoSlotCol}>
                  <Text style={styles.photoSlotLabel}>1. Front View *</Text>
                  {frontPhotoUri ? (
                    <View style={styles.photoPreviewBox}>
                      <Image source={{ uri: frontPhotoUri }} style={styles.previewImage} />
                      <View style={styles.photoDoneBadge}>
                        <CheckCircle2 size={12} color="#059669" />
                        <Text style={styles.photoDoneText}>Attached</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.retakeMiniBtn}
                        onPress={() => handleTakeVehiclePhoto('front')}
                      >
                        <RefreshCw size={11} color="#0F172A" />
                        <Text style={styles.retakeMiniText}>Retake</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.photoPlaceholder}
                      onPress={() => handleTakeVehiclePhoto('front')}
                    >
                      <Camera size={22} color="#64748B" />
                      <Text style={styles.photoPlaceholderText}>Take Photo</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Photo 2: Rear / Side */}
                <View style={styles.photoSlotCol}>
                  <Text style={styles.photoSlotLabel}>2. Rear / Side View *</Text>
                  {rearPhotoUri ? (
                    <View style={styles.photoPreviewBox}>
                      <Image source={{ uri: rearPhotoUri }} style={styles.previewImage} />
                      <View style={styles.photoDoneBadge}>
                        <CheckCircle2 size={12} color="#059669" />
                        <Text style={styles.photoDoneText}>Attached</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.retakeMiniBtn}
                        onPress={() => handleTakeVehiclePhoto('rear')}
                      >
                        <RefreshCw size={11} color="#0F172A" />
                        <Text style={styles.retakeMiniText}>Retake</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.photoPlaceholder}
                      onPress={() => handleTakeVehiclePhoto('rear')}
                    >
                      <Camera size={22} color="#64748B" />
                      <Text style={styles.photoPlaceholderText}>Take Photo</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {/* OTP VERIFICATION CARD */}
            <View style={styles.card}>
              <View style={styles.otpCardHeader}>
                <Shield size={20} color="#0F172A" />
                <Text style={styles.cardHeaderTitle}>Enter 4-Digit Customer Start OTP *</Text>
              </View>
              <Text style={styles.otpHelperText}>
                Ask customer for start OTP to begin service.
              </Text>

              <View style={styles.otpInputContainer}>
                <TextInput
                  style={[styles.otpInputBox, otpError && styles.otpInputBoxError]}
                  keyboardType="number-pad"
                  maxLength={4}
                  placeholder="• • • •"
                  placeholderTextColor="#94A3B8"
                  value={enteredOtp}
                  onChangeText={(val) => {
                    setEnteredOtp(val);
                    setOtpError(false);
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.demoFillBtn}
                onPress={() => setEnteredOtp('4821')}
              >
                <Zap size={13} color="#D97706" />
                <Text style={styles.demoFillText}>Quick Demo Fill OTP: 4821</Text>
              </TouchableOpacity>
            </View>

            {/* CUSTOMER INFO */}
            <View style={styles.card}>
              <View style={styles.customerRow}>
                <View style={styles.custAvatar}>
                  <Text style={styles.custAvatarText}>AM</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.customerName}>Aakash Mishra</Text>
                  <Text style={styles.vehicleSubtitle}>Honda Activa 6G (MP-09-XX-1234)</Text>
                </View>
                <TouchableOpacity style={styles.callIconBtn} onPress={handleCall}>
                  <Phone size={18} color="#059669" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* ============================================================ */}
        {/* PHASE 3: WASH IN PROGRESS & LIVE TIMER WITH REASON SELECTOR */}
        {/* ============================================================ */}
        {phase === 'WASHING' && (
          <View>
            {/* LIVE WASH TIMER CARD */}
            <View style={styles.timerLiveCard}>
              <Text style={styles.timerLiveLabel}>LIVE WASHING TIME REMAINING</Text>
              <Text style={styles.timerLiveTime}>{formatTimer(timerSeconds)}</Text>
              <View style={styles.timerProgressBar}>
                <View
                  style={[
                    styles.timerProgressFill,
                    { width: `${Math.max(10, ((20 * 60 + extraTimeAdded * 60 - timerSeconds) / (20 * 60 + extraTimeAdded * 60)) * 100)}%` },
                  ]}
                />
              </View>
              <View style={styles.timerMetaRow}>
                <Text style={styles.timerProgressNote}>
                  Mode: <Text style={{ color: '#FFC80A', fontWeight: '700' }}>{selectedReason}</Text>
                </Text>
                {extraTimeAdded > 0 && (
                  <Text style={styles.extraTimeBadge}>+{extraTimeAdded} Mins Added</Text>
                )}
              </View>
            </View>

            {/* EXTEND TIME & REASON SELECTOR CARD */}
            <View style={styles.card}>
              <View style={styles.reasonHeaderRow}>
                <Clock size={16} color="#0F172A" />
                <Text style={styles.cardHeaderTitle}>Need Extra Time for Heavy Dirt?</Text>
              </View>
              <Text style={styles.otpHelperText}>
                Select reason to add extra minutes to your washing timer:
              </Text>

              <View style={styles.reasonsList}>
                {[
                  { reason: 'Heavy Mud & Dirt (ज्यादा गंदी है)', mins: 10 },
                  { reason: 'Tire & Chain Degreasing Needed', mins: 10 },
                  { reason: 'Customer Requested Extra Detailing', mins: 15 },
                  { reason: 'Interior Deep Stain Removal', mins: 20 },
                ].map((item, idx) => {
                  const isCurrent = selectedReason === item.reason;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.reasonItem, isCurrent && styles.reasonItemActive]}
                      onPress={() => handleAddExtraTime(item.mins, item.reason)}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.reasonItemTitle, isCurrent && styles.reasonItemTitleActive]}>
                          {item.reason}
                        </Text>
                      </View>
                      <View style={styles.addTimePill}>
                        <PlusCircle size={13} color="#0F172A" />
                        <Text style={styles.addTimePillText}>+{item.mins}m</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* STEP CHECKLIST */}
            <View style={styles.card}>
              <Text style={styles.cardHeaderTitle}>Live Wash Steps</Text>
              <Text style={styles.otpHelperText}>Tap milestones as you clean:</Text>

              <TouchableOpacity
                style={styles.checkItem}
                onPress={() => setChecklist((prev) => ({ ...prev, waterRinse: !prev.waterRinse }))}
              >
                <View style={[styles.checkCircle, checklist.waterRinse && styles.checkCircleActive]}>
                  {checklist.waterRinse && <Check size={14} color="#0F172A" />}
                </View>
                <Text style={[styles.checkItemText, checklist.waterRinse && styles.checkItemDone]}>
                  1. High Pressure Water Rinse
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkItem}
                onPress={() => setChecklist((prev) => ({ ...prev, foamApplied: !prev.foamApplied }))}
              >
                <View style={[styles.checkCircle, checklist.foamApplied && styles.checkCircleActive]}>
                  {checklist.foamApplied && <Check size={14} color="#0F172A" />}
                </View>
                <Text style={[styles.checkItemText, checklist.foamApplied && styles.checkItemDone]}>
                  2. Snow Foam Cannon Spray & Microfiber Scrub
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkItem}
                onPress={() => setChecklist((prev) => ({ ...prev, scrubbed: !prev.scrubbed }))}
              >
                <View style={[styles.checkCircle, checklist.scrubbed && styles.checkCircleActive]}>
                  {checklist.scrubbed && <Check size={14} color="#0F172A" />}
                </View>
                <Text style={[styles.checkItemText, checklist.scrubbed && styles.checkItemDone]}>
                  3. Clean Water Final Wash & Air Blow Dry
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkItem}
                onPress={() => setChecklist((prev) => ({ ...prev, tirePolish: !prev.tirePolish }))}
              >
                <View style={[styles.checkCircle, checklist.tirePolish && styles.checkCircleActive]}>
                  {checklist.tirePolish && <Check size={14} color="#0F172A" />}
                </View>
                <Text style={[styles.checkItemText, checklist.tirePolish && styles.checkItemDone]}>
                  4. Tire Dressing & Dashboard Shine
                </Text>
              </TouchableOpacity>
            </View>

            {/* REPORT ISSUE */}
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.issueRow}
                onPress={() =>
                  navigation.navigate(Routes.VENDOR_ISSUE_REPORT as any, {
                    bookingId,
                  })
                }
              >
                <AlertTriangle size={18} color="#DC2626" />
                <Text style={styles.issueText}>No Water / Socket Issue? Report to Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ============================================================ */}
        {/* PHASE 4: COMPLETED */}
        {/* ============================================================ */}
        {phase === 'SETTLED' && (
          <View>
            <View style={styles.successEarnCard}>
              <View style={styles.successIconCircle}>
                <CheckCircle2 size={36} color="#059669" />
              </View>
              <Text style={styles.successTitle}>Wash Completed Successfully!</Text>
              <Text style={styles.successSub}>Credited instantly to your WashOn Wallet</Text>

              <View style={styles.netEarningBox}>
                <Text style={styles.netEarningLabel}>YOUR NET EARNING</Text>
                <Text style={styles.netEarningAmount}>₹308.00</Text>
                <View style={styles.settledPill}>
                  <Check size={12} color="#059669" />
                  <Text style={styles.settledPillText}>Auto-Settled in Wallet</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardHeaderTitle}>Fare & Earning Breakdown</Text>
              <View style={styles.billRow}>
                <Text style={styles.billKey}>Foam Bike Wash Base Fare</Text>
                <Text style={styles.billVal}>₹249.00</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billKey}>2x Add-ons (Tire + Chain Polish)</Text>
                <Text style={styles.billVal}>+₹110.00</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billKey}>Platform Fee & Taxes</Text>
                <Text style={styles.billValNeg}>-₹51.00</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.billRow}>
                <Text style={styles.billKeyTotal}>Total Vendor Payout</Text>
                <Text style={styles.billValTotal}>₹308.00</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.paymentStatusRow}>
                <View style={styles.paidBadge}>
                  <CheckCircle size={18} color="#059669" />
                  <Text style={styles.paidBadgeText}>PREPAID (ONLINE)</Text>
                </View>
                <Text style={styles.collectZeroText}>Cash to Collect: ₹0</Text>
              </View>
              <Text style={styles.otpHelperText}>
                Customer already paid online via UPI. Do not ask for cash.
              </Text>
            </View>
          </View>
        )}

      </ScrollView>

      {/* RAPIDO STYLE DYNAMIC BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        {phase === 'EN_ROUTE' && (
          <TouchableOpacity style={styles.rapidoActionBtn} onPress={handleMarkArrived}>
            <View style={styles.btnIconCircle}>
              <MapPin size={18} color="#0F172A" />
            </View>
            <Text style={styles.rapidoActionBtnText}>🟢 I HAVE ARRIVED (पहुँच गया)</Text>
          </TouchableOpacity>
        )}

        {phase === 'ARRIVED' && (
          <TouchableOpacity style={styles.rapidoActionBtn} onPress={handleVerifyOtpAndStart}>
            <View style={styles.btnIconCircle}>
              <Play size={18} color="#0F172A" fill="#0F172A" />
            </View>
            <Text style={styles.rapidoActionBtnText}>🚀 VERIFY & START WASH (वॉश शुरू करें)</Text>
          </TouchableOpacity>
        )}

        {phase === 'WASHING' && (
          <TouchableOpacity style={styles.rapidoActionBtn} onPress={handleFinishWash}>
            <View style={styles.btnIconCircle}>
              <Sparkles size={18} color="#0F172A" />
            </View>
            <Text style={styles.rapidoActionBtnText}>✨ COMPLETE WASH (वॉश पूरा हुआ)</Text>
          </TouchableOpacity>
        )}

        {phase === 'SETTLED' && (
          <TouchableOpacity style={styles.rapidoActionBtn} onPress={handleNextOrder}>
            <View style={styles.btnIconCircle}>
              <Zap size={18} color="#0F172A" />
            </View>
            <Text style={styles.rapidoActionBtnText}>⚡ READY FOR NEXT JOB (अगला आर्डर लें)</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  phaseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  phaseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  phaseText: {
    fontSize: 11,
    fontWeight: '700',
  },
  stepProgressRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  stepBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  stepBarActive: {
    backgroundColor: '#FFC80A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  mapCanvas: {
    height: 180,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLine1: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  gridLine2: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#CBD5E1',
  },
  roadLineH: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: '#FFFFFF',
  },
  roadLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 24,
    backgroundColor: '#FFFFFF',
  },
  routePath: {
    position: 'absolute',
    top: 70,
    left: 70,
    width: 170,
    height: 4,
    backgroundColor: '#2563EB',
    borderRadius: 2,
    transform: [{ rotate: '25deg' }],
  },
  partnerPin: {
    position: 'absolute',
    left: 60,
    top: 55,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  customerPin: {
    position: 'absolute',
    right: 70,
    bottom: 45,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  etaFloatingBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 2,
  },
  etaFloatingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  openGpsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFBEB',
    borderTopWidth: 1,
    borderTopColor: '#FEF3C7',
    gap: 8,
  },
  openGpsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  custAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFC80A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  custAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  vehicleSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#334155',
    marginTop: 2,
  },
  serviceSubtitle: {
    fontSize: 11,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 1,
  },
  actionButtonsCol: {
    flexDirection: 'row',
    gap: 8,
  },
  callIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  chatIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  addressText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0F172A',
    marginTop: 2,
    lineHeight: 18,
  },
  notesText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#D97706',
    marginTop: 6,
  },
  arrivedBanner: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  arrivedBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  arrivedBannerSub: {
    fontSize: 12,
    fontWeight: '400',
    color: '#047857',
    marginTop: 2,
  },
  photoHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoSlotsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  photoSlotCol: {
    flex: 1,
  },
  photoSlotLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  photoPlaceholder: {
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  photoPlaceholderText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  photoPreviewBox: {
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  photoDoneBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  photoDoneText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#059669',
  },
  retakeMiniBtn: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    elevation: 2,
  },
  retakeMiniText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0F172A',
  },
  otpCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  otpHelperText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 4,
  },
  otpInputContainer: {
    alignItems: 'center',
    marginVertical: 14,
  },
  otpInputBox: {
    width: 180,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 8,
  },
  otpInputBoxError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFBEB',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  demoFillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  timerLiveCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
  },
  timerLiveLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
  },
  timerLiveTime: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFC80A',
    marginVertical: 4,
  },
  timerProgressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#334155',
    overflow: 'hidden',
    marginVertical: 6,
  },
  timerProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  timerMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
  },
  timerProgressNote: {
    fontSize: 11,
    fontWeight: '400',
    color: '#94A3B8',
  },
  extraTimeBadge: {
    backgroundColor: '#FEF3C7',
    color: '#B45309',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  reasonHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reasonsList: {
    gap: 8,
    marginTop: 10,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reasonItemActive: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FFC80A',
  },
  reasonItemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  reasonItemTitleActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  addTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC80A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  addTimePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkCircleActive: {
    backgroundColor: '#FFC80A',
    borderColor: '#FFC80A',
  },
  checkItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
  },
  checkItemDone: {
    color: '#0F172A',
    fontWeight: '700',
  },
  issueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  issueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  successEarnCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  successSub: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 2,
  },
  netEarningBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
    width: '100%',
  },
  netEarningLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
    letterSpacing: 1,
  },
  netEarningAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginVertical: 2,
  },
  settledPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
    marginTop: 4,
  },
  settledPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  billKey: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
  },
  billVal: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0F172A',
  },
  billValNeg: {
    fontSize: 13,
    fontWeight: '500',
    color: '#DC2626',
  },
  billKeyTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  billValTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  paymentStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  paidBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  collectZeroText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  rapidoActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC80A',
    height: 52,
    borderRadius: 14,
    gap: 10,
  },
  btnIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rapidoActionBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});
