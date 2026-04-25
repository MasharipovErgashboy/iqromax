import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, UserCheck, Star, TrendingUp, BarChart3, PieChart as PieIcon, ArrowUpRight } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import './StudentsOverview.css';

const data = [
  { name: 'Yan', total: 400, premium: 240 },
  { name: 'Fev', total: 600, premium: 300 },
  { name: 'Mar', total: 800, premium: 450 },
  { name: 'Apr', total: 1248, premium: 680 },
];

const pieData = [
  { name: 'Oddiy', value: 568, color: '#6366F1' },
  { name: 'Premium', value: 680, color: '#10B981' },
];

const StudentsOverview = () => {
  return (
    <div className="students-overview">
      <div className="page-header">
        <div className="header-title">
          <h1>O'quvchilar tahlili</h1>
          <p>O'quvchilar o'sishi va faolligi bo'yicha mukammal statistika</p>
        </div>
        <div className="header-actions">
           <div className="period-selector">
              <button className="active">Hafta</button>
              <button>Oy</button>
              <button>Yil</button>
           </div>
        </div>
      </div>

      <div className="stats-grid">
        <motion.div whileHover={{ y: -5 }} className="summary-card gold">
          <div className="card-icon"><Star size={24} /></div>
          <div className="card-info">
            <h3>PREMIUM O'QUVCHILAR</h3>
            <div className="val-row">
              <span className="value">680</span>
              <span className="growth">+15%</span>
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="summary-card">
          <div className="card-icon"><Users size={24} /></div>
          <div className="card-info">
            <h3>JAMI O'QUVCHILAR</h3>
            <div className="val-row">
              <span className="value">1,248</span>
              <span className="growth">+8%</span>
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="summary-card blue">
          <div className="card-icon"><UserCheck size={24} /></div>
          <div className="card-info">
            <h3>FAOL (BUGUN)</h3>
            <div className="val-row">
              <span className="value">452</span>
              <span className="growth">+22%</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="analysis-grid">
        <div className="chart-container main-chart card-glass">
          <div className="chart-header">
            <h3>O'sish dinamikasi</h3>
            <p>Yangi va premium o'quvchilar nisbati</p>
          </div>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="total" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={40} name="Jami" />
                <Bar dataKey="premium" fill="#10B981" radius={[6, 6, 0, 0]} barSize={40} name="Premium" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container pie-chart card-glass">
          <div className="chart-header">
            <h3>Tizim taqsimoti</h3>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-legend">
            {pieData.map((item, i) => (
              <div key={i} className="legend-item">
                <div className="dot" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsOverview;
