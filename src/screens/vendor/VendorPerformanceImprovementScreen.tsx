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
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Square,
  CheckSquare,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorPerformanceImprovementScreen = ({ navigation }: any) => {
  const [checklist, setChecklist] = useState([
    { id: '1', title: 'Always use microfiber cloth for final glass drying', done: true },
    { id: '2', title: 'Greet customer with name and ask for vehicle keys politely', done: true },
    { id: '3', title: 'Take clear 6-angle before wash photos to prevent rework', done: false },
    { id: '4', title: 'Clean engine fins & underbody without splash stains', done: true },
    { id: '5', title: 'Offer tire shine & chain lube upgrade on spot', done: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(prev =>
      prev.map(c => (c.id === id ? { ...c, done: !c.done } : c))
    );
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
          <Text style={styles.headerTitle}>Improvement Tips</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* High impact tip banner */}
        <View style={styles.banner}>
          <Lightbulb size={24} color="#059669" />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Keep Rating Above 4.8</Text>
            <Text style={styles.bannerDesc}>
              Partners with 4.8+ rating receive 2x more instant nearby bookings during peak evening hours.
            </Text>
          </View>
        </View>

        {/* Video Tutorials */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommended Video Modules</Text>
          {[
            { title: 'Zero Scratch Foam Washing Technique', duration: '3 mins', watched: true },
            { title: 'Customer Communication & 5-Star Experience', duration: '4 mins', watched: false },
            { title: 'Efficient Water Pressure & Tank Management', duration: '2 mins', watched: false },
          ].map((v, i) => (
            <TouchableOpacity
              key={i}
              style={styles.videoRow}
              onPress={() => navigation.navigate(Routes.VENDOR_TRAINING_GUIDELINES as any)}
            >
              <PlayCircle size={24} color={v.watched ? '#059669' : '#2563EB'} />
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{v.title}</Text>
                <Text style={styles.videoDuration}>{v.duration} • {v.watched ? 'Completed' : 'Not Watched'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Actionable Quality Checklist */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Quality Checklist</Text>
          {checklist.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.checkRow}
              onPress={() => toggleCheck(item.id)}
            >
              {item.done ? (
                <CheckSquare size={20} color="#059669" />
              ) : (
                <Square size={20} color="#94A3B8" />
              )}
              <Text style={[styles.checkText, item.done && styles.checkTextDone]}>
                {item.title}
              </Text>
            </TouchableOpacity>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 14,
    gap: 12,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  bannerDesc: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
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
    marginBottom: 12,
  },
  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    gap: 12,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  videoDuration: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
    gap: 10,
  },
  checkText: {
    fontSize: 13,
    color: '#475569',
    flex: 1,
  },
  checkTextDone: {
    color: '#059669',
    fontWeight: '600',
  },
});
