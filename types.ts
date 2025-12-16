
export enum Page {
  Home = 'home',
  Showcase = 'showcase',
  Guide = 'guide',
  Success = 'success',
  MicrositeBuilder = 'microsite-builder',
  MicrositeDemo = 'microsite-demo',
  About = 'about',
  Contact = 'contact',
  Community = 'community',
  Premium = 'premium',
  IdeaDetail = 'idea-detail',
  Privacy = 'privacy',
  Terms = 'terms',
  Guidelines = 'guidelines',
  FAQ = 'faq',
  HelpCenter = 'help-center',
  Admin = 'admin',
  Advertise = 'advertise', // Halaman Pasang Iklan
  Partnership = 'partnership', // Halaman Panduan Kemitraan
  NIBGuide = 'nib-guide' // Halaman Panduan & Jasa NIB
}

export enum IdeaCategory {
  All = 'Semua Kategori',
  Teknologi = 'Startup & Teknologi',
  Jasa = 'Jasa Profesional & Freelance',
  Kreatif = 'Seni, Desain & Konten',
  Kuliner = 'Kuliner & F&B',
  Fashion = 'Fashion & Craft',
  Pendidikan = 'Pendidikan & Pelatihan',
  Agrobisnis = 'Agrobisnis & Alam',
  Sosial = 'Sosial & Komunitas',
  Warung = 'Warung & Toko Kelontong',
}

export type IdeaTier = 'Warga' | 'Juragan' | 'Sultan';

export interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  date: string;
}

export interface Idea {
  id: number;
  title: string;
  author: string;
  authorAvatar?: string;
  category: IdeaCategory;
  description: string;
  fullDescription: string;
  imageUrl: string;
  galleryUrls?: string[];
  isPopular?: boolean;
  isVerified?: boolean; 
  isPinned?: boolean; // NEW: Fitur Sundul Gan (Selalu di atas)
  location: string;
  
  // Business Model fields
  tier: IdeaTier; 
  
  // Connector fields
  lookingFor: string[]; 
  whatsappNumber?: string;
  email?: string;
  socialMedia?: string; 
  investmentAsk?: string; 
  viewCount: number;
  
  // Legalitas & Government Alignment
  nibNumber?: string; // Nomor Induk Berusaha (OSS)
  
  // Social Validation
  likes: number;
  comments: Comment[];
}

export interface BankInfo {
    bankName: string;
    accountNumber: string;
    accountName: string;
}

// Forum / Community Types
export interface ForumReply {
    id: number;
    author: string;
    avatar: string;
    text: string;
    date: string;
    isAdmin?: boolean;
}

export interface ForumTopic {
    id: number;
    title: string;
    category: 'Umum' | 'Cari Modal' | 'Tips Bisnis' | 'Cari Partner';
    author: string;
    avatar: string;
    content: string;
    date: string;
    views: number;
    replies: ForumReply[];
}