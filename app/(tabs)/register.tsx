import { Link, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setError('');
      if (!name || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
      // Validate password length
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      await SecureStore.setItemAsync('userToken', 'dummy-auth-token');
      router.replace('/(tabs)/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText style={styles.title}>Sign up</ThemedText>
        
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Name</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Email</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Password</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Create password"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <ThemedText style={styles.buttonText}>Sign up</ThemedText>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <ThemedText style={styles.loginText}>Already have an account? </ThemedText>
          <Link href="/(tabs)/login">
            <ThemedText style={styles.loginLink}>Sign in</ThemedText>
          </Link>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1F1F1F',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#1F1F1F',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    color: '#1F1F1F',
  },
  button: {
    backgroundColor: '#6366F1',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666666',
    fontSize: 14,
  },
  loginLink: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
});