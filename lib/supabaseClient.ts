import { createClient } from '@supabase/supabase-js';

// --- PANDUAN KONEKSI DATABASE (SUPABASE) ---
// 1. Buka https://supabase.com dan "Start your project"
// 2. Buat Project baru
// 3. Masuk ke Settings -> API
// 4. Salin "Project URL" dan "anon / public key"

// BEST PRACTICE: Gunakan Environment Variables
// Di Vercel: Masuk Settings -> Environment Variables
// Masukkan key: VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY

// FIX: Mengakses env dengan aman. Jika import.meta.env undefined, gunakan objek kosong.
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://ganti-dengan-url-project-anda.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'ganti-dengan-anon-key-anda';

// Client ini yang akan dipakai di seluruh aplikasi untuk ambil data
export const supabase = createClient(supabaseUrl, supabaseAnonKey);