import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  FileText,
  Shield,
  Percent,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';

interface PolicyItem {
  id: string;
  title: string;
  desc: string;
}

export const VendorTermsPoliciesScreen = ({ navigation }: any) => {
  const [expanded, setExpanded] = useState<string | null>('1');

  const policies: PolicyItem[] = [
    {
      id: '1',
      title: 'Partner Commission & Payout Policy',
      desc: 'Standard platform commission is capped at 11-12% for completed bookings. Customer tips are 100% vendor earnings with zero deductions. Daily settlements are processed automatically to verified bank accounts.',
    },
    {
      id: '2',
      title: 'Cancellation & Customer No-Show Policy',
      desc: 'If a customer cancels within 10 minutes of vendor arrival or fails to respond after 15 minutes of waiting, vendor is eligible for a ₹75 convenience compensation fee upon photo/call proof submission.',
    },
    {
      id: '3',
      title: 'Quality & Pre-Existing Damage Protection',
      desc: 'Mandatory 6-angle before-wash photos safeguard partners from false scratch complaints. Rework requests are only assigned if missed spots are confirmed by quality audit review.',
    },
    {
      id: '4',
      title: 'Vendor Safety & Code of Conduct',
      desc: 'WashOn has zero tolerance for customer harassment. If you encounter an unsafe premises or aggressive customer, you may use the Emergency SOS tool to cancel immediately without performance penalty.',
    },
  ];

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
          <Text style={styles.headerTitle}>Terms & Policies</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {policies.map(p => {
          const isExp = expanded === p.id;
          return (
            <TouchableOpacity
              key={p.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setExpanded(isExp ? null : p.id)}
            >
              <View style={styles.cardHeader}>
                <FileText size={18} color="#0F172A" />
                <Text style={styles.title}>{p.title}</Text>
                {isExp ? (
                  <ChevronUp size={18} color="#64748B" />
                ) : (
                  <ChevronDown size={18} color="#64748B" />
                )}
              </View>

              {isExp && (
                <View style={styles.descWrap}>
                  <View style={styles.divider} />
                  <Text style={styles.desc}>{p.desc}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
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
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  descWrap: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 10,
  },
  desc: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
});
