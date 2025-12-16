import { supabase } from './supabaseClient';
import { Idea, ForumTopic, BankInfo } from '../types';
import { MOCK_IDEAS, MOCK_FORUM_TOPICS, DEFAULT_BANK_INFO } from '../constants';

// Cek apakah URL Supabase sudah diganti atau masih placeholder
const isSupabaseConfigured = () => {
    // @ts-ignore
    const url = supabase.supabaseUrl;
    // @ts-ignore
    const key = supabase.supabaseKey;
    
    return url && key && !url.includes('ganti-dengan') && !key.includes('ganti-dengan');
};

const mapIdeaFromDB = (data: any): Idea => ({
    id: Number(data.id),
    title: data.title,
    author: data.author,
    authorAvatar: data.author_avatar || `https://ui-avatars.com/api/?name=${data.author}`,
    category: data.category,
    description: data.description,
    fullDescription: data.full_description || '',
    imageUrl: data.image_url,
    galleryUrls: data.gallery_urls || [],
    isPopular: data.is_popular,
    isVerified: data.is_verified,
    isPinned: data.is_pinned,
    location: data.location,
    tier: data.tier,
    lookingFor: data.looking_for || [],
    whatsappNumber: data.whatsapp_number,
    email: data.email,
    socialMedia: data.social_media,
    investmentAsk: data.investment_ask,
    viewCount: data.view_count || 0,
    likes: data.likes || 0,
    comments: data.comments || [],
    nibNumber: data.nib_number
});

export const ideaService = {
    async getAll(): Promise<Idea[]> {
        if (!isSupabaseConfigured()) {
            return JSON.parse(localStorage.getItem('pruidea_ideas') || JSON.stringify(MOCK_IDEAS));
        }

        try {
            const { data, error } = await supabase
                .from('ideas')
                .select('*')
                .order('is_pinned', { ascending: false })
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data.map(mapIdeaFromDB);
        } catch (err) {
            console.error("Gagal ambil data Supabase, fallback local:", err);
            return JSON.parse(localStorage.getItem('pruidea_ideas') || JSON.stringify(MOCK_IDEAS));
        }
    },

    async add(idea: Idea): Promise<Idea> {
        if (!isSupabaseConfigured()) {
             const current = JSON.parse(localStorage.getItem('pruidea_ideas') || '[]');
             const updated = [idea, ...current];
             localStorage.setItem('pruidea_ideas', JSON.stringify(updated));
             return idea;
        }

        try {
            const dbPayload = {
                id: idea.id,
                title: idea.title,
                author: idea.author,
                category: idea.category,
                description: idea.description,
                full_description: idea.fullDescription,
                image_url: idea.imageUrl,
                location: idea.location,
                tier: idea.tier,
                whatsapp_number: idea.whatsappNumber,
                social_media: idea.socialMedia,
                nib_number: idea.nibNumber,
                looking_for: idea.lookingFor,
                is_verified: false,
                is_popular: false,
                likes: 0,
                view_count: 0
            };
            const { error } = await supabase.from('ideas').insert(dbPayload);
            if (error) throw error;
            return idea;
        } catch (err) {
             console.error("Gagal simpan ke DB:", err);
             const current = JSON.parse(localStorage.getItem('pruidea_ideas') || '[]');
             const updated = [idea, ...current];
             localStorage.setItem('pruidea_ideas', JSON.stringify(updated));
             return idea;
        }
    },

    async update(idea: Idea): Promise<void> {
        if (!isSupabaseConfigured()) {
            const current = JSON.parse(localStorage.getItem('pruidea_ideas') || '[]');
            const updated = current.map((i: Idea) => i.id === idea.id ? idea : i);
            localStorage.setItem('pruidea_ideas', JSON.stringify(updated));
            return;
        }
        
        try {
            const dbPayload = {
                is_popular: idea.isPopular,
                is_verified: idea.isVerified,
                is_pinned: idea.isPinned,
                likes: idea.likes,
                view_count: idea.viewCount,
                comments: idea.comments
            };
            const { error } = await supabase.from('ideas').update(dbPayload).eq('id', idea.id);
            if (error) throw error;
        } catch (err) {
             console.error("Gagal update DB:", err);
             // Fallback local persistence
             const current = JSON.parse(localStorage.getItem('pruidea_ideas') || '[]');
             const updated = current.map((i: Idea) => i.id === idea.id ? idea : i);
             localStorage.setItem('pruidea_ideas', JSON.stringify(updated));
        }
    },

    async delete(id: number): Promise<void> {
        if (!isSupabaseConfigured()) {
            const current = JSON.parse(localStorage.getItem('pruidea_ideas') || '[]');
            const updated = current.filter((i: Idea) => i.id !== id);
            localStorage.setItem('pruidea_ideas', JSON.stringify(updated));
            return;
        }

        try {
            const { error } = await supabase.from('ideas').delete().eq('id', id);
            if(error) throw error;
        } catch (err) {
            console.error("Gagal delete DB:", err);
            const current = JSON.parse(localStorage.getItem('pruidea_ideas') || '[]');
            const updated = current.filter((i: Idea) => i.id !== id);
            localStorage.setItem('pruidea_ideas', JSON.stringify(updated));
        }
    }
};

