
import React from 'react';
import { Page } from '../types';

interface SuccessStoriesProps {
    setActivePage: (page: Page) => void;
}

const StoryCard: React.FC<{imgSrc: string, title: string, category: string, children: React.ReactNode}> = ({imgSrc, title, category, children}) => (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300">
        <div className="h-56 w-full md:h-auto md:w-1/3 relative bg-slate-200">
            {/* Optimized Image with Lazy Loading & decoding async */}
            <img 
                className="absolute inset-0 w-full h-full object-cover" 
                src={imgSrc} 
                alt={title} 
                loading="lazy" 
                decoding="async"
            />
        </div>
        <div className="p-6 md:p-8 flex flex-col flex-grow w-full md:w-2/3">
            <div className="flex-grow">
                <p className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">{category}</p>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-3">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{children}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50">
                <button className="flex items-center text-sm font-bold text-sky-600 hover:text-sky-800 transition-colors duration-200 group">
                    Baca Selengkapnya 
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
)

const SuccessStories: React.FC<SuccessStoriesProps> = ({ setActivePage }) => {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Hall of Fame</span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mt-4">Kisah Sukses Warga</h2>
          <p className="mt-4 text-lg text-slate-600">
            Bukti nyata bahwa ide sederhana, jika dikelola dengan benar dan diberi tempat, bisa berkembang menjadi bisnis yang menghidupi banyak orang.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="max-w-4xl mx-auto space-y-12">
            <StoryCard 
                imgSrc="https://picsum.photos/seed/success_rosa/800/600" 
                title='Dari "Cuma Kopi" Jadi Brand Kebanggaan Desa' 
                category="Kisah Inspiratif Desa Salak"
            >
                Kisah inspiratif Rosa yang berawal dari ide sederhana di Pruidea. "Kopi Kampung Rosa" awalnya diremehkan karena kemasan plastik biasa. Setelah bergabung, Rosa belajar branding dan digital marketing. Kini kopinya menjadi oleh-oleh wajib dan memberdayakan 15 petani sekitar.
            </StoryCard>
            
             <StoryCard 
                imgSrc="https://picsum.photos/seed/success2/800/600" 
                title="Mama Bakes: Bisnis Dapur Masuk Mall" 
                category="UMKM Kuliner"
            >
                Setelah viral di etalase kami, "Mama Bakes" yang awalnya hanya bisnis rumahan kecil-kecilan kini telah membuka gerai fisik pertamanya di pusat kota. Pesanan online via WhatsApp meningkat 300% sejak memiliki microsite profesional.
            </StoryCard>

            <StoryCard 
                imgSrc="https://picsum.photos/seed/success3/800/600" 
                title="Komunitas Sepeda Tua: Hobi Jadi Prestasi" 
                category="Komunitas Kreatif"
            >
                Pak Dhe Joyo awalnya bingung mencari anggota baru. Lewat Pruidea, komunitasnya ditemukan oleh Event Organizer besar. Kini mereka rutin diundang pameran budaya dan mendapat sponsor, menjadikan hobi mereka mandiri secara finansial.
            </StoryCard>
        </div>

        {/* CTA Section - Agar halaman tidak buntu (Dead End) */}
        <div className="mt-20 text-center">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Giliran Anda Menjadi Cerita Selanjutnya!</h3>
                <p className="text-slate-600 mb-8">
                    Jangan biarkan ide Anda hanya tersimpan di kepala. Mulai langkah kecil hari ini dengan membuat profil usaha Anda secara gratis.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => setActivePage(Page.Guide)}
                        className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-colors shadow-lg hover:shadow-sky-200"
                    >
                        Mulai Tulis Ide Saya
                    </button>
                    <button 
                        onClick={() => setActivePage(Page.Showcase)}
                        className="bg-white text-slate-700 border border-slate-300 font-bold py-3 px-8 rounded-full hover:bg-slate-50 transition-colors"
                    >
                        Cari Inspirasi Dulu
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SuccessStories;
