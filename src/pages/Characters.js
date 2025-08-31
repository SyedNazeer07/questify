import React, { useState, useEffect } from "react";
import { Package, Star, Coins, Users, Zap, Gift } from "lucide-react";

// EXPANDED CHARACTER LIST
const ultimateAnimeCharacters = [
  { id: 1, name: "Satoru Gojo", series: "Jujutsu Kaisen", ovr: 100, rarity: "mythic", attack: 100, defense: 95, speed: 98, special: 100, cost: 5000, icon: "🔮" },
  { id: 2, name: "Sukuna", series: "Jujutsu Kaisen", ovr: 99, rarity: "mythic", attack: 100, defense: 92, speed: 95, special: 100, cost: 4800, icon: "😈" },
  { id: 3, name: "Son Goku", series: "Dragon Ball", ovr: 99, rarity: "mythic", attack: 100, defense: 88, speed: 96, special: 100, cost: 4800, icon: "🥋" },
  { id: 4, name: "Levi Ackerman", series: "Attack on Titan", ovr: 98, rarity: "mythic", attack: 100, defense: 85, speed: 100, special: 95, cost: 4000, icon: "⚔️" },
  { id: 5, name: "Shanks", series: "One Piece", ovr: 98, rarity: "mythic", attack: 95, defense: 88, speed: 90, special: 100, cost: 4500, icon: "🦈" },
  { id: 6, name: "Itachi Uchiha", series: "Naruto", ovr: 94, rarity: "legendary", attack: 92, defense: 78, speed: 88, special: 98, cost: 3400, icon: "🔥" },
  { id: 7, name: "Tanjiro Kamado", series: "Demon Slayer", ovr: 89, rarity: "epic", attack: 88, defense: 82, speed: 85, special: 95, cost: 2400, icon: "🌊" },
  { id: 8, name: "Katsuki Bakugo", series: "My Hero Academia", ovr: 87, rarity: "rare", attack: 95, defense: 80, speed: 88, special: 85, cost: 2300, icon: "💥" },
  { id: 9, name: "Kakashi Hatake", series: "Naruto", ovr: 90, rarity: "legendary", attack: 88, defense: 85, speed: 90, special: 95, cost: 3200, icon: "👁️" },
  { id: 10, name: "Mikasa Ackerman", series: "Attack on Titan", ovr: 92, rarity: "legendary", attack: 95, defense: 90, speed: 92, special: 88, cost: 3600, icon: "🗡️" },
  { id: 11, name: "Leorio Paradinight", series: "Hunter x Hunter", ovr: 75, rarity: "uncommon", attack: 78, defense: 82, speed: 70, special: 75, cost: 1800, icon: "👨‍⚕️" },
  { id: 12, name: "Nezuko Kamado", series: "Demon Slayer", ovr: 86, rarity: "rare", attack: 85, defense: 88, speed: 87, special: 82, cost: 2100, icon: "🌸" }
];

// 6 CRATE TYPES AS REQUESTED
const crateTypes = [
  {
    id: "wooden",
    name: "Wooden Crate",
    cost: 100,
    color: "from-amber-700 to-yellow-800",
    emoji: "📦",
    description: "Basic wooden crate with common drops",
    dropRates: { uncommon: 70, rare: 25, epic: 5 },
    glowColor: "rgba(245, 158, 11, 0.3)"
  },
  {
    id: "bronze",
    name: "Bronze Crate",
    cost: 200,
    color: "from-amber-600 to-yellow-700",
    emoji: "🎁",
    description: "Bronze reinforced crate with better odds",
    dropRates: { rare: 50, epic: 35, legendary: 15 },
    glowColor: "rgba(217, 119, 6, 0.3)"
  },
  {
    id: "silver",
    name: "Silver Crate", 
    cost: 400,
    color: "from-gray-400 to-gray-600",
    emoji: "💎",
    description: "Silver crate with enhanced drops",
    dropRates: { rare: 35, epic: 45, legendary: 20 },
    glowColor: "rgba(156, 163, 175, 0.3)"
  },
  {
    id: "gold",
    name: "Gold Crate",
    cost: 800,
    color: "from-yellow-400 to-yellow-600", 
    emoji: "✨",
    description: "Premium gold crate with legendary drops",
    dropRates: { epic: 25, legendary: 55, mythic: 20 },
    glowColor: "rgba(251, 191, 36, 0.3)"
  },
  {
    id: "platinum",
    name: "Platinum Crate",
    cost: 1500,
    color: "from-blue-400 to-purple-500",
    emoji: "🌟",
    description: "Rare platinum crate with mythic potential",
    dropRates: { epic: 15, legendary: 45, mythic: 40 },
    glowColor: "rgba(147, 51, 234, 0.3)"
  },
  {
    id: "diamond",
    name: "Diamond Crate",
    cost: 3000,
    color: "from-pink-400 to-purple-600",
    emoji: "💠",
    description: "Ultimate diamond crate - guaranteed mythic!",
    dropRates: { legendary: 20, mythic: 80 },
    glowColor: "rgba(236, 72, 153, 0.3)"
  }
];

