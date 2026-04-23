import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '../context/ThemeContext.js';
import { LevelProvider } from '../context/LevelContext.js';

// Screens
import LandingScreen from '../screens/onboarding/LandingScreen.js';
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen.js';
import StudentLogin from '../screens/student/StudentLogin.js';
import StudentProfileSetup from '../screens/student/StudentProfileSetup.js';
import StudentOTP from '../screens/student/StudentOTP.js';
import StudentLessonDetail from '../screens/student/StudentLessonDetail.js';
import AbacusLevelsScreen from '../screens/student/AbacusLevelsScreen.js';
import AbacusLevelDetail from '../screens/student/AbacusLevelDetail.js';
import AbacusSimulator from '../screens/student/AbacusSimulator.js';
import StudentCompetitionDetail from '../screens/student/StudentCompetitionDetail.js';
import CompetitionArena from '../screens/student/CompetitionArena.js';
import MentalArithmeticGame from '../screens/student/MentalArithmeticGame.js';
import MentalPowerLevelsScreen from '../screens/student/MentalPowerLevelsScreen.js';
import StudentCourseCurriculum from '../screens/student/StudentCourseCurriculum.js';
import StudentVideoLesson from '../screens/student/StudentVideoLesson.js';
import StudentHomework from '../screens/student/StudentHomework.js';
import StudentSubscription from '../screens/student/StudentSubscription.js';
import StudentLive from '../screens/student/LiveScreen.js';
import StudentLiveLesson from '../screens/student/StudentLiveLesson.js';
import NotificationScreen from '../screens/student/NotificationScreen.js';
import StudentScheduleScreen from '../screens/student/StudentScheduleScreen.js';
import LiveLessonDetail from '../screens/student/LiveLessonDetail.js';
import LiveLessonArchivePlayer from '../screens/student/LiveLessonArchivePlayer.js';
import StudentAchievements from '../screens/student/StudentAchievements.js';
import StudentPersonalInfo from '../screens/student/StudentPersonalInfo.js';
import StudentNotificationSettings from '../screens/student/StudentNotificationSettings.js';
import StudentSecurity from '../screens/student/StudentSecurity.js';
import StudentHelpCenter from '../screens/student/StudentHelpCenter.js';
import StudentSettings from '../screens/student/StudentSettings.js';
import LeaderboardScreen from '../screens/student/LeaderboardScreen.js';
import StudentTabNavigator from './StudentTabNavigator.js';
import ParentLogin from '../screens/parent/ParentLogin.js';
import ParentTabNavigator from './ParentTabNavigator.js';
import SubjectDetail from '../screens/parent/SubjectDetail.js';
import LessonDetail from '../screens/parent/LessonDetail.js';
import TeacherChatList from '../screens/parent/TeacherChatList.js';
import ChatScreen from '../screens/parent/ChatScreen.js';
import TeacherRegistration from '../screens/teacher/TeacherRegistration.js';
import TeacherLoginScreen from '../screens/teacher/TeacherLoginScreen.js';
import TeacherTabNavigator from './TeacherTabNavigator.js';
import LiveLessonScreen from '../screens/parent/LiveLessonScreen.js';
import NotificationsScreen from '../screens/parent/NotificationsScreen.js';
import LessonResultDetail from '../screens/parent/LessonResultDetail.js';
import CalendarScreen from '../screens/parent/CalendarScreen.js';
import PersonalInfoScreen from '../screens/parent/PersonalInfoScreen.js';
import SecurityScreen from '../screens/parent/SecurityScreen.js';
import PaymentHistoryScreen from '../screens/parent/PaymentHistoryScreen.js';
import NotificationSettingsScreen from '../screens/parent/NotificationSettingsScreen.js';
import HelpCenterScreen from '../screens/parent/HelpCenterScreen.js';
import AppSettingsScreen from '../screens/parent/AppSettingsScreen.js';
import PaymentCheckoutScreen from '../screens/parent/PaymentCheckoutScreen.js';

// Teacher Sub-screens
import TeacherNotifications from '../screens/teacher/TeacherNotifications.js';
import TeacherLiveLesson from '../screens/teacher/TeacherLiveLesson.js';
import AddGroupScreen from '../screens/teacher/AddGroupScreen.js';
import AssignHomeworkScreen from '../screens/teacher/AssignHomeworkScreen.js';
import TeacherReportsScreen from '../screens/teacher/TeacherReportsScreen.js';
import TeacherLessonDetail from '../screens/teacher/TeacherLessonDetail.js';
import GroupDetailScreen from '../screens/teacher/GroupDetailScreen.js';
import TeacherChatScreen from '../screens/teacher/TeacherChatScreen.js';
import TeacherBalanceScreen from '../screens/teacher/TeacherBalanceScreen.js';
import WorkHistoryScreen from '../screens/teacher/WorkHistoryScreen.js';
import TeacherSecurityScreen from '../screens/teacher/TeacherSecurityScreen.js';
import TeacherNotifSettings from '../screens/teacher/TeacherNotifSettings.js';
import TeacherHelpCenter from '../screens/teacher/TeacherHelpCenter.js';
import TeacherWithdrawScreen from '../screens/teacher/TeacherWithdrawScreen.js';
import TeacherHelpDetailScreen from '../screens/teacher/TeacherHelpDetailScreen.js';

