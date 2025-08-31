import React, { useState, useEffect } from "react";
import { ShoppingBag, Coins, Star, Filter } from "lucide-react";

// 50+ ANIME CHARACTERS AS REQUESTED
const ultimateStoreCharacters = [
  // MYTHIC CHARACTERS (10)
  { id: "gojo_card", name: "Satoru Gojo", series: "Jujutsu Kaisen", price: 6000, rarity: "mythic", ovr: 100, icon: "🔮", description: "The strongest sorcerer alive", attack: 100, defense: 95, speed: 98, special: 100 },
  { id: "sukuna_card", name: "Sukuna", series: "Jujutsu Kaisen", price: 5800, rarity: "mythic", ovr: 99, icon: "😈", description: "King of Curses", attack: 100, defense: 92, speed: 95, special: 100 },
  { id: "goku_card", name: "Son Goku", series: "Dragon Ball", price: 5800, rarity: "mythic", ovr: 99, icon: "🥋", description: "Legendary Super Saiyan", attack: 100, defense: 88, speed: 96, special: 100 },
  { id: "saitama_card", name: "Saitama", series: "One Punch Man", price: 6200, rarity: "mythic", ovr: 100, icon: "👊", description: "One Punch Hero", attack: 100, defense: 90, speed: 85, special: 100 },
  { id: "madara_card", name: "Madara Uchiha", series: "Naruto", price: 5600, rarity: "mythic", ovr: 98, icon: "🌙", description: "Ghost of the Uchiha", attack: 98, defense: 90, speed: 94, special: 100 },
  { id: "aizen_card", name: "Sosuke Aizen", series: "Bleach", price: 5400, rarity: "mythic", ovr: 97, icon: "🎭", description: "Master of Illusions", attack: 95, defense: 88, speed: 92, special: 100 },
  { id: "whitebeard_card", name: "Edward Newgate", series: "One Piece", price: 5200, rarity: "mythic", ovr: 96, icon: "🌊", description: "Strongest Man in the World", attack: 100, defense: 85, speed: 80, special: 98 },
  { id: "meruem_card", name: "Meruem", series: "Hunter x Hunter", price: 5000, rarity: "mythic", ovr: 95, icon: "👑", description: "Chimera Ant King", attack: 96, defense: 94, speed: 90, special: 95 },
  { id: "escanor_card", name: "Escanor", series: "Seven Deadly Sins", price: 4800, rarity: "mythic", ovr: 94, icon: "☀️", description: "Lion's Sin of Pride", attack: 100, defense: 80, speed: 85, special: 98 },
  { id: "rimuru_card", name: "Rimuru Tempest", series: "That Time I Got Reincarnated as a Slime", price: 4600, rarity: "mythic", ovr: 93, icon: "💧", description: "Demon Lord", attack: 92, defense: 95, speed: 96, special: 100 },

  // LEGENDARY CHARACTERS (15)
  { id: "itachi_card", name: "Itachi Uchiha", series: "Naruto", price: 4000, rarity: "legendary", ovr: 94, icon: "🔥", description: "Sharingan master", attack: 92, defense: 78, speed: 88, special: 98 },
  { id: "levi_card", name: "Levi Ackerman", series: "Attack on Titan", price: 3800, rarity: "legendary", ovr: 92, icon: "⚔️", description: "Humanity's Strongest", attack: 95, defense: 85, speed: 100, special: 88 },
  { id: "kakashi_card", name: "Kakashi Hatake", series: "Naruto", price: 3600, rarity: "legendary", ovr: 90, icon: "👁️", description: "Copy Ninja", attack: 88, defense: 85, speed: 90, special: 95 },
  { id: "zoro_card", name: "Roronoa Zoro", series: "One Piece", price: 3400, rarity: "legendary", ovr: 89, icon: "🗡️", description: "Pirate Hunter", attack: 95, defense: 88, speed: 85, special: 90 },
  { id: "ichigo_card", name: "Ichigo Kurosaki", series: "Bleach", price: 3400, rarity: "legendary", ovr: 89, icon: "⚡", description: "Soul Reaper", attack: 90, defense: 82, speed: 94, special: 92 },
  { id: "vegeta_card", name: "Vegeta", series: "Dragon Ball", price: 3200, rarity: "legendary", ovr: 88, icon: "👑", description: "Prince of Saiyans", attack: 98, defense: 85, speed: 90, special: 88 },
  { id: "natsu_card", name: "Natsu Dragneel", series: "Fairy Tail", price: 3000, rarity: "legendary", ovr: 87, icon: "🔥", description: "Dragon Slayer", attack: 92, defense: 80, speed: 88, special: 90 },
  { id: "luffy_card", name: "Monkey D. Luffy", series: "One Piece", price: 2800, rarity: "legendary", ovr: 86, icon: "🏴‍☠️", description: "Straw Hat Captain", attack: 88, defense: 78, speed: 85, special: 95 },
  { id: "edward_card", name: "Edward Elric", series: "Fullmetal Alchemist", price: 2800, rarity: "legendary", ovr: 86, icon: "⚗️", description: "Fullmetal Alchemist", attack: 82, defense: 85, speed: 88, special: 95 },
  { id: "killua_card", name: "Killua Zoldyck", series: "Hunter x Hunter", price: 2600, rarity: "legendary", ovr: 85, icon: "⚡", description: "Lightning Assassin", attack: 88, defense: 82, speed: 100, special: 85 },
  { id: "todoroki_card", name: "Shoto Todoroki", series: "My Hero Academia", price: 2600, rarity: "legendary", ovr: 85, icon: "🧊", description: "Half-Cold Half-Hot", attack: 90, defense: 85, speed: 82, special: 88 },
  { id: "jotaro_card", name: "Jotaro Kujo", series: "JoJo's Bizarre Adventure", price: 2400, rarity: "legendary", ovr: 84, icon: "⭐", description: "Stand User", attack: 92, defense: 88, speed: 80, special: 86 },
  { id: "senku_card", name: "Senku Ishigami", series: "Dr. Stone", price: 2200, rarity: "legendary", ovr: 83, icon: "🧪", description: "Science Genius", attack: 65, defense: 70, speed: 75, special: 100 },
  { id: "mob_card", name: "Shigeo Kageyama", series: "Mob Psycho 100", price: 2200, rarity: "legendary", ovr: 83, icon: "👻", description: "Psychic Powerhouse", attack: 85, defense: 75, speed: 78, special: 98 },
  { id: "tomioka_card", name: "Giyu Tomioka", series: "Demon Slayer", price: 2000, rarity: "legendary", ovr: 82, icon: "🌊", description: "Water Pillar", attack: 88, defense: 85, speed: 82, special: 85 },

  // EPIC CHARACTERS (15)
  { id: "tanjiro_card", name: "Tanjiro Kamado", series: "Demon Slayer", price: 1800, rarity: "epic", ovr: 89, icon: "🌊", description: "Sun Breathing master", attack: 88, defense: 82, speed: 85, special: 95 },
  { id: "deku_card", name: "Izuku Midoriya", series: "My Hero Academia", price: 1600, rarity: "epic", ovr: 87, icon: "💚", description: "One For All", attack: 85, defense: 78, speed: 82, special: 92 },
  { id: "asta_card", name: "Asta", series: "Black Clover", price: 1600, rarity: "epic", ovr: 87, icon: "⚔️", description: "Anti-Magic Swordsman", attack: 90, defense: 88, speed: 85, special: 85 },
  { id: "naruto_card", name: "Naruto Uzumaki", series: "Naruto", price: 1500, rarity: "epic", ovr: 86, icon: "🍥", description: "Nine-Tails Jinchuriki", attack: 88, defense: 80, speed: 85, special: 92 },
  { id: "light_card", name: "Light Yagami", series: "Death Note", price: 1400, rarity: "epic", ovr: 85, icon: "📓", description: "Kira", attack: 70, defense: 75, speed: 80, special: 100 },
  { id: "lelouch_card", name: "Lelouch Lamperouge", series: "Code Geass", price: 1400, rarity: "epic", ovr: 85, icon: "👑", description: "Zero", attack: 65, defense: 70, speed: 78, special: 100 },
  { id: "yusuke_card", name: "Yusuke Urameshi", series: "Yu Yu Hakusho", price: 1300, rarity: "epic", ovr: 84, icon: "👊", description: "Spirit Detective", attack: 90, defense: 82, speed: 88, special: 85 },
  { id: "inuyasha_card", name: "Inuyasha", series: "Inuyasha", price: 1300, rarity: "epic", ovr: 84, icon: "🗡️", description: "Half-Demon", attack: 92, defense: 85, speed: 82, special: 80 },
  { id: "kenshin_card", name: "Kenshin Himura", series: "Rurouni Kenshin", price: 1200, rarity: "epic", ovr: 83, icon: "⚔️", description: "Battousai", attack: 95, defense: 80, speed: 90, special: 75 },
  { id: "spike_card", name: "Spike Spiegel", series: "Cowboy Bebop", price: 1200, rarity: "epic", ovr: 83, icon: "🚬", description: "Space Cowboy", attack: 85, defense: 80, speed: 88, special: 82 },
  { id: "gon_card", name: "Gon Freecss", series: "Hunter x Hunter", price: 1100, rarity: "epic", ovr: 82, icon: "🎣", description: "Hunter", attack: 88, defense: 75, speed: 85, special: 85 },
  { id: "yami_card", name: "Yami Sukehiro", series: "Black Clover", price: 1100, rarity: "epic", ovr: 82, icon: "🗡️", description: "Dark Magic Captain", attack: 92, defense: 88, speed: 75, special: 82 },
  { id: "ban_card", name: "Ban", series: "Seven Deadly Sins", price: 1000, rarity: "epic", ovr: 81, icon: "🍻", description: "Fox's Sin of Greed", attack: 85, defense: 90, speed: 80, special: 82 },
  { id: "hisoka_card", name: "Hisoka Morow", series: "Hunter x Hunter", price: 1000, rarity: "epic", ovr: 81, icon: "🃏", description: "Magician", attack: 88, defense: 75, speed: 85, special: 88 },
  { id: "rengoku_card", name: "Kyojuro Rengoku", series: "Demon Slayer", price: 950, rarity: "epic", ovr: 80, icon: "🔥", description: "Flame Pillar", attack: 90, defense: 85, speed: 82, special: 80 },

  // RARE CHARACTERS (10)
  { id: "bakugo_card", name: "Katsuki Bakugo", series: "My Hero Academia", price: 900, rarity: "rare", ovr: 87, icon: "💥", description: "Explosion Hero", attack: 95, defense: 80, speed: 88, special: 85 },
  { id: "sasuke_card", name: "Sasuke Uchiha", series: "Naruto", price: 850, rarity: "rare", ovr: 86, icon: "⚡", description: "Last Uchiha", attack: 90, defense: 78, speed: 92, special: 88 },
  { id: "zenitsu_card", name: "Zenitsu Agatsuma", series: "Demon Slayer", price: 800, rarity: "rare", ovr: 85, icon: "⚡", description: "Thunder Breathing", attack: 88, defense: 70, speed: 98, special: 82 },
  { id: "inosuke_card", name: "Inosuke Hashibira", series: "Demon Slayer", price: 750, rarity: "rare", ovr: 84, icon: "🐗", description: "Beast Breathing", attack: 92, defense: 88, speed: 85, special: 75 },
  { id: "momo_card", name: "Momo Yaoyorozu", series: "My Hero Academia", price: 700, rarity: "rare", ovr: 83, icon: "⚗️", description: "Creation Hero", attack: 75, defense: 85, speed: 80, special: 92 },
  { id: "hinata_card", name: "Hinata Hyuga", series: "Naruto", price: 650, rarity: "rare", ovr: 82, icon: "👁️", description: "Byakugan Princess", attack: 78, defense: 82, speed: 85, special: 88 },
  { id: "nezuko_card", name: "Nezuko Kamado", series: "Demon Slayer", price: 600, rarity: "rare", ovr: 81, icon: "🌸", description: "Demon Sister", attack: 85, defense: 88, speed: 80, special: 78 },
  { id: "toga_card", name: "Himiko Toga", series: "My Hero Academia", price: 550, rarity: "rare", ovr: 80, icon: "🔪", description: "Transform", attack: 82, defense: 75, speed: 88, special: 80 },
  { id: "sakura_card", name: "Sakura Haruno", series: "Naruto", price: 500, rarity: "rare", ovr: 79, icon: "🌸", description: "Medical Ninja", attack: 75, defense: 80, speed: 78, special: 90 },
  { id: "uraraka_card", name: "Ochaco Uraraka", series: "My Hero Academia", price: 450, rarity: "rare", ovr: 78, icon: "🌙", description: "Zero Gravity", attack: 70, defense: 75, speed: 82, special: 85 }
];

