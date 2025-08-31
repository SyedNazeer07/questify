import React, { useState, useEffect } from "react";
import { Heart, Clock, Star, CheckCircle, Eye, ArrowLeft } from "lucide-react";

// 40+ MENTAL HEALTH EXERCISES AS REQUESTED
const mentalHealthExercises = [
  // BREATHING EXERCISES (15)
  { id: 1, title: "4-7-8 Breathing Technique", category: "breathing", duration: "4-5 minutes", difficulty: "beginner", description: "Inhale for 4, hold for 7, exhale for 8. Ancient technique for instant calm.", icon: "🫁", benefits: ["Reduces anxiety instantly", "Improves sleep quality", "Calms nervous system"], credits: 25, steps: ["Sit comfortably", "Exhale completely", "Inhale for 4 counts", "Hold for 7 counts", "Exhale for 8 counts", "Repeat 3-4 cycles"] },
  { id: 2, title: "Box Breathing Method", category: "breathing", duration: "5-10 minutes", difficulty: "beginner", description: "Equal counts breathing used by Navy SEALs for stress control.", icon: "⬜", benefits: ["Reduces stress hormones", "Improves focus", "Calms racing mind"], credits: 25, steps: ["Inhale for 4", "Hold for 4", "Exhale for 4", "Hold for 4", "Repeat cycle"] },
  { id: 3, title: "Belly Breathing", category: "breathing", duration: "5-8 minutes", difficulty: "beginner", description: "Deep diaphragmatic breathing to activate relaxation response.", icon: "🫄", benefits: ["Lowers blood pressure", "Reduces stress", "Improves digestion"], credits: 20, steps: ["Place hand on belly", "Breathe into belly", "Feel belly rise", "Exhale slowly", "Repeat for 5-8 minutes"] },
  { id: 4, title: "Alternate Nostril Breathing", category: "breathing", duration: "5-10 minutes", difficulty: "intermediate", description: "Ancient yoga technique to balance the nervous system.", icon: "🧘", benefits: ["Balances nervous system", "Improves focus", "Reduces anxiety"], credits: 30, steps: ["Block right nostril", "Inhale left", "Block left nostril", "Exhale right", "Continue alternating"] },
  { id: 5, title: "Coherent Breathing", category: "breathing", duration: "10 minutes", difficulty: "beginner", description: "5-second inhale, 5-second exhale for heart rate variability.", icon: "💓", benefits: ["Improves heart rate variability", "Reduces stress", "Enhances focus"], credits: 25, steps: ["Inhale for 5 seconds", "Exhale for 5 seconds", "Maintain steady rhythm", "Continue for 10 minutes"] },
  { id: 6, title: "Breath Counting", category: "breathing", duration: "10-15 minutes", difficulty: "beginner", description: "Count breaths from 1 to 10, then repeat.", icon: "🔢", benefits: ["Improves concentration", "Calms mind", "Reduces anxiety"], credits: 20, steps: ["Count each exhale", "Count 1 to 10", "Start over at 1", "If mind wanders, restart"] },
  { id: 7, title: "Power Breathing", category: "breathing", duration: "3-5 minutes", difficulty: "intermediate", description: "Energizing breath work to boost energy and confidence.", icon: "⚡", benefits: ["Increases energy", "Boosts confidence", "Improves alertness"], credits: 30, steps: ["Fast, deep breathing", "30 seconds rapid breath", "Hold breath for 10 seconds", "Repeat 3-5 cycles"] },
  { id: 8, title: "Triangle Breathing", category: "breathing", duration: "5-8 minutes", difficulty: "beginner", description: "Three-part breathing pattern for balance.", icon: "🔺", benefits: ["Creates mental balance", "Reduces stress", "Improves focus"], credits: 25, steps: ["Inhale for 4", "Hold for 4", "Exhale for 4", "No pause between cycles"] },
  { id: 9, title: "Ocean Breath (Ujjayi)", category: "breathing", duration: "10-15 minutes", difficulty: "intermediate", description: "Yoga breathing that sounds like ocean waves.", icon: "🌊", benefits: ["Deep relaxation", "Improves concentration", "Reduces anxiety"], credits: 30, steps: ["Breathe through nose", "Constrict throat slightly", "Create ocean sound", "Maintain throughout practice"] },
  { id: 10, title: "Bee Breath (Bhramari)", category: "breathing", duration: "5-10 minutes", difficulty: "intermediate", description: "Humming breath that creates calming vibrations.", icon: "🐝", benefits: ["Reduces anxiety", "Calms mind", "Improves memory"], credits: 30, steps: ["Block ears with thumbs", "Close eyes with fingers", "Hum while exhaling", "Feel vibrations"] },
  { id: 11, title: "Cooling Breath", category: "breathing", duration: "5-8 minutes", difficulty: "intermediate", description: "Cooling pranayama to reduce body heat and stress.", icon: "❄️", benefits: ["Cools body", "Reduces anger", "Calms mind"], credits: 25, steps: ["Curl tongue like straw", "Inhale through curled tongue", "Exhale through nose", "Repeat for cooling effect"] },
  { id: 12, title: "Rapid Fire Breathing", category: "breathing", duration: "2-3 minutes", difficulty: "advanced", description: "Quick energizing breath for instant energy boost.", icon: "🔥", benefits: ["Instant energy", "Mental clarity", "Boosts metabolism"], credits: 35, steps: ["Rapid shallow breathing", "30 seconds intense", "30 seconds rest", "Repeat 3-4 cycles"] },
  { id: 13, title: "Victory Breath", category: "breathing", duration: "8-12 minutes", difficulty: "intermediate", description: "Empowering breath work for confidence building.", icon: "🏆", benefits: ["Builds confidence", "Reduces fear", "Improves focus"], credits: 30, steps: ["Deep inhale with intention", "Hold breath with power", "Strong exhale with victory", "Feel your strength grow"] },
  { id: 14, title: "Gentle Flow Breathing", category: "breathing", duration: "10-15 minutes", difficulty: "beginner", description: "Soft, flowing breath for deep relaxation.", icon: "🌸", benefits: ["Deep relaxation", "Reduces tension", "Improves sleep"], credits: 20, steps: ["Very gentle breathing", "Soft in, soft out", "No effort or force", "Let breath be natural"] },
  { id: 15, title: "Morning Energy Breath", category: "breathing", duration: "5-7 minutes", difficulty: "beginner", description: "Energizing breath work to start your day right.", icon: "🌅", benefits: ["Boosts morning energy", "Increases alertness", "Positive mindset"], credits: 25, steps: ["Deep morning inhales", "Energizing exhales", "Stretch while breathing", "Set positive intentions"] },

  // MEDITATION EXERCISES (15)
  { id: 16, title: "Mindfulness Meditation", category: "meditation", duration: "10-20 minutes", difficulty: "beginner", description: "Present moment awareness practice for mental clarity.", icon: "🧘‍♀️", benefits: ["Reduces stress", "Improves focus", "Increases self-awareness"], credits: 30, steps: ["Sit comfortably", "Focus on breath", "Notice wandering thoughts", "Return to breath", "Practice without judgment"] },
  { id: 17, title: "Body Scan Meditation", category: "meditation", duration: "15-25 minutes", difficulty: "beginner", description: "Progressive relaxation through body awareness.", icon: "🫂", benefits: ["Releases physical tension", "Improves body awareness", "Promotes deep relaxation"], credits: 35, steps: ["Start at toes", "Notice each body part", "Release tension", "Move up slowly", "End at head"] },
  { id: 18, title: "Loving Kindness Meditation", category: "meditation", duration: "15-20 minutes", difficulty: "intermediate", description: "Cultivate compassion and loving feelings.", icon: "💖", benefits: ["Increases compassion", "Reduces negative emotions", "Improves relationships"], credits: 35, steps: ["Send love to yourself", "Extend to loved ones", "Include neutral people", "Embrace difficult people", "Expand to all beings"] },
  { id: 19, title: "Walking Meditation", category: "meditation", duration: "10-30 minutes", difficulty: "beginner", description: "Mindful walking practice combining movement and awareness.", icon: "🚶‍♂️", benefits: ["Combines exercise with mindfulness", "Improves focus", "Reduces anxiety"], credits: 30, steps: ["Walk very slowly", "Focus on each step", "Feel feet touching ground", "Notice surroundings", "Stay present"] },
  { id: 20, title: "Visualization Meditation", category: "meditation", duration: "15-20 minutes", difficulty: "intermediate", description: "Create peaceful mental imagery for deep relaxation.", icon: "🌈", benefits: ["Deep relaxation", "Reduces stress", "Improves creativity"], credits: 35, steps: ["Close eyes", "Imagine peaceful place", "Engage all senses", "Explore the scene", "Rest in the visualization"] },
  { id: 21, title: "Mantra Meditation", category: "meditation", duration: "10-20 minutes", difficulty: "beginner", description: "Repetition of sacred sounds for mental focus.", icon: "🕉️", benefits: ["Improves concentration", "Reduces mental chatter", "Creates inner peace"], credits: 30, steps: ["Choose a mantra", "Repeat silently or aloud", "Focus only on sound", "When mind wanders, return", "End with silence"] },
  { id: 22, title: "Zen Meditation (Zazen)", category: "meditation", duration: "20-30 minutes", difficulty: "advanced", description: "Traditional sitting meditation focusing on posture and breath.", icon: "🧘‍♂️", benefits: ["Deep mental clarity", "Improves concentration", "Develops patience"], credits: 40, steps: ["Sit in formal posture", "Focus on breathing", "Just sit and be", "No special technique", "Pure awareness"] },
  { id: 23, title: "Chakra Meditation", category: "meditation", duration: "20-25 minutes", difficulty: "intermediate", description: "Energy center meditation for balance and healing.", icon: "🌪️", benefits: ["Balances energy", "Promotes healing", "Increases vitality"], credits: 35, steps: ["Focus on each chakra", "Visualize colors", "Feel energy flowing", "Clear blockages", "Balance all centers"] },
  { id: 24, title: "Sound Bath Meditation", category: "meditation", duration: "15-30 minutes", difficulty: "beginner", description: "Use of healing sounds and vibrations for meditation.", icon: "🎶", benefits: ["Deep relaxation", "Reduces stress", "Balances emotions"], credits: 30, steps: ["Listen to healing sounds", "Let sound wash over you", "Feel vibrations", "Don't focus on thoughts", "Absorb the healing"] },
  { id: 25, title: "Mountain Meditation", category: "meditation", duration: "15-20 minutes", difficulty: "intermediate", description: "Embody the strength and stability of a mountain.", icon: "🏔️", benefits: ["Builds inner strength", "Increases stability", "Develops patience"], credits: 35, steps: ["Imagine being a mountain", "Feel your solid base", "Weather passes over you", "Remain unmoved", "Embody mountain strength"] },
  { id: 26, title: "Candle Flame Meditation", category: "meditation", duration: "10-15 minutes", difficulty: "beginner", description: "Concentration practice using candle flame as focus point.", icon: "🕯️", benefits: ["Improves concentration", "Calms mind", "Enhances focus"], credits: 25, steps: ["Light a candle", "Gaze at flame", "Don't strain eyes", "When mind wanders, return", "End by closing eyes"] },
  { id: 27, title: "Cloud Watching Meditation", category: "meditation", duration: "15-20 minutes", difficulty: "beginner", description: "Mindful observation of clouds for mental spaciousness.", icon: "☁️", benefits: ["Creates mental space", "Reduces overwhelm", "Promotes letting go"], credits: 25, steps: ["Lie down outside", "Watch clouds drift", "Notice their changes", "Don't analyze", "Feel mental spaciousness"] },
  { id: 28, title: "Inner Child Meditation", category: "meditation", duration: "20-25 minutes", difficulty: "intermediate", description: "Connect with and heal your inner child.", icon: "👶", benefits: ["Emotional healing", "Increases self-compassion", "Heals past wounds"], credits: 40, steps: ["Visualize younger self", "Offer love and comfort", "Listen to their needs", "Provide reassurance", "Integrate the healing"] },
  { id: 29, title: "Gratitude Meditation", category: "meditation", duration: "10-15 minutes", difficulty: "beginner", description: "Focus on appreciation and thankfulness.", icon: "🙏", benefits: ["Increases happiness", "Improves mood", "Reduces depression"], credits: 30, steps: ["Think of 3 things to appreciate", "Feel genuine gratitude", "Let feeling expand", "Include everything", "End with thanks"] },
  { id: 30, title: "Tree Meditation", category: "meditation", duration: "15-20 minutes", difficulty: "beginner", description: "Connect with nature's wisdom and grounding energy.", icon: "🌳", benefits: ["Grounding effect", "Connects with nature", "Reduces anxiety"], credits: 30, steps: ["Sit near a tree", "Feel roots growing", "Connect with earth", "Absorb tree's wisdom", "Feel deeply rooted"] },

  // PHYSICAL WELLNESS (8)
  { id: 31, title: "Progressive Muscle Relaxation", category: "physical", duration: "15-20 minutes", difficulty: "beginner", description: "Tense and release muscle groups for deep relaxation.", icon: "💪", benefits: ["Releases physical tension", "Improves sleep", "Reduces anxiety"], credits: 35, steps: ["Start with toes", "Tense for 5 seconds", "Release and relax", "Move up the body", "End completely relaxed"] },
  { id: 32, title: "Gentle Yoga Flow", category: "physical", duration: "20-30 minutes", difficulty: "beginner", description: "Slow, mindful yoga movements for flexibility and calm.", icon: "🤸‍♀️", benefits: ["Improves flexibility", "Reduces stress", "Increases strength"], credits: 35, steps: ["Warm up gently", "Flow between poses", "Focus on breath", "Move mindfully", "End in relaxation"] },
  { id: 33, title: "Desk Stretches", category: "physical", duration: "5-10 minutes", difficulty: "beginner", description: "Quick stretches to relieve desk work tension.", icon: "🖥️", benefits: ["Relieves neck tension", "Improves posture", "Reduces stiffness"], credits: 15, steps: ["Neck rolls", "Shoulder shrugs", "Spinal twists", "Leg stretches", "Deep breathing"] },
  { id: 34, title: "Tai Chi Movements", category: "physical", duration: "15-20 minutes", difficulty: "intermediate", description: "Flowing martial arts movements for mind-body harmony.", icon: "🥋", benefits: ["Improves balance", "Reduces stress", "Enhances focus"], credits: 30, steps: ["Slow flowing movements", "Connect with breath", "Maintain balance", "Feel energy flow", "End in stillness"] },
  { id: 35, title: "Dance Therapy", category: "physical", duration: "10-15 minutes", difficulty: "beginner", description: "Free movement expression for emotional release.", icon: "💃", benefits: ["Emotional release", "Boosts mood", "Increases energy"], credits: 25, steps: ["Put on music", "Move however feels good", "Don't think, just feel", "Express emotions", "Dance freely"] },
  { id: 36, title: "Acupressure Points", category: "physical", duration: "10-15 minutes", difficulty: "beginner", description: "Apply pressure to healing points on the body.", icon: "👆", benefits: ["Relieves pain", "Reduces stress", "Improves energy"], credits: 25, steps: ["Find pressure points", "Apply gentle pressure", "Hold for 30 seconds", "Breathe deeply", "Move to next point"] },
  { id: 37, title: "Cold Water Therapy", category: "physical", duration: "2-5 minutes", difficulty: "intermediate", description: "Brief cold exposure for mental resilience and energy.", icon: "🧊", benefits: ["Boosts energy", "Improves mood", "Builds resilience"], credits: 30, steps: ["Start with cold water", "Breathe deeply", "Stay present", "Embrace the sensation", "Feel energized after"] },
  { id: 38, title: "Sunlight Meditation", category: "physical", duration: "10-15 minutes", difficulty: "beginner", description: "Absorb healing sunlight for vitamin D and mood boost.", icon: "☀️", benefits: ["Increases vitamin D", "Improves mood", "Regulates sleep"], credits: 20, steps: ["Sit in sunlight", "Close eyes", "Feel warmth on face", "Absorb the energy", "Practice gratitude"] },

  // QUICK RELIEF (7)
  { id: 39, title: "5-4-3-2-1 Grounding", category: "quick", duration: "3-5 minutes", difficulty: "beginner", description: "Use your five senses to ground yourself in the present.", icon: "🎯", benefits: ["Stops panic attacks", "Reduces anxiety", "Increases present awareness"], credits: 20, steps: ["5 things you can see", "4 things you can touch", "3 things you can hear", "2 things you can smell", "1 thing you can taste"] },
  { id: 40, title: "Butterfly Hug", category: "quick", duration: "2-3 minutes", difficulty: "beginner", description: "Self-soothing technique for comfort and safety.", icon: "🦋", benefits: ["Instant comfort", "Reduces anxiety", "Self-soothing"], credits: 15, steps: ["Cross arms over chest", "Hands on opposite shoulders", "Gently pat alternating", "Breathe deeply", "Feel safe and comforted"] },
  { id: 41, title: "Ice Cube Technique", category: "quick", duration: "2-5 minutes", difficulty: "beginner", description: "Use cold sensation to interrupt anxiety or panic.", icon: "🧊", benefits: ["Interrupts panic", "Grounds in present", "Reduces overwhelm"], credits: 15, steps: ["Hold ice cube", "Focus on cold sensation", "Breathe deeply", "Let panic subside", "Notice present moment"] },
  { id: 42, title: "Quick Energy Reset", category: "quick", duration: "3-5 minutes", difficulty: "beginner", description: "Fast technique to reset your energy and mood.", icon: "⚡", benefits: ["Quick energy boost", "Improves mood", "Increases alertness"], credits: 20, steps: ["Take 10 deep breaths", "Stretch arms overhead", "Shake out whole body", "Smile widely", "Set positive intention"] },
  { id: 43, title: "Pressure Point Relief", category: "quick", duration: "2-4 minutes", difficulty: "beginner", description: "Quick pressure points for instant stress relief.", icon: "👉", benefits: ["Instant relief", "Reduces tension", "Easy to do anywhere"], credits: 15, steps: ["Press point between thumb and index", "Hold for 30 seconds", "Press temples gently", "Massage ear lobes", "Feel tension release"] },
  { id: 44, title: "Power Pose", category: "quick", duration: "2-3 minutes", difficulty: "beginner", description: "Body posture to instantly boost confidence and power.", icon: "🦸‍♀️", benefits: ["Boosts confidence", "Reduces stress hormones", "Increases power"], credits: 20, steps: ["Stand tall", "Hands on hips", "Feet shoulder-width apart", "Chin up", "Hold for 2 minutes"] },
  { id: 45, title: "Rapid Reset Breathing", category: "quick", duration: "1-2 minutes", difficulty: "beginner", description: "Ultra-fast breathing technique for immediate calm.", icon: "💨", benefits: ["Immediate calm", "Reduces panic", "Quick reset"], credits: 15, steps: ["4 quick deep breaths", "Hold last breath for 4", "Exhale very slowly", "Repeat if needed", "Feel instantly calmer"] }
];

