
import React from 'react';
import { Page } from '../types';
import SEO from '../components/SEO';

interface HomeProps {
  setActivePage: (page: Page) => void;
}

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-default h-full">
        <div className="h-12 w-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
);

const Home: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <>
      <SEO 
        title="Pruidea.com - Wujudkan Ide Apa Saja"
        description="Pruidea adalah platform etalase digital untuk segala jenis ide. Mulai dari startup, jasa profesional, bisnis kreatif, hingga proyek komunitas."
      />

      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-sky-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-20 md:pt-32 md:pb-32 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                🚀 Platform Etalase Ide #1
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              Ide Apapun, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Peluang Tanpa Batas.</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Startup teknologi? Jasa freelance? Bisnis kuliner? Atau proyek sosial? <br/>
              Apapun idemu, buat "Microsite" profesional dalam 3 menit dan tunjukkan pada dunia.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setActivePage(Page.MicrositeBuilder)}
                className="bg-slate-900 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-300 transform hover:-translate-y-1"
              >
                Mulai Publikasi &rarr;
              </button>
              <button
                onClick={() => setActivePage(Page.Showcase)}
                className="bg-white text-slate-700 border border-slate-200 font-bold py-4 px-10 rounded-full text-lg hover:bg-slate-50 transition-all hover:border-slate-300"
              >
                Eksplorasi Ide
              </button>
            </div>
            
            {/* Social Proof Avatars */}
            <div className="mt-10 flex items-center justify-center space-x-2">
                <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                         <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+15}`} alt="User" />
                     ))}
                     <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">+5k</div>
                </div>
                <p className="text-sm text-slate-500 font-medium ml-2">Inovator telah bergabung.</p>
            </div>
        </div>
      </div>

      {/* Stats Bar (NEW) */}
      <div className="bg-slate-900 text-white py-12 border-y border-slate-800">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
              <div className="p-2">
                  <div className="text-3xl md:text-4xl font-extrabold text-indigo-400 mb-1">5.000+</div>
                  <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">Ide Terpublikasi</div>
              </div>
              <div className="p-2">
                  <div className="text-3xl md:text-4xl font-extrabold text-sky-400 mb-1">Rp 0</div>
                  <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">Biaya Mulai</div>
              </div>
              <div className="p-2">
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">100+</div>
                  <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">Kategori Bisnis</div>
              </div>
              <div className="p-2">
                  <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 mb-1">Global</div>
                  <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">Jangkauan Akses</div>
              </div>
          </div>
      </div>

      <div className="bg-slate-50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2 className="text-3xl font-extrabold text-slate-900">Satu Platform, Berjuta Kemungkinan</h2>
                  <p className="mt-4 text-lg text-slate-600">
                      Kami tidak membatasi imajinasi Anda. Pruidea dirancang fleksibel untuk segala kebutuhan etalase digital.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard 
                      title="Showcase Profesional"
                      desc="Tampilkan portofolio desain, jasa konsultan, atau profil startup Anda dengan tampilan yang bersih dan meyakinkan klien."
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  />
                  <FeatureCard 
                      title="Validasi Ide Bisnis"
                      desc="Punya ide gila? Posting dulu di sini (GRATIS). Lihat respon pasar, dapatkan feedback, dan temukan calon investor atau co-founder."
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                  />
                  <FeatureCard 
                      title="Digitalisasi UMKM"
                      desc="Tentu saja, kami tetap mendukung UMKM. Bawa toko offline Anda ke ranah online dengan mudah tanpa biaya teknis yang mahal."
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                  />
              </div>
          </div>
      </div>

      <div className="bg-white py-20 border-y border-slate-100">
          <div className="container mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-10">Rumah Bagi Semua Kreator</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform">
                        <div className="w-20 h-20 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:bg-indigo-100 transition-colors">💻</div>
                        <span className="font-bold text-slate-700 text-lg">Tech & Startup</span>
                        <span className="text-xs text-slate-500">App, SaaS, IoT</span>
                  </div>
                   <div className="flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform">
                        <div className="w-20 h-20 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:bg-orange-100 transition-colors">🎨</div>
                        <span className="font-bold text-slate-700 text-lg">Kreatif</span>
                        <span className="text-xs text-slate-500">Desain, Musik, Seni</span>
                  </div>
                   <div className="flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform">
                        <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:bg-emerald-100 transition-colors">👔</div>
                        <span className="font-bold text-slate-700 text-lg">Profesional</span>
                        <span className="text-xs text-slate-500">Konsultan, Jasa Ahli</span>
                  </div>
                   <div className="flex flex-col items-center group cursor-pointer hover:-translate-y-1 transition-transform">
                        <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:bg-rose-100 transition-colors">🛍️</div>
                        <span className="font-bold text-slate-700 text-lg">Retail & Produk</span>
                        <span className="text-xs text-slate-500">Fashion, Kuliner, Craft</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Mulai Langkah Pertamamu.</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
                Jangan biarkan idemu hanya tersimpan di kepala. Publikasikan, validasi, dan kembangkan bersama Pruidea.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                    onClick={() => setActivePage(Page.MicrositeBuilder)}
                    className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full hover:bg-indigo-500 transition-colors shadow-lg hover:shadow-indigo-500/20 text-lg"
                >
                    Lihat Opsi Paket
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Home;
