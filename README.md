# Nexa Store — Template Katalog Produk Digital

Template website katalog produk digital bergaya aplikasi mobile: Bottom Navigation, Grid 2 kolom, Pop Up Join WhatsApp Channel, halaman detail produk dengan slider video/foto, riwayat transaksi, dan Dashboard Admin untuk mengelola produk & pengaturan.

Dibangun dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, siap deploy ke **Vercel**.

## Cara Menjalankan di Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Login Admin

Buka `/admin` (atau tombol ⚙️ di header).

- Password default: `admin123`
- Ubah lewat Dashboard Admin → tab **Pengaturan**, atau ubah `adminPassword` di `lib/seed.ts` sebelum deploy pertama kali.

## Struktur Proyek

```
app/
  layout.tsx           -> shell utama (header, bottom nav, popup)
  page.tsx              -> halaman utama (hero + katalog + pagination)
  cari/page.tsx          -> pencarian real-time
  riwayat/page.tsx       -> riwayat transaksi
  produk/[id]/page.tsx   -> detail produk (slider video/foto)
  admin/page.tsx         -> login admin
  admin/dashboard/page.tsx -> kelola produk & pengaturan
components/              -> semua komponen UI (header, kartu produk, dsb)
components/admin/        -> form produk & panel pengaturan
lib/types.ts             -> tipe data (Product, Transaction, SiteSettings)
lib/seed.ts              -> data awal (produk contoh + pengaturan default)
lib/store.ts             -> state management (Zustand) + persist ke localStorage
```

## Catatan Penting Tentang Penyimpanan Data

Template ini memakai **localStorage** (via Zustand `persist`) sebagai "database" sementara,
supaya bisa langsung jalan tanpa setup database dan tetap kompatibel dengan Vercel (yang tidak
punya penyimpanan file permanen di server).

Konsekuensinya:
- Data produk/transaksi yang diubah lewat Dashboard Admin **tersimpan di browser masing-masing pengguna**, bukan di server pusat. Admin dan pengunjung tidak melihat data yang sama persis kecuali dari perangkat yang sama.
- Cocok untuk demo, prototipe, atau katalog dengan produk yang jarang berubah (tinggal edit `lib/seed.ts` lalu deploy ulang).
- **Untuk penggunaan produksi nyata** (banyak pengunjung, admin ingin perubahan langsung tampil ke semua orang), sambungkan ke database sungguhan, misalnya:
  - Vercel Postgres / Neon / Supabase (database)
  - Vercel Blob atau Cloudinary (untuk upload foto/video, bukan hanya URL)
  - Ganti isi `lib/store.ts` agar membaca/menulis lewat API routes (`app/api/...`) ke database tersebut, alih-alih ke localStorage.

Beri tahu saya jika Anda ingin versi dengan database sungguhan (misalnya Supabase) — strukturnya sudah disiapkan agar mudah diarahkan ke sana.

## Menyesuaikan Konten

- **Produk contoh & pengaturan default**: edit `lib/seed.ts`.
- **Warna & tema**: edit token warna di `tailwind.config.ts` (sudah memakai kombinasi Hitam/Biru Dongker untuk umum, Emas untuk produk Premium sesuai brief).
- **Link WhatsApp Channel & nomor WhatsApp**: lewat Dashboard Admin → Pengaturan, atau langsung di `lib/seed.ts`.

## Deploy ke Vercel

### Opsi 1 — Lewat Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```
Ikuti instruksi di terminal. Setelah selesai, jalankan `vercel --prod` untuk deploy ke production.

### Opsi 2 — Lewat GitHub + Dashboard Vercel
1. Push folder proyek ini ke repository GitHub baru.
2. Buka [vercel.com/new](https://vercel.com/new), import repository tersebut.
3. Vercel otomatis mendeteksi ini sebagai proyek Next.js — biarkan pengaturan default (Build Command: `next build`, Output: otomatis).
4. Klik **Deploy**. Setelah selesai, situs akan tersedia di `nama-proyek.vercel.app`.

Tidak ada environment variable wajib untuk versi dasar (localStorage) ini.

## Fitur yang Sudah Diimplementasikan

- Pop up Join WhatsApp Channel saat kunjungan pertama (tersimpan di localStorage, tidak muncul lagi setelah ditekan/ditutup sampai cache dihapus)
- Header sticky minimalis + tombol WhatsApp & Pengaturan
- Bottom Navigation sticky (Home, Search, Riwayat) dengan highlight gradasi biru
- Hero banner gradasi Hitam–Biru Dongker
- Grid katalog 2 kolom dengan label "Baru", ikon bintang untuk Premium, badge harga
- Filter kategori & pencarian real-time
- Halaman detail produk: slider video review (slide pertama) + foto produk, tombol Beli/Download sesuai tipe produk, yang otomatis mencatat transaksi ke Riwayat
- Riwayat transaksi dengan status Berhasil/Pending/Gagal
- Pagination Next/Previous dengan jumlah produk per halaman yang bisa diatur
- Dashboard Admin: login, tambah/edit/hapus produk, atur harga, tipe (Premium/Basic), foto, video, link tujuan, status aktif; serta pengaturan situs (nama, banner, link WhatsApp, jumlah produk per halaman, password admin)
- Loading screen singkat, tombol Back to Top, lazy loading gambar, animasi hover ringan, desain responsif mobile/tablet/desktop

## Yang Perlu Anda Lengkapi Sebelum Go-Live

- Ganti gambar produk contoh (dari Unsplash) dengan foto produk asli Anda.
- Ganti link WhatsApp Channel, nomor WhatsApp, dan link Beli/Download tiap produk dengan link asli.
- Pertimbangkan migrasi ke database sungguhan jika ingin data admin tersinkron untuk semua pengunjung (lihat bagian "Catatan Penting" di atas).
