import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

type TokenStatus = {
  type: 'Normal' | 'Priority';
  status: 'Available' | 'Busy';
  count: number;
};

type PrintJob = {
  id: string;
  fileName: string;
  status: 'Pending' | 'Printing' | 'Completed';
  tokenType: 'Normal' | 'Priority';
};

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const [tokenStatus, setTokenStatus] = useState<TokenStatus[]>([
    { type: 'Normal', status: 'Available', count: 5 },
    { type: 'Priority', status: 'Busy', count: 2 }
  ]);

  const [printJobs, setPrintJobs] = useState<PrintJob[]>([
    { id: '1', fileName: 'Document1.pdf', status: 'Printing', tokenType: 'Priority' },
    { id: '2', fileName: 'Assignment.docx', status: 'Pending', tokenType: 'Normal' },
  ]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Print Dashboard</ThemedText>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Token Status</ThemedText>
        <View style={styles.tokenContainer}>
          {tokenStatus.map((token, index) => (
            <View key={index} style={styles.tokenCard}>
              <ThemedText style={styles.tokenType}>{token.type}</ThemedText>
              <ThemedText style={[styles.tokenStatus, 
                { color: token.status === 'Available' ? '#4CAF50' : '#FF9800' }]}>
                {token.status}
              </ThemedText>
              <ThemedText>Available: {token.count}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Print Queue</ThemedText>
        <ScrollView style={styles.queueContainer}>
          {printJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobInfo}>
                <ThemedText style={styles.fileName}>{job.fileName}</ThemedText>
                <ThemedText style={[styles.jobStatus, 
                  { color: job.status === 'Completed' ? '#4CAF50' : 
                          job.status === 'Printing' ? '#2196F3' : '#FF9800' }]}>
                  {job.status}
                </ThemedText>
              </View>
              <ThemedText style={styles.tokenBadge}>{job.tokenType}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity 
        style={styles.uploadButton} 
        onPress={async () => {
          try {
            const result = await DocumentPicker.getDocumentAsync({
              type: ['application/pdf', 'application/msword', 
                     'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
              copyToCacheDirectory: true
            });
            
            if (!result.canceled && result.assets && result.assets[0]) {
              const asset = result.assets[0];
              const newJob: PrintJob = {
                id: Date.now().toString(),
                fileName: asset.name,
                status: 'Pending',
                tokenType: 'Normal'
              };
              setPrintJobs(prev => [...prev, newJob]);
            }
          } catch (error) {
            console.error('Error uploading document:', error);
            // Show error message to user
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload document';
            alert(errorMessage);
          }
        }}>
        <ThemedText style={styles.uploadButtonText}>Upload New Document</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenCard: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  tokenType: {
    fontSize: 16,
    fontWeight: '600',
  },
  tokenStatus: {
    fontSize: 14,
    marginVertical: 5,
  },
  queueContainer: {
    maxHeight: 300,
  },
  jobCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  jobInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    marginBottom: 5,
  },
  jobStatus: {
    fontSize: 14,
  },
  tokenBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    fontSize: 12,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});