import React, { useState, useEffect } from "react";
import { Trophy, Star, Target, Award, Crown, Zap, Shield, Sword } from "lucide-react";

// EXPANDED ACHIEVEMENTS - MORE AS REQUESTED
const ultimateAchievements = [
  // TASK ACHIEVEMENTS (10)
  { id: 1, name: "First Quest", description: "Complete your very first task", icon: "🥇", rarity: "common", points: 50, credits: 25, requirement: { type: "tasks", value: 1 } },
  { id: 2, name: "Quest Warrior", description: "Complete 10 tasks", icon: "⚔️", rarity: "common", points: 150, credits: 100, requirement: { type: "tasks", value: 10 } },
  { id: 3, name: "Mission Master", description: "Complete 25 tasks", icon: "🎯", rarity: "uncommon", points: 300, credits: 250, requirement: { type: "tasks", value: 25 } },
  { id: 4, name: "Quest Legend", description: "Complete 50 tasks", icon: "🏆", rarity: "rare", points: 500, credits: 400, requirement: { type: "tasks", value: 50 } },
  { id: 5, name: "Task Overlord", description: "Complete 100 tasks", icon: "👑", rarity: "epic", points: 1000, credits: 750, requirement: { type: "tasks", value: 100 } },
  { id: 6, name: "Quest Deity", description: "Complete 200 tasks", icon: "🌟", rarity: "legendary", points: 2000, credits: 1500, requirement: { type: "tasks", value: 200 } },
  { id: 7, name: "Ultimate Achiever", description: "Complete 500 tasks", icon: "💎", rarity: "mythic", points: 5000, credits: 3000, requirement: { type: "tasks", value: 500 } },
  { id: 8, name: "Speed Runner", description: "Complete 5 tasks in one day", icon: "⚡", rarity: "uncommon", points: 200, credits: 150, requirement: { type: "tasks_per_day", value: 5 } },
  { id: 9, name: "Productivity King", description: "Complete 10 tasks in one day", icon: "👑", rarity: "rare", points: 400, credits: 300, requirement: { type: "tasks_per_day", value: 10 } },
  { id: 10, name: "Task Hurricane", description: "Complete 20 tasks in one day", icon: "🌪️", rarity: "epic", points: 800, credentials: 600, requirement: { type: "tasks_per_day", value: 20 } },

  // STREAK ACHIEVEMENTS (8)
  { id: 11, name: "Consistent", description: "Maintain a 3-day streak", icon: "🔥", rarity: "common", points: 75, credits: 50, requirement: { type: "streak", value: 3 } },
  { id: 12, name: "Dedicated", description: "Maintain a 7-day streak", icon: "📅", rarity: "uncommon", points: 200, credits: 150, requirement: { type: "streak", value: 7 } },
  { id: 13, name: "Committed", description: "Maintain a 14-day streak", icon: "💪", rarity: "rare", points: 400, credits: 300, requirement: { type: "streak", value: 14 } },
  { id: 14, name: "Unstoppable", description: "Maintain a 30-day streak", icon: "🚀", rarity: "epic", points: 800, credits: 600, requirement: { type: "streak", value: 30 } },
  { id: 15, name: "Legendary Consistency", description: "Maintain a 60-day streak", icon: "🏅", rarity: "legendary", points: 1500, credits: 1000, requirement: { type: "streak", value: 60 } },
  { id: 16, name: "Immortal Dedication", description: "Maintain a 100-day streak", icon: "♾️", rarity: "mythic", points: 3000, credits: 2000, requirement: { type: "streak", value: 100 } },
  { id: 17, name: "Habit Master", description: "Maintain a 365-day streak", icon: "🌟", rarity: "mythic", points: 10000, credits: 5000, requirement: { type: "streak", value: 365 } },
  { id: 18, name: "Streak Breaker", description: "Restart after losing a 10+ day streak", icon: "💔", rarity: "uncommon", points: 100, credits: 75, requirement: { type: "streak_restart", value: 10 } },

  // MENTAL HEALTH ACHIEVEMENTS (8)
  { id: 19, name: "Mind Explorer", description: "Complete 5 mental health exercises", icon: "🧠", rarity: "common", points: 100, credits: 75, requirement: { type: "exercises", value: 5 } },
  { id: 20, name: "Wellness Warrior", description: "Complete 15 mental health exercises", icon: "🧘", rarity: "uncommon", points: 250, credits: 200, requirement: { type: "exercises", value: 15 } },
  { id: 21, name: "Mental Health Champion", description: "Complete 30 mental health exercises", icon: "💚", rarity: "rare", points: 500, credits: 400, requirement: { type: "exercises", value: 30 } },
  { id: 22, name: "Mindfulness Master", description: "Complete 50 mental health exercises", icon: "✨", rarity: "epic", points: 1000, credits: 750, requirement: { type: "exercises", value: 50 } },
  { id: 23, name: "Zen Master", description: "Complete 100 mental health exercises", icon: "🕉️", rarity: "legendary", points: 2000, credits: 1500, requirement: { type: "exercises", value: 100 } },
  { id: 24, name: "Breathing Expert", description: "Complete 20 breathing exercises", icon: "🫁", rarity: "uncommon", points: 300, credits: 200, requirement: { type: "breathing_exercises", value: 20 } },
  { id: 25, name: "Meditation Monk", description: "Complete 25 meditation exercises", icon: "🧘‍♂️", rarity: "rare", points: 400, credits: 300, requirement: { type: "meditation_exercises", value: 25 } },
  { id: 26, name: "Daily Meditator", description: "Complete exercises for 30 consecutive days", icon: "📿", rarity: "epic", points: 800, credits: 600, requirement: { type: "exercise_streak", value: 30 } },

  // CHARACTER ACHIEVEMENTS (8)
  { id: 27, name: "First Hero", description: "Obtain your first character", icon: "⭐", rarity: "common", points: 50, credits: 25, requirement: { type: "characters", value: 1 } },
  { id: 28, name: "Collector", description: "Obtain 5 characters", icon: "📚", rarity: "common", points: 150, credits: 100, requirement: { type: "characters", value: 5 } },
  { id: 29, name: "Character Hoarder", description: "Obtain 15 characters", icon: "🎭", rarity: "uncommon", points: 300, credits: 250, requirement: { type: "characters", value: 15 } },
  { id: 30, name: "Elite Collector", description: "Obtain 30 characters", icon: "🏆", rarity: "rare", points: 600, credits: 450, requirement: { type: "characters", value: 30 } },
  { id: 31, name: "Character Master", description: "Obtain 50 characters", icon: "👑", rarity: "epic", points: 1200, credits: 900, requirement: { type: "characters", value: 50 } },
  { id: 32, name: "Legendary Hunter", description: "Obtain 5 legendary+ characters", icon: "🌟", rarity: "rare", points: 500, credits: 400, requirement: { type: "legendary_characters", value: 5 } },
  { id: 33, name: "Mythic Collector", description: "Obtain 3 mythic characters", icon: "💎", rarity: "legendary", points: 1500, credits: 1000, requirement: { type: "mythic_characters", value: 3 } },
  { id: 34, name: "Gacha God", description: "Open 100 crates", icon: "🎰", rarity: "epic", points: 800, credits: 600, requirement: { type: "crates_opened", value: 100 } },

  // CREDITS ACHIEVEMENTS (6)
  { id: 35, name: "Penny Saver", description: "Accumulate 1,000 credits", icon: "🪙", rarity: "common", points: 100, credits: 50, requirement: { type: "total_credits", value: 1000 } },
  { id: 36, name: "Credit Collector", description: "Accumulate 5,000 credits", icon: "💰", rarity: "uncommon", points: 250, credits: 150, requirement: { type: "total_credits", value: 5000 } },
  { id: 37, name: "Wealthy Warrior", description: "Accumulate 15,000 credits", icon: "💸", rarity: "rare", points: 500, credits: 350, requirement: { type: "total_credits", value: 15000 } },
  { id: 38, name: "Credit King", description: "Accumulate 50,000 credits", icon: "👑", rarity: "epic", points: 1000, credits: 750, requirement: { type: "total_credits", value: 50000 } },
  { id: 39, name: "Millionaire", description: "Accumulate 100,000 credits", icon: "💎", rarity: "legendary", points: 2000, credits: 1500, requirement: { type: "total_credits", value: 100000 } },
  { id: 40, name: "Big Spender", description: "Spend 10,000 credits in store", icon: "🛒", rarity: "rare", points: 400, credits: 300, requirement: { type: "credits_spent", value: 10000 } },

  // JOURNAL ACHIEVEMENTS (4)
  { id: 41, name: "First Entry", description: "Write your first journal entry", icon: "📝", rarity: "common", points: 50, credits: 25, requirement: { type: "journal_entries", value: 1 } },
  { id: 42, name: "Thoughtful Writer", description: "Write 10 journal entries", icon: "✍️", rarity: "uncommon", points: 200, credits: 150, requirement: { type: "journal_entries", value: 10 } },
  { id: 43, name: "Journal Master", description: "Write 50 journal entries", icon: "📖", rarity: "rare", points: 500, credits: 400, requirement: { type: "journal_entries", value: 50 } },
  { id: 44, name: "Wordsmith", description: "Write 10,000 total words", icon: "📚", rarity: "epic", points: 800, credits: 600, requirement: { type: "total_words", value: 10000 } },

  // SPECIAL ACHIEVEMENTS (6)
  { id: 45, name: "Early Bird", description: "Complete tasks before 8 AM", icon: "🌅", rarity: "uncommon", points: 150, credits: 100, requirement: { type: "early_completion", value: 1 } },
  { id: 46, name: "Night Owl", description: "Complete tasks after 10 PM", icon: "🦉", rarity: "uncommon", points: 150, credits: 100, requirement: { type: "late_completion", value: 1 } },
  { id: 47, name: "Perfect Week", description: "Complete at least one task every day for a week", icon: "⭐", rarity: "rare", points: 400, credits: 300, requirement: { type: "perfect_week", value: 1 } },
  { id: 48, name: "Spin Master", description: "Use the spin wheel 20 times", icon: "🎰", rarity: "uncommon", points: 200, credits: 150, requirement: { type: "spins", value: 20 } },
  { id: 49, name: "Lucky Spinner", description: "Win a mythic character from spin wheel", icon: "🍀", rarity: "legendary", points: 1500, credits: 1000, requirement: { type: "lucky_spin", value: 1 } },
  { id: 50, name: "Ultimate Champion", description: "Unlock all other achievements", icon: "🏆", rarity: "mythic", points: 10000, credits: 5000, requirement: { type: "all_achievements", value: 49 } }
];

