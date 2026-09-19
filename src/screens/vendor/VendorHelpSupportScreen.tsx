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
  Headphones,
  Phone,
  MessageSquare,
  ChevronRight,
  HelpCircle,
  CreditCard,
  AlertTriangle,
  Wrench,
  Shield,
  FileQuestion,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorHelpSupportScreen = ({ navigation }: any) => {
  const supportTopics = [
    { id: '1', title: 'Payment & Wallet Settlement Query', sub: 'Missing credits, bank transfer delay', icon: <CreditCard size={20} color="#059669" /> },
    { id: '2', title: 'Customer Dispute & Rework Help', sub: 'Refusal to signoff, unfair damage complaint', icon: <AlertTriangle size={20} color="#D97706" /> },
    { id: '3', title: 'Booking Cancellation & No-Show', sub: 'Customer unreachable, compensation request', icon: <FileQuestion size={20} color="#2563EB" /> },
    { id: '4', title: 'Equipment & Chemical Supplies', sub: 'Order new foam soap, replace pressure hose', icon: <Wrench size={20} color="#7C3AED" /> },
    { id: '5', title: 'KYC & Account Verification', sub: 'Update Aadhaar, driving licence renewal', icon: <Shield size={20} color="#0F172A" /> },
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
          <Text style={styles.headerTitle}>Help & Support</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Urgent Contact Bar */}
        <View style={styles.urgentCard}>
          <Text style={styles.urgentTitle}>Need Immediate On-Job Assistance?</Text>
          <Text style={styles.urgentDesc}>Our vendor operations team is ready to assist you right now.</Text>
          <View style={styles.urgentBtnRow}>
            <TouchableOpacity
              style={styles.callSupportBtn}
              onPress={() => Alert.alert('Calling Support', 'Connecting to WashOn Partner Helpline (Toll Free)...')}
            >
              <Phone size={16} color="#FFF" />
              <Text style={styles.callSupportText}>Call Helpline</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chatSupportBtn}
              onPress={() => navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any)}
            >
              <MessageSquare size={16} color="#0F172A" />
              <Text style={styles.chatSupportText}>Live Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Topics List */}
        <Text style={styles.sectionTitle}>Browse Help Topics</Text>
        {supportTopics.map(topic => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicCard}
            onPress={() =>
              navigation.navigate(Routes.VENDOR_SUPPORT_CHAT as any, {
                topic: topic.title,
              })
            }
          >
            <View style={styles.topicIcon}>{topic.icon}</View>
            <View style={styles.topicTextWrap}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicSub}>{topic.sub}</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </TouchableOpacity>
        ))}
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
  urgentCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  urgentTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFF',
  },
  urgentDesc: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 16,
  },
  urgentBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  callSupportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
    height: 44,
    borderRadius: 10,
    gap: 6,
  },
  callSupportText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  chatSupportBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: 44,
    borderRadius: 10,
    gap: 6,
  },
  chatSupportText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
  },
  topicIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicTextWrap: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  topicSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});
