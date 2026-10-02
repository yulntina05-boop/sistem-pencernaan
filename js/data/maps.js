// ============================================
// DATA MAPS / LEVEL GAME
// Game Edukasi IPAS - Misi Pencernaan
// ============================================

const MAPS_DATA = [
  {
    id: 1,
    title: 'MULUT',
    subtitle: 'Gerbang Pertama Pencernaan',
    icon: '👄',
    color: '#FF6B6B',
    bgGradient: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
    organEmoji: '🦷',
    loveMessage: {
      type: 'Cinta kepada Allah',
      message: 'Yuk bersyukur karena Allah memberi kita tubuh yang harus kita jaga. Mulut adalah anugerah agar kita bisa makan dan berbicara.'
    },
    material: {
      title: 'Perjalanan Makanan Dimulai dari Mulut',
      content: [
        'Mulut adalah organ pertama dalam sistem pencernaan manusia.',
        'Di dalam mulut terdapat gigi, lidah, dan kelenjar air liur.',
        'Gigi berfungsi untuk mengunyah dan menghaluskan makanan.',
        'Lidah membantu mengatur makanan agar mudah dikunyah dan ditelan.',
        'Air liur mengandung enzim amilase yang membantu memecah zat tepung menjadi gula.',
        'Proses mengunyah makanan di mulut disebut pencernaan mekanis.',
        'Proses pemecahan zat makanan oleh enzim disebut pencernaan kimiawi.'
      ],
      funFacts: [
        'Tahukah kamu? Manusia dewasa memiliki 32 gigi!',
        'Air liur yang dihasilkan setiap hari bisa mencapai 1 liter!',
        'Lidah memiliki ribuan papila pengecap untuk merasakan makanan.'
      ]
    },
    miniGame: {
      type: 'catch',
      title: 'Tangkap Makanan Sehat!',
      instruction: 'Gerakkan keranjang untuk menangkap makanan sehat. Hindari benda yang bukan makanan!',
      duration: 30,
      goodItems: [
        { name: 'Apel', emoji: '🍎', points: 10 },
        { name: 'Nasi', emoji: '🍚', points: 10 },
        { name: 'Sayur', emoji: '🥦', points: 10 },
        { name: 'Ikan', emoji: '🐟', points: 10 },
        { name: 'Susu', emoji: '🥛', points: 10 },
        { name: 'Wortel', emoji: '🥕', points: 10 },
        { name: 'Pisang', emoji: '🍌', points: 10 },
        { name: 'Telur', emoji: '🥚', points: 10 }
      ],
      badItems: [
        { name: 'Batu', emoji: '🪨', points: -5 },
        { name: 'Sepatu', emoji: '👟', points: -5 },
        { name: 'Kunci', emoji: '🔑', points: -5 },
        { name: 'Bola', emoji: '⚽', points: -5 }
      ]
    },
    sortActivity: {
      title: 'Susun Proses di Mulut!',
      instruction: 'Urutkan proses pencernaan di mulut dengan benar!',
      correctOrder: [
        'Makanan masuk ke mulut',
        'Gigi mengunyah makanan',
        'Air liur membasahi makanan',
        'Lidah membantu mengaduk',
        'Makanan siap ditelan'
      ]
    },
    questions: [
      {
        text: 'Organ yang pertama kali menerima makanan adalah...',
        options: ['Lambung', 'Mulut', 'Usus', 'Kerongkongan'],
        correct: 1,
        explanation: 'Mulut adalah organ pertama yang menerima makanan saat kita makan.'
      },
      {
        text: 'Fungsi gigi dalam pencernaan adalah...',
        options: ['Menyerap nutrisi', 'Mengunyah dan menghaluskan makanan', 'Mendorong makanan', 'Menyimpan makanan'],
        correct: 1,
        explanation: 'Gigi berfungsi untuk mengunyah dan menghaluskan makanan agar mudah ditelan.'
      },
      {
        text: 'Enzim yang terdapat di air liur disebut...',
        options: ['Pepsin', 'Amilase', 'Lipase', 'Tripsin'],
        correct: 1,
        explanation: 'Enzim amilase dalam air liur membantu memecah zat tepung menjadi gula.'
      },
      {
        text: 'Pencernaan yang terjadi karena kerja gigi disebut pencernaan...',
        options: ['Kimiawi', 'Mekanis', 'Biologis', 'Alami'],
        correct: 1,
        explanation: 'Pencernaan mekanis adalah pencernaan yang menggunakan gerakan fisik, seperti mengunyah.'
      }
    ],
    badge: {
      name: 'Penjelajah Mulut',
      emoji: '👄',
      description: 'Kamu berhasil menjelajahi gerbang pertama pencernaan!'
    }
  },
  {
    id: 2,
    title: 'KERONGKONGAN',
    subtitle: 'Lorong Peristaltik',
    icon: '🔽',
    color: '#4ECDC4',
    bgGradient: 'linear-gradient(135deg, #A8E6CF 0%, #88D8B0 100%)',
    organEmoji: '🔽',
    loveMessage: {
      type: 'Cinta kepada Ilmu',
      message: 'Belajar tentang tubuh membantu kita memahami betapa luar biasanya ciptaan Allah. Teruslah belajar!'
    },
    material: {
      title: 'Kerongkongan: Lorong Menuju Lambung',
      content: [
        'Kerongkongan (esofagus) adalah saluran yang menghubungkan mulut dengan lambung.',
        'Panjang kerongkongan sekitar 25 cm pada orang dewasa.',
        'Kerongkongan memiliki otot-otot yang bekerja secara otomatis.',
        'Gerakan otot kerongkongan yang meremas secara berurutan disebut gerak peristaltik.',
        'Gerak peristaltik mendorong makanan menuju lambung.',
        'Berkat gerak peristaltik, makanan bisa bergerak ke lambung meskipun kita dalam posisi terbalik!',
        'Di ujung kerongkongan terdapat katup yang mencegah makanan kembali ke mulut.'
      ],
      funFacts: [
        'Makanan hanya membutuhkan 5-8 detik untuk melewati kerongkongan!',
        'Bahkan astronot bisa makan di luar angkasa karena gerakan peristaltik tidak bergantung pada gravitasi!'
      ]
    },
    miniGame: {
      type: 'peristaltic',
      title: 'Dorong Makanan!',
      instruction: 'Tekan tombol dengan ritme yang tepat untuk membuat gerakan peristaltik dan mendorong makanan ke lambung!',
      duration: 25,
      targetPresses: 10
    },
    sortActivity: {
      title: 'Susun Proses Peristaltik!',
      instruction: 'Urutkan cara kerja gerak peristaltik!',
      correctOrder: [
        'Makanan ditelan dari mulut',
        'Makanan masuk ke kerongkongan',
        'Otot kerongkongan meremas',
        'Makanan didorong ke bawah',
        'Makanan sampai di lambung'
      ]
    },
    questions: [
      {
        text: 'Apa fungsi utama kerongkongan?',
        options: ['Mengunyah makanan', 'Menyalurkan makanan dari mulut ke lambung', 'Menyerap nutrisi', 'Menyimpan makanan'],
        correct: 1,
        explanation: 'Kerongkongan berfungsi menyalurkan makanan dari mulut menuju lambung.'
      },
      {
        text: 'Gerakan otot kerongkongan yang meremas secara berurutan disebut...',
        options: ['Gerak refleks', 'Gerak peristaltik', 'Gerak otot lurik', 'Gerak mekanis'],
        correct: 1,
        explanation: 'Gerak peristaltik adalah gerakan meremas otot kerongkongan secara berurutan untuk mendorong makanan.'
      },
      {
        text: 'Mengapa makanan bisa bergerak ke lambung meskipun kita dalam posisi tidur?',
        options: ['Karena gravitasi', 'Karena gerakan peristaltik', 'Karena tekanan udara', 'Karena air liur'],
        correct: 1,
        explanation: 'Gerakan peristaltik mendorong makanan tanpa bergantung pada gravitasi.'
      }
    ],
    badge: {
      name: 'Ahli Peristaltik',
      emoji: '🔽',
      description: 'Kamu memahami cara kerja gerakan peristaltik!'
    }
  },
  {
    id: 3,
    title: 'LAMBUNG',
    subtitle: 'Laboratorium Pencernaan',
    icon: '🧪',
    color: '#FFE66D',
    bgGradient: 'linear-gradient(135deg, #FFE985 0%, #FA742B 100%)',
    organEmoji: '🧪',
    loveMessage: {
      type: 'Cinta kepada Diri Sendiri',
      message: 'Menjaga makanan yang kita konsumsi adalah bentuk menyayangi diri sendiri. Makan yang teratur dan bergizi ya!'
    },
    material: {
      title: 'Lambung: Tempat Pengolahan Makanan',
      content: [
        'Lambung adalah organ berbentuk kantong yang terletak di perut bagian kiri atas.',
        'Lambung dapat menampung sekitar 1-1,5 liter makanan.',
        'Di dalam lambung, makanan diaduk dan dicampur dengan cairan lambung.',
        'Cairan lambung mengandung asam klorida (HCl) dan enzim pepsin.',
        'Asam lambung membantu membunuh kuman yang masuk bersama makanan.',
        'Enzim pepsin memecah protein menjadi bagian yang lebih kecil.',
        'Makanan di lambung diaduk selama 2-6 jam hingga menjadi bubur halus yang disebut kim (chyme).'
      ],
      funFacts: [
        'Lambung menghasilkan cairan asam yang sangat kuat! Tapi dinding lambung dilindungi oleh lapisan lendir.',
        'Lambung bisa memproses berbagai jenis makanan secara bersamaan!'
      ]
    },
    miniGame: {
      type: 'mix',
      title: 'Campurkan Makanan!',
      instruction: 'Masukkan bahan makanan ke dalam lambung dan aduk hingga menjadi bubur halus!',
      duration: 30,
      ingredients: [
        { name: 'Nasi', emoji: '🍚' },
        { name: 'Daging', emoji: '🥩' },
        { name: 'Sayuran', emoji: '🥦' },
        { name: 'Asam Lambung', emoji: '🧪' },
        { name: 'Enzim Pepsin', emoji: '⚗️' }
      ]
    },
    sortActivity: {
      title: 'Susun Proses di Lambung!',
      instruction: 'Urutkan apa yang terjadi di dalam lambung!',
      correctOrder: [
        'Makanan masuk dari kerongkongan',
        'Lambung mengeluarkan asam dan enzim',
        'Makanan diaduk oleh otot lambung',
        'Protein dipecah oleh enzim pepsin',
        'Makanan menjadi bubur halus (kim)'
      ]
    },
    questions: [
      {
        text: 'Apa fungsi utama lambung?',
        options: ['Menyerap nutrisi', 'Mengaduk dan mencerna makanan', 'Mengeluarkan sisa makanan', 'Menyimpan air'],
        correct: 1,
        explanation: 'Lambung berfungsi mengaduk makanan dan mencernanya dengan bantuan asam dan enzim.'
      },
      {
        text: 'Enzim yang terdapat di lambung adalah...',
        options: ['Amilase', 'Pepsin', 'Lipase', 'Maltase'],
        correct: 1,
        explanation: 'Enzim pepsin di lambung berfungsi memecah protein.'
      },
      {
        text: 'Makanan yang telah diolah di lambung menjadi bubur halus disebut...',
        options: ['Bolus', 'Kim (chyme)', 'Feses', 'Nutrisi'],
        correct: 1,
        explanation: 'Kim atau chyme adalah bubur halus hasil pengolahan makanan di lambung.'
      },
      {
        text: 'Berapa lama makanan diaduk di dalam lambung?',
        options: ['1-2 menit', '10-20 menit', '2-6 jam', '1-2 hari'],
        correct: 2,
        explanation: 'Makanan diaduk di lambung selama 2-6 jam tergantung jenis makanannya.'
      }
    ],
    badge: {
      name: 'Penjaga Lambung',
      emoji: '🧪',
      description: 'Kamu telah memahami cara kerja lambung!'
    }
  },
  {
    id: 4,
    title: 'USUS HALUS',
    subtitle: 'Kota Penyerapan Nutrisi',
    icon: '🏙️',
    color: '#A78BFA',
    bgGradient: 'linear-gradient(135deg, #C3A6FF 0%, #8B5CF6 100%)',
    organEmoji: '🫧',
    loveMessage: {
      type: 'Cinta kepada Sesama',
      message: 'Nutrisi membuat tubuh kita sehat dan kuat. Dengan tubuh yang sehat, kita bisa membantu orang lain. Ajak temanmu makan makanan bergizi!'
    },
    material: {
      title: 'Usus Halus: Tempat Penyerapan Nutrisi',
      content: [
        'Usus halus adalah organ pencernaan terpanjang, sekitar 6-7 meter!',
        'Usus halus terdiri dari tiga bagian: usus dua belas jari, usus kosong, dan usus penyerap.',
        'Di usus halus, pencernaan makanan dilanjutkan dengan bantuan enzim dari pankreas dan empedu dari hati.',
        'Dinding usus halus memiliki banyak lipatan kecil yang disebut vili (jonjot usus).',
        'Vili memperbesar permukaan penyerapan sehingga nutrisi dapat diserap lebih efektif.',
        'Nutrisi yang diserap meliputi karbohidrat (glukosa), protein (asam amino), lemak, vitamin, dan mineral.',
        'Nutrisi yang sudah diserap dibawa oleh darah ke seluruh tubuh untuk pertumbuhan dan energi.'
      ],
      funFacts: [
        'Jika usus halus dibentangkan, luasnya bisa seluas lapangan tenis!',
        'Usus halus memiliki jutaan vili yang bekerja menyerap nutrisi setiap saat!'
      ]
    },
    miniGame: {
      type: 'nutrient_catch',
      title: 'Tangkap Nutrisinya!',
      instruction: 'Tangkap nutrisi yang jatuh dan masukkan ke pembuluh darah! Setiap nutrisi memiliki warna berbeda.',
      duration: 35,
      nutrients: [
        { name: 'Glukosa', emoji: '🟡', color: '#FFD700', points: 10, benefit: 'Sumber energi tubuh' },
        { name: 'Protein', emoji: '🟢', color: '#4CAF50', points: 10, benefit: 'Untuk pertumbuhan' },
        { name: 'Vitamin', emoji: '🔵', color: '#2196F3', points: 10, benefit: 'Menjaga kesehatan' },
        { name: 'Mineral', emoji: '🟣', color: '#9C27B0', points: 10, benefit: 'Membantu fungsi tubuh' },
        { name: 'Lemak', emoji: '🟠', color: '#FF9800', points: 10, benefit: 'Cadangan energi' }
      ]
    },
    sortActivity: {
      title: 'Cocokkan Nutrisi dan Manfaatnya!',
      instruction: 'Pasangkan setiap nutrisi dengan manfaatnya yang benar!',
      correctOrder: [
        'Karbohidrat → Sumber energi',
        'Protein → Pertumbuhan tubuh',
        'Vitamin → Menjaga kesehatan',
        'Mineral → Membantu fungsi tubuh',
        'Lemak → Cadangan energi'
      ]
    },
    questions: [
      {
        text: 'Organ pencernaan terpanjang dalam tubuh manusia adalah...',
        options: ['Lambung', 'Usus besar', 'Usus halus', 'Kerongkongan'],
        correct: 2,
        explanation: 'Usus halus adalah organ pencernaan terpanjang, sekitar 6-7 meter!'
      },
      {
        text: 'Lipatan kecil pada dinding usus halus yang membantu penyerapan disebut...',
        options: ['Vena', 'Vili (jonjot usus)', 'Sel darah', 'Enzim'],
        correct: 1,
        explanation: 'Vili atau jonjot usus memperbesar permukaan penyerapan di usus halus.'
      },
      {
        text: 'Nutrisi yang diserap usus halus dibawa ke seluruh tubuh oleh...',
        options: ['Udara', 'Darah', 'Air liur', 'Enzim'],
        correct: 1,
        explanation: 'Darah membawa nutrisi dari usus halus ke seluruh tubuh.'
      },
      {
        text: 'Manfaat protein bagi tubuh adalah...',
        options: ['Sumber energi utama', 'Untuk pertumbuhan tubuh', 'Cadangan energi', 'Menjaga suhu tubuh'],
        correct: 1,
        explanation: 'Protein sangat penting untuk pertumbuhan dan perbaikan sel-sel tubuh.'
      }
    ],
    badge: {
      name: 'Ahli Nutrisi',
      emoji: '🫧',
      description: 'Kamu memahami cara penyerapan nutrisi di usus halus!'
    }
  },
  {
    id: 5,
    title: 'USUS BESAR',
    subtitle: 'Misi Menyelamatkan Air',
    icon: '💧',
    color: '#06B6D4',
    bgGradient: 'linear-gradient(135deg, #89CFF0 0%, #00B4D8 100%)',
    organEmoji: '💧',
    loveMessage: {
      type: 'Cinta kepada Lingkungan',
      message: 'Air sangat penting bagi tubuh dan lingkungan. Jagalah kebersihan air dan jangan membuang sampah sembarangan!'
    },
    material: {
      title: 'Usus Besar: Penyerap Air',
      content: [
        'Usus besar memiliki panjang sekitar 1,5 meter.',
        'Fungsi utama usus besar adalah menyerap air dan garam mineral dari sisa makanan.',
        'Setelah air diserap, sisa makanan menjadi lebih padat dan membentuk feses.',
        'Usus besar juga mengandung bakteri baik yang membantu proses pembusukan.',
        'Bakteri baik di usus besar menghasilkan beberapa vitamin seperti vitamin K.',
        'Proses di usus besar berlangsung selama 12-36 jam.',
        'Makan makanan berserat dan minum air cukup membantu usus besar bekerja dengan baik.'
      ],
      funFacts: [
        'Usus besar mengandung triliunan bakteri baik yang membantu pencernaan!',
        'Sebagian besar air yang kita minum diserap kembali oleh usus besar.'
      ]
    },
    miniGame: {
      type: 'water_save',
      title: 'Selamatkan Air!',
      instruction: 'Bantu tubuh menyerap air dari sisa makanan! Klik tetesan air sebelum mereka hilang!',
      duration: 25,
      targetDrops: 15
    },
    sortActivity: {
      title: 'Susun Proses di Usus Besar!',
      instruction: 'Urutkan apa yang terjadi di usus besar!',
      correctOrder: [
        'Sisa makanan masuk dari usus halus',
        'Air diserap oleh usus besar',
        'Garam mineral diserap',
        'Sisa makanan menjadi padat',
        'Feses terbentuk'
      ]
    },
    questions: [
      {
        text: 'Fungsi utama usus besar adalah...',
        options: ['Mencerna protein', 'Menyerap air dan garam mineral', 'Mengunyah makanan', 'Menghasilkan enzim'],
        correct: 1,
        explanation: 'Usus besar berfungsi menyerap air dan garam mineral dari sisa makanan.'
      },
      {
        text: 'Setelah air diserap oleh usus besar, sisa makanan menjadi...',
        options: ['Cair', 'Padat (feses)', 'Gas', 'Menghilang'],
        correct: 1,
        explanation: 'Setelah air diserap, sisa makanan menjadi lebih padat dan membentuk feses.'
      },
      {
        text: 'Bakteri baik di usus besar membantu menghasilkan...',
        options: ['Asam lambung', 'Vitamin K', 'Air liur', 'Darah'],
        correct: 1,
        explanation: 'Bakteri baik di usus besar membantu menghasilkan vitamin K yang penting bagi tubuh.'
      }
    ],
    badge: {
      name: 'Penyelamat Air',
      emoji: '💧',
      description: 'Kamu berhasil memahami misi usus besar!'
    }
  },
  {
    id: 6,
    title: 'REKTUM & ANUS',
    subtitle: 'Gerbang Akhir',
    icon: '🚪',
    color: '#F472B6',
    bgGradient: 'linear-gradient(135deg, #FBC2EB 0%, #A6C1EE 100%)',
    organEmoji: '🚪',
    loveMessage: {
      type: 'Cinta kepada Diri Sendiri',
      message: 'Menjaga kebersihan diri adalah bagian dari iman. Selalu cuci tangan setelah ke toilet dan jaga kebersihan ya!'
    },
    material: {
      title: 'Rektum dan Anus: Akhir Perjalanan',
      content: [
        'Rektum adalah bagian akhir dari usus besar yang berfungsi menyimpan feses sementara.',
        'Ketika rektum sudah penuh, kita akan merasakan keinginan untuk buang air besar.',
        'Anus adalah lubang di ujung saluran pencernaan tempat feses dikeluarkan dari tubuh.',
        'Anus memiliki otot sfingter yang dapat mengontrol kapan feses dikeluarkan.',
        'Proses pengeluaran feses dari tubuh disebut defekasi.',
        'Menjaga kebersihan setelah buang air besar sangat penting untuk kesehatan.',
        'Selalu cuci tangan dengan sabun dan air mengalir setelah menggunakan toilet!'
      ],
      funFacts: [
        'Proses pencernaan dari mulut sampai feses keluar bisa memakan waktu 24-72 jam!',
        'Tubuh kita sangat efisien — hampir semua nutrisi sudah diserap sebelum feses keluar.'
      ]
    },
    miniGame: {
      type: 'hygiene',
      title: 'Jaga Kebersihan!',
      instruction: 'Pilih perilaku yang benar untuk menjaga kebersihan! Klik perilaku baik dan hindari yang buruk.',
      duration: 25,
      goodBehaviors: [
        { text: 'Cuci tangan dengan sabun', emoji: '🧼', points: 15 },
        { text: 'Gunakan toilet dengan baik', emoji: '🚽', points: 15 },
        { text: 'Jaga kebersihan toilet', emoji: '✨', points: 15 },
        { text: 'Buang sampah pada tempatnya', emoji: '🗑️', points: 15 },
        { text: 'Minum air yang cukup', emoji: '💧', points: 15 },
        { text: 'Makan makanan berserat', emoji: '🥦', points: 15 }
      ],
      badBehaviors: [
        { text: 'Tidak cuci tangan', emoji: '🦠', points: -10 },
        { text: 'Buang sampah sembarangan', emoji: '🚯', points: -10 },
        { text: 'Malas minum air', emoji: '😴', points: -10 }
      ]
    },
    sortActivity: {
      title: 'Susun Proses Terakhir!',
      instruction: 'Urutkan proses akhir pencernaan!',
      correctOrder: [
        'Feses terbentuk di usus besar',
        'Feses disimpan sementara di rektum',
        'Rektum penuh, muncul keinginan BAB',
        'Otot sfingter terbuka',
        'Feses dikeluarkan melalui anus'
      ]
    },
    questions: [
      {
        text: 'Fungsi rektum adalah...',
        options: ['Mencerna makanan', 'Menyimpan feses sementara', 'Menyerap nutrisi', 'Menghasilkan enzim'],
        correct: 1,
        explanation: 'Rektum berfungsi menyimpan feses sementara sebelum dikeluarkan.'
      },
      {
        text: 'Proses pengeluaran feses dari tubuh disebut...',
        options: ['Absorpsi', 'Defekasi', 'Peristaltik', 'Digestif'],
        correct: 1,
        explanation: 'Defekasi adalah proses pengeluaran feses dari tubuh melalui anus.'
      },
      {
        text: 'Yang harus kita lakukan setelah buang air besar adalah...',
        options: ['Langsung bermain', 'Cuci tangan dengan sabun', 'Makan lagi', 'Tidur'],
        correct: 1,
        explanation: 'Selalu cuci tangan dengan sabun dan air mengalir setelah buang air besar!'
      }
    ],
    badge: {
      name: 'Sahabat Hidup Sehat',
      emoji: '🚪',
      description: 'Kamu memahami pentingnya kebersihan dan menjaga kesehatan!'
    }
  }
];

