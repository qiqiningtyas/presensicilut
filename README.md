# Sistem Pengingat Presensi WhatsApp - Kantor Kecamatan Cilacap Utara

Aplikasi web lengkap (*Backend Node.js/Express + Frontend Tailwind CSS Theme Dark Blue & Emerald Green*) yang dirancang khusus untuk mengotomasi pengingat presensi datang, presensi pulang, dan ucapan selamat ulang tahun pegawai Kantor Kecamatan Cilacap Utara, Kabupaten Cilacap, Jawa Tengah.

Sistem dilengkapi dengan **WhatsApp Gateway Lokal Baileys Multi-Device** (pairing via scan QR Code langsung dari browser) dan **Proteksi Anti-Banned (Sequential Delay 3 s.d. 5 detik)** untuk menjaga nomor WhatsApp resmi kecamatan tetap aman.

---

## 🏛️ Ketentuan Jam Kerja & Aturan Sistem

1. **Jadwal Jam Kerja Kedinasan**:
   - **Senin – Kamis**: Masuk kantor **07.30 WIB**, Pulang kantor **16.00 WIB**.
   - **Jum'at**: Masuk kantor **07.30 WIB**, Pulang kantor **16.30 WIB**.
   - **Sabtu & Minggu**: Libur akhir pekan (Sistem otomatis **LIBUR**, tidak mengirim pengingat).
   - **Hari Libur Nasional & Cuti Bersama**: Tanggal merah nasional (Sistem otomatis **LIBUR**, tidak mengirim pengingat).
2. **Khusus Hari Ulang Tahun Pegawai**:
   - Sistem setiap hari mengecek tanggal lahir pegawai.
   - Mengirimkan pesan ucapan selamat ulang tahun personal secara otomatis (tetap berjalan setiap hari termasuk saat libur).
