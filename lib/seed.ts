import { Product, SiteSettings, Transaction } from "./types";

export const defaultSettings: SiteSettings = {
  siteName: "Nexa Store",
  siteTagline: "Katalog produk digital pilihan, dikurasi tiap minggu.",
  logoText: "NX",
  logoImageUrl: "",
  bannerHeadline: "Produk digital, siap pakai hari ini.",
  bannerSubtext:
    "Template, tools, dan aset premium untuk mempercepat kerjamu. Beli atau unduh langsung dalam hitungan detik.",
  whatsappChannelUrl: "https://whatsapp.com/channel/",
  whatsappNumberUrl: "https://wa.me/6280000000000",
  productsPerPage: 10,
  adminPassword: "admin123"
};

const now = Date.now();

export const seedProducts: Product[] = [
  {
    id: "p1",
    name: "UI Kit Dashboard Pro",
    price: 149000,
    tier: "premium",
    category: "UI Kit",
    shortDescription: "120+ komponen dashboard siap pakai untuk Figma & kode.",
    fullDescription:
      "UI Kit Dashboard Pro berisi lebih dari 120 komponen yang telah disusun rapi dalam auto-layout Figma, lengkap dengan varian dark & light mode. Cocok untuk membangun panel admin, SaaS, maupun aplikasi internal secara cepat tanpa mendesain dari nol.",
    specs: "Format: Figma (.fig), Lisensi: 1 pengguna, Update: seumur hidup",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actionUrl: "https://example.com/checkout/p1",
    isNew: true,
    active: true,
    order: 1,
    createdAt: now
  },
  {
    id: "p2",
    name: "Preset Lightroom Cinematic",
    price: 0,
    tier: "basic",
    category: "Preset",
    shortDescription: "20 preset warna sinematik untuk foto & konten sosial.",
    fullDescription:
      "Paket 20 preset Lightroom bertema sinematik yang cocok untuk konten sosial media, travel, dan potret. Tinggal import file .xmp dan terapkan ke foto kamu, hasil warna konsisten dan mudah disesuaikan.",
    specs: "Format: .xmp & .dng, Kompatibel: Lightroom Mobile & Desktop",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actionUrl: "https://example.com/download/p2",
    isNew: false,
    active: true,
    order: 2,
    createdAt: now - 86400000
  },
  {
    id: "p3",
    name: "Template Notion Produktivitas",
    price: 79000,
    tier: "premium",
    category: "Template",
    shortDescription: "Sistem manajemen proyek & kebiasaan harian di Notion.",
    fullDescription:
      "Template Notion All-in-One untuk mengelola proyek, tugas harian, catatan, dan pelacak kebiasaan dalam satu dashboard. Didesain minimalis dan mudah dikustomisasi sesuai kebutuhanmu.",
    specs: "Format: Notion Template Link, Update: gratis selamanya",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80"
    ],
    actionUrl: "https://example.com/checkout/p3",
    isNew: true,
    active: true,
    order: 3,
    createdAt: now - 2 * 86400000
  },
  {
    id: "p4",
    name: "Font Pack Display Modern",
    price: 0,
    tier: "basic",
    category: "Font",
    shortDescription: "8 font display modern untuk judul & branding.",
    fullDescription:
      "Kumpulan 8 font display bergaya modern dan geometris, cocok untuk judul, logo, maupun materi branding. Lisensi bebas untuk proyek pribadi maupun komersial ringan.",
    specs: "Format: .otf & .ttf, Lisensi: personal & komersial ringan",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&q=80"
    ],
    actionUrl: "https://example.com/download/p4",
    isNew: false,
    active: true,
    order: 4,
    createdAt: now - 3 * 86400000
  },
  {
    id: "p5",
    name: "Mockup Kit Perangkat",
    price: 99000,
    tier: "premium",
    category: "Mockup",
    shortDescription: "50+ mockup perangkat resolusi tinggi, siap edit.",
    fullDescription:
      "Kumpulan 50+ mockup smartphone, laptop, dan tablet resolusi tinggi dengan smart object layer, memudahkan presentasi desain aplikasi maupun website secara profesional.",
    specs: "Format: .psd, Resolusi: 4K, Software: Adobe Photoshop",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    actionUrl: "https://example.com/checkout/p5",
    isNew: false,
    active: true,
    order: 5,
    createdAt: now - 4 * 86400000
  },
  {
    id: "p6",
    name: "Ebook Panduan Freelance",
    price: 45000,
    tier: "basic",
    category: "Ebook",
    shortDescription: "Panduan memulai karier freelance dari nol.",
    fullDescription:
      "Ebook 60 halaman berisi strategi memulai karier freelance, menentukan harga jasa, mencari klien pertama, hingga mengelola keuangan sebagai pekerja lepas.",
    specs: "Format: PDF, Halaman: 60, Bahasa: Indonesia",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
    ],
    actionUrl: "https://example.com/download/p6",
    isNew: false,
    active: true,
    order: 6,
    createdAt: now - 5 * 86400000
  }
];

export const seedTransactions: Transaction[] = [
  {
    id: "t1",
    productId: "p2",
    productName: "Preset Lightroom Cinematic",
    date: now - 86400000,
    status: "berhasil",
    actionUrl: "https://example.com/download/p2"
  },
  {
    id: "t2",
    productId: "p1",
    productName: "UI Kit Dashboard Pro",
    date: now - 2 * 86400000,
    status: "pending",
    actionUrl: "https://example.com/checkout/p1"
  }
];
