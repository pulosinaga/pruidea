
import React, { useRef, useState } from 'react';
import { Idea, Page, IdeaCategory, BankInfo } from '../types';

interface AdminDashboardProps {
  ideas: Idea[];
  bankInfo?: BankInfo; // New Prop
  onDeleteIdea: (id: number) => void;
  onTogglePopular: (id: number) => void;
  onToggleVerify?: (id: number) => void;
  onTogglePin?: (id: number) => void;
  onBulkImport?: (newIdeas: Idea[]) => void;
  onUpdateBankInfo?: (info: BankInfo) => void; // New Handler
  setActivePage: (page: Page) => void;
}

const StatCard: React.FC<{ title: string; value: string; subtext: string; color: string }> = ({ title, value, subtext, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow border-l-4 ${color}`}>
        <h3 className="text-slate-500 text-sm font-bold uppercase">{title}</h3>
        <p className="text-3xl font-extrabold text-slate-800 mt-2">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ ideas, bankInfo, onDeleteIdea, onTogglePopular, onToggleVerify, onTogglePin, onBulkImport, onUpdateBankInfo, setActivePage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State lokal untuk form edit bank
  const [editBank, setEditBank] = useState<BankInfo>(bankInfo || {
      bankName: '', accountNumber: '', accountName: ''
  });

  const totalIdeas = ideas.length;
  const totalViews = ideas.reduce((acc, curr) => acc + curr.viewCount, 0);
  const totalPro = ideas.filter(i => i.tier === 'Juragan' || i.tier === 'Sultan').length;
  const estimatedRevenue = (totalPro * 15000).toLocaleString('id-ID');
  
  // Mencari ide yang butuh verifikasi (New Ideas)
  const pendingIdeas = ideas.filter(i => !i.isVerified);

  const handleSaveBank = (e: React.FormEvent) => {
      e.preventDefault();
      if(onUpdateBankInfo) {
          onUpdateBankInfo(editBank);
      }
  };

  const handleBackupData = () => {
      const dataStr = JSON.stringify(ideas, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `pruidea_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Data berhasil didownload! Simpan file ini baik-baik.");
  };

  const handleResetData = () => {
      const confirmText = prompt("⚠️ PERINGATAN BAHAYA ⚠️\n\nIni akan menghapus SEMUA DATA ide yang tersimpan di browser ini dan kembali ke data awal (Mock Data).\n\nKetik 'RESET' untuk melanjutkan:");
      if (confirmText === 'RESET') {
          localStorage.removeItem('pruidea_ideas');
          localStorage.removeItem('pruidea_forum');
          localStorage.removeItem('pruidea_bank'); // Reset bank juga
          alert("Database berhasil di-reset ke pengaturan pabrik. Halaman akan dimuat ulang.");
          window.location.reload();
      }
  };

  const handleCopyPromo = (idea: Idea) => {
      // Template kata-kata promosi otomatis
      const text = `🔥 *INFO WARGA! Ada Ide Usaha Menarik Nih* 🔥\n\nNama: *${idea.title}*\nLokasi: ${idea.location}\n\n"${idea.description}"\n\nYuk dukung usaha rakyat! Cek detail lengkap & foto-fotonya di sini 👇\n👉 pruidea.com/?idea=${idea.id}\n\n#Pruidea #BantuUMKM #IdeRakyat`;
      
      navigator.clipboard.writeText(text).then(() => {
          alert("Teks Promo berhasil disalin! Silakan PASTE di Grup WhatsApp atau Facebook.");
      });
  };

  // --- FITUR BARU: TEMPLATE BALASAN CEPAT ---
  const sendQuickWA = (phone: string, type: 'approve' | 'reject_data' | 'reject_content') => {
      if (!phone) {
          alert("Nomor WA tidak tersedia untuk ide ini.");
          return;
      }
      
      let message = "";
      if (type === 'approve') {
          message = "Halo! Selamat, Ide/Usaha Anda telah lolos verifikasi dan mendapatkan CENTANG BIRU ✅ di Pruidea.com. Semoga makin laris manis!";
      } else if (type === 'reject_data') {
          message = "Halo Admin Pruidea di sini. Mohon maaf, profil usaha Anda belum bisa kami verifikasi karena data kurang lengkap (Foto/Deskripsi). Mohon dilengkapi ya.";
      } else if (type === 'reject_content') {
          message = "Halo. Mohon maaf ide Anda kami hapus karena terindikasi melanggar pedoman komunitas (Spam/Konten Terlarang). Terima kasih.";
      }

      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const downloadTemplate = () => {
      const headers = "Judul Usaha,Nama Pemilik,Kategori,Deskripsi Singkat,Lokasi,Nomor WA";
      const example = "Keripik Pisang Enak,Budi Santoso,Kuliner Rumahan,Keripik pisang renyah aneka rasa,Malang Jawa Timur,08123456789";
      const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + example;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "template_import_pruidea.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          const text = event.target?.result as string;
          if (!text) return;

          const rows = text.split('\n');
          const newIdeas: Idea[] = [];
          
          // Skip header row, start from index 1
          for (let i = 1; i < rows.length; i++) {
              const row = rows[i].trim();
              if (!row) continue;
              
              const cols = row.split(','); // Simple CSV split. Note: will break if commas in content.
              if (cols.length < 5) continue;

              const [title, author, categoryRaw, desc, location, wa] = cols;

              const newIdea: Idea = {
                  id: Date.now() + i, // Unique ID gen
                  title: title?.trim() || "Usaha Baru",
                  author: author?.trim() || "Anggota Komunitas",
                  category: (Object.values(IdeaCategory).includes(categoryRaw?.trim() as any) ? categoryRaw?.trim() as IdeaCategory : IdeaCategory.Warung),
                  description: desc?.trim() || "Mitra Koperasi/Komunitas",
                  fullDescription: `<p>${desc?.trim()}</p><p>Usaha ini adalah anggota resmi dari program kemitraan komunitas.</p>`,
                  imageUrl: `https://picsum.photos/seed/${Date.now()+i}/800/600`, // Random Image
                  galleryUrls: [],
                  isPopular: false,
                  isVerified: true, // Auto verify for bulk import
                  isPinned: false,
                  location: location?.trim() || "Indonesia",
                  tier: 'Juragan', // Give them Juragan tier as per partnership benefit
                  lookingFor: ['Pelanggan'],
                  whatsappNumber: wa?.trim()?.replace(/^0/, '62') || '',
                  viewCount: 0,
                  likes: 0,
                  comments: []
              };
              newIdeas.push(newIdea);
          }

          if (newIdeas.length > 0 && onBulkImport) {
              onBulkImport(newIdeas);
              if(fileInputRef.current) fileInputRef.current.value = ""; // Reset input
          } else {
              alert("Gagal membaca file atau format salah.");
          }
      };
      reader.readAsText(file);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white py-8">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Ruang Kendali Pruidea</h1>
                    <p className="text-slate-400 text-sm">Selamat datang, Bos! Anda mengelola {totalIdeas} ide sendirian.</p>
                </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={handleBackupData}
                        className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-sm font-bold flex items-center shadow-lg transition-transform hover:scale-105"
                        title="Download data untuk keamanan"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Backup Data
                    </button>
                    <button 
                        onClick={() => setActivePage(Page.Home)}
                        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm transition-colors"
                    >
                        Lihat Website &rarr;
                    </button>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Butuh Verifikasi" 
                    value={pendingIdeas.length.toString()} 
                    subtext="Ide baru yang belum dicek"
                    color="border-rose-500"
                />
                <StatCard 
                    title="Total Ide Masuk" 
                    value={totalIdeas.toString()} 
                    subtext="Ide tersimpan di database"
                    color="border-blue-500"
                />
                <StatCard 
                    title="Total Penonton" 
                    value={totalViews.toLocaleString()} 
                    subtext="Traffic potensial untuk iklan"
                    color="border-green-500"
                />
                <StatCard 
                    title="Potensi Revenue" 
                    value={`Rp ${estimatedRevenue}`} 
                    subtext="Estimasi pendapatan bulanan"
                    color="border-emerald-500"
                />
            </div>

            {/* BANK ACCOUNT SETTINGS */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 border border-amber-200">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                        <h3 className="text-lg font-bold text-slate-800">🏦 Pengaturan Rekening Pembayaran</h3>
                        <p className="text-sm text-slate-500 mt-2">
                            Data ini akan muncul saat user ingin membeli Paket Premium. Pastikan Nama Pemilik SAMA PERSIS dengan buku tabungan.
                        </p>
                    </div>
                    <div className="md:w-2/3">
                        <form onSubmit={handleSaveBank} className="grid grid-cols-1 gap-4">
                             <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase">Nama Bank</label>
                                <input 
                                    type="text" 
                                    className="w-full border rounded p-2 text-slate-900 font-bold"
                                    value={editBank.bankName}
                                    onChange={(e) => setEditBank({...editBank, bankName: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase">Nomor Rekening</label>
                                    <input 
                                        type="text" 
                                        className="w-full border rounded p-2 font-mono text-slate-900"
                                        value={editBank.accountNumber}
                                        onChange={(e) => setEditBank({...editBank, accountNumber: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase text-rose-600">Nama Pemilik (Wajib Sama)</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-rose-200 rounded p-2 text-slate-900 font-bold bg-rose-50"
                                        value={editBank.accountName}
                                        onChange={(e) => setEditBank({...editBank, accountName: e.target.value})}
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                </div>
                            </div>
                            <button className="bg-amber-500 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 self-start">
                                Simpan Perubahan Rekening
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Danger Zone: Factory Reset */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 border border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                         <h3 className="text-lg font-bold text-slate-800">Zona Berbahaya</h3>
                         <p className="text-sm text-slate-500">Gunakan fitur ini hanya jika Anda ingin memulai dari nol (misal: selesai testing).</p>
                    </div>
                    <button 
                        onClick={handleResetData}
                        className="mt-4 md:mt-0 bg-white border-2 border-rose-500 text-rose-600 px-6 py-2 rounded-full font-bold hover:bg-rose-600 hover:text-white transition-colors flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Factory Reset (Hapus Data)
                    </button>
                </div>
            </div>

            {/* BULK UPLOAD SECTION */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 border border-sky-100">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-sky-100 rounded-lg mr-3 text-sky-600">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Import Massal (Kemitraan)</h3>
                        <p className="text-sm text-slate-500">Solusi cepat input 100+ data anggota komunitas sekaligus.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h4 className="font-bold text-sm text-slate-700 mb-2">Langkah 1: Download Format</h4>
                        <p className="text-xs text-slate-500 mb-3">Download file CSV ini dan kirimkan ke Ketua Komunitas untuk diisi.</p>
                        <button 
                            onClick={downloadTemplate}
                            className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-bold hover:bg-slate-50 w-full"
                        >
                            ⬇️ Download Template CSV
                        </button>
                    </div>
                    <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                        <h4 className="font-bold text-sm text-sky-800 mb-2">Langkah 2: Upload Data</h4>
                        <p className="text-xs text-sky-600 mb-3">Upload file yang sudah diisi. Data akan langsung masuk dan diverifikasi otomatis.</p>
                        <input 
                            type="file" 
                            accept=".csv"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-white hover:file:bg-sky-700 cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Verification Guide (SOP) */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8">
                <h3 className="font-bold text-amber-800 text-lg mb-2">🕵️ Panduan Verifikasi Admin (SOP)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-900">
                    <div>
                        <strong>1. Cek Nomor WA:</strong>
                        <p>Simpan nomornya, cek apakah ada foto profil dan status WA. Chat mereka: "Halo, saya Admin Pruidea, mau konfirmasi idenya".</p>
                    </div>
                    <div>
                        <strong>2. Cek Media Sosial:</strong>
                        <p>Buka link IG/FB yang mereka lampirkan. Pastikan foto di website sama dengan di sosmed mereka. Akun tidak boleh bodong (baru dibuat kemarin).</p>
                    </div>
                    <div>
                        <strong>3. Video Call (Khusus High Profile):</strong>
                        <p>Jika mereka mencari dana besar, wajib minta Video Call sebentar untuk melihat lokasi usaha fisiknya.</p>
                    </div>
                </div>
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800">Manajemen Ide Masuk</h2>
                    <span className="text-xs text-slate-500 hidden sm:inline">Gunakan fitur ini untuk menghapus spam dan memverifikasi usaha.</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-100 uppercase font-bold text-xs text-slate-500">
                            <tr>
                                <th className="px-6 py-3">Nama Ide</th>
                                <th className="px-6 py-3">Validasi</th>
                                <th className="px-6 py-3">Aksi Cepat (WA)</th>
                                <th className="px-6 py-3">Pengaturan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {ideas.map((idea) => (
                                <tr key={idea.id} className={`hover:bg-slate-50 ${!idea.isVerified ? 'bg-rose-50/30' : ''}`}>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <div className="flex flex-col">
                                            <span>{idea.title}</span>
                                            <span className="text-[10px] text-slate-400">Oleh: {idea.author}</span>
                                        </div>
                                        {idea.isPinned && <span className="ml-2 bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full border border-amber-200">SUNDUL</span>}
                                        {!idea.isVerified && <span className="ml-2 bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full animate-pulse">BARU</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {idea.isVerified ? (
                                            <span className="text-emerald-600 font-bold flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="text-rose-500 font-semibold text-xs flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                Butuh Cek
                                            </span>
                                        )}
                                    </td>
                                    
                                    {/* NEW: QUICK WA ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => sendQuickWA(idea.whatsappNumber || '', 'approve')}
                                                className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 border border-green-200"
                                                title="WA: Selamat (Lolos Verifikasi)"
                                            >
                                                👋 Selamat
                                            </button>
                                            <button 
                                                onClick={() => sendQuickWA(idea.whatsappNumber || '', 'reject_data')}
                                                className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded hover:bg-amber-200 border border-amber-200"
                                                title="WA: Data Kurang Lengkap"
                                            >
                                                👋 Data Kurang
                                            </button>
                                            <button 
                                                onClick={() => sendQuickWA(idea.whatsappNumber || '', 'reject_content')}
                                                className="text-[10px] bg-rose-100 text-rose-700 px-2 py-1 rounded hover:bg-rose-200 border border-rose-200"
                                                title="WA: Hapus (Melanggar Aturan)"
                                            >
                                                👋 Hapus
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-right space-x-2 flex justify-end items-center">
                                        <button
                                            onClick={() => handleCopyPromo(idea)}
                                            className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                                            title="Salin Kata-kata Promosi untuk Sosmed"
                                        >
                                            📣 Promo
                                        </button>
                                        
                                        {onToggleVerify && (
                                            <button 
                                                onClick={() => onToggleVerify(idea.id)}
                                                className={`text-xs px-3 py-1 rounded border transition-colors ${idea.isVerified ? 'bg-white border-slate-200 text-slate-500' : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 shadow-sm'}`}
                                            >
                                                {idea.isVerified ? 'Batal' : 'Acc ✅'}
                                            </button>
                                        )}
                                        {onTogglePin && (
                                             <button 
                                                onClick={() => onTogglePin(idea.id)}
                                                className={`text-xs px-2 py-1 rounded border transition-colors ${idea.isPinned ? 'bg-amber-400 text-white border-amber-500' : 'bg-white border-slate-300 text-slate-400'}`}
                                                title={idea.isPinned ? "Matikan Sundul" : "Aktifkan Sundul Gan"}
                                            >
                                                ⭐
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => {
                                                if (window.confirm('Yakin ingin menghapus ide ini selamanya?')) {
                                                    onDeleteIdea(idea.id);
                                                }
                                            }}
                                            className="text-xs px-2 py-1 rounded bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                                            title="Hapus Ide"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