// EXPANDED RANK SYSTEM - MORE RANKS AS REQUESTED
const ultimateRanks = [
  { name: 'Academy Student', min: 0, emoji: '🎓', color: 'text-gray-600', bgColor: 'bg-gray-100', description: 'Beginning your journey of self-improvement' },
  { name: 'Genin', min: 5, emoji: '🥉', color: 'text-emerald-600', bgColor: 'bg-emerald-100', description: 'Low-level ninja with basic skills' },
  { name: 'Chunin', min: 15, emoji: '🥈', color: 'text-blue-600', bgColor: 'bg-blue-100', description: 'Mid-level ninja with leadership qualities' },
  { name: 'Special Chunin', min: 25, emoji: '🎖️', color: 'text-indigo-600', bgColor: 'bg-indigo-100', description: 'Specialized chunin with unique abilities' },
  { name: 'Jonin', min: 40, emoji: '🥇', color: 'text-purple-600', bgColor: 'bg-purple-100', description: 'Elite ninja capable of leading missions' },
  { name: 'Special Jonin', min: 60, emoji: '🏅', color: 'text-pink-600', bgColor: 'bg-pink-100', description: 'Jonin with specialized techniques' },
  { name: 'Elite Jonin', min: 80, emoji: '⭐', color: 'text-red-600', bgColor: 'bg-red-100', description: 'Top-tier jonin with exceptional skills' },
  { name: 'ANBU', min: 110, emoji: '🎭', color: 'text-gray-700', bgColor: 'bg-gray-200', description: 'Secret black ops specialist' },
  { name: 'ANBU Captain', min: 150, emoji: '👺', color: 'text-red-700', bgColor: 'bg-red-200', description: 'Leader of ANBU operations' },
  { name: 'ANBU Commander', min: 200, emoji: '⚔️', color: 'text-slate-700', bgColor: 'bg-slate-200', description: 'Supreme commander of black ops' },
  { name: 'Sannin', min: 250, emoji: '🐉', color: 'text-cyan-600', bgColor: 'bg-cyan-100', description: 'One of the legendary three ninjas' },
  { name: 'Kage', min: 350, emoji: '👑', color: 'text-yellow-600', bgColor: 'bg-yellow-100', description: 'Leader of a hidden village' },
  { name: 'Hokage', min: 450, emoji: '🔥', color: 'text-orange-600', bgColor: 'bg-orange-100', description: 'Leader of the Leaf Village' },
  { name: 'Legendary Shinobi', min: 600, emoji: '⚡', color: 'text-violet-600', bgColor: 'bg-violet-100', description: 'Ninja of legendary status and power' },
  { name: 'Sage', min: 800, emoji: '🧙‍♂️', color: 'text-emerald-700', bgColor: 'bg-emerald-200', description: 'Master of natural energy and sage arts' },
  { name: 'Tailed Beast Sage', min: 1000, emoji: '🦊', color: 'text-amber-600', bgColor: 'bg-amber-100', description: 'One who controls tailed beast power' },
  { name: 'Six Paths Sage', min: 1500, emoji: '🌌', color: 'text-purple-700', bgColor: 'bg-purple-200', description: 'Successor to the Sage of Six Paths' },
  { name: 'God of Shinobi', min: 2000, emoji: '👑', color: 'text-gold-600', bgColor: 'bg-gold-100', description: 'Transcendent being beyond mortal limits' },
  { name: 'Dimensional Guardian', min: 3000, emoji: '🌠', color: 'text-cosmic-600', bgColor: 'bg-cosmic-100', description: 'Protector of multiple dimensions' },
  { name: 'Eternal Champion', min: 5000, emoji: '♾️', color: 'text-rainbow', bgColor: 'bg-gradient-to-r from-purple-200 to-pink-200', description: 'Ultimate achievement in self-mastery' }
];

