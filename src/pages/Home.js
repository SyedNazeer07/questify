import React, { useState, useEffect } from "react";
import { Calendar, Target, Trophy, Zap, Plus, CheckCircle, Coins, Star, Crown, TrendingUp, Sparkles, Award } from "lucide-react";

const dailyQuotes = [
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", emoji: "💪" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", emoji: "❤️" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", emoji: "🌟" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", emoji: "✨" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", emoji: "🔆" }
];

const dailyAffirmations = [
  "I am capable of achieving extraordinary things through consistent action",
  "I choose to see challenges as opportunities for growth and learning",
  "I am worthy of love, success, and all good things life has to offer",
  "My potential is limitless and I embrace new possibilities every day",
  "I trust in my ability to create positive change in my life"
];

// EXPANDED RANKS AS REQUESTED
const ranks = [
  { name: 'Academy Student', min: 0, emoji: '🎓', color: 'text-gray-600' },
  { name: 'Genin', min: 5, emoji: '🥉', color: 'text-emerald-600' },
  { name: 'Chunin', min: 15, emoji: '🥈', color: 'text-blue-600' },
  { name: 'Special Jonin', min: 25, emoji: '🎖️', color: 'text-indigo-600' },
  { name: 'Jonin', min: 35, emoji: '🥇', color: 'text-purple-600' },
  { name: 'Elite Jonin', min: 50, emoji: '🏅', color: 'text-pink-600' },
  { name: 'ANBU', min: 75, emoji: '🎭', color: 'text-red-600' },
  { name: 'ANBU Captain', min: 100, emoji: '👺', color: 'text-orange-600' },
  { name: 'Sannin', min: 150, emoji: '🐉', color: 'text-cyan-600' },
  { name: 'Kage', min: 200, emoji: '👑', color: 'text-yellow-600' },
  { name: 'Legendary Shinobi', min: 300, emoji: '⚡', color: 'text-violet-600' },
  { name: 'Sage of Six Paths', min: 500, emoji: '🌌', color: 'text-amber-600' }
];

