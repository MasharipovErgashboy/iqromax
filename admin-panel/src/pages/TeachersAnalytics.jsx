import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, MessageSquare, Clock, TrendingUp, 
  Award, Star, Activity, PieChart as PieIcon, BarChart as BarIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import './StudentsList.css';
import './Teachers.css';

const TeachersAnalytics = () => {
  const stats = [
    { label: "Jami o'qituvchilar", val: "48 ta", icon: <Users size={24} />, color: "#6366f1", bg: "#eef2ff" },
    { label: "Faol o'qituvchilar", val: "42 ta", icon: <UserCheck size={24} />, color: "#10B981", bg: "#ecfdf5" },
    { label: "Yangi arizalar", val: "12 ta", icon: <Activity size={24} />, color: "#F59E0B", bg: "#fffbeb" },
    { label: "Bugungi chatlar", val: "156 ta", icon: <MessageSquare size={24} />, color: "#0ea5e9", bg: "#f0f9ff" }
  ];

  const pieData = [
    { name: 'Senior', value: 15, color: '#6366f1' },
    { name: 'Middle', value: 20, color: '#10B981' },
    { name: 'Junior', value: 13, color: '#F59E0B' }
  ];

  const trendData = [
    { n: 'Dush', v: 45 }, { n: 'Sesh', v: 52 }, { n: 'Chor', v: 48 }, 
    { n: 'Pay', v: 61 }, { n: 'Jum', v: 55 }, { n: 'Shan', v: 67 }, { n: 'Yak', v: 40 }
  ];

  return (
    <div className="students-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>O'qituvchilar analitikasi</h1>
          <p>O'qituvchilar faoliyati va arizalar bo'yicha umumiy hisobot</p>
        </div>
      </div>

      <div className="stats-grid-p" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px'}}>
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card-premium card-glass"
            style={{padding: '25px', display: 'flex', alignItems: 'center', gap: '20px'}}
          >
            <div className="s-icon-box" style={{background: s.bg, color: s.color, width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               {s.icon}
            </div>
            <div className="s-info">
               <label style={{fontSize: '13px', color: '#64748b', fontWeight: 600}}>{s.label}</label>
               <h2 style={{fontSize: '24px', fontWeight: 900, color: '#1e293b', margin: '5px 0 0 0'}}>{s.val}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pane-row" style={{display: 'flex', gap: '25px', marginBottom: '25px'}}>
         <div className="chart-card-full card-glass" style={{flex: 2, padding: '30px'}}>
            <div className="section-title"><TrendingUp size={16} /> Haftalik dars o'tish faolligi</div>
            <ResponsiveContainer width="100%" height={300}>
               <AreaChart data={trendData}>
                  <defs>
                     <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAct)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         <div className="chart-card-full card-glass" style={{flex: 1, padding: '30px'}}>
            <div className="section-title"><PieIcon size={16} /> Darajalar taqsimoti</div>
            <ResponsiveContainer width="100%" height={300}>
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
                  <Legend verticalAlign="bottom" height={36}/>
               </PieChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="pane-row" style={{display: 'flex', gap: '25px'}}>
         <div className="chart-card-full card-glass" style={{flex: 1, padding: '30px'}}>
            <div className="section-title"><BarIcon size={16} /> Fanlar bo'yicha talab</div>
            <ResponsiveContainer width="100%" height={250}>
               <BarChart data={[
                  { n: 'Matematika', v: 45 }, { n: 'Ingliz tili', v: 38 }, { n: 'Rus tili', v: 32 }, { n: 'Dasturlash', v: 55 }
               ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none'}}
                  />
                  <Bar dataKey="v" fill="#10B981" radius={[8, 8, 0, 0]} barSize={40} />
               </BarChart>
            </ResponsiveContainer>
         </div>
         
         <div className="chart-card-full card-glass" style={{flex: 1, padding: '30px', background: '#1e293b', color: 'white'}}>
            <div className="section-title" style={{color: 'rgba(255,255,255,0.6)'}}><Award size={16} /> Eng yaxshi o'qituvchilar</div>
            <div className="top-teachers-list" style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
               {[
                  { name: "Sardor Azimov", rate: "4.9", sub: "Mental Arifmetika" },
                  { name: "Guli Aliyeva", rate: "4.8", sub: "Tez o'qish" },
                  { name: "Jasur Hamdamov", rate: "4.7", sub: "Logika" }
               ].map((t, i) => (
                  <div key={i} className="top-t-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px'}}>
                     <div className="t-info">
                        <div style={{fontWeight: 800, fontSize: '14px'}}>{t.name}</div>
                        <div style={{fontSize: '11px', opacity: 0.6}}>{t.sub}</div>
                     </div>
                     <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#F59E0B', fontWeight: 900}}>
                        <Star size={14} fill="#F59E0B" /> {t.rate}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default TeachersAnalytics;
