
import React from 'react';
import { Page } from '../types';

interface NIBGuideProps {
  setActivePage: (page: Page) => void;
}

const StepItem: React.FC<{ num: number; title: string; desc: string }> = ({ num, title, desc }) => (
    <div className="flex items-start relative pb-10 last:pb-0">
        {/* Line connector */}
        <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-slate-200 last:hidden"></div>
        
        <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-sm z-10">
            {num}
        </div>
        <div className="ml-6 bg-white p-5 rounded-lg border border-slate-100 shadow-sm w-full hover:shadow-md transition-shadow">
            <h4 className="font-bold text-slate-900 text-lg mb-1">{title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const NIBGuide: React.FC<NIBGuideProps> = ({ setActivePage }) => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
             Legalitas Usaha
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Pentingnya NIB (Nomor Induk Berusaha)</h2>
          <p className="mt-4 text-xl text-slate-600">
            Agar usahamu diakui negara, aman dari penertiban, dan mudah dapat modal bank (KUR).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
                <img 
                    src="https://picsum.photos/seed/nib_legal/600/400" 
                    alt="Ilustrasi Legalitas" 
                    className="rounded-xl shadow-lg w-full object-cover"
                />
            </div>
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">Apa itu NIB?</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                    NIB adalah "KTP"-nya usaha Anda. Dulu kita kenal SIUP/TDP, sekarang diganti jadi satu nomor sakti bernama NIB. 
                </p>
                <div className="bg-slate-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                    <p className="font-bold text-slate-800 mb-2">Keuntungan Punya NIB:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                        <li>Usaha dilindungi hukum (Legal).</li>
                        <li>Syarat wajib pengajuan Kredit Usaha Rakyat (KUR) Bank.</li>
                        <li>Bisa ikut tender/pengadaan pemerintah.</li>
                        <li>Mendapatkan sertifikasi halal & BPOM lebih mudah.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Pilihan Cara Buat */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200 mb-20">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">2 Cara Mendapatkan NIB</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cara Mandiri */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                    <div className="mb-4">
                        <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">Cara 1: Mandiri</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Daftar Sendiri (Gratis)</h4>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">
                        Anda bisa mendaftar sendiri melalui website resmi pemerintah (OSS). Gratis tanpa biaya, tapi butuh paham teknis pengisian data.
                    </p>
                    <ul className="space-y-3 mb-6 text-sm text-slate-500">
                        <li>✅ Biaya Rp 0 (Gratis)</li>
                        <li>⚠️ Harus paham kategori KBLI</li>
                        <li>⚠️ Butuh email aktif & HP</li>
                    </ul>
                    <a 
                        href="https://oss.go.id" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full block text-center border border-slate-300 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        Kunjungi oss.go.id &rarr;
                    </a>
                </div>

                {/* Cara Pruidea */}
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-emerald-500 relative flex flex-col transform md:-translate-y-4">
                     <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        REKOMENDASI
                    </div>
                    <div className="mb-4">
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Cara 2: Terima Beres</span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Jasa Pendampingan Pruidea</h4>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">
                        Gaptek? Takut salah isi data? Serahkan pada tim admin kami. Cukup kirim foto KTP & data usaha via WA, NIB terbit dalam 24 jam.
                    </p>
                     <ul className="space-y-3 mb-6 text-sm text-slate-600">
                        <li className="flex items-center"><svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Konsultasi KBLI yang Tepat</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Data Diisikan Admin</li>
                        <li className="flex items-center"><svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> PDF NIB Dikirim ke WA</li>
                    </ul>
                    <div className="flex items-center justify-between mb-4 bg-emerald-50 p-3 rounded-lg">
                        <span className="text-xs text-slate-500 line-through">Biaya Biro Jasa: Rp 150.000</span>
                        <span className="text-lg font-bold text-emerald-600">Cuma Rp 50.000</span>
                    </div>
                    <button 
                        onClick={() => window.open('https://wa.me/628123456789?text=Halo%20Admin,%20saya%20mau%20dibantu%20buatkan%20NIB.', '_blank')}
                        className="w-full block text-center bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg animate-pulse"
                    >
                        Bantu Saya Buat NIB via WA
                    </button>
                </div>
            </div>
        </div>

        {/* ALUR KERJA DETAIL (NEW SECTION) */}
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Alur Pembuatan NIB dengan Pendampingan</h2>
            
            <div className="space-y-0">
                <StepItem 
                    num={1} 
                    title="Chat Admin & Konsultasi" 
                    desc="Klik tombol 'Bantu Saya' di atas. Admin akan menanyakan jenis usaha Anda untuk menentukan kode KBLI yang paling tepat."
                />
                <StepItem 
                    num={2} 
                    title="Kirim Data via WA" 
                    desc="Cukup foto KTP Anda, sebutkan Nama Usaha, Alamat Usaha, dan Modal Awal. Tidak perlu isi formulir ribet."
                />
                <StepItem 
                    num={3} 
                    title="Pembayaran Jasa" 
                    desc="Transfer biaya jasa Rp 50.000 ke rekening admin. Ini adalah biaya untuk tenaga admin menginput data ke sistem OSS."
                />
                <StepItem 
                    num={4} 
                    title="Proses Pengerjaan" 
                    desc="Admin akan memproses data Anda di website OSS. Proses biasanya memakan waktu 1-24 jam tergantung antrean sistem."
                />
                <StepItem 
                    num={5} 
                    title="NIB Terbit!" 
                    desc="File PDF NIB Resmi akan dikirimkan kembali ke WhatsApp Anda. Anda tinggal cetak dan pajang di tempat usaha."
                />
            </div>
            
             <div className="mt-12 bg-sky-50 border border-sky-200 p-6 rounded-xl text-center">
                <p className="text-sky-800 font-medium">
                    "Legalitas adalah langkah awal usaha menjadi besar. Jangan ragu untuk memulai."
                </p>
                <div className="mt-4">
                    <button onClick={() => setActivePage(Page.Contact)} className="text-sm text-slate-500 hover:text-slate-700 underline">
                        Punya pertanyaan lain? Hubungi Kami
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default NIBGuide;
