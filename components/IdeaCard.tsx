
import React from 'react';
import { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onUpgradeClick: () => void;
  onClick: () => void;
}

const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
    const categoryColors: { [key: string]: string } = {
        'Usaha Desa': 'bg-green-100 text-green-800',
        'Inovasi Produk': 'bg-amber-100 text-amber-800',
        'Mahasiswa': 'bg-indigo-100 text-indigo-800',
        'Kreatif Digital': 'bg-purple-100 text-purple-800',
        'Sosial': 'bg-pink-100 text-pink-800',
    };
    return (
        <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${categoryColors[category] || 'bg-slate-100 text-slate-800'}`}>
            {category}
        </span>
    )
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onUpgradeClick, onClick }) => {
  const isPro = idea.tier === 'Juragan' || idea.tier === 'Sultan';

  return (
    <div 
        className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative cursor-pointer group h-full ${isPro ? 'border-2 border-sky-400 ring-2 ring-sky-50' : 'border border-slate-100'}`}
        onClick={onClick}
    >
      {/* Popular / Trending Badge */}
      {idea.isPopular && (
        <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-sm">
          🔥 Trending
        </div>
      )}
      
      {/* PRO Badge for Paying Customers */}
      {isPro && (
        <div className="absolute top-0 left-0 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10 shadow-sm flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
          JURAGAN
        </div>
      )}

      <div className="relative overflow-hidden h-48 flex-shrink-0">
          <img className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500" src={idea.imageUrl} alt={idea.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="absolute bottom-3 left-3 text-white">
              <p className="text-xs font-light opacity-90">Lokasi</p>
              <p className="text-xs font-semibold">{idea.location}</p>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs space-x-2">
               <span className="flex items-center">
                   <svg className="w-3 h-3 mr-1 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                   {idea.likes || 0}
               </span>
               <span className="flex items-center">
                   <svg className="w-3 h-3 mr-1 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                   {idea.comments?.length || 0}
               </span>
          </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
                <CategoryBadge category={idea.category} />
            </div>
            
            <div className="flex items-center gap-1 mb-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">{idea.title}</h3>
                {idea.isVerified && (
                     <svg className="w-4 h-4 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                         <title>Terverifikasi</title>
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                     </svg>
                )}
            </div>
            
            <div className="flex items-center mb-3">
                 <div className="h-5 w-5 rounded-full overflow-hidden mr-2 bg-slate-200">
                     <img src={idea.authorAvatar || `https://ui-avatars.com/api/?name=${idea.author}`} alt={idea.author} className="h-full w-full object-cover" />
                 </div>
                 <p className="text-xs text-slate-500 font-medium">oleh {idea.author}</p>
            </div>
            
            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">{idea.description}</p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Mencari:</p>
            <div className="flex flex-wrap gap-2 mb-3">
                {idea.lookingFor && idea.lookingFor.length > 0 ? (
                    idea.lookingFor.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-sky-50 text-sky-700 text-xs px-2 py-1 rounded border border-sky-100">
                            {tag}
                        </span>
                    ))
                ) : (
                    <span className="text-xs text-slate-400 italic">Mitra & Pelanggan</span>
                )}
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                 <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    {idea.viewCount || 0} dilihat
                 </span>
                 <span className={`font-semibold hover:underline ${isPro ? 'text-sky-600' : 'text-slate-500'}`}>
                     {isPro ? 'Kunjungi Website \u2192' : 'Lihat Detail \u2192'}
                 </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;