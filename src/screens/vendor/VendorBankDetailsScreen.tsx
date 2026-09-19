import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Save,
  Lock,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';

export const VendorBankDetailsScreen = ({ navigation }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  const [holderName, setHolderName] = useState('RAMESH KUMAR SOLANKI');
  const [bankName, setBankName] = useState('State Bank of India (SBI)');
  const [accountNumber, setAccountNumber] = useState('389201948201');
  const [ifsc, setIfsc] = useState('SBIN0001234');
  const [upiId, setUpiId] = useState('ramesh.washon@oksbi');
  const [isVerified, setIsVerified] = useState(true);

  const handleVerifyBank = () => {
    Alert.alert(
      'Penny Drop Verification',
      '₹1 has been successfully deposited into your account for Penny-Drop Verification. Status: VERIFIED',
      [{ text: 'Great!' }]
    );
    setIsVerified(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Bank & UPI payout details updated successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Bank & UPI Account</Text>
        </View>
        <TouchableOpacity
          style={styles.editHeaderBtn}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editHeaderText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Verification Status Card */}
        <View style={styles.verifiedBanner}>
          <ShieldCheck size={28} color="#059669" />
          <View style={styles.verifiedTextWrap}>
            <View style={styles.verifiedHeaderRow}>
              <Text style={styles.verifiedTitle}>Bank Account Active</Text>
              <View style={styles.verifiedBadge}>
                <CheckCircle2 size={12} color="#059669" />
                <Text style={styles.verifiedBadgeText}>Penny Drop Verified</Text>
              </View>
            </View>
            <Text style={styles.verifiedDesc}>
              Daily automated settlements will be credited directly to this linked bank account.
            </Text>
          </View>
        </View>

        {/* Bank Form */}
        <View style={styles.formCard}>
          <View style={styles.formSectionHeader}>
            <Building2 size={18} color="#0F172A" />
            <Text style={styles.formSectionTitle}>Bank Account Details</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Account Holder Name (As per Bank/PAN)</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={holderName}
              onChangeText={setHolderName}
              editable={isEditing}
              placeholder="e.g. Ramesh Kumar"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bank Name & Branch</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={bankName}
              onChangeText={setBankName}
              editable={isEditing}
              placeholder="e.g. HDFC Bank, Palasia Branch"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Account Number</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={accountNumber}
              onChangeText={setAccountNumber}
              editable={isEditing}
              keyboardType="number-pad"
              secureTextEntry={!isEditing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>IFSC Code</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={ifsc}
              onChangeText={text => setIfsc(text.toUpperCase())}
              editable={isEditing}
              autoCapitalize="characters"
            />
          </View>
        </View>

        {/* UPI ID Form */}
        <View style={styles.formCard}>
          <View style={styles.formSectionHeader}>
            <Smartphone size={18} color="#0F172A" />
            <Text style={styles.formSectionTitle}>Primary UPI ID (Instant Payouts)</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>UPI ID / VPA</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={upiId}
              onChangeText={setUpiId}
              editable={isEditing}
              placeholder="mobile@upi or name@bank"
            />
          </View>
        </View>

        {/* Security Notice */}
        <View style={styles.securityBox}>
          <Lock size={16} color="#64748B" />
          <Text style={styles.securityText}>
            Your banking data is 256-bit encrypted. WashOn will never ask for your debit card PIN or OTP.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Save size={18} color={Colors.textPrimary} />
            <Text style={styles.saveBtnText}>Save & Update Details</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyBank}>
            <ShieldCheck size={18} color="#059669" />
            <Text style={styles.verifyBtnText}>Re-run Instant Verification (₹1 Penny Drop)</Text>
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  editHeaderBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  editHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  verifiedBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
    gap: 12,
  },
  verifiedTextWrap: {
    flex: 1,
  },
  verifiedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  verifiedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  verifiedDesc: {
    fontSize: 11,
    color: '#047857',
    lineHeight: 16,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  formSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  formSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    height: 46,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
  },
  inputDisabled: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    color: '#334155',
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
  },
  securityText: {
    flex: 1,
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  saveBtn: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  verifyBtn: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  verifyBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
});
