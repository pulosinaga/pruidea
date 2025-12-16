
import React, { useState } from 'react';
import { ForumTopic, ForumReply } from '../types';

interface CommunityProps {
  topics: ForumTopic[];
  onAddTopic: (topic: Partial<ForumTopic>) => void;
  onAddReply: (topicId: number, text: string, author: string) => void;
}

const Community: React.FC<CommunityProps> = ({ topics, onAddTopic, onAddReply }) => {
  const [activeView, setActiveView] = useState<'list' | 'detail'>('list');
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form States
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('Umum');
  const [newTopicAuthor, setNewTopicAuthor] = useState('');
  
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  const categories = ['Semua', 'Umum', 'Cari Modal', 'Tips Bisnis', 'Cari Partner'];

  const filteredTopics = filterCategory === 'Semua' 
    ? topics 
    : topics.filter(t => t.category === filterCategory);

  const handleTopicClick = (topic: ForumTopic) => {
      setSelectedTopic(topic);
      setActiveView('detail');
      window.scrollTo(0,0);
  };

  const handleCreateTopic = (e: React.FormEvent) => {
      e.preventDefault();
      onAddTopic({
          title: newTopicTitle,
          content: newTopicContent,
          category: newTopicCategory as any,
          author: newTopicAuthor || 'Warga Pruidea'
      });
      setIsModalOpen(false);
      // Reset form
      setNewTopicTitle('');
      setNewTopicContent('');
      setNewTopicAuthor('');
  };

  const handleCreateReply = (e: React.FormEvent) => {
      e.preventDefault();
      if(selectedTopic) {
          onAddReply(selectedTopic.id, replyText, replyAuthor || 'Warga');
          setReplyText('');
          setReplyAuthor('');
      }
  };

  const inputClass = "w-full px-4 py-3 bg-sky-50 border border-sky-200 rounded-lg focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-colors placeholder-slate-400";

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Balai Warga Pruidea</h2>
          <p className="mt-3 text-lg text-slate-600">
             Forum diskusi mandiri untuk saling bantu, cari modal, dan berbagi ilmu. <br/>
             <span className="text-sm italic text-slate-500">(Admin hanya memantau, warga yang beraksi)</span>
          </p>
        </div>

        {activeView === 'list' && (
            <>
                {/* Actions & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex overflow-x-auto pb-2 gap-2 w-full md:w-auto no-scrollbar">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filterCategory === cat ? 'bg-sky-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Buat Topik Baru
                    </button>
                </div>

                {/* Topic List */}
                <div className="space-y-4">
                    {filteredTopics.map(topic => (
                        <div 
                            key={topic.id} 
                            onClick={() => handleTopicClick(topic)}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <img src={topic.avatar} alt={topic.author} className="w-12 h-12 rounded-full border border-slate-100" />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">{topic.category}</span>
                                            <span className="text-xs text-slate-400">• {topic.date}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{topic.title}</h3>
                                        <p className="text-slate-600 text-sm mt-1 line-clamp-2">{topic.content}</p>
                                        <div className="mt-2 text-xs text-slate-500 font-medium">
                                            Oleh: {topic.author}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center min-w-[60px]">
                                    <div className="text-xl font-bold text-slate-700">{topic.replies.length}</div>
                                    <div className="text-xs text-slate-400">Balasan</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {filteredTopics.length === 0 && (
                         <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-500">Belum ada topik di kategori ini. Jadilah yang pertama!</p>
                         </div>
                    )}
                </div>
            </>
        )}

        {activeView === 'detail' && selectedTopic && (
            <div className="max-w-4xl mx-auto">
                <button onClick={() => setActiveView('list')} className="text-sky-600 font-bold mb-6 flex items-center hover:underline">
                    &larr; Kembali ke Daftar Topik
                </button>

                {/* Main Post */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                             <img src={selectedTopic.avatar} alt={selectedTopic.author} className="w-14 h-14 rounded-full mr-4 border-2 border-slate-100" />
                             <div>
                                 <h1 className="text-2xl font-bold text-slate-900 leading-tight">{selectedTopic.title}</h1>
                                 <div className="flex items-center text-sm text-slate-500 mt-1">
                                     <span className="font-semibold text-sky-600 mr-2">{selectedTopic.author}</span>
                                     <span>• {selectedTopic.date}</span>
                                     <span className="mx-2">•</span>
                                     <span className="bg-slate-100 px-2 rounded">{selectedTopic.category}</span>
                                 </div>
                             </div>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg border-b border-slate-100 pb-8">
                            {selectedTopic.content}
                        </div>
                        
                        {/* Replies */}
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">{selectedTopic.replies.length} Balasan</h3>
                            <div className="space-y-6">
                                {selectedTopic.replies.map(reply => (
                                    <div key={reply.id} className={`flex gap-4 ${reply.isAdmin ? 'bg-sky-50 p-4 rounded-lg border border-sky-100' : ''}`}>
                                        <div className="flex-shrink-0">
                                            <img src={reply.avatar} alt={reply.author} className="w-10 h-10 rounded-full" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`font-bold ${reply.isAdmin ? 'text-sky-700' : 'text-slate-900'}`}>
                                                    {reply.author}
                                                    {reply.isAdmin && <span className="ml-2 text-[10px] bg-sky-600 text-white px-1.5 rounded">ADMIN</span>}
                                                </span>
                                                <span className="text-xs text-slate-400">{reply.date}</span>
                                            </div>
                                            <p className="text-slate-700 text-sm">{reply.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reply Form */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Balas Topik Ini</h3>
                    <form onSubmit={handleCreateReply} className="space-y-4">
                        <input 
                            type="text" 
                            placeholder="Nama Anda"
                            value={replyAuthor}
                            onChange={(e) => setReplyAuthor(e.target.value)}
                            className={`w-full md:w-1/2 ${inputClass}`}
                            required
                        />
                        <textarea 
                            rows={4} 
                            placeholder="Tulis balasan yang membantu..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className={inputClass}
                            required
                        ></textarea>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-sky-600 text-white font-bold py-2 px-6 rounded-full hover:bg-sky-700 transition-colors">
                                Kirim Balasan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

      </div>

      {/* Create Topic Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-slate-900">Buat Topik Baru</h3>
                      <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>
                  <form onSubmit={handleCreateTopic} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Judul Diskusi</label>
                          <input 
                            type="text" 
                            value={newTopicTitle}
                            onChange={e => setNewTopicTitle(e.target.value)}
                            className={inputClass}
                            placeholder="Singkat & Jelas"
                            required
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                          <select 
                            value={newTopicCategory}
                            onChange={e => setNewTopicCategory(e.target.value)}
                            className={inputClass}
                          >
                              {categories.filter(c => c !== 'Semua').map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                              ))}
                          </select>
                      </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Isi Diskusi</label>
                          <textarea 
                            value={newTopicContent}
                            onChange={e => setNewTopicContent(e.target.value)}
                            rows={4}
                            className={inputClass}
                            placeholder="Jelaskan detail pertanyaan atau informasi Anda..."
                            required
                          ></textarea>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Nama Anda</label>
                          <input 
                            type="text" 
                            value={newTopicAuthor}
                            onChange={e => setNewTopicAuthor(e.target.value)}
                            className={inputClass}
                            placeholder="Nama Panggilan"
                            required
                          />
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-full hover:bg-emerald-700 mt-2 shadow-md">
                          Terbitkan Topik
                      </button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Community;
