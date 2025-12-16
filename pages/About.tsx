
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Tentang Pruidea</h2>
             <p className="mt-4 text-xl text-slate-500">Mendigitalkan Ekonomi Rakyat Indonesia</p>
          </div>

          <div className="prose prose-lg prose-slate mx-auto text-slate-600">
            <p>
              <strong>Pruidea.com</strong> lahir dari sebuah kegelisahan sederhana. Di Indonesia, ada jutaan pedagang kecil, petani, nelayan, guru honorer, dan pekerja serabutan yang punya potensi luar biasa, tapi tidak terlihat oleh dunia luar karena keterbatasan teknologi.
            </p>
            
            <h3 className="text-slate-900 font-bold mt-8">Siapa yang Kami Bantu?</h3>
            <p>
              Kami tidak fokus pada startup teknologi canggih. Fokus kami adalah:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Ibu Warung Seblak yang ingin masakannya dikenal orang kecamatan sebelah.</li>
                <li>Petani Cabai yang ingin jual panen langsung tanpa dipermainkan tengkulak.</li>
                <li>Guru Les Privat yang ingin dapat murid tambahan.</li>
                <li>Pengrajin Desa yang ingin karyanya dihargai layak.</li>
            </ul>

            <h3 className="text-slate-900 font-bold mt-8">Misi Kami</h3>
            <p>
              Memberikan "Rumah Digital" bagi setiap usaha rakyat. Kami percaya bahwa website bukan hanya milik perusahaan besar. Warung pojok pun berhak punya link sendiri, foto produk yang bagus, dan akses ke pasar yang lebih luas.
            </p>

            <div className="bg-sky-50 p-6 rounded-xl border-l-4 border-sky-600 my-8">
                <p className="font-bold text-sky-900 italic mb-0">
                    "Ide kami sederhana: Mengubah 'Jualan di Depan Rumah' menjadi 'Jualan di Depan Dunia'."
                </p>
            </div>

            <h3 className="text-slate-900 font-bold mt-8">Bagaimana Bisnis Ini Berjalan?</h3>
            <p>
               Kami menerapkan subsidi silang dan ekonomi volume:
            </p>
             <ul className="list-disc pl-5 space-y-2">
                <li><strong>Paket Warga (Gratis):</strong> Agar tidak ada hambatan bagi siapapun untuk memulai.</li>
                <li><strong>Paket Juragan (Murah Meriah):</strong> Biaya bulanan setara sebungkus rokok untuk fitur profesional yang membantu mereka melipatgandakan omzet.</li>
                <li><strong>Jasa Bantuan:</strong> Kami membantu mereka yang gaptek dengan layanan pembuatan konten yang terjangkau.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