export default function Progress() {
  const [user, setUser] = useState({});
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setUnlockedAchievements(getUnlockedAchievements(userData));
    }
  };

  const getUnlockedAchievements = (userStats) => {
    return ultimateAchievements.filter(achievement => {
      const { type, value } = achievement.requirement;
      switch (type) {
        case "tasks":
          return (userStats.tasks_completed || 0) >= value;
        case "streak":
          return (userStats.streak_days || 0) >= value;
        case "exercises":
          return (userStats.exercises_completed || 0) >= value;
        case "characters":
          return (userStats.characters_owned?.length || 0) >= value;
        case "journal_entries":
          return (userStats.journal_entries || 0) >= value;
        case "total_credits":
          return (userStats.total_credits_earned || 0) >= value;
        case "legendary_characters":
          return (userStats.characters_owned?.filter(c => c.rarity === 'legendary' || c.rarity === 'mythic').length || 0) >= value;
        case "mythic_characters":
          return (userStats.characters_owned?.filter(c => c.rarity === 'mythic').length || 0) >= value;
        default:
          return false;
      }
    });
  };

  const getCurrentRank = () => {
    const tasksCompleted = user.tasks_completed || 0;
    for (let i = ultimateRanks.length - 1; i >= 0; i--) {
      if (tasksCompleted >= ultimateRanks[i].min) {
        return ultimateRanks[i];
      }
    }
    return ultimateRanks[0];
  };

  const categories = ["all", "tasks", "streak", "mental", "characters", "credits", "journal", "special"];

  const filteredAchievements = ultimateAchievements.filter(achievement => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "tasks") return achievement.requirement.type.includes("task");
    if (selectedCategory === "streak") return achievement.requirement.type.includes("streak");
    if (selectedCategory === "mental") return achievement.requirement.type.includes("exercise");
    if (selectedCategory === "characters") return achievement.requirement.type.includes("character") || achievement.requirement.type.includes("crate");
    if (selectedCategory === "credits") return achievement.requirement.type.includes("credit");
    if (selectedCategory === "journal") return achievement.requirement.type.includes("journal") || achievement.requirement.type.includes("word");
    if (selectedCategory === "special") return ["early_completion", "late_completion", "perfect_week", "spin", "lucky_spin", "all_achievements"].includes(achievement.requirement.type);
    return false;
  });

  const currentRank = getCurrentRank();
  const nextRank = ultimateRanks[ultimateRanks.findIndex(r => r.name === currentRank.name) + 1];

  const getRarityClass = (rarity) => {
    const classes = {
      common: 'border-gray-300 bg-gradient-to-br from-gray-50 to-white',
      uncommon: 'border-green-300 bg-gradient-to-br from-green-50 to-white',
      rare: 'border-blue-300 bg-gradient-to-br from-blue-50 to-white',
      epic: 'border-purple-300 bg-gradient-to-br from-purple-50 to-white',
      legendary: 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-white',
      mythic: 'border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 animate-rainbow-ultimate'
    };
    return classes[rarity] || classes.common;
  };

  return (
    <div style={{ background: '#ffffff' }}>
      <div className="page-header-ultimate">
        <h1 className="page-title-ultimate">
          🏆 Progress & Achievements
        </h1>
        <p className="page-subtitle-ultimate">
          Track your legendary journey with 50+ achievements and 20 ranks!
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 bottom-safe-ultimate">
        <div className="mobile-container-ultimate">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
            <div className="stat-card-ultimate">
              <Trophy className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-500 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{unlockedAchievements.length}</div>
              <div className="text-gray-600 font-bold">Unlocked</div>
            </div>
            <div className="stat-card-ultimate">
              <Target className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mx-auto mb-4 animate-pulse-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{ultimateAchievements.length}</div>
              <div className="text-gray-600 font-bold">Total</div>
            </div>
            <div className="stat-card-ultimate">
              <Crown className="w-12 h-12 lg:w-16 lg:h-16 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{ultimateRanks.length}</div>
              <div className="text-gray-600 font-bold">Ranks</div>
            </div>
            <div className="stat-card-ultimate">
              <Star className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">
                {Math.round((unlockedAchievements.length / ultimateAchievements.length) * 100)}%
              </div>
              <div className="text-gray-600 font-bold">Complete</div>
            </div>
          </div>

          <div className="questify-card-premium-ultimate p-10 lg:p-12 mb-12" style={{ transition: '500ms' }}>
            <h2 className="text-3xl lg:text-4xl font-black gradient-text-ultimate mb-8 text-center">👑 Current Rank</h2>
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
              <div className="text-center">
                <div className={`w-32 h-32 lg:w-40 lg:h-40 ${currentRank.bgColor} rounded-full flex items-center justify-center shadow-2xl mb-6`}>
                  <span className="text-6xl lg:text-7xl animate-bounce-ultimate">{currentRank.emoji}</span>
                </div>
                <h3 className={`text-2xl lg:text-3xl font-black text-gray-900 mb-3`}>
                  {currentRank.name}
                </h3>
                <p className="text-gray-600 text-lg lg:text-xl">{currentRank.description}</p>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6">
                  <div className="text-4xl lg:text-5xl font-black text-gray-800 mb-2">{user.tasks_completed || 0} Quests</div>
                  <div className="text-gray-600 text-lg">Completed Successfully</div>
                </div>

                {nextRank && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
                    <div className="text-lg font-bold text-gray-800 mb-2">Next Rank: {nextRank.emoji} {nextRank.name}</div>
                    <div className="text-gray-600 mb-3">{nextRank.description}</div>
                    <div className="text-gray-600">Complete {nextRank.min - (user.tasks_completed || 0)} more quests</div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                        style={{ 
                          width: `${Math.min(((user.tasks_completed || 0) / nextRank.min) * 100, 100)}%`,
                          transition: '1000ms'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ACHIEVEMENT CATEGORIES */}
          <div className="questify-card-ultimate p-8 lg:p-10 mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Filter Achievements:</h3>
            <div className="flex flex-wrap gap-3 lg:gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-6 py-3 rounded-2xl font-bold text-gray-900 shadow-xl capitalize"
                  style={{
                    background: selectedCategory === category 
                      ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' 
                      : '#f3f4f6',
                    color: selectedCategory === category ? 'white' : '#4b5563',
                    transition: '300ms'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {filteredAchievements.map(achievement => {
              const isUnlocked = unlockedAchievements.some(ua => ua.id === achievement.id);
              return (
                <div 
                  key={achievement.id} 
                  className={`questify-card-ultimate border-2 ${getRarityClass(achievement.rarity)} ${
                    isUnlocked ? 'achievement-unlocked' : 'achievement-locked'
                  }`}
                  style={{ 
                    transition: '500ms',
                    minHeight: '300px'
                  }}
                >
                  <div className="p-6 lg:p-8 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shadow-2xl" style={{
                          background: isUnlocked ? 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)' : '#d1d5db'
                        }}>
                          <span className="text-3xl lg:text-4xl animate-bounce-ultimate">{achievement.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg lg:text-xl font-black text-gray-800 mb-2">{achievement.name}</h3>
                          <div className={`inline-block px-3 py-1 rounded-xl text-xs font-black uppercase ${getRarityClass(achievement.rarity)}`}>
                            {achievement.rarity}
                          </div>
                        </div>
                      </div>
                      {isUnlocked && (
                        <Award className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500 animate-pulse-ultimate" />
                      )}
                    </div>

                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6 font-medium flex-grow">{achievement.description}</p>

                    <div className="flex justify-between items-center text-base lg:text-lg">
                      <span className="text-emerald-600 font-black">+{achievement.credits} credits</span>
                      <div className={`px-4 py-2 rounded-xl text-sm font-black ${
                        isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}