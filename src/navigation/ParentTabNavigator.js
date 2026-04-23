import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BarChart3, Calendar, User, Crown } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

// Screens
import ParentDashboard from '../screens/parent/ParentDashboard.js';
import ParentReports from '../screens/parent/ParentReports.js';
import ParentSchedule from '../screens/parent/ParentSchedule.js';
import ParentProfile from '../screens/parent/ParentProfile.js';
import SubscriptionScreen from '../screens/parent/SubscriptionScreen.js';

import { useTheme } from '../context/ThemeContext.js';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const DOCK_WIDTH = width - 40;
const TAB_WIDTH = DOCK_WIDTH / 5;

const TAB_CONFIG = [
  { name: 'Dashboard', label: 'Asosiy', icon: Home },
  { name: 'Reports', label: 'Hisobotlar', icon: BarChart3 },
  { name: 'Schedule', label: 'Jadval', icon: Calendar },
  { name: 'Subscription', label: 'Obuna', icon: Crown },
  { name: 'Profile', label: 'Profil', icon: User },
];

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { isDark, theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      friction: 10,
      tension: 50,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.outerContainer}>
      <View style={[
        styles.dockPill, 
        { 
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : theme.navbar,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9' 
        }
      ]}>
        {/* Sliding Indicator */}
        <Animated.View 
          style={[
            styles.activeIndicator, 
            { 
              transform: [{ translateX: slideAnim }],
              backgroundColor: isDark ? 'rgba(251, 146, 60, 0.12)' : COLORS.accent + '10' 
            }
          ]} 
        />

        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[index];
          const isFocused = state.index === index;
          const Icon = config.icon;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon 
                  color={isFocused ? COLORS.accent : (isDark ? theme.textSecondary : COLORS.gray[400])} 
                  size={isFocused ? 24 : 22} 
                  strokeWidth={isFocused ? 2.5 : 2}
                />
              </View>
              {isFocused && (
                <Text style={[styles.activeLabel, { color: COLORS.accent }]}>{config.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const ParentTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={ParentDashboard} />
      <Tab.Screen name="Reports" component={ParentReports} />
      <Tab.Screen name="Schedule" component={ParentSchedule} />
      <Tab.Screen name="Subscription" component={SubscriptionScreen} />
      <Tab.Screen name="Profile" component={ParentProfile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 15,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  dockPill: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 32,
    width: DOCK_WIDTH,
    alignItems: 'center',
    paddingHorizontal: 4,
    ...SHADOWS.medium,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  activeIndicator: {
    position: 'absolute',
    width: TAB_WIDTH - 4,
    height: 52,
    backgroundColor: COLORS.accent + '10',
    borderRadius: 26,
    left: 2,
    zIndex: 0,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.accent,
    marginTop: 0,
    textTransform: 'uppercase',
  },
});

export default ParentTabNavigator;
