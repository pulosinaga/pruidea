import React from 'react';

const Step: React.FC<{ icon: React.ReactElement; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white">
                {icon}
            </div>
        </div>
        <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-slate-900">{title}</h3>
            <p className="mt-2 text-base text-slate-600">{children}</p>
        </div>
    </div>
);


const SubmissionGuide: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Panduan Kirim Ide</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Hanya butuh beberapa langkah mudah untuk memajang idemu di etalase digital kami.
          </p>
        </div>

        <div className="mt-12">
            <div className="max-w-3xl mx-auto space-y-10">
                <Step 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                    title="1. Siapkan Cerita Idemu"
                >
                    Jelaskan secara singkat nama, tujuan, dan manfaat dari idemu. Apa yang membuatnya istimewa dan siapa yang akan terbantu?
                </Step>
                 <Step 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                    title="2. Sertakan Gambar Ilustrasi"
                >
                    Sebuah gambar bisa bercerita banyak. Siapkan foto produk, sketsa, atau ilustrasi sederhana yang paling mewakili ide Anda.
                </Step>
                 <Step 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                    title="3. Kirim dan Tunggu Kabar Baik"
                >
                    Gunakan formulir di halaman Kontak untuk mengirimkan idemu. Tim Pruidea akan meninjaunya dan menghubungimu jika idemu terpilih untuk tampil!
                </Step>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionGuide;