export default function Store() {
  const [user, setUser] = useState({ credits: 1500 });
  const [purchaseAnimation, setPurchaseAnimation] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [sortBy, setSortBy] = useState("ovr");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const purchaseCharacter = (character) => {
    if (user.credits < character.price) {
      showInAppNotification("❌ Not enough credits!", "error");
      return;
    }

    setPurchaseAnimation(character.id);

    setTimeout(() => {
      const updatedUser = {
        ...user,
        credits: user.credits - character.price,
        characters_owned: [...(user.characters_owned || []), {
          ...character,
          id: Date.now(),
          obtained: new Date().toISOString(),
          source: 'Store Purchase'
        }]
      };

      localStorage.setItem('questifyUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPurchaseAnimation(null);

      showInAppNotification(`🎉 ${character.name} added to your collection!`, "success");
    }, 1500);
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

  const getRarityColor = (rarity) => {
    const colors = {
      rare: 'from-blue-500 to-blue-600',
      epic: 'from-purple-500 to-purple-600', 
      legendary: 'from-yellow-500 to-yellow-600',
      mythic: 'from-pink-500 to-purple-600'
    };
    return colors[rarity] || colors.rare;
  };

  const getRarityBorder = (rarity) => {
    const borders = {
      rare: 'border-blue-300',
      epic: 'border-purple-300',
      legendary: 'border-yellow-300',
      mythic: 'border-pink-300'
    };
    return borders[rarity] || borders.rare;
  };

  const filteredAndSortedCharacters = ultimateStoreCharacters
    .filter(char => selectedRarity === "all" || char.rarity === selectedRarity)
    .sort((a, b) => {
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      if (sortBy === "ovr") return b.ovr - a.ovr;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const rarities = ["all", "rare", "epic", "legendary", "mythic"];

  return (
    <div style={{ background: '#ffffff' }}>
      <div className="page-header-ultimate">
        <h1 className="page-title-ultimate">
          🛒 Character Store
        </h1>
        <p className="page-subtitle-ultimate">
          Purchase 50+ legendary anime characters directly!
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 bottom-safe-ultimate">
        <div className="mobile-container-ultimate">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
            <div className="stat-card-ultimate">
              <Coins className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-500 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{user.credits?.toLocaleString() || 0}</div>
              <div className="text-gray-600 font-bold">Credits</div>
            </div>
            <div className="stat-card-ultimate">
              <ShoppingBag className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mx-auto mb-4 animate-pulse-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{ultimateStoreCharacters.length}</div>
              <div className="text-gray-600 font-bold">Available</div>
            </div>
            <div className="stat-card-ultimate">
              <Star className="w-12 h-12 lg:w-16 lg:h-16 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">
                {ultimateStoreCharacters.filter(c => c.rarity === 'mythic').length}
              </div>
              <div className="text-gray-600 font-bold">Mythic</div>
            </div>
            <div className="stat-card-ultimate">
              <Filter className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">
                {filteredAndSortedCharacters.length}
              </div>
              <div className="text-gray-600 font-bold">Showing</div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="questify-card-ultimate p-8 lg:p-10 mb-10">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Filter by Rarity:</h3>
                <div className="flex flex-wrap gap-3">
                  {rarities.map(rarity => (
                    <button
                      key={rarity}
                      onClick={() => setSelectedRarity(rarity)}
                      className="px-6 py-3 rounded-2xl font-bold text-white shadow-xl capitalize"
                      style={{
                        background: selectedRarity === rarity 
                          ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' 
                          : '#f3f4f6',
                        color: selectedRarity === rarity ? 'white' : '#4b5563',
                        transition: '300ms'
                      }}
                    >
                      {rarity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Sort by:</h3>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="questify-input-ultimate text-lg"
                >
                  <option value="ovr">Highest OVR</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-24">
            {filteredAndSortedCharacters.map(character => {
              const isAnimating = purchaseAnimation === character.id;
              return (
                <div 
                  key={character.id} 
                  className={`questify-card-ultimate border-2 ${getRarityBorder(character.rarity)}`}
                  style={{ 
                    transition: '500ms',
                    background: isAnimating ? 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)' : undefined,
                    minHeight: '500px'
                  }}
                >
                  <div className="p-6 lg:p-8 flex flex-col h-full">
                    <div className="text-center mb-6">
                      <div className="relative mb-4">
                        <div className={`w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${getRarityColor(character.rarity)} rounded-full flex items-center justify-center mx-auto shadow-2xl`}>
                          <span className="text-3xl lg:text-4xl animate-bounce-ultimate">{character.icon}</span>
                        </div>
                      </div>

                      {/* ANIMATED NAME AS REQUESTED */}
                      <h3 className={`text-xl lg:text-2xl font-black mb-2 ${character.rarity === 'mythic' ? 'animate-rainbow-ultimate' : 'text-gray-800'}`}>
                        {character.name}
                      </h3>
                      <p className="text-gray-600 text-base lg:text-lg font-bold mb-3">{character.series}</p>

                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="text-2xl lg:text-3xl font-black text-gray-800">OVR {character.ovr}</div>
                        <Star className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-500 animate-pulse-ultimate" />
                      </div>

                      <div className={`inline-block px-4 py-2 rounded-2xl text-sm font-black uppercase text-white`} style={{
                        background: `linear-gradient(to right, ${getRarityColor(character.rarity).replace('from-', '').replace(' to-', ', ')})`
                      }}>
                        {character.rarity}
                      </div>
                    </div>

                    <p className="text-gray-600 text-center mb-6 leading-relaxed text-base lg:text-lg font-medium flex-grow">{character.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-base lg:text-lg mb-6">
                      <div className="font-bold text-center">ATK: <span className="font-black text-red-600">{character.attack}</span></div>
                      <div className="font-bold text-center">DEF: <span className="font-black text-blue-600">{character.defense}</span></div>
                      <div className="font-bold text-center">SPD: <span className="font-black text-green-600">{character.speed}</span></div>
                      <div className="font-bold text-center">SPC: <span className="font-black text-purple-600">{character.special}</span></div>
                    </div>

                    <div className="space-y-4 mt-auto">
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-black text-gray-800 flex items-center justify-center gap-3 mb-3">
                          <Coins className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500 animate-bounce-ultimate" />
                          {character.price.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => purchaseCharacter(character)}
                        disabled={user.credits < character.price || isAnimating}
                        className="w-full py-4 px-6 rounded-2xl font-black text-lg text-white shadow-2xl"
                        style={{
                          background: user.credits >= character.price && !isAnimating
                            ? `linear-gradient(to right, ${getRarityColor(character.rarity).replace('from-', '').replace(' to-', ', ')})`
                            : '#e5e7eb',
                          color: user.credits >= character.price && !isAnimating ? 'white' : '#9ca3af',
                          cursor: user.credits >= character.price && !isAnimating ? 'pointer' : 'not-allowed',
                          transition: '400ms'
                        }}
                      >
                        {isAnimating ? 'Purchasing...' : user.credits >= character.price ? 'Purchase Hero' : 'Insufficient Credits'}
                      </button>
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