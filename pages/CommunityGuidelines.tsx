
import React from 'react';

const CommunityGuidelines: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-8">Pedoman Komunitas</h1>
        <p className="text-lg text-slate-600 mb-8">
            Agar Pruidea tetap menjadi tempat yang aman dan nyaman bagi seluruh rakyat Indonesia untuk berkarya, harap patuhi aturan main berikut.
        </p>

        <div className="space-y-8">
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">✅ Yang Boleh Dilakukan</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li>Mempromosikan usaha halal, jasa keahlian, atau hobi positif.</li>
                    <li>Memberikan komentar yang membangun dan menyemangati.</li>
                    <li>Mengajak kolaborasi atau kerjasama bisnis yang transparan.</li>
                    <li>Menggunakan bahasa yang sopan dan santun.</li>
                </ul>
            </div>

            <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                <h3 className="text-xl font-bold text-rose-800 mb-2">❌ Yang DILARANG Keras</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>Konten Ilegal:</strong> Narkoba, senjata tajam, obat terlarang tanpa izin.</li>
                    <li><strong>Perjudian:</strong> Segala bentuk promosi judi online atau skema uang cepat (Money Game).</li>
                    <li><strong>Penipuan:</strong> Investasi bodong atau meminta sumbangan fiktif.</li>
                    <li><strong>SARA & Kebencian:</strong> Menghina suku, agama, ras, atau golongan tertentu.</li>
                    <li><strong>Spam:</strong> Mengirimkan iklan yang sama berulang-ulang di kolom komentar.</li>
                </ul>
            </div>
        </div>

        <p className="mt-8 text-slate-500 text-sm text-center">
            Pelanggaran terhadap pedoman ini akan mengakibatkan penghapusan konten dan pemblokiran akses permanen.
        </p>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
