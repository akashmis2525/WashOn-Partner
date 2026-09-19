import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Radar,
  MapPin,
  Clock,
  Shield,
  Zap,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorAutoAssignmentStatusScreen = ({ navigation }: any) => {
  const [seconds, setSeconds] = useState(25);

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

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
          <Text style={styles.headerTitle}>Auto-Assignment</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Radar Animation Box */}
        <View style={styles.radarBox}>
          <View style={styles.outerRing}>
            <View style={styles.middleRing}>
              <View style={styles.centerPulse}>
                <Radar size={44} color="#0F172A" />
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.statusTitle}>Offering Booking to Nearest Partners</Text>
        <Text style={styles.statusDesc}>
          Your position in queue: <Text style={{ fontWeight: '800', color: '#059669' }}>#1 Priority (Gold Partner)</Text>
        </Text>

        <View style={styles.timerBadge}>
          <Clock size={16} color="#B45309" />
          <Text style={styles.timerText}>
            Priority Window Closes in: <Text style={{ fontWeight: '800' }}>{seconds}s</Text>
          </Text>
        </View>

        {/* Proximity Details */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.infoText}>Search Radius: <Text style={{ fontWeight: '700' }}>6.0 km (Vijay Nagar Zone)</Text></Text>
          </View>
          <View style={styles.infoRow}>
            <Zap size={16} color="#64748B" />
            <Text style={styles.infoText}>Vendor Status: <Text style={{ fontWeight: '700', color: '#059669' }}>Available & Online</Text></Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate(Routes.VENDOR_NEW_REQUEST as any)}
        >
          <Text style={styles.actionBtnText}>Simulate Order Found (Accept Job)</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarBox: {
    marginBottom: 24,
  },
  outerRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 200, 10, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 200, 10, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPulse: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
  },
  statusDesc: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 16,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginBottom: 24,
  },
  timerText: {
    fontSize: 13,
    color: '#B45309',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#334155',
  },
  actionBtn: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
