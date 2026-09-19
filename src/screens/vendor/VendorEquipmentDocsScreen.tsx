import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Wrench,
  FileText,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';

export const VendorEquipmentDocsScreen = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Equipment & KYC Docs</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Uploaded Documents */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>KYC & Identity Documents</Text>

          {[
            { name: 'Aadhaar Card (Front & Back)', status: 'Verified', exp: 'Lifetime', valid: true },
            { name: 'PAN Card Verification', status: 'Verified', exp: 'Lifetime', valid: true },
            { name: 'Driving Licence / Vehicle RC', status: 'Verified', exp: 'Valid till 2030', valid: true },
            { name: 'Police Verification Certificate', status: 'Expiring in 60 days', exp: '15 Nov 2026', valid: false },
          ].map((doc, i) => (
            <View key={i} style={styles.itemRow}>
              <FileText size={20} color="#0F172A" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{doc.name}</Text>
                <Text style={styles.itemSub}>{doc.exp}</Text>
              </View>
              <View style={[styles.badge, doc.valid ? styles.badgeGreen : styles.badgeYellow]}>
                <Text style={doc.valid ? styles.badgeTextGreen : styles.badgeTextYellow}>
                  {doc.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Equipment List */}
        <View style={styles.card}>
          <View style={styles.cardHeaderWithBtn}>
            <Text style={styles.cardTitle}>Verified Equipment List</Text>
            <TouchableOpacity
              style={styles.addSmallBtn}
              onPress={() => Alert.alert('Add Equipment', 'Camera scanner will open to register new equipment serial number.')}
            >
              <Plus size={14} color="#0F172A" />
              <Text style={styles.addSmallBtnText}>Add Tool</Text>
            </TouchableOpacity>
          </View>

          {[
            { name: '1800W High Pressure Car Washer', brand: 'Bosch Aquatak 125', status: 'Operational' },
            { name: 'Heavy Duty Snow Foam Cannon Gun', brand: 'WashOn Pro Series', status: 'Operational' },
            { name: '1200W Wet & Dry Car Vacuum Cleaner', brand: 'Inalsa Master Vac', status: 'Operational' },
            { name: 'Dual Action Orbital Polisher', brand: 'Shinemate Pro', status: 'Operational' },
          ].map((eq, i) => (
            <View key={i} style={styles.itemRow}>
              <Wrench size={20} color="#B45309" />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{eq.name}</Text>
                <Text style={styles.itemSub}>{eq.brand}</Text>
              </View>
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeTextGreen}>{eq.status}</Text>
              </View>
            </View>
          ))}
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
  cardHeaderWithBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  addSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  addSmallBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    gap: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeGreen: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTextGreen: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  badgeYellow: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTextYellow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
});
