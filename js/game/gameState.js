// ============================================
// GAME STATE MANAGEMENT
// Game Edukasi IPAS - Misi Pencernaan
// ============================================

const GameState = {
  // Student info
  student: {
    name: '',
    class: 'VI',
    school: 'MI Al-Khairaat Tolango',
    character: null
  },

  // Game progress
  progress: {
    currentMap: 0,
    completedMaps: [],
    unlockedMaps: [1],
    totalXP: 0,
    stars: {},
    badges: [],
    currentScreen: 'cover'
  },

  // Map results
  mapResults: {},

  // Reflection
  reflection: {
    newLearning: [],
    favoritePart: [],
    healthyHabits: [],
    feeling: '',
    openResponse: ''
  },

  // Session
  session: {
    startTime: null,
    endTime: null,
    duration: 0
  },

  // Audio settings
  audio: {
    musicEnabled: true,
    sfxEnabled: true,
    volume: 0.5
  },

  // Initialize / Reset
  init() {
    this.student = { name: '', class: 'VI', school: 'MI Al-Khairaat Tolango', character: null };
    this.progress = { currentMap: 0, completedMaps: [], unlockedMaps: [1], totalXP: 0, stars: {}, badges: [], currentScreen: 'cover' };
    this.mapResults = {};
    this.reflection = { newLearning: [], favoritePart: [], healthyHabits: [], feeling: '', openResponse: '' };
    this.session = { startTime: null, endTime: null, duration: 0 };
  },

  // Save to localStorage
  save() {
    const data = {
      student: this.student,
      progress: this.progress,
      mapResults: this.mapResults,
      reflection: this.reflection,
      session: this.session,
      audio: this.audio
    };
    try {
      localStorage.setItem('misiPencernaan_gameState', JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save game state:', e);
    }
  },

  // Load from localStorage
  load() {
    try {
      const data = JSON.parse(localStorage.getItem('misiPencernaan_gameState'));
      if (data) {
        if (data.student) this.student = data.student;
        if (data.progress) this.progress = data.progress;
        if (data.mapResults) this.mapResults = data.mapResults;
        if (data.reflection) this.reflection = data.reflection;
        if (data.session) this.session = data.session;
        if (data.audio) this.audio = data.audio;
        return true;
      }
    } catch (e) {
      console.warn('Could not load game state:', e);
    }
    return false;
  },

  // Check if saved game exists
  hasSavedGame() {
    return localStorage.getItem('misiPencernaan_gameState') !== null;
  },

  // Clear saved game
  clearSave() {
    localStorage.removeItem('misiPencernaan_gameState');
  },

  // Add XP
  addXP(amount) {
    this.progress.totalXP += amount;
    this.save();
    return this.progress.totalXP;
  },

  // Add badge
  addBadge(badgeId) {
    if (!this.progress.badges.includes(badgeId)) {
      this.progress.badges.push(badgeId);
      this.save();
      return true;
    }
    return false;
  },

  // Complete map
  completeMap(mapId, score, correct, wrong) {
    if (!this.progress.completedMaps.includes(mapId)) {
      this.progress.completedMaps.push(mapId);
    }
    // Unlock next map
    const nextMap = mapId + 1;
    if (nextMap <= 6 && !this.progress.unlockedMaps.includes(nextMap)) {
      this.progress.unlockedMaps.push(nextMap);
    }
    // If all 6 maps complete, unlock boss
    if (this.progress.completedMaps.length >= 6 && !this.progress.unlockedMaps.includes(7)) {
      this.progress.unlockedMaps.push(7);
    }

    // Calculate stars for this map
    const percentage = (correct / (correct + wrong)) * 100;
    let stars = 1;
    if (percentage >= 90) stars = 3;
    else if (percentage >= 70) stars = 2;

    this.progress.stars[mapId] = stars;

    // Save map result
    this.mapResults[mapId] = {
      score,
      correctAnswers: correct,
      wrongAnswers: wrong,
      completed: true,
      completedAt: new Date().toISOString()
    };

    this.save();
    return { stars, nextMap };
  },

  // Is map unlocked
  isMapUnlocked(mapId) {
    return this.progress.unlockedMaps.includes(mapId);
  },

  // Is map completed
  isMapCompleted(mapId) {
    return this.progress.completedMaps.includes(mapId);
  },

  // Get total stars
  getTotalStars() {
    return Object.values(this.progress.stars).reduce((sum, s) => sum + s, 0);
  },

  // Get max possible stars
  getMaxStars() {
    return 7 * 3; // 6 maps + boss, 3 stars each
  },

  // Calculate overall percentage
  getOverallPercentage() {
    let totalCorrect = 0;
    let totalWrong = 0;
    Object.values(this.mapResults).forEach(r => {
      totalCorrect += r.correctAnswers || 0;
      totalWrong += r.wrongAnswers || 0;
    });
    if (totalCorrect + totalWrong === 0) return 0;
    return Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100);
  }
};