3. **Waktu Pengiriman Pesan Otomatis (Cron Scheduler)**:
   - **Pukul 08.00 WIB**: Kirim pesan pengingat presensi datang (Senin s.d. Jum'at kerja).
   - **Pukul 17.00 WIB**: Kirim pesan pengingat presensi pulang (Senin s.d. Jum'at kerja).
   - **Pukul 08.00 WIB**: Kirim ucapan selamat ulang tahun bagi yang berulang tahun hari ini.
   - *Waktu pengiriman dapat diubah secara fleksibel melalui menu Jadwal & Pengaturan di dashboard.*
4. **Fitur Safety / Proteksi Anti-Banned**:
   - Pengiriman pesan broadcast dilakukan secara berurutan (*sequential queue*) dengan jeda waktu acak **3 sampai 5 detik** antar penerima.
   - Meminimalkan risiko deteksi spam dari algoritma WhatsApp saat mengirim ke daftar 150+ pegawai.
   - Dilengkapi monitor status antrean real-time (*live progress bar*) di dashboard.

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

### Persyaratan Sistem:
- Komputer / Laptop dengan OS Windows / Linux / macOS.
- **Node.js** (Versi 18 ke atas disarankan). Dapat diunduh di [nodejs.org](https://nodejs.org).

### Langkah 1: Instalasi Dependensi
Buka terminal (Command Prompt atau PowerShell) di dalam folder proyek ini:
```bash
cd C:\Users\user\.gemini\antigravity\scratch\pengingat-presensi-kecamatan
npm install
```
*(Di Windows PowerShell, jika ada kendala hak akses skrip, gunakan `npm.cmd install`)*

Dependensi yang dipasang:
- `@whiskeysockets/baileys`: WhatsApp Multi-Device Gateway engine
- `express`: REST API web framework
- `cors`: Cross-Origin Resource Sharing
- `node-cron`: Task scheduler otomatis waktu jam kerja
- `qrcode`: Generator gambar QR Code
- `pino`: Logger engine Baileys

### Langkah 2: Menjalankan Aplikasi

#### Cara Praktis (Windows):
Cukup klik ganda (*double click*) file:
```
jalankan-aplikasi.bat
```
Skrip akan secara otomatis memeriksa dependensi, menyalakan server, dan membuka browser web Anda.

#### Cara Terminal (Manual):
Jalankan perintah berikut di terminal:
```bash
node server.js
```
Akses aplikasi melalui browser di alamat:
👉 **`http://localhost:3000`**

---

## 📱 Panduan Pairing WhatsApp Gateway (QR Code)

1. Buka dashboard web di `http://localhost:3000`.
2. Klik tab menu **WhatsApp Gateway** pada bilah navigasi atas.
3. Di layar akan muncul **QR Code** resolusi tinggi.
4. Buka aplikasi **WhatsApp** di handphone resmi kantor kecamatan.
5. Ketuk ikon titik tiga di kanan atas (Android) atau menu **Pengaturan** (iPhone).
6. Pilih menu **Perangkat Tertaut (Linked Devices)** &rarr; ketuk **Tautkan Perangkat (Link a Device)**.
7. Arahkan kamera HP ke QR Code di layar monitor.
8. Setelah terhubung, status akan langsung berubah menjadi **CONNECTED** dengan nama dan nomor HP kecamatan yang terdeteksi. Sesi login tersimpan permanen di folder `data/baileys_auth`.

---

## 👥 Manajemen Data Pegawai (Kapasitas 150+)

1. **Tambah / Edit Pegawai**:
   - Klik tombol **Tambah Pegawai** di menu Data Pegawai.
   - Masukkan Nama Lengkap, Nomor HP/WhatsApp (format `08xx` atau `628xx`), Tanggal Lahir (YYYY-MM-DD), NIP, Jenis Kelamin (L/P), dan Seksi Jabatan.
2. **Impor Sekaligus (Bulk Import CSV/JSON)**:
   - Klik tombol **Impor Data** untuk memasukkan daftar 150 pegawai sekaligus dalam hitungan detik.
   - Tersedia tombol **Format CSV** untuk mengunduh template spreadsheet Excel.
3. **Tombol Simulasi 150 Pegawai**:
   - Ingin langsung menguji sistem dengan 150 data pegawai? Cukup klik tombol **Simulasi 150 Pegawai** di menu Data Pegawai! Sistem akan langsung mengenerate data staf simulasi lengkap dengan NIP, nomor HP, dan tanggal lahir.

---

## 📝 Variabel Template Pesan yang Didukung

Anda dapat menyisipkan variabel dinamis berikut di menu **Template Pesan**:
- `{nama}` : Nama lengkap pegawai (Contoh: Drs. Sunaryo, M.Si)
- `{sapaan}` : Bapak / Ibu (otomatis sesuai jenis kelamin pegawai)
- `{nip}` : Nomor Induk Pegawai
- `{jabatan}` : Jabatan / Seksi / Unit Kerja
- `{hari}` : Nama hari (Senin, Selasa, Rabu, Kamis, Jum'at)
- `{tanggal}` : Format tanggal Indonesia (Contoh: 17 September 2026)
- `{jam_masuk}` : Jam masuk kerja dinas (07.30 WIB)
- `{jam_pulang}` : Jam pulang kerja dinas (16.00 WIB atau 16.30 WIB pada hari Jum'at)
- `{kantor}` : Nama instansi (Kantor Kecamatan Cilacap Utara)
- `{umur}` : Umur pegawai saat berulang tahun (Contoh: 45 tahun)

---

## 📁 Struktur Direktori Proyek

```
pengingat-presensi-kecamatan/
├── data/                      # Penyimpanan data lokal
│   ├── db.json                # Database JSON terstruktur (atomic write)
│   └── baileys_auth/          # Folder sesi kredensial WhatsApp Baileys
├── public/                    # Frontend UI Web
│   ├── css/
│   │   └── style.css          # Desain custom Tailwind & Bubble Chat WA
│   ├── js/
│   │   └── app.js             # Logika aplikasi & polling real-time
│   └── index.html             # Tampilan halaman web bertema Dark Blue & Emerald
├── src/
│   ├── config/
│   │   └── defaultSettings.js # Pengaturan bawaan jam kerja, template, & libur
│   ├── database/
│   │   └── db.js              # Model database lokal JSON
│   ├── routes/
│   │   └── api.js             # REST API endpoint lengkap
│   ├── services/
│   │   ├── baileysService.js  # WhatsApp Gateway Baileys engine
│   │   ├── queueService.js    # Mesin antrean Anti-Banned (delay 3-5 detik)
│   │   ├── holidayService.js  # Logika pengecekan hari kerja, weekend, & libur
│   │   ├── scheduler.js       # Otomasi cron jam 08.00, 17.00, & ultah
│   │   ├── templateEngine.js  # Parser variabel dinamis pesan
│   │   └── whatsappService.js # Dispatcher pesan WhatsApp & pencatat log
│   └── utils/
│       └── phoneFormatter.js  # Standardisasi nomor telepon Indonesia (62xxx)
├── jalankan-aplikasi.bat      # Skrip sekali klik untuk Windows
├── package.json               # Konfigurasi dependensi Node.js
├── README.md                  # Dokumentasi panduan penggunaan
└── server.js                  # Entry point server Express backend
```

---

## 📞 Dukungan Teknis
Aplikasi ini dikembangkan untuk kebutuhan operasional kedinasan **Kantor Kecamatan Cilacap Utara, Pemerintah Kabupaten Cilacap**.
