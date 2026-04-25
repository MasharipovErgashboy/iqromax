import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, Shield, User, X, Check, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import './AdminsManagement.css';

const AdminsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [admins, setAdmins] = useState([
    { id: 1, name: "Sardor Azimov", email: "sardor@iqromax.uz", role: "Super Admin", status: "Active", joined: "2023-10-12" },
    { id: 2, name: "Ali Valiyev", email: "ali@iqromax.uz", role: "Admin", status: "Active", joined: "2024-01-05" },
    { id: 3, name: "G'ani Toshmatov", email: "gani@iqromax.uz", role: "Admin", status: "Inactive", joined: "2024-02-20" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Haqiqatan ham ushbu adminni o'chirib tashlamoqchimisiz?")) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  const filteredAdmins = admins.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admins-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Adminlar boshqaruvi</h1>
          <p>Tizim adminlarini qo'shish, tahrirlash va huquqlarini belgilash</p>
        </div>
        <button className="add-admin-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Yangi Admin</span>
        </button>
      </div>

      <div className="table-controls">
        <div className="search-box-wrapper">
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Ism yoki email bo'yicha qidirish..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-relative">
          <button 
            className={`control-btn ${isFilterOpen ? 'active' : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} /> 
            <span>Filterlash</span>
          </button>
          
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="filter-dropdown card-glass"
              >
                 <div className="filter-header">Roli bo'yicha</div>
                 <div className="filter-option"><input type="checkbox" /> Super Admin</div>
                 <div className="filter-option"><input type="checkbox" /> Admin</div>
                 <div className="filter-divider" />
                 <div className="filter-header">Holati bo'yicha</div>
                 <div className="filter-option"><input type="checkbox" /> Aktiv</div>
                 <div className="filter-option"><input type="checkbox" /> Noaktiv</div>
                 <button className="filter-apply-btn">Qo'llash</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="admins-table-card">
        <table className="admins-table">
          <thead>
            <tr>
              <th>F.I.SH</th>
              <th>Email</th>
              <th>Roli</th>
              <th>Holati</th>
              <th>Qo'shilgan sana</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin, i) => (
              <tr key={admin.id}>
                <td>
                  <div className="admin-name-cell">
                    <div className="avatar-small">
                      <User size={16} />
                    </div>
                    <span>{admin.name}</span>
                  </div>
                </td>
                <td>{admin.email}</td>
                <td>
                  <span className={`role-badge ${admin.role === 'Super Admin' ? 'super' : 'regular'}`}>
                    <Shield size={12} />
                    {admin.role}
                  </span>
                </td>
                <td>
                  <span className={`status-dot ${admin.status.toLowerCase()}`}>
                    {admin.status}
                  </span>
                </td>
                <td>{admin.joined}</td>
                <td>
                  <div className="action-btns">
                    <button className="edit-btn" onClick={() => alert("Tahrirlash: " + admin.name)}><Edit2 size={16} /></button>
                    <button className="delete-btn" onClick={() => handleDelete(admin.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Admin Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="admin-modal card-glass"
            >
              <div className="modal-header">
                <h2>Yangi Admin Qo'shish</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>F.I.SH (To'liq ism)</label>
                  <input type="text" placeholder="Ism familiyani kiriting" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="example@iqromax.uz" />
                  </div>
                  <div className="form-group">
                    <label>Roli</label>
                    <select>
                      <option>Admin</option>
                      <option>Super Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Username (Login uchun)</label>
                    <div className="input-with-icon">
                       <User size={18} color="#94a3b8" />
                       <input type="text" placeholder="admin_nick" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Parol</label>
                    <div className="input-with-icon">
                       <Lock size={18} color="#94a3b8" />
                       <input 
                         type={showPassword ? "text" : "password"} 
                         placeholder="********" 
                       />
                       <button 
                         className="password-toggle"
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                       >
                         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} 
                       </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Bekor qilish</button>
                <button className="submit-btn" onClick={() => {
                  alert("Yangi admin muvaffaqiyatli qo'shildi!");
                  setIsModalOpen(false);
                }}>
                  <Check size={18} />
                  <span>Qo'shish</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminsManagement;
