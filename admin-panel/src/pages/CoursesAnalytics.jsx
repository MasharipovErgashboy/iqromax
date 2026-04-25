import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Users, DollarSign, TrendingUp, 
  Award, Star, Activity, PieChart as PieIcon, BarChart as BarIcon,
  PlayCircle, CheckCircle, Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import './StudentsList.css';
import './Teachers.css';

const CoursesAnalytics = () => {
  const stats = [
    { label: "Jami kurslar", val: "24 ta", icon: <BookOpen size={24} />, color: "#6366f1", bg: "#eef2ff" },
    { label: "O'quvchilar", val: "1,850 ta", icon: <Users size={24} />, color: "#10B981", bg: "#ecfdf5" },
    { label: "Oylik tushum", val: "84.5M", icon: <DollarSign size={24} />, color: "#F59E0B", bg: "#fffbeb" },
    { label: "O'rtacha davomat", val: "88%", icon: <Activity size={24} />, color: "#0ea5e9", bg: "#f0f9ff" }
  ];

  const categoryData = [
    { name: 'Mantiq', value: 35, color: '#6366f1' },
    { name: 'Matematika', value: 45, color: '#10B981' },
    { name: 'Tillar', value: 25, color: '#F59E0B' },
    { name: 'San\'at', value: 15, color: '#ec4899' }
  ];

  const enrollmentData = [
    { n: 'Yan', v: 120 }, { n: 'Feb', v: 210 }, { n: 'Mar', v: 180 }, 
    { n: 'Apr', v: 340 }, { n: 'May', v: 450 }, { n: 'Iyun', v: 620 }
  ];

  return (
    <div className="students-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Kurslar analitikasi</h1>
          <p>Kurslar o'zlashtirilishi va moliyaviy natijalar tahlili</p>
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
            <div className="section-title"><TrendingUp size={16} /> Kurslarga yozilish dinamikasi</div>
            <ResponsiveContainer width="100%" height={300}>
               <AreaChart data={enrollmentData}>
                  <defs>
                     <linearGradient id="colorEnr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEnr)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         <div className="chart-card-full card-glass" style={{flex: 1, padding: '30px'}}>
            <div className="section-title"><PieIcon size={16} /> Kategoriyalar taqsimoti</div>
            <ResponsiveContainer width="100%" height={300}>
               <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
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
            <div className="section-title"><BarIcon size={16} /> Kurslarni yakunlash darajasi (%)</div>
            <ResponsiveContainer width="100%" height={250}>
               <BarChart data={[
                  { n: 'Mantiq', v: 92 }, { n: 'Matem', v: 85 }, { n: 'Ingliz', v: 78 }, { n: 'IT', v: 65 }
               ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none'}}
                  />
                  <Bar dataKey="v" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
               </BarChart>
            </ResponsiveContainer>
         </div>
         
         <div className="chart-card-full card-glass" style={{flex: 1, padding: '30px', background: '#1e293b', color: 'white'}}>
            <div className="section-title" style={{color: 'rgba(255,255,255,0.6)'}}><Star size={16} /> Eng mashhur kurslar</div>
            <div className="top-teachers-list" style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
               {[
                  { name: "Mental Arifmetika 1", views: "1.2k", rate: "4.9" },
                  { name: "Karra jadvali", views: "850", rate: "4.8" },
                  { name: "Robototexnika", views: "640", rate: "4.7" }
               ].map((c, i) => (
                  <div key={i} className="top-t-item" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px'}}>
                     <div className="t-info">
                        <div style={{fontWeight: 800, fontSize: '14px'}}>{c.name}</div>
                        <div style={{fontSize: '11px', opacity: 0.6}}><PlayCircle size={10} style={{display: 'inline', marginRight: '4px'}} /> {c.views} ko'rishlar</div>
                     </div>
                     <div style={{display: 'flex', alignItems: 'center', gap: '5px', color: '#F59E0B', fontWeight: 900}}>
                        <Star size={14} fill="#F59E0B" /> {c.rate}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CoursesAnalytics;
