import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit3, Trash2, BookOpen, 
  Users, Star, ChevronRight, X, Image as ImageIcon,
  Palette, Calculator, Cpu, Globe, BrainCircuit, Save
} from 'lucide-react';
import './CourseCategories.css';

const CourseCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "MATEMATIKA", icon: <Calculator size={24} />, color: "#6366f1", coursesCount: 12, studentsCount: 4500, avgRating: 4.9, image: "https://images.unsplash.com/photo-1509228468518-180dd48a5f5f?w=400&q=80" },
    { id: 2, name: "IT & DASTURLASH", icon: <Cpu size={24} />, color: "#10B981", coursesCount: 8, studentsCount: 2800, avgRating: 4.8, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80" },
    { id: 3, name: "TILLAR", icon: <Globe size={24} />, color: "#F59E0B", coursesCount: 15, studentsCount: 6200, avgRating: 4.7, image: "https://images.unsplash.com/photo-1543165796-5426273ea311?w=400&q=80" },
    { id: 4, name: "MANTIQ", icon: <BrainCircuit size={24} />, color: "#EC4899", coursesCount: 6, studentsCount: 1500, avgRating: 4.9, image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&q=80" },
    { id: 5, name: "SAN'AT", icon: <Palette size={24} />, color: "#8B5CF6", coursesCount: 5, studentsCount: 950, avgRating: 4.6, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleOpenEdit = (cat) => {
    setSelectedCategory(cat);
    setIsAdding(false);
  };

  const handleOpenAdd = () => {
    setIsAdding(true);
    setSelectedCategory(null);
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Kurs Kategoriyalari</h1>
          <p>Jami {categories.length} ta yo'nalish mavjud</p>
        </div>
        <div className="header-actions">
           <button className="action-btn-p primary" onClick={handleOpenAdd}>
              <Plus size={18} /> Yangi kategoriya
           </button>
        </div>
      </div>

      <div className="table-controls">
         <div className="search-box-p">
            <Search size={18} />
            <input type="text" placeholder="Kategoriya nomini qidirish..." />
         </div>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <motion.div 
            key={cat.id} 
            className="category-card-p card-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="cat-card-header" style={{ background: `${cat.color}15` }}>
              <div className="cat-icon-box" style={{ background: cat.color, color: 'white' }}>
                {cat.icon}
              </div>
              <div className="cat-card-actions">
                <button className="c-action-btn" onClick={() => handleOpenEdit(cat)}><Edit3 size={16} /></button>
                <button className="c-action-btn delete"><Trash2 size={16} /></button>
              </div>
            </div>
            
            <div className="cat-card-body">
              <h3>{cat.name}</h3>
              <div className="cat-stats-row">
                <div className="c-stat">
                  <BookOpen size={14} />
                  <span>{cat.coursesCount} kurs</span>
                </div>
                <div className="c-stat">
                  <Users size={14} />
                  <span>{cat.studentsCount} o'quvchi</span>
                </div>
                <div className="c-stat">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span>{cat.avgRating}</span>
                </div>
              </div>
            </div>

            <div className="cat-card-footer">
              <button className="view-courses-btn">
                Kurslarni ko'rish <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {(selectedCategory || isAdding) && (
          <div className="panel-overlay-p" onClick={() => { setSelectedCategory(null); setIsAdding(false); }}>
            <motion.div 
              className="side-panel-p card-glass"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="panel-header-p">
                <div className="p-header-left">
                  <button className="p-close-btn" onClick={() => { setSelectedCategory(null); setIsAdding(false); }}><X size={24} /></button>
                  <div className="p-title-box">
                    <h2>{isAdding ? 'Yangi kategoriya' : 'Kategoriyani tahrirlash'}</h2>
                    <p>{isAdding ? 'Yo\'nalish tafsilotlarini kiriting' : cat.name}</p>
                  </div>
                </div>
              </div>

              <div className="panel-body-p">
                <div className="cat-form-container">
                  <div className="input-group-premium">
                    <label>Kategoriya nomi</label>
                    <input type="text" defaultValue={selectedCategory?.name} placeholder="Masalan: MANTIQ" />
                  </div>

                  <div className="form-row-2">
                    <div className="input-group-premium">
                      <label>Brend rangi</label>
                      <div className="color-picker-box">
                        <input type="color" defaultValue={selectedCategory?.color || '#6366f1'} />
                        <span>Rangni tanlang</span>
                      </div>
                    </div>
                    <div className="input-group-premium">
                      <label>Ikonka</label>
                      <select className="premium-select-s">
                        <option>Matematika (Calculator)</option>
                        <option>IT (Cpu)</option>
                        <option>Tillar (Globe)</option>
                        <option>Mantiq (Brain)</option>
                        <option>San'at (Palette)</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group-premium">
                    <label>Muqova rasmi (URL)</label>
                    <div className="image-upload-preview card-glass">
                      {selectedCategory?.image ? (
                        <img src={selectedCategory.image} alt="" />
                      ) : (
                        <div className="img-placeholder">
                          <ImageIcon size={32} />
                          <span>Rasm URL manzilini kiriting</span>
                        </div>
                      )}
                    </div>
                    <input type="text" defaultValue={selectedCategory?.image} placeholder="https://images.unsplash.com/..." />
                  </div>

                  <div className="form-footer-p">
                    <button className="p-action-btn cancel" onClick={() => { setSelectedCategory(null); setIsAdding(false); }}>Bekor qilish</button>
                    <button className="p-action-btn save">
                      <Save size={18} /> {isAdding ? 'Yaratish' : 'Saqlash'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseCategories;
