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
  Tag,
  Calendar,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Routes } from '../../constants/routes';

interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  discountFunded: string;
  validity: string;
  expectedBookings: string;
  joined: boolean;
}

export const VendorOffersScreen = ({ navigation }: any) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'CMP-01',
      title: 'Monsoon Clean Car Carnival',
      subtitle: 'Flat 20% off for customers, 100% discount funded by WashOn platform!',
      discountFunded: 'Platform Funded (Zero vendor loss)',
      validity: 'Valid till 30 Sep',
      expectedBookings: '+40% Volume Boost',
      joined: true,
    },
    {
      id: 'CMP-02',
      title: 'Weekend Bike Polish Special',
      subtitle: 'Free chain lubrication on every foam bike wash package.',
      discountFunded: '50% Vendor / 50% Platform',
      validity: 'Fri - Sun Only',
      expectedBookings: '+60% More Tips',
      joined: false,
    },
  ]);

  const toggleJoin = (id: string) => {
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id === id) {
          const next = !c.joined;
          Alert.alert(next ? 'Campaign Joined' : 'Opted Out', `You have ${next ? 'enrolled into' : 'left'} ${c.title}.`);
          return { ...c, joined: next };
        }
        return c;
      })
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
          <Text style={styles.headerTitle}>Marketing Campaigns & Offers</Text>
          <Text style={styles.headerSubtitle}>Grow customer volume</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Info Box */}
        <View style={styles.infoBanner}>
          <Sparkles size={22} color="#059669" />
          <View style={styles.infoTextWrap}>
            <Text style={styles.infoTitle}>Platform Funded Discounts</Text>
            <Text style={styles.infoDesc}>
              Participating in campaigns boosts your visibility on customer search without cutting your base payout.
            </Text>
          </View>
        </View>

        {campaigns.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.tagWrap}>
                <Tag size={16} color="#B45309" />
                <Text style={styles.tagText}>{item.discountFunded}</Text>
              </View>
              <Text style={styles.validityText}>{item.validity}</Text>
            </View>

            <Text style={styles.campaignTitle}>{item.title}</Text>
            <Text style={styles.campaignSub}>{item.subtitle}</Text>

            <View style={styles.benefitRow}>
              <TrendingUp size={16} color="#059669" />
              <Text style={styles.benefitText}>Expected Benefit: <Text style={{ fontWeight: '700' }}>{item.expectedBookings}</Text></Text>
            </View>

            <TouchableOpacity
              style={[styles.joinBtn, item.joined && styles.joinedBtn]}
              onPress={() => toggleJoin(item.id)}
            >
              {item.joined ? (
                <>
                  <CheckCircle2 size={16} color="#059669" />
                  <Text style={styles.joinedBtnText}>Participating (Opt Out)</Text>
                </>
              ) : (
                <Text style={styles.joinBtnText}>Join Campaign</Text>
              )}
            </TouchableOpacity>
          </View>
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 16,
    gap: 12,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  infoDesc: {
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
    lineHeight: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  validityText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  campaignTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  campaignSub: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 12,
    color: '#065F46',
  },
  joinBtn: {
    height: 44,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  joinedBtn: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 6,
  },
  joinedBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
});
