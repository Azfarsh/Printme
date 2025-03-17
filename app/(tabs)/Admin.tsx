import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

type PrintOrder = {
  id: string;
  companyName: string;
  location: string;
  deliveryDate: string;
  deliveryTime: string;
  amount: string;
  status: 'New' | 'Pending' | 'Paid';
};

export default function AdminDashboard() {
  const [orders] = useState<PrintOrder[]>([
    { id: '1', companyName: 'Nordic', location: 'Sabaheli Airport', deliveryDate: '10/10/2023', deliveryTime: '05:56 pm', amount: '$250.00', status: 'New' },
    { id: '2', companyName: 'Cuberts', location: 'Starbucks Airport', deliveryDate: '25/11/2023', deliveryTime: '12:26 pm', amount: '$350.00', status: 'Pending' },
    { id: '3', companyName: 'PaperStar', location: 'Salna International Airport', deliveryDate: '13/05/2023', deliveryTime: '07:26 pm', amount: '$1050.00', status: 'Paid' },
    { id: '4', companyName: 'Green Chameleon', location: 'Kerala International Airport', deliveryDate: '20/02/2023', deliveryTime: '05:56 pm', amount: '$1250.00', status: 'Paid' },
    { id: '5', companyName: 'UX8', location: 'Bluefields Airport', deliveryDate: '10/05/2023', deliveryTime: '06:07 am', amount: '$1250.00', status: 'Paid' },
  ]);

  return (
    <ThemedView style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatar} />
              <ThemedText style={styles.userName}>John Smith</ThemedText>
            </View>
            <ThemedText style={styles.title}>Print Orders</ThemedText>
            <TouchableOpacity style={styles.addButton}>
              <ThemedText style={styles.addButtonText}>Add New Orders</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
              <ThemedText style={styles.statNumber}>27500</ThemedText>
              <ThemedText style={styles.statLabel}>Total Orders</ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#E0F2F1' }]}>
              <ThemedText style={styles.statNumber}>4500</ThemedText>
              <ThemedText style={styles.statLabel}>Total Delivered</ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FCE4EC' }]}>
              <ThemedText style={styles.statNumber}>1500</ThemedText>
              <ThemedText style={styles.statLabel}>Pending Orders</ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}>
              <ThemedText style={styles.statNumber}>750</ThemedText>
              <ThemedText style={styles.statLabel}>Orders Hold</ThemedText>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <ThemedText style={styles.columnHeader}>Company Name</ThemedText>
              <ThemedText style={styles.columnHeader}>Location</ThemedText>
              <ThemedText style={styles.columnHeader}>Delivery Date</ThemedText>
              <ThemedText style={styles.columnHeader}>Amount</ThemedText>
              <ThemedText style={styles.columnHeader}>Status</ThemedText>
            </View>

            <ScrollView style={styles.tableContent}>
              {orders.map((order) => (
                <View key={order.id} style={styles.tableRow}>
                  <ThemedText style={styles.cellText}>{order.companyName}</ThemedText>
                  <ThemedText style={styles.cellText}>{order.location}</ThemedText>
                  <ThemedText style={styles.cellText}>{`${order.deliveryDate}\n${order.deliveryTime}`}</ThemedText>
                  <ThemedText style={styles.cellText}>{order.amount}</ThemedText>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                    <ThemedText style={styles.statusText}>{order.status}</ThemedText>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return '#E3F2FD';
    case 'Pending': return '#FFF3E0';
    case 'Paid': return '#E0F2F1';
    default: return '#E0E0E0';
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FF',
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDD',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    padding: 16,
    borderRadius: 8,
    width: '23%',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  columnHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  tableContent: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cellText: {
    flex: 1,
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});