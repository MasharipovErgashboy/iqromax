import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, UserCheck, Star, Phone, Eye, Edit, Trash2, X, 
  BookOpen, Award, Calendar, Users, Info, Mail, Briefcase, GraduationCap,
  TrendingUp, Wallet, ChevronRight, Clock, Target, ShieldCheck, User, Send,
  MessageSquare, BellRing, Sparkles, CheckCircle, PieChart as PieIcon, Activity, MapPin, History, BarChart3, CreditCard, Heart
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, BarChart, Bar
} from 'recharts';
import './Teachers.css';
import './StudentsList.css'; // Reuse some layout styles

const TeachersActive = () => {
  const [search, setSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedNestedStudent, setSelectedNestedStudent] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStudentTab, setActiveStudentTab] = useState('overview');
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [message, setMessage] = useState('');

  const teachers = [
    { 
      id: 1, 
      name: "Sardor Azimov", 
      phone: "+998 90 123 45 67", 
      specialty: "Mental Arifmetika Pro", 
      experience: "5 yil",
      studentsCount: 145,
      rating: 4.9,
      email: "sardor@iqromax.uz",
      joined: "2023-05-12",
      status: "Active",
      earnings: "12,400,000",
      groups: 8,
      bio: "Mental arifmetika bo'yicha xalqaro darajadagi trener. 1000 dan ortiq shogirdlar tayyorlagan va ko'plab olimpiada g'oliblarini yetishtirgan.",
      activeCourses: ["Mental Arifmetika (Boshlang'ich)", "Abacus Master", "Tezkor Hisoblash"],
      assignedStudents: [
        { id: 101, name: "Azizbek Raimov", joined: "2024-01-10", phone: "+998 99 111 22 33", status: "Active" },
        { id: 102, name: "Madina Karimoava", joined: "2024-02-15", phone: "+998 99 444 55 66", status: "Active" },
        { id: 103, name: "Jasur Soliyev", joined: "2024-03-01", phone: "+998 97 777 88 99", status: "Pending" },
        { id: 104, name: "Laylo Ahmedova", joined: "2024-03-05", phone: "+998 93 222 33 44", status: "Active" },
        { id: 105, name: "Bobur Mirzo", joined: "2024-03-10", phone: "+998 90 000 11 22", status: "Active" },
      ]
    },
    { 
      id: 2, 
      name: "Guli Aliyeva", 
      phone: "+998 93 555 11 22", 
      specialty: "Tez o'qish va Xotira", 
      experience: "3 yil",
      studentsCount: 82,
      rating: 4.8,
      email: "guli@iqromax.uz",
      joined: "2023-08-20",
      status: "Active",
      earnings: "7,800,000",
      groups: 5,
      bio: "Bolalar bilan ishlash bo'yicha psixolog va tez o'qish mutaxassisi. Bolalarda xotirani rivojlantirish bo'yicha o'z metodikasiga ega.",
      activeCourses: ["Tez o'qish", "Mantiqiy fikrlash"],
      assignedStudents: [
        { id: 201, name: "Otabek G'aniyev", joined: "2024-02-10", phone: "+998 91 123 45 67", status: "Active" },
        { id: 202, name: "Zuhra Akramova", joined: "2024-02-20", phone: "+998 94 999 88 77", status: "Active" },
      ]
    }
  ];

  const filtered = teachers.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = () => {
    alert(`Xabar yuborildi: ${message}`);
    setShowMsgModal(false);
    setMessage('');
  };

  return (
    <div className="teachers-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Faol o'qituvchilar</h1>
          <p>Tizimda <span>{filtered.length} ta</span> professional ustozlar faoliyat yuritmoqda</p>
        </div>
        <div className="header-actions">
           <button className="add-teacher-btn">
              <UserCheck size={18} />
              <span>Yangi o'qituvchi</span>
           </button>
        </div>
      </div>

      <div className="table-controls">
        <div className="search-box card-glass">
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Ism, telefon yoki mutaxassislik..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="filter-btn-modern">
          <Filter size={18} />
          <span>Saralash</span>
        </button>
      </div>

      <div className="table-wrapper card-glass">
        <table className="data-table">
          <thead>
            <tr>
              <th>O'QITUVCHI</th>
              <th>SOHASI</th>
              <th>REYTING</th>
              <th>O'QUVCHILAR</th>
              <th>DAROMAD</th>
              <th>STATUS</th>
              <th>AMALLAR</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={t.id}
              >
                <td>
                  <div className="user-cell">
                    <div className="avatar-circle-green">{t.name.charAt(0)}</div>
                    <div className="user-info-cell">
                      <span className="name">{t.name}</span>
                      <span className="sub">{t.phone}</span>
                    </div>
                  </div>
                </td>
                <td><span className="specialty-badge-modern">{t.specialty}</span></td>
                <td>
                  <div className="rating-pill">
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span>{t.rating}</span>
                  </div>
                </td>
                <td>
                  <div className="student-count-cell">
                    <Users size={16} />
                    <span>{t.studentsCount}</span>
                  </div>
                </td>
                <td><span className="earnings-text">{t.earnings} so'm</span></td>
                <td>
                  <div className="status-indicator">
                    <div className="pulse-dot" />
                    <span>{t.status}</span>
                  </div>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="action-btn view-btn" onClick={() => { setSelectedTeacher(t); setActiveTab('overview'); }}><Eye size={16} /></button>
                    <button className="action-btn edit-btn"><Edit size={16} /></button>
                    <button className="action-btn delete-btn"><Trash2 size={16} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Advanced Teacher Profile Panel */}
      <AnimatePresence>
        {selectedTeacher && (
          <motion.div className="modal-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 10000 }}>
            <div className="modal-overlay" onClick={() => setSelectedTeacher(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="teacher-profile-panel"
            >
              <div className="panel-header">
                <div className="header-top">
                   <div className="header-left-side">
                      <button className="close-panel-btn-p" onClick={() => setSelectedTeacher(null)}><X size={24} /></button>
                      <div className="student-profile-hero">
                         <div className="hero-avatar t-avatar">
                            <User size={32} color="#10B981" />
                         </div>
                         <div className="hero-info">
                            <h2>{selectedTeacher.name}</h2>
                            <div className="hero-badges">
                               <span className="badge premium">{selectedTeacher.specialty}</span>
                               <span className="badge level">{selectedTeacher.experience} Tajriba</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="header-actions">
                      <button className="action-btn-p">
                        <MessageSquare size={18} /> Xabar
                      </button>
                   </div>
                </div>

                <div className="panel-tabs">
                   {[
                     { id: 'overview', label: 'Umumiy', icon: <Info size={16} /> },
                     { id: 'students', label: 'O\'quvchilar', icon: <Users size={16} /> },
                     { id: 'courses', label: 'Kurslar', icon: <BookOpen size={16} /> },
                     { id: 'finance', label: 'Moliya', icon: <Wallet size={16} /> },
                     { id: 'performance', label: 'Reyting', icon: <Award size={16} /> }
                   ].map(tab => (
                      <button 
                        key={tab.id} 
                        className={`p-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                   ))}
                </div>
              </div>

              <div className="panel-body">
                 <div className="tab-pane-full">
                    {activeTab === 'overview' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="pane-row">
                             <div className="info-grid-detailed card-glass">
                                {[
                                  { label: 'Telefon', value: selectedTeacher.phone, icon: <Phone size={14} /> },
                                  { label: 'Mutaxassislik', value: selectedTeacher.specialty, icon: <Briefcase size={14} /> },
                                  { label: 'Tajriba', value: selectedTeacher.experience, icon: <Award size={14} /> },
                                  { label: 'Email', value: selectedTeacher.email, icon: <Mail size={14} /> },
                                  { label: 'Qo\'shilgan', value: selectedTeacher.joined, icon: <Calendar size={14} /> },
                                  { label: 'Guruhlar', value: `${selectedTeacher.groups} ta faol guruh`, icon: <Users size={14} /> },
                                  { label: 'KPI', value: '50%', icon: <Activity size={14} /> },
                                  { label: 'Status', value: 'Faol', icon: <CheckCircle size={14} />, isStatus: true }
                                ].map((item, i) => (
                                  <div key={i} className="info-box-m">
                                     <div className="box-icon" style={{color: '#10B981'}}>{item.icon}</div>
                                     <div className="box-data">
                                        <label>{item.label}</label>
                                        <span className={item.isStatus ? 'status-text active' : ''}>{item.value}</span>
                                     </div>
                                  </div>
                                ))}
                             </div>
                             
                             <div className="chart-card-small card-glass">
                                <div className="section-title"><TrendingUp size={14} /> Daromad dinamikasi (oylik)</div>
                                <ResponsiveContainer width="100%" height={220}>
                                   <AreaChart data={[
                                      { name: 'Jan', val: 8.2 }, { name: 'Feb', val: 9.5 }, { name: 'Mar', val: 12.4 }
                                   ]}>
                                      <defs>
                                        <linearGradient id="colorEar" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                        </linearGradient>
                                      </defs>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                      <Tooltip />
                                      <Area type="monotone" dataKey="val" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEar)" />
                                   </AreaChart>
                                </ResponsiveContainer>
                             </div>
                          </div>

                          <div className="p-bio-box-premium card-glass">
                             <div className="section-title"><Info size={14} /> Bio ma'lumotlar</div>
                             <p>{selectedTeacher.bio}</p>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'students' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="table-card-premium card-glass">
                             <table className="modern-data-table">
                                <thead>
                                   <tr>
                                      <th>O'QUVCHI</th>
                                      <th>SANA</th>
                                      <th>PROGRESS</th>
                                      <th>HOLAT</th>
                                      <th>AMAL</th>
                                   </tr>
                                </thead>
                                <tbody>
                                   {selectedTeacher.assignedStudents.map((s, i) => (
                                      <tr key={i}>
                                         <td>
                                            <div className="p-user-cell">
                                               <div className="avatar-s" style={{background: '#ecfdf5', color: '#10B981'}}>{s.name.charAt(0)}</div>
                                               <div>
                                                  <span className="s-name">{s.name}</span>
                                                  <span className="s-phone" style={{fontSize: '11px', color: '#94a3b8', display: 'block'}}>{s.phone}</span>
                                               </div>
                                            </div>
                                         </td>
                                         <td>{s.joined}</td>
                                         <td>
                                            <div className="progress-mini-bar">
                                               <div className="p-bar-bg" style={{height: '6px', background: '#f1f5f9', borderRadius: '10px', flex: 1}}>
                                                  <div className="p-bar-fill" style={{width: `${Math.floor(Math.random()*40 + 60)}%`, background: '#10B981', height: '100%'}} />
                                               </div>
                                               <span>{Math.floor(Math.random()*40 + 60)}%</span>
                                            </div>
                                         </td>
                                         <td><span className={`status-badge ${s.status === 'Active' ? 'success' : ''}`}>{s.status}</span></td>
                                         <td><button className="action-btn view-btn" onClick={() => { setSelectedNestedStudent(s); setActiveStudentTab('overview'); }}><Eye size={14} /></button></td>
                                      </tr>
                                   ))}
                                </tbody>
                             </table>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'courses' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="courses-analytics-row">
                             <div className="table-card-premium card-glass">
                                <table className="modern-data-table">
                                   <thead>
                                      <tr>
                                         <th>KURS NOMI</th>
                                         <th>GURUHLAR</th>
                                         <th>O'QUVCHILAR</th>
                                         <th>KPI</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      {selectedTeacher.activeCourses.map((c, i) => (
                                         <tr key={i}>
                                            <td>
                                               <div className="p-type-pill" style={{gap: '12px'}}>
                                                  <div className="c-icon-s" style={{background: '#ecfdf5', padding: '8px', borderRadius: '10px'}}><BookOpen size={14} color="#10B981" /></div>
                                                  <span style={{fontWeight: 850}}>{c}</span>
                                               </div>
                                            </td>
                                            <td>
                                               <button 
                                                 className="group-link-btn" 
                                                 onClick={() => setSelectedGroup({ name: `${c} - Group #${i+1}`, students: 12, course: c })}
                                               >
                                                  {Math.floor(Math.random()*3 + 1)} ta
                                               </button>
                                            </td>
                                            <td>{Math.floor(Math.random()*20 + 10)} ta</td>
                                            <td><span className="grade-badge S">50%</span></td>
                                         </tr>
                                      ))}
                                   </tbody>
                                </table>
                             </div>
                             <div className="chart-card-small card-glass">
                                <div className="section-title">Fanlar nisbati</div>
                                <ResponsiveContainer width="100%" height={220}>
                                   <PieChart>
                                      <Pie 
                                        data={[{name: 'A', value: 400}, {name: 'B', value: 300}, {name: 'C', value: 300}]} 
                                        innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                                      >
                                         <Cell fill="#10B981" />
                                         <Cell fill="#3b82f6" />
                                         <Cell fill="#f59e0b" />
                                      </Pie>
                                      <Tooltip />
                                   </PieChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'finance' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="subscription-hero-card" style={{background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)'}}>
                             <div className="sub-main-info">
                                <div className="sub-icon-box"><Wallet size={32} color="#10B981" /></div>
                                <div className="sub-text">
                                   <h3>Daromad balansi</h3>
                                   <p>Oxirgi marta 1-Aprelda to'langan</p>
                                </div>
                             </div>
                             <div className="sub-price-tag">
                                <span>{selectedTeacher.earnings} so'm</span>
                                <label>Joriy oydagi sof daromad</label>
                             </div>
                          </div>

                          <div className="section-title">To'lovlar tarixi</div>
                          <div className="table-card-premium card-glass">
                             <table className="modern-data-table">
                                <thead>
                                   <tr>
                                      <th>SANA</th>
                                      <th>TRANZAKSIYA ID</th>
                                      <th>MIQDOR</th>
                                      <th>TUR</th>
                                      <th>HOLAT</th>
                                   </tr>
                                </thead>
                                <tbody>
                                   {[1,2,3].map(i => (
                                      <tr key={i}>
                                         <td className="p-date">2024-0{4-i}-01</td>
                                         <td><span className="plan-pill">#TXN-{7324+i}</span></td>
                                         <td className="p-amount">{selectedTeacher.earnings} so'm</td>
                                         <td><span className="p-type-pill"><CreditCard size={14} /> Oylik</span></td>
                                         <td><span className="status-badge success">To'landi</span></td>
                                      </tr>
                                   ))}
                                </tbody>
                             </table>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'performance' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="progress-dashboard-advanced">
                             <div className="radar-chart-box-large card-glass">
                                <div className="section-title">Mahorat darajasi (Analytics)</div>
                                <ResponsiveContainer width="100%" height={350}>
                                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                      { subject: 'Pedagogika', A: 120, fullMark: 150 },
                                      { subject: 'Bilim', A: 98, fullMark: 150 },
                                      { subject: 'Muloqot', A: 86, fullMark: 150 },
                                      { subject: 'Intizom', A: 99, fullMark: 150 },
                                      { subject: 'Mas\'uliyat', A: 85, fullMark: 150 }
                                   ]}>
                                      <PolarGrid stroke="#e2e8f0" />
                                      <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                                      <Radar name="Teacher" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                                      <Tooltip />
                                   </RadarChart>
                                </ResponsiveContainer>
                             </div>

                             <div className="metrics-grid-modern">
                                {[
                                  { label: 'O\'rtacha Reyting', val: selectedTeacher.rating, icon: <Star size={20} color="#F59E0B" /> },
                                  { label: 'Dars soatlari', val: '124 soat', icon: <Clock size={20} color="#3b82f6" /> },
                                  { label: 'O\'tilgan darslar', val: '48 ta', icon: <BookOpen size={20} color="#10B981" /> },
                                  { label: 'Ota-onalar fikri', val: '98%', icon: <Heart size={20} color="#ec4899" /> }
                                ].map((m, i) => (
                                  <div key={i} className="metric-card-m card-glass">
                                     <div className="m-icon-box" style={{background: '#f8fafc', padding: '12px', borderRadius: '14px'}}>{m.icon}</div>
                                     <div className="m-info">
                                        <div className="m-val">{m.val}</div>
                                        <label>{m.label}</label>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </motion.div>
                    )}
                 </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nested Student Detail Panel */}
      <AnimatePresence>
        {selectedNestedStudent && (
          <motion.div className="modal-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 11000 }}>
            <div className="modal-overlay" onClick={() => setSelectedNestedStudent(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="student-detail-panel"
            >
              <div className="panel-header">
                <div className="header-top">
                   <div className="header-left-side">
                      <button className="close-panel-btn-p" onClick={() => setSelectedNestedStudent(null)}><X size={24} /></button>
                      <div className="student-profile-hero">
                         <div className="hero-avatar">
                            <User size={32} color="#94a3b8" />
                         </div>
                         <div className="hero-info">
                            <h2>{selectedNestedStudent.name}</h2>
                            <div className="hero-badges">
                               <span className="badge regular">O'quvchi</span>
                               <span className="badge level">Faol</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="panel-tabs">
                   {[
                     { id: 'overview', label: 'Umumiy', icon: <Info size={16} /> },
                     { id: 'parent', label: 'Ota-onasi', icon: <Users size={16} /> },
                     { id: 'courses', label: 'Kurslari', icon: <BookOpen size={16} /> },
                     { id: 'subscription', label: 'Obunalar', icon: <CreditCard size={16} /> },
                     { id: 'progress', label: 'Darajasi', icon: <Award size={16} /> }
                   ].map(tab => (
                      <button 
                        key={tab.id} 
                        className={`p-tab-btn ${activeStudentTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveStudentTab(tab.id)}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                   ))}
                </div>
              </div>

              <div className="panel-body">
                 <div className="tab-pane-full">
                    {activeStudentTab === 'overview' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="pane-row">
                             <div className="info-grid-detailed card-glass">
                                {[
                                  { label: 'Telefon', value: selectedNestedStudent.phone, icon: <Phone size={14} /> },
                                  { label: 'ID', value: `#${selectedNestedStudent.id + 1000}`, icon: <ShieldCheck size={14} /> },
                                  { label: 'A\'zolik', value: selectedNestedStudent.joined || '2024-01-10', icon: <Calendar size={14} /> },
                                  { label: 'Email', value: 'o-quvchi@mail.uz', icon: <Mail size={14} /> },
                                  { label: 'Manzil', value: 'Toshkent sh., Yunusobod', icon: <MapPin size={14} /> },
                                  { label: 'Status', value: 'Aktiv', icon: <CheckCircle size={14} />, isStatus: true }
                                ].map((item, i) => (
                                  <div key={i} className="info-box-m">
                                     <div className="box-icon" style={{color: '#10B981'}}>{item.icon}</div>
                                     <div className="box-data">
                                        <label>{item.label}</label>
                                        <span className={item.isStatus ? 'status-text active' : ''}>{item.value}</span>
                                     </div>
                                  </div>
                                ))}
                             </div>
                             <div className="chart-card-small card-glass">
                                <div className="section-title"><Activity size={14} /> Haftalik faollik</div>
                                <ResponsiveContainer width="100%" height={220}>
                                   <AreaChart data={[{n: 'Du', v: 40}, {n: 'Se', v: 70}, {n: 'Ch', v: 50}, {n: 'Pa', v: 90}, {n: 'Ju', v: 60}]}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                      <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                      <Tooltip />
                                      <Area type="monotone" dataKey="v" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={3} />
                                   </AreaChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {activeStudentTab === 'parent' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="table-card-premium card-glass">
                             <table className="modern-data-table">
                                <thead>
                                   <tr><th>VASIY (OTA-ONA)</th><th>MUNOSABAT</th><th>TELEFON</th><th>ISH JOYI</th></tr>
                                </thead>
                                <tbody>
                                   <tr>
                                      <td>
                                         <div className="p-user-cell">
                                            <div className="avatar-s" style={{background: '#eff6ff', color: '#3b82f6'}}>O</div>
                                            <span>Otabek Mansurov</span>
                                         </div>
                                      </td>
                                      <td><span className="rel-badge blue">Otasi</span></td>
                                      <td><b>+998 90 999 00 11</b></td>
                                      <td>Tadbirkor</td>
                                   </tr>
                                </tbody>
                             </table>
                          </div>
                       </motion.div>
                    )}

                    {activeStudentTab === 'courses' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="courses-analytics-row">
                             <div className="table-card-premium card-glass">
                                <table className="modern-data-table">
                                   <thead><tr><th>KURS NOMI</th><th>PROGRESS</th><th>KPI</th></tr></thead>
                                   <tbody>
                                      <tr>
                                         <td><div className="p-type-pill"><BookOpen size={14} /> Mental Arifmetika</div></td>
                                         <td>
                                            <div className="progress-mini-bar">
                                               <div className="p-bar-bg" style={{height: '6px', background: '#f1f5f9', borderRadius: '10px', flex: 1}}>
                                                  <div className="p-bar-fill" style={{width: '75%', background: '#10B981', height: '100%'}} />
                                               </div>
                                               <span>75%</span>
                                            </div>
                                         </td>
                                         <td><span className="grade-badge S">50%</span></td>
                                      </tr>
                                   </tbody>
                                </table>
                             </div>
                             <div className="chart-card-small card-glass">
                                <div className="section-title">Fanlar nisbati</div>
                                <ResponsiveContainer width="100%" height={200}>
                                   <PieChart>
                                      <Pie data={[{n: 'A', v: 400}, {n: 'B', v: 300}]} innerRadius={50} outerRadius={70} dataKey="v">
                                         <Cell fill="#10B981" /><Cell fill="#3b82f6" />
                                      </Pie>
                                      <Tooltip />
                                   </PieChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {activeStudentTab === 'subscription' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="subscription-hero-card" style={{background: '#1e293b'}}>
                             <div className="sub-main-info">
                                <div className="sub-icon-box"><CreditCard size={32} color="#10B981" /></div>
                                <div className="sub-text"><h3>Premium Plan</h3><p>Muddati: 2024-12-31 gacha</p></div>
                             </div>
                             <div className="sub-price-tag"><span>450,000 so'm</span><label>Oylik to'lov</label></div>
                          </div>
                       </motion.div>
                    )}

                    {activeStudentTab === 'progress' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="progress-dashboard-advanced">
                             <div className="radar-chart-box-large card-glass">
                                <div className="section-title">Mahorat darajasi</div>
                                <ResponsiveContainer width="100%" height={300}>
                                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                      { subject: 'Mantiq', A: 120 }, { subject: 'Hisob', A: 98 }, { subject: 'Xotira', A: 86 }, { subject: 'Tezlik', A: 99 }
                                   ]}>
                                      <PolarGrid stroke="#e2e8f0" />
                                      <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10}} />
                                      <Radar name="Student" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                                   </RadarChart>
                                </ResponsiveContainer>
                             </div>
                             <div className="metrics-grid-modern">
                                <div className="metric-card-m card-glass">
                                   <div className="m-info"><div className="m-val">1,240 XP</div><label>Umumiy ochko</label></div>
                                </div>
                                <div className="metric-card-m card-glass">
                                   <div className="m-info"><div className="m-val">12 ta</div><label>Sertifikatlar</label></div>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    )}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Group Detail Panel (100% Width) */}
      <AnimatePresence>
        {selectedGroup && (
          <motion.div className="modal-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 12000 }}>
            <div className="modal-overlay" onClick={() => setSelectedGroup(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="group-detail-panel"
            >
              <div className="panel-header">
                <div className="header-top">
                   <div className="header-left-side">
                      <button className="close-panel-btn-p" onClick={() => setSelectedGroup(null)}><X size={24} /></button>
                      <div className="student-profile-hero">
                         <div className="hero-avatar g-avatar">
                            <Users size={32} color="#10B981" />
                         </div>
                         <div className="hero-info">
                            <h2>{selectedGroup.name}</h2>
                            <div className="hero-badges">
                               <span className="badge premium">{selectedGroup.course}</span>
                               <span className="badge level">{selectedGroup.students} ta o'quvchi</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="panel-body">
                 <div className="tab-pane-full">
                    <div className="pane-row">
                       <div className="metrics-grid-modern card-glass" style={{flex: 1, gridTemplateColumns: 'repeat(3, 1fr)'}}>
                          {[
                            { label: 'O\'rtacha Davomat', val: '94%', icon: <Calendar size={20} color="#10B981" /> },
                            { label: 'O\'rtacha Ball', val: '82.5', icon: <Star size={20} color="#F59E0B" /> },
                            { label: 'Darslar soni', val: '24 / 48', icon: <BookOpen size={20} color="#3b82f6" /> }
                          ].map((m, i) => (
                            <div key={i} className="metric-card-m" style={{background: 'white', border: '1px solid #f1f5f9'}}>
                               <div className="m-icon-box">{m.icon}</div>
                               <div className="m-info">
                                  <div className="m-val">{m.val}</div>
                                  <label>{m.label}</label>
                               </div>
                            </div>
                          ))}
                       </div>

                       <div className="chart-card-small card-glass">
                          <div className="section-title"><BarChart3 size={14} /> Davomat trendi (haftalik)</div>
                          <ResponsiveContainer width="100%" height={220}>
                             <BarChart data={[
                                {n: 'Du', v: 90}, {n: 'Se', v: 95}, {n: 'Ch', v: 88}, {n: 'Pa', v: 92}, {n: 'Ju', v: 96}, {n: 'Sha', v: 85}
                             ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                <Tooltip />
                                <Bar dataKey="v" fill="#10B981" radius={[4, 4, 0, 0]} />
                             </BarChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    <div className="pane-row" style={{marginTop: '30px'}}>
                       <div className="table-card-premium card-glass" style={{flex: 2}}>
                          <div className="section-title"><Users size={14} /> Guruh o'quvchilari</div>
                          <table className="modern-data-table">
                             <thead>
                                <tr><th>O'QUVCHI</th><th>PROGRESS</th><th>KPI</th><th>AMAL</th></tr>
                             </thead>
                             <tbody>
                                {[1,2,3,4,5,6,7,8].map(i => (
                                   <tr key={i}>
                                      <td>
                                         <div className="p-user-cell">
                                            <div className="avatar-s" style={{background: '#f0f9ff', color: '#0284c7'}}>{String.fromCharCode(64+i)}</div>
                                            <span>O'quvchi #{100+i}</span>
                                         </div>
                                      </td>
                                      <td>
                                         <div className="progress-mini-bar">
                                            <div className="p-bar-bg" style={{height: '6px', background: '#f1f5f9', borderRadius: '10px', flex: 1}}>
                                               <div className="p-bar-fill" style={{width: `${85-i*2}%`, background: '#10B981', height: '100%'}} />
                                            </div>
                                            <span>{85-i*2}%</span>
                                         </div>
                                      </td>
                                      <td><span className="grade-badge S">50%</span></td>
                                      <td>
                                         <button 
                                           className="action-btn view-btn" 
                                           onClick={() => {
                                             setSelectedNestedStudent({ id: i+100, name: `O'quvchi #${i+100}`, phone: '+998 90 123 45 67' });
                                             setActiveStudentTab('overview');
                                             setSelectedGroup(null);
                                           }}
                                         >
                                            <Eye size={14} />
                                         </button>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>

                       <div className="chart-card-small card-glass">
                          <div className="section-title">O'zlashtirish tahlili</div>
                          <ResponsiveContainer width="100%" height={250}>
                             <PieChart>
                                <Pie 
                                  data={[{name: 'Zo\'r', v: 45}, {name: 'Yaxshi', v: 35}, {name: 'Qoniqarli', v: 20}]} 
                                  innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="v"
                                >
                                   <Cell fill="#10B981" />
                                   <Cell fill="#3b82f6" />
                                   <Cell fill="#f59e0b" />
                                </Pie>
                                <Tooltip />
                             </PieChart>
                          </ResponsiveContainer>
                          <div className="chart-legend-custom">
                             <div className="l-item"><span style={{background: '#10B981'}}></span> 85-100%</div>
                             <div className="l-item"><span style={{background: '#3b82f6'}}></span> 70-85%</div>
                             <div className="l-item"><span style={{background: '#f59e0b'}}></span> 50-70%</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeachersActive;
