import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Star,
  MessageSquare,
  Send,
  Bike,
  CheckCircle2,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorCustomerReviewDetailsScreen = ({ navigation, route }: any) => {
  const { reviewId = 'REV-101' } = route.params || {};
  const [replyText, setReplyText] = useState('');
  const [replied, setReplied] = useState(false);

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    setReplied(true);
    Alert.alert('Reply Posted', 'Your reply is now visible on the customer feedback page.');
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
          <Text style={styles.headerTitle}>Review Details</Text>
          <Text style={styles.headerSubtitle}>#{reviewId}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Customer Review Card */}
        <View style={styles.card}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.customerName}>Aakash Mishra</Text>
              <Text style={styles.reviewDate}>Today, 11:30 AM</Text>
            </View>
            <View style={styles.starBadge}>
              <Star size={14} color="#B45309" fill="#B45309" />
              <Text style={styles.starText}>5.0</Text>
            </View>
          </View>

          <Text style={styles.comment}>
            "Activa looks spotless! The foam wash and tire gloss was top class. Ramesh is very polite and arrived on time."
          </Text>

          <View style={styles.photoGrid}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60' }}
              style={styles.reviewImg}
            />
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=60' }}
              style={styles.reviewImg}
            />
          </View>
        </View>

        {/* Booking Reference */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Associated Booking</Text>
          <View style={styles.bookingRow}>
            <Bike size={20} color={Colors.textPrimary} />
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingId}>#BK-9824 • Honda Activa 6G</Text>
              <Text style={styles.serviceText}>Foam Bike Wash + 2 Add-ons</Text>
            </View>
          </View>
        </View>

        {/* Reply Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reply to Customer</Text>
          {replied ? (
            <View style={styles.repliedBox}>
              <CheckCircle2 size={18} color="#059669" />
              <View style={styles.repliedTextWrap}>
                <Text style={styles.repliedAuthor}>Your Response</Text>
                <Text style={styles.repliedText}>
                  {replyText || 'Thank you so much Aakash sir! Glad you liked the service. Happy to wash your vehicle again!'}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.replyInputWrap}>
              <TextInput
                style={styles.replyInput}
                placeholder="Write a polite thank you note to Aakash..."
                value={replyText}
                onChangeText={setReplyText}
                multiline
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSendReply}>
                <Send size={16} color={Colors.textPrimary} />
                <Text style={styles.sendBtnText}>Post Reply</Text>
              </TouchableOpacity>
            </View>
          )}
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
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  reviewDate: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  starText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  comment: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  reviewImg: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingId: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  serviceText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  replyInputWrap: {
    gap: 10,
  },
  replyInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    height: 80,
    textAlignVertical: 'top',
    fontSize: 13,
    color: '#0F172A',
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: 42,
    borderRadius: 10,
    gap: 6,
  },
  sendBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  repliedBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 10,
    gap: 10,
  },
  repliedTextWrap: {
    flex: 1,
  },
  repliedAuthor: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065F46',
  },
  repliedText: {
    fontSize: 12,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
  },
});
