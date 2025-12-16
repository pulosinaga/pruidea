
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  // Ukuran responsif
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Ikon Bola Lampu dengan Daun */}
      <div className={`relative flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 p-1`}>
        <svg 
            className={`${sizeClasses[size]} text-amber-500`} 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            stroke="currentColor" 
            strokeWidth="1.5"
        >
            {/* Bagian Bola Lampu */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        
        {/* Aksen Daun Kecil di dalam/depan lampu (Simbol Pertumbuhan/Desa) */}
        <svg 
            className={`absolute bottom-1 right-1 w-[40%] h-[40%] text-emerald-500`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
        >
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Teks Logo */}
      <div className={`font-extrabold tracking-tight text-slate-800 ${textSizeClasses[size]}`}>
        Pru<span className="text-sky-600">idea</span>
      </div>
    </div>
  );
};

export default Logo;
