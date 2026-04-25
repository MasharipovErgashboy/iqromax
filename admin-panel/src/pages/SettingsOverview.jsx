import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings as SettingsIcon, Users, Lock, Server, BellRing, Database, Smartphone } from 'lucide-react';
import './SettingsOverview.css';
import { useNavigate } from 'react-router-dom';

const SettingsCard = ({ title, desc, icon: Icon, stats, color, path }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
      className="settings-overview-card"
      onClick={() => navigate(path)}
    >
      <div className="card-top">
        <div className="settings-icon-box" style={{ backgroundColor: `${color}15`, color: color }}>
          <Icon size={28} />
        </div>
        <div className="card-badge">Aktiv</div>
      </div>
      <div className="card-mid">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="card-bottom">
        {stats.map((stat, i) => (
          <div key={i} className="mini-stat">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-val">{stat.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SettingsOverview = () => {
  const settingsSections = [
    {
      title: "Adminlar boshqaruvi",
      desc: "Tizim adminlarini qo'shish, o'chirish va rollarni boshqarish.",
      icon: Users,
      color: "#10B981",
      path: "/admins",
      stats: [
        { label: "Jami adminlar", value: "3 ta" },
        { label: "Super Adminlar", value: "1 ta" }
      ]
    },
    {
      title: "Tizim sozlamalari",
      desc: "Platformaning umumiy parametrlari va mobil ilova konfiguralari.",
      icon: SettingsIcon,
      color: "#6366F1",
      path: "/settings/system",
      stats: [
        { label: "Versiya", value: "v2.4.0" },
        { label: "Mobil Ilova", value: "On" }
      ]
    },
    {
      title: "Xavfsizlik",
      desc: "Kirish parollari, 2FA va sessiyalar boshqaruvi.",
      icon: Lock,
      color: "#F59E0B",
      path: "/settings/security",
      stats: [
        { label: "Himoya", value: "Yuqori" },
        { label: "Sessiyalar", value: "2 ta faol" }
      ]
    },
    {
      title: "Ma'lumotlar bazasi",
      desc: "Database holati, zaxira nusxalari (backup) va tiklash.",
      icon: Database,
      color: "#EC4899",
      path: "/settings/database",
      stats: [
        { label: "Zaxira", value: "2 soat oldin" },
        { label: "Sog'liq", value: "100%" }
      ]
    }
  ];

  return (
    <div className="settings-overview-page">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="settings-header"
      >
        <div className="header-info">
          <h1>Sozlamalar Markazi</h1>
          <p>Tizimning barcha parametrlarini bir joydan boshqaring va monitoring qiling.</p>
        </div>
      </motion.div>

      <div className="settings-grid">
        {settingsSections.map((section, idx) => (
          <SettingsCard key={idx} {...section} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="system-health-banner"
      >
        <div className="health-info">
          <Server size={20} color="#10B981" />
          <span>Barcha tizimlar barqaror ishlamoqda. So'nggi yangilanish: 2024-04-24 16:20</span>
        </div>
        <div className="health-status">
          <div className="status-pulse"></div>
          <span>Online</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsOverview;