// Auth Stacks

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        
        {/* Student Flow */}
        <Stack.Screen name="StudentAuth" component={StudentLogin} />
        <Stack.Screen name="StudentProfileSetup" component={StudentProfileSetup} />
        <Stack.Screen name="StudentOTP" component={StudentOTP} />
        <Stack.Screen name="StudentDashboard" component={StudentTabNavigator} />
        <Stack.Screen name="StudentLessonDetail" component={StudentLessonDetail} />
        <Stack.Screen name="AbacusLevels" component={AbacusLevelsScreen} />
        <Stack.Screen name="AbacusLevelDetail" component={AbacusLevelDetail} />
        <Stack.Screen name="AbacusSimulator" component={AbacusSimulator} />
        <Stack.Screen name="StudentCourseCurriculum" component={StudentCourseCurriculum} />
        <Stack.Screen name="StudentVideoLesson" component={StudentVideoLesson} />
        <Stack.Screen name="StudentHomework" component={StudentHomework} />
        <Stack.Screen name="StudentLive" component={StudentLive} />
        <Stack.Screen name="StudentSubscription" component={StudentSubscription} />
        <Stack.Screen name="StudentLiveLesson" component={StudentLiveLesson} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="StudentSchedule" component={StudentScheduleScreen} />
        <Stack.Screen name="LiveLessonDetail" component={LiveLessonDetail} />
        <Stack.Screen name="LiveLessonArchivePlayer" component={LiveLessonArchivePlayer} />
        <Stack.Screen name="CompetitionDetail" component={StudentCompetitionDetail} />
        <Stack.Screen name="CompetitionArena" component={CompetitionArena} />
        <Stack.Screen name="MentalArithmetic" component={MentalArithmeticGame} />
        <Stack.Screen name="MentalPowerLevels" component={MentalPowerLevelsScreen} />
        <Stack.Screen name="StudentAchievements" component={StudentAchievements} />
        <Stack.Screen name="StudentPersonalInfo" component={StudentPersonalInfo} />
        <Stack.Screen name="StudentNotificationSettings" component={StudentNotificationSettings} />
        <Stack.Screen name="StudentSecurity" component={StudentSecurity} />
        <Stack.Screen name="StudentHelpCenter" component={StudentHelpCenter} />
        <Stack.Screen name="StudentSettings" component={StudentSettings} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        
        {/* Parent Flow */}
        <Stack.Screen name="ParentAuth" component={ParentLogin} />
        <Stack.Screen name="ParentDashboard" component={ParentTabNavigator} />
        <Stack.Screen name="SubjectDetail" component={SubjectDetail} />
        <Stack.Screen name="LessonDetail" component={LessonDetail} />
        <Stack.Screen name="TeacherChatList" component={TeacherChatList} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="LiveLesson" component={LiveLessonScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="LessonResultDetail" component={LessonResultDetail} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
        <Stack.Screen name="PaymentCheckout" component={PaymentCheckoutScreen} />
        
        {/* Teacher Flow */}
        <Stack.Screen name="TeacherRegistration" component={TeacherRegistration} />
        <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen} />
        <Stack.Screen name="TeacherDashboard" component={TeacherTabNavigator} />
        
        {/* Teacher Sub-screens */}
        <Stack.Screen name="TeacherNotifications" component={TeacherNotifications} />
        <Stack.Screen name="TeacherLiveLesson" component={TeacherLiveLesson} />
        <Stack.Screen name="AddGroup" component={AddGroupScreen} />
        <Stack.Screen name="AssignHomework" component={AssignHomeworkScreen} />
        <Stack.Screen name="TeacherReports" component={TeacherReportsScreen} />
        <Stack.Screen name="TeacherLessonDetail" component={TeacherLessonDetail} />
        <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
        <Stack.Screen name="TeacherChat" component={TeacherChatScreen} />
        <Stack.Screen name="TeacherBalance" component={TeacherBalanceScreen} />
        <Stack.Screen name="WorkHistory" component={WorkHistoryScreen} />
        <Stack.Screen name="TeacherSecurity" component={TeacherSecurityScreen} />
        <Stack.Screen name="TeacherNotifSettings" component={TeacherNotifSettings} />
        <Stack.Screen name="TeacherHelpCenter" component={TeacherHelpCenter} />
        <Stack.Screen name="TeacherWithdraw" component={TeacherWithdrawScreen} />
        <Stack.Screen name="TeacherHelpDetail" component={TeacherHelpDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

