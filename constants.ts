
import { Idea, IdeaCategory, Page, ForumTopic, BankInfo } from './types';

export const NAV_LINKS: { name: string; page: Page }[] = [
  { name: 'Beranda', page: Page.Home },
  { name: 'Jelajah Ide', page: Page.Showcase },
  { name: 'Buat Website', page: Page.MicrositeBuilder },
  { name: 'Komunitas', page: Page.Community },
  { name: 'Tentang', page: Page.About },
];

// --- KONFIGURASI PEMBAYARAN DEFAULT ---
export const DEFAULT_BANK_INFO: BankInfo = {
    bankName: "BNI",
    accountNumber: "1941921593",
    accountName: "Pulo Sinaga" 
};

export const ADMIN_WA_NUMBER = "628116380369"; 

// --- DATA IKLAN SPONSOR (EXTERNAL ADS) ---
export const MOCK_ADS = [
    {
        id: 'ad1',
        title: 'Butuh Modal Usaha?',
        advertiser: 'Koperasi Simpan Pinjam Sejahtera',
        description: 'Bunga rendah khusus member Pruidea. Syarat mudah.',
        cta: 'Ajukan Sekarang',
        color: 'bg-emerald-50 border-emerald-200'
    },
    {
        id: 'ad2',
        title: 'Hosting Website Murah',
        advertiser: 'IndoHost',
        description: 'Diskon 70% untuk startup pemula. Server Jakarta.',
        cta: 'Cek Paket',
        color: 'bg-indigo-50 border-indigo-200'
    },
    {
        id: 'ad3',
        title: 'Supplier Packaging',
        advertiser: 'Packindo',
        description: 'Kemasan produk custom minimum order rendah.',
        cta: 'Lihat Katalog',
        color: 'bg-amber-50 border-amber-200'
    }
];

