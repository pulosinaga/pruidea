import React from 'react';

const Feature: React.FC<{ icon: React.ReactElement; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 text-sky-700">
                {icon}
            </div>
        </div>
        <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-slate-900">{title}</h3>
            <p className="mt-1 text-base text-slate-600">{children}</p>
        </div>
    </div>
);

const PremiumPackage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Paket Premium Pruidea</h2>
          <p className="mt-4 text-lg text-slate-600">
            Maksimalkan potensi idemu dengan fitur-fitur eksklusif yang dirancang untuk memberikan visibilitas dan dukungan lebih.
          </p>
        </div>

        <div className="mt-16 max-w-2xl mx-auto space-y-10">
            <Feature 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                title="Tampil di Beranda Utama"
            >
                Ide Anda akan mendapatkan sorotan utama di halaman depan Pruidea, dilihat oleh ribuan pengunjung setiap hari.
            </Feature>
            <Feature 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
                title="Dapat Microsite Sendiri"
            >
                Ubah halaman idemu menjadi website mini profesional dengan tautan sendiri (contoh: pruidea.com/ide/kopi-rosa) untuk promosi yang lebih mudah.
            </Feature>
            <Feature 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>}
                title="Promosi di Media Sosial"
            >
                Tim kami akan membantu mempromosikan ide Anda secara berkala di jaringan media sosial resmi Pruidea.
            </Feature>
            <Feature 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v4z" /></svg>}
                title="Konsultasi Singkat Online"
            >
                Dapatkan satu sesi konsultasi online 30 menit dengan tim kami untuk membahas strategi pengembangan ide Anda.
            </Feature>
        </div>
        
        <div className="mt-16 text-center">
            <div className="max-w-md mx-auto p-6 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-slate-600">
                    Berminat? Hubungi kami untuk aktivasi paket Premium Anda.
                </p>
                <button className="mt-4 bg-amber-500 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-600 transition-colors duration-300 shadow">
                    Hubungi via Email
                </button>
                <p className="text-xs text-slate-400 mt-4">
                    Catatan: Pembayaran dan aktivasi akan dilakukan manual selama versi beta ini.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default PremiumPackage;
