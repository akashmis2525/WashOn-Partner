import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  LayoutDashboard,
  CalendarCheck,
  Wallet,
  Star,
  User,
} from 'lucide-react-native';
import { Routes } from '../../constants/routes';

interface VendorBottomNavProps {
  activeTab: 'home' | 'bookings' | 'earnings' | 'ratings' | 'profile';
}

const { width } = Dimensions.get('window');

export const VendorBottomNav: React.FC<VendorBottomNavProps> = ({ activeTab }) => {
  const navigation = useNavigation<any>();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: LayoutDashboard,
      route: Routes.VENDOR_DASHBOARD,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: CalendarCheck,
      route: Routes.VENDOR_BOOKING_HISTORY,
    },
    {
      id: 'earnings',
      label: 'Earnings',
      icon: Wallet,
      route: Routes.VENDOR_EARNINGS_DASHBOARD,
    },
    {
      id: 'ratings',
      label: 'Ratings',
      icon: Star,
      route: Routes.VENDOR_CUSTOMER_RATINGS,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      route: Routes.VENDOR_PROFILE,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => {
              if (!isActive) {
                navigation.navigate(tab.route);
              }
            }}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <IconComponent
                size={20}
                color={isActive ? '#0F172A' : '#64748B'}
                fill={isActive && tab.id === 'ratings' ? '#FFC80A' : 'none'}
              />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 99,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapActive: {
    backgroundColor: '#FFC80A',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  tabLabelActive: {
    fontWeight: '700',
    color: '#0F172A',
  },
});