export const MOCK_IDEAS: Idea[] = [
  {
    id: 1,
    title: 'AgriTech: Sensor Tanah IoT',
    author: 'Dimas (Startup Founder)',
    authorAvatar: 'https://i.pravatar.cc/150?u=dimas',
    category: IdeaCategory.Teknologi,
    description: 'Sistem monitoring kelembaban tanah berbasis IoT untuk petani modern. Hemat air hingga 40%.',
    fullDescription: `
      <p>Kami mengembangkan perangkat IoT murah yang membantu petani menyiram tanaman secara presisi.</p>
      <br/>
      <h4 class="font-bold text-lg">Visi Kami</h4>
      <p>Meningkatkan hasil panen petani Indonesia dengan teknologi tepat guna.</p>
      <br/>
      <h4 class="font-bold text-lg">Mencari:</h4>
      <p>Kami mencari <strong>Co-Founder (Marketing)</strong> dan <strong>Angel Investor</strong> untuk produksi massal.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/tech1/800/600',
    galleryUrls: [
        'https://picsum.photos/seed/tech2/400/300',
    ],
    isPopular: true,
    isVerified: true,
    tier: 'Sultan',
    location: 'Bandung, Jawa Barat',
    lookingFor: ['Investor', 'Co-Founder'],
    whatsappNumber: '628123456789',
    socialMedia: 'linkedin.com/in/dimas-agritech',
    investmentAsk: 'Rp 50.000.000 (Seed)',
    viewCount: 5420,
    likes: 354,
    comments: [
        { id: 101, user: 'Venture Cap', avatar: 'https://i.pravatar.cc/150?u=vc', text: 'Menarik. Boleh kirim pitch deck?', date: '2 hari lalu' }
    ]
  },
  {
    id: 2,
    title: 'Studio Desain & Branding "Kreatif"',
    author: 'Sarah (Freelancer)',
    authorAvatar: 'https://i.pravatar.cc/150?u=sarah',
    category: IdeaCategory.Jasa,
    description: 'Jasa pembuatan logo, identitas brand, dan konten media sosial untuk UMKM naik kelas.',
    fullDescription: `
      <p>Saya desainer grafis dengan pengalaman 5 tahun. Spesialisasi saya adalah membantu brand lokal terlihat global.</p>
      <br/>
      <p><strong>Paket UMKM:</strong> Mulai Rp 500rb untuk Logo + Kartu Nama.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/design/800/600',
    galleryUrls: ['https://picsum.photos/seed/design2/400/300'],
    isPopular: false,
    isVerified: true,
    tier: 'Juragan',
    location: 'Jakarta Selatan',
    lookingFor: ['Klien Baru', 'Kolaborasi'],
    whatsappNumber: '628999888777',
    socialMedia: 'behance.net/sarahkreatif',
    viewCount: 1210,
    likes: 89,
    comments: []
  },
  {
    id: 3,
    title: 'Kopi Kampung "Rosa"',
    author: 'Rosa',
    authorAvatar: 'https://i.pravatar.cc/150?u=rosa',
    category: IdeaCategory.Kuliner,
    description: 'Biji kopi robusta pilihan dari desa Salak. Diroasting manual dengan kayu bakar.',
    fullDescription: `
      <p>Kopi kami unik karena proses roasting tradisional yang memberikan aroma asap (smoky) yang khas.</p>
      <br/>
      <p>Mencari reseller atau coffee shop yang ingin biji kopi unik.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/coffee/800/600',
    galleryUrls: [
        'https://picsum.photos/seed/coffee2/400/300',
    ],
    isPopular: true,
    isVerified: true,
    tier: 'Juragan',
    location: 'Aceh Tengah',
    lookingFor: ['Reseller', 'Coffee Shop'],
    whatsappNumber: '628111222333',
    nibNumber: '1234567890123',
    viewCount: 3200,
    likes: 412,
    comments: []
  },
  {
    id: 4,
    title: 'Komunitas "Jumat Berbagi"',
    author: 'Komunitas Sosial',
    authorAvatar: 'https://i.pravatar.cc/150?u=social',
    category: IdeaCategory.Sosial,
    description: 'Gerakan membagikan 100 nasi bungkus setiap hari Jumat untuk kaum dhuafa.',
    fullDescription: `
      <p>Kami adalah sekumpulan pemuda yang ingin berbagi. Setiap Jumat kami keliling membagikan makanan.</p>
      <br/>
      <p>Kami tidak mencari keuntungan, kami mencari donatur atau relawan yang mau ikut turun ke jalan.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/social/800/600',
    galleryUrls: [],
    isPopular: false,
    isVerified: true,
    tier: 'Warga',
    location: 'Surabaya',
    lookingFor: ['Relawan', 'Donatur'],
    whatsappNumber: '628555666777',
    viewCount: 890,
    likes: 156,
    comments: []
  },
  {
    id: 5,
    title: 'Aplikasi Belajar Bahasa Daerah',
    author: 'Tim Basa',
    authorAvatar: 'https://i.pravatar.cc/150?u=basa',
    category: IdeaCategory.Pendidikan,
    description: 'Platform edukasi untuk melestarikan bahasa daerah Indonesia dengan metode gamifikasi.',
    fullDescription: `
      <p>Bahasa daerah mulai punah. Kami membuat aplikasi agar anak-anak senang belajar bahasa ibunya.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/edu/800/600',
    galleryUrls: [],
    isPopular: false,
    isVerified: false,
    tier: 'Warga',
    location: 'Yogyakarta',
    lookingFor: ['Developer', 'Ahli Bahasa'],
    viewCount: 450,
    likes: 78,
    comments: []
  }
];

export const MOCK_FORUM_TOPICS: ForumTopic[] = [
    {
        id: 1,
        title: 'Cara pitching ke Investor untuk Startup tahap awal?',
        category: 'Cari Modal',
        author: 'Dimas',
        avatar: 'https://i.pravatar.cc/150?u=dimas',
        content: 'Halo, saya sedang membangun startup AgriTech. Ada tips untuk menyusun pitch deck yang menarik angel investor?',
        date: '2 jam lalu',
        views: 120,
        replies: [
             { id: 201, author: 'Admin Pruidea', avatar: 'https://ui-avatars.com/api/?name=Admin', text: 'Halo Dimas, coba fokus pada masalah yang diselesaikan dan validasi pasar. Cek artikel kami di menu Bantuan.', date: '1 jam lalu', isAdmin: true }
        ]
    },
    {
        id: 2,
        title: 'Mencari Partner Co-Founder (Technical)',
        category: 'Cari Partner',
        author: 'Rina',
        avatar: 'https://i.pravatar.cc/150?u=rina',
        content: 'Saya punya ide aplikasi marketplace jasa. Saya orang bisnis, butuh partner yang bisa coding (CTO). Lokasi Jakarta.',
        date: '1 hari lalu',
        views: 85,
        replies: []
    }
];