export default function Home() {
  const [user, setUser] = useState({
    credits: 1500,
    streak_days: 1,
    tasks_completed: 0,
    level: 1,
    current_rank: 'Academy Student',
    total_login_days: 1,
    experience: 0
  });

  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", priority: "medium" });

  const getDailyContent = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    const quoteIndex = dayOfYear % dailyQuotes.length;
    const affirmationIndex = dayOfYear % dailyAffirmations.length;

    return {
      quote: dailyQuotes[quoteIndex],
      affirmation: dailyAffirmations[affirmationIndex]
    };
  };

  const { quote: dailyQuote, affirmation: dailyAffirmation } = getDailyContent();

  useEffect(() => {
    loadUserData();
    loadTasks();
    updateStreakAndProgress();
  }, []);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const correctedRank = getCurrentRank(userData.tasks_completed || 0);
      if (userData.current_rank !== correctedRank.name) {
        userData.current_rank = correctedRank.name;
        localStorage.setItem('questifyUser', JSON.stringify(userData));
      }
      setUser(userData);
    } else {
      const initUser = {
        credits: 1500,
        streak_days: 1,
        tasks_completed: 0,
        level: 1,
        current_rank: 'Academy Student',
        total_login_days: 1,
        experience: 0,
        exercises_completed: 0,
        journal_entries: 0,
        last_login_date: new Date().toDateString(),
        first_login_date: new Date().toDateString()
      };
      localStorage.setItem('questifyUser', JSON.stringify(initUser));
      setUser(initUser);
    }
  };

  const loadTasks = () => {
    const savedTasks = localStorage.getItem('questifyTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const updateStreakAndProgress = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (!savedUser) return;

    const userData = JSON.parse(savedUser);
    const today = new Date().toDateString();
    const lastLogin = userData.last_login_date || today;
    const firstLogin = userData.first_login_date || today;

    let updatedUser = { ...userData };

    const firstLoginDate = new Date(firstLogin);
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate - firstLoginDate) / (1000 * 60 * 60 * 24)) + 1;
    updatedUser.total_login_days = Math.max(daysDifference, userData.total_login_days || 1);

    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastLogin === yesterdayStr) {
        updatedUser.streak_days = (userData.streak_days || 0) + 1;
      } else if (lastLogin !== today) {
        updatedUser.streak_days = 1;
      }

      updatedUser.last_login_date = today;
      localStorage.setItem('questifyUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const saveTasks = (updatedTasks) => {
    localStorage.setItem('questifyTasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      priority: newTask.priority,
      completed: false,
      created: new Date().toISOString(),
      credits_reward: newTask.priority === 'high' ? 30 : newTask.priority === 'medium' ? 20 : 15
    };

    saveTasks([task, ...tasks]);
    setNewTask({ title: "", priority: "medium" });
    setShowTaskForm(false);
  };

  const completeTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const savedUser = localStorage.getItem('questifyUser');
    const currentUser = savedUser ? JSON.parse(savedUser) : user;

    const newTasksCompleted = (currentUser.tasks_completed || 0) + 1;
    const newExperience = (currentUser.experience || 0) + task.credits_reward;
    const newLevel = Math.floor(newExperience / 100) + 1;
    const newRank = getCurrentRank(newTasksCompleted);

    const updatedUser = {
      ...currentUser,
      credits: (currentUser.credits || 0) + task.credits_reward,
      tasks_completed: newTasksCompleted,
      experience: newExperience,
      level: newLevel,
      current_rank: newRank.name
    };

    if (newLevel > (currentUser.level || 1)) {
      showInAppNotification(`🎉 LEVEL UP! You are now Level ${newLevel}!`, "success");
    }

    if (newRank.name !== currentUser.current_rank) {
      showInAppNotification(`🏆 RANK UP! You are now ${newRank.name}! ${newRank.emoji}`, "success");
    }

    localStorage.setItem('questifyUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    saveTasks(tasks.filter(t => t.id !== taskId));

    showInAppNotification(`✅ Quest completed! +${task.credits_reward} credits earned!`, "success");
  };

  const showInAppNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = 'animate-slide-down-ultimate px-8 py-5 rounded-2xl font-bold text-white shadow-2xl mb-3';
    notification.style.background = type === 'success' ? 'linear-gradient(to right, #10b981, #0d9488)' : 'linear-gradient(to right, #4b5563, #374151)';
    notification.style.zIndex = '200';
    notification.textContent = message;

    const area = document.getElementById('notification-area');
    if (area) {
      area.appendChild(notification);
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 4000);
    }
  };

  const getCurrentRank = (tasksCompleted) => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (tasksCompleted >= ranks[i].min) {
        return ranks[i];
      }
    }
    return ranks[0];
  };

  const currentRank = getCurrentRank(user.tasks_completed || 0);
  const nextRank = ranks[ranks.findIndex(r => r.name === currentRank.name) + 1];

  return (
    <div style={{ background: '#ffffff' }}>
      {/* FIXED QUESTIFY HEADER - NO BACKGROUND, ANIMATED EMOJIS AS REQUESTED */}
      <div className="page-header-ultimate">
        <div className="flex items-center justify-center gap-4 lg:gap-6 mb-6">
          <div className="text-5xl lg:text-7xl animate-header-emoji-dance">🎯</div>
          <h1 className="page-title-ultimate">
            <span className="gradient-text-ultimate animate-rainbow-ultimate">
              QUESTIFY
            </span>
          </h1>
          <div className="text-5xl lg:text-7xl animate-header-emoji-dance">✨</div>
        </div>
        <p className="page-subtitle-ultimate">
          Level Up Your Life with Ultimate Power 🚀
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 bottom-safe-ultimate">
        <div className="mobile-container-ultimate">
          <div className="text-center mb-10 animate-fade-in-ultimate">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 mb-6">
              Welcome Back, Hero! 🔥
            </h2>
            <p className="text-gray-600 mobile-text-sm-ultimate">Ready to conquer your destiny today?</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            <div className="stat-card-ultimate">
              <Calendar className="w-10 h-10 sm:w-14 sm:h-14 text-blue-600 mx-auto mb-4 animate-pulse-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{user.total_login_days || 1}</div>
              <div className="text-gray-600 font-bold">Total Days</div>
            </div>

            <div className="stat-card-ultimate">
              <Zap className="w-10 h-10 sm:w-14 sm:h-14 text-orange-500 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-orange-600">{user.streak_days || 1}</div>
              <div className="text-gray-600 font-bold">Day Streak</div>
            </div>

            <div className="stat-card-ultimate">
              <Target className="w-10 h-10 sm:w-14 sm:h-14 text-emerald-600 mx-auto mb-4 animate-pulse-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{user.tasks_completed || 0}</div>
              <div className="text-gray-600 font-bold">Quests Done</div>
            </div>

            <div className="stat-card-ultimate">
              <Trophy className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{user.level || 1}</div>
              <div className="text-gray-600 font-bold">Level</div>
            </div>
          </div>

          <div className="questify-card-premium-ultimate p-8 sm:p-10 lg:p-12 mb-12" style={{ transition: '500ms' }}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 sm:gap-8 flex-1">
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-5xl sm:text-6xl lg:text-7xl animate-bounce-ultimate">{currentRank?.emoji || '🎓'}</span>
                </div>
                <div className="text-center lg:text-left">
                  {/* ONLY CHANGE: force rank name to black and add safe fallback */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-3">
                    👑 {currentRank?.name || "Academy Student"}
                  </h3>
                  <p className="text-gray-600 mobile-text-sm-ultimate mb-4">
                    Level {user.level || 1} • {user.experience || 0} XP • {user.tasks_completed || 0} Quests
                  </p>

                  <div className="w-full max-w-md bg-gray-200 rounded-full h-6 lg:h-8 mb-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 lg:h-8 rounded-full flex items-center justify-end pr-3"
                      style={{ 
                        width: `${(((user.experience || 0) % 100) / 100) * 100}%`,
                        transition: '1000ms'
                      }}
                    >
                      <Star className="w-4 h-4 lg:w-6 lg:h-6 text-white animate-pulse-ultimate" />
                    </div>
                  </div>
                  <div className="text-sm lg:text-base text-gray-500 font-bold">
                    {(user.experience || 0) % 100} / 100 XP to next level
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800 flex items-center justify-center gap-3 mb-3">
                  <Coins className="w-10 h-10 lg:w-12 lg:h-12 text-yellow-500 animate-bounce-ultimate" />
                  {(user.credits || 0).toLocaleString()}
                </div>
                <div className="text-gray-600 font-bold text-lg">Credits Available</div>
                {nextRank && (
                  <div className="text-sm lg:text-base text-gray-500 mt-3 font-semibold">
                    Next: {nextRank.emoji} {nextRank.name} ({nextRank.min - (user.tasks_completed || 0)} quests to go)
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-12">
            <div className="questify-card-ultimate bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 p-8 sm:p-10" style={{ transition: '500ms' }}>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <span>{dailyQuote.emoji}</span> Daily Motivation
              </h3>
              <blockquote className="text-gray-800 mobile-text-sm-ultimate lg:text-xl xl:text-2xl mb-6 italic leading-relaxed font-medium">
                "{dailyQuote.text}"
              </blockquote>
              <cite className="text-blue-600 font-black text-lg">— {dailyQuote.author}</cite>
            </div>

            <div className="questify-card-ultimate bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 p-8 sm:p-10" style={{ transition: '500ms' }}>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-800 mb-6">✨ Daily Affirmation</h3>
              <p className="text-purple-800 mobile-text-sm-ultimate lg:text-xl xl:text-2xl font-black text-center leading-relaxed">
                {dailyAffirmation}
              </p>
            </div>
          </div>

          <div className="questify-card-ultimate p-8 sm:p-10 mb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-800 flex items-center gap-3">
                🎯 Today's Epic Quests
              </h2>
              <button
                onClick={() => setShowTaskForm(!showTaskForm)}
                className="questify-button-ultimate flex items-center gap-3 touch-friendly-ultimate"
              >
                <Plus className="w-6 h-6" />
                Add Quest
              </button>
            </div>

            {showTaskForm && (
              <div className="mb-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-200 animate-slide-up-ultimate">
                <form onSubmit={addTask} className="space-y-6">
                  <input
                    type="text"
                    placeholder="What's your epic quest today?"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="questify-input-ultimate text-lg"
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-6">
                    <select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      className="questify-input-ultimate text-lg"
                    >
                      <option value="low">🟢 Easy Quest (+15 credits)</option>
                      <option value="medium">🟡 Medium Quest (+20 credits)</option>
                      <option value="high">🟠 Hard Quest (+30 credits)</option>
                    </select>
                    <div className="flex gap-4">
                      <button type="submit" className="questify-button-success-ultimate touch-friendly-ultimate">
                        Create Quest
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowTaskForm(false)}
                        className="bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-300 touch-friendly-ultimate"
                        style={{ transition: '300ms' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-6">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="flex items-center gap-6 p-6 sm:p-8 questify-card-ultimate"
                  style={{ animationDelay: `${index * 0.1}s`, transition: '500ms' }}
                >
                  <button
                    onClick={() => completeTask(task.id)}
                    className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 p-4 rounded-2xl touch-friendly-ultimate animate-pulse-ultimate"
                    style={{ transition: '300ms' }}
                  >
                    <CheckCircle className="w-8 h-8 lg:w-9 lg:h-9" />
                  </button>

                  <div className="flex-1">
                    <h3 className="font-black text-gray-800 mobile-text-sm-ultimate lg:text-xl">{task.title}</h3>
                    <div className="text-sm lg:text-base text-gray-500 flex items-center gap-3 mt-2">
                      <span className="capitalize font-semibold">{task.priority} priority</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-black">+{task.credits_reward} credits</span>
                    </div>
                  </div>

                  <div className={`px-4 py-2 rounded-2xl text-sm font-black ${
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {task.priority}
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-16 animate-fade-in-ultimate">
                  <span className="text-7xl lg:text-9xl mb-6 block animate-float-ultimate">🎯</span>
                  <h3 className="text-2xl lg:text-3xl text-gray-800 mb-4 font-black">Ready for Epic Adventures!</h3>
                  <p className="text-gray-600 mobile-text-sm-ultimate mb-8">Create your first quest and start your legendary journey!</p>
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="questify-button-ultimate"
                  >
                    <Plus className="w-6 h-6 mr-2" />
                    Start Your First Quest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
