
import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-8">Syarat & Ketentuan</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="mb-6">
            Selamat datang di Pruidea.com. Dengan mengakses dan menggunakan layanan ini, Anda menyetujui aturan main berikut demi kenyamanan bersama.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Posisi Pruidea (Platform Netral)</h3>
          <p className="mb-4">
            Pruidea.com bertindak sebagai <strong>Penyedia Etalase Informasi</strong>. 
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Kami tidak terlibat dalam transaksi jual-beli, negosiasi, atau kesepakatan kerja yang terjadi akibat informasi di website ini.</li>
            <li>Kami tidak bertanggung jawab atas kerugian yang timbul akibat interaksi Anda dengan pengguna lain.</li>
            <li>Badge "Terverifikasi" adalah indikator bahwa admin telah melakukan pengecekan dasar, namun <strong>BUKAN jaminan</strong> 100% anti-penipuan. Pengguna wajib tetap waspada.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Konten Pengguna (Ide & Forum)</h3>
          <p className="mb-4">
            Anda bertanggung jawab penuh atas segala teks, gambar, dan informasi yang Anda unggah. Anda dilarang memuat konten yang:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Melanggar Hak Cipta orang lain (misal: mencuri foto produk orang lain).</li>
            <li>Mengandung unsur penipuan, investasi bodong, atau skema Ponzi.</li>
            <li>Menyinggung Suku, Agama, Ras, dan Antargolongan (SARA).</li>
            <li>Berisi pornografi atau obat-obatan terlarang.</li>
          </ul>
          <p className="mb-6 bg-rose-50 p-3 rounded border border-rose-100 text-rose-800 text-sm">
            Admin berhak menghapus konten yang melanggar aturan ini tanpa pemberitahuan dan memblokir akses pengguna terkait.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Keamanan Akun</h3>
          <p className="mb-6">
            Anda bertanggung jawab menjaga kerahasiaan akses perangkat Anda. Karena saat ini sistem menggunakan penyimpanan lokal (browser), disarankan untuk tidak membersihkan Cache Browser jika tidak ingin data ide Anda hilang di perangkat tersebut (pada versi Beta ini).
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Hak Milik Intelektual</h3>
          <p className="mb-6">
            Seluruh desain, logo, dan kode pemrograman website Pruidea adalah milik pengelola Pruidea. Konten ide dan foto produk tetap menjadi milik masing-masing pengguna (User Generated Content).
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
