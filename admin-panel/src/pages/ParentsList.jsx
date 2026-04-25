import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, Mail, Phone, Eye, Edit2, Trash2, 
  User, MapPin, Calendar, Users, Heart, Star, MessageCircle, X,
  Smartphone, ShieldCheck, CreditCard, ChevronRight, TrendingUp, ChevronLeft,
  UserSquare2
} from 'lucide-react';
import './StudentsList.css';
import './Teachers.css';
import './Parents.css';

import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis
} from 'recharts';
import './StudentsList.css';
import './Teachers.css';
import './Parents.css';

const ParentsList = () => {
  const [search, setSearch] = useState('');
  const [selectedParent, setSelectedParent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const itemsPerPage = 10;

  // Mock pagination data (30 items)
  const allParents = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? "Alisher Karimov" : "Zuhra Aliyeva",
    phone: `+998 90 123 45 ${i.toString().padStart(2, '0')}`,
    email: `parent${i}@mail.uz`,
    children: i % 3 === 0 ? ["Azizbek Raimov", "Madina Karimova"] : ["Guli Aliyeva"],
    address: "Toshkent shahar",
    joined: "2024-01-10",
    totalPaid: i % 5 === 0 ? null : `${(i + 1) * 200000} so'm`,
    status: i % 4 === 0 ? "Pending" : "Active"
  }));

  const filtered = allParents.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.phone.includes(search)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="students-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Barcha ota-onalar</h1>
          <p>Tizimda {allParents.length} ta ota-ona ro'yxatdan o'tgan</p>
        </div>
      </div>

      <div className="table-controls">
        <div className="search-box card-glass">
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Ota-ona ismi yoki telefon raqami..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="table-wrapper card-glass">
        <table className="modern-data-table">
          <thead>
            <tr>
              <th>OTA-ONA</th>
              <th>FARZANDLARI</th>
              <th>TELEFON</th>
              <th>MOLIYA</th>
              <th>STATUS</th>
              <th>AMALLAR</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((p, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={p.id}
              >
                <td>
                  <div className="p-user-cell">
                    <div className="avatar-s" style={{background: '#f1f5f9', color: '#64748b'}}><User size={16} /></div>
                    <div className="user-info-cell">
                      <span className="name">{p.name}</span>
                      <span className="sub">{p.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="children-stack-premium">
                     {p.children.map((child, idx) => (
                        <div key={idx} className="child-mini-badge" title={child}>
                           {child[0]}
                        </div>
                     ))}
                     {p.children.length > 0 && <span className="child-count-text">{p.children.length} ta farzand</span>}
                  </div>
                </td>
                <td><span className="phone-text">{p.phone}</span></td>
                <td>
                   {p.totalPaid ? (
                      <span className="price-tag-p">{p.totalPaid}</span>
                   ) : (
                      <span className="price-tag-none">Hali kiritilmagan</span>
                   )}
                </td>
                <td>
                   <span className={`status-pill ${p.status.toLowerCase()}`}>
                      {p.status === 'Active' ? 'Faol' : 'Kutilmoqda'}
                   </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="action-btn view-btn" onClick={() => { setSelectedParent(p); setActiveTab('overview'); }}>
                      <Eye size={16} />
                    </button>
                    <button className="action-btn edit-btn"><Edit2 size={16} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="pagination-footer-p">
           <div className="p-range-info">
              {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filtered.length)} / {filtered.length}
           </div>
           <div className="p-nav-group">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-btn-p"
              >
                 <ChevronLeft size={16} color="#94a3b8" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                 <button 
                   key={i} 
                   className={`p-btn-p ${currentPage === i + 1 ? 'active' : ''}`}
                   onClick={() => setCurrentPage(i + 1)}
                 >
                    {i + 1}
                 </button>
              ))}
              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-btn-p"
              >
                 <ChevronRight size={16} color="#94a3b8" />
              </button>
           </div>
        </div>
      </div>

      {/* Parent Detail Panel (100% Width) */}
      <AnimatePresence>
        {selectedParent && (
          <motion.div className="modal-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ zIndex: 10000 }}>
            <div className="modal-overlay" onClick={() => setSelectedParent(null)} />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="teacher-profile-panel"
            >
              <div className="panel-header">
                <div className="header-top">
                   <div className="header-left-side">
                      <button className="close-panel-btn-p" onClick={() => setSelectedParent(null)}><X size={24} /></button>
                      <div className="student-profile-hero">
                         <div className="hero-avatar" style={{background: '#eef2ff'}}>
                            <UserSquare2 size={32} color="#6366f1" />
                         </div>
                         <div className="hero-info">
                            <h2>{selectedParent.name}</h2>
                            <div className="hero-badges">
                               <span className="badge premium">Ota-ona</span>
                               <span className="badge level">{selectedParent.joined} da qo'shilgan</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="panel-tabs">
                   {[
                     { id: 'overview', label: 'Umumiy', icon: <User size={16} /> },
                     { id: 'finance', label: 'Moliya', icon: <CreditCard size={16} /> },
                     { id: 'children', label: 'Farzandlar', icon: <Users size={16} /> }
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
                             <div className="info-grid-detailed card-glass" style={{flex: 2}}>
                                {[
                                  { label: 'Telefon', value: selectedParent.phone, icon: <Phone size={14} /> },
                                  { label: 'Email', value: selectedParent.email, icon: <Mail size={14} /> },
                                  { label: 'Manzil', value: selectedParent.address, icon: <MapPin size={14} /> },
                                  { label: 'Farzandlar soni', value: selectedParent.children.length + " ta", icon: <Users size={14} /> },
                                  { label: 'Umumiy to\'lov', value: selectedParent.totalPaid || "0 so'm", icon: <CreditCard size={14} /> },
                                  { label: 'Xavfsizlik', value: 'Tasdiqlangan', icon: <ShieldCheck size={14} />, color: '#10B981' }
                                ].map((item, i) => (
                                  <div key={i} className="info-box-m">
                                     <div className="box-icon" style={{color: item.color || '#6366f1'}}>{item.icon}</div>
                                     <div className="box-data">
                                        <label>{item.label}</label>
                                        <span>{item.value}</span>
                                     </div>
                                  </div>
                                ))}
                             </div>
                             
                             <div className="radar-chart-box-small card-glass" style={{flex: 1.2}}>
                                <div className="section-title">Farzandlar o'rtacha natijasi</div>
                                <ResponsiveContainer width="100%" height={220}>
                                   <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                                      { subject: 'Davomat', A: 95 }, { subject: 'Ball', A: 82 }, 
                                      { subject: 'Faollik', A: 90 }, { subject: 'Darslar', A: 85 }, { subject: 'Xulq', A: 98 }
                                   ]}>
                                      <PolarGrid stroke="#e2e8f0" />
                                      <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                                      <Radar name="Metrics" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
                                      <Tooltip />
                                   </RadarChart>
                                </ResponsiveContainer>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'finance' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="chart-card-full card-glass">
                             <div className="section-title"><TrendingUp size={14} /> To'lovlar tarixi</div>
                             <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={[
                                   {n: 'Yan', v: 400}, {n: 'Feb', v: 600}, {n: 'Mar', v: 500}, {n: 'Apr', v: 800}, {n: 'May', v: 750}, {n: 'Iyun', v: 900}
                                ]}>
                                   <defs>
                                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                         <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                         <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                      </linearGradient>
                                   </defs>
                                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                   <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                   <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                   <Tooltip />
                                   <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                                </AreaChart>
                             </ResponsiveContainer>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'children' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="children-grid-p">
                             {selectedParent.children.map((child, i) => (
                                <div key={i} className="child-card-premium card-glass">
                                   <div className="c-avatar-mini" style={{background: '#f0f9ff', color: '#0284c7'}}>{child[0]}</div>
                                   <div className="c-info-mini">
                                      <h5>{child}</h5>
                                      <p>ID: #102{i} • Guruh: #G45</p>
                                      <div className="mini-progress-row">
                                         <div className="p-bg"><div className="p-fill" style={{width: `${80+i*5}%`}}></div></div>
                                         <span>{80+i*5}%</span>
                                      </div>
                                   </div>
                                   <button className="c-view-btn"><ChevronRight size={16} /></button>
                                </div>
                             ))}
                          </div>
                       </motion.div>
                    )}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentsList;