export const bankService = {
    async get(): Promise<BankInfo> {
        if (!isSupabaseConfigured()) return JSON.parse(localStorage.getItem('pruidea_bank') || JSON.stringify(DEFAULT_BANK_INFO));

        try {
            const { data, error } = await supabase.from('app_settings').select('value').eq('key', 'bank_info').single();
            if (error || !data) throw error;
            return data.value;
        } catch {
            return JSON.parse(localStorage.getItem('pruidea_bank') || JSON.stringify(DEFAULT_BANK_INFO));
        }
    },

    async update(info: BankInfo): Promise<void> {
        if (!isSupabaseConfigured()) {
            localStorage.setItem('pruidea_bank', JSON.stringify(info));
            return;
        }
        
        try {
            const { error } = await supabase.from('app_settings').upsert({ key: 'bank_info', value: info });
            if(error) throw error;
        } catch {
            localStorage.setItem('pruidea_bank', JSON.stringify(info));
        }
    }
};

export const forumService = {
     async getAll(): Promise<ForumTopic[]> {
        if (!isSupabaseConfigured()) return JSON.parse(localStorage.getItem('pruidea_forum') || JSON.stringify(MOCK_FORUM_TOPICS));

        try {
            const { data, error } = await supabase.from('forum_topics').select('*').order('created_at', { ascending: false });
            if (error || !data) throw error;
            return data as ForumTopic[];
        } catch {
             return JSON.parse(localStorage.getItem('pruidea_forum') || JSON.stringify(MOCK_FORUM_TOPICS));
        }
    },

    async add(topic: ForumTopic): Promise<void> {
        if (!isSupabaseConfigured()) {
            const current = JSON.parse(localStorage.getItem('pruidea_forum') || JSON.stringify(MOCK_FORUM_TOPICS));
            const updated = [topic, ...current];
            localStorage.setItem('pruidea_forum', JSON.stringify(updated));
            return;
        }
        
        try {
            const { error } = await supabase.from('forum_topics').insert({
                id: topic.id,
                title: topic.title,
                category: topic.category,
                author: topic.author,
                avatar: topic.avatar,
                content: topic.content,
                date: topic.date,
                views: topic.views,
                replies: topic.replies
            });
            if (error) throw error;
        } catch (err) {
            console.error("Gagal simpan topic ke DB:", err);
            const current = JSON.parse(localStorage.getItem('pruidea_forum') || JSON.stringify(MOCK_FORUM_TOPICS));
            const updated = [topic, ...current];
            localStorage.setItem('pruidea_forum', JSON.stringify(updated));
        }
    },

    async update(topic: ForumTopic): Promise<void> {
        if (!isSupabaseConfigured()) {
            const current = JSON.parse(localStorage.getItem('pruidea_forum') || JSON.stringify(MOCK_FORUM_TOPICS));
            const updated = current.map((t: ForumTopic) => t.id === topic.id ? topic : t);
            localStorage.setItem('pruidea_forum', JSON.stringify(updated));
            return;
        }
        
        try {
            const { error } = await supabase.from('forum_topics').update({
                replies: topic.replies,
                views: topic.views
            }).eq('id', topic.id);
            if(error) throw error;
        } catch (err) {
            console.error("Gagal update topic DB:", err);
            const current = JSON.parse(localStorage.getItem('pruidea_forum') || JSON.stringify(MOCK_FORUM_TOPICS));
            const updated = current.map((t: ForumTopic) => t.id === topic.id ? topic : t);
            localStorage.setItem('pruidea_forum', JSON.stringify(updated));
        }
    }
}
