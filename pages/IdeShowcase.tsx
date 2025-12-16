
import React, { useState, useMemo } from 'react';
import { IdeaCategory, Idea } from '../types';
import IdeaCard from '../components/IdeaCard';
import AdSpot from '../components/AdSpot';
import SEO from '../components/SEO';
import { MOCK_ADS } from '../constants';

interface IdeShowcaseProps {
  ideas: Idea[]; 
  onUpgradeClick: () => void;
  onIdeaClick: (idea: Idea) => void;
  onLikeClick: (id: number) => void;
}

const IdeShowcase: React.FC<IdeShowcaseProps> = ({ ideas, onUpgradeClick, onIdeaClick, onLikeClick }) => {
  const [activeCategory, setActiveCategory] = useState<IdeaCategory>(IdeaCategory.All);
  const [activeLocation, setActiveLocation] = useState<string>('Semua Lokasi');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Object.values(IdeaCategory);
  
  const locations = useMemo(() => {
      const locs = ideas.map(idea => {
          const parts = idea.location.split(',');
          return parts.length > 1 ? parts[1].trim() : parts[0].trim();
      });
      return ['Semua Lokasi', ...Array.from(new Set(locs))];
  }, [ideas]);

  const { pinnedIdeas, organicIdeas } = useMemo(() => {
    let filtered = ideas.filter(idea => {
      const inCategory = activeCategory === IdeaCategory.All || idea.category === activeCategory;
      const inLocation = activeLocation === 'Semua Lokasi' || idea.location.includes(activeLocation);
      const inSearch = searchTerm === '' || 
                       idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       idea.author.toLowerCase().includes(searchTerm.toLowerCase());
      return inCategory && inSearch && inLocation;
    });

    // Pisahkan Pinned (Sundul Gan) dan Organik
    const pinned = filtered.filter(i => i.isPinned);
    const organic = filtered.filter(i => !i.isPinned);

    // Sort Organik: Popular > Verified > Others
    organic.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
    });

    return { pinnedIdeas: pinned, organicIdeas: organic };

  }, [ideas, activeCategory, searchTerm, activeLocation]);

  return (
    <div className="py-16 sm:py-24">
      {/* Dynamic SEO */}
      <SEO 
        title={`Etalase Ide ${activeCategory !== IdeaCategory.All ? `- Kategori ${activeCategory}` : ''}`}
        description="Temukan ratusan ide bisnis, UMKM, dan komunitas kreatif dari seluruh Indonesia di Pruidea.com."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Etalase Ide & Karya</h2>
          <p className="mt-4 text-lg text-slate-600">Jelajahi ide bisnis, hobi unik, jasa kreatif, hingga komunitas dari seluruh penjuru Indonesia.</p>
        </div>

        <div className="mt-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow group">
                  <input
                      type="search"
                      placeholder="Cari warung, jasa sketsa, komunitas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-6 py-4 rounded-full bg-sky-50 border border-sky-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition shadow-sm group-hover:shadow-md text-lg outline-none placeholder-slate-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-sky-600 rounded-full text-white">
                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
              </div>
              
              <div className="md:w-1/3">
                  <select 
                    value={activeLocation}
                    onChange={(e) => setActiveLocation(e.target.value)}
                    className="w-full px-6 py-4 rounded-full bg-sky-50 border border-sky-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-lg outline-none cursor-pointer shadow-sm hover:shadow-md transition text-slate-700"
                  >
                      {locations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                      ))}
                  </select>
              </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center flex-wrap gap-2 sm:gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-200 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-sky-600 text-white shadow-md ring-2 ring-sky-600 ring-offset-2'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
          {/* BAGIAN 1: PINNED / SUNDUL GAN (Maksimal 4 agar tidak memonopoli) */}
          {pinnedIdeas.slice(0, 4).map((idea) => (
             <div key={idea.id} className="relative ring-4 ring-amber-400 rounded-xl shadow-2xl transform -translate-y-2 z-10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full z-20 shadow-md flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                    SOROTAN UTAMA
                </div>
                <IdeaCard 
                    idea={idea} 
                    onUpgradeClick={onUpgradeClick}
                    onClick={() => onIdeaClick(idea)}
                />
            </div>
          ))}

          {/* BAGIAN 2: ORGANIC IDEAS + IKLAN (Rasio 6:1) */}
          {organicIdeas.map((idea, index) => (
            <React.Fragment key={idea.id}>
                <IdeaCard 
                    idea={idea} 
                    onUpgradeClick={onUpgradeClick}
                    onClick={() => onIdeaClick(idea)}
                />
                
                {/* LOGIKA IKLAN: Muncul setiap 6 kartu organik */}
                {(index + 1) % 6 === 0 && (
                    <AdSpot type="in-feed" data={MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)]} />
                )}
            </React.Fragment>
          ))}
        </div>
        
        {pinnedIdeas.length === 0 && organicIdeas.length === 0 && (
            <div className="text-center sm:col-span-2 lg:col-span-3 xl:col-span-4 py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300 mt-8">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="mt-2 text-sm font-medium text-slate-900">Tidak ada hasil</h3>
                <p className="mt-1 text-sm text-slate-500">Coba ubah kata kunci atau lokasi pencarian.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default IdeShowcase;
