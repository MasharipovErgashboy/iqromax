import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, Key, Eye, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import './SecuritySettings.css';

const SecuritySettings = () => {
  const sessions = [
    { device: "MacBook Pro", browser: "Chrome", location: "Toshkent, UZ", status: "Faol", last: "Hozir" },
    { device: "iPhone 15 Pro", browser: "Safari", location: "Andijon, UZ", status: "Faol", last: "2 soat oldin" },
  ];

  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Xavfsizlik sozlamalari</h1>
          <p>Tizim xavfsizligi, parollar va sessiyalarni boshqarish</p>
        </div>
        <button className="save-btn">
          <ShieldCheck size={20} />
          <span>Saqlash</span>
        </button>
      </div>

      <div className="settings-grid">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="settings-card card-glass"
        >
          <div className="card-header">
            <Lock size={20} color="#F59E0B" />
            <h3>Parol siyosati</h3>
          </div>
          <div className="card-body">
            <div className="security-option">
              <div className="option-info">
                <h4>Ikki faktorli autentifikatsiya (2FA)</h4>
                <p>Kirishda mobil ilovaga kod yuborish.</p>
              </div>
              <button className="toggle-switch active"></button>
            </div>
            <div className="security-option">
              <div className="option-info">
                <h4>Parol murakkabligi</h4>
                <p>Kamida 8 belgi, raqam va maxsus belgilar.</p>
              </div>
              <button className="toggle-switch active"></button>
            </div>
            <div className="form-group">
               <label>Parolni yangilash muddati</label>
               <select>
                 <option>Har 30 kunda</option>
                 <option>Har 90 kunda</option>
                 <option>Hech qachon</option>
               </select>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="settings-card card-glass"
        >
          <div className="card-header">
            <Smartphone size={20} color="#10B981" />
            <h3>Faol sessiyalar</h3>
          </div>
          <div className="card-body">
            <div className="session-list">
               {sessions.map((session, i) => (
                 <div key={i} className="session-item">
                    <div className="session-icon">
                       {session.device.includes('iPhone') ? <Smartphone size={18} /> : <Clock size={18} />}
                    </div>
                    <div className="session-info">
                       <h4>{session.device} • {session.browser}</h4>
                       <p>{session.location} • {session.last}</p>
                    </div>
                    <button className="terminate-btn">Yakunlash</button>
                 </div>
               ))}
            </div>
            <button className="text-btn danger">Barcha sessiyalarni yakunlash</button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="settings-card card-glass warning-card"
        >
          <div className="card-header">
            <AlertTriangle size={20} color="#F59E0B" />
            <h3>Xavf haqida bildirishnoma</h3>
          </div>
          <div className="card-body">
            <p className="warning-text">
              Yangi qurilmadan kirilganda yoki shubhali harakat bo'lganda email orqali xabar berish yoqilgan.
            </p>
            <button className="secondary-btn">Xavfsizlik loglarini ko'rish</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecuritySettings;
