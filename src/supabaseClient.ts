import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseURL = process.env['SUPABASE_URL'] || '';
const adminKey = process.env['SUPABASE_ADMIN_KEY'] || '';

if (!supabaseURL || !adminKey) {
    throw new Error('Supabase Keys missing');
}

/* export const supabase = createClient(supabaseURL, adminKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
 */