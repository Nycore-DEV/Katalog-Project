export type ProductTier = "premium" | "basic";

export interface Product {
  id: string;
  name: string;
  price: number;
  tier: ProductTier;
  category: string;
  shortDescription: string;
  fullDescription: string;
  specs?: string;
  images: string[];
  videoUrl?: string;
  actionUrl: string;
  isNew: boolean;
  active: boolean;
  order: number;
  createdAt: number;
}

export type TransactionStatus = "berhasil" | "pending" | "gagal";

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  date: number;
  status: TransactionStatus;
  actionUrl: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  logoText: string;
  logoImageUrl?: string;
  bannerHeadline: string;
  bannerSubtext: string;
  whatsappChannelUrl: string;
  whatsappNumberUrl: string;
  productsPerPage: number;
  adminPassword: string;
}
