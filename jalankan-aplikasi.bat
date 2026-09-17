@echo off
cd /d "%~dp0"
title Sistem Pengingat Presensi WA - Kantor Kecamatan Cilacap Utara
color 0B

echo ==============================================================================
echo    PEMERINTAH KABUPATEN CILACAP - KANTOR KECAMATAN CILACAP UTARA
echo       SISTEM OTOMATIS PENGINGAT PRESENSI & ULANG TAHUN WHATSAPP
echo ==============================================================================
echo.

:: 1. Deteksi Node.js
set "NODE_CMD=node"
where node >nul 2>nul
if %errorlevel% neq 0 (
    if exist "C:\Program Files\nodejs\node.exe" (
        set "NODE_CMD=C:\Program Files\nodejs\node.exe"
    ) else (
        echo [ERROR] Node.js tidak ditemukan di komputer ini!
        echo Silakan unduh dan pasang Node.js terlebih dahulu di https://nodejs.org
        pause
        exit /b 1
    )
)

:: 2. Cek apakah dependensi sudah terpasang
if not exist "node_modules\@whiskeysockets\baileys" (
    echo [INFO] Modul Baileys belum lengkap.
    echo Sedang menginstal dependensi otomatis (npm install)...
    echo Mohon tunggu sebentar...
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo [ERROR] Gagal menginstal dependensi! Pastikan koneksi internet aktif.
        pause
        exit /b 1
    )
    echo [OK] Seluruh dependensi berhasil terpasang!
    echo.
)

echo [OK] Memulai server WhatsApp Gateway di http://localhost:3000 ...
echo [INFO] Browser web akan terbuka secara otomatis begitu server siap.
echo.
echo ==============================================================================
echo  PENTING: JANGAN TUTUP JENDELA INI!
echo  Jendela ini menjalankan server & scheduler otomatis pengingat WhatsApp.
echo  Jika Anda ingin membuka web kembali di lain waktu, buka: http://localhost:3000
echo  atau klik ganda file "Buka-Website.bat".
echo ==============================================================================
echo.

"%NODE_CMD%" server.js

pause
