import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, Calendar, 
  Clock, User, BookOpen, Users,
  Trash2, Edit3, Eye, MoreVertical,
  Play, CheckCircle2, AlertCircle, X, Save, Video
} from 'lucide-react';
import './LiveList.css';

const LiveList = () => {
  const [sessions, setSessions] = useState([
    { id: 1, topic: "Abakusda qo'shish sirlari", group: "Guruh: A1", teacher: "Aziz Raimov", date: "2024-04-26", time: "18:30", duration: "60 min", status: "upcoming", students: 24, link: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, topic: "Python: Funksiyalar bilan ishlash", group: "Guruh: IT-2", teacher: "Madina Karimova", date: "2024-04-26", time: "19:00", duration: "90 min", status: "live", students: 18, link: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [viewingLive, setViewingLive] = useState(null);

  const handleOpenEdit = (session) => {
    setSelectedSession(session);
    setIsAdding(false);
  };

  const handleOpenAdd = () => {
    setIsAdding(true);
    setSelectedSession(null);
  };

  return (
    <div className="live-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Jonli Darslar Jadvali</h1>
          <p>Tizimda {sessions.length} ta dars rejalashtirilgan</p>
        </div>
        <div className="header-actions">
           <button className="action-btn-p primary" onClick={handleOpenAdd}>
              <Plus size={18} /> Yangi dars qo'shish
           </button>
        </div>
      </div>

      <div className="table-controls">
         <div className="search-box-p">
            <Search size={18} />
            <input type="text" placeholder="Mavzu yoki o'qituvchi bo'yicha qidirish..." />
         </div>
         <button className="filter-btn-p"><Filter size={18} /> Saralash</button>
      </div>

      <div className="table-wrapper-p card-glass">
         <table className="premium-table-p">
            <thead>
               <tr>
                  <th>MAVZU VA GURUH</th>
                  <th>O'QITUVCHI</th>
                  <th>SANA VA VAQT</th>
                  <th>DAVOMIYLIGI</th>
                  <th>O'QUVCHILAR</th>
                  <th>STATUS</th>
                  <th>AMALLAR</th>
               </tr>
            </thead>
            <tbody>
               {sessions.map(session => (
                  <tr key={session.id}>
                     <td>
                        <div className="session-info-cell">
                           <div className="s-icon-box-m" style={{ background: session.status === 'live' ? '#fef2f2' : '#f8fafc' }}>
                              <Video size={18} color={session.status === 'live' ? '#ef4444' : '#64748b'} />
                           </div>
                           <div className="s-text-info">
                              <div className="s-topic">{session.topic}</div>
                              <div className="s-group">{session.group}</div>
                           </div>
                        </div>
                     </td>
                     <td>
                        <div className="teacher-cell">
                           <div className="t-avatar-s">{session.teacher[0]}</div>
                           <span>{session.teacher}</span>
                        </div>
                     </td>
                     <td>
                        <div className="date-time-cell">
                           <div className="d-val"><Calendar size={14} /> {session.date}</div>
                           <div className="t-val"><Clock size={14} /> {session.time}</div>
                        </div>
                     </td>
                     <td className="duration-cell">{session.duration}</td>
                     <td>
                        <div className="students-cell-p">
                           <Users size={14} />
                           <span>{session.students}</span>
                        </div>
                     </td>
                     <td>
                        <span className={`status-badge-p ${session.status}`}>
                           {session.status === 'live' && <><div className="pulse-mini"></div> Live</>}
                           {session.status === 'upcoming' && 'Kutilmoqda'}
                           {session.status === 'finished' && 'Yakunlangan'}
                        </span>
                     </td>
                     <td>
                        <div className="action-btns-p">
                           {session.status === 'live' ? (
                             <button className="icon-btn-p view live" onClick={() => setViewingLive(session)} title="Darsga kirish"><Eye size={16} /></button>
                           ) : (
                             <>
                               <button className="icon-btn-p edit" onClick={() => handleOpenEdit(session)}><Edit3 size={16} /></button>
                               <button className="icon-btn-p delete" onClick={() => setSessions(sessions.filter(s => s.id !== session.id))}><Trash2 size={16} /></button>
                             </>
                           )}
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      <AnimatePresence>
        {(selectedSession || isAdding) && (
          <motion.div 
            className="detail-panel-full live-edit-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="panel-header-p">
              <div className="p-header-left">
                <button className="p-close-btn" onClick={() => { setSelectedSession(null); setIsAdding(false); }}><X size={24} /></button>
                <div className="p-title-box">
                  <div className="p-tag">{isAdding ? 'NEW SESSION' : 'EDIT MODE'}</div>
                  <h2>{isAdding ? 'Yangi jonli dars' : 'Darsni tahrirlash'}</h2>
                </div>
              </div>
              <div className="p-header-actions">
                <button className="p-action-btn cancel-text" onClick={() => { setSelectedSession(null); setIsAdding(false); }}>Bekor qilish</button>
                <button className="p-action-btn save-premium">
                  <Save size={18} /> {isAdding ? 'Rejalashtirish' : 'Saqlash'}
                </button>
              </div>
            </div>

            <div className="panel-body-p">
              <div className="live-form-modern">
                <div className="form-column">
                  <div className="form-card card-glass">
                    <div className="card-head">
                      <BookOpen size={20} />
                      <h3>Asosiy ma'lumotlar</h3>
                    </div>
                    <div className="input-field">
                      <label>Dars mavzusi</label>
                      <input type="text" placeholder="Dars mavzusini kiriting..." defaultValue={selectedSession?.topic} />
                    </div>
                    <div className="grid-2">
                      <div className="input-field">
                        <label>Guruh nomi</label>
                        <input type="text" placeholder="Masalan: Guruh: A1" defaultValue={selectedSession?.group} />
                      </div>
                      <div className="input-field">
                        <label>O'qituvchi</label>
                        <input type="text" placeholder="O'qituvchi ismini tanlang" defaultValue={selectedSession?.teacher} />
                      </div>
                    </div>
                  </div>

                  <div className="form-card card-glass">
                    <div className="card-head">
                      <Calendar size={20} />
                      <h3>Vaqt va Davomiylik</h3>
                    </div>
                    <div className="grid-3">
                      <div className="input-field">
                        <label>Sana</label>
                        <input type="date" defaultValue={selectedSession?.date} />
                      </div>
                      <div className="input-field">
                        <label>Boshlanish vaqti</label>
                        <input type="time" defaultValue={selectedSession?.time} />
                      </div>
                      <div className="input-field">
                        <label>Davomiyligi (daq)</label>
                        <input type="number" placeholder="60" defaultValue={selectedSession?.duration.replace(' min', '')} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-card card-glass highlight">
                    <div className="card-head">
                      <Video size={20} />
                      <h3>Streaming Sozlamalari</h3>
                    </div>
                    <div className="input-field">
                      <label>Zoom/Meeting Havolasi</label>
                      <input type="text" className="link-input" placeholder="https://zoom.us/j/..." defaultValue={selectedSession?.link} />
                    </div>
                    <div className="link-note">
                      <AlertCircle size={14} />
                      <span>O'quvchilar ushbu havola orqali darsga kirishadi</span>
                    </div>
                  </div>

                  <div className="preview-mini card-glass">
                    <div className="p-status">
                      <div className="p-dot"></div>
                      Preview Ready
                    </div>
                    <div className="p-content">
                       <Play size={32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewingLive && (
          <motion.div 
            className="live-preview-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="live-preview-container card-glass">
              <div className="lp-header">
                <div className="lp-left">
                  <div className="lp-live-tag"><div className="pulse"></div> LIVE</div>
                  <div className="lp-title">
                    <h3>{viewingLive.topic}</h3>
                    <span>{viewingLive.group} • {viewingLive.teacher}</span>
                  </div>
                </div>
                <button className="lp-close" onClick={() => setViewingLive(null)}><X size={24} /></button>
              </div>
              <div className="lp-body">
                <div className="video-area">
                   <iframe 
                    width="100%" 
                    height="100%" 
                    src={viewingLive.link} 
                    title="Live Lesson" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="lp-sidebar">
                  <div className="lp-stats">
                    <div className="lp-stat-box">
                      <Users size={18} />
                      <div className="ls-val">{viewingLive.students}</div>
                      <div className="ls-lbl">O'quvchilar</div>
                    </div>
                    <div className="lp-stat-box">
                      <Clock size={18} />
                      <div className="ls-val">45:12</div>
                      <div className="ls-lbl">Davomiyligi</div>
                    </div>
                  </div>
                  <div className="lp-actions">
                    <button className="lp-btn primary">Darsni yakunlash</button>
                    <button className="lp-btn secondary">Chatni ko'rish</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveList;
