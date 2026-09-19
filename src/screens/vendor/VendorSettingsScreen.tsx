import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Bell,
  MapPin,
  Globe,
  CreditCard,
  Lock,
  LogOut,
  Trash2,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorSettingsScreen = ({ navigation }: any) => {
  const [notifSound, setNotifSound] = useState(true);
  const [highAccuracyGps, setHighAccuracyGps] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi / English');

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out of your partner account?', [
      { text: 'Log Out', style: 'destructive', onPress: () => navigation.navigate(Routes.VENDOR_LOGIN as any) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleDeactivate = () => {
    Alert.alert('Deactivate Account', 'Please contact partner support to settle any pending balances before account closure.', [
      { text: 'Contact Support', onPress: () => navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any) },
      { text: 'Cancel', style: 'cancel' },
    ]);
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
          <Text style={styles.headerTitle}>App Settings</Text>
          <Text style={styles.headerSubtitle}>Preferences & Account Security</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Bell size={18} color="#0F172A" />
              <View>
                <Text style={styles.settingTitle}>Loud Order Alert Sound</Text>
                <Text style={styles.settingSub}>Plays ringtone when new job arrives</Text>
              </View>
            </View>
            <Switch
              value={notifSound}
              onValueChange={setNotifSound}
              trackColor={{ false: '#E2E8F0', true: Colors.primary }}
            />
          </View>
        </View>

        {/* Location & GPS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Location & Navigation</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <MapPin size={18} color="#0F172A" />
              <View>
                <Text style={styles.settingTitle}>High Accuracy Background GPS</Text>
                <Text style={styles.settingSub}>Enables live customer tracking</Text>
              </View>
            </View>
            <Switch
              value={highAccuracyGps}
              onValueChange={setHighAccuracyGps}
              trackColor={{ false: '#E2E8F0', true: Colors.primary }}
            />
          </View>
        </View>

        {/* Language */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Language & Regional</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Alert.alert('Choose Language', 'Options: Hindi, Hinglish, English')}
          >
            <View style={styles.settingLeft}>
              <Globe size={18} color="#0F172A" />
              <View>
                <Text style={styles.settingTitle}>App Display Language</Text>
                <Text style={styles.settingSub}>{selectedLanguage}</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Security & Password */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Security</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Alert.alert('Change PIN', 'OTP sent to mobile to reset 4-digit quick login PIN.')}
          >
            <View style={styles.settingLeft}>
              <Lock size={18} color="#0F172A" />
              <View>
                <Text style={styles.settingTitle}>Change 4-Digit Quick PIN</Text>
                <Text style={styles.settingSub}>Used for quick login & withdrawals</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Account Actions */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
            <LogOut size={18} color="#0F172A" />
            <Text style={styles.logoutText}>Log Out of Partner Account</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.deleteRow} onPress={handleDeactivate}>
            <Trash2 size={18} color="#DC2626" />
            <Text style={styles.deleteText}>Deactivate or Delete Partner Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  settingSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  deleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  deleteText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
});
