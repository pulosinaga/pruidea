
import React, { useState } from 'react';
import { Page } from '../types';
import PremiumModal from '../components/PremiumModal';

interface MicrositeBuilderProps {
  setActivePage: (page: Page) => void;
}

const PricingCard: React.FC<{ 
    name: string; 
    price: string; 
    period?: string;
    features: string[]; 
    isPopular?: boolean; 
    isSultan?: boolean;
    ctaText: string;
    description: string;
    comparisonText?: string; // Teks perbandingan psikologis
    onCtaClick: () => void;
}> = ({ name, price, period, features, isPopular, isSultan, ctaText, description, comparisonText, onCtaClick }) => (
    <div className={`relative bg-white rounded-2xl shadow-xl border flex flex-col ${isSultan ? 'border-amber-400 ring-2 ring-amber-400' : isPopular ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-2 scale-105 z-10' : 'border-slate-200'}`}>
        {isPopular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                Paling Laris
            </div>
        )}
        {isSultan && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide flex items-center">
                <span className="mr-1">👑</span> KHUSUS BOSS
            </div>
        )}

        <div className="p-6 md:p-8 flex-grow">
            <h3 className={`text-xl font-bold mb-2 ${isSultan ? 'text-amber-600' : 'text-slate-900'}`}>{name}</h3>
            <div className="flex items-baseline mb-1">
                <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{price}</span>
                {period && <span className="text-slate-500 ml-1 text-sm">/{period}</span>}
            </div>
            {comparisonText && (
                <p className="text-xs text-emerald-600 font-bold mb-4 bg-emerald-50 inline-block px-2 py-1 rounded">
                    {comparisonText}
                </p>
            )}
            
            <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100 min-h-[60px]">
                {description}
            </p>
            <ul className="space-y-4">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                        <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${isSultan ? 'text-amber-500' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="p-6 bg-slate-50 rounded-b-2xl border-t border-slate-100">
            <button 
                onClick={onCtaClick}
                className={`w-full py-3 px-4 rounded-xl font-bold transition-colors shadow-lg ${
                    isSultan 
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600'
                    : isPopular 
                    ? 'bg-sky-600 text-white hover:bg-sky-700' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
            >
                {ctaText}
            </button>
        </div>
    </div>
);

const MicrositeBuilder: React.FC<MicrositeBuilderProps> = ({ setActivePage }) => {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Pilih Paket Sesuai Kantong</h2>
          <p className="mt-4 text-xl text-slate-600">
            Harga rakyat, kualitas pejabat. Pilih paket yang pas buat usahamu.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
            
            <PricingCard 
                name="Paket Warga"
                price="Gratis"
                description="Cocok untuk yang baru mau coba-coba online. Tanpa biaya sepeserpun."
                features={[
                    "Profil Usaha Standar",
                    "1 Foto Utama",
                    "Alamat & Lokasi",
                    "Muncul di Pencarian"
                ]}
                ctaText="Daftar Gratis"
                onCtaClick={() => setActivePage(Page.Guide)}
            />

            <PricingCard 
                name="Paket Juragan"
                price="Rp 15.000"
                period="bulan"
                isPopular
                comparisonText="Setara harga 1 bungkus rokok 🚬"
                description="Paket paling pas buat Warung, Petani, dan UMKM pemula agar terlihat profesional."
                features={[
                    "Semua fitur Gratis",
                    "Galeri Foto Banyak (Pamer Menu/Produk)",
                    "Tombol Langsung ke WhatsApp (Penting!)",
                    "Link Cantik (pruidea.com/warung-kamu)",
                    "Badge 'Terverifikasi' ✅",
                    "QR Code Cetak"
                ]}
                ctaText="Pilih Juragan"
                onCtaClick={() => setIsPayModalOpen(true)}
            />

             <PricingCard 
                name="Paket Sultan"
                price="Rp 50.000"
                period="bulan"
                isSultan
                comparisonText="Buat yang serius mau cuan besar 💰"
                description="Khusus Bos Besar yang ingin idenya selalu tampil paling atas dan dilihat ribuan orang."
                features={[
                    "Semua fitur Juragan",
                    "Posisi PINNED (Selalu di Atas)",
                    "Bingkai Emas Eksklusif",
                    "Prioritas Support Admin",
                    "Masuk ke 'Kisah Sukses' (Blog)",
                    "Laporan Statistik Pengunjung"
                ]}
                ctaText="Pilih Sultan"
                onCtaClick={() => setIsPayModalOpen(true)}
            />

            <PricingCard 
                name="Jasa Bantuan"
                price="Rp 50.000"
                period="sekali"
                description="Gaptek? Bingung nulis? Biar tim kami yang kerjakan semuanya sampai beres."
                comparisonText="Lebih murah dari bayar desainer"
                features={[
                    "Dibuatkan Akun sampai Jadi",
                    "Dibuatkan Logo Sederhana",
                    "Dituliskan Deskripsi Jualan",
                    "Edit Foto Produk",
                    "Diajari Cara Pakainya"
                ]}
                ctaText="Minta Bantuan"
                onCtaClick={() => setActivePage(Page.Contact)}
            />
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ingin Kerjasama Besar?</h3>
            <p className="text-slate-600 mb-6">
                Apakah Anda Ketua Kelompok Tani, Ketua Komunitas Pedagang, atau Koperasi? Kami punya penawaran khusus untuk mendaftarkan anggotanya secara massal.
            </p>
            <button onClick={() => setActivePage(Page.Partnership)} className="text-sky-600 font-bold hover:underline">
                Pelajari Panduan Kemitraan &rarr;
            </button>
        </div>

      </div>

      <PremiumModal 
        isOpen={isPayModalOpen} 
        onClose={() => setIsPayModalOpen(false)}
        onLearnMore={() => {}} 
      />
    </div>
  );
};

export default MicrositeBuilder;
