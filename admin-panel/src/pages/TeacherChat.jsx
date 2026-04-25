import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Send, Paperclip, MoreVertical, Phone, Video, 
  Smile, User, CheckCheck, Clock, ShieldCheck, ChevronLeft
} from 'lucide-react';
import './TeacherChat.css';

const TeacherChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');

  const chats = [
    { 
      id: 1, 
      name: "Sardor Azimov", 
      specialty: "Mental Arifmetika Pro",
      lastMsg: "Olimpiada natijalari tayyor bo'ldi",
      time: "10:45",
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: "Assalomu alaykum, Sardor aka. Olimpiada natijalari qachon tayyor bo'ladi?", sender: "admin", time: "09:30", status: "read" },
        { id: 2, text: "Va alaykum assalom. Hozir oxirgi tekshiruvlar ketyapti.", sender: "teacher", time: "10:15", status: "received" },
        { id: 3, text: "Olimpiada natijalari tayyor bo'ldi, guruhlarga yuboraversak bo'ladimi?", sender: "teacher", time: "10:45", status: "received" },
      ]
    },
    { 
      id: 2, 
      name: "Guli Aliyeva", 
      specialty: "Tez o'qish va Xotira",
      lastMsg: "Yangi kurs materiallarini yukladim",
      time: "Kecha",
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: "Guli opa, yangi darsliklar bo'yicha savollarim bor edi.", sender: "admin", time: "Kecha 14:00", status: "read" },
        { id: 2, text: "Yangi kurs materiallarini yukladim, ko'rib chiqsangiz bo'ladi.", sender: "teacher", time: "Kecha 16:30", status: "received" },
      ]
    },
    { 
      id: 3, 
      name: "Jasur Hamdamov", 
      specialty: "Mental Arifmetika Nomzod",
      lastMsg: "Ok, tushunarli.",
      time: "Duyshanba",
      unread: 0,
      online: true,
      messages: []
    }
  ];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Mock sending
    setNewMessage('');
  };

  const filteredChats = chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="chat-page-container">
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
           <div className="sidebar-top">
              <h2>Xabarlar</h2>
              <div className="unread-total">3</div>
           </div>
           <div className="chat-search">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Qidirish..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>

        <div className="chat-list">
           {filteredChats.map(chat => (
              <div 
                key={chat.id} 
                className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                 <div className="chat-avatar-wrapper">
                    <div className="chat-avatar">{chat.name.charAt(0)}</div>
                    {chat.online && <div className="online-indicator" />}
                 </div>
                 <div className="chat-item-info">
                    <div className="chat-item-top">
                       <span className="chat-name">{chat.name}</span>
                       <span className="chat-time">{chat.time}</span>
                    </div>
                    <div className="chat-item-bottom">
                       <p className="chat-last-msg">{chat.lastMsg}</p>
                       {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>

      <div className="chat-main">
         {selectedChat ? (
            <div className="chat-room">
               <div className="chat-room-header">
                  <div className="chat-header-user">
                     <div className="chat-avatar mini">{selectedChat.name.charAt(0)}</div>
                     <div className="chat-header-info">
                        <h3>{selectedChat.name} <ShieldCheck size={14} color="#10B981" /></h3>
                        <p>{selectedChat.online ? 'Onlayn' : 'Oflayn'}</p>
                     </div>
                  </div>
                  <div className="chat-header-actions">
                     <button className="h-action-btn"><Phone size={20} /></button>
                     <button className="h-action-btn"><Video size={20} /></button>
                     <button className="h-action-btn"><MoreVertical size={20} /></button>
                  </div>
               </div>

               <div className="chat-messages-area">
                  <div className="msg-date-divider"><span>Bugun</span></div>
                  
                  {selectedChat.messages.map(msg => (
                     <div key={msg.id} className={`msg-bubble-wrapper ${msg.sender}`}>
                        <div className="msg-bubble">
                           <p>{msg.text}</p>
                           <div className="msg-footer">
                              <span className="msg-time">{msg.time}</span>
                              {msg.sender === 'admin' && (
                                 <CheckCheck size={14} color={msg.status === 'read' ? '#10B981' : '#94a3b8'} />
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="chat-input-area">
                  <button className="input-action-btn"><Paperclip size={22} /></button>
                  <div className="chat-input-wrapper">
                     <input 
                       type="text" 
                       placeholder="Xabar yozing..." 
                       value={newMessage}
                       onChange={(e) => setNewMessage(e.target.value)}
                       onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                     />
                     <button className="emoji-btn"><Smile size={22} /></button>
                  </div>
                  <button 
                    className={`send-btn-chat ${newMessage.trim() ? 'active' : ''}`}
                    onClick={handleSend}
                  >
                     <Send size={20} />
                  </button>
               </div>
            </div>
         ) : (
            <div className="chat-empty-state">
               <div className="empty-chat-icon">
                  <MessageSquare size={60} color="#e2e8f0" />
               </div>
               <h3>O'qituvchini tanlang</h3>
               <p>Muloqotni boshlash uchun chap tarafdagi ro'yxatdan o'qituvchini tanlang</p>
            </div>
         )}
      </div>
    </div>
  );
};

const MessageSquare = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default TeacherChat;
