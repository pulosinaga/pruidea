
import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void; // New prop for demo
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // DEMO CREDENTIALS
    if (email === 'pulo@gmail.com' && password === '123456') {
        if (onLoginSuccess) {
            onLoginSuccess();
            setEmail('');
            setPassword('');
        }
    } else {
        alert('Ini hanya simulasi.\n\nUntuk mencoba fitur login, gunakan akun Demo:\nEmail: pulo@gmail.com\nPass: 123456');
    }
  };

  const inputClass = "mt-1 block w-full px-4 py-3 bg-sky-50 border border-sky-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-colors placeholder-slate-400";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-sm relative transform transition-all border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Tutup"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Login / Daftar</h2>
        <p className="text-sm text-slate-500 mb-6">Masuk untuk mengelola ide Anda.</p>
        
        <div className="bg-amber-50 text-amber-800 text-xs p-2 rounded mb-4 border border-amber-200">
            <strong>INFO DEMO:</strong><br/>
            Gunakan email: <b>pulo@gmail.com</b><br/>
            Password: <b>123456</b>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700">Email</label>
            <input 
                type="email" 
                id="login-email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="pulo@gmail.com" 
                required 
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">Password</label>
            <input 
                type="password" 
                id="login-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••" 
                required 
            />
          </div>
          <div className="pt-4 text-center">
            <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-full hover:bg-sky-700 transition-colors duration-200 shadow-md">
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
