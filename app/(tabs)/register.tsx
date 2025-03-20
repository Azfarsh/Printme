import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Link } from 'expo-router';
import { User, Mail, Lock, Star } from 'lucide-react-native';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Sign up to get started with PrintMe</Text>
      </View>

      <View style={styles.roleSelector}>
        <Text style={styles.label}>Select Role</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={[
              styles.roleButton,
              formData.role === 'user' && styles.roleButtonActive
            ]}
            onPress={() => setFormData({...formData, role: 'user'})}
          >
            <User size={24} color={formData.role === 'user' ? '#6C47FF' : '#666'} />
            <Text style={[
              styles.roleText,
              formData.role === 'user' && styles.roleTextActive
            ]}>User</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.roleButton,
              formData.role === 'vendor' && styles.roleButtonActive
            ]}
            onPress={() => setFormData({...formData, role: 'vendor'})}
          >
            <Star size={24} color={formData.role === 'vendor' ? '#6C47FF' : '#666'} />
            <Text style={[
              styles.roleText,
              formData.role === 'vendor' && styles.roleTextActive
            ]}>Vendor</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.roleButton,
              formData.role === 'admin' && styles.roleButtonActive
            ]}
            onPress={() => setFormData({...formData, role: 'admin'})}
          >
            <Lock size={24} color={formData.role === 'admin' ? '#6C47FF' : '#666'} />
            <Text style={[
              styles.roleText,
              formData.role === 'admin' && styles.roleTextActive
            ]}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputWrapper}>
          <User size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({...formData, fullName: text})}
          />
        </View>
        {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

        <Text style={styles.label}>Email address</Text>
        <View style={styles.inputWrapper}>
          <Mail size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
        </View>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          />
        </View>
        {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/login" style={styles.link}>
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center', // Add this
    alignItems: 'center', // Add this
  },
  header: {
    marginBottom: 24,
    alignItems: 'center', // Add this
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  roleSelector: {
    marginBottom: 24,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  roleButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginHorizontal: 4,
  },
  roleButtonActive: {
    borderColor: '#6C47FF',
    backgroundColor: '#F5F3FF',
  },
  roleText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  roleTextActive: {
    color: '#6C47FF',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6C47FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    marginLeft: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#6C47FF',
    fontWeight: '600',
  },
});