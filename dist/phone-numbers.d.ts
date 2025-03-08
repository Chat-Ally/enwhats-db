import type { SupabaseClient } from "@supabase/supabase-js";
import type PhoneNumber from "./dto/phone-number.js";
/**
 * Save a number to the database.
 *
 * @param {string} customerPhone - A phone number from a customer.
*/
export declare function getOrCreatePhoneNumber(supabase: SupabaseClient, customerPhone: string): Promise<PhoneNumber | undefined>;
export declare function getPhoneIdByNumber(supabase: SupabaseClient, phoneNumber: string): Promise<number | null>;
