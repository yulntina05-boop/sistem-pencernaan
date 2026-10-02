// ============================================
// PDF REPORT GENERATOR
// Game Edukasi IPAS - Misi Pencernaan
// Uses jsPDF library (loaded via CDN)
// ============================================

const PDFReport = {
  generate() {
    // jsPDF is loaded via CDN in index.html
    if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
      alert('Library PDF belum siap. Silakan coba kembali.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageW = 210;
    const pageH = 297;
    const margin = 20;
    const contentW = pageW - (margin * 2);
    let y = margin;

    const colors = {
      primary: [41, 98, 255],
      secondary: [255, 107, 107],
      accent: [255, 193, 7],
      dark: [33, 37, 41],
      light: [248, 249, 250],
      success: [76, 175, 80],
      white: [255, 255, 255]
    };

    // Helper functions
    const addPage = () => { doc.addPage(); y = margin; };
    const checkPage = (needed = 30) => { if (y + needed > pageH - margin) addPage(); };

    // =================== COVER PAGE ===================
    // Background gradient effect
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageW, pageH, 'F');

    // Decorative circles
    doc.setFillColor(255, 255, 255, 0.1);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);

    // Title block
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 40, contentW, 60, 5, 5, 'F');

    doc.setTextColor(...colors.primary);
    doc.setFontSize(10);
    doc.text('LAPORAN HASIL GAME EDUKASI IPAS', pageW / 2, 52, { align: 'center' });

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MISI PENCERNAAN', pageW / 2, 68, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Petualangan Sistem Pencernaan Manusia', pageW / 2, 78, { align: 'center' });

    doc.setFontSize(9);
    doc.text('IPAS - Fase C / Kelas VI', pageW / 2, 90, { align: 'center' });

    // Student info box
    doc.setFillColor(...colors.white);
    doc.roundedRect(margin, 115, contentW, 70, 5, 5, 'F');

    doc.setTextColor(...colors.dark);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Data Siswa', margin + 10, 130);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const studentInfo = [
      ['Nama', GameState.student.name],
      ['Kelas', GameState.student.class],
      ['Sekolah', GameState.student.school],
      ['Karakter', GameState.student.character ? CHARACTERS.find(c => c.id === GameState.student.character)?.name || '-' : '-'],
      ['Tanggal', new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
      ['Durasi Bermain', GameState.session.duration ? Math.round(GameState.session.duration / 60000) + ' menit' : '-']
    ];

    let infoY = 140;
    studentInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'normal');
      doc.text(`${label}`, margin + 10, infoY);
      doc.text(`: ${value}`, margin + 55, infoY);
      infoY += 8;
    });

    // School info at bottom
    doc.setFillColor(...colors.white);
    doc.roundedRect(margin, 200, contentW, 30, 5, 5, 'F');
    doc.setTextColor(...colors.dark);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('MI Al-Khairaat Tolango', pageW / 2, 215, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Kurikulum Merdeka - Pembelajaran Mendalam - Kurikulum Berbasis Cinta', pageW / 2, 223, { align: 'center' });

    // =================== RESULTS PAGE ===================
    addPage();

    // Header
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageW, 25, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RINGKASAN HASIL AKTIVITAS', pageW / 2, 16, { align: 'center' });
    y = 35;

    // Overall stats
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(margin, y, contentW, 35, 3, 3, 'F');

    doc.setTextColor(...colors.dark);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');

    const totalXP = GameState.progress.totalXP;
    const overallPct = GameState.getOverallPercentage();
    const totalStars = GameState.getTotalStars();
    const badgeCount = GameState.progress.badges.length;

    doc.text(`Total XP: ${totalXP}`, margin + 5, y + 10);
    doc.text(`Skor Keseluruhan: ${overallPct}%`, margin + 5, y + 20);
    doc.text(`Total Bintang: ${'★'.repeat(Math.min(totalStars, 21))}`, margin + 5, y + 30);

    doc.text(`Badge: ${badgeCount} / ${ALL_BADGES.length}`, margin + contentW / 2, y + 10);

    let status = 'Perlu Penguatan';
    if (overallPct >= 90) status = 'Sangat Baik';
    else if (overallPct >= 70) status = 'Baik';
    else if (overallPct >= 50) status = 'Cukup';

    doc.text(`Status: ${status}`, margin + contentW / 2, y + 20);
    y += 45;

    // Map results table
    doc.setFillColor(...colors.primary);
    doc.rect(margin, y, contentW, 10, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');

    const colWidths = [12, 40, 25, 25, 25, contentW - 127];
    const headers = ['No', 'Materi', 'Skor', 'Benar', 'Salah', 'Status'];
    let colX = margin;
    headers.forEach((h, i) => {
      doc.text(h, colX + 2, y + 7);
      colX += colWidths[i];
    });
    y += 10;

    // Table rows
    MAPS_DATA.forEach((map, idx) => {
      checkPage(10);
      const result = GameState.mapResults[map.id] || {};
      const bgColor = idx % 2 === 0 ? [255, 255, 255] : [245, 247, 250];
      doc.setFillColor(...bgColor);
      doc.rect(margin, y, contentW, 9, 'F');

      doc.setTextColor(...colors.dark);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      colX = margin;
      const rowData = [
        `${map.id}`,
        map.title,
        `${result.score || 0}`,
        `${result.correctAnswers || 0}`,
        `${result.wrongAnswers || 0}`,
        result.completed ? 'Selesai' : 'Belum'
      ];

      rowData.forEach((val, i) => {
        doc.text(val, colX + 2, y + 6);
        colX += colWidths[i];
      });
      y += 9;
    });

    // Boss result
    checkPage(10);
    const bossResult = GameState.mapResults[7] || {};
    doc.setFillColor(255, 248, 225);
    doc.rect(margin, y, contentW, 9, 'F');
    doc.setFont('helvetica', 'bold');
    colX = margin;
    const bossRowData = [
      'B',
      'FINAL BOSS',
      `${bossResult.score || 0}`,
      `${bossResult.correctAnswers || 0}`,
      `${bossResult.wrongAnswers || 0}`,
      bossResult.completed ? 'Selesai' : 'Belum'
    ];
    bossRowData.forEach((val, i) => {
      doc.text(val, colX + 2, y + 6);
      colX += colWidths[i];
    });
    y += 15;

    // Badge section
    checkPage(40);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.primary);
    doc.text('Badge yang Diperoleh:', margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.dark);

    ALL_BADGES.forEach(badge => {
      checkPage(8);
      const earned = GameState.progress.badges.includes(badge.id);
      doc.text(`${earned ? '[v]' : '[ ]'} ${badge.name} ${earned ? '' : '(belum)'}`, margin + 5, y);
      y += 7;
    });

    // =================== REFLECTION PAGE ===================
    addPage();

    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageW, 25, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('REFLEKSI SISWA', pageW / 2, 16, { align: 'center' });
    y = 35;

    doc.setTextColor(...colors.dark);

    // Q1
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Hal baru yang dipelajari:', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    if (GameState.reflection.newLearning.length > 0) {
      GameState.reflection.newLearning.forEach(item => {
        doc.text(`- ${item}`, margin + 5, y);
        y += 6;
      });
    } else {
      doc.text('- (tidak ada jawaban)', margin + 5, y); y += 6;
    }
    y += 5;

    // Q2
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Bagian yang paling disukai:', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    if (GameState.reflection.favoritePart.length > 0) {
      GameState.reflection.favoritePart.forEach(item => {
        doc.text(`- ${item}`, margin + 5, y);
        y += 6;
      });
    } else {
      doc.text('- (tidak ada jawaban)', margin + 5, y); y += 6;
    }
    y += 5;

    // Q3
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('3. Kebiasaan sehat yang akan dilakukan:', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    if (GameState.reflection.healthyHabits.length > 0) {
      GameState.reflection.healthyHabits.forEach(item => {
        doc.text(`- ${item}`, margin + 5, y);
        y += 6;
      });
    } else {
      doc.text('- (tidak ada jawaban)', margin + 5, y); y += 6;
    }
    y += 5;

    // Q4
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('4. Perasaan setelah bermain:', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(GameState.reflection.feeling || '(tidak ada jawaban)', margin + 5, y);
    y += 12;

    // Q5
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('5. Refleksi terbuka:', margin, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const openResp = GameState.reflection.openResponse || '(tidak ada jawaban)';
    const splitResp = doc.splitTextToSize(openResp, contentW - 10);
    doc.text(splitResp, margin + 5, y);
    y += splitResp.length * 6 + 10;

    // =================== CONCLUSION ===================
    checkPage(50);

    doc.setFillColor(240, 255, 240);
    doc.roundedRect(margin, y, contentW, 40, 3, 3, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.success);
    doc.text('Kesimpulan Hasil Belajar', margin + 5, y + 10);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.dark);

    let conclusion = '';
    if (overallPct >= 90) {
      conclusion = `${GameState.student.name} telah menunjukkan pemahaman yang sangat baik mengenai organ dan proses sistem pencernaan manusia. Siswa mampu mengidentifikasi, menjelaskan, dan mengurutkan proses pencernaan dengan baik.`;
    } else if (overallPct >= 70) {
      conclusion = `${GameState.student.name} telah menunjukkan pemahaman yang baik mengenai sistem pencernaan manusia. Beberapa konsep masih perlu diperkuat melalui latihan dan pengulangan.`;
    } else if (overallPct >= 50) {
      conclusion = `${GameState.student.name} memiliki pemahaman dasar tentang sistem pencernaan manusia. Siswa masih membutuhkan penguatan pada beberapa konsep melalui bimbingan dan latihan tambahan.`;
    } else {
      conclusion = `${GameState.student.name} masih membutuhkan pendampingan lebih lanjut dalam memahami materi sistem pencernaan manusia. Disarankan untuk mengulang permainan dengan bimbingan guru.`;
    }

    const splitConc = doc.splitTextToSize(conclusion, contentW - 15);
    doc.text(splitConc, margin + 5, y + 18);

    y += 50;

    // Footer
    checkPage(20);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Laporan ini dihasilkan secara otomatis oleh Game Edukasi IPAS - Misi Pencernaan', pageW / 2, pageH - 15, { align: 'center' });
    doc.text('MI Al-Khairaat Tolango | Kurikulum Merdeka | Kurikulum Berbasis Cinta', pageW / 2, pageH - 10, { align: 'center' });

    // Save
    const filename = `Laporan_MisiPencernaan_${GameState.student.name.replace(/\s/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(filename);
  }
};
