// ============================================
// MAIN GAME ENGINE
// Game Edukasi IPAS - Misi Pencernaan
// MI Al-Khairaat Tolango
// ============================================

const Game = {
  // Current active mini-game state
  miniGameState: null,
  miniGameInterval: null,
  currentMapData: null,
  currentQuestionIndex: 0,
  mapScore: 0,
  mapCorrect: 0,
  mapWrong: 0,
  bossCurrentChallenge: 0,
  bossScore: 0,
  bossCorrect: 0,
  bossWrong: 0,

  // ================== INITIALIZATION ==================
  init() {
    this.createParticles();
    this.setupAudioControls();

    // Check for saved game
    if (GameState.hasSavedGame()) {
      GameState.load();
      this.showScreen('cover');
    } else {
      this.showScreen('cover');
    }
  },

  // ================== PARTICLES ==================
  createParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#FF9A9E', '#29B6F6'];
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 12 + 4;
      particle.style.cssText = `
        width: ${size}px; height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      container.appendChild(particle);
    }
  },

  // ================== AUDIO CONTROLS ==================
  setupAudioControls() {
    this.updateAudioButtons();
  },

  updateAudioButtons() {
    const musicBtn = document.getElementById('btn-music');
    const sfxBtn = document.getElementById('btn-sfx');
    if (musicBtn) {
      musicBtn.textContent = GameState.audio.musicEnabled ? '🎵' : '🔇';
      musicBtn.classList.toggle('muted', !GameState.audio.musicEnabled);
    }
    if (sfxBtn) {
      sfxBtn.textContent = GameState.audio.sfxEnabled ? '🔊' : '🔈';
      sfxBtn.classList.toggle('muted', !GameState.audio.sfxEnabled);
    }
  },

  toggleMusic() {
    AudioManager.init();
    AudioManager.toggleMusic();
    this.updateAudioButtons();
    if (GameState.audio.musicEnabled) {
      AudioManager.playBGM('menu');
    }
  },

  toggleSFX() {
    AudioManager.init();
    AudioManager.toggleSFX();
    this.updateAudioButtons();
  },

  // ================== SCREEN MANAGEMENT ==================
  showScreen(screenId) {
    AudioManager.init();

    document.querySelectorAll('.screen').forEach(s => {
      s.classList.add('hidden');
      s.classList.remove('fade-in');
    });

    const screen = document.getElementById(`${screenId}-screen`);
    if (screen) {
      screen.classList.remove('hidden');
      screen.classList.add('fade-in');
    }

    GameState.progress.currentScreen = screenId;

    // Play appropriate BGM
    switch(screenId) {
      case 'cover':
        AudioManager.playBGM('menu');
        break;
      case 'worldmap':
        AudioManager.playBGM('explore');
        this.renderWorldMap();
        break;
      case 'victory':
        AudioManager.playBGM('victory');
        this.createConfetti();
        break;
    }
  },

  // ================== NAVIGATION ==================
  startGame() {
    AudioManager.init();
    AudioManager.playClick();

    if (GameState.hasSavedGame() && GameState.student.name) {
      // Show continue/new dialog
      this.showContinueDialog();
    } else {
      this.showScreen('input');
    }
  },

  showContinueDialog() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'continue-dialog';
    overlay.innerHTML = `
      <div class="modal" style="text-align:center">
        <h2>🎮 Selamat Datang Kembali!</h2>
        <p style="margin-bottom:20px">Halo <strong>${GameState.student.name}</strong>! Kamu memiliki permainan yang tersimpan.</p>
        <div style="display:flex;flex-direction:column;gap:10px;align-items:center">
          <button class="btn btn-primary" onclick="Game.continueGame()">▶️ Lanjutkan Permainan</button>
          <button class="btn btn-secondary" onclick="Game.newGame()">🔄 Mulai Baru</button>
          <button class="btn btn-small btn-secondary" onclick="document.getElementById('continue-dialog').remove()">Batal</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  continueGame() {
    document.getElementById('continue-dialog')?.remove();
    AudioManager.playWhoosh();
    this.showScreen('worldmap');
  },

  newGame() {
    document.getElementById('continue-dialog')?.remove();
    GameState.clearSave();
    GameState.init();
    AudioManager.playWhoosh();
    this.showScreen('input');
  },

  // ================== MODALS ==================
  showTujuan() {
    AudioManager.playClick();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
      <div class="modal">
        <h2>🎯 Tujuan Pembelajaran</h2>
        <p>Setelah bermain game ini, kamu diharapkan mampu:</p>
        <ol>
          <li>Mengidentifikasi organ-organ sistem pencernaan manusia.</li>
          <li>Menjelaskan fungsi setiap organ pencernaan.</li>
          <li>Mengurutkan perjalanan makanan dalam tubuh.</li>
          <li>Menjelaskan proses pencernaan secara sederhana.</li>
          <li>Mengenali zat makanan dan manfaatnya bagi tubuh.</li>
          <li>Menjelaskan pentingnya menjaga kesehatan sistem pencernaan.</li>
          <li>Menerapkan perilaku hidup bersih dan sehat.</li>
          <li>Menunjukkan rasa syukur terhadap tubuh sebagai ciptaan Allah SWT.</li>
        </ol>
        <button class="btn btn-primary btn-small modal-close" onclick="this.closest('.modal-overlay').remove()">✓ Mengerti</button>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  showPanduan() {
    AudioManager.playClick();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
      <div class="modal">
        <h2>📖 Panduan Bermain</h2>
        <h3>🗺️ Peta Petualangan</h3>
        <p>Kamu akan menjelajahi 6 area organ pencernaan dan menghadapi Final Boss.</p>

        <h3>📚 Belajar Materi</h3>
        <p>Setiap area dimulai dengan materi pengantar. Baca dengan teliti ya!</p>

        <h3>🎮 Mini Game</h3>
        <p>Setiap area memiliki mini game seru. Mainkan untuk mendapat XP!</p>

        <h3>❓ Tantangan</h3>
        <p>Jawab pertanyaan untuk menyelesaikan setiap area dan membuka area berikutnya.</p>

        <h3>⭐ Skor & Bintang</h3>
        <ul>
          <li>Baca materi = +10 XP</li>
          <li>Jawaban benar = +20 XP</li>
          <li>Mini game = +30 XP</li>
          <li>Selesaikan map = +50 XP</li>
          <li>Final Boss = +100 XP</li>
        </ul>

        <h3>🏅 Badge</h3>
        <p>Dapatkan badge spesial setiap menyelesaikan area!</p>

        <h3>🔒 Membuka Area Baru</h3>
        <p>Selesaikan tantangan di area sekarang untuk membuka area berikutnya.</p>

        <h3>📊 Laporan</h3>
        <p>Setelah menyelesaikan semua tantangan, kamu bisa membuat laporan PDF untuk guru.</p>

        <button class="btn btn-primary btn-small modal-close" onclick="this.closest('.modal-overlay').remove()">✓ Siap Bermain!</button>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  showPengembang() {
    AudioManager.playClick();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
      <div class="modal">
        <h2>👨‍💻 Informasi Pengembang</h2>
        <div style="text-align:center">
          <p style="font-size:2rem;margin-bottom:10px">🎓</p>
          <h3 style="color:var(--accent)">Game Edukasi IPAS</h3>
          <p><strong>"Misi Pencernaan"</strong></p>
          <p>Petualangan Sistem Pencernaan Manusia</p>
          <br>
          <p>📍 <strong>MI Al-Khairaat Tolango</strong></p>
          <br>
          <p>📘 Mata Pelajaran: IPAS</p>
          <p>📊 Fase: C / Kelas VI</p>
          <p>📝 Materi: Sistem Pencernaan Manusia</p>
          <br>
          <p>📐 Pendekatan:</p>
          <p>Kurikulum Merdeka</p>
          <p>Pembelajaran Mendalam</p>
          <p>Kurikulum Berbasis Cinta</p>
          <br>
          <p style="font-size:0.8rem;color:var(--text-muted)">Dikembangkan sebagai media pembelajaran interaktif untuk siswa kelas VI MI Al-Khairaat Tolango.</p>
        </div>
        <button class="btn btn-primary btn-small modal-close" onclick="this.closest('.modal-overlay').remove()">✓ Tutup</button>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  // ================== STUDENT INPUT ==================
  submitStudent() {
    AudioManager.playClick();
    const nameInput = document.getElementById('student-name');
    const name = nameInput.value.trim();
    const errorEl = document.getElementById('name-error');

    if (!name) {
      errorEl.classList.add('show');
      nameInput.focus();
      AudioManager.playWrong();
      return;
    }

    errorEl.classList.remove('show');
    GameState.student.name = name;
    GameState.session.startTime = new Date().toISOString();
    GameState.save();

    AudioManager.playWhoosh();
    this.showScreen('character');
    this.renderCharacterSelection();
  },

  // ================== CHARACTER SELECTION ==================
  renderCharacterSelection() {
    const grid = document.getElementById('character-grid');
    if (!grid) return;

    grid.innerHTML = CHARACTERS.map(char => `
      <div class="character-card" id="char-${char.id}" onclick="Game.selectCharacter('${char.id}')">
        <span class="character-avatar">${char.avatar}</span>
        <div class="character-name" style="color:${char.color}">${char.name}</div>
        <div class="character-title">${char.title}</div>
        <div class="character-desc">${char.description}</div>
      </div>
    `).join('');
  },

  selectCharacter(charId) {
    AudioManager.playClick();
    document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
    document.getElementById(`char-${charId}`).classList.add('selected');
    GameState.student.character = charId;

    // Enable start button
    const startBtn = document.getElementById('btn-start-adventure');
    if (startBtn) startBtn.disabled = false;
  },

  startAdventure() {
    if (!GameState.student.character) {
      this.showToast('Pilih karaktermu terlebih dahulu!');
      return;
    }

    AudioManager.playUnlock();
    GameState.save();
    this.showScreen('worldmap');
  },

  // ================== WORLD MAP ==================
  renderWorldMap() {
    const container = document.getElementById('map-path');
    if (!container) return;

    // Update stats
    document.getElementById('hud-xp-map').textContent = GameState.progress.totalXP;
    document.getElementById('hud-badges-map').textContent = GameState.progress.badges.length;

    let html = '';

    MAPS_DATA.forEach((map, idx) => {
      const isCompleted = GameState.isMapCompleted(map.id);
      const isUnlocked = GameState.isMapUnlocked(map.id);
      const status = isCompleted ? 'completed' : (isUnlocked ? 'available' : 'locked');
      const stars = GameState.progress.stars[map.id] || 0;

      html += `
        <div class="map-node ${status}" onclick="Game.enterMap(${map.id})" title="${map.title}">
          <div class="map-icon-wrapper" style="border-color:${isUnlocked ? map.color : ''};color:${map.color};">
            ${isUnlocked ? map.icon : '🔒'}
          </div>
          <div class="map-info">
            <h3 style="color:${isUnlocked ? map.color : ''}">MAP ${map.id}: ${map.title}</h3>
            <p>${map.subtitle}</p>
            ${isCompleted ? `<div class="map-stars">
              ${[1,2,3].map(s => `<span class="star ${s <= stars ? 'earned' : ''}">★</span>`).join('')}
            </div>` : ''}
          </div>
        </div>
      `;

      if (idx < MAPS_DATA.length - 1) {
        html += `<div class="map-connector ${isCompleted ? 'completed' : ''}"></div>`;
      }
    });

    // Final Boss
    const allMapsComplete = GameState.progress.completedMaps.length >= 6;
    const bossCompleted = GameState.isMapCompleted(7);
    const bossStatus = bossCompleted ? 'completed' : (allMapsComplete ? 'available' : 'locked');
    const bossStars = GameState.progress.stars[7] || 0;

    html += `<div class="map-connector ${allMapsComplete ? 'completed' : ''}"></div>`;
    html += `
      <div class="map-node ${bossStatus}" onclick="Game.enterBoss()" style="margin-top:5px">
        <div class="map-icon-wrapper" style="border-color:${allMapsComplete ? '#F44336' : ''};color:#F44336;">
          ${allMapsComplete ? '👾' : '🔒'}
        </div>
        <div class="map-info">
          <h3 style="color:#F44336">FINAL BOSS</h3>
          <p>Penjaga Pencernaan</p>
          ${bossCompleted ? `<div class="map-stars">
            ${[1,2,3].map(s => `<span class="star ${s <= bossStars ? 'earned' : ''}">★</span>`).join('')}
          </div>` : ''}
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // ================== ENTER MAP ==================
  enterMap(mapId) {
    if (!GameState.isMapUnlocked(mapId)) {
      this.showToast('🔒 Area ini masih terkunci! Selesaikan area sebelumnya.');
      AudioManager.playWrong();
      return;
    }

    AudioManager.playWhoosh();
    this.currentMapData = MAPS_DATA.find(m => m.id === mapId);
    this.mapScore = 0;
    this.mapCorrect = 0;
    this.mapWrong = 0;
    this.currentQuestionIndex = 0;

    // Show map play screen
    this.renderMapIntro();
  },

  // ================== MAP INTRO ==================
  renderMapIntro() {
    const map = this.currentMapData;
    const screen = document.getElementById('gameplay-screen');
    screen.classList.remove('hidden');
    screen.classList.add('fade-in');
    document.getElementById('worldmap-screen').classList.add('hidden');

    AudioManager.playBGM('explore');

    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left">
            <button class="btn btn-small btn-secondary" onclick="Game.backToMap()">← Peta</button>
            <span class="hud-item">🗺️ MAP ${map.id}</span>
          </div>
          <div class="hud-right">
            <span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span>
            <span class="hud-item">🏅 ${GameState.progress.badges.length}</span>
          </div>
        </div>

        <div class="material-card" style="text-align:center;border-color:${map.color}22">
          <div style="font-size:4rem;margin-bottom:10px">${map.icon}</div>
          <h2 style="color:${map.color}">MAP ${map.id}: ${map.title}</h2>
          <p style="font-size:1.1rem;color:var(--text-secondary)">${map.subtitle}</p>
          <div style="margin:20px 0">
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width:0%"></div>
            </div>
            <p style="font-size:0.8rem;color:var(--text-muted)">Materi → Aktivitas → Tantangan</p>
          </div>
          <button class="btn btn-primary" onclick="Game.showMapMaterial()">📚 Baca Materi</button>
        </div>
      </div>
    `;
  },

  // ================== MAP MATERIAL ==================
  showMapMaterial() {
    const map = this.currentMapData;
    AudioManager.playWhoosh();

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left">
            <button class="btn btn-small btn-secondary" onclick="Game.backToMap()">← Peta</button>
            <span class="hud-item">📚 Materi</span>
          </div>
          <div class="hud-right">
            <span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span>
          </div>
        </div>

        <div class="material-card">
          <h2>${map.material.title}</h2>
          <div class="material-content">
            ${map.material.content.map(p => `<p>${p}</p>`).join('')}
          </div>
          ${map.material.funFacts.map(f => `<div class="fun-fact">${f}</div>`).join('')}
          <div class="love-message">
            <span class="love-type">❤️ ${map.loveMessage.type}</span>
            <span class="love-text">${map.loveMessage.message}</span>
          </div>
        </div>

        <div style="text-align:center;margin-top:10px">
          <button class="btn btn-success" onclick="Game.completeMaterial()">✅ Sudah Membaca! Lanjut ke Aktivitas</button>
        </div>
      </div>
    `;

    // Add XP for reading material
    GameState.addXP(XP_VALUES.readMaterial);
    this.showXPPopup('+10 XP Membaca Materi');
  },

  completeMaterial() {
    AudioManager.playClick();
    this.showMapActivity();
  },

  // ================== MAP ACTIVITY (SORTING) ==================
  showMapActivity() {
    const map = this.currentMapData;
    AudioManager.playWhoosh();

    const items = [...map.sortActivity.correctOrder];
    // Shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left">
            <button class="btn btn-small btn-secondary" onclick="Game.backToMap()">← Peta</button>
            <span class="hud-item">🧩 Aktivitas</span>
          </div>
          <div class="hud-right">
            <span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span>
          </div>
        </div>

        <div class="material-card">
          <h2>🧩 ${map.sortActivity.title}</h2>
          <p style="text-align:center;color:var(--text-secondary);margin-bottom:15px">${map.sortActivity.instruction}</p>

          <div class="sort-container" id="sort-container">
            ${items.map((item, idx) => `
              <div class="sort-item" draggable="true" data-text="${item}"
                   ondragstart="Game.dragStart(event)" ondragover="Game.dragOver(event)" ondrop="Game.drop(event)">
                <span class="sort-number">${idx + 1}</span>
                <span class="sort-text">${item}</span>
              </div>
            `).join('')}
          </div>

          <div style="text-align:center;margin-top:15px">
            <button class="btn btn-success" onclick="Game.checkSortOrder()">✅ Periksa Urutan</button>
          </div>
        </div>
      </div>
    `;
  },

  // Drag & Drop
  dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.closest('.sort-item').dataset.text);
    e.target.closest('.sort-item').style.opacity = '0.5';
  },

  dragOver(e) {
    e.preventDefault();
  },

  drop(e) {
    e.preventDefault();
    const container = document.getElementById('sort-container');
    const draggedText = e.dataTransfer.getData('text/plain');
    const targetItem = e.target.closest('.sort-item');

    if (!targetItem) return;

    const items = [...container.querySelectorAll('.sort-item')];
    const draggedItem = items.find(i => i.dataset.text === draggedText);

    if (draggedItem && draggedItem !== targetItem) {
      const allItems = [...container.children];
      const draggedIdx = allItems.indexOf(draggedItem);
      const targetIdx = allItems.indexOf(targetItem);

      if (draggedIdx < targetIdx) {
        container.insertBefore(draggedItem, targetItem.nextSibling);
      } else {
        container.insertBefore(draggedItem, targetItem);
      }

      // Update numbers
      container.querySelectorAll('.sort-item').forEach((item, idx) => {
        item.querySelector('.sort-number').textContent = idx + 1;
      });
    }

    items.forEach(i => i.style.opacity = '1');
  },

  checkSortOrder() {
    const map = this.currentMapData;
    const container = document.getElementById('sort-container');
    const items = [...container.querySelectorAll('.sort-item')];
    const correctOrder = map.sortActivity.correctOrder;

    let allCorrect = true;
    items.forEach((item, idx) => {
      if (item.dataset.text === correctOrder[idx]) {
        item.classList.add('correct');
        item.classList.remove('incorrect');
      } else {
        item.classList.add('incorrect');
        item.classList.remove('correct');
        allCorrect = false;
      }
    });

    if (allCorrect) {
      AudioManager.playCorrect();
      this.mapCorrect++;
      this.mapScore += 20;
      GameState.addXP(XP_VALUES.correctAnswer);
      this.showXPPopup('+20 XP Urutan Benar!');

      setTimeout(() => {
        this.showMiniGame();
      }, 1200);
    } else {
      AudioManager.playWrong();
      this.mapWrong++;
      this.showToast('💡 Belum tepat. Coba susun ulang ya!');
    }
  },

  // ================== MINI GAME ==================
  showMiniGame() {
    const map = this.currentMapData;
    AudioManager.playBGM('challenge');
    AudioManager.playWhoosh();

    switch(map.miniGame.type) {
      case 'catch':
      case 'nutrient_catch':
        this.startCatchGame();
        break;
      case 'peristaltic':
        this.startPeristalticGame();
        break;
      case 'mix':
        this.startMixGame();
        break;
      case 'water_save':
        this.startWaterGame();
        break;
      case 'hygiene':
        this.startHygieneGame();
        break;
    }
  },

  // ---- CATCH GAME ----
  startCatchGame() {
    const map = this.currentMapData;
    const mg = map.miniGame;
    let score = 0;
    let timeLeft = mg.duration;
    let gameActive = true;

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left">
            <span class="hud-item">🎮 ${mg.title}</span>
          </div>
          <div class="hud-right">
            <span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span>
          </div>
        </div>

        <div class="minigame-area">
          <div class="minigame-title">${mg.title}</div>
          <div class="minigame-instruction">${mg.instruction}</div>

          <div class="minigame-canvas" id="catch-canvas">
            <div class="minigame-timer" id="catch-timer">${timeLeft}s</div>
            <div class="minigame-score" id="catch-score">Skor: 0</div>
            <div class="catcher" id="catcher">${GameState.student.character ? CHARACTERS.find(c=>c.id===GameState.student.character)?.avatar || '🧺' : '🧺'}</div>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('catch-canvas');
    const catcher = document.getElementById('catcher');
    const timerEl = document.getElementById('catch-timer');
    const scoreEl = document.getElementById('catch-score');

    // Mouse/touch move for catcher
    const canvasRect = canvas.getBoundingClientRect;
    const moveCatcher = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left - 40;
      const maxX = rect.width - 80;
      catcher.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    };

    canvas.addEventListener('mousemove', (e) => moveCatcher(e.clientX));
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      moveCatcher(e.touches[0].clientX);
    }, { passive: false });

    // Spawn items
    const allItems = mg.type === 'nutrient_catch'
      ? [...mg.nutrients.map(n => ({ ...n, good: true })), { name: 'Racun', emoji: '☠️', points: -10, good: false }, { name: 'Sampah', emoji: '🗑️', points: -10, good: false }]
      : [...mg.goodItems.map(i => ({ ...i, good: true })), ...mg.badItems.map(i => ({ ...i, good: false }))];

    const spawnItem = () => {
      if (!gameActive) return;
      const item = allItems[Math.floor(Math.random() * allItems.length)];
      const el = document.createElement('div');
      el.className = 'falling-item';
      el.textContent = item.emoji;
      el.style.left = Math.random() * (canvas.offsetWidth - 40) + 'px';
      el.style.top = '-40px';
      el.title = item.name;
      canvas.appendChild(el);

      let y = -40;
      const speed = 2 + Math.random() * 2;
      const fall = setInterval(() => {
        if (!gameActive) { clearInterval(fall); el.remove(); return; }
        y += speed;
        el.style.top = y + 'px';

        // Check catch
        const catcherRect = catcher.getBoundingClientRect();
        const itemRect = el.getBoundingClientRect();
        if (itemRect.bottom >= catcherRect.top && itemRect.top <= catcherRect.bottom &&
            itemRect.left < catcherRect.right && itemRect.right > catcherRect.left) {
          score += item.points;
          if (item.good || item.points > 0) {
            AudioManager.playCorrect();
            el.style.color = 'var(--success)';
          } else {
            AudioManager.playWrong();
            el.style.color = 'var(--danger)';
          }
          scoreEl.textContent = `Skor: ${Math.max(0, score)}`;
          clearInterval(fall);
          el.style.transition = 'transform 0.2s, opacity 0.2s';
          el.style.transform = 'scale(1.5)';
          el.style.opacity = '0';
          setTimeout(() => el.remove(), 200);
          return;
        }

        // Click/tap to collect
        el.onclick = () => {
          score += item.points;
          if (item.good || item.points > 0) {
            AudioManager.playCorrect();
          } else {
            AudioManager.playWrong();
          }
          scoreEl.textContent = `Skor: ${Math.max(0, score)}`;
          clearInterval(fall);
          el.style.transition = 'transform 0.2s, opacity 0.2s';
          el.style.transform = 'scale(1.5)';
          el.style.opacity = '0';
          setTimeout(() => el.remove(), 200);
        };

        if (y > canvas.offsetHeight) {
          clearInterval(fall);
          el.remove();
        }
      }, 30);
    };

    const spawnInterval = setInterval(() => {
      if (!gameActive) { clearInterval(spawnInterval); return; }
      spawnItem();
    }, 800);

    // Timer
    const timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `${timeLeft}s`;
      if (timeLeft <= 5) {
        timerEl.classList.add('warning');
        AudioManager.playTick();
      }
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(spawnInterval);
        gameActive = false;
        this.endMiniGame(Math.max(0, score));
      }
    }, 1000);

    this.miniGameInterval = () => {
      gameActive = false;
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
    };
  },

  // ---- PERISTALTIC GAME ----
  startPeristalticGame() {
    const map = this.currentMapData;
    const mg = map.miniGame;
    let presses = 0;
    let timeLeft = mg.duration;
    let position = 0;
    const target = mg.targetPresses;

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left"><span class="hud-item">🎮 ${mg.title}</span></div>
          <div class="hud-right"><span class="hud-item" id="peri-timer">⏱️ ${timeLeft}s</span></div>
        </div>

        <div class="minigame-area">
          <div class="minigame-title">${mg.title}</div>
          <div class="minigame-instruction">${mg.instruction}</div>

          <div class="peristaltic-track" id="peri-track">
            <div class="food-bolus" id="food-bolus" style="top:10px">🍚</div>
          </div>

          <div style="margin:10px 0">
            <div class="progress-bar-container">
              <div class="progress-bar-fill" id="peri-progress" style="width:0%"></div>
            </div>
            <p style="font-size:0.85rem;color:var(--text-muted)" id="peri-count">0 / ${target} tekanan</p>
          </div>

          <button class="peristaltic-btn" id="peri-btn" onclick="Game.peristalticPress()">
            ⬇️ TEKAN UNTUK MENDORONG!
          </button>
        </div>
      </div>
    `;

    const timerEl = document.getElementById('peri-timer');
    const timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `⏱️ ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        this.endMiniGame(Math.round((presses / target) * 30));
      }
    }, 1000);

    this._periState = { presses: 0, target, timerInterval };
  },

  peristalticPress() {
    if (!this._periState) return;
    this._periState.presses++;
    const { presses, target } = this._periState;

    AudioManager.playClick();
    const progress = Math.min((presses / target) * 100, 100);
    document.getElementById('peri-progress').style.width = progress + '%';
    document.getElementById('peri-count').textContent = `${presses} / ${target} tekanan`;

    const bolus = document.getElementById('food-bolus');
    const maxTop = 150;
    bolus.style.top = Math.min((presses / target) * maxTop, maxTop) + 'px';

    // Squeeze animation
    const track = document.getElementById('peri-track');
    track.style.transform = 'scaleX(0.95)';
    setTimeout(() => track.style.transform = '', 150);

    if (presses >= target) {
      clearInterval(this._periState.timerInterval);
      AudioManager.playCorrect();
      setTimeout(() => this.endMiniGame(30), 500);
    }
  },

  // ---- MIX GAME ----
  startMixGame() {
    const map = this.currentMapData;
    const mg = map.miniGame;
    let addedCount = 0;

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left"><span class="hud-item">🎮 ${mg.title}</span></div>
          <div class="hud-right"><span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span></div>
        </div>

        <div class="minigame-area">
          <div class="minigame-title">${mg.title}</div>
          <div class="minigame-instruction">${mg.instruction}</div>

          <div class="mixing-bowl" id="mixing-bowl">🫗</div>

          <div class="ingredient-tray" id="ingredient-tray">
            ${mg.ingredients.map((ing, i) => `
              <div class="ingredient-item" onclick="Game.addIngredient(${i}, this)">
                ${ing.emoji}
                <span class="ingredient-label">${ing.name}</span>
              </div>
            `).join('')}
          </div>

          <div id="mix-status" style="margin-top:10px;text-align:center;color:var(--text-secondary);font-size:0.9rem">
            Masukkan semua bahan ke dalam lambung!
          </div>
        </div>
      </div>
    `;

    this._mixState = { total: mg.ingredients.length, added: 0 };
  },

  addIngredient(idx, el) {
    if (el.classList.contains('added')) return;
    AudioManager.playClick();
    el.classList.add('added');
    this._mixState.added++;

    const bowl = document.getElementById('mixing-bowl');
    const status = document.getElementById('mix-status');

    if (this._mixState.added >= this._mixState.total) {
      bowl.classList.add('mixing');
      bowl.textContent = '🌀';
      status.innerHTML = '<strong style="color:var(--success-light)">Mengaduk... Makanan menjadi bubur halus!</strong>';
      AudioManager.playCorrect();

      setTimeout(() => {
        bowl.classList.remove('mixing');
        bowl.textContent = '🥣';
        status.innerHTML = '<strong style="color:var(--accent)">✅ Kim (bubur halus) sudah terbentuk!</strong>';

        setTimeout(() => this.endMiniGame(30), 1000);
      }, 2000);
    } else {
      status.textContent = `${this._mixState.added} / ${this._mixState.total} bahan ditambahkan`;
    }
  },

  // ---- WATER SAVE GAME ----
  startWaterGame() {
    const map = this.currentMapData;
    const mg = map.miniGame;
    let collected = 0;
    let timeLeft = mg.duration;
    let gameActive = true;

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left"><span class="hud-item">🎮 ${mg.title}</span></div>
          <div class="hud-right"><span class="hud-item" id="water-timer">⏱️ ${timeLeft}s</span></div>
        </div>

        <div class="minigame-area">
          <div class="minigame-title">${mg.title}</div>
          <div class="minigame-instruction">${mg.instruction}</div>

          <div class="minigame-canvas" id="water-canvas" style="background: linear-gradient(180deg, rgba(6,182,212,0.1), rgba(6,182,212,0.3))">
            <div class="minigame-score" id="water-score">💧 0 / ${mg.targetDrops}</div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-fill" id="water-progress" style="width:0%;background:linear-gradient(90deg,#29B6F6,#0288D1)"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = document.getElementById('water-canvas');

    const spawnDrop = () => {
      if (!gameActive) return;
      const drop = document.createElement('div');
      drop.className = 'water-drop';
      drop.textContent = '💧';
      drop.style.left = Math.random() * (canvas.offsetWidth - 30) + 'px';
      drop.style.top = '-20px';
      canvas.appendChild(drop);

      drop.onclick = () => {
        collected++;
        AudioManager.playXPGain();
        document.getElementById('water-score').textContent = `💧 ${collected} / ${mg.targetDrops}`;
        document.getElementById('water-progress').style.width = (collected / mg.targetDrops * 100) + '%';
        drop.style.transform = 'scale(1.5)';
        drop.style.opacity = '0';
        setTimeout(() => drop.remove(), 200);

        if (collected >= mg.targetDrops) {
          gameActive = false;
          clearInterval(spawnInt);
          clearInterval(timerInt);
          AudioManager.playCorrect();
          setTimeout(() => this.endMiniGame(30), 500);
        }
      };

      setTimeout(() => { if (drop.parentNode) drop.remove(); }, 2500);
    };

    const spawnInt = setInterval(spawnDrop, 600);
    const timerInt = setInterval(() => {
      timeLeft--;
      document.getElementById('water-timer').textContent = `⏱️ ${timeLeft}s`;
      if (timeLeft <= 0) {
        gameActive = false;
        clearInterval(spawnInt);
        clearInterval(timerInt);
        this.endMiniGame(Math.round((collected / mg.targetDrops) * 30));
      }
    }, 1000);

    this.miniGameInterval = () => { gameActive = false; clearInterval(spawnInt); clearInterval(timerInt); };
  },

  // ---- HYGIENE GAME ----
  startHygieneGame() {
    const map = this.currentMapData;
    const mg = map.miniGame;
    const allBehaviors = [
      ...mg.goodBehaviors.map(b => ({ ...b, isGood: true })),
      ...mg.badBehaviors.map(b => ({ ...b, isGood: false }))
    ].sort(() => Math.random() - 0.5);

    let score = 0;
    let answered = 0;

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left"><span class="hud-item">🎮 ${mg.title}</span></div>
          <div class="hud-right"><span class="hud-item" id="hyg-score">Skor: 0</span></div>
        </div>

        <div class="minigame-area">
          <div class="minigame-title">${mg.title}</div>
          <div class="minigame-instruction">${mg.instruction}</div>

          <div class="behavior-grid" id="behavior-grid">
            ${allBehaviors.map((b, i) => `
              <div class="behavior-item" data-good="${b.isGood}" data-idx="${i}" onclick="Game.chooseBehavior(this)">
                <span class="behavior-emoji">${b.emoji}</span>
                <span class="behavior-text">${b.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this._hygState = { total: allBehaviors.length, answered: 0, score: 0 };
  },

  chooseBehavior(el) {
    if (el.classList.contains('correct-choice') || el.classList.contains('wrong-choice')) return;

    const isGood = el.dataset.good === 'true';
    this._hygState.answered++;

    if (isGood) {
      el.classList.add('correct-choice');
      this._hygState.score += 15;
      AudioManager.playCorrect();
    } else {
      el.classList.add('wrong-choice');
      AudioManager.playWrong();
    }

    document.getElementById('hyg-score').textContent = `Skor: ${this._hygState.score}`;

    if (this._hygState.answered >= this._hygState.total) {
      setTimeout(() => this.endMiniGame(Math.min(30, this._hygState.score / 3)), 800);
    }
  },

  // ---- END MINI GAME ----
  endMiniGame(score) {
    if (this.miniGameInterval) {
      this.miniGameInterval();
      this.miniGameInterval = null;
    }

    this.mapScore += score;
    GameState.addXP(XP_VALUES.miniGame);
    this.showXPPopup(`+30 XP Mini Game!`);

    setTimeout(() => {
      this.showMapQuiz();
    }, 1000);
  },

  // ================== QUIZ ==================
  showMapQuiz() {
    const map = this.currentMapData;
    this.currentQuestionIndex = 0;
    AudioManager.playBGM('challenge');
    this.renderQuestion();
  },

  renderQuestion() {
    const map = this.currentMapData;
    const q = map.questions[this.currentQuestionIndex];
    const qNum = this.currentQuestionIndex + 1;
    const total = map.questions.length;

    const screen = document.getElementById('gameplay-screen');
    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left">
            <span class="hud-item">❓ Tantangan</span>
          </div>
          <div class="hud-right">
            <span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span>
            <span class="hud-item">✅ ${this.mapCorrect} ❌ ${this.mapWrong}</span>
          </div>
        </div>

        <div class="material-card">
          <div class="quiz-progress">Soal ${qNum} dari ${total}</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:${(qNum/total)*100}%"></div>
          </div>

          <div class="quiz-container">
            <div class="quiz-question">${q.text}</div>
            <div class="quiz-options" id="quiz-options">
              ${q.options.map((opt, i) => `
                <div class="quiz-option" onclick="Game.answerQuestion(${i})" data-idx="${i}">
                  <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                  <span>${opt}</span>
                </div>
              `).join('')}
            </div>
            <div id="quiz-feedback"></div>
          </div>
        </div>
      </div>
    `;
  },

  answerQuestion(selectedIdx) {
    const map = this.currentMapData;
    const q = map.questions[this.currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');

    // Disable all options
    options.forEach(opt => {
      opt.style.pointerEvents = 'none';
    });

    // Show correct/wrong
    options[q.correct].classList.add('correct-answer');

    if (selectedIdx === q.correct) {
      AudioManager.playCorrect();
      this.mapCorrect++;
      this.mapScore += 20;
      GameState.addXP(XP_VALUES.correctAnswer);
      this.showXPPopup('+20 XP Jawaban Benar!');
      feedback.innerHTML = `<div class="quiz-explanation correct">✅ Benar! ${q.explanation}</div>`;
    } else {
      AudioManager.playWrong();
      this.mapWrong++;
      options[selectedIdx].classList.add('wrong-answer');
      feedback.innerHTML = `<div class="quiz-explanation incorrect">💡 Belum tepat. ${q.explanation}</div>`;
    }

    // Next question or complete map
    setTimeout(() => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < map.questions.length) {
        this.renderQuestion();
      } else {
        this.completeCurrentMap();
      }
    }, 2000);
  },

  // ================== COMPLETE MAP ==================
  completeCurrentMap() {
    const map = this.currentMapData;
    const result = GameState.completeMap(map.id, this.mapScore, this.mapCorrect, this.mapWrong);

    // Add map challenge XP
    GameState.addXP(XP_VALUES.mapChallenge);

    // Add badge
    GameState.addBadge(ALL_BADGES.find(b => b.map === map.id)?.id || `map_${map.id}`);

    // Show reward
    this.showReward(map, result);
  },

  showReward(map, result) {
    AudioManager.playBadge();

    const overlay = document.createElement('div');
    overlay.className = 'reward-overlay';
    overlay.id = 'reward-overlay';
    overlay.innerHTML = `
      <div class="reward-card">
        <span class="reward-emoji">${map.badge.emoji}</span>
        <div class="reward-title">🎉 Area Selesai!</div>
        <div class="reward-desc">MAP ${map.id}: ${map.title}</div>
        <div class="reward-desc">${map.badge.description}</div>
        <div class="reward-xp">+50 XP</div>
        <div class="reward-stars">
          ${[1,2,3].map(s => s <= result.stars ? '⭐' : '☆').join(' ')}
        </div>
        <div class="reward-desc" style="margin-bottom:10px">
          🏅 Badge: <strong>${map.badge.name}</strong>
        </div>
        ${result.nextMap <= 6 ? `<div class="reward-desc" style="color:var(--info)">🔓 MAP ${result.nextMap} Terbuka!</div>` : ''}
        ${GameState.progress.completedMaps.length >= 6 ? `<div class="reward-desc" style="color:var(--secondary)">👾 FINAL BOSS Terbuka!</div>` : ''}
        <button class="btn btn-primary" style="margin-top:15px" onclick="Game.closeReward()">🗺️ Kembali ke Peta</button>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  closeReward() {
    document.getElementById('reward-overlay')?.remove();
    AudioManager.playUnlock();
    document.getElementById('gameplay-screen').classList.add('hidden');
    this.showScreen('worldmap');
  },

  backToMap() {
    if (this.miniGameInterval) {
      this.miniGameInterval();
      this.miniGameInterval = null;
    }
    document.getElementById('gameplay-screen').classList.add('hidden');
    this.showScreen('worldmap');
  },

  // ================== FINAL BOSS ==================
  enterBoss() {
    const allMapsComplete = GameState.progress.completedMaps.length >= 6;
    if (!allMapsComplete) {
      this.showToast('🔒 Selesaikan semua 6 area terlebih dahulu!');
      AudioManager.playWrong();
      return;
    }

    AudioManager.playBGM('boss');
    AudioManager.playWhoosh();

    this.bossCurrentChallenge = 0;
    this.bossScore = 0;
    this.bossCorrect = 0;
    this.bossWrong = 0;

    this.showBossIntro();
  },

  showBossIntro() {
    const boss = FINAL_BOSS_DATA;
    const screen = document.getElementById('gameplay-screen');
    screen.classList.remove('hidden');
    screen.classList.add('fade-in');
    document.getElementById('worldmap-screen').classList.add('hidden');

    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left">
            <button class="btn btn-small btn-secondary" onclick="Game.backToMap()">← Peta</button>
            <span class="hud-item">👾 FINAL BOSS</span>
          </div>
          <div class="hud-right">
            <span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span>
          </div>
        </div>

        <div class="material-card" style="text-align:center">
          <div class="boss-header">
            <span class="boss-emoji">${boss.emoji}</span>
            <h2 class="boss-name">${boss.name}</h2>
            <p class="boss-subtitle">${boss.title}</p>
          </div>

          <div class="boss-dialog">
            "${boss.intro}"
          </div>

          <div class="boss-hp-bar">
            <div class="boss-hp-fill" id="boss-hp" style="width:100%"></div>
          </div>
          <div class="boss-hp-text">❤️ Boss HP: 5 / 5 Tantangan</div>

          <button class="btn btn-danger" onclick="Game.startBossChallenge()" style="margin-top:15px">
            ⚔️ MULAI TANTANGAN!
          </button>
        </div>
      </div>
    `;
  },

  startBossChallenge() {
    this.renderBossChallenge();
  },

  renderBossChallenge() {
    const boss = FINAL_BOSS_DATA;
    const challenge = boss.challenges[this.bossCurrentChallenge];
    if (!challenge) {
      this.completeBoss();
      return;
    }

    const remaining = boss.challenges.length - this.bossCurrentChallenge;
    const hpPercent = (remaining / boss.challenges.length) * 100;

    const screen = document.getElementById('gameplay-screen');

    let challengeHTML = '';

    switch(challenge.type) {
      case 'order':
        const shuffled = [...challenge.correctOrder].sort(() => Math.random() - 0.5);
        challengeHTML = `
          <div class="sort-container" id="boss-sort">
            ${shuffled.map((item, idx) => `
              <div class="sort-item" draggable="true" data-text="${item}"
                   ondragstart="Game.dragStart(event)" ondragover="Game.dragOver(event)" ondrop="Game.bossDrop(event)">
                <span class="sort-number">${idx + 1}</span>
                <span class="sort-text">${item}</span>
              </div>
            `).join('')}
          </div>
          <button class="btn btn-success" onclick="Game.checkBossOrder()" style="margin-top:10px">✅ Periksa</button>
        `;
        break;

      case 'match':
        const shuffledFungsi = [...challenge.pairs.map(p => p.fungsi)].sort(() => Math.random() - 0.5);
        challengeHTML = `
          <div class="match-container">
            <div class="match-column" id="match-organs">
              ${challenge.pairs.map((p, i) => `
                <div class="match-item" data-organ="${p.organ}" data-idx="${i}" onclick="Game.selectMatchItem(this, 'organ')">${p.organ}</div>
              `).join('')}
            </div>
            <div class="match-arrow">→</div>
            <div class="match-column" id="match-functions">
              ${shuffledFungsi.map((f, i) => `
                <div class="match-item" data-fungsi="${f}" data-idx="${i}" onclick="Game.selectMatchItem(this, 'fungsi')">${f}</div>
              `).join('')}
            </div>
          </div>
          <div id="match-status" style="text-align:center;margin-top:10px;font-size:0.85rem;color:var(--text-muted)">Klik organ, lalu klik fungsinya!</div>
        `;
        this._matchState = { selectedOrgan: null, matched: 0, total: challenge.pairs.length, pairs: challenge.pairs };
        break;

      case 'quiz':
        this._bossQuizIndex = 0;
        this._bossQuizCorrect = 0;
        challengeHTML = this.renderBossQuiz(challenge.questions[0], 0, challenge.questions.length);
        break;

      case 'choose':
        challengeHTML = `
          <div class="choose-grid" id="choose-grid">
            ${challenge.options.map((opt, i) => `
              <div class="choose-item" data-correct="${opt.correct}" data-idx="${i}" onclick="Game.toggleChooseItem(this)">
                ${opt.text}
              </div>
            `).join('')}
          </div>
          <button class="btn btn-success" onclick="Game.checkBossChoose()" style="margin-top:10px">✅ Periksa Jawaban</button>
        `;
        break;
    }

    screen.innerHTML = `
      <div class="game-screen">
        <div class="game-hud">
          <div class="hud-left">
            <span class="hud-item">👾 Tantangan ${this.bossCurrentChallenge + 1}/5</span>
          </div>
          <div class="hud-right">
            <span class="hud-item">⭐ ${GameState.progress.totalXP} XP</span>
            <span class="hud-item">✅ ${this.bossCorrect} ❌ ${this.bossWrong}</span>
          </div>
        </div>

        <div class="material-card">
          <div class="boss-header" style="margin-bottom:10px">
            <span style="font-size:2.5rem">${boss.emoji}</span>
          </div>

          <div class="boss-hp-bar">
            <div class="boss-hp-fill" id="boss-hp" style="width:${hpPercent}%"></div>
          </div>
          <div class="boss-hp-text">❤️ Boss HP: ${remaining} / ${boss.challenges.length}</div>

          <h2 style="color:var(--secondary);font-family:var(--font-display);margin:10px 0">${challenge.title}</h2>
          <p style="text-align:center;color:var(--text-secondary);margin-bottom:15px">${challenge.instruction || ''}</p>

          <div id="boss-challenge-content">
            ${challengeHTML}
          </div>
        </div>
      </div>
    `;
  },

  renderBossQuiz(q, idx, total) {
    return `
      <div class="quiz-progress">Soal ${idx + 1} dari ${total}</div>
      <div class="quiz-question">${q.text}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" onclick="Game.answerBossQuiz(${i}, ${q.correct})" data-idx="${i}">
            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
      <div id="boss-quiz-feedback"></div>
    `;
  },

  answerBossQuiz(selected, correct) {
    const options = document.querySelectorAll('#boss-challenge-content .quiz-option');
    options.forEach(o => o.style.pointerEvents = 'none');
    options[correct].classList.add('correct-answer');

    if (selected === correct) {
      AudioManager.playCorrect();
      this._bossQuizCorrect++;
      this.bossCorrect++;
    } else {
      AudioManager.playWrong();
      this.bossWrong++;
      options[selected].classList.add('wrong-answer');
    }

    const challenge = FINAL_BOSS_DATA.challenges[this.bossCurrentChallenge];
    this._bossQuizIndex++;

    setTimeout(() => {
      if (this._bossQuizIndex < challenge.questions.length) {
        const content = document.getElementById('boss-challenge-content');
        content.innerHTML = this.renderBossQuiz(
          challenge.questions[this._bossQuizIndex],
          this._bossQuizIndex,
          challenge.questions.length
        );
      } else {
        this.bossScore += challenge.xp;
        GameState.addXP(challenge.xp);
        this.showXPPopup(`+${challenge.xp} XP`);
        this.bossCurrentChallenge++;
        setTimeout(() => this.renderBossChallenge(), 500);
      }
    }, 1200);
  },

  // Boss sorting drop
  bossDrop(e) {
    e.preventDefault();
    const container = document.getElementById('boss-sort');
    this.drop(e);
    // Re-index after drop in boss sort
    if (container) {
      container.querySelectorAll('.sort-item').forEach((item, idx) => {
        item.querySelector('.sort-number').textContent = idx + 1;
      });
    }
  },

  checkBossOrder() {
    const challenge = FINAL_BOSS_DATA.challenges[this.bossCurrentChallenge];
    const container = document.getElementById('boss-sort');
    const items = [...container.querySelectorAll('.sort-item')];

    let allCorrect = true;
    items.forEach((item, idx) => {
      if (item.dataset.text === challenge.correctOrder[idx]) {
        item.classList.add('correct');
      } else {
        item.classList.add('incorrect');
        allCorrect = false;
      }
    });

    if (allCorrect) {
      AudioManager.playCorrect();
      this.bossCorrect++;
      this.bossScore += challenge.xp;
      GameState.addXP(challenge.xp);
      this.showXPPopup(`+${challenge.xp} XP`);
      this.bossCurrentChallenge++;
      setTimeout(() => this.renderBossChallenge(), 1000);
    } else {
      AudioManager.playWrong();
      this.bossWrong++;
      this.showToast('💡 Belum tepat. Coba susun ulang!');
      setTimeout(() => {
        items.forEach(i => { i.classList.remove('correct', 'incorrect'); });
      }, 1500);
    }
  },

  // Match game
  selectMatchItem(el, type) {
    if (el.classList.contains('matched')) return;

    if (type === 'organ') {
      document.querySelectorAll('#match-organs .match-item').forEach(i => i.classList.remove('selected'));
      el.classList.add('selected');
      this._matchState.selectedOrgan = el.dataset.organ;
    } else if (type === 'fungsi' && this._matchState.selectedOrgan) {
      const organ = this._matchState.selectedOrgan;
      const fungsi = el.dataset.fungsi;
      const pair = this._matchState.pairs.find(p => p.organ === organ);

      if (pair && pair.fungsi === fungsi) {
        // Correct match
        AudioManager.playCorrect();
        document.querySelector(`#match-organs .match-item[data-organ="${organ}"]`).classList.add('matched');
        el.classList.add('matched');
        this._matchState.matched++;
        this._matchState.selectedOrgan = null;
        document.getElementById('match-status').textContent = `✅ ${this._matchState.matched} / ${this._matchState.total} terpasang`;

        if (this._matchState.matched >= this._matchState.total) {
          const challenge = FINAL_BOSS_DATA.challenges[this.bossCurrentChallenge];
          this.bossCorrect++;
          this.bossScore += challenge.xp;
          GameState.addXP(challenge.xp);
          this.showXPPopup(`+${challenge.xp} XP`);
          this.bossCurrentChallenge++;
          setTimeout(() => this.renderBossChallenge(), 1000);
        }
      } else {
        AudioManager.playWrong();
        this.showToast('💡 Pasangan belum tepat!');
        document.querySelectorAll('#match-organs .match-item').forEach(i => i.classList.remove('selected'));
        this._matchState.selectedOrgan = null;
      }
    }
  },

  // Choose correct items
  toggleChooseItem(el) {
    el.classList.toggle('chosen');
    AudioManager.playClick();
  },

  checkBossChoose() {
    const challenge = FINAL_BOSS_DATA.challenges[this.bossCurrentChallenge];
    const items = document.querySelectorAll('#choose-grid .choose-item');
    let allCorrect = true;

    items.forEach(item => {
      const isCorrect = item.dataset.correct === 'true';
      const isChosen = item.classList.contains('chosen');

      if (isCorrect && isChosen) {
        item.classList.add('correct-choice');
      } else if (!isCorrect && isChosen) {
        item.classList.add('wrong-choice');
        allCorrect = false;
      } else if (isCorrect && !isChosen) {
        item.classList.add('correct-choice');
        allCorrect = false;
      }
      item.style.pointerEvents = 'none';
    });

    if (allCorrect) {
      AudioManager.playCorrect();
      this.bossCorrect++;
    } else {
      AudioManager.playWrong();
      this.bossWrong++;
      this.showToast('💡 Hampir benar! Perhatikan jawaban yang benar.');
    }

    this.bossScore += challenge.xp;
    GameState.addXP(challenge.xp);
    this.showXPPopup(`+${challenge.xp} XP`);
    this.bossCurrentChallenge++;
    setTimeout(() => this.renderBossChallenge(), 1500);
  },

  // ================== COMPLETE BOSS ==================
  completeBoss() {
    // Save boss result
    GameState.completeMap(7, this.bossScore, this.bossCorrect, this.bossWrong);
    GameState.addXP(XP_VALUES.finalBoss);
    GameState.addBadge('master');

    // Show victory
    document.getElementById('gameplay-screen').classList.add('hidden');
    AudioManager.playVictory();
    this.showScreen('victory');
  },

  goToReflection() {
    AudioManager.playClick();
    AudioManager.playBGM('menu');
    this.showScreen('reflection');
    this.renderReflection();
  },

  // ================== VICTORY ==================
  createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#FF9A9E', '#29B6F6', '#4CAF50', '#FFB74D'];
    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        left: ${Math.random() * 100}%;
        top: -10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        animation-duration: ${Math.random() * 2 + 1.5}s;
        animation-delay: ${Math.random() * 2}s;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }
  },

  // ================== REFLECTION ==================
  renderReflection() {
    const container = document.getElementById('reflection-content');
    if (!container) return;

    container.innerHTML = `
      <div class="reflection-card">
        <h3>1. 📚 Apa hal baru yang kamu pelajari?</h3>
        <div class="reflection-checkbox-group">
          ${['Organ pencernaan manusia', 'Proses perjalanan makanan', 'Nutrisi dan manfaatnya', 'Cara menjaga kesehatan pencernaan'].map((item, i) => `
            <div class="reflection-checkbox">
              <input type="checkbox" id="learn-${i}" value="${item}" onchange="Game.updateReflectionCheckbox('newLearning')">
              <label for="learn-${i}">${item}</label>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reflection-card">
        <h3>2. ⭐ Bagian mana yang paling kamu sukai?</h3>
        <div class="reflection-checkbox-group">
          ${['Mulut', 'Kerongkongan', 'Lambung', 'Usus Halus', 'Usus Besar', 'Final Boss'].map((item, i) => `
            <div class="reflection-checkbox">
              <input type="checkbox" id="fav-${i}" value="${item}" onchange="Game.updateReflectionCheckbox('favoritePart')">
              <label for="fav-${i}">${item}</label>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reflection-card">
        <h3>3. 💪 Kebiasaan apa yang akan kamu lakukan?</h3>
        <div class="reflection-checkbox-group">
          ${['Makan makanan bergizi', 'Minum air yang cukup', 'Rajin mencuci tangan', 'Menjaga kebersihan toilet', 'Makan teratur', 'Olahraga teratur'].map((item, i) => `
            <div class="reflection-checkbox">
              <input type="checkbox" id="habit-${i}" value="${item}" onchange="Game.updateReflectionCheckbox('healthyHabits')">
              <label for="habit-${i}">${item}</label>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reflection-card">
        <h3>4. 😊 Bagaimana perasaanmu setelah bermain?</h3>
        <div class="feeling-options">
          ${[
            { emoji: '😊', text: 'Sangat senang' },
            { emoji: '🙂', text: 'Senang' },
            { emoji: '😐', text: 'Biasa saja' },
            { emoji: '😟', text: 'Perlu bantuan' }
          ].map(f => `
            <div class="feeling-btn" onclick="Game.selectFeeling('${f.text}', this)">
              <span class="feeling-emoji">${f.emoji}</span>
              <span class="feeling-text">${f.text}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="reflection-card">
        <h3>5. ✍️ Tuliskan satu hal yang akan kamu lakukan untuk menjaga kesehatan sistem pencernaanmu:</h3>
        <textarea class="reflection-textarea" id="reflection-open" placeholder="Tulis jawabanmu di sini..." oninput="Game.updateOpenResponse()"></textarea>
      </div>

      <div style="text-align:center;margin-top:15px">
        <button class="btn btn-primary" onclick="Game.submitReflection()">📊 Lihat Hasil & Buat Laporan</button>
      </div>
    `;
  },

  updateReflectionCheckbox(field) {
    const checkboxes = document.querySelectorAll(
      field === 'newLearning' ? '[id^="learn-"]' :
      field === 'favoritePart' ? '[id^="fav-"]' : '[id^="habit-"]'
    );
    GameState.reflection[field] = [...checkboxes].filter(cb => cb.checked).map(cb => cb.value);
  },

  selectFeeling(feeling, el) {
    AudioManager.playClick();
    document.querySelectorAll('.feeling-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    GameState.reflection.feeling = feeling;
  },

  updateOpenResponse() {
    GameState.reflection.openResponse = document.getElementById('reflection-open')?.value || '';
  },

  submitReflection() {
    // Update open response one more time
    this.updateOpenResponse();

    // Save session end time
    GameState.session.endTime = new Date().toISOString();
    if (GameState.session.startTime) {
      GameState.session.duration = new Date(GameState.session.endTime) - new Date(GameState.session.startTime);
    }
    GameState.save();

    AudioManager.playClick();
    this.showScreen('results');
    this.renderResults();
  },

  // ================== RESULTS ==================
  renderResults() {
    const container = document.getElementById('results-content');
    if (!container) return;

    const char = CHARACTERS.find(c => c.id === GameState.student.character);
    const overallPct = GameState.getOverallPercentage();
    const totalStars = GameState.getTotalStars();
    const duration = GameState.session.duration ? Math.round(GameState.session.duration / 60000) : 0;

    let statusText = 'Perlu Penguatan';
    let statusColor = 'var(--warning)';
    if (overallPct >= 90) { statusText = 'Sangat Baik'; statusColor = 'var(--success)'; }
    else if (overallPct >= 70) { statusText = 'Baik'; statusColor = 'var(--info)'; }
    else if (overallPct >= 50) { statusText = 'Cukup'; statusColor = 'var(--accent)'; }

    container.innerHTML = `
      <div class="results-card">
        <h3>📊 Ringkasan Hasil</h3>
        <div style="text-align:center;margin-bottom:15px">
          <span style="font-size:3rem">${char?.avatar || '🧑'}</span>
          <div style="font-size:1.2rem;font-weight:700;margin:5px 0">${GameState.student.name}</div>
          <div style="color:var(--text-muted);font-size:0.85rem">${char?.name || ''} - ${char?.title || ''}</div>
        </div>

        <div class="result-stat">
          <span class="stat-label">Total XP</span>
          <span class="stat-value" style="color:var(--accent)">⭐ ${GameState.progress.totalXP} XP</span>
        </div>
        <div class="result-stat">
          <span class="stat-label">Skor Keseluruhan</span>
          <span class="stat-value">${overallPct}%</span>
        </div>
        <div class="result-stat">
          <span class="stat-label">Total Bintang</span>
          <span class="stat-value" style="color:var(--accent)">${'⭐'.repeat(Math.min(totalStars, 21))}</span>
        </div>
        <div class="result-stat">
          <span class="stat-label">Durasi Bermain</span>
          <span class="stat-value">${duration} menit</span>
        </div>
        <div class="result-stat">
          <span class="stat-label">Status</span>
          <span class="stat-value" style="color:${statusColor}">${statusText}</span>
        </div>
      </div>

      <div class="results-card">
        <h3>🗺️ Hasil Setiap Area</h3>
        <table class="result-table">
          <tr>
            <th>Map</th>
            <th>Materi</th>
            <th>Benar</th>
            <th>Salah</th>
            <th>Bintang</th>
          </tr>
          ${MAPS_DATA.map(map => {
            const r = GameState.mapResults[map.id] || {};
            const stars = GameState.progress.stars[map.id] || 0;
            return `
              <tr>
                <td>${map.id}</td>
                <td>${map.title}</td>
                <td style="color:var(--success)">${r.correctAnswers || 0}</td>
                <td style="color:var(--secondary)">${r.wrongAnswers || 0}</td>
                <td>${'⭐'.repeat(stars)}</td>
              </tr>
            `;
          }).join('')}
          <tr style="font-weight:700">
            <td>B</td>
            <td>FINAL BOSS</td>
            <td style="color:var(--success)">${GameState.mapResults[7]?.correctAnswers || 0}</td>
            <td style="color:var(--secondary)">${GameState.mapResults[7]?.wrongAnswers || 0}</td>
            <td>${'⭐'.repeat(GameState.progress.stars[7] || 0)}</td>
          </tr>
        </table>
      </div>

      <div class="results-card">
        <h3>🏅 Badge</h3>
        <div class="badge-collection">
          ${ALL_BADGES.map(badge => {
            const earned = GameState.progress.badges.includes(badge.id);
            return `
              <div class="badge-item ${earned ? 'earned' : 'not-earned'}">
                <span class="badge-emoji">${badge.emoji}</span>
                <span class="badge-name">${badge.name}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="results-actions">
        <button class="btn btn-primary" onclick="Game.generatePDF()">📄 Buat Laporan PDF</button>
        <button class="btn btn-accent" onclick="Game.playAgain()">🔄 Main Lagi</button>
        <button class="btn btn-secondary" onclick="Game.showScreen('worldmap')">🗺️ Kembali ke Peta</button>
      </div>
    `;
  },

  // ================== PDF ==================
  generatePDF() {
    AudioManager.playClick();
    try {
      PDFReport.generate();
      this.showToast('📄 Laporan PDF berhasil dibuat!');
    } catch (e) {
      console.error('PDF Error:', e);
      this.showToast('⚠️ Gagal membuat PDF. Silakan coba lagi.');
    }
  },

  // ================== PLAY AGAIN ==================
  playAgain() {
    AudioManager.playClick();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" style="text-align:center">
        <h2>🔄 Main Lagi?</h2>
        <p style="margin-bottom:15px">Semua progres akan dihapus dan kamu akan memulai dari awal. Yakin?</p>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="btn btn-danger btn-small" onclick="Game.confirmPlayAgain()">Ya, Ulangi</button>
          <button class="btn btn-secondary btn-small" onclick="this.closest('.modal-overlay').remove()">Batal</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  confirmPlayAgain() {
    document.querySelector('.modal-overlay')?.remove();
    GameState.clearSave();
    GameState.init();
    this.showScreen('cover');
  },

  // ================== UTILITIES ==================
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  },

  showXPPopup(text) {
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.textContent = text;
    document.body.appendChild(popup);
    AudioManager.playXPGain();
    setTimeout(() => popup.remove(), 1500);
  }
};

// ================== INIT ON LOAD ==================
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
