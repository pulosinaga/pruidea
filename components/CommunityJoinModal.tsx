import React from 'react';

interface CommunityJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommunityJoinModal: React.FC<CommunityJoinModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terima kasih atas minat Anda! Kami akan menghubungi Anda saat fitur komunitas sudah siap.');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg relative transform transition-all"
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

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Gabung Komunitas Pruidea</h2>
        <p className="text-sm text-slate-500 mb-6">Jadilah bagian dari gerakan inovasi Indonesia.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="join-name" className="block text-sm font-medium text-slate-700">Nama</label>
            <input type="text" id="join-name" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="Nama Lengkap Anda" required />
          </div>
          <div>
            <label htmlFor="join-email" className="block text-sm font-medium text-slate-700">Email</label>
            <input type="email" id="join-email" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="anda@email.com" required />
          </div>
          <div>
            <label htmlFor="join-interest" className="block text-sm font-medium text-slate-700">Minat Anda</label>
            <input type="text" id="join-interest" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="Contoh: Teknologi, Pemasaran, Desain" required />
          </div>
          <div className="pt-4 text-center">
            <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-full hover:bg-sky-700 transition-colors duration-200">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityJoinModal;
