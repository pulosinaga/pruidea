import React from 'react';

const CommunityCta: React.FC = () => {
  return (
    <div className="bg-white">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
                Mari Bertumbuh Bersama!
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-600">
                Pruidea adalah ruang terbuka bagi ide dan kolaborasi.
            </p>
            <div className="mt-6">
                <button
                    className="bg-slate-800 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-700 transition-colors duration-300 shadow"
                >
                    Gabung Komunitas Pruidea
                </button>
            </div>
        </div>
    </div>
  );
};

export default CommunityCta;
