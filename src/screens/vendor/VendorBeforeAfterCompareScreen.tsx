import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Image as ImageIcon,
  CheckSquare,
  Square,
  Info,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

interface ComparisonItem {
  id: string;
  title: string;
  beforeUri: string;
  afterUri: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export const VendorBeforeAfterCompareScreen = ({ navigation, route }: any) => {
  const { bookingId = 'BK-9824', vehicleModel = 'Honda Activa 6G', customerName = 'Aakash Mishra' } = route.params || {};

  const [activeTab, setActiveTab] = useState<'sideBySide' | 'checklist'>('sideBySide');

  const comparisons: ComparisonItem[] = [
    {
      id: '1',
      title: 'Front Fender & Headlight',
      beforeUri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60',
      afterUri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '2',
      title: 'Wheels & Rim Polishing',
      beforeUri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60',
      afterUri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: '3',
      title: 'Rear Panel & Silencer',
      beforeUri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60',
      afterUri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60',
    },
  ];

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'All mud & dirt stains thoroughly removed', checked: true },
    { id: '2', label: 'Tire dressing & rim shine applied', checked: true },
    { id: '3', label: 'Microfiber cloth wipe down without water streaks', checked: true },
    { id: '4', label: 'Rearview mirrors and windshield crystal clear', checked: true },
    { id: '5', label: 'No customer belongings disturbed or damaged', checked: true },
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist(prev =>
      prev.map(c => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const allChecked = checklist.every(c => c.checked);

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
          <Text style={styles.headerTitle}>Before & After Comparison</Text>
          <Text style={styles.headerSubtitle}>Booking ID: #{bookingId}</Text>
        </View>
        <View style={styles.badge}>
          <ShieldCheck size={16} color="#059669" />
          <Text style={styles.badgeText}>QA Ready</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'sideBySide' && styles.tabBtnActive]}
          onPress={() => setActiveTab('sideBySide')}
        >
          <ImageIcon
            size={18}
            color={activeTab === 'sideBySide' ? '#0F172A' : '#64748B'}
          />
          <Text
            style={[styles.tabText, activeTab === 'sideBySide' && styles.tabTextActive]}
          >
            Photos View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'checklist' && styles.tabBtnActive]}
          onPress={() => setActiveTab('checklist')}
        >
          <CheckSquare
            size={18}
            color={activeTab === 'checklist' ? '#0F172A' : '#64748B'}
          />
          <Text
            style={[styles.tabText, activeTab === 'checklist' && styles.tabTextActive]}
          >
            Quality Checklist ({checklist.filter(c => c.checked).length}/{checklist.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'sideBySide' ? (
          <>
            <View style={styles.infoBox}>
              <Info size={20} color="#0284C7" />
              <Text style={styles.infoText}>
                Side-by-side view will be shared with <Text style={{ fontWeight: '700' }}>{customerName}</Text> for instant service approval.
              </Text>
            </View>

            {comparisons.map(item => (
              <View key={item.id} style={styles.compareCard}>
                <View style={styles.compareHeader}>
                  <Text style={styles.compareTitle}>{item.title}</Text>
                  <View style={styles.diffBadge}>
                    <Text style={styles.diffBadgeText}>Washed</Text>
                  </View>
                </View>

                <View style={styles.imageRow}>
                  {/* Before */}
                  <View style={styles.imageCol}>
                    <View style={styles.imageWrapper}>
                      <Image source={{ uri: item.beforeUri }} style={styles.compareImg} />
                      <View style={styles.beforePill}>
                        <Text style={styles.beforePillText}>BEFORE</Text>
                      </View>
                    </View>
                  </View>

                  {/* Divider */}
                  <View style={styles.vsCircle}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>

                  {/* After */}
                  <View style={styles.imageCol}>
                    <View style={styles.imageWrapper}>
                      <Image source={{ uri: item.afterUri }} style={styles.compareImg} />
                      <View style={styles.afterPill}>
                        <Text style={styles.afterPillText}>AFTER</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.checklistSection}>
            <Text style={styles.checklistHeader}>Service Quality Checklist</Text>
            <Text style={styles.checklistSub}>
              Confirm every step before submitting for customer sign-off.
            </Text>

            {checklist.map(c => (
              <TouchableOpacity
                key={c.id}
                style={[styles.checklistItem, c.checked && styles.checklistItemActive]}
                activeOpacity={0.8}
                onPress={() => toggleChecklist(c.id)}
              >
                {c.checked ? (
                  <CheckSquare size={22} color="#059669" />
                ) : (
                  <Square size={22} color="#94A3B8" />
                )}
                <Text
                  style={[
                    styles.checklistText,
                    c.checked && styles.checklistTextActive,
                  ]}
                >
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.submitBtn, !allChecked && styles.submitBtnDisabled]}
          onPress={() =>
            navigation.navigate(Routes.VENDOR_COMPLETION_SUMMARY as any, {
              bookingId,
              vehicleModel,
              customerName,
            })
          }
        >
          <Text style={styles.submitBtnText}>Submit & View Summary</Text>
          <ArrowRight size={18} color={Colors.textPrimary} />
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
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 10,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#0369A1',
    lineHeight: 18,
  },
  compareCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  compareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  compareTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  diffBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  diffBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  imageCol: {
    width: '47%',
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    height: 120,
    backgroundColor: '#E2E8F0',
  },
  compareImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  beforePill: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  beforePillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  afterPill: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#059669',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  afterPillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  vsCircle: {
    position: 'absolute',
    left: '50%',
    marginLeft: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  vsText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFF',
  },
  checklistSection: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  checklistHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  checklistSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
  },
  checklistItemActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  checklistText: {
    flex: 1,
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  checklistTextActive: {
    color: '#065F46',
    fontWeight: '600',
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  submitBtn: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitBtnDisabled: {
    backgroundColor: '#E2E8F0',
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
