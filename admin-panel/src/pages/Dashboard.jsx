import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  Trophy, 
  TrendingUp,
  TrendingDown,
  LineChart as ChartIcon,
  User as UserIcon,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Mon', value: 2500 },
  { name: 'Tue', value: 1800 },
  { name: 'Wed', value: 3500 },
  { name: 'Thu', value: 9500 },
  { name: 'Fri', value: 4500 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4200 },
];

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother finish
      const easedProgress = 1 - Math.pow(1 - percentage, 3);
      
      const nextCount = Math.floor(easedProgress * end);
      setCount(nextCount);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const StatCard = ({ title, value, trend, icon: Icon, color, isUp, numericValue }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="stat-card"
  >
    <div className="stat-header">
      <div className="stat-icon" style={{ backgroundColor: `${color}15`, color: color }}>
        <Icon size={24} />
      </div>
      <div className={`trend ${isUp ? 'up' : 'down'}`}>
        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{trend}%</span>
      </div>
    </div>
    <div className="stat-body">
      <h3>{title}</h3>
      <p className="stat-value">
        <CountUp end={numericValue} />
      </p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const userRole = 'super_admin';

  const adminLogs = [
    { admin: "Admin Ali", action: "Yangi kurs qo'shdi", target: "Mental Arifmetika Lvl 2", time: "10 min oldin" },
    { admin: "Admin Vali", action: "O'quvchi ma'lumotini o'zgartirdi", target: "Akmal Saidov", time: "1 soat oldin" },
    { admin: "Admin G'ani", action: "Imtihon yaratdi", target: "Final Test 2024", time: "3 soat oldin" },
  ];

  const recentActivity = [
    { name: "O'quvchi 1", action: 'Kirdi', time: '2 min oldin', color: '#10B981', initial: 'A' },
    { name: "O'quvchi 2", action: 'Kirdi', time: '4 min oldin', color: '#6366F1', initial: 'B' },
    { name: "O'quvchi 3", action: 'Kirdi', time: '6 min oldin', color: '#F59E0B', initial: 'C' },
    { name: "O'quvchi 4", action: 'Kirdi', time: '8 min oldin', color: '#EC4899', initial: 'D' },
  ];

  return (
    <div className="dashboard-content">
      <section className="welcome-section">
        <div className="welcome-title">
          <h1>Xush kelibsiz, Admin!</h1>
          <p>Bugungi platforma ko'rsatkichlari bilan tanishing.</p>
        </div>
        <button className="report-btn">
          <TrendingUp size={18} />
          <span>Hisobotni ko'rish</span>
        </button>
      </section>

      {/* 1. Stats Grid (Animated) */}
      <div className="stats-grid">
        <StatCard title="UMUMIY O'QUVCHILAR" numericValue={1248} trend="12.5" icon={Users} color="#6366F1" isUp={true} />
        <StatCard title="O'QITUVCHILAR" numericValue={42} trend="4.2" icon={UserCheck} color="#10B981" isUp={true} />
        <StatCard title="FAOL KURSLAR" numericValue={18} trend="2.1" icon={BookOpen} color="#F59E0B" isUp={false} />
        <StatCard title="OLIMPIADALAR" numericValue={5} trend="15.0" icon={Trophy} color="#8B5CF6" isUp={true} />
      </div>

      {/* 2. Activity Chart (Cleaned Up) */}
      <div className="main-chart-row">
        <div className="chart-card hero-chart">
          <div className="card-header-clean">
            <div className="filter-wrapper">
               <Calendar size={16} color="#94a3b8" />
               <select className="time-filter-modern">
                 <option>Oxirgi 7 kun</option>
                 <option>Oxirgi 30 kun</option>
               </select>
            </div>
          </div>
          
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="list-card">
          <div className="card-header">
            <div className="card-title">
              <h2>Yaqinda qo'shilganlar</h2>
            </div>
          </div>

          <div className="activity-list">
            {recentActivity.map((user, idx) => (
              <div key={idx} className="activity-item">
                <div className="activity-avatar" style={{ backgroundColor: `${user.color}15`, color: user.color }}>
                  {user.initial}
                </div>
                <div className="activity-info">
                  <h4>{user.name}</h4>
                  <p>{user.action} • {user.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="news-section-inline">
           <div className="card-header">
              <div className="card-title">
                <h2>Xabarnomalar</h2>
              </div>
           </div>
           <div className="news-grid-vertical">
              {[
                { title: "Yangi dars yuklandi", date: "Bugun", color: "#10B981" },
                { title: "Olimpiada e'lon qilindi", date: "Kecha", color: "#8B5CF6" }
              ].map((news, i) => (
                <div key={i} className="mini-news-card">
                   <div className="news-dot" style={{ backgroundColor: news.color }} />
                   <div className="news-content-mini">
                      <h4>{news.title}</h4>
                      <span>{news.date}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {userRole === 'super_admin' && (
        <section className="logs-section">
          <div className="card-header">
            <div className="card-title">
              <h2>Adminlar o'zgarishlari</h2>
              <p>Barcha adminlar faoliyati tarixi</p>
            </div>
          </div>
          <div className="logs-table-wrapper card-glass">
             <table className="logs-table">
                <thead>
                   <tr>
                      <th>Admin</th>
                      <th>Harakat</th>
                      <th>Obyekt</th>
                      <th>Vaqt</th>
                   </tr>
                </thead>
                <tbody>
                   {adminLogs.map((log, i) => (
                      <tr key={i}>
                         <td>
                            <div className="admin-pill">
                               <UserIcon size={14} />
                               <span>{log.admin}</span>
                            </div>
                         </td>
                         <td>{log.action}</td>
                         <td className="target-text">{log.target}</td>
                         <td className="time-text">{log.time}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
