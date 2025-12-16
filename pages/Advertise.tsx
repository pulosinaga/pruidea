
import React from 'react';
import { Page } from '../types';

interface AdvertiseProps {
    setActivePage: (page: Page) => void;
}

const AdPackageCard: React.FC<{
    title: string;
    price: string;
    features: string[];
    isRecommended?: boolean;
    onSelect: () => void;
}> = ({ title, price, features, isRecommended, onSelect }) => (
    <div className={`bg-white rounded-2xl shadow-lg border p-6 flex flex-col ${isRecommended ? 'border-sky-500 ring-2 ring-sky-500 ring-offset-2 scale-105 z-10' : 'border-slate-200'}`}>
        {isRecommended && (
            <div className="self-center -mt-9 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                PALING EFEKTIF
            </div>
        )}
        <h3 className="text-xl font-bold text-slate-900 text-center mb-2">{title}</h3>
        <p className="text-3xl font-extrabold text-center text-slate-800 mb-6">{price}</p>
        <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feat, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-600">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                </li>
            ))}
        </ul>
        <button 
            onClick={onSelect}
            className={`w-full py-3 rounded-xl font-bold transition-colors ${isRecommended ? 'bg-sky-600 text-white hover:bg-sky-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
            Pilih Paket
        </button>
    </div>
);

const Advertise: React.FC<AdvertiseProps> = ({ setActivePage }) => {
  const handleContact = () => {
      window.open('https://wa.me/628123456789?text=Halo%20Admin%20Pruidea,%20saya%20tertarik%20pasang%20iklan/sponsorship.', '_blank');
  };

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Pasang Iklan di Pruidea</h2>
          <p className="mt-4 text-xl text-slate-600">
            Jangkau ribuan pemilik UMKM, petani, dan komunitas kreatif dalam satu platform.
          </p>
        </div>

        {/* Statistik Traffic (Selling Point) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-b-4 border-sky-500">
                <p className="text-3xl font-bold text-slate-900">10k+</p>
                <p className="text-xs text-slate-500 uppercase mt-1">Pengunjung / Bulan</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center border-b-4 border-emerald-500">
                <p className="text-3xl font-bold text-slate-900">500+</p>
                <p className="text-xs text-slate-500 uppercase mt-1">Ide Terdaftar</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm text-center border-b-4 border-amber-500">
                <p className="text-3xl font-bold text-slate-900">34</p>
                <p className="text-xs text-slate-500 uppercase mt-1">Kota/Kabupaten</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm text-center border-b-4 border-indigo-500">
                <p className="text-3xl font-bold text-slate-900">High</p>
                <p className="text-xs text-slate-500 uppercase mt-1">Engagement</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AdPackageCard 
                title="Fitur 'Sundul Gan'"
                price="Rp 10.000"
                features={[
                    "Pin Ide Anda di Posisi #1 selama 7 hari",
                    "Bingkai Emas (Sorotan)",
                    "Dilihat 5x lebih banyak",
                    "Cocok untuk user perorangan"
                ]}
                onSelect={handleContact}
            />
            
            <AdPackageCard 
                title="Banner Sponsor"
                price="Rp 150.000"
                isRecommended
                features={[
                    "Banner Iklan di Halaman Etalase (30 hari)",
                    "Link langsung ke Website/WA Anda",
                    "Laporan jumlah klik",
                    "Cocok untuk Brand/Supplier"
                ]}
                onSelect={handleContact}
            />

            <AdPackageCard 
                title="Liputan Khusus"
                price="Rp 300.000"
                features={[
                    "Artikel khusus di Blog/Kisah Sukses",
                    "Diposting di Sosmed Pruidea",
                    "Review produk mendalam",
                    "Permanen selamanya"
                ]}
                onSelect={handleContact}
            />
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Butuh Paket Custom?</h3>
            <p className="text-slate-600 mb-6">
                Kami terbuka untuk kerjasama jangka panjang, affiliate, atau barter promosi.
            </p>
            <button onClick={() => setActivePage(Page.Contact)} className="text-sky-600 font-bold hover:underline">
                Hubungi Tim Marketing &rarr;
            </button>
        </div>

      </div>
    </div>
  );
};

export default Advertise;
