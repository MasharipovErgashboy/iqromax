import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  UserCheck, 
  BookOpen, 
  Video, 
  Trophy, 
  Wallet, 
  Settings, 
  LogOut,
  Search,
  Bell,
  User as UserIcon,
  ChevronRight,
  Menu,
  ChevronLeft,
  Filter, Plus, Clock, Star, DollarSign,
  PlayCircle, FileText, X, Eye, Activity,
  ExternalLink, Upload, Trash2, Edit3, Save, MonitorPlay,
  PlusCircle, GripVertical, CheckCircle2, Lock,
  FileDown, MessageSquare, Award
} from 'lucide-react';
import './StudentsList.css';
import './Teachers.css';
import './Courses.css';

const CoursesList = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: "Mental Arifmetika Pro", category: "MATEMATIKA", level: "O'rta", rating: 4.9, students: 1250, price: "150,000", isPremium: true, image: "https://images.unsplash.com/photo-1509228468518-180dd48a5f5f?w=400&q=80", modules: [{ id: 1, title: "Kirish", lessons: [{ id: 1, title: "Abakus sirlari", type: "video", duration: "10 min" }] }], ranking: [] },
    { id: 2, title: "Python Dasturlash", category: "IT", level: "Boshlang'ich", rating: 4.8, students: 850, price: "200,000", isPremium: true, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80", modules: [], ranking: [] },
    { id: 3, title: "Ingliz tili (A1-A2)", category: "TILLAR", level: "Boshlang'ich", rating: 4.7, students: 2100, price: "0", isPremium: false, image: "https://images.unsplash.com/photo-1543165796-5426273ea311?w=400&q=80", modules: [], ranking: [] },
    { id: 4, title: "Mantiqiy Masalalar", category: "MANTIQ", level: "O'rta", rating: 4.9, students: 430, price: "120,000", isPremium: true, image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&q=80", modules: [], ranking: [] },
    { id: 5, title: "Grafik Dizayn", category: "SAN'AT", level: "Boshlang'ich", rating: 4.6, students: 670, price: "180,000", isPremium: true, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80", modules: [], ranking: [] },
    { id: 6, title: "Robototexnika", category: "IT", level: "Yuqori", rating: 5.0, students: 210, price: "350,000", isPremium: true, image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=400&q=80", modules: [], ranking: [] },
    { id: 7, title: "Rus tili intensiv", category: "TILLAR", level: "O'rta", rating: 4.5, students: 1500, price: "0", isPremium: false, image: "https://images.unsplash.com/photo-1510392332204-0b19366e486b?w=400&q=80", modules: [], ranking: [] },
    { id: 8, title: "Web Dasturlash (React)", category: "IT", level: "Yuqori", rating: 4.9, students: 980, price: "400,000", isPremium: true, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80", modules: [], ranking: [] },
    { id: 9, title: "Shaxmat sirlari", category: "MANTIQ", level: "O'rta", rating: 4.8, students: 340, price: "90,000", isPremium: true, image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&q=80", modules: [], ranking: [] },
    { id: 10, title: "Rasm chizish", category: "SAN'AT", level: "Boshlang'ich", rating: 4.4, students: 520, price: "0", isPremium: false, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80", modules: [], ranking: [] },
    { id: 11, title: "Oliy Matematika", category: "MATEMATIKA", level: "Yuqori", rating: 4.9, students: 280, price: "250,000", isPremium: true, image: "https://images.unsplash.com/photo-1509228468518-180dd48a5f5f?w=400&q=80", modules: [], ranking: [] },
    { id: 12, title: "Cyber Security", category: "IT", level: "Yuqori", rating: 4.7, students: 150, price: "500,000", isPremium: true, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80", modules: [], ranking: [] },
    { id: 13, title: "Xitoy tili", category: "TILLAR", level: "Boshlang'ich", rating: 4.6, students: 400, price: "300,000", isPremium: true, image: "https://images.unsplash.com/photo-1523733230464-44026362283e?w=400&q=80", modules: [], ranking: [] },
    { id: 14, title: "Data Science", category: "IT", level: "Yuqori", rating: 4.8, students: 320, price: "450,000", isPremium: true, image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=400&q=80", modules: [], ranking: [] },
    { id: 15, title: "Skulptura", category: "SAN'AT", level: "O'rta", rating: 4.5, students: 120, price: "220,000", isPremium: true, image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=400&q=80", modules: [], ranking: [] }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAdding, setIsAdding] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOpenEdit = (course) => {
     setSelectedCourse(course);
     setIsAdding(false);
     setActiveTab('overview');
  };

  const handleOpenAdd = () => {
     setIsAdding(true);
     setSelectedCourse(null);
     setActiveTab('overview');
  };

  const handleAddModule = () => {
    if (!selectedCourse) return;
    const newModule = {
      id: Date.now(),
      title: "Yangi modul",
      lessons: []
    };
    setSelectedCourse({
      ...selectedCourse,
      modules: [...selectedCourse.modules, newModule]
    });
  };

  const handleAddLesson = (modId) => {
    const newLesson = {
      id: Date.now(),
      title: "Yangi dars",
      type: "video",
      duration: "0 min",
      videoUrl: "",
      content: ""
    };
    const updatedModules = selectedCourse.modules.map(mod => 
      mod.id === modId ? { ...mod, lessons: [...mod.lessons, newLesson] } : mod
    );
    setSelectedCourse({ ...selectedCourse, modules: updatedModules });
    setEditingLesson({ ...newLesson, modId });
  };

  const handleDeleteLesson = (modId, lessonId) => {
    const updatedModules = selectedCourse.modules.map(mod => 
      mod.id === modId ? { ...mod, lessons: mod.lessons.filter(l => l.id !== lessonId) } : mod
    );
    setSelectedCourse({ ...selectedCourse, modules: updatedModules });
  };

  const handleDeleteModule = (modId) => {
    const updatedModules = selectedCourse.modules.filter(mod => mod.id !== modId);
    setSelectedCourse({ ...selectedCourse, modules: updatedModules });
  };

  const handleUpdateLesson = (updatedLesson) => {
    const updatedModules = selectedCourse.modules.map(mod => 
      mod.id === editingLesson.modId ? { 
        ...mod, 
        lessons: mod.lessons.map(l => l.id === updatedLesson.id ? updatedLesson : l) 
      } : mod
    );
    setSelectedCourse({ ...selectedCourse, modules: updatedModules });
    setEditingLesson(null);
  };

  const handleAddTask = () => {
    if (!selectedCourse || selectedCourse.modules.length === 0) return;
    const firstModId = selectedCourse.modules[0].id;
    const newTask = {
      id: Date.now(),
      title: "Yangi vazifa",
      type: "task",
      xp: 50,
      content: "",
      modId: firstModId
    };
    const updatedModules = selectedCourse.modules.map(mod => 
      mod.id === firstModId ? { ...mod, lessons: [...mod.lessons, newTask] } : mod
    );
    setSelectedCourse({ ...selectedCourse, modules: updatedModules });
    setEditingLesson(newTask);
  };

  return (
    <div className="students-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Kurslar boshqaruvi</h1>
          <p>Tizimda {courses.length} ta kurs mavjud</p>
        </div>
        <div className="header-actions">
           <button className="action-btn-p primary" onClick={handleOpenAdd}>
              <Plus size={18} /> Yangi kurs
           </button>
        </div>
      </div>

      <div className="table-controls">
         <div className="search-box-p">
            <Search size={18} />
            <input type="text" placeholder="Kurs nomi yoki kategoriya bo'yicha qidirish..." />
         </div>
         <button className="filter-btn-p"><Filter size={18} /> Saralash</button>
      </div>

      <div className="table-wrapper-p card-glass">
         <table className="premium-table-p">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>KURS NOMI</th>
                  <th>KATEGORIYA</th>
                  <th>REYTING</th>
                  <th>O'QUVCHILAR</th>
                  <th>NARX</th>
                  <th>STATUS</th>
                  <th>AMALLAR</th>
               </tr>
            </thead>
            <tbody>
               {courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(course => (
                  <tr key={course.id}>
                     <td className="id-cell">#CR-{course.id.toString().padStart(3, '0')}</td>
                     <td>
                        <div className="course-title-cell">
                           <div className="mini-course-img">
                              <img src={course.image} alt="" />
                           </div>
                           <div className="title-info">
                              <div className="t-name">{course.title}</div>
                              <div className="t-level">{course.level}</div>
                           </div>
                        </div>
                     </td>
                     <td><span className="cat-badge-p">{course.category}</span></td>
                     <td>
                        <div className="rating-cell-p">
                           <Star size={14} fill="#F59E0B" color="#F59E0B" />
                           <span>{course.rating}</span>
                        </div>
                     </td>
                     <td>
                        <div className="students-cell-p">
                           <Users size={14} />
                           <span>{course.students}</span>
                        </div>
                     </td>
                     <td><span className="price-tag-p">{course.price === "0" ? "Bepul" : `${course.price} so'm`}</span></td>
                     <td>
                        {course.isPremium ? (
                           <span className="status-badge-p premium"><Lock size={10} /> Premium</span>
                        ) : (
                           <span className="status-badge-p free">Ochiq</span>
                        )}
                     </td>
                     <td>
                        <div className="action-btns-p">
                           <button className="icon-btn-p view" onClick={() => handleOpenEdit(course)}><Eye size={16} /></button>
                           <button className="icon-btn-p edit" onClick={() => handleOpenEdit(course)}><Edit3 size={16} /></button>
                           <button className="icon-btn-p delete"><Trash2 size={16} /></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         <div className="pagination-p">
            <div className="pagination-info">
               Jami {courses.length} tadan {Math.min(currentPage * itemsPerPage, courses.length)} tasi ko'rsatilyapti
            </div>
            <div className="pagination-btns">
               <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="page-nav-btn"
               >
                  <ChevronLeft size={18} />
               </button>
               {[1, 2, 3].map(page => (
                  <button 
                     key={page} 
                     className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                     onClick={() => setCurrentPage(page)}
                  >
                     {page}
                  </button>
               ))}
               <button 
                  disabled={currentPage * itemsPerPage >= courses.length}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="page-nav-btn"
               >
                  <ChevronRight size={18} />
               </button>
            </div>
         </div>
      </div>

      <AnimatePresence>
         {(selectedCourse || isAdding) && (
            <motion.div 
               className="detail-panel-full"
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
               <div className="panel-header-p">
                  <div className="p-header-left">
                     <button className="p-close-btn" onClick={() => { setSelectedCourse(null); setIsAdding(false); }}><X size={24} /></button>
                     <div className="p-title-box">
                        <h2>{isAdding ? 'Yangi kurs yaratish' : selectedCourse.title}</h2>
                        <span className="p-subtitle">
                           {isAdding ? 'Barcha ma\'lumotlarni to\'ldiring' : `${selectedCourse.category} • Tahrirlash rejimi`}
                        </span>
                     </div>
                  </div>
                  <div className="p-header-actions">
                     {!isAdding && <button className="p-action-btn delete"><Trash2 size={18} /> O'chirish</button>}
                     <button className="p-action-btn save">
                        <Save size={18} /> {isAdding ? 'Yaratish' : 'Saqlash'}
                     </button>
                  </div>
               </div>

               <div className="panel-tabs-p">
                  {['overview', 'syllabus', 'tasks', 'students'].map(tab => (
                     (!isAdding || tab === 'overview') && (
                        <button 
                           key={tab}
                           className={`p-tab-btn ${activeTab === tab ? 'active' : ''}`}
                           onClick={() => setActiveTab(tab)}
                        >
                           {tab === 'overview' && 'Umumiy'}
                           {tab === 'syllabus' && 'Darslik (Modullar)'}
                           {tab === 'tasks' && 'Vazifalar'}
                           {tab === 'students' && 'Reyting'}
                        </button>
                     )
                  ))}
               </div>

               <div className="panel-body-p">
                  {activeTab === 'overview' && (
                     <div className="course-creation-container">
                        <div className="creation-sidebar">
                           <div className="cover-preview-card card-glass">
                              <label>Kurs muqovasi</label>
                              <div className="preview-placeholder">
                                 {selectedCourse?.image ? (
                                    <img src={selectedCourse.image} alt="Preview" />
                                 ) : (
                                    <div className="upload-placeholder">
                                       <Upload size={32} />
                                       <span>Rasm URL manzilini kiriting</span>
                                    </div>
                                 )}
                              </div>
                              <input 
                                 type="text" 
                                 placeholder="https://images.unsplash.com/..." 
                                 className="premium-input-s"
                                 defaultValue={selectedCourse?.image}
                              />
                              <p className="help-text">Tavsiya etilgan o'lcham: 1200x800px</p>
                           </div>

                           <div className="quick-stats-card card-glass">
                              <div className="q-stat-item">
                                 <Star size={18} color="#F59E0B" />
                                 <div>
                                    <span className="q-val">{selectedCourse?.rating || '0.0'}</span>
                                    <span className="q-label">Reyting</span>
                                 </div>
                              </div>
                              <div className="q-stat-item">
                                 <Users size={18} color="#10B981" />
                                 <div>
                                    <span className="q-val">{selectedCourse?.students || '0'}</span>
                                    <span className="q-label">O'quvchilar</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="creation-main-form">
                           <div className="form-section-p card-glass">
                              <div className="section-head">
                                 <div className="s-icon"><BookOpen size={18} /></div>
                                 <h3>Asosiy ma'lumotlar</h3>
                              </div>
                              <div className="form-grid-2">
                                 <div className="input-group-premium">
                                    <label>Kurs nomi</label>
                                    <input type="text" placeholder="Masalan: Mental Arifmetika Pro" defaultValue={selectedCourse?.title} />
                                 </div>
                                 <div className="input-group-premium">
                                    <label>Kategoriya</label>
                                    <div className="category-chips">
                                       {['MATEMATIKA', 'MANTIQ', 'IT', 'TILLAR', 'SAN\'AT'].map(cat => (
                                          <button 
                                             key={cat} 
                                             className={`cat-chip ${ (selectedCourse?.category === cat || (!selectedCourse && cat === 'MATEMATIKA')) ? 'active' : '' }`}
                                          >
                                             {cat}
                                          </button>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                              <div className="input-group-premium" style={{marginTop: '20px'}}>
                                 <label>Kurs haqida batafsil (Description)</label>
                                 <textarea rows={5} placeholder="O'quvchilar ushbu kursdan nimalarni o'rganishadi..." defaultValue={selectedCourse?.description} />
                              </div>
                           </div>

                           <div className="form-section-p card-glass" style={{marginTop: '25px'}}>
                              <div className="section-head">
                                 <div className="s-icon"><Video size={18} /></div>
                                 <h3>Media va Prezentatsiya</h3>
                              </div>
                              <div className="form-grid-2">
                                 <div className="input-group-premium">
                                    <label>YouTube Prezentatsiya Linki</label>
                                    <div className="link-wrapper">
                                       <MonitorPlay size={18} />
                                       <input type="text" placeholder="https://youtube.com/embed/..." defaultValue={selectedCourse?.presentationVideo} />
                                    </div>
                                    <p className="help-text">Bu video kursning bosh sahifasida ko'rinadi</p>
                                 </div>
                                 <div className="input-group-premium">
                                    <label>Kurs narxi (UZS)</label>
                                    <div className="price-input-wrapper">
                                       <DollarSign size={18} />
                                       <input type="text" placeholder="Bepul bo'lsa 0 qoldiring" defaultValue={selectedCourse?.price} />
                                    </div>
                                    <p className="help-text">Chegirmasiz narxni kiriting</p>
                                 </div>
                              </div>
                           </div>

                           <div className="form-section-p card-glass" style={{marginTop: '25px'}}>
                              <div className="section-head">
                                 <div className="s-icon"><Activity size={18} /></div>
                                 <h3>Qiyinchilik darajasi</h3>
                              </div>
                              <div className="level-selector">
                                 {['Boshlang\'ich', 'O\'rta', 'Yuqori'].map(lv => (
                                    <div key={lv} className={`level-option ${ (selectedCourse?.level === lv || (!selectedCourse && lv === 'Boshlang\'ich')) ? 'active' : '' }`}>
                                       {lv}
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {!isAdding && activeTab === 'syllabus' && (
                     <div className="syllabus-manager-p">
                        <div className="syllabus-header-p">
                           <div className="s-head-info">
                              <h3>Kurs tarkibi</h3>
                              <p>
                                 <span className="s-count-badge modules"><BookOpen size={14} /> {selectedCourse.modules.length} modul</span>
                                 <span className="s-count-badge lessons"><PlayCircle size={14} /> {selectedCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)} dars</span>
                              </p>
                           </div>
                           <button className="add-module-btn-p primary" onClick={handleAddModule}>
                              <PlusCircle size={18} /> Yangi modul qo'shish
                           </button>
                        </div>

                        <div className="modules-list-p">
                           {selectedCourse.modules.map(mod => (
                              <div key={mod.id} className="module-item-p card-glass">
                                 <div className="module-head">
                                    <div className="m-title">
                                       <GripVertical size={16} className="drag-icon" />
                                       <input type="text" defaultValue={mod.title} />
                                    </div>
                                    <div className="m-actions">
                                       <button className="m-btn-p add" onClick={() => handleAddLesson(mod.id)} title="Dars qo'shish"><Plus size={16} /></button>
                                       <button className="m-btn-p delete" onClick={() => handleDeleteModule(mod.id)} title="Modulni o'chirish"><Trash2 size={16} /></button>
                                    </div>
                                 </div>
                                 <div className="lessons-list-p">
                                    {mod.lessons.map(les => (
                                       <div key={les.id} className="lesson-row-p">
                                          <div className="l-type-icon">
                                             {les.type === 'video' && <PlayCircle size={18} color="#6366f1" />}
                                             {les.type === 'task' && <FileText size={18} color="#10B981" />}
                                             {les.type === 'live' && <Video size={18} color="#ef4444" />}
                                          </div>
                                          <div className="l-info">
                                             <div className="l-name">{les.title}</div>
                                             <div className="l-meta">{les.duration || les.time || les.xp + " XP"}</div>
                                          </div>
                                          <div className="l-actions">
                                             <button className="l-btn edit" onClick={() => setEditingLesson({ ...les, modId: mod.id })}><Edit3 size={14} /></button>
                                             <button className="l-btn delete" onClick={() => handleDeleteLesson(mod.id, les.id)}><Trash2 size={14} /></button>
                                          </div>
                                       </div>
                                    ))}
                                    <button className="add-lesson-row-btn" onClick={() => handleAddLesson(mod.id)}>
                                       <Plus size={14} /> Dars qo'shish
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeTab === 'tasks' && (
                     <div className="tasks-manager-p">
                        <div className="tasks-header-p">
                           <div className="s-head-info">
                              <h3>Vazifalar boshqaruvi</h3>
                              <p>
                                 <span className="s-count-badge lessons">
                                    <FileText size={14} /> {selectedCourse.modules.flatMap(m => m.lessons).filter(l => l.type === 'task').length} ta vazifa
                                 </span>
                              </p>
                           </div>
                           <button className="add-module-btn-p primary" onClick={handleAddTask}>
                              <PlusCircle size={18} /> Yangi vazifa qo'shish
                           </button>
                        </div>
                        
                        <div className="table-wrapper-p card-glass">
                           <table className="premium-table-p">
                              <thead>
                                 <tr>
                                    <th>ID</th>
                                    <th>VAZIFA NOMI</th>
                                    <th>MODUL</th>
                                    <th>XP MUKOFOTI</th>
                                    <th>AMALLAR</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {selectedCourse.modules.flatMap(m => 
                                    m.lessons.filter(l => l.type === 'task').map(task => ({ ...task, modTitle: m.title }))
                                 ).map((task, idx) => (
                                    <tr key={task.id}>
                                       <td className="id-cell">#TK-{idx + 1}</td>
                                       <td>
                                          <div className="task-name-cell">
                                             <div className="t-icon-box"><FileText size={16} /></div>
                                             <div className="t-name-info">
                                                <div className="t-name">{task.title}</div>
                                                <div className="t-desc-mini">{task.content.substring(0, 40)}...</div>
                                             </div>
                                          </div>
                                       </td>
                                       <td><span className="mod-badge-s">{task.modTitle}</span></td>
                                       <td><span className="xp-badge-s">+{task.xp} XP</span></td>
                                       <td>
                                          <div className="action-btns-p">
                                             <button className="icon-btn-p view" onClick={() => setEditingLesson({ ...task, modId: task.modId })}><Eye size={14} /></button>
                                             <button className="icon-btn-p edit" onClick={() => setEditingLesson({ ...task, modId: task.modId })}><Edit3 size={14} /></button>
                                             <button className="icon-btn-p delete" onClick={() => handleDeleteLesson(task.modId, task.id)}><Trash2 size={14} /></button>
                                          </div>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  )}

                  {activeTab === 'students' && (
                     <div className="ranking-view-p">
                        <div className="ranking-header-p">
                           <h3>O'quvchilar reytingi</h3>
                           <div className="r-stats">
                              <div className="r-stat"><span>{selectedCourse.students}</span> O'quvchi</div>
                              <div className="r-stat"><span>{selectedCourse.rating}</span> Reyting</div>
                           </div>
                        </div>
                        <div className="ranking-table-p">
                           <div className="rt-head">
                              <div>№</div>
                              <div>Ism Familiya</div>
                              <div>XP Ball</div>
                              <div>Progress</div>
                           </div>
                           {selectedCourse.ranking.map((s, idx) => (
                              <div key={s.id} className="rt-row">
                                 <div className="rt-rank">#{idx + 1}</div>
                                 <div className="rt-name">{s.name}</div>
                                 <div className="rt-xp">{s.xp} XP</div>
                                 <div className="rt-progress">
                                    <div className="progress-bar-mini">
                                       <div className="pb-fill" style={{width: `${100 - idx * 10}%`}}></div>
                                    </div>
                                    <span>{100 - idx * 10}%</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {editingLesson && (
            <motion.div 
               className="lesson-editor-panel card-glass"
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
               <div className="lesson-editor-header">
                  <div className="le-left">
                     <button className="p-close-btn" onClick={() => setEditingLesson(null)}><X size={20} /></button>
                     <div className="le-title">
                        <h3>Darsni tahrirlash</h3>
                        <span>{editingLesson.title}</span>
                     </div>
                  </div>
                  <div className="le-actions">
                     <button className="p-action-btn save" onClick={() => handleUpdateLesson(editingLesson)}>
                        <Save size={18} /> Saqlash va Yakunlash
                     </button>
                  </div>
               </div>

               <div className="lesson-editor-body">
                  <div className="le-form-row">
                     <div className="input-group-premium">
                        <label>Dars nomi</label>
                        <input 
                           type="text" 
                           value={editingLesson.title} 
                           onChange={(e) => setEditingLesson({...editingLesson, title: e.target.value})}
                        />
                     </div>
                     <div className="input-group-premium">
                        <label>Dars turi</label>
                        <select 
                           value={editingLesson.type}
                           onChange={(e) => setEditingLesson({...editingLesson, type: e.target.value})}
                        >
                           <option value="video">Video dars</option>
                           <option value="task">Uyga vazifa</option>
                           <option value="live">Jonli efir</option>
                        </select>
                     </div>
                  </div>

                  {editingLesson.type === 'video' && (
                     <div className="le-content-section">
                        <div className="form-grid-2">
                           <div className="input-group-premium">
                              <label>YouTube Video URL (Embed)</label>
                              <input 
                                 type="text" 
                                 value={editingLesson.videoUrl}
                                 onChange={(e) => setEditingLesson({...editingLesson, videoUrl: e.target.value})}
                                 placeholder="https://www.youtube.com/embed/..."
                              />
                           </div>
                           <div className="input-group-premium">
                              <label>Davomiyligi (min)</label>
                              <input 
                                 type="text" 
                                 value={editingLesson.duration}
                                 onChange={(e) => setEditingLesson({...editingLesson, duration: e.target.value})}
                                 placeholder="Masalan: 12 min"
                              />
                           </div>
                        </div>
                        <div className="input-group-premium" style={{marginTop: '20px'}}>
                           <label>Dars konspekti (Matn)</label>
                           <textarea 
                              rows={8}
                              value={editingLesson.content}
                              onChange={(e) => setEditingLesson({...editingLesson, content: e.target.value})}
                              placeholder="Bugungi dars haqida qisqacha ma'lumot va asosiy punktlar..."
                           />
                        </div>
                        <div className="materials-upload-zone card-glass" style={{marginTop: '20px'}}>
                           <div className="m-icon"><FileDown size={24} /></div>
                           <div className="m-text">
                              <h4>Dars materiallari (PDF)</h4>
                              <p>Konspekt va qo'shimcha fayllarni shu yerga qo'shishingiz mumkin</p>
                           </div>
                           <button className="upload-btn-p"><Upload size={16} /> Fayl tanlash</button>
                        </div>
                     </div>
                  )}

                  {editingLesson.type === 'task' && (
                     <div className="le-content-section">
                        <div className="input-group-premium">
                           <label>Vazifa mazmuni</label>
                           <textarea 
                              rows={10}
                              value={editingLesson.content}
                              onChange={(e) => setEditingLesson({...editingLesson, content: e.target.value})}
                              placeholder="O'quvchi bajarishi kerak bo'lgan topshiriqni batafsil yozing..."
                           />
                        </div>
                        <div className="input-group-premium" style={{marginTop: '20px'}}>
                           <label>Vazifa uchun XP mukofoti</label>
                           <input 
                              type="number" 
                              value={editingLesson.xp}
                              onChange={(e) => setEditingLesson({...editingLesson, xp: e.target.value})}
                              placeholder="Masalan: 50"
                           />
                        </div>
                     </div>
                  )}

                  {editingLesson.type === 'live' && (
                     <div className="le-content-section">
                        <div className="form-grid-2">
                           <div className="input-group-premium">
                              <label>Efir vaqti</label>
                              <input 
                                 type="time" 
                                 value={editingLesson.time}
                                 onChange={(e) => setEditingLesson({...editingLesson, time: e.target.value})}
                              />
                           </div>
                           <div className="input-group-premium">
                              <label>Sana</label>
                              <input 
                                 type="date" 
                                 value={editingLesson.date}
                                 onChange={(e) => setEditingLesson({...editingLesson, date: e.target.value})}
                              />
                           </div>
                        </div>
                        <div className="input-group-premium" style={{marginTop: '20px'}}>
                           <label>Uchrashuv linki (Zoom/Google Meet)</label>
                           <input 
                              type="text" 
                              placeholder="https://zoom.us/j/..."
                           />
                        </div>
                     </div>
                  )}
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesList;
