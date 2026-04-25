import React, { createContext, useState, useContext, useEffect } from 'react';

const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
  // Initial levels: Level 1 is unlocked (id: 1)
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [completedLevels, setCompletedLevels] = useState([1]);
  const [subscriptionStatus, setSubscriptionStatus] = useState('free'); // 'free' or 'premium'
  const [userXP, setUserXP] = useState(450);
  const [dailyStreak, setDailyStreak] = useState(5); // Kunlik ketma-ket kunlar
  const [badges, setBadges] = useState(['Tez hisoblovchi']); // Medallar
  const [lastActivityDate, setLastActivityDate] = useState(new Date().toDateString()); // Oxirgi faollik

  const unlockLevel = (levelId) => {
    if (!unlockedLevels.includes(levelId)) {
      setUnlockedLevels(prev => [...prev, levelId]);
    }
  };

  const isLevelUnlocked = (levelId) => {
    return unlockedLevels.includes(levelId);
  };

  const isLevelCompleted = (levelId) => {
    return completedLevels.includes(levelId);
  };

  const completeLevel = (levelId) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels(prev => [...prev, levelId]);
    }
  };

  const addXP = (amount) => {
    setUserXP(prev => prev + amount);
  };

  // Yangi: Streak yangilash
  const updateStreak = () => {
    const today = new Date().toDateString();
    if (lastActivityDate !== today) {
      if (new Date(lastActivityDate).getTime() === new Date(today).getTime() - 86400000) {
        setDailyStreak(prev => prev + 1);
      } else {
        setDailyStreak(1);
      }
      setLastActivityDate(today);
    }
  };

  // Yangi: Badge qo'shish
  const earnBadge = (badgeName) => {
    if (!badges.includes(badgeName)) {
      setBadges(prev => [...prev, badgeName]);
    }
  };

  // Yangi: Rank hisoblash (XP ga asosan)
  const getRank = () => {
    if (userXP < 1000) return 'Bronze';
    if (userXP < 2500) return 'Silver';
    if (userXP < 5000) return 'Gold';
    if (userXP < 10000) return 'Platinum';
    return 'Diamond';
  };

  // Yangi: Level hisoblash (XP ga asosan)
  const getCurrentLevel = () => {
    return Math.floor(userXP / 500) + 1; // Har 500 XP da level
  };

  const [userProfile, setUserProfile] = useState({
    name: "O'quvchi",
    avatarIndex: 0
  });

  const updateUserProfile = (name, avatarIndex) => {
    setUserProfile({ name, avatarIndex });
  };

  return (
    <LevelContext.Provider 
      value={{ 
        unlockedLevels, 
        completedLevels,
        subscriptionStatus, 
        userXP,
        dailyStreak,
        badges,
        userProfile,
        rank: getRank(),
        currentLevel: getCurrentLevel(),
        unlockLevel, 
        isLevelUnlocked,
        isLevelCompleted,
        completeLevel,
        addXP,
        updateStreak,
        earnBadge,
        updateUserProfile,
        setSubscriptionStatus
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useLevels = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error('useLevels must be used within a LevelProvider');
  }
  return context;
};
