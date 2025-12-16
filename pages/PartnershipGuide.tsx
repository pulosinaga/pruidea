
import React from 'react';
import { Page } from '../types';

interface PartnershipGuideProps {
  setActivePage: (page: Page) => void;
}

const BenefitCard: React.FC<{ title: string; desc: string; icon: string }> = ({ title, desc, icon }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
);

const StepCard: React.FC<{ num: number; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg">
                {num}
            </div>
        </div>
        <div>
            <h4 className="text-lg font-bold text-slate-900">{title}</h4>
            <p className="mt-1 text-slate-600">{children}</p>
        </div>
    </div>
);

const PartnershipGuide: React.FC<PartnershipGuideProps> = ({ setActivePage }) => {
  const handleDownloadPDF = () => {
      alert("Simulasi: File 'Panduan_Anggota_Pruidea.pdf' sedang didownload...");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <span className="bg-sky-500/20 text-sky-200 border border-sky-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">Program Mitra Digital Desa</span>
             <h1 className="text-3xl md:text-5xl font-extrabold mb-6">Digitalkan Anggota Anda,<br/>Sekali Jalan, Terima Beres.</h1>
             <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
                 Solusi khusus untuk Ketua Koperasi, Kepala Desa, dan Pemimpin Komunitas.
                 Tidak perlu daftar satu-satu. Kami bantu buatkan etalase digital untuk seluruh anggota Anda.
             </p>
             <button 
                onClick={() => window.open('https://wa.me/628123456789?text=Halo%20Tim%20Pruidea,%20saya%20ingin%20tanya%20program%20kemitraan%20komunitas.', '_blank')}
                className="bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-400 transition-colors shadow-lg hover:shadow-sky-500/50"
             >
                 Hubungi Kami via WhatsApp
             </button>
         </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Why Partner? */}
          <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900">Kenapa Harus Kolektif?</h2>
              <p className="text-slate-600 mt-2">Mendaftarkan anggota secara massal jauh lebih menguntungkan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              <BenefitCard 
                icon="📉" 
                title="Harga Grosir (Diskon Besar)" 
                desc="Biaya per anggota jauh lebih murah dibandingkan daftar sendiri-sendiri. Hemat anggaran komunitas Anda."
              />
              <BenefitCard 
                icon="⚡" 
                title="Tanpa Ribet (Zero Admin)" 
                desc="Anggota Anda gaptek? Tidak masalah. Cukup kirim data di Excel, tim kami yang input semuanya sampai jadi website."
              />
              <BenefitCard 
                icon="📊" 
                title="Laporan Terpusat" 
                desc="Sebagai ketua, Anda akan mendapat laporan siapa saja anggota yang sudah online dan seberapa banyak pengunjungnya."
              />
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 mb-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Cara Kerja Kemitraan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                      <StepCard num={1} title="Data Kolektif">
                          Kami berikan format Excel sederhana. Anda cukup minta anggota mengisi Nama Usaha, Produk, dan Nomor WA.
                      </StepCard>
                      <StepCard num={2} title="Proses Digitalisasi">
                          Tim IT Pruidea akan mengolah data tersebut. Dalam 1-3 hari kerja (tergantung jumlah), 100+ website anggota Anda siap tayang.
                      </StepCard>
                      <StepCard num={3} title="Peluncuran & Pelatihan">
                          Kami sediakan <strong>Pusat Materi (Video & PDF)</strong> di bawah ini. Anda tinggal share link-nya ke Grup WA anggota agar mereka bisa belajar mandiri.
                      </StepCard>
                  </div>
                  <div className="bg-sky-50 rounded-xl p-6 border border-sky-100 flex flex-col justify-center">
                      <h3 className="font-bold text-slate-800 mb-4 text-center">Simulasi Biaya (Contoh)</h3>
                      <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-sky-200 pb-2">
                              <span>Harga Normal (Perorangan)</span>
                              <span className="font-medium text-slate-500 line-through">Rp 15.000 / bln</span>
                          </div>
                          <div className="flex justify-between border-b border-sky-200 pb-2 text-slate-900 font-bold">
                              {/* FIX: Mengganti tanda '>' dengan '&gt;' agar valid JSX */}
                              <span>Harga Mitra (&gt;50 Anggota)</span>
                              <span className="text-emerald-600">Rp 5.000 / bln</span>
                          </div>
                          <div className="mt-4 bg-white p-3 rounded text-center text-xs text-slate-500">
                              *Harga dapat disesuaikan tergantung fitur yang diminta (Custom).
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* PUSAT MATERI (RESOURCE HUB) - Solusi untuk pertanyaan Video Panduan */}
          <div id="resources" className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 mb-20 relative overflow-hidden">
              <div className="relative z-10">
                  <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold mb-4">Pusat Materi Pelatihan</h2>
                      <p className="text-slate-300 max-w-2xl mx-auto">
                          Tidak perlu bingung mengajari anggota. Kami sudah siapkan materi lengkap. 
                          Silakan gunakan video dan dokumen ini untuk disebar di Grup WhatsApp Komunitas Anda.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                      {/* Video Section */}
                      <div className="space-y-4">
                          <div className="aspect-w-16 aspect-h-9 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-2xl relative group cursor-pointer">
                              {/* Placeholder Video - Nanti diganti embed YouTube */}
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                                   <div className="text-center">
                                       <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                       </div>
                                       <p className="font-bold text-lg">Tonton Tutorial Penggunaan</p>
                                       <p className="text-sm text-slate-400">Durasi: 5 Menit</p>
                                   </div>
                              </div>
                              {/* Contoh Embed Code (Disembunyikan, nanti diaktifkan jika sudah ada link YouTube) */}
                              {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/KODE_VIDEO_ANDA" title="Tutorial Pruidea" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                          </div>
                          <p className="text-sm text-center text-slate-400">
                              💡 Tips: Putar video ini saat pertemuan rutin anggota.
                          </p>
                      </div>

                      {/* Download Section */}
                      <div className="space-y-6">
                          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-sky-500 transition-colors">
                              <h3 className="text-xl font-bold text-sky-400 mb-2">📥 Buku Saku Anggota (PDF)</h3>
                              <p className="text-slate-400 text-sm mb-4">
                                  Panduan bergambar cara mengelola halaman profil, cara membalas chat pembeli, dan tips foto produk pakai HP.
                              </p>
                              <button 
                                onClick={handleDownloadPDF}
                                className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-sky-50 transition-colors flex items-center justify-center"
                              >
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                  Download PDF
                              </button>
                          </div>

                           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors">
                              <h3 className="text-xl font-bold text-emerald-400 mb-2">📊 Template Data Anggota (Excel)</h3>
                              <p className="text-slate-400 text-sm mb-4">
                                  Format formulir pendaftaran kolektif. Download, isi data anggota, lalu kirim balik ke Admin Pruidea.
                              </p>
                              <button 
                                onClick={() => alert("Simulasi: Template Excel sedang didownload.")}
                                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
                              >
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                  Download Excel
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* FAQ Specific */}
          <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Pertanyaan Umum Ketua Komunitas</h2>
              <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800">Apakah bisa pakai Logo Koperasi kami?</h4>
                      <p className="text-slate-600 mt-1 text-sm">Bisa! Kami bisa menambahkan label "Binaan Koperasi [Nama]" di setiap halaman anggota Anda.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800">Bagaimana kalau anggota saya tidak punya email?</h4>
                      <p className="text-slate-600 mt-1 text-sm">Tidak masalah. Kami bisa mendaftarkan menggunakan nomor HP saja sebagai identitas utama.</p>
                  </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800">Apakah ada kontrak terikat?</h4>
                      <p className="text-slate-600 mt-1 text-sm">Tidak. Anda bisa mencoba untuk 1 bulan atau 1 tahun. Kami sarankan uji coba 3 bulan untuk melihat dampak penjualan.</p>
                  </div>
              </div>
          </div>
          
          <div className="mt-12 text-center">
               <button 
                onClick={() => setActivePage(Page.Contact)}
                className="text-slate-500 font-medium hover:text-slate-800 underline"
               >
                   Kembali ke Formulir Kontak Biasa
               </button>
          </div>

      </div>
    </div>
  );
};

export default PartnershipGuide;
