import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Screen Components remain the same
const HomeScreen = () => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Welcome to PrintMe</ThemedText>
    <ThemedText style={styles.subtitle}>Your printing solution</ThemedText>
  </ThemedView>
);

const LoginScreen = () => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Login</ThemedText>
  </ThemedView>
);

const RegisterScreen = () => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Register</ThemedText>
  </ThemedView>
);

const DashboardScreen = () => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Dashboard</ThemedText>
  </ThemedView>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Login':
              iconName = focused ? 'log-in' : 'log-in-outline';
              break;
            case 'Register':
              iconName = focused ? 'person-add' : 'person-add-outline';
              break;
            case 'Dashboard':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C2BD9',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#6C2BD9',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
