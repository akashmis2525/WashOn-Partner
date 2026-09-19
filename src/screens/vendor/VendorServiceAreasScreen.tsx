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
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Sliders,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';

export const VendorServiceAreasScreen = ({ navigation }: any) => {
  const [radius, setRadius] = useState('6');
  const [newArea, setNewArea] = useState('');

  const [areas, setAreas] = useState([
    { id: '1', name: 'Vijay Nagar', active: true },
    { id: '2', name: 'Scheme 54 & PU4', active: true },
    { id: '3', name: 'Palasia & Old Palasia', active: true },
    { id: '4', name: 'Bengali Square', active: true },
    { id: '5', name: 'Rau & Silicon City', active: false },
    { id: '6', name: 'Sudama Nagar', active: false },
  ]);

  const toggleArea = (id: string) => {
    setAreas(prev =>
      prev.map(a => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const handleAddArea = () => {
    if (!newArea.trim()) return;
    setAreas(prev => [
      ...prev,
      { id: Date.now().toString(), name: newArea.trim(), active: true },
    ]);
    setNewArea('');
  };

  const handleRemove = (id: string) => {
    setAreas(prev => prev.filter(a => a.id !== id));
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
          <Text style={styles.headerTitle}>Operating Service Areas</Text>
          <Text style={styles.headerSubtitle}>Radius & Localities</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Radius Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Maximum Operating Radius</Text>
          <Text style={styles.cardSub}>You will receive booking requests within this distance.</Text>

          <View style={styles.radiusRow}>
            {['3', '5', '8', '10'].map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.radiusBtn, radius === r && styles.radiusBtnActive]}
                onPress={() => setRadius(r)}
              >
                <Text style={[styles.radiusBtnText, radius === r && styles.radiusBtnTextActive]}>
                  {r} km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Area Input */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add Operating Locality</Text>
          <View style={styles.addInputRow}>
            <TextInput
              style={styles.addInput}
              placeholder="e.g. Anand Bazar, Geeta Bhawan"
              value={newArea}
              onChangeText={setNewArea}
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAddArea}>
              <Plus size={18} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Localities */}
        <Text style={styles.sectionTitle}>Enabled Service Areas ({areas.filter(a => a.active).length})</Text>
        {areas.map(item => (
          <View key={item.id} style={styles.areaItem}>
            <TouchableOpacity
              style={styles.areaLeft}
              onPress={() => toggleArea(item.id)}
            >
              <View style={[styles.checkCircle, item.active && styles.checkCircleActive]}>
                {item.active && <CheckCircle2 size={16} color="#FFF" />}
              </View>
              <Text style={[styles.areaName, !item.active && styles.areaNameInactive]}>
                {item.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.trashBtn}
              onPress={() => handleRemove(item.id)}
            >
              <Trash2 size={16} color="#DC2626" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Save */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            Alert.alert('Saved', 'Service operating areas & radius updated.');
            navigation.goBack();
          }}
        >
          <Text style={styles.saveBtnText}>Save Service Area Settings</Text>
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
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  radiusRow: {
    flexDirection: 'row',
    gap: 10,
  },
  radiusBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  radiusBtnActive: {
    backgroundColor: Colors.primary,
  },
  radiusBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  radiusBtnTextActive: {
    color: '#0F172A',
  },
  addInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  addInput: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    fontSize: 13,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  areaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  areaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  areaName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  areaNameInactive: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  trashBtn: {
    padding: 6,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  saveBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
