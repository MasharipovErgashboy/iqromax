import React from 'react';
import { motion } from 'framer-motion';
import { 
  Video, Users, Clock, Calendar, 
  TrendingUp, Play, CheckCircle2, AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import './LiveAnalytics.css';

const LiveAnalytics = () => {
  const stats = [
    { label: 'Faol darslar', value: '12', icon: <Play size={24} />, color: '#ef4444', trend: '+3 yangi' },
    { label: 'Bugungi o\'quvchilar', value: '850', icon: <Users size={24} />, color: '#6366f1', trend: '+12%' },
    { label: 'Umumiy soatlar', value: '450', icon: <Clock size={24} />, color: '#10B981', trend: 'Shu oyda' },
    { label: 'Rejalashtirilgan', value: '28', icon: <Calendar size={24} />, color: '#F59E0B', trend: 'Haftalik' },
  ];

  const chartData = [
    { name: '08:00', students: 120 },
    { name: '10:00', students: 350 },
    { name: '12:00', students: 480 },
    { name: '14:00', students: 300 },
    { name: '16:00', students: 620 },
    { name: '18:00', students: 850 },
    { name: '20:00', students: 450 },
  ];

  const teacherStats = [
    { name: 'Aziz R.', hours: 45, color: '#6366f1' },
    { name: 'Madina K.', hours: 38, color: '#10B981' },
    { name: 'Jasur S.', hours: 32, color: '#F59E0B' },
    { name: 'Lola T.', hours: 30, color: '#EC4899' },
  ];

  return (
    <div className="live-analytics-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Jonli Darslar Analitikasi</h1>
          <p>Real vaqt rejimida darslar va davomat monitoringi</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div 
            key={i} 
            className="stat-card-p card-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="s-icon-box" style={{ background: `${s.color}15`, color: s.color }}>
              {s.icon}
            </div>
            <div className="s-info">
              <span className="s-label">{s.label}</span>
              <h2 className="s-value">{s.value}</h2>
              <span className="s-trend">{s.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="analytics-grid-p">
        <motion.div 
          className="chart-container-p card-glass"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="chart-header-p">
            <h3>Kunlik o'quvchilar oqimi</h3>
            <div className="live-indicator">
              <div className="pulse"></div>
              Live
            </div>
          </div>
          <div className="main-chart">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="live-side-cards">
          <motion.div 
            className="top-teachers-card card-glass"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3>Eng faol o'qituvchilar</h3>
            <div className="teacher-list-mini">
              {teacherStats.map((t, i) => (
                <div key={i} className="t-stat-row">
                  <div className="t-info-m">
                    <div className="t-avatar-mini" style={{ background: `${t.color}20`, color: t.color }}>{t.name[0]}</div>
                    <span>{t.name}</span>
                  </div>
                  <div className="t-progress-box">
                    <div className="t-pb">
                      <div className="t-pb-fill" style={{ width: `${(t.hours/45)*100}%`, background: t.color }}></div>
                    </div>
                    <span className="t-hours">{t.hours}s</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="upcoming-sessions card-glass"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Navbatdagi darslar</h3>
            <div className="upcoming-list">
              <div className="u-item">
                <div className="u-time">18:30</div>
                <div className="u-info">
                  <h4>Mental Arifmetika Pro</h4>
                  <span>Guruh: A1 • Aziz Raimov</span>
                </div>
              </div>
              <div className="u-item">
                <div className="u-time">19:00</div>
                <div className="u-info">
                  <h4>Python asoslari</h4>
                  <span>Guruh: IT-2 • Madina K.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalytics;
