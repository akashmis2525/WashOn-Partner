import React from 'react';
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
  Star,
  Sparkles,
  Clock,
  Smile,
  ChevronRight,
  TrendingUp,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

export const VendorCustomerRatingsScreen = ({ navigation }: any) => {
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
          <Text style={styles.headerTitle}>Customer Ratings & Feedback</Text>
          <Text style={styles.headerSubtitle}>Performance Scorecard</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Rating Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroScore}>4.9</Text>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={18} color="#FFC80A" fill="#FFC80A" />
                ))}
              </View>
              <Text style={styles.totalReviews}>Based on 312 Customer Reviews</Text>
            </View>

            <View style={styles.fiveStarPill}>
              <Text style={styles.fiveStarPct}>94%</Text>
              <Text style={styles.fiveStarLabel}>5-Star Ratings</Text>
            </View>
          </View>

          <View style={styles.dividerLight} />

          {/* Metric Sub-ratings */}
          <View style={styles.subRatingRow}>
            <View style={styles.subRatingCol}>
              <View style={styles.subIcon}>
                <Sparkles size={16} color="#059669" />
              </View>
              <Text style={styles.subRatingVal}>4.9 / 5.0</Text>
              <Text style={styles.subRatingLabel}>Wash Quality</Text>
            </View>

            <View style={styles.subRatingCol}>
              <View style={styles.subIcon}>
                <Clock size={16} color="#2563EB" />
              </View>
              <Text style={styles.subRatingVal}>4.8 / 5.0</Text>
              <Text style={styles.subRatingLabel}>Timeliness</Text>
            </View>

            <View style={styles.subRatingCol}>
              <View style={styles.subIcon}>
                <Smile size={16} color="#7C3AED" />
              </View>
              <Text style={styles.subRatingVal}>5.0 / 5.0</Text>
              <Text style={styles.subRatingLabel}>Behaviour</Text>
            </View>
          </View>
        </View>

        {/* Recent Reviews */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
        </View>

        {[
          {
            id: 'REV-101',
            customer: 'Aakash Mishra',
            rating: 5,
            comment: 'Activa looks spotless! The foam wash and tire gloss was top class.',
            date: 'Today, 11:30 AM',
            service: 'Foam Bike Wash',
          },
          {
            id: 'REV-102',
            customer: 'Rohit Sharma',
            rating: 5,
            comment: 'Very polite guy. Arrived on time with clean equipment.',
            date: 'Today, 10:15 AM',
            service: 'Basic Car Exterior Wash',
          },
          {
            id: 'REV-103',
            customer: 'Sneha Patel',
            rating: 4,
            comment: 'Good cleaning, just took 5 minutes extra than estimated.',
            date: 'Yesterday, 06:00 PM',
            service: 'Full Bike Detail',
          },
        ].map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.reviewCard}
            onPress={() =>
              navigation.navigate(Routes.VENDOR_CUSTOMER_REVIEW_DETAILS as any, {
                reviewId: item.id,
              })
            }
          >
            <View style={styles.reviewTop}>
              <View>
                <Text style={styles.reviewCustomer}>{item.customer}</Text>
                <Text style={styles.reviewService}>{item.service}</Text>
              </View>
              <View style={styles.starBadge}>
                <Star size={12} color="#B45309" fill="#B45309" />
                <Text style={styles.starBadgeText}>{item.rating}.0</Text>
              </View>
            </View>

            <Text style={styles.reviewComment}>"{item.comment}"</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
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
  heroCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroScore: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFC80A',
  },
  starRow: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 4,
  },
  totalReviews: {
    fontSize: 11,
    color: '#94A3B8',
  },
  fiveStarPill: {
    backgroundColor: 'rgba(255, 200, 10, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 200, 10, 0.3)',
  },
  fiveStarPct: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFC80A',
  },
  fiveStarLabel: {
    fontSize: 10,
    color: '#FEF3C7',
    fontWeight: '600',
    marginTop: 2,
  },
  dividerLight: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  subRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subRatingCol: {
    alignItems: 'center',
    flex: 1,
  },
  subIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  subRatingVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  subRatingLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewCustomer: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  reviewService: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  starBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  starBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  reviewComment: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  reviewDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
});
