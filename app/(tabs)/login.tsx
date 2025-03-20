import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('user');
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const logoAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Start animations when component mounts
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(logoAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login with:', { email, password, userRole });
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Login with Google');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1585241936939-be4099591252?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.7)']}
          style={styles.gradient}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <Animated.View 
                style={[
                  styles.logoContainer, 
                  { 
                    opacity: fadeAnim,
                    transform: [{ scale: logoAnim }] 
                  }
                ]}
              >
                <Text style={styles.appName}>PrintMe Portal</Text>
              </Animated.View>

              <Animated.View 
                style={[
                  styles.formContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.subText}>Sign in to your account to continue</Text>

                <View style={styles.roleSelector}>
                  <Text style={styles.labelText}>Select Role</Text>
                  <View style={styles.roleOptions}>
                    <TouchableOpacity
                      style={[
                        styles.roleButton,
                        userRole === 'user' && styles.selectedRole,
                      ]}
                      onPress={() => setUserRole('user')}
                    >
                      <Text style={styles.roleIcon}>👤</Text>
                      <Text
                        style={[
                          styles.roleText,
                          userRole === 'user' && styles.selectedRoleText,
                        ]}
                      >
                        User
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.roleButton,
                        userRole === 'vendor' && styles.selectedRole,
                      ]}
                      onPress={() => setUserRole('vendor')}
                    >
                      <Text style={styles.roleIcon}>🏪</Text>
                      <Text
                        style={[
                          styles.roleText,
                          userRole === 'vendor' && styles.selectedRoleText,
                        ]}
                      >
                        Vendor
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.labelText}>Email address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#A0A0A0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.labelText}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#A0A0A0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.loginButton} 
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.orContainer}>
                  <View style={styles.orLine} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.orLine} />
                </View>

                <TouchableOpacity
                  style={styles.googleButton}
                  onPress={handleGoogleLogin}
                >
                  <Image
                    source={{ uri: 'https://pngimg.com/uploads/google/google_PNG19635.png' }}
                    style={styles.googleIcon}
                  />
                  <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account?</Text>
                  <TouchableOpacity>
                    <Text style={styles.signupLink}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding to avoid navigation clash
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  roleSelector: {
    marginBottom: 16,
  },
  labelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  roleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    width: '48%',
  },
  selectedRole: {
    borderColor: '#6200ee',
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
  },
  roleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  roleText: {
    fontSize: 15,
    color: '#555',
  },
  selectedRoleText: {
    color: '#6200ee',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  forgotPasswordText: {
    color: '#6200ee',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#6200ee',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default LoginScreen;