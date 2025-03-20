import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";

// For Web: Use styled-components
import styled, { createGlobalStyle } from "styled-components";

const isWeb = Platform.OS === "web"; // Detect if running on web

// Web Global Styles
const GlobalStyle = isWeb
  ? createGlobalStyle`
      body {
        font-family: Arial, sans-serif;
        background: #f7f7f7;
        margin: 0;
        padding: 20px;
      }
    `
  : null;

// Web Components using styled-components
const WebContainer = isWeb
  ? styled.div`
      width: 80%;
      margin: auto;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    `
  : (props: any) => <View {...props} />;

const WebButton = isWeb
  ? styled.button<{ primary?: boolean }>`
      background: ${(props) => (props.primary ? "#4a00e0" : "#f1f1f1")};
      color: ${(props) => (props.primary ? "white" : "black")};
      padding: 10px;
      border: none;
      width: 100%;
      margin-bottom: 10px;
      cursor: pointer;
      border-radius: 5px;
    `
  : TouchableOpacity;

// Dashboard Component
const Dashboard: React.FC = () => {
  return (
    <>
      {isWeb && GlobalStyle && <GlobalStyle />}
      <ScrollView style={styles.container}>
        <WebContainer style={isWeb ? {} : styles.box}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>My PrintMe Dashboard</Text>
            <Text style={styles.balance}>💰 $25.50</Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <WebButton primary>
              <Text style={styles.buttonText}>+ Print New Document</Text>
            </WebButton>
            <WebButton>
              <Text style={styles.buttonText}>📍 Find Nearest Printer</Text>
            </WebButton>
            <WebButton>
              <Text style={styles.buttonText}>+ Add Print Balance</Text>
            </WebButton>
          </View>

          {/* Print Balance */}
          <View style={styles.section}>
            <Text style={styles.subheading}>Print Balance</Text>
            <Text style={styles.balanceText}>$25.50</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: "70%" }]}></View>
            </View>
            <Text>Enough for about 51 black & white pages</Text>
          </View>

          {/* Notifications */}
          <View style={styles.section}>
            <Text style={styles.subheading}>Notifications</Text>
            <Text style={styles.notification}>✅ Print job completed: Lecture Notes.pdf</Text>
            <Text style={styles.warning}>⚠️ Low balance warning: Less than $5 remaining</Text>
          </View>

          {/* Documents */}
          <View style={styles.section}>
            <Text style={styles.subheading}>My Documents</Text>
            <Text>📄 Assignment.pdf - ⏳ 2 min left</Text>
            <Text>📄 Research Paper.pdf - 🟠 In Queue</Text>
            <Text>📄 Notes.pdf - 🟢 Ready to Collect</Text>
          </View>
        </WebContainer>
      </ScrollView>
    </>
  );
};

// Common Styles (Used in React Native)
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f7f7f7", flex: 1 },
  box: { backgroundColor: "white", padding: 20, borderRadius: 10, marginBottom: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  balance: { fontSize: 18, color: "green" },
  section: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 10 },
  subheading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  buttonText: { textAlign: "center", color: "white" },
  progressBar: { height: 5, backgroundColor: "#e0e0e0", borderRadius: 5, marginVertical: 5 },
  progress: { height: 5, backgroundColor: "#4a00e0", borderRadius: 5 },
  balanceText: { fontSize: 20, fontWeight: "bold" },
  notification: { color: "green", marginBottom: 5 },
  warning: { color: "orange" },
});

// Export the Dashboard Component
export default Dashboard;