// SPIN WHEEL REWARDS
const spinWheelRewards = [
  { type: "credits", value: 100, emoji: "🪙", color: "#10b981" },
  { type: "credits", value: 250, emoji: "💰", color: "#3b82f6" },
  { type: "credits", value: 500, emoji: "💎", color: "#8b5cf6" },
  { type: "crate", value: "wooden", emoji: "📦", color: "#f59e0b" },
  { type: "crate", value: "bronze", emoji: "🎁", color: "#d97706" },
  { type: "crate", value: "silver", emoji: "💎", color: "#6b7280" }
];

export default function Characters() {
  const [user, setUser] = useState({ credits: 1500, characters_owned: [] });
  const [ownedCharacters, setOwnedCharacters] = useState([]);
  const [selectedTab, setSelectedTab] = useState('crates');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpinTime, setLastSpinTime] = useState(null);

  useEffect(() => {
    loadUserData();
    loadLastSpinTime();
  }, []);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setOwnedCharacters(userData.characters_owned || []);
    }
  };

  const loadLastSpinTime = () => {
    const savedTime = localStorage.getItem('lastSpinWheelTime');
    if (savedTime) {
      setLastSpinTime(new Date(savedTime));
    }
  };

  const canSpin = () => {
    if (!lastSpinTime) return true;
    const now = new Date();
    const timeDiff = now - lastSpinTime;
    const hoursPassed = timeDiff / (1000 * 60 * 60);
    return hoursPassed >= 4; // Can spin every 4 hours
  };

  const getTimeUntilNextSpin = () => {
    if (!lastSpinTime) return null;
    const now = new Date();
    const nextSpinTime = new Date(lastSpinTime.getTime() + (4 * 60 * 60 * 1000));
    const timeDiff = nextSpinTime - now;

    if (timeDiff <= 0) return null;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const spinWheel = () => {
    if (!canSpin() || isSpinning) return;

    setIsSpinning(true);
    const now = new Date();
    setLastSpinTime(now);
    localStorage.setItem('lastSpinWheelTime', now.toISOString());

    setTimeout(() => {
      const reward = spinWheelRewards[Math.floor(Math.random() * spinWheelRewards.length)];

      const savedUser = localStorage.getItem('questifyUser');
      const currentUser = savedUser ? JSON.parse(savedUser) : user;
      let updatedUser = { ...currentUser };

      if (reward.type === 'credits') {
        updatedUser.credits = (currentUser.credits || 0) + reward.value;
        showInAppNotification(`🎰 Spin Wheel: +${reward.value} credits! ${reward.emoji}`, "success");
      } else if (reward.type === 'crate') {
        const character = getRandomCharacterFromCrateType(reward.value);
        if (character) {
          updatedUser.characters_owned = [...(currentUser.characters_owned || []), { 
            ...character, 
            obtained: new Date().toISOString(),
            source: `Spin Wheel - ${reward.value} crate`
          }];
          showInAppNotification(`🎰 Spin Wheel: Got ${character.name}! (${character.rarity.toUpperCase()})`, "success");
        }
      }

      localStorage.setItem('questifyUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setOwnedCharacters(updatedUser.characters_owned || []);
      setIsSpinning(false);
    }, 4000);
  };

  const openCrate = (crateType) => {
    const crate = crateTypes.find(c => c.id === crateType);
    if (!crate || user.credits < crate.cost || isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      const character = getRandomCharacterFromCrate(crate);
      if (character) {
        const updatedUser = {
          ...user,
          credits: user.credits - crate.cost,
          characters_owned: [...ownedCharacters, { 
            ...character, 
            obtained: new Date().toISOString(),
            crate_source: crate.name 
          }]
        };

        localStorage.setItem('questifyUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setOwnedCharacters(updatedUser.characters_owned);
        setIsAnimating(false);

        showInAppNotification(`🎉 Amazing! You got ${character.name}! (${character.rarity.toUpperCase()})`, "success");
      }
    }, 1800);
  };

  const getRandomCharacterFromCrate = (crate) => {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const [rarity, rate] of Object.entries(crate.dropRates)) {
      cumulative += rate;
      if (random <= cumulative) {
        const charactersOfRarity = ultimateAnimeCharacters.filter(char => char.rarity === rarity);
        if (charactersOfRarity.length > 0) {
          return charactersOfRarity[Math.floor(Math.random() * charactersOfRarity.length)];
        }
      }
    }

    const rareChars = ultimateAnimeCharacters.filter(char => char.rarity === 'rare');
    return rareChars[Math.floor(Math.random() * rareChars.length)];
  };

  const getRandomCharacterFromCrateType = (crateId) => {
    const crate = crateTypes.find(c => c.id === crateId);
    return crate ? getRandomCharacterFromCrate(crate) : null;
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
      }, 5000);
    }
  };

  const getRarityClass = (rarity) => {
    const classes = {
      uncommon: 'border-green-300 bg-gradient-to-br from-green-50 to-white shadow-xl',
      rare: 'border-blue-300 bg-gradient-to-br from-blue-50 to-white shadow-xl',
      epic: 'border-purple-300 bg-gradient-to-br from-purple-50 to-white shadow-2xl',
      legendary: 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-white shadow-2xl',
      mythic: 'border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 shadow-2xl animate-rainbow-ultimate'
    };
    return classes[rarity] || classes.rare;
  };

  return (
    <div style={{ background: '#ffffff' }}>
      <div className="page-header-ultimate">
        <h1 className="page-title-ultimate">
          ⚔️ Hero Collection
        </h1>
        <p className="page-subtitle-ultimate">
          Collect legendary anime warriors and spin for rewards!
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 bottom-safe-ultimate">
        <div className="mobile-container-ultimate">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-10">
            <div className="stat-card-ultimate">
              <Coins className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-500 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{user.credits?.toLocaleString() || 0}</div>
              <div className="text-gray-600 font-bold">Credits</div>
            </div>
            <div className="stat-card-ultimate">
              <Users className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mx-auto mb-4 animate-pulse-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{ownedCharacters?.length || 0}</div>
              <div className="text-gray-600 font-bold">Heroes</div>
            </div>
            <div className="stat-card-ultimate">
              <Star className="w-12 h-12 lg:w-16 lg:h-16 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">
                {ownedCharacters?.filter(c => c.rarity === 'legendary' || c.rarity === 'mythic')?.length || 0}
              </div>
              <div className="text-gray-600 font-bold">Legendary+</div>
            </div>
            <div className="stat-card-ultimate">
              <Package className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{ultimateAnimeCharacters?.length || 12}</div>
              <div className="text-gray-600 font-bold">Available</div>
            </div>
          </div>

          <div className="questify-card-ultimate p-8 lg:p-10 mb-10">
            <div className="flex flex-wrap gap-4 lg:gap-6">
              {[
                { id: 'crates', label: '🎁 Magic Crates', color: 'from-blue-500 to-purple-600' },
                { id: 'spinwheel', label: '🎰 Spin Wheel', color: 'from-purple-500 to-pink-600' },
                { id: 'collection', label: '👥 My Heroes', color: 'from-emerald-500 to-teal-600' }
              ].map(tab => {
                const isActive = selectedTab === tab.id;
                const bg = isActive
  ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' // blue → violet
  : '#f3f4f6';

                const color = isActive ? 'white' : '#4b5563';
                const boxShadow = isActive ? '0 12px 30px rgba(30,64,175,0.25)' : 'none';
                const transform = isActive ? 'translateY(-3px)' : 'none';
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className="flex items-center gap-4 px-8 py-5 rounded-2xl font-black text-lg shadow-2xl"
                    style={{
                      background: bg,
                      color,
                      transition: '400ms',
                      boxShadow,
                      transform,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.boxShadow = "0 8px 20px rgba(30,64,175,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedTab === 'crates' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
              {crateTypes.map(crate => (
                <div key={crate.id} className="crate-card-ultimate">
                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    <div className="text-gray-900 p-6 rounded-3xl text-center mb-6 shadow-2xl" style={{
                      background: `linear-gradient(to bottom right, ${crate.color.replace('from-', '').replace(' to-', ', ')})`
                    }}>
                      <h3 className="text-xl lg:text-2xl font-black mb-2">{crate.name}</h3>
                      <p className="text-sm opacity-90 text-gray-800">{crate.description}</p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-6xl lg:text-7xl animate-bounce-ultimate mb-4">
                        {crate.emoji}
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Drop Rates:</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(crate.dropRates).map(([rarity, rate]) => (
                          <div key={rarity} className="flex justify-between">
                            <span className="capitalize font-semibold">{rarity}:</span>
                            <span className="font-bold">{rate}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto space-y-6">
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-black text-gray-800 flex items-center justify-center gap-3 mb-3">
                          <Coins className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500 animate-bounce-ultimate" />
                          {crate.cost.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => openCrate(crate.id)}
                        disabled={user.credits < crate.cost || isAnimating}
                        className="w-full py-4 px-6 rounded-2xl font-black text-lg text-white shadow-2xl"
                        style={{
                          background: user.credits >= crate.cost && !isAnimating
                            ? `linear-gradient(to right, ${crate.color.replace('from-', '').replace(' to-', ', ')})`
                            : '#e5e7eb',
                          color: user.credits >= crate.cost && !isAnimating ? 'white' : '#9ca3af',
                          cursor: user.credits >= crate.cost && !isAnimating ? 'pointer' : 'not-allowed',
                          transition: '400ms'
                        }}
                      >
                        {isAnimating ? 'Opening...' : user.credits >= crate.cost ? 'Open Crate' : 'Not Enough Credits'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'spinwheel' && (
            <div className="max-w-2xl mx-auto mb-20">
              <div className="questify-card-premium-ultimate p-10 lg:p-12 text-center">
                <h2 className="text-3xl lg:text-4xl font-black gradient-text-ultimate mb-8">🎰 Spin Wheel</h2>
                <p className="text-gray-600 text-lg mb-8">Spin every 4 hours for amazing rewards!</p>

                <div className="spin-wheel-container mb-8">
                  <div className={`spin-wheel ${isSpinning ? 'animate-spin-wheel' : ''}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg z-10"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {canSpin() ? (
                    <button
                      onClick={spinWheel}
                      disabled={isSpinning}
                      className="questify-button-ultimate text-2xl px-12 py-6 flex items-center justify-center gap-3 mx-auto"
                    >
                      <Zap className="w-8 h-8" />
                      {isSpinning ? 'Spinning...' : 'SPIN NOW! (Free)'}
                    </button>
                  ) : (
                    <div className="bg-gray-100 text-gray-600 px-12 py-6 rounded-2xl font-black text-xl">
                      Next spin in: {getTimeUntilNextSpin()}
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                    {spinWheelRewards.map((reward, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200">
                        <div className="text-3xl mb-2">{reward.emoji}</div>
                        <div className="font-bold text-sm">
                          {reward.type === 'credits' ? `${reward.value} Credits` : `${reward.value.charAt(0).toUpperCase() + reward.value.slice(1)} Crate`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'collection' && (
            <div className="mb-20">
              {ownedCharacters && ownedCharacters.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                  {ownedCharacters.map((character, index) => (
                    <div 
                      key={`${character.id}-${index}`} 
                      className={`character-card-ultimate border-2 ${getRarityClass(character.rarity)} cursor-pointer rounded-3xl bg-white`}
                      style={{ transition: '500ms', transform: 'translateY(0)' }}
                      tabIndex={0}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.04)";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(30,64,175,0.18)"; // dark blue glow
                        e.currentTarget.style.borderColor = "#1e3a8a";
                        e.currentTarget.style.zIndex = 2;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.zIndex = "";
                      }}
                    >
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-4">
                          <span className="text-3xl lg:text-4xl animate-bounce-ultimate">{character.icon}</span>
                        </div>
                        <h3 className={`text-xl lg:text-2xl font-black mb-2 ${character.rarity === 'mythic' ? 'animate-rainbow-ultimate' : 'text-gray-800'}`}>
                          {character.name}
                        </h3>
                        <p className="text-gray-600 text-base lg:text-lg font-bold">{character.series}</p>

                        <div className="text-2xl lg:text-3xl font-black text-gray-800 my-4">OVR {character.ovr}</div>

                        <div className={`inline-block px-4 py-2 rounded-2xl text-sm font-black uppercase ${getRarityClass(character.rarity)}`}>
                          {character.rarity}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-base">
                        <div className="font-bold text-center">ATK: <span className="font-black text-red-600">{character.attack}</span></div>
                        <div className="font-bold text-center">DEF: <span className="font-black text-blue-600">{character.defense}</span></div>
                        <div className="font-bold text-center">SPD: <span className="font-black text-green-600">{character.speed}</span></div>
                        <div className="font-bold text-center">SPC: <span className="font-black text-purple-600">{character.special}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="questify-card-ultimate p-16 lg:p-20 text-center">
                  <span className="text-8xl lg:text-9xl mb-8 block animate-float-ultimate">📦</span>
                  <h3 className="text-3xl lg:text-4xl text-gray-800 mb-6 font-black">No heroes yet</h3>
                  <p className="text-gray-600 text-xl mb-10">Open crates or spin the wheel to start your epic collection!</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button 
                      onClick={() => setSelectedTab('crates')}
                      className="questify-button-ultimate text-xl px-8 py-4"
                    >
                      Open Crates
                    </button>
                    <button 
                      onClick={() => setSelectedTab('spinwheel')}
                      className="questify-button-ultimate text-xl px-8 py-4"
                      style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)' }}
                    >
                      <Zap className="w-6 h-6 mr-2" />
                      Spin Wheel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
