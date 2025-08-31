import React, { useState, useEffect } from "react";
import { BookOpen, Plus, Edit, Coins, ArrowLeft, Eye, Calendar, Search, Filter } from "lucide-react";

// EXPANDED MOOD OPTIONS
const ultimateMoodOptions = [
  { emoji: "😊", label: "Happy", value: "happy", color: "bg-yellow-100 text-yellow-800" },
  { emoji: "😌", label: "Calm", value: "calm", color: "bg-blue-100 text-blue-800" },
  { emoji: "🔥", label: "Motivated", value: "motivated", color: "bg-orange-100 text-orange-800" },
  { emoji: "😴", label: "Tired", value: "tired", color: "bg-gray-100 text-gray-800" },
  { emoji: "🤔", label: "Thoughtful", value: "thoughtful", color: "bg-purple-100 text-purple-800" },
  { emoji: "💪", label: "Energetic", value: "energetic", color: "bg-green-100 text-green-800" },
  { emoji: "😰", label: "Stressed", value: "stressed", color: "bg-red-100 text-red-800" },
  { emoji: "🌟", label: "Inspired", value: "inspired", color: "bg-pink-100 text-pink-800" },
  { emoji: "😔", label: "Sad", value: "sad", color: "bg-indigo-100 text-indigo-800" },
  { emoji: "🧘", label: "Peaceful", value: "peaceful", color: "bg-emerald-100 text-emerald-800" }
];

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState({ credits: 0 });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [moodFilter, setMoodFilter] = useState("all");
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "happy"
  });

  useEffect(() => {
    loadUserData();
    loadJournalEntries();
  }, []);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const loadJournalEntries = () => {
    const savedEntries = localStorage.getItem('questifyJournalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  };

  const saveEntry = (e) => {
    e.preventDefault();
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry = {
      id: Date.now(),
      ...newEntry,
      date: new Date().toISOString(),
      wordCount: newEntry.content.trim().split(/\s+/).length
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('questifyJournalEntries', JSON.stringify(updatedEntries));

    const savedUser = localStorage.getItem('questifyUser');
    const currentUser = savedUser ? JSON.parse(savedUser) : user;

    const updatedUser = {
      ...currentUser,
      credits: (currentUser.credits || 0) + 25,
      journal_entries: updatedEntries.length,
      total_words_written: (currentUser.total_words_written || 0) + entry.wordCount
    };
    localStorage.setItem('questifyUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    setNewEntry({ title: "", content: "", mood: "happy" });
    setShowForm(false);

    showInAppNotification('📝 Journal entry saved! +25 credits earned!', "success");
  };

  const showInAppNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = 'animate-slide-down-ultimate px-8 py-5 rounded-2xl font-bold text-gray-900 shadow-2xl mb-3';
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodEmoji = (mood) => {
    const moodOption = ultimateMoodOptions.find(m => m.value === mood);
    return moodOption ? moodOption.emoji : "😊";
  };

  const getMoodColor = (mood) => {
    const moodOption = ultimateMoodOptions.find(m => m.value === mood);
    return moodOption ? moodOption.color : "bg-yellow-100 text-yellow-800";
  };

  const getPreviewText = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchTerm || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMood = moodFilter === "all" || entry.mood === moodFilter;

    return matchesSearch && matchesMood;
  });

  if (selectedEntry) {
    const entry = entries.find(e => e.id === selectedEntry);

    return (
      <div style={{ background: '#ffffff' }}>
        <div className="page-header-ultimate">
          <h1 className="page-title-ultimate">
            📖 Personal Journal
          </h1>
          <p className="page-subtitle-ultimate">
            Reading your personal thoughts and reflections
          </p>
        </div>

        <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 bottom-safe-ultimate">
          <div className="mobile-container-ultimate">
            <button
              onClick={() => setSelectedEntry(null)}
              className="questify-button-ultimate flex items-center gap-3 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Journal
            </button>

            <div className="questify-card-premium-ultimate p-10 lg:p-12">
              <div className="text-center mb-8">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6">
                  <span className="text-5xl lg:text-6xl animate-bounce-ultimate">{getMoodEmoji(entry.mood)}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black gradient-text-ultimate mb-4">{entry.title}</h1>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 font-bold">
                    <Calendar className="w-5 h-5" />
                    {formatDate(entry.date)}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm font-bold ${getMoodColor(entry.mood)}`}>
                    {getMoodEmoji(entry.mood)} {ultimateMoodOptions.find(m => m.value === entry.mood)?.label}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg lg:prose-xl max-w-none mb-8">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg lg:text-xl font-medium">
                  {entry.content}
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 text-gray-600 font-bold text-lg">
                  <Edit className="w-6 h-6" />
                  {entry.wordCount} words
                </div>
                <div className="flex items-center gap-3 text-emerald-600 font-black text-lg">
                  <Coins className="w-6 h-6" />
                  +25 credits earned
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#ffffff' }}>
      <div className="page-header-ultimate">
        <h1 className="page-title-ultimate">
          📖 Personal Journal
        </h1>
        <p className="page-subtitle-ultimate">
          Reflect, grow, and chronicle your journey through life
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 bottom-safe-ultimate">
        <div className="mobile-container-ultimate">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10">
            <div className="stat-card-ultimate">
              <BookOpen className="w-12 h-12 lg:w-16 lg:h-16 text-blue-600 mx-auto mb-4 animate-pulse-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{entries.length}</div>
              <div className="text-gray-600 font-bold">Total Entries</div>
            </div>
            <div className="stat-card-ultimate">
              <Edit className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">
                {entries.reduce((total, entry) => total + entry.wordCount, 0).toLocaleString()}
              </div>
              <div className="text-gray-600 font-bold">Words Written</div>
            </div>
            <div className="stat-card-ultimate">
              <Coins className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800">{entries.length * 25}</div>
              <div className="text-gray-600 font-bold">Credits Earned</div>
            </div>
          </div>

          <div className="questify-card-ultimate p-8 lg:p-10 mb-10">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6">
              <button
                onClick={() => setShowForm(!showForm)}
                className="questify-button-ultimate flex items-center gap-3 touch-friendly-ultimate justify-center text-xl px-12 py-5"
              >
                <Plus className="w-6 h-6" />
                ✍️ New Entry
              </button>

              <div className="flex flex-col lg:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="questify-input-ultimate pl-12 text-lg"
                  />
                </div>

                <select
                  value={moodFilter}
                  onChange={(e) => setMoodFilter(e.target.value)}
                  className="questify-input-ultimate text-lg lg:w-48"
                >
                  <option value="all">All Moods</option>
                  {ultimateMoodOptions.map(mood => (
                    <option key={mood.value} value={mood.value}>
                      {mood.emoji} {mood.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredEntries.length !== entries.length && (
              <div className="text-center text-gray-600 font-medium">
                Showing {filteredEntries.length} of {entries.length} entries
              </div>
            )}
          </div>

          {showForm && (
            <div className="questify-card-premium-ultimate p-10 sm:p-12 lg:p-14 mb-12 animate-slide-up-ultimate">
              <h2 className="text-3xl lg:text-4xl font-black gradient-text-ultimate mb-10 text-center">✍️ New Journal Entry</h2>
              <form onSubmit={saveEntry} className="space-y-8">
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                  placeholder="What's the story of today?"
                  className="questify-input-ultimate text-xl"
                  required
                />

                <select
                  value={newEntry.mood}
                  onChange={(e) => setNewEntry({...newEntry, mood: e.target.value})}
                  className="questify-input-ultimate text-xl"
                >
                  {ultimateMoodOptions.map(mood => (
                    <option key={mood.value} value={mood.value}>
                      {mood.emoji} {mood.label}
                    </option>
                  ))}
                </select>

                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                  placeholder="Pour your heart out here..."
                  rows="12"
                  className="questify-input-ultimate text-xl resize-none"
                  required
                />

                <div className="flex gap-6">
                  <button
                    type="submit"
                    className="flex-1 questify-button-success-ultimate flex items-center justify-center gap-3 touch-friendly-ultimate text-xl px-12 py-6"
                  >
                    <BookOpen className="w-6 h-6" />
                    Save Entry (+25 credits)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-12 py-6 rounded-2xl font-bold hover:bg-gray-300 touch-friendly-ultimate text-xl"
                    style={{ transition: '300ms' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mb-20">
            {filteredEntries.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {filteredEntries.map((entry, index) => (
                  <div 
                    key={entry.id} 
                    className="journal-entry-ultimate"
                    onClick={() => setSelectedEntry(entry.id)}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                          <span className="text-4xl lg:text-5xl animate-bounce-ultimate">{getMoodEmoji(entry.mood)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-3">{entry.title}</h3>
                          <div className="flex flex-col gap-2">
                            <p className="text-gray-500 text-lg lg:text-xl font-bold">{formatDate(entry.date)}</p>
                            <div className={`inline-block px-3 py-1 rounded-xl text-sm font-bold ${getMoodColor(entry.mood)} w-fit`}>
                              {getMoodEmoji(entry.mood)} {ultimateMoodOptions.find(m => m.value === entry.mood)?.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-lg lg:text-xl mb-6 font-medium">
                      {getPreviewText(entry.content)}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-500 font-bold">
                          <Edit className="w-5 h-5" />
                          {entry.wordCount} words
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-black">
                          <Coins className="w-5 h-5" />
                          +25 credits
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700" style={{ transition: '300ms' }}>
                        <Eye className="w-5 h-5" />
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="questify-card-ultimate p-16 lg:p-20 text-center">
                {searchTerm || moodFilter !== "all" ? (
                  <>
                    <span className="text-8xl lg:text-9xl mb-8 block animate-float-ultimate">🔍</span>
                    <h3 className="text-3xl lg:text-4xl text-gray-800 mb-6 font-black">No entries found</h3>
                    <p className="text-gray-600 text-xl mb-10">Try adjusting your search or filter!</p>
                    <div className="flex gap-4 justify-center">
                      <button 
                        onClick={() => setSearchTerm("")}
                        className="bg-blue-500 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-600"
                        style={{ transition: '300ms' }}
                      >
                        Clear Search
                      </button>
                      <button 
                        onClick={() => setMoodFilter("all")}
                        className="bg-purple-500 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-purple-600"
                        style={{ transition: '300ms' }}
                      >
                        Clear Filter
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-8xl lg:text-9xl mb-8 block animate-float-ultimate">📖</span>
                    <h3 className="text-3xl lg:text-4xl text-gray-800 mb-6 font-black">Start your journal journey</h3>
                    <p className="text-gray-600 text-xl mb-10">Write your first entry and start documenting your life!</p>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="questify-button-ultimate flex items-center justify-center gap-3 text-xl px-12 py-6"
                    >
                      <Plus className="w-6 h-6" />
                      Write First Entry
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}