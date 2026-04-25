import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, User, Phone, Eye, Edit, Trash2, X, 
  BookOpen, Calendar, UserCheck, Info, ChevronLeft, ChevronRight, 
  Download, CheckCircle, Save, Smartphone, Heart, Zap, TrendingUp,
  History, CreditCard, PlayCircle, GraduationCap, ShieldCheck, Mail, MapPin, Briefcase, Activity, PieChart as PieIcon, Award, Trophy
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import './StudentsList.css';

const generateStudents = () => {
  const names = ["Asilbek Mansurov", "Madina Bahromova", "Javohir Orifov", "Gulnoza Karimova", "Sirojiddin Akramov", "Dilshod To'rayev", "Kamola Ergasheva", "Bobur Mirzo", "Malika Aminova", "Sardor Salimov"];
  const levels = ["1-Lvl", "2-Lvl", "3-Lvl", "4-Lvl", "5-Lvl"];
  const list = [];
  
  for (let i = 1; i <= 60; i++) {
    const isPremium = i % 2 === 0;
    const name = names[i % names.length] + " " + (i > 10 ? i : '');
    list.push({
      id: i,
      name: name,
      phone: `+998 90 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 89)} ${Math.floor(10 + Math.random() * 89)}`,
      level: levels[Math.floor(Math.random() * levels.length)],
      joined: `2024-0${Math.floor(Math.random() * 4) + 1}-${Math.floor(Math.random() * 25) + 1}`,
      isPremium: isPremium,
      parent: { name: "Ergashboy Masharipov", phone: "+998 90 000 00 00", relation: i % 3 === 0 ? "Onasi" : "Otasi" },
      courses: {
        premium: isPremium ? [
          { name: "Mental Arifmetika Pro", teacher: "Sardor Azimov", days: "Du, Chor, Jum", time: "15:00" }
        ] : [],
        free: [
          { name: "Kirish Kursi", teacher: "Tizim", days: "Istalgan vaqt", time: "24/7" }
        ]
      },
      certificates: isPremium ? [
        { id: 101, title: "Mental Arifmetika - 1 daraja", date: "2024-01-20" },
        { id: 102, title: "Mantiqiy fikrlash", date: "2024-02-10" }
      ] : [],
      xp: Math.floor(Math.random() * 5000),
      status: "Active"
    });
  }
  return list;
};

