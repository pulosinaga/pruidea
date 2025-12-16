
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-8">Kebijakan Privasi</h1>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="mb-4 text-sm text-slate-500 bg-sky-50 p-3 rounded-lg border border-sky-100">
            <strong>Ringkasan Singkat:</strong> Pruidea adalah platform publik. Informasi usaha yang Anda kirimkan (Nama Usaha, Deskripsi, No WA Bisnis) dimaksudkan untuk dilihat oleh umum. Kami tidak menjual data pribadi Anda secara diam-diam.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Informasi yang Kami Kumpulkan</h3>
          <p className="mb-4">
            Untuk menjalankan layanan Microsite dan Direktori Bisnis, kami mengumpulkan:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li><strong>Data Profil Usaha:</strong> Judul ide, deskripsi, lokasi, dan kategori.</li>
            <li><strong>Data Kontak Publik:</strong> Nomor WhatsApp dan akun Media Sosial yang Anda izinkan untuk ditampilkan agar calon mitra bisa menghubungi Anda.</li>
            <li><strong>Konten Forum:</strong> Pertanyaan atau jawaban yang Anda tulis di Forum Warga.</li>
            <li><strong>Data Teknis:</strong> Alamat IP dan jenis perangkat untuk keperluan keamanan dan statistik pengunjung.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Bagaimana Kami Menggunakan Data Anda</h3>
          <p className="mb-4">
            Data Anda digunakan sepenuhnya untuk tujuan operasional platform:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Menampilkan profil usaha Anda di Etalase dan mesin pencari (Google).</li>
            <li>Menghubungkan Anda dengan pengunjung melalui tombol WhatsApp.</li>
            <li>Memverifikasi keaslian akun (untuk fitur Centang Biru).</li>
            <li>Mencegah aktivitas penipuan atau spam di platform.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Transaksi & Keuangan</h3>
          <p className="mb-6">
            Pruidea.com <strong>TIDAK</strong> menyimpan data kartu kredit atau rekening bank Anda, karena kami tidak memproses transaksi pembayaran atau donasi secara langsung di dalam website. Segala transaksi jual-beli terjadi secara langsung (Direct Deal) antara Anda dan mitra Anda melalui jalur pribadi (WhatsApp/Offline).
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Keterbukaan Data (Public Domain)</h3>
          <p className="mb-6">
            Harap dipahami bahwa setiap Ide, Komentar, atau Topik Forum yang Anda terbitkan bersifat <strong>PUBLIK</strong>. Artinya, siapa saja di internet dapat melihat dan membagikan informasi tersebut. Jangan membagikan informasi yang sifatnya sangat rahasia atau sensitif.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Perubahan Kebijakan</h3>
          <p className="mb-6">
            Kami dapat memperbarui kebijakan ini sewaktu-waktu seiring perkembangan fitur website. Kami menyarankan Anda untuk memeriksa halaman ini secara berkala.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
