
import React from 'react';
import { Page } from '../types';

interface HelpCenterProps {
    setActivePage: (page: Page) => void;
}

const HelpCard: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow border border-slate-100 hover:shadow-md transition-shadow cursor-pointer hover:border-sky-200 group">
        <div className="h-10 w-10 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{desc}</p>
    </div>
);

const HelpCenter: React.FC<HelpCenterProps> = ({ setActivePage }) => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Pusat Bantuan</h2>
          <p className="mt-4 text-lg text-slate-600">
            Panduan lengkap untuk memaksimalkan potensi usaha Anda di Pruidea.
          </p>
          <div className="mt-8 relative">
             <input 
                type="text" 
                placeholder="Cari topik bantuan (misal: verifikasi, lupa password)..." 
                className="w-full px-5 py-3 bg-sky-50 border border-sky-200 rounded-full shadow-sm focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-colors outline-none placeholder-slate-400 text-slate-700" 
             />
             <button className="absolute right-2 top-1.5 bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <HelpCard 
                title="Panduan Pemilik Ide" 
                desc="Cara membuat microsite, upload foto produk yang menarik, dan tips agar ide tampil di halaman depan."
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
            />
             <HelpCard 
                title="Verifikasi & Kepercayaan" 
                desc="Syarat mendapatkan Centang Biru, cara melaporkan penipuan, dan tips bertransaksi aman."
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
             <HelpCard 
                title="Komunitas & Forum" 
                desc="Aturan main di Forum Warga, cara membuat topik diskusi, dan etika berkomentar."
                icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v4z" /></svg>}
            />
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-8 text-center border border-sky-100">
            <h3 className="text-xl font-bold text-slate-900">Masih ada yang membingungkan?</h3>
            <p className="text-slate-600 mt-2 mb-6">Tim support kami siap membantu Anda (Senin - Jumat, 09.00 - 17.00 WIB).</p>
            <button 
                onClick={() => setActivePage(Page.Contact)}
                className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-colors shadow-lg hover:shadow-sky-200"
            >
                Hubungi Admin
            </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
