import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, Gamepad2, Trophy, Tv, User } from 'lucide-react-native';
import { COLORS, SHADOWS, SPACING } from '../constants/theme.js';
import { LinearGradient } from 'expo-linear-gradient';

// Screens
import StudentHome from '../screens/student/StudentHome.js';
import SubjectsScreen from '../screens/student/SubjectsScreen.js';
import GamesHubScreen from '../screens/student/GamesHubScreen.js';
import AbacusLevelsScreen from '../screens/student/AbacusLevelsScreen.js';
import AbacusSimulator from '../screens/student/AbacusSimulator.js';
import ProfileScreen from '../screens/student/ProfileScreen.js';
import CompetitionScreen from '../screens/student/CompetitionScreen.js';
import LiveScreen from '../screens/student/LiveScreen.js';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const DOCK_WIDTH = width - 40;
const TAB_WIDTH = DOCK_WIDTH / 6;

const TAB_CONFIG = [
  { name: 'Dashboard', label: 'Asosiy', icon: Home },
  { name: 'Subjects', label: 'Fanlar', icon: BookOpen },
  { name: 'Games', label: 'O\'yinlar', icon: Gamepad2 },
  { name: 'Contest', label: 'Musobaqa', icon: Trophy },
  { name: 'Live', label: 'Jonli', icon: Tv },
  { name: 'Profile', label: 'Profil', icon: User },
];

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      friction: 9,
      tension: 70,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.dockPill}>
        {/* Subtle Sliding Indicator */}
        <Animated.View 
          style={[
            styles.activeIndicator, 
            { transform: [{ translateX: slideAnim }] }
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
                  color={isFocused ? COLORS.primary : COLORS.gray[400]} 
                  size={isFocused ? 24 : 22} 
                  strokeWidth={isFocused ? 2.5 : 2}
                />
              </View>
              {isFocused && (
                <Text style={styles.activeLabel}>{config.label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const StudentTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={
            tab.name === 'Dashboard' ? StudentHome :
            tab.name === 'Subjects' ? SubjectsScreen :
            tab.name === 'Games' ? GamesHubScreen :
            tab.name === 'Contest' ? CompetitionScreen :
            tab.name === 'Live' ? LiveScreen : ProfileScreen
          }
          options={{
            tabBarLabel: tab.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 15, // Lowered profile
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  dockPill: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 64, // Sleeker height
    borderRadius: 32,
    width: DOCK_WIDTH,
    alignItems: 'center',
    paddingHorizontal: 4,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: '#F1F5F9', // Subtle hairline border
    position: 'relative',
    overflow: 'hidden',
  },
  activeIndicator: {
    position: 'absolute',
    width: TAB_WIDTH - 8,
    height: 48,
    backgroundColor: '#F1F5F9', // Minimalist highlight
    borderRadius: 24,
    left: 4,
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
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 0,
  },
});

export default StudentTabNavigator;
