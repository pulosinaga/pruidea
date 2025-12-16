<div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors">
                              <h3 className="text-xl font-bold text-emerald-400 mb-2">📊 Template Data Anggota (Excel)</h3>
                              <p className="text-slate-400 text-sm mb-4">
                                  Format formulir pendaftaran kolektif. Download, isi data anggota, lalu kirim balik ke Admin Pruidea.
                              </p>
                              <button 
                                onClick={() => alert("Simulasi: Template Excel sedang didownload.")}
                                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
                              >
                                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                  Download Excel
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* FAQ Specific */}
          <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Pertanyaan Umum Ketua Komunitas</h2>
              <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800">Apakah bisa pakai Logo Koperasi kami?</h4>
                      <p className="text-slate-600 mt-1 text-sm">Bisa! Kami bisa menambahkan label "Binaan Koperasi [Nama]" di setiap halaman anggota Anda.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800">Bagaimana kalau anggota saya tidak punya email?</h4>
                      <p className="text-slate-600 mt-1 text-sm">Tidak masalah. Kami bisa mendaftarkan menggunakan nomor HP saja sebagai identitas utama.</p>
                  </div>
                   <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800">Apakah ada kontrak terikat?</h4>
                      <p className="text-slate-600 mt-1 text-sm">Tidak. Anda bisa mencoba untuk 1 bulan atau 1 tahun. Kami sarankan uji coba 3 bulan untuk melihat dampak penjualan.</p>
                  </div>
              </div>
          </div>
          
          <div className="mt-12 text-center">
               <button 
                onClick={() => setActivePage(Page.Contact)}
                className="text-slate-500 font-medium hover:text-slate-800 underline"
               >
                   Kembali ke Formulir Kontak Biasa
               </button>
          </div>

      </div>
    </div>
  );
};

export default PartnershipGuide;
