import type { SupabaseClient } from "@supabase/supabase-js";
/**
 * Fetches the business ID associated with a given phone number.
 *
 * @param {number} businessPhone - The phone number of the business to retrieve.
 * @returns {Promise<number>} A promise that resolves to the business ID if found, or 0 if not found.
 */
export declare function getBusinessIdByPhoneNumber(supabase: SupabaseClient, businessPhone: string): Promise<number>;
