
import React, { useState, useEffect } from 'react';
import { Page, Idea, IdeaCategory, Comment, ForumTopic, ForumReply, BankInfo } from './types';
import { MOCK_IDEAS, MOCK_FORUM_TOPICS, ADMIN_WA_NUMBER, DEFAULT_BANK_INFO } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import IdeShowcase from './pages/IdeShowcase';
import IdeaDetail from './pages/IdeaDetail';
import SubmissionGuide from './pages/SubmissionGuide';
import SuccessStories from './pages/SuccessStories';
import About from './pages/About';
import Contact from './pages/Contact';
import SubmissionModal from './components/SubmissionModal';
import MicrositeBuilder from './pages/MicrositeBuilder';
import MicrositeDemo from './pages/MicrositeDemo';
import Community from './pages/Community';
import PremiumPackage from './pages/PremiumPackage';
import LoginModal from './components/LoginModal';
import PremiumModal from './components/PremiumModal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CommunityGuidelines from './pages/CommunityGuidelines';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import AdminDashboard from './pages/AdminDashboard';
import Advertise from './pages/Advertise';
import PartnershipGuide from './pages/PartnershipGuide';
import NIBGuide from './pages/NIBGuide';
import Toast from './components/Toast';
import AdminLoginModal from './components/AdminLoginModal';
import { ideaService, bankService, forumService } from './lib/dbService';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([]);
  const [bankInfo, setBankInfo] = useState<BankInfo>(DEFAULT_BANK_INFO);
  
  const [isLoading, setIsLoading] = useState(true);

  // --- INITIAL DATA FETCHING ---
  useEffect(() => {
    const initData = async () => {
        setIsLoading(true);
        try {
            const fetchedIdeas = await ideaService.getAll();
            setIdeas(fetchedIdeas);

            const fetchedForum = await forumService.getAll();
            setForumTopics(fetchedForum);

            const fetchedBank = await bankService.get();
            setBankInfo(fetchedBank);
            
        } catch (e) {
            console.error("Initialization error:", e);
        } finally {
            setIsLoading(false);
        }
    };
    initData();
  }, []);

  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      setToast({ message, type });
  };

  // Sync to LocalStorage (Backup mechanism if dbService logic fails or for instant UI consistency)
  // NOTE: ideaService now handles persistence, but we keep this for React state safety during session
  useEffect(() => {
    if(!isLoading && ideas.length > 0) localStorage.setItem('pruidea_ideas', JSON.stringify(ideas));
  }, [ideas, isLoading]);

  useEffect(() => {
    if(!isLoading && forumTopics.length > 0) localStorage.setItem('pruidea_forum', JSON.stringify(forumTopics));
  }, [forumTopics, isLoading]);

  useEffect(() => {
    if(!isLoading) localStorage.setItem('pruidea_bank', JSON.stringify(bankInfo));
  }, [bankInfo, isLoading]);

  // Handle URL Routing & Browser Back Button
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const ideaId = params.get('idea');
      
      if (ideaId && !isNaN(Number(ideaId)) && ideas.length > 0) {
        const foundIdea = ideas.find(i => i.id === Number(ideaId));
        if (foundIdea) {
          setSelectedIdea(foundIdea);
          setActivePage(Page.IdeaDetail);
          return;
        }
      }
      
      // Jika tidak ada ID di URL, kembali ke home atau halaman default
      // Dalam implementasi sederhana ini, kita default ke Home jika back button ditekan dan tidak ada param
      if (!ideaId && activePage === Page.IdeaDetail) {
          setActivePage(Page.Home);
          setSelectedIdea(null);
      }
    };

    // Listen to popstate (back/forward button)
    window.addEventListener('popstate', handleUrlChange);

    // Initial check
    handleUrlChange();

    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [ideas]); // Re-run when ideas are loaded

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    window.scrollTo(0,0);
    if (page !== Page.IdeaDetail) {
        const url = new URL(window.location.href);
        url.search = '';
        window.history.pushState({}, '', url.toString());
    }
  };

  const handleAdminEntry = () => {
      if (isAdminAuthenticated) {
          handleNavigate(Page.Admin);
      } else {
          setIsAdminModalOpen(true);
      }
  };

  const handleAdminSuccess = () => {
      setIsAdminAuthenticated(true);
      showToast("Akses Admin Diberikan. Selamat Datang!", "success");
      handleNavigate(Page.Admin);
  };

  const handleUserLoginSuccess = () => {
      setIsUserLoggedIn(true);
      setIsLoginModalOpen(false);
      showToast("Login Berhasil! Selamat datang, Pulo.", "success");
  }
  
  const handleUserLogout = () => {
      setIsUserLoggedIn(false);
      showToast("Anda telah keluar.", "info");
  }

  const handleIdeaClick = (idea: Idea) => {
    const updatedIdea = { ...idea, viewCount: idea.viewCount + 1 };
    
    // Optimistic Update
    setIdeas(prev => prev.map(i => i.id === idea.id ? updatedIdea : i));
    setSelectedIdea(updatedIdea);
    
    // Persist View Count
    ideaService.update(updatedIdea);

    setActivePage(Page.IdeaDetail);
    const url = new URL(window.location.href);
    url.searchParams.set('idea', idea.id.toString());
    window.history.pushState({}, '', url.toString());
    window.scrollTo(0,0);
  };

  const handleBackToShowcase = () => {
    setActivePage(Page.Showcase);
    setSelectedIdea(null);
    const url = new URL(window.location.href);
    url.search = '';
    window.history.pushState({}, '', url.toString());
    window.scrollTo(0,0);
  };

  const handleSubmitIdea = async (data: Partial<Idea>) => {
    const newIdea: Idea = {
      id: Date.now(),
      title: data.title || 'Ide Baru',
      author: data.author || 'Anonim',
      category: data.category || IdeaCategory.Warung,
      description: data.description || '',
      fullDescription: data.fullDescription || '',
      imageUrl: data.imageUrl || 'https://picsum.photos/seed/new/800/600',
      galleryUrls: [],
      isPopular: false,
      isVerified: false,
      isPinned: false,
      location: data.location || 'Indonesia',
      tier: 'Warga',
      lookingFor: data.lookingFor || [],
      whatsappNumber: data.whatsappNumber || '',
      socialMedia: data.socialMedia || '',
      nibNumber: data.nibNumber || '',
      viewCount: 0,
      likes: 0,
      comments: []
    };

    // Save via Service
    await ideaService.add(newIdea);

    setIdeas(prev => [newIdea, ...prev]);
    setIsSubmissionModalOpen(false);
    showToast("Ide berhasil diterbitkan! Selamat datang di ekonomi digital.", "success");
    handleNavigate(Page.Showcase);
  };

  const handleBulkImport = async (newIdeas: Idea[]) => {
      for (const idea of newIdeas) {
          await ideaService.add(idea);
      }
      setIdeas(prev => [...newIdeas, ...prev]);
      showToast(`${newIdeas.length} Ide Mitra berhasil diimport!`, "success");
  };

  const handleLike = (id: number) => {
      let updatedIdea: Idea | undefined;
      
      setIdeas(prev => prev.map(idea => {
          if (idea.id === id) {
              updatedIdea = { ...idea, likes: (idea.likes || 0) + 1 };
              return updatedIdea;
          }
          return idea;
      }));

      if (updatedIdea) {
          if (selectedIdea && selectedIdea.id === id) {
              setSelectedIdea(updatedIdea);
          }
          ideaService.update(updatedIdea);
      }
      showToast("Terima kasih atas dukungan Anda!", "success");
  };

  const handleComment = (id: number, text: string, user: string) => {
      const newComment: Comment = {
          id: Date.now(),
          user: user,
          avatar: `https://ui-avatars.com/api/?name=${user}`,
          text: text,
          date: 'Baru saja'
      };

      let updatedIdea: Idea | undefined;

      setIdeas(prev => prev.map(idea => {
          if (idea.id === id) {
              updatedIdea = { ...idea, comments: [newComment, ...(idea.comments || [])] };
              return updatedIdea;
          }
          return idea;
      }));

      if (updatedIdea) {
           if (selectedIdea && selectedIdea.id === id) {
              setSelectedIdea(updatedIdea);
           }
           ideaService.update(updatedIdea);
      }
      showToast("Komentar berhasil dikirim.", "info");
  };

  const handleDeleteIdea = async (id: number) => {
      await ideaService.delete(id);
      setIdeas(prev => prev.filter(i => i.id !== id));
      showToast("Ide berhasil dihapus.", "error");
  };

  const handleTogglePopular = (id: number) => {
      const idea = ideas.find(i => i.id === id);
      if(idea) {
          const updated = { ...idea, isPopular: !idea.isPopular };
          setIdeas(prev => prev.map(i => i.id === id ? updated : i));
          ideaService.update(updated);
          showToast("Status Trending berhasil diubah.", "info");
      }
  };

  const handleToggleVerify = (id: number) => {
      const idea = ideas.find(i => i.id === id);
      if(idea) {
          const updated = { ...idea, isVerified: !idea.isVerified };
          setIdeas(prev => prev.map(i => i.id === id ? updated : i));
          ideaService.update(updated);
          showToast("Status Verifikasi berhasil diubah.", "success");
      }
  }

  const handleTogglePin = (id: number) => {
      const idea = ideas.find(i => i.id === id);
      if(idea) {
          const updated = { ...idea, isPinned: !idea.isPinned };
          setIdeas(prev => prev.map(i => i.id === id ? updated : i));
          ideaService.update(updated);
          showToast("Status Sorotan Utama berhasil diubah.", "success");
      }
  }

  const handleUpdateBankInfo = async (newInfo: BankInfo) => {
      await bankService.update(newInfo);
      setBankInfo(newInfo);
      showToast("Data Rekening Pembayaran berhasil diperbarui!", "success");
  }

  // Forum Handlers
  const handleAddTopic = async (topic: Partial<ForumTopic>) => {
      const newTopic: ForumTopic = {
          id: Date.now(),
          title: topic.title || 'Topik Baru',
          category: topic.category as any || 'Umum',
          author: topic.author || 'Anonim',
          avatar: `https://ui-avatars.com/api/?name=${topic.author}`,
          content: topic.content || '',
          date: 'Baru saja',
          views: 0,
          replies: []
      };
      
      await forumService.add(newTopic);
      setForumTopics(prev => [newTopic, ...prev]);
      showToast("Topik diskusi berhasil dibuat!", "success");
  };

  const handleAddReply = async (topicId: number, text: string, author: string) => {
      const newReply: ForumReply = {
          id: Date.now(),
          author: author,
          avatar: `https://ui-avatars.com/api/?name=${author}`,
          text: text,
          date: 'Baru saja'
      };

      let updatedTopic: ForumTopic | undefined;

      setForumTopics(prev => prev.map(t => {
          if (t.id === topicId) {
              updatedTopic = { ...t, replies: [...t.replies, newReply] };
              return updatedTopic;
          }
          return t;
      }));

      if(updatedTopic) {
          await forumService.update(updatedTopic);
      }
      showToast("Balasan terkirim.", "success");
  };

  if (isLoading) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-slate-50">
              <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                  <p className="text-slate-500 font-medium">Memuat Ide Rakyat...</p>
              </div>
          </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900">
      <Header 
        activePage={activePage} 
        setActivePage={handleNavigate} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onAdminClick={handleAdminEntry} 
        isUserLoggedIn={isUserLoggedIn}
        onLogout={handleUserLogout}
      />

      <main className="flex-grow">
        {activePage === Page.Home && <Home setActivePage={handleNavigate} />}
        
        {activePage === Page.Showcase && (
            <IdeShowcase 
                ideas={ideas} 
                onUpgradeClick={() => setActivePage(Page.MicrositeBuilder)}
                onIdeaClick={handleIdeaClick}
                onLikeClick={handleLike}
            />
        )}
        
        {activePage === Page.IdeaDetail && selectedIdea && (
            <IdeaDetail 
                idea={selectedIdea} 
                onBack={handleBackToShowcase}
                onSupport={() => setIsPremiumModalOpen(true)}
                onLike={() => handleLike(selectedIdea.id)}
                onComment={(text, user) => handleComment(selectedIdea.id, text, user)}
            />
        )}
        
        {activePage === Page.Guide && <SubmissionGuide />}
        {activePage === Page.Success && <SuccessStories setActivePage={handleNavigate} />}
        {activePage === Page.About && <About />}
        {activePage === Page.Contact && <Contact />}
        
        {activePage === Page.Community && (
            <Community 
                topics={forumTopics}
                onAddTopic={handleAddTopic}
                onAddReply={handleAddReply}
            />
        )}
        
        {activePage === Page.MicrositeBuilder && <MicrositeBuilder setActivePage={handleNavigate} />}
        {activePage === Page.MicrositeDemo && <MicrositeDemo setActivePage={handleNavigate} />}
        {activePage === Page.Premium && <PremiumPackage />}
        {activePage === Page.Advertise && <Advertise setActivePage={handleNavigate} />}
        {activePage === Page.Partnership && <PartnershipGuide setActivePage={handleNavigate} />}
        {activePage === Page.NIBGuide && <NIBGuide setActivePage={handleNavigate} />}
        
        {activePage === Page.Privacy && <PrivacyPolicy />}
        {activePage === Page.Terms && <TermsAndConditions />}
        {activePage === Page.Guidelines && <CommunityGuidelines />}
        {activePage === Page.FAQ && <FAQ />}
        {activePage === Page.HelpCenter && <HelpCenter setActivePage={handleNavigate} />}
        
        {activePage === Page.Admin && (
            <AdminDashboard 
                ideas={ideas} 
                bankInfo={bankInfo}
                onDeleteIdea={handleDeleteIdea}
                onTogglePopular={handleTogglePopular}
                onToggleVerify={handleToggleVerify}
                onTogglePin={handleTogglePin}
                onBulkImport={handleBulkImport}
                onUpdateBankInfo={handleUpdateBankInfo}
                setActivePage={handleNavigate}
            />
        )}
      </main>

      <Footer setActivePage={handleNavigate} onAdminClick={handleAdminEntry} />

      {/* Floating CTA Buttons */}
      {activePage !== Page.IdeaDetail && activePage !== Page.Admin && activePage !== Page.Community && (
          <button
            onClick={() => setIsSubmissionModalOpen(true)}
            className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-2xl hover:bg-sky-700 transition-all z-40 md:hidden animate-bounce-slow"
            aria-label="Kirim Ide"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
      )}

      <a
        href={`https://wa.me/${ADMIN_WA_NUMBER}?text=Halo%20Pruidea,%20saya%20butuh%20bantuan.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 bg-emerald-500 text-white p-3 rounded-full shadow-2xl hover:bg-emerald-600 transition-all z-40 flex items-center gap-2 group"
        title="Chat Admin"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">Bantuan CS</span>
      </a>

      <SubmissionModal 
        isOpen={isSubmissionModalOpen} 
        onClose={() => setIsSubmissionModalOpen(false)} 
        onSubmit={handleSubmitIdea}
        onNIBHelp={() => {
            setIsSubmissionModalOpen(false);
            handleNavigate(Page.NIBGuide);
        }}
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleUserLoginSuccess} 
      />
      
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={handleAdminSuccess}
      />

      <PremiumModal 
        isOpen={isPremiumModalOpen} 
        onClose={() => setIsPremiumModalOpen(false)}
        onLearnMore={() => {
            setIsPremiumModalOpen(false);
            setActivePage(Page.Premium);
        }}
        bankInfo={bankInfo}
      />

      {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
      )}
    </div>
  );
};

export default App;
