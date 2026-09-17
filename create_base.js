const fs = require('fs');
const path = require('path');

function writeFile(relPath, content) {
  const fullPath = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Created: ' + relPath);
}

// 1. phoneFormatter.js
writeFile('src/utils/phoneFormatter.js', `
/**
 * Utility untuk memformat dan menstandarkan nomor WhatsApp Indonesia
 */
function formatPhoneNumber(phone) {
  if (!phone) return '';
  let cleaned = phone.toString().trim().replace(/[^0-9+]/g, '');

  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }

  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  } else if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }

  return cleaned;
}

function isValidIndonesianPhone(phone) {
  const formatted = formatPhoneNumber(phone);
  return /^628[0-9]{8,12}$/.test(formatted);
}

function getWhatsAppLink(phone, text = '') {
  const formatted = formatPhoneNumber(phone);
  return 'https://wa.me/' + formatted + (text ? '?text=' + encodeURIComponent(text) : '');
}

module.exports = {
  formatPhoneNumber,
  isValidIndonesianPhone,
  getWhatsAppLink
};
`);

// 2. defaultSettings.js
writeFile('src/config/defaultSettings.js', `
module.exports = {
  officeName: "Kantor Kecamatan",
  workHours: {
    mon_thu: {
      start: "07:30",
      end: "16:00"
    },
    friday: {
      start: "07:30",
      end: "16:30"
    }
  },
  schedules: {
    morningReminderTime: "08:00",
    eveningReminderTime: "17:00",
    birthdayReminderTime: "07:00",
    morningEnabled: true,
    eveningEnabled: true,
    birthdayEnabled: true
  },
  waGateway: {
    provider: "simulation", // 'simulation' | 'fonnte' | 'wablas' | 'custom_webhook'
    apiKey: "",
    senderNumber: "",
    webhookUrl: ""
  },
  templates: {
    morning_mon_thu: "Halo {sapaan} {nama}, selamat pagi!\\n\\nSekadar mengingatkan untuk melakukan presensi datang hari ini ({hari}, {tanggal}).\\n\\n📌 Jam kerja hari ini: {jam_masuk} - {jam_pulang} WIB.\\nMari awali hari dengan penuh semangat dan dedikasi dalam melayani masyarakat!\\n\\n_Sistem Pengingat Presensi {kantor}_",
    morning_fri: "Halo {sapaan} {nama}, selamat pagi dan semangat Jum'at!\\n\\nJangan lupa untuk melakukan presensi datang hari ini ({hari}, {tanggal}).\\n\\n📌 Jam kerja hari Jum'at: {jam_masuk} - {jam_pulang} WIB.\\nSelamat bertugas dan semoga hari ini penuh berkah!\\n\\n_Sistem Pengingat Presensi {kantor}_",
    evening_mon_thu: "Halo {sapaan} {nama}, selamat sore!\\n\\nWaktu kerja hari ini telah selesai pada pukul {jam_pulang} WIB.\\n\\nJangan lupa untuk melakukan presensi pulang sebelum meninggalkan kantor.\\nTerima kasih atas kerja keras dan pelayanan terbaiknya hari ini, selamat beristirahat!\\n\\n_Sistem Pengingat Presensi {kantor}_",
    evening_fri: "Halo {sapaan} {nama}, selamat sore!\\n\\nJam kerja hari Jum'at telah usai pada pukul {jam_pulang} WIB.\\n\\nPastikan Anda telah melakukan presensi pulang. Terima kasih atas dedikasi luar biasa selama sepekan ini. Selamat menikmati libur akhir pekan bersama keluarga tercinta!\\n\\n_Sistem Pengingat Presensi {kantor}_",
    birthday: "🎂 Selamat Ulang Tahun, {sapaan} {nama}! 🎉\\n\\nKeluarga Besar {kantor} mengucapkan selamat bertambah usia pada hari ini ({tanggal}).\\n\\nSemoga senantiasa diberikan kesehatan, kebahagiaan, panjang umur, serta kelancaran dan keberkahan dalam setiap langkah tugas dan pengabdian kepada bangsa dan masyarakat. Aamiin 🤲✨\\n\\nSalam hangat,\\n_{kantor}_"
  },
  defaultHolidays: [
    { date: "2026-01-01", description: "Tahun Baru Masehi" },
    { date: "2026-01-16", description: "Isra Mi'raj Nabi Muhammad SAW" },
    { date: "2026-02-17", description: "Tahun Baru Imlek 2577 Kongzili" },
    { date: "2026-03-20", description: "Hari Suci Nyepi (Tahun Baru Saka 1948)" },
    { date: "2026-03-21", description: "Hari Raya Idul Fitri 1447 H" },
    { date: "2026-03-22", description: "Hari Raya Idul Fitri 1447 H" },
    { date: "2026-04-03", description: "Wafat Yesus Kristus" },
    { date: "2026-05-01", description: "Hari Buruh Internasional" },
    { date: "2026-05-14", description: "Kenaikan Yesus Kristus" },
    { date: "2026-05-27", description: "Hari Raya Idul Adha 1447 H" },
    { date: "2026-05-31", description: "Hari Raya Waisak 2570 BE" },
    { date: "2026-06-01", description: "Hari Lahir Pancasila" },
    { date: "2026-06-16", description: "Tahun Baru Islam 1448 H" },
    { date: "2026-08-17", description: "Hari Kemerdekaan Republik Indonesia" },
    { date: "2026-08-25", description: "Maulid Nabi Muhammad SAW" },
    { date: "2026-12-25", description: "Hari Raya Natal" }
  ]
};
`);

console.log('Finished writing base configs');