// DATA FINAL BOSS
const FINAL_BOSS_DATA = {
  name: 'Si Kuman',
  emoji: '👾',
  title: 'Penjaga Pencernaan',
  intro: 'Hahaha! Aku Si Kuman! Untuk mengalahkanku, kamu harus menjawab semua tantanganku tentang sistem pencernaan!',
  challenges: [
    {
      type: 'order',
      title: 'Tantangan 1: Urutkan Organ Pencernaan!',
      instruction: 'Urutkan organ sistem pencernaan dari awal sampai akhir!',
      correctOrder: ['Mulut', 'Kerongkongan', 'Lambung', 'Usus Halus', 'Usus Besar', 'Rektum & Anus'],
      xp: 20
    },
    {
      type: 'match',
      title: 'Tantangan 2: Cocokkan Organ dan Fungsinya!',
      instruction: 'Pasangkan setiap organ dengan fungsinya yang benar!',
      pairs: [
        { organ: 'Mulut', fungsi: 'Mengunyah makanan' },
        { organ: 'Kerongkongan', fungsi: 'Mendorong makanan ke lambung' },
        { organ: 'Lambung', fungsi: 'Mengaduk dan mencerna makanan' },
        { organ: 'Usus Halus', fungsi: 'Menyerap nutrisi' },
        { organ: 'Usus Besar', fungsi: 'Menyerap air' },
        { organ: 'Rektum', fungsi: 'Menyimpan feses sementara' }
      ],
      xp: 20
    },
    {
      type: 'quiz',
      title: 'Tantangan 3: Identifikasi Proses Pencernaan!',
      questions: [
        {
          text: 'Gerakan otot yang mendorong makanan di kerongkongan disebut...',
          options: ['Peristaltik', 'Refleks', 'Rotasi', 'Vibrasi'],
          correct: 0
        },
        {
          text: 'Bubur halus hasil pencernaan di lambung disebut...',
          options: ['Bolus', 'Feses', 'Kim (chyme)', 'Nutrisi'],
          correct: 2
        },
        {
          text: 'Bagian usus halus yang berupa lipatan kecil untuk menyerap nutrisi disebut...',
          options: ['Vena', 'Arteri', 'Vili', 'Sel'],
          correct: 2
        }
      ],
      xp: 20
    },
    {
      type: 'choose',
      title: 'Tantangan 4: Pilih Kebiasaan Hidup Sehat!',
      instruction: 'Pilih semua kebiasaan yang baik untuk menjaga kesehatan pencernaan!',
      options: [
        { text: 'Makan makanan bergizi', correct: true },
        { text: 'Minum air yang cukup', correct: true },
        { text: 'Makan sambil berlari', correct: false },
        { text: 'Cuci tangan sebelum makan', correct: true },
        { text: 'Makan terlalu cepat', correct: false },
        { text: 'Makan sayur dan buah', correct: true },
        { text: 'Jarang minum air', correct: false },
        { text: 'Olahraga teratur', correct: true }
      ],
      xp: 20
    },
    {
      type: 'order',
      title: 'Tantangan 5: Susun Perjalanan Makanan!',
      instruction: 'Urutkan perjalanan makanan dari masuk sampai keluar dari tubuh!',
      correctOrder: [
        'Makanan masuk ke mulut dan dikunyah',
        'Makanan didorong melalui kerongkongan',
        'Makanan diaduk dan dicerna di lambung',
        'Nutrisi diserap di usus halus',
        'Air diserap di usus besar',
        'Feses dikeluarkan melalui anus'
      ],
      xp: 20
    }
  ]
};

// DATA BADGE
const ALL_BADGES = [
  { id: 'mulut', name: 'Penjelajah Mulut', emoji: '👄', map: 1 },
  { id: 'kerongkongan', name: 'Ahli Peristaltik', emoji: '🔽', map: 2 },
  { id: 'lambung', name: 'Penjaga Lambung', emoji: '🧪', map: 3 },
  { id: 'usus_halus', name: 'Ahli Nutrisi', emoji: '🫧', map: 4 },
  { id: 'usus_besar', name: 'Penyelamat Air', emoji: '💧', map: 5 },
  { id: 'rektum', name: 'Sahabat Hidup Sehat', emoji: '🚪', map: 6 },
  { id: 'master', name: 'Master Sistem Pencernaan', emoji: '🏆', map: 'boss' }
];

// XP VALUES
const XP_VALUES = {
  readMaterial: 10,
  correctAnswer: 20,
  miniGame: 30,
  mapChallenge: 50,
  bonus: 10,
  finalBoss: 100
};

// STAR THRESHOLDS
const STAR_THRESHOLDS = {
  one: 40,    // 40% = 1 star
  two: 70,    // 70% = 2 stars
  three: 90   // 90% = 3 stars
};
