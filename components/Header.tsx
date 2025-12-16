
import React, { useState } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  onLoginClick: () => void;
  onAdminClick?: () => void;
  isUserLoggedIn?: boolean; // New prop
  onLogout?: () => void; // New prop
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage, onLoginClick, onAdminClick, isUserLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => handleNavClick(Page.Home)}
          >
            <Logo size="md" />
            <p className="text-[10px] text-slate-500 font-medium tracking-wide ml-1">Etalase Ide Digital Indonesia</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:space-x-8 mr-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-sm font-bold transition-all duration-200 border-b-2 ${
                    activePage === link.page
                      ? 'text-sky-600 border-sky-600'
                      : 'text-slate-500 border-transparent hover:text-sky-500 hover:border-sky-200'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Admin Button */}
            <button 
                onClick={onAdminClick}
                className="relative z-50 p-2 text-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors border border-amber-100 shadow-sm cursor-pointer"
                title="Area Admin (Klik untuk Masuk)"
                aria-label="Admin Login"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </button>

            <div className="hidden md:flex items-center ml-2">
                {isUserLoggedIn ? (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-sky-50 pl-3 pr-1 py-1 rounded-full border border-sky-100">
                            <span className="text-sm font-bold text-sky-700">Halo, Pulo</span>
                            <div className="h-8 w-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                PS
                            </div>
                        </div>
                        <button 
                            onClick={onLogout}
                            className="text-xs text-rose-500 font-medium hover:underline ml-1"
                        >
                            Keluar
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onLoginClick}
                        className="bg-sky-50 text-sky-700 text-sm font-bold py-2.5 px-6 rounded-full hover:bg-sky-100 transition-colors duration-200 border border-sky-100 shadow-sm"
                    >
                        Login / Daftar
                    </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-sky-600 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full text-left block px-3 py-3 rounded-md text-base font-bold ${
                  activePage === link.page
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="border-t border-slate-100 my-2"></div>
            
             {isUserLoggedIn ? (
                 <button
                    onClick={() => { onLogout && onLogout(); setIsMenuOpen(false); }}
                    className="w-full text-left block px-3 py-3 rounded-md text-base font-bold text-rose-500 hover:bg-rose-50"
                  >
                    Keluar (Pulo)
                  </button>
             ) : (
                 <button
                    onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                    className="w-full text-left block px-3 py-3 rounded-md text-base font-bold text-sky-600 hover:bg-sky-50"
                  >
                    Login / Daftar
                  </button>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
