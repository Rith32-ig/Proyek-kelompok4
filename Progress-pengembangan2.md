# Progress Pengembangan 2 — PEMMOB
# 1. Penentuan Tema dan Wawancara
## 1.1 Identitas Proyek

- **Nama kelompok:** Kelompok 6
- **Mata kuliah:** Pemrograman Mobile (PEMMOB)
- **Nama aplikasi:** BKP(Bima Kos Putra)
- **Tema proyek:** Sistem Informasi Pengelolaan Kos
- **Platform/teknologi:** React Native, Js dan Expo
- **Anggota kelompok:**
  1. Moh. Farid Ilham Ghifari (2488010066)
  2. Dawwas Zakka Sutiono (248801015)
  3. Muhammad Dhiyaul Haque (2488010041)
  4. Hanifa Eka Fauziah (2488010060)

## 1.2 Tema Proyek dan Hasil Wawancara

### 1.2.1 Latar Belakang

Usaha kos ini sudah berdiri sejak tahun 2000 an dan jumlah kamarnya tidak berubah sejak awal. Kos dikelola langsung oleh pemilik tanpa penjaga. Sebelumnya pengelolaan sering berganti penjaga, namun saat ini dikelola sendiri. Berdasarkan wawancara, proses pengelolaan masih dilakukan secara manual dan memiliki beberapa kendala yang menjadi dasar perancangan aplikasi.

### 1.2.2 Temuan Wawancara dan Kebutuhan Pengguna

Berdasarkan wawancara dengan pemilik kos, terdapat beberapa kondisi operasional yang menjadi dasar dalam menentukan kebutuhan aplikasi.

1. Pencatatan pembayaran masih manual

Pembayaran kos dilakukan secara bulanan (terdapat opsi harian, namun jarang). Metode pembayaran berupa transfer dan tunai, dengan transfer lebih banyak digunakan. Pencatatan dilakukan di buku dan penghuni diberi kuitansi.

Kebutuhan pengguna: Aplikasi perlu menyediakan fitur pencatatan pembayaran (tunai maupun transfer) beserta bukti pembayaran digital sebagai pengganti pencatatan buku dan kuitansi.

2. Terjadi kesalahan dalam pencatatan pembayaran

Pencatatan manual di buku beberapa kali menyebabkan kesalahan pencatatan pembayaran kos.

Kebutuhan pengguna: Aplikasi perlu menyediakan riwayat pembayaran yang tersimpan rapi dan mudah dicek agar data pembayaran lebih akurat.

3. Keterlambatan pembayaran belum terpantau

Penghuni sering terlambat membayar dan tidak ada biaya tambahan (denda) atas keterlambatan.

Kebutuhan pengguna: Aplikasi perlu menampilkan status pembayaran (lunas/belum bayar/terlambat) serta pengingat jatuh tempo agar pemilik dapat memantau penghuni yang belum membayar.

4. Pencatatan keluhan belum terstruktur

Koordinasi keluhan dilakukan melalui grup. Keluhan yang paling sering muncul adalah masalah wifi. Keluhan yang bisa ditangani pemilik langsung ditanggapi, sedangkan keluhan yang membutuhkan teknisi dicatat terlebih dahulu, namun pernah terlupa.

Kebutuhan pengguna: Aplikasi perlu menyediakan fitur pengajuan keluhan oleh penghuni beserta status penanganannya (diterima/diproses/selesai) agar keluhan tidak terlewat.

5. Data penghuni perlu dikelola

Data penghuni dibutuhkan untuk mendukung pengelolaan kos.

Kebutuhan pengguna: Aplikasi perlu menyediakan pengelolaan data penghuni dan kamar yang terpusat.

6. Pengelolaan dilakukan sendiri oleh pemilik

Karena kos dikelola sendiri tanpa penjaga, semua pencatatan dan koordinasi bergantung pada pemilik.

Kebutuhan pengguna: Aplikasi perlu memiliki antarmuka yang sederhana dan mudah dipahami agar memudahkan pemilik mengelola kos secara praktis.

### 1.2.3 Kesimpulan Kebutuhan Pengguna

Berdasarkan temuan tersebut, kebutuhan utama yang menjadi dasar rancangan aplikasi adalah:

1. Membantu pencatatan pembayaran kos (tunai dan transfer).
2. Menampilkan riwayat dan status pembayaran, termasuk keterlambatan.
3. Menyediakan fitur pengajuan dan pencatatan keluhan beserta statusnya.
4. Menyediakan pengelolaan data penghuni dan kamar.
5. Menyediakan antarmuka yang sederhana dan mudah dipahami oleh pemilik maupun penghuni.

