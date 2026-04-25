import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  UserCheck, 
  BookOpen, 
  Video, 
  Trophy, 
  Wallet, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User as UserIcon,
  ChevronRight,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../pages/Dashboard.css';

const Layout = ({ children }) => {
  const [userRole, setUserRole] = useState('super_admin');
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { 
      icon: Users, 
      label: "O'quvchilar", 
      path: '/students',
      subItems: [
        { label: "Barcha o'quvchilar", path: '/students/all' },
        { label: "Premium o'quvchilar", path: '/students/premium' },
        { label: "Oddiy o'quvchilar", path: '/students/regular' },
      ]
    },
    { 
      icon: UserCheck, 
      label: "O'qituvchilar", 
      path: '/teachers/analytics',
      subItems: [
        { label: "Faol o'qituvchilar", path: '/teachers/active' },
        { label: "Arizalar", path: '/teachers/applications' },
        { label: "Chat", path: '/teachers/chat' },
      ]
    },
    { 
      icon: UserSquare2, 
      label: 'Ota-onalar', 
      path: '/parents/analytics',
      subItems: [
        { label: 'Barcha ota-onalar', path: '/parents/all' },
        { label: 'Sharhlar', path: '/parents/reviews' },
      ]
    },
    { 
      icon: BookOpen, 
      label: 'Kurslar', 
      path: '/courses/analytics',
      subItems: [
        { label: 'Barcha kurslar', path: '/courses/list' },
      ]
    },
    { 
      icon: Video, 
      label: 'Jonli darslar', 
      path: '/live/analytics',
      subItems: [
        { label: 'Darslar jadvali', path: '/live/list' },
      ]
    },
    { 
      icon: Trophy, 
      label: 'Olimpiadalar', 
      path: '/contests/analytics',
      subItems: [
        { label: 'Musobaqalar jadvali', path: '/contests/list' },
      ]
    },
    { icon: Wallet, label: 'Moliya', path: '/finance' },
    { 
      icon: Settings, 
      label: 'Sozlamalar', 
      path: '/settings',
      subItems: [
        { label: 'Adminlar', path: '/admins', superOnly: true },
        { label: 'Tizim sozlamalari', path: '/settings/system' },
        { label: 'Xavfsizlik', path: '/settings/security' }
      ] 
    },
  ];

  return (
    <div className={`dashboard-container ${isCollapsed ? 'collapsed' : ''}`}>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
           {!isCollapsed && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="sidebar-logo"
             >
               <h2>IQROMAX</h2>
               <span>ADMIN PANEL</span>
             </motion.div>
           )}
           <button 
             className="toggle-btn" 
             onClick={() => setIsCollapsed(!isCollapsed)}
           >
             {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
           </button>
        </div>
        
        <nav className="nav-menu">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="nav-item-wrapper"
              onMouseEnter={() => item.subItems && !isCollapsed && setActiveSubMenu(index)}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <Link 
                to={item.path} 
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
                {!isCollapsed && item.subItems && <ChevronRight size={14} className="arrow-icon" />}
              </Link>
              
              {!isCollapsed && item.subItems && activeSubMenu === index && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="sub-menu"
                >
                  {item.subItems.map((sub, sIdx) => (
                    (!sub.superOnly || userRole === 'super_admin') && (
                      <Link key={sIdx} to={sub.path} className="sub-item">
                        <ChevronRight size={14} />
                        <span>{sub.label}</span>
                      </Link>
                    )
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        <div className="nav-footer">
          <Link to="/login" className="nav-item" title={isCollapsed ? 'Chiqish' : ''}>
            <LogOut size={20} />
            {!isCollapsed && <span>Chiqish</span>}
          </Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="search-bar">
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Qidirish..." />
          </div>

          <div className="header-right">
            <button className="notification-btn">
              <Bell size={22} />
            </button>
            
            <div className="user-profile">
              <div className="avatar">
                <UserIcon size={24} />
              </div>
            </div>
          </div>
        </header>

        <div className="layout-children">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
