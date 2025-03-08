import type { SupabaseClient } from "@supabase/supabase-js";
/**
 * Saves a chat to the database.
 *
 * @param {string} businessId - The ID of the business associated with the chat.
 * @param {string} customerPhone - The phone number of the customer associated with the chat.
 */
export declare function saveChatToDB(supabase: SupabaseClient, businessId: number, customerPhone: string, chatId: string): Promise<void>;
export declare function getChatByClientAndBusinessPhone(supabase: SupabaseClient, customerPhone: string, businessPhone: string): Promise<any>;
export declare function getChatId(supabase: SupabaseClient, businessId: number, customerPhoneId: number | null): Promise<any>;
export declare function getChats(supabase: SupabaseClient): Promise<any>;
