// ============================================
// AUDIO MANAGER
// Game Edukasi IPAS - Misi Pencernaan
// ============================================

const AudioManager = {
  audioContext: null,
  currentBgm: null,
  bgmGain: null,
  sfxGain: null,
  isInitialized: false,

  init() {
    if (this.isInitialized) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.bgmGain = this.audioContext.createGain();
      this.bgmGain.connect(this.audioContext.destination);
      this.bgmGain.gain.value = 0.3;
      this.sfxGain = this.audioContext.createGain();
      this.sfxGain.connect(this.audioContext.destination);
      this.sfxGain.gain.value = 0.5;
      this.isInitialized = true;
    } catch (e) {
      console.warn('Audio not supported:', e);
    }
  },

  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  },

  // Generate tones using Web Audio API (no external files needed)
  playNote(freq, duration, type = 'sine', gainNode = null) {
    if (!this.isInitialized || !GameState.audio.sfxEnabled) return;
    this.resume();
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    osc.connect(gain);
    gain.connect(gainNode || this.sfxGain);
    osc.start();
    osc.stop(this.audioContext.currentTime + duration);
  },

  // Play a melody sequence
  playMelody(notes, tempo = 200) {
    if (!this.isInitialized) return;
    notes.forEach((note, i) => {
      setTimeout(() => {
        if (note.freq) this.playNote(note.freq, note.dur || 0.3, note.type || 'sine');
      }, i * tempo);
    });
  },

  // SFX: Button click
  playClick() {
    this.playNote(800, 0.1, 'square');
    setTimeout(() => this.playNote(1000, 0.08, 'square'), 50);
  },

  // SFX: Correct answer
  playCorrect() {
    this.playMelody([
      { freq: 523, dur: 0.15 },
      { freq: 659, dur: 0.15 },
      { freq: 784, dur: 0.3 }
    ], 120);
  },

  // SFX: Wrong answer
  playWrong() {
    this.playMelody([
      { freq: 300, dur: 0.2, type: 'sawtooth' },
      { freq: 250, dur: 0.3, type: 'sawtooth' }
    ], 200);
  },

  // SFX: Unlock
  playUnlock() {
    this.playMelody([
      { freq: 392, dur: 0.1 },
      { freq: 523, dur: 0.1 },
      { freq: 659, dur: 0.1 },
      { freq: 784, dur: 0.15 },
      { freq: 1047, dur: 0.4 }
    ], 100);
  },

  // SFX: Badge earned
  playBadge() {
    this.playMelody([
      { freq: 523, dur: 0.15 },
      { freq: 659, dur: 0.15 },
      { freq: 784, dur: 0.15 },
      { freq: 1047, dur: 0.15 },
      { freq: 1319, dur: 0.4 }
    ], 130);
  },

  // SFX: Victory
  playVictory() {
    this.playMelody([
      { freq: 523, dur: 0.2 },
      { freq: 523, dur: 0.2 },
      { freq: 523, dur: 0.2 },
      { freq: 523, dur: 0.4 },
      { freq: 415, dur: 0.3 },
      { freq: 466, dur: 0.3 },
      { freq: 523, dur: 0.2 },
      { freq: 466, dur: 0.15 },
      { freq: 523, dur: 0.6 }
    ], 180);
  },

  // SFX: XP gain
  playXPGain() {
    this.playNote(880, 0.1, 'triangle');
    setTimeout(() => this.playNote(1100, 0.15, 'triangle'), 80);
  },

  // SFX: Countdown tick
  playTick() {
    this.playNote(600, 0.05, 'square');
  },

  // SFX: Whoosh (for transitions)
  playWhoosh() {
    if (!this.isInitialized || !GameState.audio.sfxEnabled) return;
    this.resume();
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.3);
  },

  // BGM: Generate procedural background music
  _bgmOscillators: [],
  _bgmInterval: null,

  stopBGM() {
    this._bgmOscillators.forEach(o => { try { o.stop(); } catch(e){} });
    this._bgmOscillators = [];
    if (this._bgmInterval) {
      clearInterval(this._bgmInterval);
      this._bgmInterval = null;
    }
  },

  playBGM(type = 'menu') {
    if (!this.isInitialized || !GameState.audio.musicEnabled) return;
    this.stopBGM();
    this.resume();

    const melodies = {
      menu: { notes: [262, 294, 330, 349, 392, 349, 330, 294], tempo: 500, type: 'sine' },
      explore: { notes: [330, 392, 440, 392, 330, 294, 330, 392], tempo: 450, type: 'triangle' },
      challenge: { notes: [440, 494, 523, 587, 523, 494, 440, 392], tempo: 300, type: 'square' },
      boss: { notes: [220, 262, 294, 330, 294, 262, 220, 196], tempo: 350, type: 'sawtooth' },
      victory: { notes: [523, 587, 659, 784, 659, 784, 880, 1047], tempo: 400, type: 'sine' }
    };

    const melody = melodies[type] || melodies.menu;
    let noteIndex = 0;

    const playBGMNote = () => {
      if (!GameState.audio.musicEnabled) return;
      const freq = melody.notes[noteIndex % melody.notes.length];
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = melody.type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + (melody.tempo / 1000) * 0.9);
      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start();
      osc.stop(this.audioContext.currentTime + (melody.tempo / 1000));
      this._bgmOscillators.push(osc);
      noteIndex++;
      // Keep array manageable
      if (this._bgmOscillators.length > 20) {
        this._bgmOscillators = this._bgmOscillators.slice(-5);
      }
    };

    playBGMNote();
    this._bgmInterval = setInterval(playBGMNote, melody.tempo);
  },

  // Toggle music
  toggleMusic() {
    GameState.audio.musicEnabled = !GameState.audio.musicEnabled;
    if (!GameState.audio.musicEnabled) {
      this.stopBGM();
    }
    GameState.save();
    return GameState.audio.musicEnabled;
  },

  // Toggle SFX
  toggleSFX() {
    GameState.audio.sfxEnabled = !GameState.audio.sfxEnabled;
    GameState.save();
    return GameState.audio.sfxEnabled;
  }
};
