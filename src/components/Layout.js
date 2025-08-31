import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Heart, TrendingUp, Users, ShoppingBag, Coins, Sparkles } from "lucide-react";

const navigationItems = [
  { title: "Home", url: "/", icon: Home, color: "text-blue-600" },
  { title: "Wellness", url: "/mental-health", icon: Heart, color: "text-emerald-600" },
  { title: "Heroes", url: "/characters", icon: Users, color: "text-purple-600" },
  { title: "Store", url: "/store", icon: ShoppingBag, color: "text-indigo-600" },
  { title: "Progress", url: "/progress", icon: TrendingUp, color: "text-yellow-600" },
  { title: "Journal", url: "/journal", icon: BookOpen, color: "text-pink-600" }
];

export default function Layout({ children }) {
  const location = useLocation();
  const [user, setUser] = useState({
    credits: 1500,
    streak_days: 1,
    level: 1,
    current_rank: 'Academy Student',
    experience: 0
  });

  // FIXED: No more flickering credits - stable display
  const [creditsDisplay, setCreditsDisplay] = useState(1500);

  useEffect(() => {
    loadUserData();

    // FIXED: Less frequent updates to prevent flickering
    const interval = setInterval(() => {
      const savedUser = localStorage.getItem('questifyUser');
      if (savedUser) {
        const newUserData = JSON.parse(savedUser);
        setUser(newUserData);
        // FIXED: Only update display if there's a significant change
        if (Math.abs((newUserData.credits || 0) - creditsDisplay) >= 1) {
          setCreditsDisplay(newUserData.credits || 0);
        }
      }
    }, 1000); // FIXED: Longer interval to prevent flickering

    return () => clearInterval(interval);
  }, [creditsDisplay]);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setCreditsDisplay(userData.credits || 1500);
    } else {
      const initUser = {
        credits: 1500,
        streak_days: 1,
        level: 1,
        current_rank: 'Academy Student',
        total_login_days: 1,
        experience: 0,
        tasks_completed: 0,
        exercises_completed: 0,
        journal_entries: 0,
        last_login_date: new Date().toDateString()
      };
      localStorage.setItem('questifyUser', JSON.stringify(initUser));
      setUser(initUser);
      setCreditsDisplay(1500);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* FIXED CREDITS DISPLAY - NO MORE FLICKERING OR BLACK BAR */}
      <div className="credits-display-fixed">
        <div className="credits-container-fixed">
          <div className="relative">
            <Coins className="w-7 h-7 lg:w-9 lg:h-9 text-yellow-500 animate-bounce-ultimate" />
            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse-ultimate" />
          </div>
          <div className="text-right">
            <div className="credits-number-fixed lg:text-3xl xl:text-4xl">
              {creditsDisplay?.toLocaleString() || 0}
            </div>
            <div className="text-sm lg:text-base text-gray-600 font-bold">Credits</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-32 lg:pb-12 min-h-screen">
        {children}
      </main>

      {/* ULTIMATE BOTTOM NAVIGATION - ZERO RED ELEMENTS */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 shadow-2xl" style={{ 
        background: 'rgba(255, 255, 255, 0.98)', 
        backdropFilter: 'blur(20px)', 
        borderTop: '1px solid rgba(229, 231, 235, 0.8)' 
      }}>
        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex justify-between items-center gap-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    to={item.url}
                    key={item.title}
                    className={`${isActive ? 'nav-item-mobile-active-ultimate' : 'nav-item-mobile-ultimate'} 
                      touch-friendly-ultimate flex-1 group`}
                  >
                    <div style={{ transition: '400ms' }}>
                      <item.icon className={`w-7 h-7 mb-2 ${
                        isActive ? 'text-white animate-bounce-ultimate' : `${item.color}`
                      }`} style={{ transition: '300ms' }} />
                      <span className={`text-xs font-bold ${
                        isActive ? 'text-white' : 'text-gray-700'
                      }`} style={{ transition: '300ms' }}>
                        {item.title}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* PC Navigation */}
        <div className="hidden lg:block">
          <div className="max-w-6xl mx-auto px-8 py-6">
            <div className="flex justify-center items-center gap-10">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    to={item.url}
                    key={item.title}
                    className={`${isActive ? 'nav-item-pc-active-ultimate' : 'nav-item-pc-ultimate'} 
                      group px-8 py-5`}
                  >
                    <div className={`flex flex-col items-center gap-3`} style={{ transition: '400ms' }}>
                      <item.icon className={`w-10 h-10 ${
                        isActive ? 'text-white animate-bounce-ultimate' : `${item.color}`
                      }`} style={{ transition: '300ms' }} />
                      <span className={`text-sm font-black ${
                        isActive ? 'text-white' : 'text-gray-800'
                      }`} style={{ transition: '300ms' }}>
                        {item.title}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Global Notification Area */}
      <div id="notification-area" className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none space-y-3 max-w-md w-full px-4" style={{ zIndex: 200 }}>
      </div>
    </div>
  );
}