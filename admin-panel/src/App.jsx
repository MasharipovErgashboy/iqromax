import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import AdminsManagement from './pages/AdminsManagement';
import SystemSettings from './pages/SystemSettings';
import SecuritySettings from './pages/SecuritySettings';
import StudentsOverview from './pages/StudentsOverview';
import StudentsList from './pages/StudentsList';
import TeachersActive from './pages/TeachersActive';
import TeacherApplications from './pages/TeacherApplications';
import TeacherChat from './pages/TeacherChat';
import TeachersAnalytics from './pages/TeachersAnalytics';
import ParentsList from './pages/ParentsList';
import ParentsReviews from './pages/ParentsReviews';
import ParentsAnalytics from './pages/ParentsAnalytics';
import CoursesList from './pages/CoursesList';
import CourseCategories from './pages/CourseCategories';
import CoursesAnalytics from './pages/CoursesAnalytics';
import LiveAnalytics from './pages/LiveAnalytics';
import LiveList from './pages/LiveList';
import ContestsAnalytics from './pages/ContestsAnalytics';
import ContestsList from './pages/ContestsList';
import FinanceAnalytics from './pages/FinanceAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admins" element={<Layout><AdminsManagement /></Layout>} />
        
        {/* Students Routes */}
        <Route path="/students" element={<Layout><StudentsOverview /></Layout>} />
        <Route path="/students/all" element={<Layout><StudentsList type="all" /></Layout>} />
        <Route path="/students/premium" element={<Layout><StudentsList type="premium" /></Layout>} />
        <Route path="/students/regular" element={<Layout><StudentsList type="regular" /></Layout>} />

        {/* Teachers Routes */}
        <Route path="/teachers/analytics" element={<Layout><TeachersAnalytics /></Layout>} />
        <Route path="/teachers/active" element={<Layout><TeachersActive /></Layout>} />
        <Route path="/teachers/applications" element={<Layout><TeacherApplications /></Layout>} />
        <Route path="/teachers/chat" element={<Layout><TeacherChat /></Layout>} />
        
        {/* Parents Routes */}
        <Route path="/parents/analytics" element={<Layout><ParentsAnalytics /></Layout>} />
        <Route path="/parents/all" element={<Layout><ParentsList /></Layout>} />
        <Route path="/parents/reviews" element={<Layout><ParentsReviews /></Layout>} />
        
        {/* Courses Routes */}
        <Route path="/courses/analytics" element={<Layout><CoursesAnalytics /></Layout>} />
        <Route path="/courses/list" element={<Layout><CoursesList /></Layout>} />
        <Route path="/courses/categories" element={<Layout><CourseCategories /></Layout>} />
        
        {/* Live Routes */}
        <Route path="/live/analytics" element={<Layout><LiveAnalytics /></Layout>} />
        <Route path="/live/list" element={<Layout><LiveList /></Layout>} />

        {/* Contests Routes */}
        <Route path="/contests/analytics" element={<Layout><ContestsAnalytics /></Layout>} />
        <Route path="/contests/list" element={<Layout><ContestsList /></Layout>} />

        {/* Finance Routes */}
        <Route path="/finance" element={<Layout><FinanceAnalytics /></Layout>} />

        <Route path="/settings/system" element={<Layout><SystemSettings /></Layout>} />
        <Route path="/settings/security" element={<Layout><SecuritySettings /></Layout>} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
