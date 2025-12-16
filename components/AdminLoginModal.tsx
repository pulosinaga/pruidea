
import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PIN HARDCODED: pruidea2024
    if (pin === 'pruidea2024') {
        onSuccess();
        setPin('');
        setError('');
        onClose();
    } else {
        setError('PIN Salah! Akses ditolak.');
        setPin('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
        <div className="bg-slate-800 p-6 text-center relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-amber-500">
                <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white">Admin Area</h3>
            <p className="text-slate-400 text-xs mt-1">Hanya untuk Staff & Pemilik</p>
        </div>
        
        <div className="p-8">
            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-slate-700 mb-2">Masukkan PIN Keamanan</label>
                <input 
                    type="password" 
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setError(''); }}
                    className="w-full text-center text-2xl tracking-widest px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-slate-300"
                    placeholder="••••"
                    autoFocus
                />
                
                {error && (
                    <div className="mt-3 text-center text-rose-600 text-sm font-bold bg-rose-50 p-2 rounded animate-pulse">
                        ⚠️ {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    className="w-full mt-6 bg-slate-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                >
                    Buka Gembok
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
