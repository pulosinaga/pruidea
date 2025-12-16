
import React, { useMemo } from 'react';
import { MOCK_ADS } from '../constants';

interface AdSpotProps {
  type: 'banner' | 'sidebar' | 'in-feed';
  title?: string;
  data?: typeof MOCK_ADS[0];
}

const AdSpot: React.FC<AdSpotProps> = ({ type, title = "Iklan Sponsor", data }) => {
  // Rotasi iklan sederhana jika data tidak diberikan
  const randomAd = useMemo(() => {
      if (data) return data;
      return MOCK_ADS[Math.floor(Math.random() * MOCK_ADS.length)];
  }, [data]);

  if (type === 'sidebar') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
             <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-center">{title}</div>
             <div className="text-[9px] bg-slate-100 px-1 rounded text-slate-400">IKLAN</div>
        </div>
        
        <div className={`w-full p-4 rounded-lg border border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${randomAd.color} hover:shadow-md`}>
            <p className="text-sm font-bold text-slate-800">{randomAd.title}</p>
            <p className="text-xs text-slate-600 mt-1 mb-2">{randomAd.description}</p>
            <span className="text-[10px] text-slate-500 block mb-3">Oleh: {randomAd.advertiser}</span>
            <button className="text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1 rounded-full font-bold shadow-sm">
                {randomAd.cta} &rarr;
            </button>
        </div>
      </div>
    );
  }

  if (type === 'in-feed') {
    return (
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 my-4">
        <div className={`rounded-xl border p-1 shadow-sm relative overflow-hidden ${randomAd.color}`}>
            {/* Label SPONSOR agar user tidak tertipu */}
            <div className="absolute top-0 right-0 bg-slate-200 text-slate-500 text-[9px] px-2 py-0.5 rounded-bl font-bold z-10">
                SPONSOR RESMI
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg flex flex-col md:flex-row items-center justify-between h-full">
                <div className="flex items-center mb-4 md:mb-0 w-full">
                    <div className="bg-white p-3 rounded-lg shadow-sm mr-4 flex-shrink-0">
                         {/* Icon Generik */}
                        <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">{randomAd.advertiser}</p>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{randomAd.title}</h3>
                        <p className="text-slate-600 text-sm mt-1">{randomAd.description}</p>
                    </div>
                </div>
                <button className="bg-slate-800 text-white font-bold py-2 px-6 rounded-full hover:bg-slate-700 transition-colors shadow-md whitespace-nowrap flex-shrink-0 ml-0 md:ml-4 w-full md:w-auto text-center">
                    {randomAd.cta}
                </button>
            </div>
        </div>
      </div>
    );
  }

  // Default Banner
  return (
    <div className="w-full bg-slate-100 h-24 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 my-8">
        <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
        <span className="text-xs">Space Iklan Tersedia</span>
    </div>
  );
};

export default AdSpot;
