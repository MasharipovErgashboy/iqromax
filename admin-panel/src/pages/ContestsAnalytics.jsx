import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Users, Award, Target, 
  TrendingUp, Star, Zap, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import './ContestsAnalytics.css';

const ContestsAnalytics = () => {
  const stats = [
    { label: 'Jami musobaqalar', value: '156', icon: <Trophy size={24} />, color: '#F59E0B', trend: '+12 bu oy' },
    { label: 'Faol ishtirokchilar', value: '12.4k', icon: <Users size={24} />, color: '#6366f1', trend: '+2.5k o\'sish' },
    { label: 'Mukofot jamg\'armasi', value: '45M', icon: <Award size={24} />, color: '#10B981', trend: 'UZS' },
    { label: 'O\'rtacha ball', value: '740', icon: <Target size={24} />, color: '#EC4899', trend: 'XP' },
  ];

  const participationData = [
    { name: 'Dush', count: 1200 },
    { name: 'Sesh', count: 2100 },
    { name: 'Chor', count: 1800 },
    { name: 'Pay', count: 3400 },
    { name: 'Jum', count: 2800 },
    { name: 'Shan', count: 5200 },
    { name: 'Yak', count: 4800 },
  ];

  const categoryData = [
    { name: 'Matematika', value: 45, color: '#6366f1' },
    { name: 'Mantiq', value: 30, color: '#F59E0B' },
    { name: 'IT', value: 15, color: '#10B981' },
    { name: 'Boshqa', value: 10, color: '#94a3b8' },
  ];

  return (
    <div className="contests-analytics-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Olimpiadalar Analitikasi</h1>
          <p>Musobaqalar faolligi va natijalar monitoringi</p>
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
            <h3>Haftalik ishtirokchilar faolligi</h3>
          </div>
          <div className="main-chart">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={participationData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '14px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="count" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="pie-container-p card-glass"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3>Yo'nalishlar bo'yicha taqsimot</h3>
          <div className="pie-chart-box">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((c, i) => (
                <div key={i} className="legend-item">
                  <div className="l-dot" style={{ background: c.color }}></div>
                  <span>{c.name}</span>
                  <span className="l-val">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContestsAnalytics;
