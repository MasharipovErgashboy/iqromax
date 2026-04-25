import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, UserCheck, Phone, Eye, Check, X, 
  Mail, Briefcase, GraduationCap, FileText, Send, AlertTriangle, Video, Lock, User,
  ChevronRight, Download, Smartphone, CheckCircle, Info, Calendar, TrendingUp,
  MapPin, Activity, History, Star, Heart, Clock, PieChart as PieIcon, BarChart3, Award
} from 'lucide-react';
import { 
  ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from 'recharts';
import './Teachers.css';
import './StudentsList.css'; 

const TeacherApplications = () => {
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState('candidate');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  
  // Mock generated credentials
  const [credentials, setCredentials] = useState(null);

  const applications = [
    { 
      id: 1, 
      name: "Jasur Hamdamov", 
      phone: "+998 90 777 88 99", 
      email: "jasur@mail.uz",
      specialty: "Mental Arifmetika", 
      experience: "2 yil",
      cv: "rezyume_jasur.pdf",
      bio: "2 yil davomida 'Bilim' o'quv markazida dars berganman. O'quvchilar bilan ishlash tajribam katta va metodikam yangicha.",
      appliedDate: "2024-03-20"
    },
    { 
      id: 2, 
      name: "Nigora Fayziyeva", 
      phone: "+998 94 111 22 33", 
      email: "nigora@inbox.uz",
      specialty: "Tez o'qish", 
      experience: "4 yil",
      cv: "nigora_cv.docx",
      bio: "Maktabgacha ta'lim mutaxassisiman. Bolalar bilan ishlash bo'yicha maxsus sertifikatlarga egaman.",
      appliedDate: "2024-03-22"
    }
  ];

  const filtered = applications.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (app) => {
    const login = app.name.split(' ')[0].toLowerCase() + Math.floor(100 + Math.random() * 900);
    const password = Math.random().toString(36).slice(-8);
    setCredentials({ login, password, name: app.name });
    setShowApproveModal(true);
    setSelectedApp(null); // Close detail panel if open
  };

  const handleReject = (app) => {
    setShowRejectModal(true);
    // Keep selectedApp to show who is being rejected
  };

  const confirmReject = () => {
    alert(`${selectedApp.name} arizasi bekor qilindi. Sabab: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedApp(null);
  };

  return (
    <div className="teachers-page">
      <div className="page-header">
        <div className="header-title">
          <h1>O'qituvchilikka arizalar</h1>
          <p>Yangi {filtered.length} ta ariza ko'rib chiqishni kutmoqda</p>
        </div>
      </div>

      <div className="table-controls">
        <div className="search-box card-glass">
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Nomzod ismi yoki mutaxassisligi..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper card-glass">
        <table className="data-table">
          <thead>
            <tr>
              <th>NOMZOD</th>
              <th>MUTAXASSISLIK</th>
              <th>TAJRIBA</th>
              <th>SANA</th>
              <th>AMALLAR</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={a.id}
              >
                <td>
                  <div className="user-cell">
                    <div className="avatar-mini-app"><FileText size={16} color="#6366f1" /></div>
                    <div className="user-info-cell">
                      <span className="name">{a.name}</span>
                      <span className="sub">{a.phone}</span>
                    </div>
                  </div>
                </td>
                <td><span className="specialty-badge">{a.specialty}</span></td>
                <td><span className="exp-badge">{a.experience}</span></td>
                <td><span className="date-text">{a.appliedDate}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="action-btn details-btn" onClick={() => setSelectedApp(a)}>
                      <Eye size={16} />
                    </button>
                    <button className="action-btn approve-mini" onClick={() => handleApprove(a)}><Check size={18} /></button>
                    <button className="action-btn reject-mini" onClick={() => { setSelectedApp(a); handleReject(a); }}><X size={18} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Advanced Application Detail Panel */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div className="modal-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 10000 }}>
            <div className="modal-overlay" onClick={() => setSelectedApp(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="teacher-profile-panel"
            >
              <div className="panel-header">
                <div className="header-top">
                   <div className="header-left-side">
                      <button className="close-panel-btn-p" onClick={() => setSelectedApp(null)}><X size={24} /></button>
                      <div className="student-profile-hero">
                         <div className="hero-avatar t-avatar">
                            <User size={32} color="#6366f1" />
                         </div>
                         <div className="hero-info">
                            <h2>{selectedApp.name}</h2>
                            <div className="hero-badges">
                               <span className="badge premium">{selectedApp.specialty}</span>
                               <span className="badge level">Nomzod</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="panel-tabs">
                   {[
                     { id: 'candidate', label: 'Nomzod', icon: <User size={16} /> },
                     { id: 'experience', label: 'Tajriba', icon: <Briefcase size={16} /> },
                     { id: 'assessment', label: 'Baholash', icon: <TrendingUp size={16} /> }
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
                    {activeTab === 'candidate' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="pane-row">
                             <div className="info-grid-detailed card-glass">
                                {[
                                  { label: 'Telefon', value: selectedApp.phone, icon: <Phone size={14} /> },
                                  { label: 'Email', value: selectedApp.email, icon: <Mail size={14} /> },
                                  { label: 'Mutaxassislik', value: selectedApp.specialty, icon: <Briefcase size={14} /> },
                                  { label: 'Tajriba', value: selectedApp.experience, icon: <History size={14} /> },
                                  { label: 'Ariza sanasi', value: selectedApp.appliedDate, icon: <Calendar size={14} /> },
                                  { label: 'Manzil', value: 'Toshkent shahar', icon: <MapPin size={14} /> },
                                  { label: 'Yosh', value: '28 yosh', icon: <User size={14} /> },
                                  { label: 'Status', value: 'Kutilmoqda', icon: <Clock size={14} />, isStatus: true }
                                ].map((item, i) => (
                                  <div key={i} className="info-box-m">
                                     <div className="box-icon" style={{color: '#6366f1'}}>{item.icon}</div>
                                     <div className="box-data">
                                        <label>{item.label}</label>
                                        <span className={item.isStatus ? 'status-text' : ''}>{item.value}</span>
                                     </div>
                                  </div>
                                ))}
                             </div>
                             <div className="motivation-container card-glass">
                                <div className="section-title"><GraduationCap size={14} /> Motivatsiya va maqsadlar</div>
                                <div className="motivation-quote-box">
                                   <div className="quote-mark">"</div>
                                   <p className="motivation-text-premium">{selectedApp.bio}</p>
                                   <div className="quote-mark-bottom">"</div>
                                </div>
                             </div>
                          </div>

                          <div className="section-title" style={{marginTop: '30px'}}><FileText size={16} /> Biriktirilgan hujjatlar</div>
                          <div className="cv-card-premium card-glass">
                             <div className="cv-preview-box">
                                <FileText size={32} color="#6366f1" />
                                <div className="file-badge">PDF</div>
                             </div>
                             <div className="cv-main-info">
                                <h4>{selectedApp.cv}</h4>
                                <div className="cv-meta">
                                   <span><Activity size={12} /> 2.4 MB</span>
                                   <span><Calendar size={12} /> Yuklangan: 2024-03-20</span>
                                </div>
                             </div>
                             <div className="cv-action-group-p">
                                <button className="cv-p-btn view"><Eye size={18} /> Ko'rish</button>
                                <button className="cv-p-btn download"><Download size={18} /> Yuklab olish</button>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'experience' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="pane-row">
                             <div className="chart-card-small card-glass" style={{flex: 2}}>
                                <div className="section-title"><TrendingUp size={14} /> Ish tajribasi taqsimoti (yillar)</div>
                                <ResponsiveContainer width="100%" height={300}>
                                   <BarChart data={[
                                      { name: 'Xususiy sektor', v: 2, c: '#6366f1' }, 
                                      { name: 'Davlat sektori', v: 1.5, c: '#10B981' }, 
                                      { name: 'Online', v: 3, c: '#F59E0B' }
                                   ]}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700}} />
                                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                                      <Tooltip 
                                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'}}
                                        cursor={{fill: '#f8fafc'}}
                                      />
                                      <Bar dataKey="v" radius={[10, 10, 0, 0]} barSize={50}>
                                         {[0, 1, 2].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#6366f1', '#10B981', '#F59E0B'][index]} />
                                         ))}
                                      </Bar>
                                   </BarChart>
                                </ResponsiveContainer>
                             </div>
                             <div className="achievements-column" style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                <div className="section-title"><Award size={14} /> Asosiy yutuqlar</div>
                                {[
                                   { t: 'Xalqaro sertifikat', d: 'Cambridge English C1 Advanced', i: <Award size={20} color="#F59E0B" />, b: '#fffbeb' },
                                   { t: 'Eng yaxshi o\'qituvchi', d: '2023-yil "Yil o\'qituvchisi"', i: <Star size={20} color="#6366f1" />, b: '#eef2ff' },
                                   { t: 'Metodika', d: 'Yangi "LogicMind" kursi muallifi', i: <CheckCircle size={20} color="#10B981" />, b: '#f0fdf4' }
                                ].map((ach, i) => (
                                   <div key={i} className="achievement-card-premium card-glass" style={{background: ach.b}}>
                                      <div className="ach-icon-box-p">{ach.i}</div>
                                      <div className="ach-text-p">
                                         <h5>{ach.t}</h5>
                                         <p>{ach.d}</p>
                                      </div>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'assessment' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="assessment-row-p">
                             <div className="radar-chart-box-large card-glass" style={{flex: 1}}>
                                <div className="section-title">Nomzod ko'rsatkichlari (Radar)</div>
                                <ResponsiveContainer width="100%" height={320}>
                                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                      { subject: 'Pedagogika', A: 85 }, { subject: 'Bilim', A: 95 }, 
                                      { subject: 'Muloqot', A: 90 }, { subject: 'Intizom', A: 88 }, { subject: 'Kreativlik', A: 92 }
                                   ]}>
                                      <PolarGrid stroke="#e2e8f0" />
                                      <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                                      <Radar name="Candidate" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                                      <Tooltip />
                                   </RadarChart>
                                </ResponsiveContainer>
                             </div>
                             
                             <div className="final-summary-card card-glass">
                                <div className="summary-header">
                                   <div className="summary-icon"><CheckCircle size={24} color="#10B981" /></div>
                                   <div className="summary-title-box">
                                      <h3>Yakuniy xulosa</h3>
                                      <p>HR va Metodik bo'lim xulosasi</p>
                                   </div>
                                </div>
                                <div className="summary-content-p">
                                   <p>Nomzod dars o'tish metodikasi bo'yicha yuqori natija ko'rsatdi. Muloqot qobiliyati va bolalar bilan ishlash tajribasi talab darajasida. Yakuniy tavsiya: <b>Sinov muddati bilan qabul qilish.</b></p>
                                </div>
                                <div className="summary-footer-stats">
                                   <div className="s-stat"><Star size={16} color="#F59E0B" /> <span>9.2/10 Ball</span></div>
                                   <div className="s-stat"><Heart size={16} color="#ec4899" /> <span>A+ Tavsiya</span></div>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    )}
                 </div>
              </div>

              <div className="panel-actions-app-premium">
                 <button className="p-reject-btn" onClick={() => handleReject(selectedApp)}>
                    <div className="p-btn-icon"><X size={22} /></div>
                    <div className="p-btn-text">
                       <span>Rad etish</span>
                       <small>Ariza bekor qilinadi</small>
                    </div>
                 </button>
                 <button className="p-approve-btn" onClick={() => handleApprove(selectedApp)}>
                    <div className="p-btn-text">
                       <span>Arizani Tasdiqlash</span>
                       <small>Credentiallar yaratiladi</small>
                    </div>
                    <div className="p-btn-icon"><Check size={22} /></div>
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Approve Success Modal */}
      <AnimatePresence>
        {showApproveModal && credentials && (
          <motion.div className="modal-center-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="modal-overlay" onClick={() => setShowApproveModal(false)} />
            <motion.div className="app-success-modal card-glass" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
               <div className="success-lottie-box">
                  <div className="success-circle"><Check size={40} color="#10B981" strokeWidth={3} /></div>
               </div>
               <h2>Muvaffaqiyatli tasdiqlandi!</h2>
               <p>O'qituvchi uchun tizimga kirish ma'lumotlari yaratildi.</p>
               
               <div className="creds-container">
                  <div className="cred-row">
                     <label><User size={14} /> Login</label>
                     <div className="cred-val"><code>{credentials.login}</code></div>
                  </div>
                  <div className="cred-row">
                     <label><Lock size={14} /> Parol</label>
                     <div className="cred-val"><code>{credentials.password}</code></div>
                  </div>
               </div>

               <div className="video-tutorial-card">
                  <Video size={20} color="#6366f1" />
                  <div className="v-text">
                     <h4>O'quv qo'llanma</h4>
                     <a href="#">iqromax.uz/teachers-guide</a>
                  </div>
               </div>

               <div className="kpi-policy-card">
                  <div className="kpi-header">
                     <TrendingUp size={16} color="#10B981" />
                     <h4>Moliyaviy shartlar</h4>
                  </div>
                  <p>O'qituvchi <span>50% KPI</span> asosida ishlaydi. Guruhdagi har bir o'quvchidan keladigan daromadning yarmi o'qituvchi hisobiga o'tkaziladi.</p>
               </div>

               <button className="finish-btn" onClick={() => { setShowApproveModal(false); setCredentials(null); }}>
                  Tushunarli
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div className="modal-center-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 20000 }}>
            <div className="modal-overlay" onClick={() => setShowRejectModal(false)} />
            <motion.div className="app-reject-modal card-glass" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
               <div className="reject-header-p">
                  <div className="reject-alert-icon-box">
                     <AlertTriangle size={32} color="#ef4444" />
                  </div>
                  <h2>Arizani rad etish</h2>
                  <p>Nomzodga yuboriladigan rasmiy sababni ko'rsating. Bu amalni ortga qaytarib bo'lmaydi.</p>
               </div>
               
               <div className="reject-input-wrapper">
                  <label>Rad etish sababi</label>
                  <textarea 
                     className="reject-textarea-premium"
                     placeholder="Masalan: Ish tajribasi talab darajasida emas yoki mutaxassislik mos kelmadi..."
                     value={rejectReason}
                     onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <div className="input-helper-text">
                     <Info size={12} /> Kamida 10 ta belgi yozish tavsiya etiladi
                  </div>
               </div>

               <div className="reject-modal-actions-p">
                  <button className="btn-cancel-p" onClick={() => setShowRejectModal(false)}>
                     Bekor qilish
                  </button>
                  <button 
                     className="btn-confirm-reject-p" 
                     disabled={!rejectReason || rejectReason.length < 5} 
                     onClick={confirmReject}
                  >
                     Rad etishni tasdiqlash
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherApplications;
