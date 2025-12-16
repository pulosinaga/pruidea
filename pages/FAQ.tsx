
import React from 'react';

const FaqItem: React.FC<{ question: React.ReactNode; answer: string }> = ({ question, answer }) => (
  <div className="border-b border-slate-200 py-6 group">
    <div className="text-lg font-medium leading-6 text-slate-900 group-hover:text-sky-900 group-hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer origin-left flex items-center">
        {question}
    </div>
    <p className="mt-2 text-base text-slate-600 leading-relaxed">{answer}</p>
  </div>
);

const FAQ: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-8">Pertanyaan yang Sering Diajukan (FAQ)</h2>
        <p className="text-center text-slate-600 mb-12">
          Semua yang perlu Anda ketahui tentang cara kerja ekosistem Pruidea.
        </p>

        <div className="bg-white shadow-lg rounded-xl px-6 py-4 border border-slate-100">
            <FaqItem 
                question={
                    <span className="flex items-center">
                        Apa itu Pruidea.com?
                        <svg className="w-5 h-5 ml-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <title>Informasi Terverifikasi</title>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                    </span>
                } 
                answer="Pruidea adalah 'Mall Digital' untuk ide bisnis rakyat, UMKM, dan komunitas. Kami menyediakan tempat (Microsite) agar usaha kecil, petani, atau pemilik ide bisa tampil online secara profesional dan mudah ditemukan oleh mitra atau investor." 
            />
            <FaqItem 
                question="Bagaimana cara mendapatkan Centang Biru (Verified)?" 
                answer="Centang Biru diberikan kepada pemilik ide yang telah diverifikasi keasliannya oleh Admin. Pastikan Anda mengisi nomor WhatsApp yang aktif dan menyertakan link media sosial (IG/FB) yang valid saat mendaftar. Admin mungkin akan menghubungi Anda untuk verifikasi singkat." 
            />
             <FaqItem 
                question="Apakah Pruidea memotong komisi penjualan saya?" 
                answer="TIDAK SAMA SEKALI. Pruidea hanya penghubung. Jika ada pembeli yang menghubungi Anda lewat WhatsApp dan terjadi transaksi, 100% keuntungan adalah milik Anda. Kami tidak ikut campur dalam transaksi uang." 
            />
            <FaqItem 
                question="Apa bedanya 'Etalase Ide' dengan 'Forum Warga'?" 
                answer="'Etalase Ide' adalah tempat Anda memajang profil usaha/jasa Anda (seperti brosur online). Sedangkan 'Forum Warga' adalah tempat diskusi, tanya jawab, cari solusi, atau mencari barang tertentu secara santai antar sesama pengguna." 
            />
            <FaqItem 
                question="Apakah data ide saya aman?" 
                answer="Kami menjaga privasi data Anda. Namun, perlu diingat bahwa tujuan Pruidea adalah MEMPUBLIKASIKAN ide Anda agar dikenal dunia. Jadi, informasi seperti Judul, Deskripsi, dan Kontak Bisnis memang sengaja ditampilkan untuk publik. Jangan cantumkan data rahasia (seperti PIN ATM/KTP) di deskripsi." 
            />
            <FaqItem 
                question="Bisakah saya menghapus ide yang sudah diposting?" 
                answer="Bisa. Jika ide sudah tidak relevan atau usaha tutup, Anda bisa menghubungi Admin melalui menu Kontak untuk meminta penghapusan data." 
            />
             <FaqItem 
                question="Saya menemukan penipuan, apa yang harus dilakukan?" 
                answer="Gunakan tombol 'Laporkan Penipuan' yang ada di halaman detail ide tersebut. Tim keamanan kami akan segera meninjau dan menghapus akun yang terbukti merugikan warga." 
            />
        </div>
      </div>
    </div>
  );
};

export default FAQ;