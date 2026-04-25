import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Heart, Star, TrendingUp, CreditCard, 
  MessageCircle, ShieldCheck, Activity, PieChart as PieIcon, BarChart as BarIcon
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import './StudentsList.css';
import './Parents.css';

const ParentsAnalytics = () => {
  const stats = [
    { label: "Jami ota-onalar", val: "1,240 ta", icon: <Users size={24} />, color: "#6366f1", bg: "#eef2ff" },
    { label: "Ijobiy fikrlar", val: "94%", icon: <Heart size={24} />, color: "#ec4899", bg: "#fdf2f8" },
    { label: "O'rtacha reyting", val: "4.8", icon: <Star size={24} />, color: "#F59E0B", bg: "#fffbeb" },
    { label: "Jami to'lovlar", val: "45.2M", icon: <CreditCard size={24} />, color: "#10B981", bg: "#ecfdf5" }
  ];

  const pieData = [
    { name: 'Ijobiy', value: 85, color: '#10B981' },
    { name: 'Neytral', value: 10, color: '#F59E0B' },
    { name: 'Salbiy', value: 5, color: '#ef4444' }
  ];

  const growthData = [
    { n: 'Yan', v: 200 }, { n: 'Feb', v: 450 }, { n: 'Mar', v: 380 }, 
    { n: 'Apr', v: 600 }, { n: 'May', v: 850 }, { n: 'Iyun', v: 1100 }
  ];

  return (
    <div className="students-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Ota-onalar analitikasi</h1>
          <p>Foydalanuvchilar faolligi va platforma haqidagi fikrlar tahlili</p>
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
            <div className="section-title"><TrendingUp size={16} /> Ota-onalar sonining o'sish dinamikasi</div>
            <ResponsiveContainer width="100%" height={300}>
               <AreaChart data={growthData}>
                  <defs>
                     <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>

         <div className="chart-card-full card-glass" style={{flex: 1, padding: '30px'}}>
            <div className="section-title"><MessageCircle size={16} /> Fikrlar kayfiyati</div>
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
            <div className="section-title"><CreditCard size={16} /> Oylik to'lovlar tahlili</div>
            <ResponsiveContainer width="100%" height={250}>
               <BarChart data={[
                  { n: 'Yan', v: 12 }, { n: 'Feb', v: 18 }, { n: 'Mar', v: 15 }, { n: 'Apr', v: 22 }, { n: 'May', v: 28 }, { n: 'Iyun', v: 32 }
               ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none'}}
                  />
                  <Bar dataKey="v" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
               </BarChart>
            </ResponsiveContainer>
         </div>
         
         <div className="chart-card-full card-glass" style={{flex: 1, padding: '30px', background: '#f8fafc'}}>
            <div className="section-title"><ShieldCheck size={16} /> So'nggi sharhlar qisqartmasi</div>
            <div className="recent-reviews-list" style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
               {[
                  { name: "Alisher Karimov", text: "Juda yaxshi platforma!", star: 5 },
                  { name: "Zuhra Aliyeva", text: "Darslar qiziqarli o'tmoqda.", star: 4 },
                  { name: "Rustam Soliyev", text: "Professional o'qituvchilar.", star: 5 }
               ].map((r, i) => (
                  <div key={i} className="review-mini-item" style={{padding: '12px', borderBottom: '1px solid #eef2f6'}}>
                     <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                        <span style={{fontWeight: 800, fontSize: '13px'}}>{r.name}</span>
                        <div style={{display: 'flex', gap: '2px'}}>{[1,2,3,4,5].map(s => <Star key={s} size={10} fill={s <= r.star ? "#F59E0B" : "none"} color="#F59E0B" />)}</div>
                     </div>
                     <p style={{fontSize: '12px', color: '#64748b', margin: 0}}>{r.text}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ParentsAnalytics;