### Bukti Wawancara ###
...
Narasumber: Pemilik Kos Bima Putra
Tanggal wawancara: 17 Oktober 2026
Media/tempat: Ruang Tamu
Bukti wawancara:
[![Watch Demo](https://img.youtube.com/vi/WQ2p3_J0J9w/maxresdefault.jpg)](https://youtu.be/WQ2p3_J0J9w)
...

# 2. Pembagian Tugas
## Role dan Hak Akses

| Role | Deskripsi | Akses Layar |
|---|---|---|
| **Pengelola/Pemilik** | Mengelola data penghuni, memantau dan mencatat pembayaran, serta menangani keluhan. | Login, Dashboard Pengelola, Data Penghuni, Pembayaran & Kuitansi, Keluhan (Kanban) |
| **Penghuni** | Memantau status sewa dan tagihan, mengajukan keluhan, serta melihat pengumuman. | Login, Beranda Penghuni, Lapor Keluhan, Info/Pengumuman |
| **Publik (belum login)** | Calon penghuni atau pengunjung yang melihat informasi kos. | Landing Page |

## Pembagian Tugas Anggota

| Anggota | Layar yang Dikerjakan | File |
|---|---|---|
| Moh. Farid Ilham Ghifari | Landing Page, Login | `LandingScreen.js`, `LoginScreen.js` |
| Muhammad Dhiyaul Haque | Beranda Penghuni (+ tab Info/Pengumuman), Lapor Keluhan | `PenghuniHomeScreen.js`, `LaporKeluhanScreen.js` |
| Dawwas Zakka Sutiono | Dashboard Pengelola, Data Penghuni | `AdminDashboardScreen.js`, `DataPenghuniScreen.js` |
| Hanifa Eka Fauziah | Pembayaran & Kuitansi, Keluhan Admin (Kanban) | `PembayaranScreen.js`, `KeluhanAdminScreen.js` |

# 3. Rancangan Layar

## 3.1 Landing Page
- **Fungsi utama:** Halaman awal yang menampilkan profil Kos Bima Putra (alamat, jam gerbang dikunci), fasilitas dan layanan, galeri foto, serta tombol masuk sesuai peran.
- **Role terkait:** Publik (semua pengguna)
- **Bukti Video/GIF Pengerjaan Layar:** 

## 3.2 Login
- **Fungsi utama:** Memvalidasi username dan kata sandi sesuai peran (Pengelola/Penghuni), dengan pesan error bila kosong atau salah, lalu mengarahkan ke area sesuai peran.
- **Role terkait:** Pengelola, Penghuni
- **Bukti Video/GIF Pengerjaan Layar:**

## 3.3 Dashboard Pengelola
- **Fungsi utama:** Menampilkan ringkasan kos: status kamar (terisi/kosong), pemasukan bulan ini, tagihan menunggak, keluhan aktif, dan daftar jatuh tempo terdekat beserta status pembayarannya.
- **Role terkait:** Pengelola
- **Bukti Video/GIF Pengerjaan Layar:**

## 3.4 Data Penghuni
- **Fungsi utama:** Menampilkan daftar penghuni dan kamar, pencarian berdasarkan nama/kamar, filter tipe sewa (bulanan/harian), serta menambah penghuni baru (nama, kamar, tipe sewa, no. HP, tanggal masuk) dengan opsi kirim info lewat WhatsApp.
- **Role terkait:** Pengelola
- **Bukti Video/GIF Pengerjaan Layar:**

## 3.5 Pembayaran & Kuitansi
- **Fungsi utama:** Mencatat pembayaran (penghuni, tipe sewa, metode tunai/transfer, periode, nominal), menampilkan kuitansi digital, riwayat pembayaran, dan daftar penghuni yang terlambat bayar.
- **Role terkait:** Pengelola
- **Bukti Video/GIF Pengerjaan Layar:** 

## 3.6 Keluhan Admin (Kanban)
- **Fungsi utama:** Papan keluhan berdasarkan status (Masuk, Ditangani Mandiri, Perlu Teknisi, Selesai) dengan tingkat prioritas, filter status, perpindahan status keluhan, dan catatan tindak lanjut (to-do) agar keluhan tidak terlewat.
- **Role terkait:** Pengelola
- **Bukti Video/GIF Pengerjaan Layar:** 

## 3.7 Beranda Penghuni
- **Fungsi utama:** Menampilkan status sewa, riwayat dan tagihan pembayaran, status keluhan milik sendiri, serta menu aksi cepat: unggah bukti bayar, izin pulang malam, info kos, dan aturan kos.
- **Role terkait:** Penghuni
- **Bukti Video/GIF Pengerjaan Layar:** 

## 3.8 Lapor Keluhan
- **Fungsi utama:** Form pengajuan keluhan (kategori, deskripsi, foto) yang terkirim ke pengelola dan langsung muncul di daftar keluhan penghuni dengan status "Masuk".
- **Role terkait:** Penghuni
- **Bukti Video/GIF Pengerjaan Layar:** *

## 3.9 Info / Pengumuman
- **Fungsi utama:** Menampilkan pengumuman dari pengelola kepada penghuni.
- **Role terkait:** Penghuni
- **Bukti Video/GIF Pengerjaan Layar:** 