export default function MentalHealth() {
  const [completedExercises, setCompletedExercises] = useState([]);
  const [user, setUser] = useState({ credits: 0, exercises_completed: 0 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewingExercise, setViewingExercise] = useState(null);

  useEffect(() => {
    loadUserData();
    loadCompletedExercises();
  }, []);

  const loadUserData = () => {
    const savedUser = localStorage.getItem('questifyUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const loadCompletedExercises = () => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('exercisesCompletedDate');

    if (savedDate !== today) {
      localStorage.setItem('exercisesCompletedDate', today);
      localStorage.setItem('completedExercisesToday', JSON.stringify([]));
      setCompletedExercises([]);
    } else {
      const completed = localStorage.getItem('completedExercisesToday');
      if (completed) {
        setCompletedExercises(JSON.parse(completed));
      }
    }
  };

  const completeExercise = (exerciseId) => {
    const exercise = mentalHealthExercises.find(e => e.id === exerciseId);
    if (!exercise || completedExercises.includes(exerciseId)) return;

    const updated = [...completedExercises, exerciseId];
    setCompletedExercises(updated);
    localStorage.setItem('completedExercisesToday', JSON.stringify(updated));

    const savedUser = localStorage.getItem('questifyUser');
    const currentUser = savedUser ? JSON.parse(savedUser) : user;

    const updatedUser = {
      ...currentUser,
      credits: (currentUser.credits || 0) + exercise.credits,
      exercises_completed: (currentUser.exercises_completed || 0) + 1
    };
    localStorage.setItem('questifyUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    showInAppNotification(`🧘‍♀️ Exercise completed! +${exercise.credits} credits earned!`, "success");
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

  const categories = ["all", "breathing", "meditation", "physical", "quick"];

  const filteredExercises = mentalHealthExercises.filter(exercise => {
    return selectedCategory === "all" || exercise.category === selectedCategory;
  });

  if (viewingExercise) {
    const exercise = mentalHealthExercises.find(e => e.id === viewingExercise);
    const isCompleted = completedExercises.includes(exercise.id);

    return (
      <div style={{ background: '#ffffff' }}>
        <div className="page-header-ultimate">
          <h1 className="page-title-ultimate">
            🧠 Mental Wellness
          </h1>
          <p className="page-subtitle-ultimate">
            Deep dive into wellness practices
          </p>
        </div>

        <div className="max-w-4xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 bottom-safe-ultimate">
          <div className="mobile-container-ultimate">
            <button
              onClick={() => setViewingExercise(null)}
              className="questify-button-ultimate flex items-center gap-3 mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Exercises
            </button>

            <div className="questify-card-premium-ultimate p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className=" w-24 h-24 lg:w-32 lg:h-32 bg-transparent emoji-circle rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6">
                  <span className="text-5xl lg:text-6xl animate-bounce-ultimate">{exercise.icon}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black gradient-text-ultimate mb-4">{exercise.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{exercise.description}</p>
              </div>

              {exercise.steps && (
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-gray-800 mb-6">🎯 Step-by-Step Guide</h3>
                  <div className="space-y-4">
                    {exercise.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-800 mb-6">✨ Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercise.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                      <span className="text-gray-800 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                {!isCompleted ? (
                  <button
                    onClick={() => completeExercise(exercise.id)}
                    className="questify-button-success-ultimate flex items-center justify-center gap-3 text-xl px-12 py-6"
                  >
                    <CheckCircle className="w-8 h-8" />
                    Complete Exercise (+{exercise.credits} credits)
                  </button>
                ) : (
                  <div className="bg-emerald-100 text-emerald-800 px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3">
                    <CheckCircle className="w-8 h-8" />
                    Exercise Completed! 
                  </div>
                )}
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
          🧠 Mental Wellness
        </h1>
        <p className="page-subtitle-ultimate">
          Transform your mind with 45+ guided wellness practices
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 space-y-8 sm:space-y-10 bottom-safe-ultimate">
        <div className="mobile-container-ultimate">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10">
            <div className="stat-card-ultimate">
              <CheckCircle className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600 mx-auto mb-4 animate-pulse-ultimate" />
              <div className="text-4xl lg:text-5xl font-black text-gray-800">{completedExercises.length}</div>
              <div className="text-gray-600 font-bold">Completed Today</div>
            </div>
            <div className="stat-card-ultimate">
              <Heart className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600 mx-auto mb-4 animate-bounce-ultimate" />
              <div className="text-4xl lg:text-5xl font-black text-gray-800">{mentalHealthExercises.length}</div>
              <div className="text-gray-600 font-bold">Available</div>
            </div>
            <div className="stat-card-ultimate">
              <Star className="w-12 h-12 lg:w-16 lg:h-16 text-purple-600 mx-auto mb-4" />
              <div className="text-4xl lg:text-5xl font-black text-gray-800">
                {completedExercises.reduce((sum, id) => {
                  const ex = mentalHealthExercises.find(e => e.id === id);
                  return sum + (ex ? ex.credits : 0);
                }, 0)}
              </div>
              <div className="text-gray-600 font-bold">Credits Today</div>
            </div>
          </div>

          <div className="questify-card-ultimate p-6 lg:p-8 mb-10">
            <div className="flex flex-wrap gap-3 lg:gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-6 py-3 rounded-2xl font-bold text-white shadow-xl"
                  style={{
                    background: selectedCategory === category 
                      ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' 
                      : '#f3f4f6',
                    color: selectedCategory === category ? 'white' : '#4b5563',
                    transition: '300ms'
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {filteredExercises.map((exercise) => {
              const isCompleted = completedExercises.includes(exercise.id);
              return (
                <div 
                  key={exercise.id} 
                  className={isCompleted ? 'exercise-card-completed' : 'exercise-card-ultimate'}
                  style={{ transition: '500ms' }}
                >
                  <div className="p-6 lg:p-8 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                          <span className="text-3xl lg:text-4xl animate-bounce-ultimate">{exercise.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg lg:text-xl font-black text-gray-800 mb-2">{exercise.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{exercise.duration}</span>
                          </div>
                        </div>
                      </div>
                      {isCompleted && (
                        <CheckCircle className="w-7 h-7 text-emerald-600 animate-pulse-ultimate" />
                      )}
                    </div>

                    <p className="text-gray-600 text-sm lg:text-base mb-6 leading-relaxed flex-grow">{exercise.description}</p>

                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => setViewingExercise(exercise.id)}
                        className="flex-1 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
                          transition: '300ms'
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View More
                      </button>
                      {!isCompleted ? (
                        <button
                          onClick={() => completeExercise(exercise.id)}
                          className="flex-1 questify-button-success-ultimate flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Complete (+{exercise.credits})
                        </button>
                      ) : (
                        <div className="flex-1 bg-emerald-100 text-emerald-800 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Done
                        </div>
                      )}
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