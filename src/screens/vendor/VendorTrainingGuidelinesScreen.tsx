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
  BookOpen,
  Camera,
  Droplets,
  Shield,
  Smile,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';

interface Module {
  id: string;
  title: string;
  icon: any;
  points: string[];
}

export const VendorTrainingGuidelinesScreen = ({ navigation }: any) => {
  const [expanded, setExpanded] = useState<string | null>('1');

  const modules: Module[] = [
    {
      id: '1',
      title: 'Vehicle Handling & Scratch Prevention',
      icon: <Shield size={18} color="#059669" />,
      points: [
        'Always rinse loose mud with low pressure before applying wash mitt.',
        'Use separate microfiber towels for painted body, wheels, and glass.',
        'Do not spray direct high-pressure water on bike spark plugs or meter console.',
      ],
    },
    {
      id: '2',
      title: 'Before & After Photo Best Practices',
      icon: <Camera size={18} color="#2563EB" />,
      points: [
        'Take mandatory 6 photos (Front, Back, Left, Right, Plate, Existing Scratches).',
        'Ensure good lighting and avoid camera shake.',
        'Highlight existing dents with customer before starting water spray.',
      ],
    },
    {
      id: '3',
      title: 'Water & Chemical Dilution Standards',
      icon: <Droplets size={18} color="#0284C7" />,
      points: [
        'Use 1:9 shampoo to water ratio for thick snow foam coating.',
        'Apply tire dresser with sponge applicator; never spray onto brake discs.',
        'Use pH-neutral automotive shampoo only to protect vehicle clear coat.',
      ],
    },
    {
      id: '4',
      title: 'Customer Communication & 5-Star Experience',
      icon: <Smile size={18} color="#B45309" />,
      points: [
        'Arrive 5 minutes before scheduled slot.',
        'Greet customer with polite namaste and verify vehicle key handover.',
        'Request instant photo review signoff before completing booking on app.',
      ],
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
          <Text style={styles.headerTitle}>Training & SOP</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {modules.map(m => {
          const isExp = expanded === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setExpanded(isExp ? null : m.id)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>{m.icon}</View>
                <Text style={styles.cardTitle}>{m.title}</Text>
                {isExp ? <ChevronUp size={18} color="#64748B" /> : <ChevronDown size={18} color="#64748B" />}
              </View>

              {isExp && (
                <View style={styles.bodyWrap}>
                  <View style={styles.divider} />
                  {m.points.map((pt, idx) => (
                    <View key={idx} style={styles.pointRow}>
                      <View style={styles.bullet} />
                      <Text style={styles.pointText}>{pt}</Text>
                    </View>
                  ))}
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
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  bodyWrap: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 10,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  pointText: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
    lineHeight: 18,
  },
});
