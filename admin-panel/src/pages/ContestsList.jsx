import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, Trophy, 
  Users, Clock, Award, Target,
  Trash2, Edit3, Eye, X, Save, 
  BookOpen, AlertCircle, Play, Calendar,
  ShieldCheck, HelpCircle, Zap
} from 'lucide-react';
import './ContestsList.css';

const ContestsList = () => {
  const [contests, setContests] = useState([
    { 
      id: 1, 
      title: "Global Algebra Challenge", 
      type: "Mental Arifmetika", 
      status: "live", 
      participants: 1240, 
      prize: "5,000,000 UZS", 
      timeRemaining: "02:45:10",
      description: "Ushbu global musobaqada dunyo bo'ylab eng kuchli o'quvchilar bilan bellashing.",
      rules: ["Simulyatordan foydalanish taqiqlanadi", "Har bir misol uchun 20 soniya vaqt"],
      image: "https://images.unsplash.com/photo-1509228468518-180dd48a5f5f?w=400&q=80"
    },
    { 
      id: 2, 
      title: "Mantiqiy Bilimdon 2026", 
      type: "Mantiqiy fikrlash", 
      status: "upcoming", 
      participants: 850, 
      prize: "3,000,000 UZS", 
      startTime: "Starts in 1h",
      description: "Mantiqiy fikrlash darajangizni sinab ko'ring va sovrinli o'rinlarni egallang.",
      rules: ["30 ta mantiqiy savol", "Maksimal ball 1000 XP"],
      image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&q=80"
    },
  ]);

  const [selectedContest, setSelectedContest] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleOpenEdit = (contest) => {
    setSelectedContest(contest);
    setIsAdding(false);
  };

  return (
    <div className="contests-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Musobaqalar Jadvali</h1>
          <p>Tizimda {contests.length} ta faol musobaqa mavjud</p>
        </div>
        <div className="header-actions">
           <button className="action-btn-p primary" onClick={() => setIsAdding(true)}>
              <Plus size={18} /> Yangi musobaqa yaratish
           </button>
        </div>
      </div>

      <div className="table-controls">
         <div className="search-box-p">
            <Search size={18} />
            <input type="text" placeholder="Musobaqa nomi bo'yicha qidirish..." />
         </div>
         <button className="filter-btn-p"><Filter size={18} /> Filtrlash</button>
      </div>

      <div className="table-wrapper-p card-glass">
         <table className="premium-table-p">
            <thead>
               <tr>
                  <th>MUSOBAQA VA YO'NALISH</th>
                  <th>MUKOFOT JAMG'ARMASI</th>
                  <th>ISHTIROKCHILAR</th>
                  <th>VAQT / STATUS</th>
                  <th>STATUS</th>
                  <th>AMALLAR</th>
               </tr>
            </thead>
            <tbody>
               {contests.map(c => (
                  <tr key={c.id}>
                     <td>
                        <div className="contest-info-cell">
                           <div className="c-img-mini">
                              <img src={c.image} alt="" />
                              {c.status === 'live' && <div className="live-dot-mini"></div>}
                           </div>
                           <div className="c-text">
                              <div className="c-title">{c.title}</div>
                              <div className="c-type">{c.type}</div>
                           </div>
                        </div>
                     </td>
                     <td>
                        <div className="prize-cell">
                           <Award size={16} />
                           <span>{c.prize}</span>
                        </div>
                     </td>
                     <td>
                        <div className="participants-cell">
                           <Users size={16} />
                           <span>{c.participants}</span>
                        </div>
                     </td>
                     <td>
                        <div className="time-cell">
                           <Clock size={14} />
                           <span>{c.status === 'live' ? c.timeRemaining : c.startTime}</span>
                        </div>
                     </td>
                     <td>
                        <span className={`status-badge-p ${c.status}`}>
                           {c.status === 'live' ? 'LIVE NOW' : 'UPCOMING'}
                        </span>
                     </td>
                     <td>
                        <div className="action-btns-p">
                           {c.status === 'upcoming' ? (
                             <>
                               <button className="icon-btn-p edit" onClick={() => handleOpenEdit(c)}><Edit3 size={16} /></button>
                               <button className="icon-btn-p delete" onClick={() => setContests(contests.filter(i => i.id !== c.id))}><Trash2 size={16} /></button>
                             </>
                           ) : (
                             <span className="no-actions-text">Nazoratda...</span>
                           )}
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      <AnimatePresence>
        {(selectedContest || isAdding) && (
          <motion.div 
            className="detail-panel-full contest-manager-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="panel-header-p contest-header-premium">
              <div className="p-header-left">
                <button className="p-close-btn" onClick={() => { setSelectedContest(null); setIsAdding(false); }}><X size={24} /></button>
                <div className="p-title-box">
                  <div className="p-badge-modern">{isAdding ? 'NEW TOURNAMENT' : selectedContest?.status?.toUpperCase()}</div>
                  <h2>{isAdding ? 'Yangi Musobaqa Yaratish' : `Tahrirlash: ${selectedContest?.title}`}</h2>
                </div>
              </div>
              <div className="p-header-actions">
                <button className="p-btn-cancel" onClick={() => { setSelectedContest(null); setIsAdding(false); }}>Bekor qilish</button>
                <button className="p-btn-publish">
                  <Zap size={18} /> {isAdding ? 'Nashr etish' : 'O\'zgarishlarni saqlash'}
                </button>
              </div>
            </div>

            <div className="panel-body-p">
              <div className="contest-modern-form">
                <div className="form-column-main">
                  <div className="form-card-premium card-glass">
                    <div className="card-heading">
                      <div className="h-icon"><BookOpen size={20} /></div>
                      <div>
                        <h3>Musobaqa tafsilotlari</h3>
                        <p>Asosiy ma'lumotlar va tavsif</p>
                      </div>
                    </div>
                    <div className="field-group">
                      <label>Musobaqa sarlavhasi</label>
                      <input type="text" placeholder="Masalan: Global Algebra Challenge" defaultValue={selectedContest?.title} />
                    </div>
                    <div className="field-grid-2">
                       <div className="field-group">
                          <label>Yo'nalish (Kategoriya)</label>
                          <select className="premium-select-m">
                             <option>Mental Arifmetika</option>
                             <option>Mantiqiy fikrlash</option>
                             <option>Matematika</option>
                          </select>
                       </div>
                       <div className="field-group">
                          <label>Murakkablik darajasi</label>
                          <div className="level-selector">
                             <button className="lvl-btn active">Easy</button>
                             <button className="lvl-btn">Medium</button>
                             <button className="lvl-btn">Hard</button>
                          </div>
                       </div>
                    </div>
                    <div className="field-group">
                       <label>Tavsif (Description)</label>
                       <textarea placeholder="Musobaqa haqida batafsil ma'lumot..." defaultValue={selectedContest?.description}></textarea>
                    </div>
                  </div>

                  <div className="form-card-premium card-glass">
                    <div className="card-heading">
                      <div className="h-icon"><ShieldCheck size={20} /></div>
                      <div>
                        <h3>Musobaqa qoidalari</h3>
                        <p>Ishtirokchilar uchun tartib-qoidalar</p>
                      </div>
                    </div>
                    <div className="rules-editor-m">
                       {(selectedContest?.rules || ["Yangi qoida kiriting..."]).map((rule, idx) => (
                         <div key={idx} className="rule-row-m">
                            <div className="rule-num">{idx + 1}</div>
                            <input type="text" defaultValue={rule} />
                            <button className="rule-remove"><Trash2 size={14} /></button>
                         </div>
                       ))}
                       <button className="rule-add-m"><Plus size={16} /> Yangi qoida qo'shish</button>
                    </div>
                  </div>
                </div>

                <div className="form-column-side">
                  <div className="form-card-premium card-glass prize-card">
                    <div className="card-heading">
                      <div className="h-icon"><Award size={20} /></div>
                      <div>
                        <h3>Mukofot jamg'armasi</h3>
                        <p>G'oliblar uchun sovrinlar</p>
                      </div>
                    </div>
                    <div className="field-group">
                       <label>Umumiy summa (UZS)</label>
                       <input type="text" className="prize-input" placeholder="5,000,000 UZS" defaultValue={selectedContest?.prize} />
                    </div>
                    <div className="prize-distribution">
                       <div className="p-dist-item">
                          <div className="p-rank first">1-O'rin</div>
                          <input type="text" placeholder="2,500,000" />
                       </div>
                       <div className="p-dist-item">
                          <div className="p-rank second">2-O'rin</div>
                          <input type="text" placeholder="1,500,000" />
                       </div>
                       <div className="p-dist-item">
                          <div className="p-rank third">3-O'rin</div>
                          <input type="text" placeholder="1,000,000" />
                       </div>
                    </div>
                  </div>

                  <div className="form-card-premium card-glass questions-card">
                    <div className="card-heading">
                      <div className="h-icon"><Target size={20} /></div>
                      <div>
                        <h3>Savollar to'plami</h3>
                        <p>Tanlangan: 12 ta savol</p>
                      </div>
                    </div>
                    <div className="q-preview-list-m">
                       <div className="q-item-m">
                          <span className="q-txt">42 + 58 = ?</span>
                          <span className="q-type">Math</span>
                       </div>
                       <div className="q-item-m">
                          <span className="q-txt">125 * 4 = ?</span>
                          <span className="q-type">Math</span>
                       </div>
                    </div>
                    <button className="q-manage-btn-m">Savollarni boshqarish</button>
                  </div>

                  <div className="form-card-premium card-glass schedule-card">
                    <div className="card-heading">
                      <div className="h-icon"><Calendar size={20} /></div>
                      <div>
                        <h3>Vaqt parametrlari</h3>
                        <p>Musobaqa vaqti</p>
                      </div>
                    </div>
                    <div className="field-group">
                       <label>Boshlanish vaqti</label>
                       <input type="datetime-local" />
                    </div>
                    <div className="field-group">
                       <label>Davomiyligi (daqiqa)</label>
                       <input type="number" placeholder="60" />
                    </div>
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

export default ContestsList;
