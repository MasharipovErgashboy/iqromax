import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Users, Calendar, MessageSquare, User } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme.js';
import { useTheme } from '../context/ThemeContext.js';

// Screens
import TeacherDashboard from '../screens/teacher/TeacherDashboard.js';
import TeacherStudents from '../screens/teacher/TeacherStudents.js';
import TeacherSchedule from '../screens/teacher/TeacherSchedule.js';
import TeacherMessages from '../screens/teacher/TeacherMessages.js';
import TeacherProfile from '../screens/teacher/TeacherProfile.js';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const DOCK_WIDTH = width - 40;
const TAB_WIDTH = DOCK_WIDTH / 5;

const TAB_CONFIG = [
  { name: 'Dashboard', label: 'Asosiy', icon: Home },
  { name: 'Students', label: 'O\'quvchilar', icon: Users },
  { name: 'Schedule', label: 'Jadval', icon: Calendar },
  { name: 'Messages', label: 'Xabarlar', icon: MessageSquare },
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
              backgroundColor: isDark ? 'rgba(251, 146, 60, 0.12)' : COLORS.secondary + '15' 
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
                  color={isFocused ? COLORS.secondary : (isDark ? theme.textSecondary : COLORS.gray[400])} 
                  size={isFocused ? 24 : 22} 
                  strokeWidth={isFocused ? 2.5 : 2}
                />
              </View>
              {isFocused && (
                <Text style={[styles.activeLabel, { color: COLORS.secondary }]}>{config.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TeacherTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={TeacherDashboard} />
      <Tab.Screen name="Students" component={TeacherStudents} />
      <Tab.Screen name="Schedule" component={TeacherSchedule} />
      <Tab.Screen name="Messages" component={TeacherMessages} />
      <Tab.Screen name="Profile" component={TeacherProfile} />
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
    backgroundColor: COLORS.secondary + '15',
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
    color: COLORS.secondary,
    marginTop: 0,
    textTransform: 'uppercase',
  },
});

export default TeacherTabNavigator;
