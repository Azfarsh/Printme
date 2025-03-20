import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar,
  Animated,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data
const initialPrintRequests = [
  { id: 1, name: 'Emily Chen', time: '10:15 AM', status: 'pending', amount: 18.50 },
  { id: 2, name: 'Marcus Wong', time: '10:30 AM', status: 'printing', amount: 7.50 },
  { id: 3, name: 'Sarah Miller', time: '10:45 AM', status: 'completed', amount: 32.50 },
  { id: 4, name: 'John Smith', time: '11:00 AM', status: 'pending', amount: 15.75 },
  { id: 5, name: 'Laura Johnson', time: '11:15 AM', status: 'printing', amount: 9.25 },
];

const initialPrinters = [
  { id: 1, name: 'HP LaserJet Pro', status: 'operational', queue: 2, paper: 85, toner: 65 },
  { id: 2, name: 'Xerox WorkCentre', status: 'warning', queue: 1, paper: 25, toner: 45 },
  { id: 3, name: 'Canon ImageRunner', status: 'error', queue: 0, paper: 90, toner: 10 },
];

export default function PrintMeVendorPortal() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [printRequests, setPrintRequests] = useState(initialPrintRequests);
  const [printers, setPrinters] = useState(initialPrinters);
  const [dailyRevenue, setDailyRevenue] = useState(450.00);
  const [completedJobs, setCompletedJobs] = useState(24);
  const [activeTokens, setActiveTokens] = useState(8);
  const [averageWaitTime, setAverageWaitTime] = useState(12);
  
  // Animations
  const rotateAnim = useState(new Animated.Value(0))[0];
  const opacity1 = useState(new Animated.Value(0))[0];
  const opacity2 = useState(new Animated.Value(0))[0];
  const opacity3 = useState(new Animated.Value(0))[0];
  const opacity4 = useState(new Animated.Value(0))[0];
  const translateY1 = useState(new Animated.Value(20))[0];
  const translateY2 = useState(new Animated.Value(20))[0];

  useEffect(() => {
    // Start animations when component mounts
    Animated.sequence([
      Animated.timing(opacity1, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(opacity2, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(opacity3, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(opacity4, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(translateY1, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(translateY2, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const handleRefresh = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {
      rotateAnim.setValue(0);
      // Add some randomization to the data
      const shuffledRequests = [...printRequests].sort(() => Math.random() - 0.5);
      setPrintRequests(shuffledRequests);
      setDailyRevenue(Math.floor(400 + Math.random() * 100));
      setCompletedJobs(Math.floor(20 + Math.random() * 10));
    });
  };

  const handleClearCompleted = () => {
    const filteredRequests = printRequests.filter(request => request.status !== 'completed');
    setPrintRequests(filteredRequests);
    // Update stats after clearing
    setCompletedJobs(completedJobs - printRequests.filter(request => request.status === 'completed').length);
  };

  const handleAddPrinter = () => {
    const newPrinter = {
      id: printers.length + 1,
      name: `New Printer ${printers.length + 1}`,
      status: 'operational',
      queue: 0,
      paper: 100,
      toner: 100
    };
    setPrinters([...printers, newPrinter]);
  };

  interface PrintRequest {
    id: number;
    name: string;
    time: string;
    status: string;
    amount: number;
  }

  interface Printer {
    id: number;
    name: string;
    status: string;
    queue: number;
    paper: number;
    toner: number;
  }

  const getInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusColor = (status="") => {
    switch(status) {
      case 'pending': return '#F9D67A';
      case 'printing': return '#7EDFA9';
      case 'completed': return '#B4B4B4';
      default: return '#B4B4B4';
    }
  };

  const getStatusBgColor = (status="") => {
    switch(status) {
      case 'pending': return '#FFF8E7';
      case 'printing': return '#E7FFF2';
      case 'completed': return '#F5F5F5';
      default: return '#F5F5F5';
    }
  };

  const getPrinterStatusColor = (status="") => {
    switch(status) {
      case 'operational': return '#1AB369';
      case 'warning': return '#FFA500';
      case 'error': return '#FF0000';
      default: return '#B4B4B4';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>40 × 40</Text>
          </View>
          <Text style={styles.title}>PrintMe Vendor Portal</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>1</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.userAvatar}>
            <Text style={styles.userInitials}>VA</Text>
          </View>
          <Text style={styles.userName}>Vendor Admin</Text>
        </View>
      </View>

      {/* Sidebar and Content */}
      <View style={styles.contentContainer}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {[
            { name: 'Dashboard', icon: 'view-dashboard-outline' },
            { name: 'Print Queue', icon: 'printer-check' },
            { name: 'Printers', icon: 'printer' },
            { name: 'Reports', icon: 'file-chart-outline' },
          ].map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.sidebarItem,
                activeTab === item.name && styles.activeSidebarItem,
              ]}
              onPress={() => setActiveTab(item.name)}
            >
              <MaterialCommunityIcons
                //name={item.icon}
                size={24}
                color={activeTab === item.name ? '#4B34F5' : '#555'}
              />
              <Text
                style={[
                  styles.sidebarText,
                  activeTab === item.name && styles.activeSidebarText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {/* Daily Revenue */}
            <Animated.View style={[styles.statsCard, { opacity: opacity1 }]}>
              <Text style={styles.statsTitle}>Daily Revenue</Text>
              <Text style={styles.statsValue}>${dailyRevenue.toFixed(2)}</Text>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={['#4B34F5', '#7B68FF']}
                  style={styles.progressFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            </Animated.View>

            {/* Completed Jobs */}
            <Animated.View style={[styles.statsCard, { opacity: opacity2 }]}>
              <Text style={styles.statsTitle}>Completed Jobs</Text>
              <Text style={styles.statsValue}>{completedJobs}</Text>
              <View style={styles.statsChange}>
                <MaterialCommunityIcons name="arrow-up" size={16} color="#1AB369" />
                <Text style={styles.statsChangeText}>12% from yesterday</Text>
              </View>
            </Animated.View>

            {/* Active Tokens */}
            <Animated.View style={[styles.statsCard, { opacity: opacity3 }]}>
              <Text style={styles.statsTitle}>Active Tokens</Text>
              <Text style={styles.statsValue}>{activeTokens}</Text>
              <View style={styles.statsNote}>
                <View style={styles.statusDot} />
                <Text style={styles.statsNoteText}>All printers operational</Text>
              </View>
            </Animated.View>

            {/* Average Wait Time */}
            <Animated.View style={[styles.statsCard, { opacity: opacity4 }]}>
              <Text style={styles.statsTitle}>Average Wait Time</Text>
              <Text style={styles.statsValue}>{averageWaitTime} min</Text>
              <View style={styles.statsChange}>
                <MaterialCommunityIcons name="arrow-up" size={16} color="#FFA500" />
                <Text style={[styles.statsChangeText, {color: '#FFA500'}]}>3 min from normal</Text>
              </View>
            </Animated.View>
          </View>

          {/* Print Requests */}
          <Animated.View 
            style={[styles.sectionContainer, {transform: [{translateY: translateY1}]}]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Print Requests</Text>
              <View style={styles.sectionActions}>
                <TouchableOpacity 
                  style={styles.sectionButton}
                  onPress={handleClearCompleted}
                >
                  <Text style={styles.sectionButtonText}>Clear Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sectionButton, styles.refreshButton]}
                  onPress={handleRefresh}
                >
                  <Animated.View style={{transform: [{rotate: spin}]}}>
                    <MaterialCommunityIcons name="refresh" size={20} color="white" />
                  </Animated.View>
                  <Text style={[styles.sectionButtonText, styles.refreshButtonText]}>Refresh</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.requestsContainer}>
              {printRequests.map((request) => (
                <View key={request.id} style={styles.requestItem}>
                  <View style={styles.requestInfo}>
                    <View style={[styles.userInitialsContainer, {backgroundColor: getStatusColor(request.status)}]}>
                      <Text style={styles.requestInitials}>{getInitials(request.name)}</Text>
                    </View>
                    <View>
                      <Text style={styles.requestName}>{request.name}</Text>
                      <Text style={styles.requestTime}>{request.time}</Text>
                    </View>
                  </View>
                  <View style={styles.requestStatus}>
                    <View style={[styles.statusBadge, {backgroundColor: getStatusBgColor(request.status)}]}>
                      <Text style={[styles.statusText, {color: getStatusColor(request.status)}]}>
                        {request.status}
                      </Text>
                    </View>
                    <Text style={styles.requestAmount}>${request.amount.toFixed(2)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Printer Status */}
          <Animated.View 
            style={[styles.sectionContainer, {transform: [{translateY: translateY2}]}]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Printer Status</Text>
              <TouchableOpacity 
                style={[styles.sectionButton, styles.refreshButton]}
                onPress={handleAddPrinter}
              >
                <MaterialCommunityIcons name="plus" size={20} color="white" />
                <Text style={[styles.sectionButtonText, styles.refreshButtonText]}>Add Printer</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.printersContainer}>
              {printers.map((printer) => (
                <View key={printer.id} style={styles.printerItem}>
                  <View style={styles.printerHeader}>
                    <Text style={styles.printerName}>{printer.name}</Text>
                    <View style={[styles.printerStatusDot, {backgroundColor: getPrinterStatusColor(printer.status)}]} />
                  </View>

                  <View style={styles.printerStats}>
                    <View style={styles.printerStat}>
                      <Text style={styles.printerStatLabel}>Queue: {printer.queue}</Text>
                    </View>
                    <View style={styles.printerStat}>
                      <Text style={styles.printerStatLabel}>Paper: {printer.paper}%</Text>
                      <View style={styles.progressBarContainer}>
                        <View 
                          style={[
                            styles.progressBarFill, 
                            { 
                              width: `${printer.paper}%`, 
                              backgroundColor: printer.paper < 30 ? '#FF0000' : '#1AB369'
                            }
                          ]} 
                        />
                      </View>
                    </View>
                    <View style={styles.printerStat}>
                      <Text style={styles.printerStatLabel}>Toner: {printer.toner}%</Text>
                      <View style={styles.progressBarContainer}>
                        <View 
                          style={[
                            styles.progressBarFill, 
                            { 
                              width: `${printer.toner}%`, 
                              backgroundColor: printer.toner < 30 ? '#FF0000' : '#1AB369'
                            }
                          ]} 
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 70,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  logoText: {
    fontSize: 10,
    color: '#777',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    marginRight: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userInitials: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777',
  },
  userName: {
    fontSize: 14,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 160,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  activeSidebarItem: {
    backgroundColor: '#F0EEFF',
    borderLeftWidth: 4,
    borderLeftColor: '#4B34F5',
  },
  sidebarText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  activeSidebarText: {
    color: '#4B34F5',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsCard: {
    width: '24%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '70%',
    borderRadius: 2,
  },
  statsChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsChangeText: {
    fontSize: 12,
    color: '#1AB369',
    marginLeft: 4,
  },
  statsNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1AB369',
    marginRight: 6,
  },
  statsNoteText: {
    fontSize: 12,
    color: '#777',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionActions: {
    flexDirection: 'row',
  },
  sectionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    marginLeft: 8,
  },
  refreshButton: {
    backgroundColor: '#4B34F5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionButtonText: {
    fontSize: 12,
    color: '#333',
  },
  refreshButtonText: {
    color: 'white',
    marginLeft: 4,
  },
  requestsContainer: {
    padding: 8,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInitialsContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  requestInitials: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  requestName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  requestTime: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  requestStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
  },
  requestAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  printersContainer: {
    padding: 8,
  },
  printerItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  printerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  printerName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  printerStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  printerStats: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FB',
    padding: 8,
    borderRadius: 4,
  },
  printerStat: {
    flex: 1,
    marginHorizontal: 4,
  },
  printerStatLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});