const StudentsList = ({ type = 'all' }) => {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [canEdit, setCanEdit] = useState(false);
  const itemsPerPage = 10;
  
  const allStudents = useMemo(() => generateStudents(), []);

  const filtered = allStudents.filter(s => {
    const matchesSearch = (s.name || '').toLowerCase().includes(search.toLowerCase()) || (s.phone || '').includes(search);
    if (type === 'premium') return matchesSearch && s.isPremium;
    if (type === 'regular') return matchesSearch && !s.isPremium;
    return matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = filtered.slice(startIndex, startIndex + itemsPerPage);

  const getTitle = () => {
    if (type === 'premium') return "Premium O'quvchilar";
    if (type === 'regular') return "Oddiy O'quvchilar";
    return "Barcha o'quvchilar";
  };

  const handleOpenDetail = (student) => {
    setSelectedStudent(student);
    setIsEditing(false);
    setCanEdit(false);
    setActiveTab('overview');
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setIsEditing(false);
    setCanEdit(true);
    setActiveTab('overview');
  };

  return (
    <div className="students-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>{getTitle()}</h1>
          <p>{filtered.length} ta o'quvchi topildi</p>
        </div>
      </div>

      <div className="table-controls">
        <div className="search-box card-glass">
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Ism yoki telefon orqali qidirish..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="table-wrapper card-glass">
        <table className="students-table">
          <thead>
            <tr>
              <th>F.I.SH</th>
              <th>TELEFON RAQAMI</th>
              <th>DARAJA</th>
              <th>PROFIL</th>
              <th>STATUS</th>
              <th>AMALLAR</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((s, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={s.id}
                  className={s.isPremium ? 'premium-row' : ''}
                >
                <td>
                  <div className="student-cell">
                    <div className="avatar-mini">
                       {s.isPremium ? <Star size={14} color="#F59E0B" fill="#F59E0B" /> : <User size={14} color="#94a3b8" />}
                    </div>
                    <span>{s.name}</span>
                  </div>
                </td>
                <td className="phone-cell">
                   <Phone size={14} color="#94a3b8" />
                   {s.phone}
                </td>
                <td><span className="lvl-badge">{s.level}</span></td>
                <td>
                   <button className="batafsil-btn" onClick={() => handleOpenDetail(s)}>
                      <Eye size={14} />
                      <span>Batafsil</span>
                   </button>
                </td>
                <td>
                  <span className={`status-pill ${s.isPremium ? 'premium' : 'regular'}`}>
                    {s.isPremium ? 'Premium' : 'Oddiy'}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                     <button className="action-btn edit" onClick={() => handleOpenEdit(s)}><Edit size={16} /></button>
                     <button className="action-btn delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-wrapper">
           <div className="pagination-info">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filtered.length)} / {filtered.length}
           </div>
           <div className="pagination-btns">
              <button className="pag-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><ChevronLeft size={18} /></button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} className={`pag-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="pag-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><ChevronRight size={18} /></button>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedStudent && (
          <motion.div className="modal-container" key="modal-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="modal-overlay" onClick={() => setSelectedStudent(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="student-detail-panel"
            >
              <div className="panel-header">
                <div className="header-top">
                   <div className="header-left-side">
                      <button className="close-panel-btn-p" onClick={() => setSelectedStudent(null)}><X size={24} /></button>
                      <div className="student-profile-hero">
                         <div className="hero-avatar">
                            {selectedStudent.isPremium ? <Zap size={32} color="#F59E0B" fill="#F59E0B" /> : <User size={32} color="#94a3b8" />}
                         </div>
                         <div className="hero-info">
                            {isEditing ? <input className="edit-input name" defaultValue={selectedStudent.name} /> : <h2>{selectedStudent.name}</h2>}
                            <div className="hero-badges">
                               <span className={`badge ${selectedStudent.isPremium ? 'premium' : 'regular'}`}>{selectedStudent.isPremium ? 'Premium Plan' : 'Oddiy Plan'}</span>
                               <span className="badge level">{selectedStudent.level}</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="header-actions">
                      {canEdit && (
                        <button className={`action-btn-p ${isEditing ? 'save' : ''}`} onClick={() => setIsEditing(!isEditing)}>
                          {isEditing ? <><Save size={18} /> Saqlash</> : <><Edit size={18} /> Tahrirlash</>}
                        </button>
                      )}
                   </div>
                </div>

                <div className="panel-tabs">
                   {[
                     { id: 'overview', label: 'Umumiy', icon: <Info size={16} /> },
                     { id: 'parents', label: 'Ota-onasi', icon: <Heart size={16} /> },
                     { id: 'courses', label: 'Kurslari', icon: <BookOpen size={16} /> },
                     { id: 'subscriptions', label: 'Obunalar', icon: <Smartphone size={16} /> },
                     { id: 'progress', label: 'Darajasi', icon: <TrendingUp size={16} /> }
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
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div 
                      key="overview"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      className="tab-pane-full"
                    >
                       <div className="pane-row">
                          <div className="pane-col-info">
                             <div className="section-title">Shaxsiy ma'lumotlar</div>
                             <div className="info-grid-detailed card-glass">
                                {[
                                  { label: 'Telefon', value: selectedStudent.phone, icon: <Phone size={14} />, key: 'phone' },
                                  { label: 'A\'zolik', value: selectedStudent.joined, icon: <Calendar size={14} />, readonly: true },
                                  { label: 'ID', value: `#${selectedStudent.id + 1000}`, icon: <ShieldCheck size={14} />, readonly: true },
                                  { label: 'Email', value: 'o-quvchi@mail.uz', icon: <Mail size={14} />, key: 'email' },
                                  { label: 'Manzil', value: 'Toshkent sh., Yunusobod', icon: <MapPin size={14} />, key: 'address' },
                                  { label: 'Tug\'ilgan sana', value: '2015-05-12', icon: <Calendar size={14} />, key: 'birth' },
                                  { label: 'Darslar', value: '24 ta tugallangan', icon: <BookOpen size={14} />, readonly: true },
                                  { label: 'Status', value: 'Aktiv', icon: <CheckCircle size={14} />, isStatus: true, readonly: true }
                                ].map((item, i) => (
                                  <div key={i} className="info-box-m">
                                     <div className="box-icon">{item.icon}</div>
                                     <div className="box-data">
                                        <label>{item.label}</label>
                                        {isEditing && !item.readonly ? (
                                           <input className="edit-input-s" defaultValue={item.value} />
                                        ) : (
                                           <span className={item.isStatus ? 'status-text active' : ''}>{item.value}</span>
                                        )}
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                          <div className="pane-col-chart">
                             <div className="section-title">Haftalik Faollik (XP)</div>
                             <div className="chart-card-small card-glass">
                                <ResponsiveContainer width="100%" height={250}>
                                   <AreaChart data={[
                                      { name: 'Du', xp: 400 }, { name: 'Se', xp: 700 }, { name: 'Cho', xp: 500 }, 
                                      { name: 'Pa', xp: 900 }, { name: 'Ju', xp: 600 }, { name: 'Sha', xp: 1200 }, { name: 'Yak', xp: 300 }
                                   ]}>
                                      <defs>
                                         <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                         </linearGradient>
                                      </defs>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} />
                                      <Area type="monotone" dataKey="xp" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                                   </AreaChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'parents' && (
                    <motion.div 
                      key="parents"
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      className="tab-pane-full"
                    >
                       <div className="section-title">Ota-onasi / Vasiylar Ma'lumotlari</div>
                       <div className="table-card-premium card-glass">
                          <table className="modern-data-table">
                             <thead>
                                <tr>
                                   <th>F.I.SH</th>
                                   <th>MUNOSABAT</th>
                                   <th>TELEFON</th>
                                   <th>KASBI / ISH JOYI</th>
                                   <th>OXIRGI BOG'LANISH</th>
                                </tr>
                             </thead>
                             <tbody>
                                {[
                                   { name: selectedStudent.parent.name, rel: selectedStudent.parent.relation, phone: selectedStudent.parent.phone, job: 'Tadbirkor, IT Park', last: '2024-03-25' },
                                   { name: 'Malika Mansurova', rel: 'Onasi', phone: '+998 90 111 22 33', job: 'O\'qituvchi, 144-maktab', last: '2024-03-10' }
                                ].map((p, i) => (
                                   <tr key={i}>
                                      <td>
                                         <div className="p-user-cell">
                                            <div className="avatar-s">{p.name.charAt(0)}</div>
                                            {isEditing ? <input className="edit-input-s" defaultValue={p.name} /> : <span>{p.name}</span>}
                                         </div>
                                      </td>
                                      <td>
                                         {isEditing ? (
                                            <select className="edit-select-s" defaultValue={p.rel}>
                                               <option>Otasi</option>
                                               <option>Onasi</option>
                                            </select>
                                         ) : (
                                            <span className={`rel-badge ${p.rel === 'Otasi' ? 'blue' : 'pink'}`}>{p.rel}</span>
                                         )}
                                      </td>
                                      <td>{isEditing ? <input className="edit-input-s" defaultValue={p.phone} /> : <b>{p.phone}</b>}</td>
                                      <td>{isEditing ? <input className="edit-input-s" defaultValue={p.job} /> : p.job}</td>
                                      <td><span className="last-seen-text">{p.last}</span></td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'courses' && (
                    <motion.div 
                      key="courses"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      className="tab-pane-full"
                    >
                       <div className="courses-analytics-row">
                          <div className="c-table-side">
                             <div className="section-title">Kurslar va Davomat Analitikasi</div>
                             <div className="table-card-premium card-glass">
                                <table className="modern-data-table">
                                   <thead>
                                      <tr>
                                         <th>KURS NOMI</th>
                                         <th>O'QITUVCHI</th>
                                         <th>PROGRESS</th>
                                         <th>DAVOMAT</th>
                                         <th>BAHO</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      {[
                                         { name: 'Mental Arifmetika Pro', teacher: 'Sardor Azimov', progress: 75, attend: '92%', grade: 'A+' },
                                         { name: 'Mantiqiy Fikrlash', teacher: 'Guli Aliyeva', progress: 40, attend: '85%', grade: 'B' },
                                         { name: 'Tez o\'qish', teacher: 'Tizim', progress: 100, attend: '100%', grade: 'S' }
                                      ].map((c, i) => (
                                         <tr key={i}>
                                            <td><b>{c.name}</b></td>
                                            <td>{c.teacher}</td>
                                            <td>
                                               <div className="progress-mini-bar">
                                                  <div className="p-bar-fill" style={{ width: `${c.progress}%`, background: c.progress > 80 ? '#10B981' : '#6366F1' }} />
                                                  <span>{c.progress}%</span>
                                               </div>
                                            </td>
                                            <td><span className="attend-val">{c.attend}</span></td>
                                            <td><span className={`grade-badge ${c.grade}`}>{c.grade}</span></td>
                                         </tr>
                                      ))}
                                   </tbody>
                                </table>
                             </div>
                          </div>
                          <div className="c-chart-side">
                             <div className="section-title">O'zlashtirish Balansi</div>
                             <div className="chart-card-small card-glass">
                                <ResponsiveContainer width="100%" height={300}>
                                   <PieChart>
                                      <Pie data={[
                                         { name: 'Mental', value: 40, color: '#10B981' },
                                         { name: 'Mantiq', value: 30, color: '#6366F1' },
                                         { name: 'Xotira', value: 30, color: '#F59E0B' }
                                      ]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                         {[{c: '#10B981'}, {c: '#6366F1'}, {c: '#F59E0B'}].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.c} />
                                         ))}
                                      </Pie>
                                      <Tooltip />
                                   </PieChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'subscriptions' && (
                    <motion.div 
                      key="subscriptions"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      className="tab-pane-full"
                    >
                       <div className="section-title">Joriy Obuna</div>
                       <div className="subscription-hero-card card-glass">
                          <div className="sub-main-info">
                             <div className="sub-icon-box"><Zap size={40} color="#F59E0B" fill="#F59E0B" /></div>
                             <div className="sub-text">
                                <h3>{selectedStudent.isPremium ? 'Premium Plan' : 'Oddiy Plan'}</h3>
                                <p>Barcha imkoniyatlar ochiq • 2024-12-31 gacha amal qiladi</p>
                             </div>
                          </div>
                          <div className="sub-price-tag">
                             <span>150,000 so'm</span>
                             <label>Oylik to'lov</label>
                          </div>
                       </div>

                       <div className="section-title">To'lovlar va Obunalar Tarixi</div>
                       <div className="table-card-premium card-glass">
                          <table className="modern-data-table">
                             <thead>
                                <tr>
                                   <th>SANA</th>
                                   <th>TO'LOV TURI</th>
                                   <th>SUMMA</th>
                                   <th>PLAN</th>
                                   <th>TRANZAKSIYA ID</th>
                                   <th>STATUS</th>
                                </tr>
                             </thead>
                             <tbody>
                                {[
                                   { date: '2024-03-01', type: 'Click', amount: '150,000', plan: 'Premium', tid: 'TX_98231', status: 'Muvaffaqiyatli' },
                                   { date: '2024-02-01', type: 'Payme', amount: '150,000', plan: 'Premium', tid: 'TX_88122', status: 'Muvaffaqiyatli' },
                                   { date: '2024-01-01', type: 'Naqd', amount: '150,000', plan: 'Premium', tid: 'CS_00129', status: 'Muvaffaqiyatli' }
                                ].map((h, i) => (
                                   <tr key={i}>
                                      <td>{h.date}</td>
                                      <td><div className="p-type-pill"><CreditCard size={14} /> {h.type}</div></td>
                                      <td><b>{h.amount} so'm</b></td>
                                      <td><span className="plan-pill">{h.plan}</span></td>
                                      <td><code>{h.tid}</code></td>
                                      <td><span className="status-badge success">{h.status}</span></td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </motion.div>
                  )}

                  {activeTab === 'progress' && (
                    <motion.div 
                      key="progress"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      className="tab-pane-full"
                    >
                       <div className="progress-dashboard-advanced">
                          <div className="radar-chart-box-large card-glass">
                             <div className="section-title">Ko'nikmalar Analizi</div>
                             <ResponsiveContainer width="100%" height={350}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                   { subject: 'Hisoblash', A: 120, fullMark: 150 },
                                   { subject: 'Mantiq', A: 98, fullMark: 150 },
                                   { subject: 'Xotira', A: 86, fullMark: 150 },
                                   { subject: 'Tezlik', A: 99, fullMark: 150 },
                                   { subject: 'Diqqat', A: 85, fullMark: 150 },
                                   { subject: 'Ijodkorlik', A: 110, fullMark: 150 }
                                ]}>
                                   <PolarGrid stroke="#e2e8f0" />
                                   <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                                   <Radar name="Student" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                                   <Tooltip />
                                </RadarChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="progress-stats-vertical">
                             <div className="section-title">Batafsil Statistika</div>
                             <div className="metrics-grid-modern">
                                <div className="metric-card-m card-glass">
                                   <Activity size={24} color="#6366F1" />
                                   <div className="m-info">
                                      <div className="m-val">124</div>
                                      <label>O'ynalgan o'yinlar</label>
                                   </div>
                                </div>
                                <div className="metric-card-m card-glass">
                                   <PlayCircle size={24} color="#10B981" />
                                   <div className="m-info">
                                      <div className="m-val">48.5 soat</div>
                                      <label>Ilovadagi umumiy vaqt</label>
                                   </div>
                                </div>
                                <div className="metric-card-m card-glass">
                                   <Trophy size={24} color="#F59E0B" />
                                   <div className="m-info">
                                      <div className="m-val">{selectedStudent.xp}</div>
                                      <label>To'plangan XP ballar</label>
                                   </div>
                                </div>
                                <div className="metric-card-m card-glass">
                                   <Award size={24} color="#ef4444" />
                                   <div className="m-info">
                                      <div className="m-val">{selectedStudent.certificates.length} ta</div>
                                      <label>Sertifikatlar soni</label>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentsList;
