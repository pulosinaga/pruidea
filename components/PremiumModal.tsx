
import React, { useState } from 'react';
import { ADMIN_WA_NUMBER } from '../constants';
import { BankInfo } from '../types';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLearnMore: () => void;
  bankInfo?: BankInfo;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onLearnMore, bankInfo }) => {
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [isRevealed, setIsRevealed] = useState(false); // State untuk sensor rekening

  // Fallback safe value (Data Pulo Sinaga)
  const displayBank = bankInfo || { bankName: 'BNI', accountNumber: '1941921593', accountName: 'Pulo Sinaga' };

  if (!isOpen) return null;

  const handleConfirmPayment = () => {
      const message = `Halo Admin Pruidea, saya sudah melakukan transfer sebesar Rp 15.000 ke ${displayBank.bankName} a.n ${displayBank.accountName} untuk pembelian Paket Juragan. Mohon diproses.`;
      window.open(`https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      onClose();
  };

  // Fungsi untuk menyensor nomor rekening
  const maskAccount = (acc: string) => {
      if (isRevealed) return acc;
      return acc.slice(0, 4) + " •••• ••••";
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-md relative transform transition-all"
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

        {step === 'info' ? (
            <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 mb-4 animate-bounce-slow">
                     <span className="text-3xl">👑</span>
                </div>

                <h2 className="text-2xl font-bold text-center text-slate-900">Upgrade ke Paket Juragan</h2>
                <p className="text-center text-slate-600 mt-2 text-sm">
                    Investasi kecil untuk dampak besar. Bikin usahamu terlihat profesional.
                </p>

                <div className="my-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600 font-medium">Harga Langganan</span>
                        <span className="text-xl font-bold text-slate-800 decoration-slate-400">Rp 15.000</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Durasi</span>
                        <span className="text-sm bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-bold">1 Bulan</span>
                    </div>
                </div>

                <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-sm text-slate-700">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Microsite Pribadi (pruidea.com/nama-kamu)
                    </li>
                    <li className="flex items-center text-sm text-slate-700">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Tombol WhatsApp Langsung
                    </li>
                    <li className="flex items-center text-sm text-slate-700">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Badge Centang Biru (Terverifikasi)
                    </li>
                </ul>

                <button 
                    onClick={() => setStep('payment')}
                    className="w-full bg-amber-500 text-white font-bold py-3 px-6 rounded-full hover:bg-amber-600 transition-colors duration-200 shadow-lg hover:shadow-amber-200"
                >
                    Beli Paket Sekarang &rarr;
                </button>
            </>
        ) : (
            <>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Instruksi Pembayaran</h2>
                    <p className="text-sm text-slate-500">Silakan transfer nominal pas ke rekening berikut:</p>
                </div>

                {/* Secure Card Design */}
                <div className="my-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl relative overflow-hidden shadow-inner">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-5 rounded-full blur-xl"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                             <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Bank Transfer</p>
                             <h3 className="text-2xl font-bold tracking-wider text-white">{displayBank.bankName}</h3>
                        </div>
                        <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-white/10">
                            VERIFIED ACC
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-[10px] text-slate-400 mb-1">Nomor Rekening</p>
                        <div className="flex items-center justify-between bg-black/20 p-2 rounded-lg border border-white/5">
                            <p className={`font-mono text-xl ${isRevealed ? 'tracking-normal' : 'tracking-widest'}`}>
                                {maskAccount(displayBank.accountNumber)}
                            </p>
                            
                            <button 
                                onClick={() => setIsRevealed(!isRevealed)}
                                className="ml-2 text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded transition-colors font-bold shadow-sm"
                            >
                                {isRevealed ? 'Tutup' : 'Lihat'}
                            </button>
                        </div>
                        {isRevealed && (
                             <button 
                                onClick={() => navigator.clipboard.writeText(displayBank.accountNumber)}
                                className="text-xs text-emerald-400 mt-2 hover:text-emerald-300 flex items-center gap-1"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                Salin Nomor
                            </button>
                        )}
                    </div>

                    <div>
                        <p className="text-[10px] text-slate-400">Atas Nama (Wajib Sama Persis)</p>
                        <p className="font-medium text-amber-300 text-lg">{displayBank.accountName}</p>
                        <p className="text-[10px] text-slate-500 mt-1 italic">*Rekening Resmi Admin Pruidea</p>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6">
                    <p className="text-xs text-blue-800 text-center">
                        🔒 Data pembayaran Anda aman. Konfirmasi dilakukan manual via WhatsApp Admin untuk verifikasi ganda.
                    </p>
                </div>

                <div className="space-y-3">
                    <button 
                        onClick={handleConfirmPayment}
                        className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-colors duration-200 flex items-center justify-center shadow-lg"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Saya Sudah Transfer
                    </button>
                    <button 
                        onClick={() => setStep('info')}
                        className="w-full text-slate-500 font-bold py-2 text-sm hover:text-slate-800"
                    >
                        Kembali
                    </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default PremiumModal;
