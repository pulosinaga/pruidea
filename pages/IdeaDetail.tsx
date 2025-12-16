
import React, { useState } from 'react';
import { Idea } from '../types';
import AdSpot from '../components/AdSpot';
import SEO from '../components/SEO';

interface IdeaDetailProps {
  idea: Idea;
  onBack: () => void;
  onSupport: () => void;
  onLike: () => void;
  onComment: (text: string, user: string) => void;
}

const IdeaDetail: React.FC<IdeaDetailProps> = ({ idea, onBack, onSupport, onLike, onComment }) => {
  const [activeTab, setActiveTab] = useState<'cerita' | 'diskusi'>('cerita');
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [copied, setCopied] = useState(false);

  // Jika idea null/undefined (edge case), tampilkan error atau return null
  if (!idea) return null;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": idea.title,
    "image": idea.imageUrl,
    "description": idea.description,
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "ID",
        "addressLocality": idea.location
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8", 
        "reviewCount": (idea.likes + (idea.comments?.length || 0)).toString()
    },
    "priceRange": "$",
    "telephone": idea.whatsappNumber || ""
  };

  const handleWhatsapp = () => {
      if (idea.whatsappNumber) {
          window.open(`https://wa.me/${idea.whatsappNumber}?text=Halo, saya melihat ide "${idea.title}" di Pruidea.com dan tertarik untuk berdiskusi.`, '_blank');
      } else {
          alert('Nomor WhatsApp belum tersedia untuk ide ini. Silakan gunakan fitur pesan komunitas.');
      }
  };

  // --- SOCIAL SHARE HANDLERS ---
  const shareUrl = window.location.href;
  const shareText = `Cek ide keren ini: "${idea.title}" di Pruidea.com!`;

  const shareToWA = () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const shareToFB = () => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=Pruidea,IdeBisnis,UMKM`, '_blank');
  };

  const shareToLinkedIn = () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  const submitComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!commentText.trim()) return;
      onComment(commentText, userName || 'Pengunjung');
      setCommentText('');
      setUserName('');
  };

  const reportScam = () => {
      const reason = prompt("Apa alasan Anda melaporkan ide ini? (Misal: Penipuan, Konten Ilegal)");
      if (reason) {
        alert("Laporan diterima. Tim keamanan Pruidea akan segera meninjau ide ini. Terima kasih telah menjaga komunitas kita.");
      }
  }

  const reportComment = () => {
      alert("Terima kasih. Laporan Anda telah kami terima dan akan ditinjau oleh tim moderator Pruidea.");
  }

  const inputClass = "w-full px-4 py-3 bg-sky-50 border border-sky-200 rounded-lg focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-colors placeholder-slate-400";

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <SEO 
        title={idea.title} 
        description={`Cek ide bisnis ${idea.title} oleh ${idea.author} di Pruidea.com. ${idea.description}`} 
        image={idea.imageUrl}
        schema={businessSchema}
      />

      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
             <div className="flex items-center text-xs text-slate-500">
                 <button onClick={onBack} className="hover:text-sky-600">Home</button>
                 <span className="mx-2">/</span>
                 <button onClick={onBack} className="hover:text-sky-600">Etalase Ide</button>
                 <span className="mx-2">/</span>
                 <span className="text-slate-800 font-medium truncate max-w-[200px]">{idea.title}</span>
             </div>
        </div>
      </div>

      <div className="relative h-64 md:h-96 w-full">
        <img src={idea.imageUrl} alt={idea.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {idea.category}
                    </span>
                    {idea.isPopular && (
                        <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            🔥 Trending
                        </span>
                    )}
                    {idea.isVerified ? (
                        <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                            Terverifikasi
                        </span>
                    ) : (
                        <span className="bg-slate-500/80 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                            Belum Diverifikasi
                        </span>
                    )}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-sm">{idea.title}</h1>
                <div className="flex items-center text-white/90 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {idea.location}
                </div>
                <div className="mt-4 flex items-center space-x-4">
                     <button 
                        onClick={onLike}
                        className="flex items-center space-x-2 bg-rose-600 text-white px-5 py-2 rounded-full font-bold hover:bg-rose-700 transition active:scale-95 shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <span>Dukung ({idea.likes})</span>
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
                    <div className="flex border-b border-slate-200">
                        <button 
                            onClick={() => setActiveTab('cerita')}
                            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === 'cerita' ? 'text-sky-600 border-b-2 border-sky-600 bg-sky-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            Tentang Ide
                        </button>
                        <button 
                            onClick={() => setActiveTab('diskusi')}
                            className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === 'diskusi' ? 'text-sky-600 border-b-2 border-sky-600 bg-sky-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        >
                            Diskusi ({idea.comments?.length || 0})
                        </button>
                    </div>
                    
                    <div className="p-6 md:p-8">
                        {activeTab === 'cerita' ? (
                            <div className="animate-fade-in">
                                <div className="flex items-center mb-6 pb-6 border-b border-slate-100">
                                    <img src={idea.authorAvatar || `https://ui-avatars.com/api/?name=${idea.author}`} alt={idea.author} className="w-14 h-14 rounded-full mr-4 border-2 border-slate-200" />
                                    <div>
                                        <div className="flex items-center">
                                            <p className="font-bold text-slate-900 text-lg mr-2">{idea.author}</p>
                                            {idea.isVerified && <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20" title="Terverifikasi"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>}
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pemilik Ide</p>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="flex items-center text-slate-500 text-sm">
                                            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            {idea.viewCount}x dilihat
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: idea.fullDescription }} />
                                
                                {/* Social Media & NIB Section */}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {idea.socialMedia && (
                                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center">
                                            <div className="flex-shrink-0 bg-white p-2 rounded-full border border-slate-200 text-xl mr-3">🌐</div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase">Jejak Digital</p>
                                                <p className="text-sm font-medium text-slate-900 truncate">Cek: <a href={`https://${idea.socialMedia}`} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">{idea.socialMedia}</a></p>
                                            </div>
                                        </div>
                                    )}
                                    {idea.nibNumber && (
                                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center">
                                            <div className="flex-shrink-0 bg-white p-2 rounded-full border border-emerald-200 text-xl mr-3">🏛️</div>
                                            <div>
                                                <p className="text-xs font-bold text-emerald-600 uppercase">Legalitas Resmi (OSS)</p>
                                                <p className="text-sm font-bold text-slate-900 truncate">NIB: {idea.nibNumber}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {idea.galleryUrls && idea.galleryUrls.length > 0 && (
                                    <div className="mt-10 pt-8 border-t border-slate-100">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            Galeri Foto
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {idea.galleryUrls.map((url, idx) => (
                                                <img key={idx} src={url} alt={`Gallery ${idx}`} className="rounded-lg shadow-sm w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="mb-8 bg-sky-50 p-4 rounded-lg border border-sky-100">
                                    <p className="text-sm text-sky-800 font-medium">💡 Info:</p>
                                    <p className="text-sm text-sky-700">Komentar yang aktif membantu ide ini tampil lebih sering di pencarian Google!</p>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Tulis Komentar</h3>
                                    <form onSubmit={submitComment} className="space-y-4">
                                        <input 
                                            type="text" 
                                            placeholder="Nama Anda (Opsional)" 
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            className={inputClass}
                                        />
                                        <textarea 
                                            rows={3}
                                            placeholder="Tulis pesan semangat, pertanyaan, atau tawaran kerjasama..." 
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                            className={inputClass}
                                            required
                                        ></textarea>
                                        <button type="submit" className="bg-sky-600 text-white font-bold py-2 px-6 rounded-full hover:bg-sky-700 transition-colors">
                                            Kirim Komentar
                                        </button>
                                    </form>
                                </div>

                                <div className="space-y-6">
                                    {idea.comments && idea.comments.length > 0 ? (
                                        idea.comments.map((comment) => (
                                            <div key={comment.id} className="flex space-x-4 p-4 bg-slate-50 rounded-xl relative group">
                                                <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                                                <div className="flex-grow">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <h4 className="font-bold text-slate-900">{comment.user}</h4>
                                                            <span className="text-xs text-slate-400">• {comment.date}</span>
                                                        </div>
                                                        <button 
                                                            onClick={reportComment}
                                                            className="text-xs text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            title="Laporkan Komentar Ini"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                        </button>
                                                    </div>
                                                    <p className="text-slate-700 mt-1">{comment.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-slate-500">
                                            Belum ada komentar. Jadilah yang pertama!
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
                
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 z-20">
                     <h3 className="text-lg font-bold text-slate-900 mb-4">Bagikan ke Media Sosial</h3>
                     <p className="text-xs text-slate-500 mb-4">Bantu ide ini viral agar dilirik investor atau pembeli.</p>
                     
                     <div className="grid grid-cols-2 gap-3 mb-4">
                        <button onClick={shareToWA} className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold text-sm transition-colors">
                            <span className="mr-1">WhatsApp</span>
                        </button>
                        <button onClick={shareToFB} className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-sm transition-colors">
                            <span className="mr-1">Facebook</span>
                        </button>
                        <button onClick={shareToTwitter} className="flex items-center justify-center bg-black hover:bg-gray-800 text-white py-2 rounded-lg font-bold text-sm transition-colors">
                            <span className="mr-1">X (Twitter)</span>
                        </button>
                         <button onClick={shareToLinkedIn} className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-bold text-sm transition-colors">
                            <span className="mr-1">LinkedIn</span>
                        </button>
                     </div>
                     <button onClick={copyLink} className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-bold text-sm transition-colors relative">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        {copied ? 'Link Disalin!' : 'Salin Link Permanen'}
                     </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sticky top-24 z-20">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-emerald-500 pl-3">Hubungi Pemilik Ide</h3>
                    
                    {!idea.isVerified && (
                         <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg mb-4 border border-amber-200">
                            <strong>⚠️ Peringatan Keamanan:</strong><br/>
                            Akun ini belum diverifikasi oleh admin. Berhati-hatilah sebelum melakukan transfer uang.
                        </div>
                    )}
                    
                    <div className="mb-6">
                        <p className="text-sm text-slate-500 mb-2">Ide ini sedang mencari:</p>
                        <div className="flex flex-wrap gap-2">
                             {idea.lookingFor && idea.lookingFor.length > 0 ? (
                                idea.lookingFor.map((item, idx) => (
                                    <span key={idx} className="bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full border border-emerald-100">
                                        {item}
                                    </span>
                                ))
                             ) : (
                                <span className="text-xs text-slate-400 italic">Mitra & Pelanggan</span>
                             )}
                        </div>
                        {idea.investmentAsk && (
                            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <p className="text-xs text-slate-500 uppercase font-bold">Estimasi Nilai / Kebutuhan</p>
                                <p className="text-slate-900 font-medium">{idea.investmentAsk}</p>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={handleWhatsapp}
                        className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-600 transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg mb-3 flex items-center justify-center gap-2 animate-pulse"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        Chat via WhatsApp
                    </button>

                    <div className="text-center mt-4 pt-4 border-t border-slate-100">
                        <button 
                            onClick={reportScam}
                            className="text-xs text-slate-400 hover:text-rose-500 font-medium flex items-center justify-center mx-auto"
                        >
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            Laporkan Penipuan
                        </button>
                    </div>
                </div>

                <AdSpot type="sidebar" title="Rekomendasi Kami" />
                <AdSpot type="sidebar" title="Mitra UMKM" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
