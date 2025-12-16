
import React from 'react';
import { Page } from '../types';
import Logo from './Logo';

interface FooterProps {
    setActivePage?: (page: Page) => void;
    onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage, onAdminClick }) => {
  const handleNav = (page: Page, e: React.MouseEvent) => {
      e.preventDefault();
      if (setActivePage) {
          setActivePage(page);
          window.scrollTo(0, 0);
      }
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <div className="mb-8 flex flex-col items-center">
            <Logo size="md" />
            <p className="text-sm mt-3 max-w-xs mx-auto text-slate-400">
                Menghubungkan Ide Rakyat dengan Peluang Global. Dari Desa untuk Indonesia.
            </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left max-w-4xl mx-auto border-t border-slate-100 pt-8">
            <div>
                <h4 className="font-bold text-slate-900 mb-4">Perusahaan</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={(e) => handleNav(Page.About, e)} className="hover:text-sky-600 transition-colors">Tentang Kami</button></li>
                    <li><button onClick={(e) => handleNav(Page.Success, e)} className="hover:text-sky-600 transition-colors">Kisah Sukses</button></li>
                    <li><button onClick={(e) => handleNav(Page.Contact, e)} className="hover:text-sky-600 transition-colors">Hubungi Kami</button></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-slate-900 mb-4">Layanan</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={(e) => handleNav(Page.Showcase, e)} className="hover:text-sky-600 transition-colors">Etalase Ide</button></li>
                    <li><button onClick={(e) => handleNav(Page.MicrositeBuilder, e)} className="hover:text-sky-600 transition-colors">Buat Microsite</button></li>
                    <li><button onClick={(e) => handleNav(Page.Premium, e)} className="hover:text-sky-600 transition-colors">Paket Premium</button></li>
                    <li><button onClick={(e) => handleNav(Page.Advertise, e)} className="hover:text-sky-600 transition-colors text-amber-600 font-semibold">Pasang Iklan</button></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-slate-900 mb-4">Bantuan</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={(e) => handleNav(Page.FAQ, e)} className="hover:text-sky-600 transition-colors">FAQ</button></li>
                    <li><button onClick={(e) => handleNav(Page.HelpCenter, e)} className="hover:text-sky-600 transition-colors">Pusat Bantuan</button></li>
                    <li><button onClick={(e) => handleNav(Page.Guidelines, e)} className="hover:text-sky-600 transition-colors">Pedoman Komunitas</button></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={(e) => handleNav(Page.Privacy, e)} className="hover:text-sky-600 transition-colors">Kebijakan Privasi</button></li>
                    <li><button onClick={(e) => handleNav(Page.Terms, e)} className="hover:text-sky-600 transition-colors">Syarat & Ketentuan</button></li>
                </ul>
            </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Pruidea.com. All rights reserved.</p>
            <p className="text-xs mt-2 text-slate-400">Platform Etalase Digital Kebanggaan Indonesia.</p>
            
            {/* Tombol Admin yang JELAS dan MUDAH DIKLIK */}
            <button 
                onClick={(e) => { e.preventDefault(); onAdminClick && onAdminClick(); }}
                className="mt-6 text-xs font-bold text-slate-400 hover:text-sky-600 border-b border-dashed border-slate-300 hover:border-sky-600 pb-0.5 transition-all"
            >
                🔐 Admin Login (Khusus Staff)
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
