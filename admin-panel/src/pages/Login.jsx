import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Lock as LockIcon, ChevronRight, ShieldCheck as ShieldIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo mode: navigate to dashboard regardless of input
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card glass"
      >
        <div className="login-header">
           <motion.div 
             initial={{ scale: 0.8 }}
             animate={{ scale: 1 }}
             className="logo-box"
           >
              <h1 className="logo-text">IQROMAX</h1>
           </motion.div>
           <p className="subtitle">BOSHQARUV PANELIGA KIRISH</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <div className="input-icon">
              <UserIcon size={20} color="#94a3b8" />
            </div>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <LockIcon size={20} color="#94a3b8" />
            </div>
            <input 
              type="password" 
              placeholder="Parol" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="login-button"
          >
            <span>Kirish</span>
            <ChevronRight size={20} />
          </motion.button>
        </form>

        <div className="login-footer">
           <ShieldIcon size={14} color="#10B981" />
           <span>Xavfsiz tizim</span>
        </div>
      </motion.div>

    </div>
  );
};

export default Login;
