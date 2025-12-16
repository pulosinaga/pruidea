import React from 'react';
import { Page } from '../types';

interface MicrositeDemoProps {
  setActivePage: (page: Page) => void;
}


const MicrositeDemo: React.FC<MicrositeDemoProps> = ({ setActivePage }) => {
  return (
    <div className="font-sans">
        <header className="relative h-64 sm:h-80 w-full">
            <img src="https://picsum.photos/seed/kopi_rosa/1200/800" alt="Kopi Kampung Rosa" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white p-4">
                    <span className="text-sm font-semibold bg-green-500 px-3 py-1 rounded-full">Usaha Desa</span>
                    <h1 className="text-4xl md:text-6xl font-extrabold mt-4 tracking-tight">Kopi Kampung Rosa</h1>
                    <p className="text-lg mt-2">Aroma Khas Desa Salak, Langsung dari Petaninya.</p>
                </div>
            </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <section id="about">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Cerita Kami</h2>
                    <p className="text-slate-600 leading-relaxed">
                        Berawal dari kecintaan pada kopi lokal Desa Salak, Kopi Kampung Rosa lahir. Kami adalah usaha kecil yang berkomitmen untuk mengangkat kualitas biji kopi dari petani-petani di sekitar kami. Setiap biji kopi diproses dengan metode tradisional yang terjaga turun-temurun, menghasilkan cita rasa yang otentik dan tak terlupakan. Ide ini pertama kali kami pamerkan di Pruidea.com dan mendapat sambutan luar biasa.
                    </p>
                </section>

                <section id="gallery" className="mt-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Galeri</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <img src="https://picsum.photos/seed/kopi_gallery1/300/300" alt="Biji Kopi" className="rounded-lg shadow-md aspect-square object-cover" />
                        <img src="https://picsum.photos/seed/kopi_gallery2/300/300" alt="Proses Roasting" className="rounded-lg shadow-md aspect-square object-cover" />
                        <img src="https://picsum.photos/seed/kopi_gallery3/300/300" alt="Kemasan Produk" className="rounded-lg shadow-md aspect-square object-cover" />
                    </div>
                </section>

                 <section id="contact" className="mt-12 text-center bg-slate-100 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Tertarik? Hubungi Kami!</h2>
                    <p className="text-slate-600 mb-6">Kami menerima pesanan online dan siap mengirim ke seluruh Indonesia.</p>
                    <a href="#" className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-colors">
                        Pesan via WhatsApp
                    </a>
                </section>
                
                 <div className="mt-12 text-center">
                     <button onClick={() => setActivePage(Page.MicrositeBuilder)} className="text-sm text-sky-600 hover:underline">
                        &larr; Kembali ke Penjelasan Microsite
                     </button>
                 </div>
            </div>
        </main>
    </div>
  );
};

export default MicrositeDemo;
