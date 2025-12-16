import React, { useState, useEffect } from 'react';
import { IdeaCategory, Idea } from '../types';
import IdeaCard from './IdeaCard';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Idea>) => void;
  onNIBHelp?: () => void;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose, onSubmit, onNIBHelp }) => {
  const [formData, setFormData] = useState({
      name: '',
      title: '',
      description: '',
      fullDescription: '',
      category: IdeaCategory.Teknologi,
      location: '',
      whatsapp: '',
      socialMedia: '', 
      nibNumber: '', 
      lookingFor: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);

  // Initialize previewIdea with safe default values
  const [previewIdea, setPreviewIdea] = useState<Idea>({
      id: 0,
      title: 'Judul Ide / Startup Anda',
      author: 'Nama Founder / Brand',
      category: IdeaCategory.Teknologi,
      description: 'Deskripsi singkat yang menarik akan muncul di sini...',
      fullDescription: '',
      imageUrl: 'https://picsum.photos/seed/preview/800/600',
      isPopular: false,
      isVerified: false,
      isPinned: false,
      location: 'Indonesia',
      tier: 'Warga',
      lookingFor: [],
      whatsappNumber: '',
      viewCount: 0,
      likes: 0,
      comments: []
  });

  // Update preview object safely when form changes
  useEffect(() => {
      setPreviewIdea(prev => ({
          ...prev,
          title: formData.title || 'Judul Ide / Startup Anda',
          author: formData.name || 'Nama Founder / Brand',
          category: formData.category as IdeaCategory,
          description: formData.description || 'Deskripsi singkat yang menarik akan muncul di sini...',
          imageUrl: previewUrl || 'https://picsum.photos/seed/preview/800/600',
          location: formData.location || 'Indonesia',
          lookingFor: formData.lookingFor ? formData.lookingFor.split(',').map(s => s.trim()).filter(s => s.length > 0).slice(0, 3) : [],
          whatsappNumber: formData.whatsapp,
          nibNumber: formData.nibNumber
      }));
  }, [formData, previewUrl]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          
          // Size Validation (Max 2MB to keep LocalStorage healthy)
          if (file.size > 2 * 1024 * 1024) {
              alert("Ukuran foto terlalu besar! Maksimal 2MB agar website tetap cepat.");
              e.target.value = ""; // Reset input
              return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
              // Store as Base64 string so it persists
              setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAgreed) {
        alert("Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan.");
        return;
    }

    if (!formData.title || !formData.name || !formData.whatsapp) {
        alert("Mohon lengkapi judul, nama, dan nomor WhatsApp.");
        return;
    }

    const submissionData: Partial<Idea> = {
        title: formData.title,
        author: formData.name,
        description: formData.description,
        fullDescription: `<p>${(formData.fullDescription || '').replace(/\n/g, '<br/>')}</p>`,
        category: formData.category as IdeaCategory,
        location: formData.location || 'Indonesia',
        whatsappNumber: formData.whatsapp.replace(/^0/, '62'),
        socialMedia: formData.socialMedia,
        nibNumber: formData.nibNumber,
        lookingFor: formData.lookingFor ? formData.lookingFor.split(',').map(s => s.trim()) : ['Pelanggan'],
        imageUrl: previewUrl || 'https://picsum.photos/seed/biz/800/600', 
        isVerified: false 
    };

    onSubmit(submissionData);
    
    // Reset form
    setFormData({
        name: '',
        title: '',
        description: '',
        fullDescription: '',
        category: IdeaCategory.Teknologi,
        location: '',
        whatsapp: '',
        socialMedia: '',
        nibNumber: '',
        lookingFor: ''
    });
    setPreviewUrl(null);
    setIsAgreed(false);
  };

  const inputClass = "w-full px-4 py-2.5 bg-sky-50 border border-sky-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-colors placeholder-slate-400 text-sm";
  const labelClass = "block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide";

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER MOBILE ONLY */}
        <div className="md:hidden bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center z-10">
            <h2 className="text-lg font-bold text-slate-900">Buat Halaman Baru</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">✕</button>
        </div>

        {/* LEFT SIDE: FORM INPUT */}
        <div className="w-full md:w-3/5 overflow-y-auto p-6 md:p-8 bg-white h-full scrollbar-thin scrollbar-thumb-slate-300">
            <div className="hidden md:flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Publikasikan Ide / Karya</h2>
                    <p className="text-slate-500 text-sm">Apapun idemu, buat halaman profilnya sekarang.</p>
                </div>
                <button onClick={onClose} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Image Upload */}
                <div className="bg-sky-50 border-2 border-dashed border-sky-200 rounded-xl p-4 text-center hover:bg-sky-100 transition-colors relative cursor-pointer group">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {previewUrl ? (
                         <div className="flex items-center justify-center gap-3">
                            <img src={previewUrl} alt="Preview" className="h-16 w-16 object-cover rounded-lg shadow-sm" />
                            <div className="text-left">
                                <p className="text-sky-700 font-bold text-sm">Foto Berhasil Dipilih</p>
                                <p className="text-sky-500 text-xs">Klik untuk mengganti</p>
                            </div>
                         </div>
                    ) : (
                        <div>
                            <div className="mx-auto h-10 w-10 text-sky-400 mb-1 group-hover:scale-110 transition-transform">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <p className="text-sm font-bold text-sky-700">Upload Foto Utama / Logo (Wajib)</p>
                            <p className="text-xs text-sky-500">Mendukung JPG, PNG (Max 2MB)</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className={labelClass}>Judul Ide / Nama Bisnis</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className={inputClass} placeholder="Cth: AgriTech Indonesia, Jasa Desain Grafis" required />
                    </div>
                    <div>
                        <label className={labelClass}>Founder / Pemilik Brand</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} placeholder="Cth: Budi Santoso, Tim Alpha" required />
                    </div>
                    <div>
                        <label className={labelClass}>Kategori</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className={inputClass}>
                            {Object.values(IdeaCategory).filter(c => c !== 'Semua Kategori').map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Lokasi (Kota/Kab)</label>
                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} className={inputClass} placeholder="Cth: Jakarta Selatan" />
                    </div>
                    <div>
                        <label className={labelClass}>Nomor WhatsApp (Aktif)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-slate-500 text-sm font-bold">+62</span>
                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className={`${inputClass} pl-12`} placeholder="8123xxxxxxx" required />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Link Sosmed / Portfolio</label>
                        <input type="text" name="socialMedia" value={formData.socialMedia} onChange={handleInputChange} className={inputClass} placeholder="Cth: instagram.com/mybrand" />
                    </div>
                    <div>
                         <div className="flex justify-between items-center mb-1">
                             <label className={labelClass}>Nomor Induk Berusaha (NIB)</label>
                             {onNIBHelp && (
                                 <button type="button" onClick={onNIBHelp} className="text-[10px] text-sky-600 font-bold hover:underline">
                                     Belum punya? Buat di sini &rarr;
                                 </button>
                             )}
                         </div>
                         <input type="text" name="nibNumber" value={formData.nibNumber} onChange={handleInputChange} className={inputClass} placeholder="Nomor NIB (Opsional)" />
                    </div>
                     <div>
                         <label className={labelClass}>Apa yang Anda Cari? (Pisahkan koma)</label>
                         <input type="text" name="lookingFor" value={formData.lookingFor} onChange={handleInputChange} className={inputClass} placeholder="Cth: Investor, Co-Founder, Klien, Reseller" />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Deskripsi Singkat (Pitching)</label>
                    <textarea name="description" rows={2} value={formData.description} onChange={handleInputChange} className={inputClass} placeholder="Jelaskan ide Anda dalam 1 kalimat yang menarik..." maxLength={140} required></textarea>
                </div>
                
                <div>
                    <label className={labelClass}>Cerita Lengkap & Value Proposition</label>
                    <textarea name="fullDescription" rows={4} value={formData.fullDescription} onChange={handleInputChange} className={inputClass} placeholder="Ceritakan latar belakang, solusi yang ditawarkan, dan keunggulan ide Anda."></textarea>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-6">
                     <div className="flex items-start mb-4">
                        <input id="terms" type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} className="mt-1 h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 cursor-pointer" />
                        <label htmlFor="terms" className="ml-2 block text-xs text-slate-600 cursor-pointer">
                            Saya menjamin konten ini tidak melanggar hukum dan setuju dengan <span className="text-sky-600 underline">Syarat & Ketentuan</span>.
                        </label>
                    </div>
                    
                    <button type="submit" disabled={!isAgreed} className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center ${isAgreed ? 'bg-sky-600 text-white hover:bg-sky-700 hover:-translate-y-1' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                        {isAgreed ? '🚀 Terbitkan Sekarang' : 'Lengkapi & Centang Dulu'}
                    </button>
                </div>
            </form>
        </div>

        {/* RIGHT SIDE: LIVE PREVIEW (Desktop Only) */}
        <div className="hidden md:flex w-2/5 bg-slate-100 border-l border-slate-200 flex-col items-center justify-center p-8 relative">
            <div className="absolute top-6 left-0 w-full text-center">
                <span className="bg-white border border-slate-200 text-slate-500 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider flex items-center justify-center w-max mx-auto gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    Live Preview
                </span>
            </div>
            
            <div className="w-full max-w-sm transform scale-100 transition-all duration-300">
                <div className="pointer-events-none select-none ring-4 ring-slate-200/50 rounded-xl">
                     {/* Pass dummy handlers because it's just a preview */}
                    <IdeaCard 
                        idea={previewIdea} 
                        onUpgradeClick={() => {}}
                        onClick={() => {}}
                    />
                </div>
                <div className="mt-8 text-center text-slate-400 text-xs">
                    <p>Tampilan kartu ini akan muncul di Halaman Depan.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;