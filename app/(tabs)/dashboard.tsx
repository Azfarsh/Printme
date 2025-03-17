import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
// First install react-native-svg:
// npm install react-native-svg
// or
// yarn add react-native-svg
import Svg, { Path } from 'react-native-svg';

// Icon components using react-native-svg
const Icons = {
  Dashboard: (props: any) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <Path d="M3 3h18v18H3z" />
      <Path d="M3 9h18" />
      <Path d="M9 21V9" />
    </Svg>
  ),
  Users: (props: any) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <Path d="M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
    </Svg>
  ),
  Bell: (props: any) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Svg>
  ),
  Chart: (props: any) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <Path d="M3 3v18h18" />
      <Path d="m19 9-5 5-4-4-3 3" />
    </Svg>
  ),
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

interface NotificationType {
  id: number;
  message: string;
  time: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, color }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  return (
    <Animated.View
      entering={FadeInDown}
      style={[styles.card, { backgroundColor: color }, animatedStyle]}
    >
      <View style={styles.cardHeader}>
        {icon}
        <Text style={styles.cardValue}>{value}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </Animated.View>
  );
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications] = useState<NotificationType[]>([
    { id: 1, message: 'New user registration', time: '5m ago' },
    { id: 2, message: 'Server update completed', time: '1h ago' },
    { id: 3, message: 'Database backup successful', time: '2h ago' },
  ]);

  const menuItems = [
    { icon: <Icons.Dashboard stroke="#6366F1" />, label: 'Dashboard' },
    { icon: <Icons.Users stroke="#6366F1" />, label: 'Users' },
    { icon: <Icons.Chart stroke="#6366F1" />, label: 'Analytics' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.notificationButton}>
              <Icons.Bell stroke="#4B5563" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.cardsContainer}>
          <DashboardCard
            icon={<Icons.Users stroke="#FFFFFF" />}
            title="Total Users"
            value="1,234"
            color="#6366F1"
          />
          <DashboardCard
            icon={<Icons.Chart stroke="#FFFFFF" />}
            title="Revenue"
            value="$45,678"
            color="#10B981"
          />
          <DashboardCard
            icon={<Icons.Chart stroke="#FFFFFF" />}
            title="Growth"
            value="+12.3%"
            color="#3B82F6"
          />
        </View>

        {/* Notifications */}
        <View style={styles.notificationsContainer}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          {notifications.map((notification) => (
            <Animated.View
              key={notification.id}
              entering={FadeInLeft.delay(notification.id * 100)}
              style={styles.notificationItem}
            >
              <View style={styles.notificationContent}>
                <Icons.Bell stroke="#6366F1" />
                <Text style={styles.notificationMessage}>{notification.message}</Text>
              </View>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            {item.icon}
            <Text style={styles.navLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flex: 1,
    marginRight: 16,
  },
  searchInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  cardsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: SCREEN_WIDTH > 768 ? '30%' : '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardTitle: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 14,
  },
  notificationsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationMessage: {
    marginLeft: 12,
    color: '#374151',
  },
  notificationTime: {
    color: '#6B7280',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#6366F1',
  },
});