import React, { useState } from 'react';
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
  CheckSquare,
  Square,
  Sparkles,
  CheckCircle2,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorServiceChecklistScreen = ({ navigation }: any) => {
  const [checklist, setChecklist] = useState([
    { id: '1', label: 'High pressure washer & extension wire plugged in safely', checked: true },
    { id: '2', label: 'Snow foam shampoo diluted (1:9 ratio) in cannon bottle', checked: true },
    { id: '3', label: 'Customer water tap connection / onboard water tank verified', checked: true },
    { id: '4', label: 'Customer instructions and key handover completed', checked: true },
    { id: '5', label: 'Pre-existing scratches photographed and acknowledged', checked: true },
    { id: '6', label: 'Foam spray, wheel scrubbing, and microfiber dry finished', checked: false },
    { id: '7', label: 'After wash sparkling photos uploaded for review', checked: false },
  ]);

  const toggle = (id: string) => {
    setChecklist(prev =>
      prev.map(c => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const completedCount = checklist.filter(c => c.checked).length;
  const allDone = completedCount === checklist.length;

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
          <Text style={styles.headerTitle}>Quality Checklist</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Step-by-Step QA Checklist</Text>
            <Text style={styles.progressPct}>
              {Math.round((completedCount / checklist.length) * 100)}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${(completedCount / checklist.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Checklist items */}
        {checklist.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.itemCard, item.checked && styles.itemCardChecked]}
            activeOpacity={0.8}
            onPress={() => toggle(item.id)}
          >
            {item.checked ? (
              <CheckSquare size={22} color="#059669" />
            ) : (
              <Square size={22} color="#94A3B8" />
            )}
            <Text style={[styles.itemLabel, item.checked && styles.itemLabelChecked]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.doneBtn, !allDone && styles.doneBtnDisabled]}
          onPress={() => {
            Alert.alert('Checklist Verified', 'Quality checklist confirmed.');
            navigation.goBack();
          }}
        >
          <Text style={styles.doneBtnText}>
            {allDone ? 'Checklist 100% Complete' : `Complete Remaining (${checklist.length - completedCount}) Steps`}
          </Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  progressCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressPct: {
    fontSize: 14,
    fontWeight: '800',
    color: '#059669',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 3,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
  },
  itemCardChecked: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  itemLabel: {
    fontSize: 13,
    color: '#475569',
    flex: 1,
    lineHeight: 18,
  },
  itemLabelChecked: {
    color: '#065F46',
    fontWeight: '600',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  doneBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtnDisabled: {
    backgroundColor: '#E2E8F0',
  },
  doneBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
