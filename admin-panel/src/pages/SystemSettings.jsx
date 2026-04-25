import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Smartphone, Globe, Shield, Bell, Database, RefreshCw, Upload } from 'lucide-react';
import './SystemSettings.css';

const SystemSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Tizim sozlamalari</h1>
          <p>Platformaning umumiy parametrlari va texnik holatini boshqarish</p>
        </div>
        <button className="save-btn">
          <Save size={20} />
          <span>Saqlash</span>
        </button>
      </div>

      <div className="settings-grid">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="settings-card card-glass"
        >
          <div className="card-header">
            <Globe size={20} color="#10B981" />
            <h3>Platforma ma'lumotlari</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Tizim nomi</label>
              <input type="text" defaultValue="IQROMAX" />
            </div>
            <div className="form-group">
              <label>Platforma URL</label>
              <input type="text" defaultValue="https://admin.iqromax.uz" />
            </div>
            <div className="form-group">
              <label>Logo (Web & Mobile)</label>
              <div className="logo-upload">
                <div className="logo-preview">IQ</div>
                <button className="upload-btn"><Upload size={16} /> O'zgartirish</button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="settings-card card-glass"
        >
          <div className="card-header">
            <Smartphone size={20} color="#6366F1" />
            <h3>Mobil ilova sozlamalari</h3>
          </div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group">
                <label>Ilova versiyasi (iOS)</label>
                <input type="text" defaultValue="1.2.4" />
              </div>
              <div className="form-group">
                <label>Ilova versiyasi (Android)</label>
                <input type="text" defaultValue="1.2.5" />
              </div>
            </div>
            <div className="form-group">
              <label>Majburiy yangilanish</label>
              <div className="toggle-switch-wrapper">
                <span className="toggle-label">Yoqilgan</span>
                <button className="toggle-switch active"></button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="settings-card card-glass danger-zone"
        >
          <div className="card-header">
            <RefreshCw size={20} color="#ef4444" />
            <h3>Texnik holat</h3>
          </div>
          <div className="card-body">
            <div className="maintenance-box">
              <div className="maintenance-info">
                <h4>Texnik ishlar rejimi (Maintenance)</h4>
                <p>Bu rejim yoqilganda o'quvchilar ilovaga kira olmaydi.</p>
              </div>
              <button 
                className={`toggle-switch ${maintenanceMode ? 'active' : ''}`}
                onClick={() => setMaintenanceMode(!maintenanceMode)}
              ></button>
            </div>
            <div className="form-group">
               <label>Keshni tozalash</label>
               <button className="secondary-btn">Tizim keshini tozalash</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemSettings;
