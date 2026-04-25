import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, TrendingUp, TrendingDown, DollarSign, 
  ArrowUpRight, ArrowDownRight, CreditCard, PieChart as PieIcon,
  Calendar, Download, Filter, MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import './FinanceAnalytics.css';

const FinanceAnalytics = () => {
  const mainStats = [
    { label: 'Umumiy Kirim', value: '850,450,000', icon: <ArrowUpRight size={24} />, color: '#10B981', trend: '+15.4%', desc: 'Oylik o\'sish' },
    { label: 'Umumiy Chiqim', value: '320,120,000', icon: <ArrowDownRight size={24} />, color: '#EF4444', trend: '+8.2%', desc: 'Oylik xarajatlar' },
    { label: 'Sof Foyda', value: '530,330,000', icon: <TrendingUp size={24} />, color: '#6366f1', trend: '+22.5%', desc: 'Oylik daromad' },
    { label: 'Kutilayotgan', value: '45,000,000', icon: <CreditCard size={24} />, color: '#F59E0B', trend: '-2.1%', desc: 'To\'lov kutilmoqda' },
  ];

  const revenueData = [
    { name: 'Yan', kirim: 45, chiqim: 20 },
    { name: 'Fev', kirim: 52, chiqim: 25 },
    { name: 'Mar', kirim: 48, chiqim: 22 },
    { name: 'Apr', kirim: 70, chiqim: 30 },
    { name: 'May', kirim: 65, chiqim: 28 },
    { name: 'Iyun', kirim: 85, chiqim: 35 },
    { name: 'Iyul', kirim: 95, chiqim: 40 },
  ];

  const sourceData = [
    { name: 'Kurslar', value: 65, color: '#6366f1' },
    { name: 'Olimpiadalar', value: 20, color: '#F59E0B' },
    { name: 'Kitoblar', value: 10, color: '#10B981' },
    { name: 'Boshqa', value: 5, color: '#94a3b8' },
  ];

  return (
    <div className="finance-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Moliya Analitikasi</h1>
          <p>Markaziy moliya boshqaruvi va hisobotlar tizimi</p>
        </div>
        <div className="header-actions">
           <button className="export-btn"><Download size={18} /> Excelga eksport</button>
           <button className="filter-btn-m"><Filter size={18} /> Davr: Shu oy</button>
        </div>
      </div>

      <div className="stats-grid-m">
        {mainStats.map((s, i) => (
          <motion.div 
            key={i} 
            className="f-stat-card card-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="f-stat-top">
              <div className="f-icon-box" style={{ background: `${s.color}15`, color: s.color }}>
                {s.icon}
              </div>
              <div className={`f-trend ${s.trend.startsWith('+') ? 'up' : 'down'}`}>
                {s.trend}
              </div>
            </div>
            <div className="f-stat-info">
              <span className="f-label">{s.label}</span>
              <h2 className="f-value">{s.value} <small>UZS</small></h2>
              <p className="f-desc">{s.desc}</p>
            </div>
            <div className="f-card-bg-icon">
              {s.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="finance-grid-main">
        <motion.div 
          className="main-revenue-chart card-glass"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="c-header-m">
            <div className="c-title-box">
              <h3>Daromad va Xarajat dinamikasi</h3>
              <p>Oylar kesimidagi moliyaviy o'sish</p>
            </div>
            <div className="chart-legend-m">
              <div className="l-item"><span className="dot k"></span> Kirim</div>
              <div className="l-item"><span className="dot c"></span> Chiqim</div>
            </div>
          </div>
          <div className="chart-body-m">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorKirim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorChiqim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="kirim" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorKirim)" />
                <Area type="monotone" dataKey="chiqim" stroke="#ef4444" strokeWidth={4} fillOpacity={1} fill="url(#colorChiqim)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="finance-side-grid">
           <motion.div 
            className="pie-chart-card card-glass"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
           >
              <h3>Daromad manbalari</h3>
              <div className="pie-box-m">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-labels-m">
                   {sourceData.map((s, i) => (
                     <div key={i} className="pl-item">
                        <span className="pl-dot" style={{ background: s.color }}></span>
                        <span className="pl-name">{s.name}</span>
                        <span className="pl-val">{s.value}%</span>
                     </div>
                   ))}
                </div>
              </div>
           </motion.div>

           <motion.div 
            className="recent-transactions card-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
           >
              <div className="rt-header">
                <h3>So'nggi amallar</h3>
                <button className="view-all-btn">Hammasi</button>
              </div>
              <div className="rt-list">
                 <div className="rt-item">
                    <div className="rt-icon"><ArrowUpRight size={16} /></div>
                    <div className="rt-info">
                       <div className="rt-title">Kurs to'lovi #5421</div>
                       <div className="rt-date">Bugun, 14:20</div>
                    </div>
                    <div className="rt-amount up">+450,000</div>
                 </div>
                 <div className="rt-item">
                    <div className="rt-icon out"><ArrowDownRight size={16} /></div>
                    <div className="rt-info">
                       <div className="rt-title">Ofis ijara to'lovi</div>
                       <div className="rt-date">Kecha, 10:00</div>
                    </div>
                    <div className="rt-amount down">-12,000,000</div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAnalytics;
