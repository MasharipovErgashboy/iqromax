import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, MessageCircle, User, Calendar, Quote, CheckCircle2, 
  Search, Filter, Heart, MessageSquare, ThumbsUp, AlertCircle,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import './StudentsList.css';
import './Parents.css';

const ParentsReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [allReviews, setAllReviews] = useState(Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    parent: i % 2 === 0 ? "Alisher Karimov" : "Zuhra Aliyeva",
    date: `2024-03-${(20 - i).toString().padStart(2, '0')}`,
    rating: i % 5 === 0 ? 3 : 5,
    text: i % 3 === 0 
      ? "IQROMAX platformasi juda foydali ekan. Farzandim har kuni yangi bilimlar olmoqda."
      : "Darslar sifati yuqori, o'qituvchilar ham professional. Tizim juda qulay va tez ishlaydi.",
    status: "Verified",
    type: i % 5 === 0 ? "Neutral" : "Positive",
    likes: 5 + i,
    liked: false,
    replies: i === 0 ? [{ text: "Rahmat! Farzandingiz natijalaridan xursandmiz.", date: "2024-03-16" }] : []
  })));

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleLike = (id) => {
     setAllReviews(prev => prev.map(r => {
        if (r.id === id) {
           return { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked };
        }
        return r;
     }));
  };

  const submitReply = () => {
     if (!replyText.trim()) return;
     setAllReviews(prev => prev.map(r => {
        if (r.id === replyingTo.id) {
           return { 
              ...r, 
              replies: [...r.replies, { text: replyText, date: new Date().toISOString().split('T')[0] }] 
           };
        }
        return r;
     }));
     setReplyingTo(null);
     setReplyText('');
  };

  const totalPages = Math.ceil(allReviews.length / itemsPerPage);
  const currentReviews = allReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="students-list-page">
      <div className="page-header">
        <div className="header-title">
          <h1>Ota-onalar sharhlari</h1>
          <p>Foydalanuvchilar tomonidan qoldirilgan {allReviews.length} ta fikr-mulohaza</p>
        </div>
      </div>

      <div className="table-controls" style={{marginBottom: '40px'}}>
        <div className="review-stats-row">
           <div className="r-stat-box card-glass">
              <div className="r-stat-val">4.8</div>
              <div className="r-stat-stars">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <label>O'rtacha reyting</label>
           </div>
           <div className="r-stat-box card-glass">
              <div className="r-stat-val">92%</div>
              <label>Ijobiy sharhlar</label>
           </div>
           <div className="r-stat-box card-glass">
              <div className="r-stat-val">{allReviews.length}</div>
              <label>Jami sharhlar</label>
           </div>
        </div>
      </div>

      <div className="reviews-grid-premium">
        {currentReviews.map((r, i) => (
          <motion.div 
            key={r.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="review-card-premium card-glass"
          >
            <div className="review-header">
               <div className="r-parent-info">
                  <div className="r-avatar-s" style={{background: '#f8fafc', color: '#64748b'}}><User size={18} /></div>
                  <div className="r-p-name">
                     <h4>{r.parent}</h4>
                     <div className="r-meta">
                        <Calendar size={12} /> <span>{r.date}</span>
                        <CheckCircle2 size={12} color="#10B981" /> <span>Tasdiqlangan</span>
                     </div>
                  </div>
               </div>
               <div className="r-rating-p">
                  {[1,2,3,4,5].map(star => (
                     <Star 
                       key={star} 
                       size={14} 
                       fill={star <= r.rating ? "#F59E0B" : "none"} 
                       color={star <= r.rating ? "#F59E0B" : "#e2e8f0"} 
                     />
                  ))}
               </div>
            </div>

            <div className="review-content-p">
               <Quote size={24} color="#f1f5f9" style={{position: 'absolute', top: -10, left: -10, zIndex: -1}} />
               <p>{r.text}</p>
            </div>

            <div className="review-footer-p">
               <div className={`sentiment-badge ${r.type.toLowerCase()}`}>
                  {r.type === 'Positive' ? <Heart size={12} /> : <AlertCircle size={12} />}
                  <span>{r.type}</span>
               </div>
               <div className="review-actions-mini">
                  <button 
                    className={`r-mini-btn ${r.liked ? 'liked' : ''}`}
                    onClick={() => handleLike(r.id)}
                  >
                    <ThumbsUp size={14} fill={r.liked ? "#6366f1" : "none"} /> 
                    <span>{r.likes}</span>
                  </button>
                  <button 
                    className="r-mini-btn"
                    onClick={() => setReplyingTo(r)}
                  >
                    <MessageSquare size={14} /> <span>Javob</span>
                  </button>
               </div>
            </div>

            {r.replies && r.replies.length > 0 && (
               <div className="review-replies-p">
                  {r.replies.map((rep, idx) => (
                     <div key={idx} className="reply-item-p">
                        <div className="reply-header">
                           <div className="admin-badge">Admin</div>
                           <span className="reply-date">{rep.date}</span>
                        </div>
                        <p>{rep.text}</p>
                     </div>
                  ))}
               </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
         {replyingTo && (
            <motion.div className="modal-center-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{zIndex: 20000}}>
               <div className="modal-overlay" onClick={() => setReplyingTo(null)} />
               <motion.div className="app-reject-modal card-glass" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
                  <div className="reject-header-p">
                     <div className="reject-alert-icon-box" style={{background: '#eef2ff', borderColor: '#e0e7ff'}}>
                        <MessageSquare size={32} color="#6366f1" />
                     </div>
                     <h2>Sharhga javob yozish</h2>
                     <p><b>{replyingTo.parent}</b> ning fikriga rasmiy munosabat bildiring.</p>
                  </div>

                  <div className="reject-input-wrapper">
                     <textarea 
                        className="reject-textarea-premium"
                        placeholder="Javob matnini yozing..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                     />
                  </div>

                  <div className="reject-modal-actions-p">
                     <button className="btn-cancel-p" onClick={() => setReplyingTo(null)}>Bekor qilish</button>
                     <button className="btn-confirm-reject-p" style={{background: '#6366f1', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.2)'}} onClick={submitReply}>
                        Javobni yuborish
                     </button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Pagination Footer - Image Match */}
      <div className="pagination-footer-p card-glass" style={{marginTop: '40px', borderRadius: '24px'}}>
         <div className="p-range-info">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, allReviews.length)} / {allReviews.length}
         </div>
         <div className="p-nav-group">
            <button 
              disabled={currentPage === 1} 
              onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="p-btn-p"
            >
               <ChevronLeft size={16} color="#94a3b8" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
               <button 
                 key={i} 
                 className={`p-btn-p ${currentPage === i + 1 ? 'active' : ''}`}
                 onClick={() => { setCurrentPage(i + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
               >
                  {i + 1}
               </button>
            ))}
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="p-btn-p"
            >
               <ChevronRight size={16} color="#94a3b8" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ParentsReviews;
